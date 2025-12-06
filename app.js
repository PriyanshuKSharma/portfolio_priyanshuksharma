// Entry point for Express app
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');

// Chatbot API route
app.get('/api/chatbot-data', (req, res) => {
  try {
    const fs = require('fs');
    const chatbotData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'chatbot-data.json'), 'utf8'));
    res.json(chatbotData);
  } catch (error) {
    console.error('Error loading chatbot data:', error);
    res.status(500).json({ error: 'Failed to load chatbot data' });
  }
});

// Routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Not Found' });
});

app.listen(PORT, () => {
  console.log(`Portfolio app running on http://localhost:${PORT}`);
});

module.exports = app;
