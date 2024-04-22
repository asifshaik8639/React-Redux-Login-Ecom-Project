
import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import cors from 'cors';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

const app = express();
const port = 3007;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://13.127.246.209:5173', // Add your allowed origin(s)
    credentials: false // If you're using credentials (cookies, headers, etc.)
  }));

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via SMS
app.post('/send-otp-with-twilio', (req, res) => {

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
      QRCode.toDataURL(otpauthUrl, (err, dataUrl) => {
        if (err) throw err;

        console.log(`OTP sent successfully: ${otp}`);

        res.status(200).json({ secret: secret.base32, qrCode: dataUrl , otp: otp, message: 'OTP sent successfully'  });
      });
    })
    .catch((error) => {
      console.error(`Error sending OTP: ${error.message}`);
      res.status(500).json({ error: 'Failed to send OTP, Please try again after some time' });
    });
});

app.post('/verify-otp', (req, res) => {
  const { secret, otp } = req.body;
  console.log('value of secret in verifying OTP', secret);
  console.log('value of otp in verifying OTP', otp);
  const isValid = speakeasy.totp.verify({ secret, encoding: 'base32',window: 1, token: otp.trim() });
  console.log('server respone after verifying OTP', isValid);
  res.json({ isValid });
});

app.listen(3007, '13.127.246.209', 'localhost', () => {
    console.log(`OTP SMS Server is running on http://13.127.246.209:${port}`);
  });
