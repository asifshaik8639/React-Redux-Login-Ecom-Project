// src/App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import GenerateOTP from './components/GenerateOTP';
import VerifyOTP from '../components/login/VerifyOTP';
import { LOGINFAILED } from '../utils/Constants';
import axios from 'axios';
import '../assets/login-page.css' ;//  './assets/login-page.css';
import { Validations } from '../utils/Validations';
import LoginViaEmail from '../components/login/LoginViaEmail';
import LoginViaOTP from '../components/login/LoginViaOTP';
import {QR_CODE_ALT_NOTE} from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, selectCommonState } from '../redux/features/commonSlice';

import {authEmailCredentials} from '../redux/actions/authEmailCredentials';

import { sendOTPWithTwilio } from '../redux/actions/sendOTPWithTwilio';

import QRCodeComponent from '../components/login/QRCodeComponent';

function Login() {
  
  const [secret, setSecret] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [isLoginValid, setIsLoginValid] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');

  const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);

  const [isValidEmail, setIsValidEmail] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [isEmailLoginValid, setIsEmailLoginValid] = useState(null);
  const navigate = useNavigate();

  const [isEmailLoginFlow, setIsEmailLoginFlow ]= useState(false);
  const dispatch = useDispatch();

  const {
    isLoggedIn
   } = useSelector((state) => state.common);

  const {
    loading: loginEmailLoading, 
    error: loginEmailError, 
    data: loginEmailData,
    token: loginEmailToken,
    status: loginEmailStatus
   } = useSelector((state) => state.loginEmail);

  const {
    loading: loginOTPLoading, 
    data: loginOTPData, 
    error: loginOTPError, 
    status: loginOTPStatus 
  } = useSelector((state) => state.loginOTP);

  const onMobileNumberInputHandler = (event) => {
    const inputValue = event.target.value;
    setMobileNumber(inputValue);
    setIsMobileNumberValid(/^\d+$/.test(inputValue) && inputValue.length >= 10);
  };

  const showEmailFlow = () => {
    setIsEmailLoginFlow(true);
    setUsername('');
    setPassword('');
  }

  const showOTPFlow = () => {
    setIsEmailLoginFlow(false);
    setMobileNumber('');
  }

  const onEmailChangeHandler = (event) => {
    const inputValue = event?.target?.value;
    setUsername(inputValue);
    setIsValidEmail(Validations.isValidEmailID(inputValue));
  } 

  const onPasswordChangeHandler = (event) => {
    setPassword(event?.target?.value)
  };

  const handleGenerateOTP = async () => {
    const isValidNumber = Validations.isValidPhoneNumber(mobileNumber);

    if(isValidNumber) {
      console.log('before dispatch in handleGenerateOTP');
        dispatch(sendOTPWithTwilio());
    } else {
      setIsMobileNumberValid(false);
    }
  };

  const handleLoginWithEmailCredentials = async (event) => {
    try {
        event.preventDefault();
        const isEmailEnteredValid = Validations.isValidEmailID(username);

        if(isEmailEnteredValid) {
           dispatch(authEmailCredentials(username, password)); 
        } else {
          setIsValidEmail(false);
        }
    } catch (error) {
        console.error('Login with email flow failed:', error);
        setIsEmailLoginValid(false);
    }
  };

  useEffect(() => {
    // Check the updated state after the thunk has completed
    // and Write your condition based on the updated state here

    if (!loginEmailLoading
        && !loginEmailError
        && !!loginEmailData ) {
          // to the common slice to set login in true
          dispatch(setLoggedIn(true)); 
          console.log("in success handler");
          setIsEmailLoginValid(true) ;
          setJwtToken(loginEmailToken);
          navigate('/home');
    } else {
         if(loginEmailStatus === 'failure') {
          // to the common slice to set login in false
          console.log("in failure handler");
          setIsEmailLoginValid(false) ;
         }
    }
  }, [
       loginEmailLoading, 
       loginEmailError, 
       loginEmailData, 
       loginEmailToken,
       loginEmailStatus
      ]);

      useEffect(() => {

        if (!loginOTPLoading
            && !loginOTPError
            && !!loginOTPData) {
              console.log("in login OTP success handler");
              setSecret(loginOTPData.secret);
              setQrCode(loginOTPData.qrCode);
        } else {
          if(loginOTPStatus === "failure") {
              setIsLoginValid(LOGINFAILED);
          }
        }

      }, [
          loginOTPLoading, 
          loginOTPData, 
          loginOTPError, 
          loginOTPStatus
        ]);

  return (
      <div className='page-container login-main-container'>
        {
          isEmailLoginFlow ?
          <>
            <LoginViaEmail 
                onEmailChangeHandler={(e) => onEmailChangeHandler(e)}
                onPasswordChangeHandler={(e) => onPasswordChangeHandler(e)}
                handleLoginWithEmailCredentials={(e) => handleLoginWithEmailCredentials(e)}
                showOTPFlow={(e) => showOTPFlow(e)}
                username={username}
                password={password}
                isEmailLoginValid={isEmailLoginValid}
                isValidEmail={isValidEmail}
            ></LoginViaEmail>
          </>
          :
          <>
              {
                  !secret  ?
                      <LoginViaOTP
                        onMobileNumberInputHandler={(e) => onMobileNumberInputHandler(e)}
                        handleGenerateOTP={(e) => handleGenerateOTP(e)}
                        showEmailFlow={(e) => showEmailFlow(e)}
                        mobileNumber={mobileNumber}
                        isMobileNumberValid={isMobileNumberValid}
                        isLoginValid= {isLoginValid}
                      ></LoginViaOTP>
                  :
                  <div>
                      {
                        secret && 
                        <VerifyOTP 
                          secret={secret} 
                          qrCode={qrCode}
                          setSecret={setSecret}
                          setQrCode={setQrCode}
                          mobileNumber={mobileNumber}
                          handleRegenerateOTP={() => handleGenerateOTP()}
                        />
                      }
                  </div>
              }
              <QRCodeComponent qrCode = {qrCode}></QRCodeComponent>
          </>
        }
      </div>
  );
}

export default Login;
