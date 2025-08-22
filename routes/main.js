const express = require('express');
const fs = require('fs');
const path = require('path');
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
  // TODO: Implement Nodemailer logic
  res.send('Contact form submitted!');
});

module.exports = router;
