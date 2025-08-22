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
const skills = JSON.parse(fs.readFileSync('./data/skills.json'));
const projects = JSON.parse(fs.readFileSync('./data/projects.json'));
const timeline = JSON.parse(fs.readFileSync('./data/timeline.json'));

// Create static HTML
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
  
  ${fs.readFileSync('./views/partials/navbar.ejs', 'utf8')}
  
  <main>
    ${fs.readFileSync('./views/index.ejs', 'utf8')
      .replace(/\/resume\//g, './resume/')
      .replace(/\/images\//g, './images/')
      .replace(/<% timeline\.filter\([^%]*%>[\s\S]*?<% \}\) %>/g, (match) => {
        if (match.includes("'work'")) {
          return timeline.filter(item => item.type === 'work').map(item => `
            <div class="timeline-item ${item.type}">
              <h3>${item.title}</h3>
              <span class="timeline-org">${item.organization}</span>
              <span class="timeline-period">${item.period}</span>
              <p>${item.description}</p>
            </div>
          `).join('');
        }
        if (match.includes("'education'")) {
          return timeline.filter(item => item.type === 'education').map(item => `
            <div class="timeline-item ${item.type}">
              <h3>${item.title}</h3>
              <span class="timeline-org">${item.organization}</span>
              <span class="timeline-period">${item.period}</span>
              <p>${item.description}</p>
            </div>
          `).join('');
        }
        return '';
      })
      .replace(/<% projects\.forEach\([^%]*%>[\s\S]*?<% \}\) %>/g, (match) => {
        return projects.map(project => `
          <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
              <a href="${project.github}" target="_blank">GitHub</a>
              <a href="${project.demo}" target="_blank">Demo</a>
            </div>
          </div>
        `).join('');
      })
      .replace(/<%[\s\S]*?%>/g, (match) => {

        return '';
      })}
  </main>
  
  ${fs.readFileSync('./views/partials/footer.ejs', 'utf8')}
  
  <script src="./js/main.js"></script>
</body>
</html>`;

fs.writeFileSync('./dist/index.html', html);
console.log('Build completed successfully!');