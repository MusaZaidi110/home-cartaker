import React, { useState, useCallback, useMemo } from 'react'
import './RequestService.css'
import { useGeolocation } from '../../../services/Location-Routing/useGeolocation';
import Stamp from '../../../assets/Stamp.png';
import { useNavigate } from 'react-router-dom';
import Button from '../../../elements/button/Button';
import ImageUpload from "../../../elements/image-upload/ImageUpload";
import { toast, ToastContainer } from "react-toastify";
import CustomDropdown from "../../../elements/dropdown/Dropdown";
import "react-toastify/dist/ReactToastify.css";
import servicesJson from "../../../constants/services.json";
import Input from '../../../elements/input/Input';

// Constants
const VALIDATION_PATTERNS = {
    firstname: /^[A-Za-z]{2,50}$/,
    lastname: /^[A-Za-z]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    whatsappNumber: /^\+?[0-9]{10,15}$/,
    city: /^[A-Za-z\s]{2,50}$/,
    location: /^[A-Za-z0-9\s,.-]{5,100}$/,
    serviceCategory: /.+/,
    serviceSubCategory: /.+/,
    serviceDescription: /^.{20,500}$/,
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
    serviceSubCategory: "",
    requestServiceImg: null,
    serviceDescription: '',
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

const RequestServiceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [subCategories, setSubCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formTouched, setFormTouched] = useState(false);
    const [resetCounter, setResetCounter] = useState(0);

    const { location, getLocation, locationError } = useGeolocation();

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
        if (name === 'requestServiceImg') {
            if (!value || (Array.isArray(value) && value.length === 0)) {
                return 'Please upload at least one image';
            }
            if (Array.isArray(value)) {
                const errors = value.map(file => validateImage(file)).filter(Boolean);
                return errors.length > 0 ? errors.join('\n') : '';
            }
            return validateImage(value);
        }

        if (!value?.toString()?.trim()) {
            return `${name} is required`;
        }

        if (VALIDATION_PATTERNS[name] && !VALIDATION_PATTERNS[name].test(value)) {
            if (name === 'serviceDescription') {
                return 'Description must be between 20-500 characters';
            }
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
        const inputValue = files ? files : value;

        setFormData(prev => ({ ...prev, [name]: inputValue }));
        setFormTouched(true);

        if (formTouched || errors[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, inputValue) }));
        }
    }, [formTouched, errors, validateField]);

    const handleCategoryChange = useCallback((selectedCategoryName) => {
        const selectedCategory = servicesJson.mainCategories.find(
            cat => cat.name === selectedCategoryName
        );

        setFormData(prev => ({
            ...prev,
            serviceCategory: selectedCategoryName,
            serviceSubCategory: ""
        }));

        setSubCategories(selectedCategory?.services || []);
    }, []);

    const handleSubCategoryChange = useCallback((selectedSubCategoryName) => {
        setFormData(prev => ({
            ...prev,
            serviceSubCategory: selectedSubCategoryName
        }));
    }, []);

    const handleImageUpload = useCallback((fieldName) => (files) => {
        if (!files || files.length === 0) {
            setFormData(prev => ({ ...prev, [fieldName]: null }));
            setErrors(prev => ({ ...prev, [fieldName]: 'Please upload at least one image' }));
            return;
        }

        const validationErrors = [];
        const validFiles = [];

        Array.from(files).forEach((file, index) => {
            const error = validateImage(file);
            if (error) {
                validationErrors.push(`File ${index + 1}: ${error}`);
            } else {
                validFiles.push(file);
            }
        });

        setFormTouched(true);

        if (validationErrors.length > 0) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: validationErrors.join('\n')
            }));
            setFormData(prev => ({
                ...prev,
                [fieldName]: validFiles.length > 0 ? validFiles : null
            }));
        } else {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
            setFormData(prev => ({ ...prev, [fieldName]: Array.from(files) }));
        }
    }, [validateImage]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormTouched(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            if (!location && !locationError) {
                try {
                    await getLocation();
                } catch (error) {
                    toast.error("Location access is required to submit the form");
                    setIsSubmitting(false);
                    console.log(error);
                    return;
                }
            }

            if (locationError || !location) {
                toast.error("Could not determine your location. Please try again.");
                setIsSubmitting(false);
                return;
            }

            // Prepare FormData for submission
            const formDataToSend = new FormData();

            // Append regular fields
            Object.keys(formData).forEach(key => {
                if (key !== 'requestServiceImg' && key !== 'latitude' && key !== 'longitude') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Append files if they exist
            if (formData.requestServiceImg) {
                Array.from(formData.requestServiceImg).forEach((file, index) => {
                    formDataToSend.append(`images[${index}]`, file);
                });
            }

            // Append location
            formDataToSend.append('latitude', location.latitude);
            formDataToSend.append('longitude', location.longitude);

            // Simulate API call
            console.log("Submitting:", Object.fromEntries(formDataToSend));
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Service request submitted successfully!");
            setFormData(INITIAL_FORM_DATA);
            setErrors({});
            setFormTouched(false);
            setResetCounter(prev => prev + 1);
            setSubCategories([]);
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("There was an error submitting your request");
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, location, locationError, validateForm, getLocation]);

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
                <span style={{ textAlign: 'center', fontSize: '24px', top: '133px', right: '100px' }}>No Subscription <br /> Totally FREE </span>
            </div>

            <div className="RequestFormJoin">
                <div className="FormSection">
                    <div className="FormText">
                        <h1>Fill the <span>Request Service Form</span> below.</h1>
                        <p className="info-text">
                            Fill out the form below to request your service. Our verified vendors will
                            contact you as soon as possible to confirm details and schedule your service.
                        </p>
                        <p className="note-text">
                            Please provide accurate information to ensure quick response from vendors.
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

                            {formData.serviceCategory && (
                                <div className="oneinput">
                                    <CustomDropdown
                                        options={subCategories.map(sub => sub.name)}
                                        value={formData.serviceSubCategory}
                                        onChange={handleSubCategoryChange}
                                        error={errors.serviceSubCategory}
                                        placeholder="Select Sub Category"
                                    />
                                    {errors.serviceSubCategory && (
                                        <small className="error-message">{errors.serviceSubCategory}</small>
                                    )}
                                </div>
                            )}

                            <div className="oneinput">
                                <ImageUpload
                                    key={`requestServiceImg-${resetCounter}`}
                                    multiple={true}
                                    maxFiles={5}
                                    maxSizeMB={MAX_IMAGE_SIZE_MB}
                                    accept={VALID_IMAGE_TYPES.join(',')}
                                    text="Upload the Image Which You Want to be Fixed"
                                    required
                                    externalError={formTouched ? errors.requestServiceImg : ''}
                                    onFilesChange={handleImageUpload('requestServiceImg')}
                                />
                                {errors.requestServiceImg && (
                                    <small className="error-message">{errors.requestServiceImg}</small>
                                )}
                            </div>

                            <div className="oneinput">
                                <textarea
                                    name="serviceDescription"
                                    value={formData.serviceDescription}
                                    onChange={handleInputChange}
                                    placeholder="Please Describe the Service You want to be Done (20-500 characters)"
                                    error={errors.serviceDescription}
                                />
                                {errors.serviceDescription && (
                                    <small className="error-message">{errors.serviceDescription}</small>
                                )}
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
                    <div className="user-welcome-section">
                        <h1>Welcome to <span>Home CareTaker</span> Services</h1>
                        <div className="cta-container">
                            <p className="cta-text">
                                <span className="highlight">Become a member</span> today to:
                            </p>
                            <ul className="benefits-list">
                                <li>Get priority access to top-rated vendors</li>
                                <li>Receive special offers and discounts</li>
                                <li>Track all your service requests in one place</li>
                                <li>Get notified about exclusive deals</li>
                            </ul>
                            <Button text={'Sign Up Now'} onclick={() => navigate('/auth')} />
                            <p className="loyalty-text">
                                Loyal users enjoy <span className="highlight">extra benefits</span> and stay updated with all our latest offers!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RequestServiceForm