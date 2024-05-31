// actions.js
import axios from 'axios';
import { loading, 
         loginEmailSuccess, 
         loginEmailFailure} from '../features/loginEmailSlice';

export const authEmailCredentials = (username, password) => {

  return async (dispatch) => {
    try {
          dispatch(loading());
          const response = await axios.post('http://127.0.0.1:3007/auth/login', {
            username,
            password,
          });
    
          console.log('response from authEmailCredentials in actions ', response);
          // setUser(response.data.userCredentials);
    
          if(response.statusText === 'OK' && response.status === 200) {
            dispatch(loginEmailSuccess(response.data));
          } else {
            throw new Error('Login failed with the Email flow');
          }

    } catch (error) {
        dispatch(loginEmailFailure(true));
        console.error('in catch handler of authEmailCredentials with error => ', error);
    }
  };
};
