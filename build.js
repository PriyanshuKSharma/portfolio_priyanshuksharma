const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Load data
const skills = JSON.parse(fs.readFileSync('./data/skills.json'));
const projects = JSON.parse(fs.readFileSync('./data/projects.json'));
const timeline = JSON.parse(fs.readFileSync('./data/timeline.json'));

// Render HTML
ejs.renderFile('./views/index.ejs', {
  title: 'Home',
  skills,
  projects,
  timeline
}, (err, html) => {
  if (err) throw err;
  
  // Create dist directory
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }
  
  // Write HTML file
  fs.writeFileSync('./dist/index.html', html);
  
  // Copy public assets
  const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    files.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      if (fs.statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  };
  
  copyDir('./public', './dist');
  console.log('Build completed successfully!');
});