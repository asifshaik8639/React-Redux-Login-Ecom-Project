// VideoPlayer.js

import React from 'react';
import WIP from './WIP';
import { useDispatch } from 'react-redux';
import {setSelectedPage} from '../redux/features/commonSlice';
import '../assets/media.css';

const User = () => {
  const dispatch = useDispatch();

  const onContinueShoppingClickHandler = (event) => {
    dispatch(setSelectedPage("Home"));
  }

  return (
    <div className='user-profile-container' 
        onClick={(e) => onContinueShoppingClickHandler(e)}>
       <WIP/>
    </div>

  );
};

export default User;

