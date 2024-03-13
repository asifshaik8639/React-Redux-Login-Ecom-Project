// Install react-spring: npm install react-spring

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const HorizontalList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                '11','12','13','14','15','16','17','18','19','20','11','12','13','14','15',
                '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'
                ];

  const springProps = useSpring({
    transform: `translateX(${-currentIndex * 100}%)`,
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1  : prevIndex ));
  };


  return (
    <div className='horizontal-list-container'>
      <button onClick={handlePrevious}>Previous</button>
      <animated.div className="grid-wrapper" style={springProps}>
        {items.map((item, index) => (
          <div key={index} className="list-item">
            {item}
          </div>
        ))}
      </animated.div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default HorizontalList;
