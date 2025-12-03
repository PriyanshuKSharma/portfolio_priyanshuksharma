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
ejs.renderFile('./views/layout.ejs', {
  title: 'Home',
  projects,
  timeline
}, (err, html) => {
  if (err) throw err;
  let content = html;
  // Safer replacements that target attributes and point to public folder
  content = content.replace(/href="\/css\//g, 'href="./public/css/');
  content = content.replace(/src="\/js\//g, 'src="./public/js/');
  content = content.replace(/src="\/images\//g, 'src="./public/images/');
  content = content.replace(/href="\/resume\//g, 'href="./public/resume/');
  content = content.replace(/href="\/images\//g, 'href="./public/images/');
  
  fs.writeFileSync('./index.html', content);
  console.log('Build completed! index.html generated in root.');
});