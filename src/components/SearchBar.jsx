import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';


function SearchBar({ sendinputTextVal, 
                     onSortHandler,
                     onMenuClickHandler
                    }) {

 const [inputText, setInputText] = useState('');

 const { globalSearchText } = useSelector((state) => state.common);

 const onInputSearchHandler = (event) => {
   // console.log('value from onInputSearchHandler', event.target.value );
    let inputValue = event.target.value;
    setInputText(inputValue);
    sendinputTextVal(inputValue);
 }

  useEffect(()=> {
    console.log('searchText in useEffect ******', globalSearchText);
    setInputText(globalSearchText);
    sendinputTextVal(globalSearchText);

  }, [globalSearchText]);

  return (

    <div className='header-container background-for-search-bar'>
 
        <Icon id="menu" className='menu-icon-cls'
                      onClick={(e) => onMenuClickHandler(e)} >
              <MenuIcon className='icon-menu-cls'/>
        </Icon>


        <div className='search-bar-container '>
             
             <input type='text' 
                     placeholder='search'
                     value={inputText}
                     id="search"
                     onInput={(e) => onInputSearchHandler(e)} />

             <Icon style={{ fontSize: 30, color: 'black' }} 
                   onClick={(e) => onSortHandler(true)}>
                 <ArrowCircleUpIcon className='icon-up-cls' />
             </Icon>

             <Icon style={{ fontSize: 30, color: 'black' }}
                   onClick={(e) => onSortHandler(false)} >
                 <ArrowCircleDownIcon className='icon-down-cls'/>
             </Icon>
        </div>

    </div>

  )
}

export default SearchBar;
