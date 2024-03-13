import React from 'react';
import '../../assets/login-page.css' ;
import {QR_CODE_ALT_NOTE} from '../../utils/Constants';

const QRCodeComponent = ({ qrCode }) => {
  return (
    <>
        {
            qrCode !== null && 
            <div className='qrcode-section'>
                <p className=''>{QR_CODE_ALT_NOTE}</p>
                { <img src={qrCode} alt="QR Code" />}
            </div>
        }
    </>
  )
}

export default QRCodeComponent;