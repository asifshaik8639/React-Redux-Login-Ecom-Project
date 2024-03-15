import React from 'react';
import WIP from './WIP';
import { useDispatch } from 'react-redux';
import {setSelectedPage} from '../redux/features/commonSlice';
import '../assets/media.css';

const Checkout = () => {
  const dispatch = useDispatch();

  const onContinueShoppingClickHandler = (event) => {
    dispatch(setSelectedPage("Home"));
  }

  return (
    <div className='checkout-container' 
        onClick={(e) => onContinueShoppingClickHandler(e)}>
        <div className='image-position-container-cls'>
          <div className='header-container background-for-search-bar'></div>
          <h2 className='image-label-cls'>Checkout </h2>
        </div>
       <WIP/>
    </div>

  );
};

export default Checkout;