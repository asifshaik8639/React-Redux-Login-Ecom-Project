// actions.js
import axios from 'axios';
import {increment, decrement, getApiResponse,
    incrementByAmount} from '../features/shoppingSlice';

export const fetchUserData = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      dispatch(incrementByAmount(5));
    } catch (error) {
      dispatch(decrement());
    }
  };
};
