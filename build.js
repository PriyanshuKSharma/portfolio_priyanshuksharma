const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Load data
const skills = JSON.parse(fs.readFileSync('./data/skills.json'));
const projects = JSON.parse(fs.readFileSync('./data/projects.json'));
const timeline = JSON.parse(fs.readFileSync('./data/timeline.json'));

// Create dist directory
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

// Copy public assets first
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

// Read layout template
const layoutTemplate = fs.readFileSync('./views/layout.ejs', 'utf8');
const indexTemplate = fs.readFileSync('./views/index.ejs', 'utf8');
const navbarTemplate = fs.readFileSync('./views/partials/navbar.ejs', 'utf8');
const footerTemplate = fs.readFileSync('./views/partials/footer.ejs', 'utf8');

// Render partials
const navbar = ejs.render(navbarTemplate);
const footer = ejs.render(footerTemplate);
const body = ejs.render(indexTemplate, { skills, projects, timeline });

// Render final HTML with layout
const html = ejs.render(layoutTemplate, {
  title: 'Home',
  body: navbar + body + footer
});

// Write HTML file
fs.writeFileSync('./dist/index.html', html);
console.log('Build completed successfully!');