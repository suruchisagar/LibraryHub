const express = require('express');
require('dotenv').config();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const routes = require('./routes');
var cors = require('cors');

// const Razorpay = require('razorpay');
// const crypto = require('crypto');

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET
// });


const app = express();
const port = 3000;
app.use(cors());




app.use(express.json());

//authentication
//register

app.use('/api/v1', routes)


//payment
// List user payment history
// app.get('/payments', async (req, res) => {
//   try {
//     // In a real application, implement authentication to get the user's ID
//     const userId = req.user.id; // Assuming req.user is set after authentication

//     const result = await pool.query(
//       'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
//       [userId]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching payments:', err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Initiate a new payment
// app.post('/payments/initiate', async (req, res) => {
//   const { amount, currency, receipt, notes } = req.body;

//   if (!amount || !currency || !receipt) {
//     return res.status(400).json({ message: "amount, currency, and receipt are required" });
//   }

//   try {
//     const options = {
//       amount: amount * 100, // Amount in paise
//       currency,
//       receipt,
//       notes
//     };

//     const order = await razorpay.orders.create(options);

//     // Save order details to the database
//     await pool.query(
//       'INSERT INTO payments (user_id, order_id, amount, currency, receipt, status) VALUES ($1, $2, $3, $4, $5, $6)',
//       [req.user.id, order.id, amount, currency, receipt, 'created']
//     );

//     res.status(201).json(order);
//   } catch (err) {
//     console.error('Error initiating payment:', err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Check payment status
// app.get('/payments/status/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const payment = await razorpay.payments.fetch(id);
//     res.json(payment);
//   } catch (err) {
//     console.error('Error fetching payment status:', err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// //Razorpay webhook endpoint
// app.post('/webhook/payment', express.raw({ type: 'application/json' }), (req, res) => {
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

//   const signature = req.headers['x-razorpay-signature'];
//   const body = req.body;

//   const expectedSignature = crypto
//     .createHmac('sha256', secret)
//     .update(JSON.stringify(body))
//     .digest('hex');

//   if (signature === expectedSignature) {
//     // Handle the webhook event
//     const event = body.event;
//     const paymentEntity = body.payload.payment.entity;

//     // Update payment status in the database
//     pool.query(
//       'UPDATE payments SET status = $1 WHERE order_id = $2',
//       [paymentEntity.status, paymentEntity.order_id]
//     );

//     res.status(200).json({ message: "Webhook received and verified" });
//   } else {
//     res.status(400).json({ message: "Invalid signature" });
//   }
// });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
