// VideoPlayer.js

import React, {useEffect, useState} from 'react';
import WIP from './WIP';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileData } from '../redux/actions/getUserProfileData';
import {setSelectedPage} from '../redux/features/commonSlice'; 
import '../assets/user-profile.css';

const User = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(1);
  const [userProfileResponse, setUserProfileResponse] = useState(null);

  const onContinueShoppingClickHandler = (event) => {
    dispatch(setSelectedPage("Home"));
  }

  const onGoToCartClickHandler = (event) => {
    dispatch(setSelectedPage("Cart"));
  };

  const { userProfileData, userProfileError } = useSelector((state) => state.common);

  useEffect(() => {
    if(!!userProfileData && !userProfileError) {
      setUserProfileResponse(userProfileData);
    }

  },[userProfileData, userProfileError]);

  useEffect(() =>{
    dispatch(getUserProfileData(1));
  }, [userId]);

  return (
    // <div className='user-profile-container' 
    //     onClick={(e) => onContinueShoppingClickHandler(e)}>
    //    <WIP/>
    // </div>
    <>
    {
      <div className='userProfileParentContainer'>

         <div className='image-position-container-cls'>
          <div className='header-container background-for-search-bar'></div>
          <h2 className='image-label-cls'>User Details </h2>
        </div>

          <div key='user-list-data' className='userProfileDetailsContainer'>
            {
                !!userProfileResponse &&
                Object.entries(userProfileResponse).map(([key, value]) => {
                  return  <div className='user-profile-item-cls'
                            key={`${key}`} >
                            {`${key}: ${value}`}
                          </div>
                })
            }
            {
              !!userProfileError && <p> No Profile Data</p>
            }
          </div>
      </div>
    }
    {
         <div className='prod-details-btns-Container'>

              <button onClick={(e) => onGoToCartClickHandler(e)} 
              >Go to Cart</button>

              <button onClick={(e) => onContinueShoppingClickHandler(e)} 
              >Continue Shopping</button>

          </div> 
    }

    </>
  );
};

export default User;

