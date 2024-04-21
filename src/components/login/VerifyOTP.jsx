// src/components/VerifyOTP.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/login-page.css' ;
import { useDispatch, useSelector } from 'react-redux';
import { veriyOTPAsyncThunk } from '../../redux/actions/veriyOTPAsyncThunk';
import { setLoggedIn } from '../../redux/features/commonSlice';
import { Validations } from '../../utils/Validations';

const VerifyOTP = ({ secret, 
                     qrCode, 
                     mobileNumber, 
                     setSecret, 
                     setQrCode,
                     handleRegenerateOTP }) => {
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    isLoggedIn
   } = useSelector((state) => state.common);

  const {
          data: verifyOTPResponse, 
          loading: verifyOTPLoading, 
          error: verifyOTPError, 
          status: verifyOTPStatus
        }  = useSelector((state) => state.verifyOTP);

  const handleVerifyOTP = async () => {
    try {
        const isValidOTP = Validations.isValidOTPNumber(otp);
        if(isValidOTP) {
          dispatch(veriyOTPAsyncThunk(secret, otp));
        } else {
          setIsValid(false);
        }
    } catch (err) {
      console.error('Verify with OTP Failed', err);
    }
  };

  useEffect(() => {

    if (!verifyOTPLoading
        && !verifyOTPError
        && !!verifyOTPResponse) {

          // console.log('verifyOTPLoading ', verifyOTPLoading);
          // console.log('verifyOTPError ', verifyOTPError);
          // console.log('verifyOTPResponse ', verifyOTPResponse);

          if(verifyOTPResponse?.isValid) {
            console.log('OTP Verified successfully and navigating to home page');
             // to the common slice to set login in true
            dispatch(setLoggedIn(true)); 
            setIsValid(verifyOTPResponse?.isValid);
            
            navigate('/home');
          } else {
            setIsValid(false);
          }
      } 
  }, [
      verifyOTPLoading, 
      verifyOTPError, 
      verifyOTPResponse
    ]);

  const onEditPhoneNumberHandler = (event) => {
    setSecret(null);
    setQrCode(null);
  };

  useEffect(() => {
    setOtp('');
    setIsValid(null);
  }, [secret, qrCode]);

  console.log('in verify OTP Component');

  return (
    <div className='verify-otp-container'>

      <div className='edit-number-section'>
          <input type="number" value={mobileNumber} readOnly disabled />
          <span className='login-num-edit-cls' 
                onClick={(e) => onEditPhoneNumberHandler(e) } > edit</span>
          <button onClick={(e) => handleRegenerateOTP(e)}>Resend OTP</button>
      </div>

      <div className='verify-otp-section'>
        <input type="text" value={otp} placeholder='Enter OTP'
          onChange={(e) => setOtp(e.target.value)} />
        <button onClick={() => handleVerifyOTP()}>Verify and Login</button>
      </div>
      {
       isValid !== null && 
          (
            <div className='otp-status-cls' >{isValid ? 'OTP is valid' : 'Entered OTP is not valid'}</div>
          )
      }
    </div>
  );
};

export default VerifyOTP;
