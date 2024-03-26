import React, { useState, useEffect, useInsertionEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setSelectedPage} from '../redux/features/commonSlice';
import {removeCartItem, resetCartState} from '../redux/features/ProductsCartSlice';
import {setOrderedProductAfterPaymentSuccess,
  resetPaymentProcessState} from '../redux/features/PaymentProcessSlice';
import {createOrderAndCheckout} from '../redux/actions/createOrderAndCheckout';

import '../App.css';

const Cart = () => {

    const [productCartList, setProductCartList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const script = document.createElement('script');

    const { cartListsOfProducts } = useSelector((state) => state.productsCart);

    const { razorPaymentID } = useSelector((state) => state?.paymentProcess);

    useEffect(() => {
      if(Array.isArray(cartListsOfProducts) && cartListsOfProducts.length > 0) {
          setProductCartList(cartListsOfProducts);
      } else {
        setProductCartList([]);
          console.log('in Cart details else case');
      }

    },[cartListsOfProducts]);


    const loadRazorpayScript = async () => {
      return new Promise((resolve, reject) => {
        
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
  
    async function initializeRazorpay() {
      try {
        await loadRazorpayScript();
        console.log('Razorpay script loaded successfully.');
        // Proceed with Razorpay initialization or any other actions
      } catch (error) {
        console.error('Failed to load Razorpay script:', error);
        // Handle error, retry loading, or show appropriate message to the user
      }
    }
  
    useEffect(() => {
        // Load Razorpay SDK script dynamically
       initializeRazorpay();
  
      return () => {
        // Clean up: remove the script from the DOM
        document.body.removeChild(script);
      };
    }, []);


    const performActionsInOrder = async () => {
        await dispatch(setOrderedProductAfterPaymentSuccess(cartListsOfProducts.slice()));
        dispatch(setSelectedPage('YourOrderedItems'));
        dispatch(resetPaymentProcessState());
        dispatch(resetCartState());
    };

    useEffect(() => {
        if(cartListsOfProducts?.length > 0 && !!razorPaymentID) {
          console.log('Razorpay success and moved to order page');

          performActionsInOrder();

        }
    }, [razorPaymentID]);

    const onGoToCheckoutClickHandler = (event) => {
      const totalCartAmount = calculateTotalAmount();
      //as per Razorpay standard policy for INR Conversion to convert to paise
      const totalAmountInPaise = totalCartAmount * 100; 
      dispatch(createOrderAndCheckout(totalAmountInPaise));
    }

    const onContinueShoppingClickHandler = (event) => {
      dispatch(setSelectedPage("Home"));
    };

    const calculateTotalAmount = () => {
      const totalCartAmount =  cartListsOfProducts?.reduce((total, item) => total + (item?.price * 80), 0);
      return totalCartAmount;
    };

    const onRemoveItemHandler = (event, selectedProduct) => {
      dispatch(removeCartItem(selectedProduct?.id));
    };

    return (
      <>
      {
         
          <div key='cart-list-data' className='prodDetailsContainer'>

            <div className='image-position-container-cls'>
              <div className='header-container background-for-search-bar'></div>
              <h2 className='image-label-cls'>Cart Details </h2>
            </div>

            {
                !!productCartList && productCartList?.map((item, index) => {
                return  <div className='flex-item-cls cart-item'
                            key={`${index}flex-item`} 
                             >
                            <img className='prod-img-cls' 
                                key={`${index}image`} 
                                src={item.image} />
                            <div className='prodcut-title-cls'
                                key={`${index}title`} >
                                {item.title}
                            </div>
                            <div className='prodcut-price-cls'
                                key={`${index}price`}>
                                {`Price: $ ${item.price}`}
                            </div>
                          
                            <div className='remove-cart-item-cls' 
                                  onClick={(e) => onRemoveItemHandler(e, item) } > Remove </div>
                        </div>
                })
            }
            {
              calculateTotalAmount() === 0 && 
              <h4 className='no-cart-items-cls'>Currently no Items in the cart</h4>
            }
          </div>
      }
      {
        calculateTotalAmount() > 0 && 
        <p className='cart-items-total-amount-cls'>Cart Items Total Amount: Rs.{calculateTotalAmount()}</p>
      }
      {
           Array.isArray(cartListsOfProducts) && cartListsOfProducts.length > 0 && 
           <div className='prod-details-btns-Container'>

                <button onClick={(e) => onGoToCheckoutClickHandler(e)} 
                >Go to Checkout</button>

                <button onClick={(e) => onContinueShoppingClickHandler(e)} 
                >Continue Shopping</button>

            </div> 
        }

      </>
  
    )
}

export default Cart;