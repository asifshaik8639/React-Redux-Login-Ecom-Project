import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setSelectedPage} from '../redux/features/commonSlice';
import {removeCartItem, resetCartState} from '../redux/features/ProductsCartSlice';
import {setOrderedProductAfterPaymentSuccess,
        resetPaymentProcessState} from '../redux/features/PaymentProcessSlice';
import {createOrderAndCheckout} from '../redux/actions/createOrderAndCheckout';
import VoiceCommand from '../components/VoiceCommand';
import { VOICE_COMMAND_NOT_MATCH } from '../utils/Constants';
import '../App.css';

const Cart = () => {

    const [productCartList, setProductCartList] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const voiceCommandref = useRef(null);
    const script = document.createElement('script');

    const { cartListsOfProducts } = useSelector((state) => state.productsCart);

    const { razorPaymentID } = useSelector((state) => state?.paymentProcess);

    const { data: loginEmailData } = useSelector((state) => state?.loginEmail);

    console.log("Login email data test pass = >", loginEmailData?.userCredentials?.firstname);


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

    const onCheckoutVoiceCommandHandler = (event) => {
      onGoToCheckoutClickHandler();
    };

    const onGoToShoppingVoiceCommandHandler  = (event) => {
      onContinueShoppingClickHandler();
    };

    const calculateTotalAmount = () => {
      const totalCartAmount =  cartListsOfProducts?.reduce((total, item) => total + (item?.price * 80), 0);
      return totalCartAmount;
    };

    const onRemoveItemHandler = (event, selectedProduct) => {
      dispatch(removeCartItem(selectedProduct?.id));
    };

    const onVoiceCommandHandler = (command) => {
      if (command.includes('checkout') || command.includes('check out') || command.includes('check')) {
          console.log('In cart ***** checkout flow ');
        // const item = command.replace('add', '').trim();
        onGoToCheckoutClickHandler();
      } else if (command.includes('shopping')) {
          console.log('in cart **** Go to shopping flow ');
        // const item = command.replace('remove', '').trim();
        onContinueShoppingClickHandler();
      } else {
        const speechSynthesis = window.speechSynthesis;
        const userName = loginEmailData?.userCredentials?.firstname || 'User';
        const sentenceToSpeak = `Hello ${userName}  ${VOICE_COMMAND_NOT_MATCH}`;
        const utterance = new SpeechSynthesisUtterance(sentenceToSpeak);
  
        // Optional: Set properties on the utterance
        utterance.pitch = 1; // Default is 1
        utterance.rate = 1;  // Default is 1
        utterance.volume = 1; // Default is 1
  
        // Speak the text
        speechSynthesis.speak(utterance);
      }
    };

    const startListening  = (event) => {
      voiceCommandref.current.startListening();
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
          <div className='prod-details-btns-Container prod-details-btns-margin-container'>

              <button onClick={(e) => onGoToCheckoutClickHandler(e)} 
              >Go to Checkout </button>

              <button onClick={(e) => onContinueShoppingClickHandler(e)} 
              >Continue Shopping</button>

              <VoiceCommand
                  ref={voiceCommandref} 
                  onhandleVoiceCommand={(command) => onVoiceCommandHandler(command)}
                  setIsListening={setIsListening}
              >
                <div className='prod-details-btns-Container'>
                  <button  
                            onClick={() => startListening()}>
                          {isListening ? 'Listening...' : 'Start Voice Command'}
                  </button>
                </div>
              </VoiceCommand>

          </div> 
      }

      </>
  
    )
}

export default Cart;