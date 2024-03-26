import { useState, lazy, Suspense  } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import DynamicParentContainer from './pages/DynamicParentContainer';
import PaginationContextWrapper from './context/PaginationContextWrapper';
import NotFound from './pages/NotFound';
import User from './pages/User';
import Cart from './pages/Cart';
import WIP from './pages/WIP';
import Movies from './pages/Movies';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';

const LazyLoadedOrdersComponent = lazy(() => import('./pages/YourOrderedItems'));

function App() {
  
  return(
    <>
      <PaginationContextWrapper>
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          <Route path="/home" element={<DynamicParentContainer></DynamicParentContainer>}></Route>
          <Route path="/user" element={<User></User>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          {/* default case */}
          <Route path="/" element={ <Navigate to="/login" />}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/YourOrderedItems" element={LazyLoadedOrdersComponent}></Route>
          <Route path="/wip" element={<WIP></WIP>}></Route>
          <Route path="/movies" element={<Movies></Movies>}></Route> 
          {/* <Route path="/prodDetails" element={<ProductDetails></ProductDetails>}></Route>            */}
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        </Suspense>
      </PaginationContextWrapper>
    </>
  )
}

export default App
