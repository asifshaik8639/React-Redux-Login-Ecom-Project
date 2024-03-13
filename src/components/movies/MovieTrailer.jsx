// VideoPlayer.js
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import '../../assets/media.css';

const MovieTrailer = ({ videoId }) => {

  const opts = {
    height: '40vh',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  console.log('Before rendering of ModalTrailer with videoId => ', videoId);
  
  return (
      <div className='video-container'>
        {
          videoId !== null ? 
          <YouTube videoId={videoId} opts={opts} />
          : <label>Not Available at the moment</label>
        }
        
      </div>
  );
};

export default MovieTrailer;

