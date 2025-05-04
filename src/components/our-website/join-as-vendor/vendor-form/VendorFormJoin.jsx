import React, { useState, useCallback, useMemo } from "react";
import "./VendorFormJoin.css";
import CustomDropdown from "../../../../elements/dropdown/Dropdown";
import Button from '../../../../elements/button/Button';
import Input from '../../../../elements/input/Input';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import servicesJson from "../../../../constants/services.json";
import ImageUpload from "../../../../elements/image-upload/ImageUpload";
import { useGeolocation } from '../../../../services/Location-Routing/useGeolocation';
import Stamp from '../../../../assets/Stamp.png';

// Constants
const VALIDATION_PATTERNS = {
  firstname: /^[A-Za-z]{2,50}$/,
  lastname: /^[A-Za-z]{2,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  whatsappNumber: /^\+?[0-9]{10,15}$/,
  city: /^[A-Za-z\s]{2,50}$/,
  location: /^[A-Za-z0-9\s,.-]{5,100}$/,
  serviceCategory: /.+/,
};

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_IMAGE_SIZE_MB = 2;

const INITIAL_FORM_DATA = {
  firstname: "",
  lastname: "",
  email: "",
  whatsappNumber: "",
  city: "",
  location: "",
  serviceCategory: "",
  identitycardFront: null,
  identitycardBack: null,
  latitude: null,
  longitude: null
};

const TOAST_CONFIG = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored"
};

const VendorFormJoin = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  const { location, getLocation, locationError } = useGeolocation();
  // Memoized data
  const mainCategories = useMemo(() => servicesJson?.mainCategories?.map(cat => cat.name) || [], []);

  // Validation functions
  const validateImage = useCallback((file) => {
    if (!file) return 'Please upload an image';
    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      return 'Only JPG/PNG images are allowed';
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      return `Image size should be less than ${MAX_IMAGE_SIZE_MB}MB`;
    }
    return '';
  }, []);

  const validateField = useCallback((name, value) => {
    if (name.includes('identitycard')) {
      return validateImage(value);
    }

    if (!value?.toString()?.trim()) {
      return `${name} is required`;
    }

    if (VALIDATION_PATTERNS[name] && !VALIDATION_PATTERNS[name].test(value)) {
      return `Invalid ${name}`;
    }

    return '';
  }, [validateImage]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      if (key !== 'latitude' && key !== 'longitude') {
        const error = validateField(key, formData[key]);
        newErrors[key] = error;
        if (error) isValid = false;
      }
    });
    setErrors(newErrors);
    if (!isValid) {
      const firstError = Object.values(newErrors).find(Boolean);
      if (firstError) toast.error(firstError);
    }
    return isValid;
  }, [formData, validateField]);

  // Handlers
  const handleInputChange = useCallback((e) => {
    const { name, value, files } = e.target;
    const inputValue = files ? files[0] : value;

    setFormData(prev => ({ ...prev, [name]: inputValue }));
    setFormTouched(true);

    if (formTouched || errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, inputValue) }));
    }
  }, [formTouched, errors, validateField]);

  const handleCategoryChange = useCallback((selectedCategoryName) => {
    setFormData(prev => ({ ...prev, serviceCategory: selectedCategoryName }));
    setFormTouched(true);
    setErrors(prev => ({ ...prev, serviceCategory: "" }));
  }, []);

  const handleImageUpload = useCallback((fieldName) => (files) => {
    const file = files[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    setFormTouched(true);
    setErrors(prev => ({ ...prev, [fieldName]: validateField(fieldName, file) }));
  }, [validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormTouched(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // If we don't have location and there's no error yet, request it
      if (!location && !locationError) {
        try {
          await getLocation(); // Wait for location to be obtained
          // If we get here, location was granted - proceed with submission
        } catch (error) {
          // Location was denied
          toast.error("Location access is required to submit the form");
          setIsSubmitting(false);
          console.log(error);
          return;
        }
      }

      // If we have location error, show message
      if (locationError) {
        toast.error("Could not determine your location. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // If we still don't have location (shouldn't happen at this point)
      if (!location) {
        toast.error("Location is required to submit the form");
        setIsSubmitting(false);
        return;
      }

      // Prepare submission data
      const submissionData = {
        ...formData,
        latitude: location.latitude,
        longitude: location.longitude
      };

      // Simulate API call
      console.log("Submitting:", submissionData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset form on success
      toast.success("Form submitted successfully!");
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      setFormTouched(false);
      setResetCounter(prev => prev + 1);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("There was an error submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, location, locationError, validateForm, getLocation]);

  // Memoized components
  const InputField = useCallback(({ name, type = "text", placeholder, ...props }) => (
    <div className="input-wrapper">
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        error={errors[name]}
        {...props}
      />
      {errors[name] && <small className="error-message">{errors[name]}</small>}
    </div>
  ), [formData, errors, handleInputChange]);

  return (
    <React.Fragment>
      <div className="subcription">
        <img src={Stamp} alt="Stamp" width={100} height={100} />
        <span>3 Months Free <br /> Subscription</span>
      </div>

      <div className="VendorFormJoin">
        <div className="FormSection">
          <div className="FormText">
            <h1>Fill the <span>form below</span> to join us</h1>
            <p>
              Have a question or need assistance? Fill out the form below, and our
              team will get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="FormContentSection">
              <div className="twoinputs">
                <InputField name="firstname" placeholder="First Name" />
                <InputField name="lastname" placeholder="Last Name" />
              </div>

              <div className="twoinputs">
                <InputField name="email" type="email" placeholder="Email" />
                <InputField name="whatsappNumber" placeholder="WhatsApp Number" />
              </div>

              <div className="twoinputs">
                <InputField name="city" placeholder="City Name" />
                <InputField name="location" placeholder="Location" />
              </div>

              <div className="oneinput">
                <CustomDropdown
                  options={mainCategories}
                  value={formData.serviceCategory}
                  onChange={handleCategoryChange}
                  error={errors.serviceCategory}
                  placeholder="Select Service Category"
                />

                {errors.serviceCategory && (
                  <small className="error-message">{errors.serviceCategory}</small>
                )}
              </div>

              <div className="twoinputs">
                <ImageUpload
                  key={`identitycardFront-${resetCounter}`}
                  multiple={false}
                  maxFiles={1}
                  maxSizeMB={MAX_IMAGE_SIZE_MB}
                  accept={VALID_IMAGE_TYPES.join(',')}
                  text="Upload Front of Identity Card"
                  required
                  externalError={formTouched ? errors.identitycardFront : ''}
                  onFilesChange={handleImageUpload('identitycardFront')}
                />
                <ImageUpload
                  key={`identitycardBack-${resetCounter}`}
                  multiple={false}
                  maxFiles={1}
                  maxSizeMB={MAX_IMAGE_SIZE_MB}
                  accept={VALID_IMAGE_TYPES.join(',')}
                  text="Upload Back of Identity Card"
                  required
                  externalError={formTouched ? errors.identitycardBack : ''}
                  onFilesChange={handleImageUpload('identitycardBack')}
                />
              </div>

              <div className="button">
                <ToastContainer {...TOAST_CONFIG} />
                <Button
                  text={isSubmitting ? "Submitting..." : "Submit"}
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="ImageSection">
          <div className="ImageContentSection">
            <h1>Join <span>Home CareTaker</span> as a <span>Vendor</span></h1>
            <p>
              Join our community of skilled professionals! Home CareTaker helps you
              expand your client base and take control of your service business.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(VendorFormJoin);