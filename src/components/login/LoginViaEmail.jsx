import React, {usest} from 'react';
import Link from '@mui/material/Link';
import '../../assets/login-page.css';

const LoginViaEmail = ({
    onEmailChangeHandler,
    onPasswordChangeHandler,
    handleLoginWithEmailCredentials,
    showOTPFlow,
    username,
    password,
    isEmailLoginValid,
    isValidEmail
}) => {

  return (
        <form className='login-parent-container'>
        <h2>Login</h2>
        <div className='login-mnumber-section form-fields'  >
        <label  htmlFor="username">Email: </label>
          <input type="text" id="username" 
                name="username" value={username}
                onChange={(e) => onEmailChangeHandler(e)} 
                style={{ borderColor: isValidEmail ? 'initial' : 'red' }}/>
        </div>

        <div className='login-mnumber-section form-fields' >
          <label  htmlFor="password">Password: </label>
        <input type="password" id="password" 
                name="password" 
                value={password}
                onInput={(e) => onPasswordChangeHandler(e)}
                />
        </div>

        {
        isEmailLoginValid !== null && 
            (
            <div className='login-status-cls' >
                {
                isEmailLoginValid ? 'Login is valid' : 'Entered Login details are not valid'
                }
            </div>
            )
        }
        {
            !isValidEmail && 
            <p style={{ color: 'wheat' }}>Invalid Email ID</p>
        }

        <div className='otp-mobile-btn-container'>
            <div>
            <button type="submit" onClick={(e) => handleLoginWithEmailCredentials(e)}>Login</button>
            </div>

            <div className='login-using-email-btn'>
            <Link component="button" variant="body2" 
                onClick={() => showOTPFlow()} > continue using mobile</Link>
            </div>
        </div>
        </form>
  )
}

export default LoginViaEmail;