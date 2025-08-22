const fs = require('fs');
const path = require('path');

// Create dist directory
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

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

// Load data
const projects = JSON.parse(fs.readFileSync('./data/projects.json'));
const timeline = JSON.parse(fs.readFileSync('./data/timeline.json'));

// Generate projects HTML
const projectsHTML = projects.map(project => `
  <div class="project-card">
    <img src="${project.image.replace('/images/', './images/')}" alt="${project.title}">
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">
      ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>
    <div class="project-links">
      <a href="${project.github}" target="_blank">GitHub</a>
      ${project.demo ? `<a href="${project.demo}" target="_blank">Demo</a>` : ''}
    </div>
  </div>
`).join('');

// Generate experience HTML
const experienceHTML = timeline.filter(item => item.type === 'work').map(item => `
  <div class="timeline-item ${item.type}">
    <h3>${item.title}</h3>
    <span class="timeline-org">${item.organization}</span>
    <span class="timeline-period">${item.period}</span>
    <p>${item.description}</p>
  </div>
`).join('');

// Generate education HTML
const educationHTML = timeline.filter(item => item.type === 'education').map(item => `
  <div class="timeline-item ${item.type}">
    <h3>${item.title}</h3>
    <span class="timeline-org">${item.organization}</span>
    <span class="timeline-period">${item.period}</span>
    <p>${item.description}</p>
  </div>
`).join('');

// Read and process index content
let indexContent = fs.readFileSync('./views/index.ejs', 'utf8')
  .replace(/\/resume\//g, './resume/')
  .replace(/\/images\//g, './images/');

// Replace EJS templates with generated HTML
indexContent = indexContent.replace(
  /<% projects\.forEach\(project => \{ %>[\s\S]*?<% \}\) %>/,
  projectsHTML
);

indexContent = indexContent.replace(
  /<% timeline\.filter\(item => item\.type === 'work'\)\.forEach\(item => \{ %>[\s\S]*?<% \}\) %>/,
  experienceHTML
);

indexContent = indexContent.replace(
  /<% timeline\.filter\(item => item\.type === 'education'\)\.forEach\(item => \{ %>[\s\S]*?<% \}\) %>/,
  educationHTML
);

// Remove any remaining EJS tags
indexContent = indexContent.replace(/<%[\s\S]*?%>/g, '');

// Read navbar and footer
const navbar = fs.readFileSync('./views/partials/navbar.ejs', 'utf8');
const footer = fs.readFileSync('./views/partials/footer.ejs', 'utf8');

// Create final HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Modern portfolio showcasing full-stack development skills">
  <title>Home | Portfolio</title>
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/theme.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body>
  <div class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
  <div class="scroll-indicator"></div>
  
  ${navbar}
  
  <main>
    ${indexContent}
  </main>
  
  ${footer}
  
  <script src="./js/main.js"></script>
</body>
</html>`;

fs.writeFileSync('./dist/index.html', html);
console.log('Build completed successfully!');