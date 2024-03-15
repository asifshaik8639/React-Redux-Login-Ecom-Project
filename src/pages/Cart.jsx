import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setSelectedPage} from '../redux/features/commonSlice';
import {removeCartItem} from '../redux/features/ProductsCartSlice';

import '../App.css';

const Cart = () => {

    const [productCartList, setProductCartList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartListsOfProducts } = useSelector((state) => state.productsCart);

    useEffect(() => {
      if(Array.isArray(cartListsOfProducts) && cartListsOfProducts.length > 0) {
          setProductCartList(cartListsOfProducts);
      } else {
        setProductCartList([]);
          console.log('in product details else case');
      }

    },[cartListsOfProducts]);

    const onGoToCheckoutClickHandler = (event) => {
      dispatch(setSelectedPage("Checkout"));
    }

    const onContinueShoppingClickHandler = (event) => {
      dispatch(setSelectedPage("Home"));
    };

    const calculateTotalAmount = () => {
      return cartListsOfProducts?.reduce((total, item) => total + item?.price, 0);
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
                          
                            <span className='remove-cart-item-cls' 
                                  onClick={(e) => onRemoveItemHandler(e, item) } > Remove </span>
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
        <p className='cart-items-total-amount-cls'>Cart Items Total Amount: $ {calculateTotalAmount()}</p>
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