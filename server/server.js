// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//Allowed Origins
const allowedOrigins = [
  'https://foodtruckbackyardbuilds.netlify.app',
  'https://www.foodtruckbackyardbuilds.com',
  'https://foodtruckbackyardbuilds.com'
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json()); // Parse incoming JSON

// Route to handle contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Using this for testing, may change later
        to: process.env.RECIPIENT_EMAIL, // my email
        reply_to: `${name} <${email}>`, // This sets the customer's email as reply-to
        subject: `New Contact Form: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      })
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } else {
      console.error('Resend API error:', data);
      res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
  } catch (error) {
    console.error('There was an error sending email:', error);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});