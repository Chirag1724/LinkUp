const nodemailer = require('nodemailer');
require('dotenv').config(); // Loads SMTP credentials from .env

const sendEmail = async (to, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'SendGrid', 'Mailgun', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Password Reset Link',
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log('Reset email sent to:', to);
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Email not sent');
  }
};

module.exports = sendEmail;
