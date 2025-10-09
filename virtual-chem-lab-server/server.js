const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const contactRoutes = require('./routes/contact.routes');
app.use('/api', contactRoutes);
const workshopRoutes = require('./routes/workshop.routes');

app.use('/api/workshops', workshopRoutes);

const paymentRoutes = require('./routes/payment.routes');
app.use('/api/payment', paymentRoutes);
