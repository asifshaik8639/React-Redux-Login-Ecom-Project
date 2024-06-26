import {
    loginOTPSuccess,
    loginOTPFailure
} from '../features/loginOTPSlice';

export const sendOTPWithTwilio = () => {
  return async (dispatch) => {
        await fetch('https://35.154.88.150:3007/api/v1/auth/send-otp-with-twilio', {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            // Add any other headers if needed
            },
            // Add the request body if needed
            // body: JSON.stringify({ key: 'value' }),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(result => {
            // Handle the data
            // setSecret(result.secret);
            // setQrCode(result.qrCode);
            console.log(result);
           dispatch(loginOTPSuccess(result));
        })
        .catch(error => {
            // Handle errors
            console.error(`Error in handleGenerateOTP function: ${error}`);
            dispatch(loginOTPFailure(true));
        });
  };
};
