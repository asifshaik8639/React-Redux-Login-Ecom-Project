// actions.js
import axios from 'axios';
import {createOrderSuccess, createOrderFailure} from '../features/PaymentProcessSlice';
import { useSelector} from 'react-redux';
import {
        RAZOR_PAY_KEY_ID, 
        PAYMENT_IN_CURRENCY,
        PAYMENT_PREFILL_DATA
      } from '../../utils/Constants.js';

export const createOrderAndCheckout = (totalCartAmount) => {

  return async (dispatch) => {
    try {
      
      const response = await axios.post('http://127.0.0.1:3001/payment/create-order', {
        totalCartAmount,
        selectedCurrency: PAYMENT_IN_CURRENCY
      });
      const { id } = response.data;

      console.log('id from createOrder success => ', id);
     
      // Redirect user to Razorpay checkout page
      const options = {
        key: RAZOR_PAY_KEY_ID,
        amount: totalCartAmount,
        currency: PAYMENT_IN_CURRENCY,
        order_id: id,
        handler: (response) => {
          console.log(`Payment successful: ${response.razorpay_payment_id}`);
          console.log('response from createOrderAndCheckout success => ', response);
          dispatch(createOrderSuccess({data: response.razorpay_payment_id}));
         // dispatch(resetCartState());
          //dispatch(setSelectedPage('YourOrderedItems'));
          // Handle payment success logic
        },
        prefill: { // test data
          name: PAYMENT_PREFILL_DATA.NAME,
          email: PAYMENT_PREFILL_DATA.EMAIL
        }
      };
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      dispatch(createOrderFailure(true));
      console.error('in catch handler of createOrderAndCheckout with error => ', error);
    }
  };
};
