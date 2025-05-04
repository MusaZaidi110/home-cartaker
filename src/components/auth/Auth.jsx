import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGoogle,
    faFacebookF
} from '@fortawesome/free-brands-svg-icons';
import './Auth.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '../../elements/button/Button';
import Input from '../../elements/input/Input';

const Auth = () => {
    const [isActive, setIsActive] = useState(true);
    const [signUpErrors, setSignUpErrors] = useState({});
    const [signInErrors, setSignInErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const validateSignUpForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with at least one letter and one number';
        }

        setSignUpErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const validateSignInForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setSignInErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (signUpErrors[name]) {
            setSignUpErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (signInErrors[name]) {
            setSignInErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateSignUpForm(true)) {
            toast.error('Please Fill All Fields!');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Account created successfully!');
            setFormData({ name: '', email: '', password: '' });
            setIsActive(false); // Switch to sign in after successful registration
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.error('Sign up error:', error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!validateSignInForm(false)) {
            toast.error('Please Fill All Fields!');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Logged in successfully!');
            // Redirect or handle successful login here
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
            console.error('Sign in error:', error);
        }
    };

    return (
        <section className='mainContainer'>
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
            <div className={`container ${isActive ? 'active' : ''}`}>
                {/* Sign Up Form */}
                <div className="form-container sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <Link to="#/" className="icon">
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                            <Link to="#/" className="icon">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                        </div>
                        <span>or use your email for registration</span>
                        <Input type={"text"} name={"name"} placeholder={"Enter Your Name"} value={formData.name} onChange={handleChange} error={signUpErrors.name} />
                        {signUpErrors.name && (
                            <div className="error" style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                                <small className="error-message">{signUpErrors.name}</small>
                            </div>
                        )}
                        <Input type={"email"} name={"email"} placeholder={"Enter Your Email"} value={formData.email} onChange={handleChange} error={signUpErrors.email} />
                        {signUpErrors.email && (
                            <div className="error" style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                                <small className="error-message">{signUpErrors.email}</small>
                            </div>
                        )}
                        <Input type={"password"} name={"password"} placeholder={"Enter Your Password"} value={formData.password} onChange={handleChange} error={signUpErrors.password} />
                        {signUpErrors.password && (
                            <div className="error" style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                                <small className="error-message">{signUpErrors.password}</small>
                            </div>
                        )}
                        <Button text="Sign Up" type="submit" />
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <Link to="#/" className="icon">
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                            <Link to="#/" className="icon">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                        </div>
                        <span>or use your email password</span>
                        <Input type={"email"} name={"email"} placeholder={"Enter Your Email"} value={formData.email} onChange={handleChange} error={signInErrors.email} />
                        {signInErrors.email && (
                            <div className="error" style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                                <small className="error-message">{signInErrors.email}</small>
                            </div>
                        )}
                        <Input type={"password"} name={"password"} placeholder={"Enter Your Password"} value={formData.password} onChange={handleChange} error={signInErrors.password} />
                        {signInErrors.password && (
                            <div className="error" style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                                <small className="error-message">{signInErrors.password}</small>
                            </div>
                        )}
                        <Link to="#/">Forget Your Password?</Link>
                        <Button text="Sign In" type="submit" />
                    </form>
                </div>

                {/* Toggle Container */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <Button text={"Sign In"} classes={"secondary"} onclick={() => setIsActive(false)} />
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <Button text={"Sign Up"} classes={"secondary"} onclick={() => setIsActive(true)} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;