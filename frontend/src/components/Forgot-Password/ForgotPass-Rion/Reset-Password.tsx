// ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import './Reset-Password.css';
import { useNavigate } from "react-router-dom";

export const ResetPassword = (props : any ) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [resetError, setResetError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = () => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e : any ) => {
        e.preventDefault();
    
        // Validate password and confirm password
        validatePassword();
        validateConfirmPassword();
    
        // Check if there are any validation errors
        if (passwordError || confirmPasswordError) {
            console.log('Form has errors. Please fix them before submitting.');
            return;
        }
    
        setLoading(true);
    
        try {
            // Send user data and new password to the server for password reset
            const resetPasswordResponse = await axios.post('http://localhost:8081/ResetPassword', {
                EmailAcc: props.email,
                NewPassword: password,
            });
    
            console.log('Reset Password Response:', resetPasswordResponse.data);
    
            if (resetPasswordResponse.data.status === 'success') {
                // Password reset successful
                console.log('Password reset successful');
                // Redirect to the login page
                console.log(props.email);
                alert("Password changed successfully");
                navigate("/login")
            } else {
                // Password reset failed
                console.log('Password reset failed');
                alert('Password reset failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            alert('Error during password reset. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Reset-Password-container">
            <div className="Reset-Password-auth-form-container">
            <h2 style={{display:"flex", justifyContent:"center"}}>Reset Password</h2>
                <form className="Reset-Password-form" onSubmit={handleSubmit}>
                    <label htmlFor="password" className="Reset-Password-label"><strong>New Password:</strong></label>
                    <div className="password-input">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePassword}
                            type={showPassword ? "text" : "text"}
                            placeholder="Enter 6 Characters or more"
                            id="password"
                            name="Password"
                            className="form-control"
                        />
                        {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>
                    <label htmlFor="confirmPassword" className="Reset-Password-label"><strong>Confirm New Password:</strong></label>
                    <div className="password-input">
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={validateConfirmPassword}
                            type="password "
                            placeholder="Enter 6 Characters or more"
                            id="confirmPassword"
                            name="ConfirmPassword"
                            className="form-control"
                        />
                        {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                    </div>
                    {resetError && <div className="error-message">{resetError}</div>}
                    <div className="Reset-Password-form-actions">
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;