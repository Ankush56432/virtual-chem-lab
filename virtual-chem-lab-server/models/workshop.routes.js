const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop');
const Registration = require('../models/WorkshopRegistration');

// Get all workshops
router.get('/', async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for a workshop
router.post('/register', async (req, res) => {
  const { workshopId, name, email } = req.body;

  try {
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) return res.status(404).json({ message: 'Workshop not found' });

    // Create registration
    const registration = new Registration({ workshop: workshopId, name, email });
    await registration.save();

    // TODO: Integrate payment gateway here if price > 0

    // TODO: Send email to owner/organizer (via nodemailer)

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'owner@gmail.com', pass: 'your_app_password' }
});

const mailOptions = {
  from: 'owner@gmail.com',
  to: 'owner@gmail.com',
  subject: `New Registration: ${workshop.title}`,
  text: `Name: ${name}\nEmail: ${email}`
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.error(err);
});
