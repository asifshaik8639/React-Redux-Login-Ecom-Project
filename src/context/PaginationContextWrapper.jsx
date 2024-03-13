import React, {createContext, useContext, useState, useRef} from 'react';
import Home from '../pages/Home';

const PaginationContext = createContext();

function PaginationContextWrapper({children}) {
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setCurrentOffSet]= useState(0);
  const [data, setData] = useState([]);
  const resultDataRef = useRef(null);
  const resultSubsequentRef = useRef(null);
  const[isSideBarOpen, setSideBarOpen] = useState(false);

  const [selectedComponent, setSelectedComponent] = useState(<Home/>);

  let context = {
    pageSize, 
    setPageSize, 
    currentPage, 
    setCurrentPage,
    offset,
    setCurrentOffSet,
    data,
    setData,
    resultDataRef,
    resultSubsequentRef,
    selectedComponent,
    setSelectedComponent,
    isSideBarOpen,
    setSideBarOpen
  }


  return (
    <PaginationContext.Provider value={context}>
        {children}
    </PaginationContext.Provider>
  )
}

export default PaginationContextWrapper;

export const usePaginationContext = () => {
    return useContext(PaginationContext);
} 