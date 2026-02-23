const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Create dist directory
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

// Copy public folder
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

// Load data
const projects = JSON.parse(fs.readFileSync('./data/projects.json'));
const timeline = JSON.parse(fs.readFileSync('./data/timeline.json'));

// Set EJS options
// Render index.ejs first
ejs.renderFile('./views/index.ejs', {
  projects,
  timeline,
  skills: JSON.parse(fs.readFileSync('./data/skills.json')) // Load skills as well if needed
}, (err, body) => {
  if (err) throw err;

  // Then render layout.ejs
  ejs.renderFile('./views/layout.ejs', {
    title: 'Home',
    body: body,
    projects,
    timeline
  }, (err, html) => {
    if (err) throw err;
    const toRelativeAssetPaths = (markup) =>
      markup.replace(/([="'(])\/(css|js|images|resume|data)\//g, '$1./$2/');

    fs.writeFileSync('./dist/index.html', toRelativeAssetPaths(html));
    console.log('Build completed!');
  });
});
