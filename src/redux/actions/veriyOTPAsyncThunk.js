// actions.js
import axios from 'axios';
import { 
    loading, 
    verifyOTPSuccess, 
    verifyOTPFailure
} from '../features/verifyOTPSlice';

export const veriyOTPAsyncThunk = (secret, otp) => {
  return async (dispatch) => {
    try {

      console.log('in  veriyOTP actions with otp => ', otp);
      // console.log('in  veriyOTP actions with secret => ', secret);
      const response = await axios.post('https://35.154.88.150:3007/api/v1/auth/verify-otp', { secret, otp });
      console.log('response from veriyOTP actions => ', response);
      dispatch(verifyOTPSuccess(response?.data));
    } catch (error) {
      dispatch(verifyOTPFailure(true));
      console.log('in catch handler of veriyOTP actions => ', error);
    }
  };
};
