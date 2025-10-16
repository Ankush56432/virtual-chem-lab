const express = require('express');
const router = express.Router();

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('📩 New message received:', name, email, message);
  res.json({ message: 'Message received successfully!' });
});

module.exports = router;
