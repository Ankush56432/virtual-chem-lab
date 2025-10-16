const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// Helper to send JSON response
function sendJSON(res, status, message) {
  res.json({ status, message });
}

// ---------------------
// Workshop Registration
// ---------------------
app.post('/api/register', async (req, res) => {
  const { name, email, qualification, phone, workshopTitle, fees } = req.body;
  if (!name || !email || !workshopTitle) return sendJSON(res, "error", "Required fields missing");

  // Save to registrations.json
  try {
    const regFile = path.join(__dirname, 'registrations.json');
    let data = [];
    if (fs.existsSync(regFile)) data = JSON.parse(fs.readFileSync(regFile, 'utf-8'));
    data.push({ name, email, qualification, phone, workshopTitle, fees, date: new Date().toISOString() });
    fs.writeFileSync(regFile, JSON.stringify(data, null, 2));
  } catch(err){
    console.error("Error saving registration:", err);
    return sendJSON(res, "error", "Failed to save registration");
  }

  // Send Email
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'virtualchemlab@gmail.com', pass: 'YOUR_APP_PASSWORD' }
    });

    await transporter.sendMail({
      from: email,
      to: 'virtualchemlab@gmail.com',
      subject: `New Workshop Registration: ${workshopTitle}`,
      text: `Name: ${name}\nEmail: ${email}\nQualification: ${qualification}\nPhone: ${phone}\nWorkshop: ${workshopTitle}\nFees: ₹${fees}`
    });

    return sendJSON(res, "success", "Registration successful");
  } catch(err){
    console.error("Email error:", err);
    return sendJSON(res, "error", "Failed to send email");
  }
});

// ---------------------
// Contact Form
// ---------------------
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return sendJSON(res, "error", "All fields are required");

  // Save to contacts.json
  try {
    const contactsFile = path.join(__dirname, 'contacts.json');
    let data = [];
    if (fs.existsSync(contactsFile)) data = JSON.parse(fs.readFileSync(contactsFile, 'utf-8'));
    data.push({ name, email, message, date: new Date().toISOString() });
    fs.writeFileSync(contactsFile, JSON.stringify(data, null, 2));
  } catch(err){
    console.error("Error saving contact:", err);
    return sendJSON(res, "error", "Failed to save contact");
  }

  // Send Email
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'virtualchemlab@gmail.com', pass: 'YOUR_APP_PASSWORD' }
    });

    await transporter.sendMail({
      from: email,
      to: 'virtualchemlab@gmail.com',
      subject: `New Contact Query from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    });

    return sendJSON(res, "success", "Message sent successfully");
  } catch(err){
    console.error("Email error:", err);
    return sendJSON(res, "error", "Failed to send email");
  }
});

// ---------------------
// Admin APIs
// ---------------------
app.get('/api/registrations', (req, res) => {
  const regFile = path.join(__dirname, 'registrations.json');
  if (!fs.existsSync(regFile)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(regFile, 'utf-8'));
  res.json(data);
});

app.get('/api/contacts', (req, res) => {
  const contactsFile = path.join(__dirname, 'contacts.json');
  if (!fs.existsSync(contactsFile)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(contactsFile, 'utf-8'));
  res.json(data);
});

// ---------------------
// Start Server
// ---------------------
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
