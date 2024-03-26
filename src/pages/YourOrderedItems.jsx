import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import DispatchedOrderedItems from './DispatchedOrderedItems';
import '../assets/settings.css';
import '../App.css';

const DispatchedOrderedItemsComponent = () => <DispatchedOrderedItems/>;
const ReadyToDeliveryComponent = () => <div className='ordered-items-cls'>Ready to Delivery</div>;
const DeliveredComponent = () => <div className='ordered-items-cls'>Ordered Items are delivered</div>;

const componentMap = {
  DispatchedOrderedItems: DispatchedOrderedItemsComponent,
  ReadyToDelivery: ReadyToDeliveryComponent,
  Delivered: DeliveredComponent
};

const YourOrderedItems = () => {
  const [activeTab, setActiveTab] = useState(<DispatchedOrderedItems/>);

  const handleTabClick = (event) => {
    event.preventDefault();
    const componentKey = event.currentTarget.name || 'Tab1';
    const ComponentToLoad = componentMap[componentKey];
    setActiveTab(<ComponentToLoad />);
  };

  const onOrderUnderDispatchClickHandler = (event) => {
      //TODO:
  };

  const onReadyToDeliveryClickHandler = (event) => {
     //TODO:
  };

  const onDeliveredClickHandler = (event) => {
     //TODO:
  };

  console.log(`in lazy loading of YourOrderedItems component`);

  return (
    <div className='nav-bar-tabs-cls prodDetailsContainer'>
            <div className='image-position-container-cls'>
              <div className='header-container background-for-search-bar'></div>
              <h2 className='image-label-cls'>Your Order Details </h2>
            </div>
        <nav>
          <ul>
            <li>
              <Link name="DispatchedOrderedItems" className='prod-details-btns-Container'  onClick={(e) => handleTabClick(e)}>
                  <button onClick={(e) => onOrderUnderDispatchClickHandler(e)} >
                      Order Under Dispatch
                  </button>
              </Link>
            </li>
            <li>
              <Link  name="ReadyToDelivery" className='prod-details-btns-Container'  onClick={(e) => handleTabClick(e)}>
                  <button onClick={(e) => onReadyToDeliveryClickHandler(e)} >
                      Ready to Delivery
                  </button>
              </Link>
            </li>
            <li>
              <Link  name="Delivered" className='prod-details-btns-Container' onClick={(e) => handleTabClick(e)}>
                  <button onClick={(e) => onDeliveredClickHandler(e)} >
                      Delivered
                  </button>
              </Link>
            </li>
          </ul>
        </nav>

        {
          <div>
            {
              <>{activeTab}</>
            }
          </div>
        }

    </div>
  );
};

export default YourOrderedItems;


