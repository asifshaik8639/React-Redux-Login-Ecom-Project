import React from 'react';
import { useDispatch } from 'react-redux';
import {setSelectedProduct} from '../redux/features/ProductDetailsSlice';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {setSelectedPage} from '../redux/features/commonSlice'; 
import '../App.css';

const CardsContainer = ({ data }) => {

 const dispatch = useDispatch();
 const navigate = useNavigate();

  const onProductClickHanlder = (event, product) => {
    console.log('onProductClickHanlder => ', event);
    // const productUIElement = event?.target?.parentNode || event?.target?.parentElement;
    dispatch(setSelectedProduct(product));
    dispatch(setSelectedPage("prodDetails"));
    // navigate('/prodDetails');
  };

  return (
        <div>
        {
            data === null ?
            <div key='filter-data' className='flexContainer'>
            {
                (
                    // Display skeletons while data is loading
                    Array.from({ length: 6 }).map((_, index) => (
                        <div className='flex-item-cls'
                            key={`${index}flex-item`} >
                            <Skeleton key={index} variant="rectangular" width={200} 
                            height={300} style={{ margin: 10 }} />
                        </div>
                    ))
                )
            }
            </div>
            :
            <div key='filter-data' className='flexContainer'>
                {
                    (!!data && data?.map((item, index)=> {
                        return  <div className='flex-item-cls'
                                    key={`${index}flex-item`} 
                                    onClick={(e) => onProductClickHanlder(e, item)} >
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
                    }))
                }
            </div>
        }
        </div>
  )
}

export default CardsContainer;