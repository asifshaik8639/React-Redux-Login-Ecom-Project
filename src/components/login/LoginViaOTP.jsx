import React from 'react';
import Link from '@mui/material/Link';
import '../../assets/login-page.css';

const LoginViaOTP = ({
    onMobileNumberInputHandler,
    handleGenerateOTP,
    showEmailFlow,
    mobileNumber,
    isMobileNumberValid,
    isLoginValid,
}) => {
  return (
    <>
        <div className='login-parent-container'>
            <div className='login-mnumber-section'>
                <h2>Login</h2>
                <div className='mobile-form-field'>
                    <label htmlFor="mnumber" required>Mobile number: </label>
                    <input type="text" value={mobileNumber} 
                            required 
                            onChange={(e) => onMobileNumberInputHandler(e)}
                            style={{ borderColor: isMobileNumberValid ? 'initial' : 'red' }}/>
                </div>
            </div>
            {
            isLoginValid !== null && 
                (
                    <div className='login-status-cls' >{ !isLoginValid ? 'OTP is valid' : 'Entered OTP is not valid'  }</div>
                )
            }
            {
                !isMobileNumberValid && 
                <p style={{ color: 'wheat' }}>Invalid phone number</p>
            }
            <div className='opt-email-btn-container'>
                <div className='login-btn-container'>
                    <button onClick={() => handleGenerateOTP()}>Login</button>
                </div>

                <div className='login-using-email-btn'>
                    <Link component="button" variant="body2" 
                        onClick={() => showEmailFlow()} > continue using email</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginViaOTP;