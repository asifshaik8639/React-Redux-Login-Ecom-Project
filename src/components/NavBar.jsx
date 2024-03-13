import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='nav-bar-cls'>
        <Link to="/home" relative="path">
            Home
        </Link>
        <Link to="/user" relative="path">
            User
        </Link>

        <Link to="/cart" relative="path">
            Cart
        </Link>
    </div>
  )
}

export default NavBar