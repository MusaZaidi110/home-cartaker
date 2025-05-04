import React, { useState } from "react";
import "./ContactForm.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from '../../../../elements/button/Button'
import Input from '../../../../elements/input/Input'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    whatsappNumber: "",
    subject: "",
    contactmessage: "",
  });

  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    let error = "";
    const patterns = {
      firstname: /^[A-Za-z]{2,50}$/,
      lastname: /^[A-Za-z]{2,50}$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      whatsappNumber: /^\+?[0-9]{10,15}$/,
      subject: /^.{5,100}$/,
      contactmessage: /^.{10,500}$/,
    };

    if (!value.trim()) {
      error = `${name} is required.`;
    } else if (patterns[name] && !patterns[name].test(value)) {
      error = `Invalid ${name}. Please check the input.`;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateInput(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateInput(key, formData[key]);
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      // Here you would typically send the form data to your backend
      // Example: await axios.post('/api/contact', formData);
      toast.success("Form submitted successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        whatsappNumber: "",
        subject: "",
        contactmessage: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="contact-form-container">
      <div className="form-image">
        <div className="form-image-content">
          <div className="form-image-text">
            <h1>Contact Information</h1>
            <p>
              Follow us for the latest updates, exclusive service offers, and community stories. Join our network of trusted professionals and homeowners—because great care starts with a strong community. 🌟
            </p>
          </div>
          <div className="form-image-buttons">
            <Link to="#">Facebook</Link>
            <Link to="#">Instagram</Link>
            <Link to="#">LinkedIn</Link>
            <Link to="#">Gmail</Link>
          </div>
        </div>
      </div>
      <div className="contact-form-content">
        <form onSubmit={handleSubmit}>
          <div className="contact-form-heading">
            <h1>
              Please Fill In The <span> Form Below</span>
            </h1>
            <p>
              Have a question or need assistance? Fill out the form below, and
              our team will get back to you as soon as possible. We value your
              feedback and are here to help!
            </p>
          </div>
          <div className="contact-form-main-section">
            <div className="two-inputs">
              <div className="input-wrapper">
                <Input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} error={errors.firstname} />
                {errors.firstname && (
                  <small className="error-message">{errors.firstname}</small>
                )}
              </div>
              <div className="input-wrapper">
                <Input type={'text'} name={'lastname'} placeholder={"Last Name"} value={formData.lastname} onChange={handleInputChange} error={errors.lastname} />
                {errors.lastname && (
                  <small className="error-message">{errors.lastname}</small>
                )}
              </div>
            </div>
            <div className="two-inputs">
              <div className="input-wrapper">
                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                {errors.email && (
                  <small className="error-message">{errors.email}</small>
                )}
              </div>
              <div className="input-wrapper">
                <Input type="text" name="whatsappNumber" placeholder="WhatsApp Number" value={formData.whatsappNumber} onChange={handleInputChange} error={errors.whatsappNumber} />
                {errors.whatsappNumber && (
                  <small className="error-message">
                    {errors.whatsappNumber}
                  </small>
                )}
              </div>
            </div>
            <div className="one-input">
              <Input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} error={errors.subject} />
              {errors.subject && (
                <small className="error-message">{errors.subject}</small>
              )}
            </div>
            <div className="one-input">
              <textarea
                name="contactmessage"
                id="contactmessage"
                rows={5}
                placeholder="Enter Message"
                value={formData.contactmessage}
                onChange={handleInputChange}
                className={errors.contactmessage ? "error-input" : ""}
              ></textarea>
              {errors.contactmessage && (
                <small className="error-message">{errors.contactmessage}</small>
              )}
            </div>
            <div className="form-buttons">
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />

              <Button text={"Contact on Whatsapp"} type="button" onclick={() => window.open(`https://wa.me/+923088902622`, "_blank")} classes={"whiteBack"} />
              <Button text={"Submit your response"} type="submit" className="submit-button" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;