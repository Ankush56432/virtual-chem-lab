const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',      // Get from Razorpay dashboard
    key_secret: 'YOUR_KEY_SECRET'
});

// Create order (called when user clicks "Pay")
router.post('/create-order', async (req, res) => {
    const { amount, workshopId, userId } = req.body;

    const options = {
        amount: amount * 100, // in paise
        currency: "INR",
        receipt: `receipt_${workshopId}_${userId}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

// Verify payment signature
router.post('/verify-payment', (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const generated_signature = crypto.createHmac('sha256', 'YOUR_KEY_SECRET')
        .update(order_id + "|" + payment_id)
        .digest('hex');

    if (generated_signature === signature) {
        res.json({ status: 'success' });
    } else {
        res.status(400).json({ status: 'failed' });
    }
});

module.exports = router;
