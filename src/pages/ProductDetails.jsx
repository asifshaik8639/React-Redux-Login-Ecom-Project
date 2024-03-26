import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {addtoCart, totalCartItemsCount} from '../redux/features/ProductsCartSlice';
import {setSelectedPage} from '../redux/features/commonSlice'; 
import '../App.css';

const ProductDetails = () => {

    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [itemsCount, setItemsCount] = useState(1);

    const {
        selectedProduct
    } = useSelector((state) => state.productDetails);

    useEffect(() => {
        
        if(!!selectedProduct) {
            setProduct(selectedProduct);
        } else {
            console.log('in product details else case');
        }

    },[selectedProduct]);

    const onProductClickCartHanlder = (event) => {
        dispatch(addtoCart(product));
        dispatch(totalCartItemsCount(itemsCount));
        dispatch(setSelectedPage("Home"));
    };

    const onGoToCartClickHanlder = (event) => {
        dispatch(setSelectedPage("Cart"));
    };

    const onGoHomeClickHandler = (event) => {
        dispatch(setSelectedPage("Home"));
    };

  return (
    <>
        {
            <div key='cart-list-data' className='prodDetailsContainer'>
            <div className='image-position-container-cls'>
                <div className='header-container background-for-search-bar'></div>
                <h2 className='image-label-cls'>Product Details </h2>
            </div>
            </div>

        }
        {
            !!product &&  
            <div key='prod-data' className='prodDetailsContainer'>
                {
                    <div className='prod-details-page-cls'>
                        <div className='flex-item-cls prod-details-item-cls'
                            key={`flex-item`}  >

                            <img className='prod-img-cls' 
                                key={`prod-image`} 
                                src={product?.image} />

                            <div className='prodcut-title-cls'
                                key={`product-title`} >
                                {product?.title}
                            </div>

                            <div className='prodcut-price-cls'
                                key={`product-price`} >
                                {`Price: $ ${product?.price}`}
                            </div>
                        </div>
                    </div>
                }
            </div>
        }
        {
            <div className='prod-details-page-cls'>
                <div className='product-additional-details-cls flex-item-cls'>
                    <h2>Product Additional Details</h2>
                    <div className='product-details-cls'
                        key={`product-category`} >
                        {`Category: ${product?.category}`}
                    </div>

                    <div className='product-details-cls product-description-cls'
                        key={`product-description`} >
                        {`Description: ${product?.description}`}
                    </div>

                    <div className='product-details-cls'
                        key={`product-reviews`} >
                        {`Ratings: ${product?.rating?.rate || 0}`}
                    </div>
                </div>
            </div>
        }
        {
           !!product && 
           <div className='prod-details-btns-Container'>
                <button onClick={(e) => onProductClickCartHanlder(e)}
                 >Add to Cart </button>

            <button onClick={(e) => onGoToCartClickHanlder(e)}
                 >Go to Cart </button>

            <button onClick={(e) => onGoHomeClickHandler(e)}
                 >Go Home </button>

            </div> 
        }
    </>
  )
}

export default ProductDetails;