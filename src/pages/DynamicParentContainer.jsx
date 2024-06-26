import React, { useEffect, useState } from 'react';
import SideDrawer from '../components/SideDrawer';
import { usePaginationContext } from '../context/PaginationContextWrapper';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import NotFound from './NotFound';
import User from './User';
import YourOrderedItems from './YourOrderedItems';
import Cart from './Cart';
import WIP from './WIP';
import Movies from './Movies';
import ProductDetails from './ProductDetails';
import Checkout from './Checkout';
import Chat from '../components/Chat';
import {setSelectedPage} from '../redux/features/commonSlice';
import { setGlobalSearchText } from '../redux/features/commonSlice';

const HomeComponent = () => <Home/>;
const NotFoundComponent = () => <NotFound/>;
const UserComponent = () => <User/>;
const YourOrderedItemsComponent = () => <YourOrderedItems/>;
const CartComponent = () => <Cart/>;
const WIPComponent = () => <WIP/>;
const MoviesComponent = () => <Movies/>;
const ProductDetailsComponent = () => <ProductDetails/>;
const CheckoutComponent = () => <Checkout/>;
const ChatComponent = () => <Chat/>;

const componentMap = {
    Home: HomeComponent,
    NotFound: NotFoundComponent,
    User: UserComponent,
    YourOrderedItems: YourOrderedItemsComponent,
    Cart: CartComponent,
    Movies: MoviesComponent,
    WIP: WIPComponent,
    prodDetails: ProductDetailsComponent,
    Checkout: CheckoutComponent,
    Chat: ChatComponent
};


function DynamicParentContainer() {
    let { 
        selectedComponent, 
        setSelectedComponent,
        isSideBarOpen
    } = usePaginationContext();

    const dispatch = useDispatch();
    const {
        selectedPage
        } = useSelector((state) => state.common);

    useEffect(() => {
        if(!!selectedPage) {
            const ComponentToLoad = componentMap[selectedPage];
            setSelectedComponent(<ComponentToLoad />);
        } 

    },[selectedPage]);


 const onIconClickHandler = (event) => {
    console.log(' onIconClickHandler ComponentToLoad => ', event.currentTarget.name);
    if(event.currentTarget.name === 'Home') {
        dispatch(setGlobalSearchText(''));
    }
    const pageName = event?.currentTarget?.name || 'Home';
    dispatch(setSelectedPage(pageName));
  }

  console.log('value of isSideBarOpen',isSideBarOpen);

  let sidebarStyle = {
    flex: isSideBarOpen ? '25%' : '60px'
  };

  return (
          <div className='app-container'>

                <div id="appSideNav" style={sidebarStyle} className='fixed-side-bar-container'>
                    <SideDrawer onIconClickHandler={onIconClickHandler}></SideDrawer>
                </div>

                <div className='main-container'>
                    {selectedComponent && <>{selectedComponent}</>}
                </div>

          </div>

        );
}
export default DynamicParentContainer;