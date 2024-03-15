// actions.js
import { setUserProfile, setUserProfileError } from '../features/commonSlice';

export const getUserProfileData = (id) => {
  return async (dispatch) => {
    try {

        const response = await fetch(`http://127.0.0.1:3001/user/userprofile/${id}`);
        const result = await response.json();
        console.log('client response from fetchUserData => ', result.data);
        dispatch(setUserProfile(result.data));
      
    } catch (error) {
        console.error('in catch handler of getUserProfileData with Error => ', error);
        dispatch(setUserProfileError(true));
    }
  };
};
