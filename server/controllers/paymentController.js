import { config } from '../config.js';
import Razorpay from 'razorpay';
import {validateWebhookSignature} from 'razorpay/dist/utils/razorpay-utils.js';

import { mongoClient } from '../utils/mongoClient.js';

const razorpay = new Razorpay({
    key_id: config.razorPaymentGateway.key_id,
    key_secret: config.razorPaymentGateway.key_secret
});


const createOrder = async (req, res) => {
    const { totalCartAmount, selectedCurrency } = req.body;

    const options = {
      amount: totalCartAmount, // Amount in paise (1000 paise = ₹10)
      currency: selectedCurrency,
      receipt: config.razorPaymentGateway.order_reciept_id,
      payment_capture: 1 // Auto capture payment after successful payment
    };

    try {
      const order = await razorpay.orders.create(options);
      console.log('order details from RAZOR PAY SUCCESSFULL:', order);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const insertCustomerOrderandPaymentDetails = async ( customerOrderandPaymentDoc ) => {
  try {
    const resClient =  mongoClient.getMongoClient();
    // Connect to the "test" database and access its "customer_order_and_payment_details" collection

    const dbName =  config.database.name;
    const payment_collectionName = config.database.cust_order_payment_details;
    const database =  resClient.db(dbName);
    const collection =  database.collection(payment_collectionName);

    const document = customerOrderandPaymentDoc;
    // Insert the defined document into the "customer_order_and_payment_details" collection
    const result = await collection.insertOne(document);
    // Print the ID of the inserted document
    console.log(`successfully Inserted Customer order and payment details with  _id : ${result.insertedId}`);
  } catch (error) {
    console.error('In catch handler of insertCustomerOrderandPaymentDetails with Error:', error);
  }
}

const paymentNotificationWebhook = async (req, res) => {

    const { body } = req;
    const payload = JSON.stringify(req.body);
    const signature = req.get('x-razorpay-signature');
    const webhook_secret = config.razorPaymentGateway.web_hook_secret;// to read from config file

    // console.log('WEB_HOOK_SECRET in paymentNotificationWebhook => ', webhook_secret);
    // console.log('signature =>', signature);
    // console.log('req.headers =>' , req.headers); 
  
    try {
      const isValidSignature = validateWebhookSignature(payload, signature, webhook_secret);
  
      if (isValidSignature) { //webhook validation succeeded
        //save customer order and payment details to the MongoDB
        insertCustomerOrderandPaymentDetails(body);
        res.status(200).send('OK');
      } else {
        console.error('Invalid webhook signature from RAZOR PAY ');
        res.status(400).send('Invalid signature');
      }
    } catch (error) {
      console.error('Webhook error from RAZOR PAY:', error);
      res.status(500).send('Internal server error');
    }
}

export const paymentController = {
    createOrder,
    paymentNotificationWebhook
  };