// Forgot-Password.jsx
import React, { useState } from "react";
import './Forgot-Password.css';
import axios from "axios";
import { OtpVerification1 } from "./OtpVerification1"; // Import OtpVerification1 here

function ForgotPassword(props : any) {
    const [email, setEmail] = useState('');
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [emailNotFoundError, setEmailNotFoundError] = useState(false);
   
    const handleSubmit = async (e : any) => {
        e.preventDefault();
    
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailFormatError(true);
            alert('Please enter a valid email address.');
            return;
        }
    
        try {
            // Check if the email is registered
            const checkEmailResponse = await axios.post('http://localhost:8081/CheckEmail', { EmailAcc: email });
    
            if (checkEmailResponse.data === 'exists') {
                // Email is registered, proceed with OTP sending
                const otpResponse = await axios.post('http://localhost:8081/sendOTP', { email: email });
    
                if (otpResponse.data.status === 'success') {
                    // OTP sent successfully, set state to show OtpVerification
                    setShowOtpVerification(true);
                } else {
                    // Handle OTP sending failure
                    alert('Error sending OTP. Please try again.');
                }
            } else {
                // Email is not registered
                setEmailNotFoundError(true);
                alert('This email is not registered. Please enter a registered email.');
            }
        } catch (error) {
            console.error('Error during email and OTP verification:', error);
            alert('Error during email and OTP verification. Please try again.');
        }
    };
    return (
        <div className="Forgot-Password-container">
                {showOtpVerification ? (
                    <OtpVerification1 email={email} onFormSwitch={props.onFormSwitch} />
                ) : (
                    <div className="Forgot-Password-auth-form-container">
                    <h2 style={{display:"flex", justifyContent:"center"}}>Forgot Password</h2>
                    <form className="Forgot-Password-form" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="loginlabel"><strong>Email:</strong></label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="you@example.com"
                            id="email"
                            name="Email"
                            className="form-control"
                        />
                        <div className="form-actions">
                            <button className="btn btn-primary" type="submit">
                                Forgot Password
                            </button>
                        </div>
                    </form>
                    </div>
                )}
            
        </div>
    );
}

export default ForgotPassword;

