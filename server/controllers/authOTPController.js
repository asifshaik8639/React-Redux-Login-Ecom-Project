import { config } from '../config.js';
import twilio from 'twilio';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

const verifyOTP = async (req, res) => {
  try {
      const { secret, otp } = req.body;
      // console.log('value of secret in verifying OTP', secret);
      console.log('value of otp in verifying OTP', otp);
      const isValid = speakeasy.totp.verify({ secret, encoding: 'base32',window: 1, token: otp.trim() });
      console.log('server respone after verifying OTP', isValid);
      res.json({ isValid });
  } catch (error) {
    console.error(error);
  };
};

const sendOTPWithTwilio = async (req, res) => {
    try {
      const secret = speakeasy.generateSecret({ time: 30 });
      const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
      });
    
      console.log(`secret generated successfully: ${secret}`);
      console.log(`OTP generated successfully: ${otp}`);
    
      const otpauthUrl = speakeasy.otpauthURL({ secret: secret.ascii, label: 'MyApp1', algorithm: 'sha1' });
      const message = `Your OTP is: ${otp}`;
    
      console.log(`before client :`);
    
      client.messages
        .create({
          body: message,
          from: config.twilio.twilioPhone,
          to: config.twilio.userPhone,
        })
        .then(() => {
          // QRCode.toDataURL(otpauthUrl, (err, dataUrl) => {
          //   if (err) throw err;
    
          //   console.log(`OTP sent successfully: ${otp}`);
    
          //   res.status(200).json({ secret: secret.base32, qrCode: dataUrl , otp: otp, message: 'OTP sent successfully'  });
          // });
        })
        .catch((error) => {
          // console.error(`Error sending OTP: ${error.message}`);
          // res.status(500).json({ error: 'Failed to send OTP, Please try again after some time' });
          //For time being since twilio limit is exceeded 
          QRCode.toDataURL(otpauthUrl, (err, dataUrl) => {
            if (err) throw err;
    
            console.log(`OTP sent successfully: ${otp}`);
    
            res.status(200).json({ secret: secret.base32, qrCode: dataUrl , otp: otp, message: 'OTP sent successfully'  });
          });
        });
    } catch(error) {
        console.error(`Error sending OTP: ${error}`);
    }
};

export const authOTPController = {
  verifyOTP, sendOTPWithTwilio
};
