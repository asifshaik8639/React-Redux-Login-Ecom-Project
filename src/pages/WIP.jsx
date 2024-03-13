import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import workInProgressImage from '../assets/wip.jpg';
import '../assets/temp.css';

const WIP = () => {
  return (
    <div className='temp-page-container'>
        <div className='wip-container'>
            <Link component={RouterLink} to="/home" relative="path" >
                <img src={workInProgressImage} 
                alt="Work in Progress"
                className="wip-image" />
            </Link>
            <div className='wip-note'>
              <label htmlFor=""> Work in progress</label>
              {/* <HomeIcon fontSize='large' /> */}
            </div>
             
        </div>
    </div>
  )
}

export default WIP;