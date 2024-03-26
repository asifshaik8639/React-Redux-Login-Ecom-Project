import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import ContactsIcon from '@mui/icons-material/Contacts';
// import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import ShopIcon from '@mui/icons-material/Shop';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { CDN_IMAGE_URL } from  '../utils/Constants' ;// '../utils/Constants';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import {resetAllSliceStates} from '../redux/store';
import Avatar from '@mui/material/Avatar';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";


function SideDrawer({onIconClickHandler}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);



  const { isLoggedIn } = useSelector((state) => state.common);

   const { totalCartItemsCount } = useSelector((state) => state.productsCart);

//    useEffect(() => {
//      if(totalCartItemsCount > 0) {
//         setCartItemsCount(totalCartItemsCount);
//      } 

//    },[totalCartItemsCount]);

  const onLogoutDialogOpenClickHandler = (event) => {
    //resetting all the state to the default state 
    setDialogOpen(true);
  };

  const onLogoutClickHandler = (event) => {
    //resetting all the state to the default state 
    setDialogOpen(false);
    dispatch(resetAllSliceStates());
  };

  const handleLogoutDialogClose = (event) => {
    setDialogOpen(false);
  };

  useEffect(() => {
    console.count('onLogoutClickHandler');
    
    if(!isLoggedIn) {
        console.log('onLogoutClickHandler from common');
        navigate('/login');
    }
  },[isLoggedIn]);

  return (
    <div className='side-drawer-container'>

        <div className='side-drawer-cdn-bg-image'>
            {/*  this is added to add the background  */}
        </div>
        <div className='side-drawer-item'>
            <Link name="Home" onClick={(e) => onIconClickHandler(e) } >
           
                <StoreIcon fontSize='large' />
                
                <label htmlFor=""> Shopping</label> 
            </Link>
        </div>

        <div className='side-drawer-item'>
            <Link name="Movies" onClick={(e) => onIconClickHandler(e) } >
                <LocalMoviesIcon fontSize='large' />
                <label htmlFor=""> Movies</label> 
            </Link>
        </div>

        <div className='side-drawer-item'>
            <Link name="Cart"  onClick={(e) => onIconClickHandler(e) }>
                <ShoppingCartIcon fontSize='large'/>
                <label htmlFor=""> Cart</label>
                {
                    totalCartItemsCount > 0 && 
                    <div className="cart-items-count-cls" >{totalCartItemsCount}</div>
                }
            </Link>
        </div>

        <div className='side-drawer-item'>
            <Link name="YourOrderedItems"  onClick={(e) => onIconClickHandler(e) }>
                <ShoppingBasketIcon fontSize='large'/>
                <label htmlFor=""> Your Orders</label>
            </Link>
        </div>

        <div className='side-drawer-item'>
            <Link name="User"  onClick={(e) => onIconClickHandler(e) }>
                <ContactsIcon fontSize='large'/>
                <label htmlFor=""> User Profile</label>
            </Link>
        </div>

        <div className='side-drawer-item'>
            <Link name="Logout"  onClick={(e) => onLogoutDialogOpenClickHandler(e) }>
                <LogoutIcon fontSize='large'/>
                <label htmlFor=""> Logout</label>
            </Link>
        </div>

        <Dialog
            open={dialogOpen}
            onClose={(e) => handleLogoutDialogClose(e)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Exit?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={(e) => handleLogoutDialogClose(e)}>No</Button>
          <Button onClick={(e) => onLogoutClickHandler(e)} autoFocus>
            Yes
          </Button>
        </DialogActions>
        </Dialog>


        
    </div>
  )
}

export default SideDrawer;