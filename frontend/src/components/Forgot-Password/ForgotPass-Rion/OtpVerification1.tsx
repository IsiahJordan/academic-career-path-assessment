// OtpVerification1.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Otp-Verification1.css";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./Reset-Password";

export const OtpVerification1 = (props : any) => {
    const [Verification_Code, setVerification_Code] = useState('');
    const [isOtpCorrect, setIsOtpCorrect] = useState(false);
    const [showResetPassword, setshowResetPassword] = useState(false);
    

    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (Verification_Code.trim() === '') {
            // Don't proceed if the OTP is not entered
            return;
        }

        try {
            // Check if the entered OTP is correct
            const response = await axios.post('http://localhost:8081/VerifyOTP', {
                
                email: props.email,  // Access the email prop
                otp: Verification_Code,
            });

            console.log('VerifyOTP Response:', response.data);

            if (response.data === 'success') {
                // OTP verification successful
                setshowResetPassword(true);
                // Pass the email to the ResetPassword component
                //props.onFormSwitch('Reset-Password', props.email);
                console.log(props.email)
                alert("OTP successfully verified")
                
            } else {
                // OTP verification failed
                setIsOtpCorrect(false);
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
        }
    };

   

    const isFormValid = Verification_Code.trim() !== '';

    return (
        <div className="Otp-container1">
            {showResetPassword ? (
                    <ResetPassword email={props.email} onFormSwitch={props.onFormSwitch} />
                ) : (
                    <div className="Otp-auth-form-container1">
                <h2 style={{display:"flex", justifyContent:"center"}}>OTP Verification</h2>
                
                <div className="Otp-message-container1">
                    {isOtpCorrect ? (
                        <label className="message-label1">Account Verified Successfully</label>
                    ) : (
                        <label className="message-label1">We've sent a verification code to your email</label>
                    )}
                </div>
                <div className="input-code">
                <input
                    value={Verification_Code}
                    onChange={(e) => setVerification_Code(e.target.value)}
                    type="text"
                    placeholder="Enter Verification Code"
                    id="verification_Code"
                    name="Verification_Code"
                    className="form-control"
                />
                </div>
                
                <div className="otp-form-actions">
                <button type="button" onClick={handleSubmit} disabled={!isFormValid} className="btn btn-primary">
                    VERIFY
                </button>
                </div>
                
                </div>

                )}
            
        </div>
    );
};

export default OtpVerification1;