import React, { useEffect, useState } from 'react'

function FilterLabel({data, onCategoryFilterHandler}) {

  const [uniqueCategoryData, setUniqueCategoryData ] = useState([]);

  useEffect(() => {
    const uniqueArray = !!data && data.length > 0 && data.filter(
     (item, index, array) => array.findIndex((obj) => obj.category === item.category) === index
    );

    setUniqueCategoryData(uniqueArray);
  },[data])

  return (
    <div className='category-container'>
        {
            Array.isArray(uniqueCategoryData) && uniqueCategoryData.length > 0 ? 
            <div className='flabel-container'>
                <h4>Categories</h4>
                <div className='filter-label-cls all-filter-lbl-cls' onClick={(e)=> onCategoryFilterHandler(e)}>All</div>
                {
                    uniqueCategoryData.map((item, index)=> {
                        return  <div key={`flabel`+index} 
                                     className='filter-label-cls'
                                     onClick={(e)=> onCategoryFilterHandler(e)}
                                     >
                                    {item.category}
                                </div>
                    })

                }
            </div>
            : null
        }
    </div>

  )
}

export default FilterLabel