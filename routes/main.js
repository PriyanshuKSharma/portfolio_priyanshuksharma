const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  const skills = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/skills.json')));
  const projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/projects.json')));
  const timeline = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/timeline.json')));
  res.render('index', {
    title: 'Home',
    skills,
    projects,
    timeline
  });
});

// Contact form POST
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL || 'priyanshuksharma2005@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.json({ success: false, message: 'Failed to send email. Please try again.' });
  }
});

module.exports = router;
