import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setSelectedPage} from '../redux/features/commonSlice';
import '../App.css';

const DispatchedOrderedItems = () => {

    const [yourOrdersList, setYourOrdersList] = useState([]);
    const dispatch = useDispatch();

    const { orderedProductsList } = useSelector((state) => state.paymentProcess);

    useEffect(() => {
      if(Array.isArray(orderedProductsList) && orderedProductsList.length > 0) {
        setYourOrdersList(orderedProductsList);
      } else {
        setYourOrdersList([]);
          console.log('in your order details else case');
      }

    },[orderedProductsList]);

    useEffect(() => {
      
    }, []);

    const onContinueShoppingClickHandler = (event) => {
      dispatch(setSelectedPage("Home"));
    };

    const calculateTotalAmount = () => {
      const totalOrdersAmount =  yourOrdersList?.reduce((total, item) => total + (item?.price * 80), 0);
      return totalOrdersAmount;
    };

    return (
      <>
      {
         
          <div key='your-orders-list-data' className='prodDetailsContainer'>
            {
                !!yourOrdersList && yourOrdersList?.map((item, index) => {
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
                        </div>
                })
            }
            {
              calculateTotalAmount() === 0 && 
              <h4 className='no-cart-items-cls'>Currently no Items in the Orders Section</h4>
            }
          </div>
      }
      {
        calculateTotalAmount() > 0 && 
        <p className='cart-items-total-amount-cls'>Odered Items Total Amount: Rs.{calculateTotalAmount()}</p>
      }
      {
           Array.isArray(yourOrdersList) && yourOrdersList.length > 0 && 
           <div className='prod-details-btns-Container'>

                <button onClick={(e) => onContinueShoppingClickHandler(e)} 
                >Continue Shopping</button>
            </div> 
        }
      </>
    )
}

export default DispatchedOrderedItems;