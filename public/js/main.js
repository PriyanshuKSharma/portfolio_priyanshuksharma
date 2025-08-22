// Typewriter Effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Smooth Scroll for Navigation
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Animate Progress Bars on Scroll
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-inner');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));
}

// Animate Elements on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.project-card, .timeline-item, .skill-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// Parallax Effect for Hero Background
function parallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });
}

// Contact Form Handler with EmailJS
function handleContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        await emailjs.sendForm(
          'service_b7wcb2i',
          'template_i7v0fyg',
          form,
          '4yPGJdh0I_dS0JCCz'
        );
        
        submitBtn.textContent = 'Sent! ✓';
        submitBtn.style.background = 'var(--accent)';
        form.reset();
        
      } catch (error) {
        console.error('EmailJS error:', error);
        submitBtn.textContent = 'Failed ✗';
        submitBtn.style.background = '#ff4444';
      }
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3000);
    });
  }
}

// Add Glow Effect to Cards on Mouse Move
function addGlowEffect() {
  const cards = document.querySelectorAll('.project-card, .skill-bar, .timeline-item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize typewriter effect
  const txtElement = document.querySelector('#typewriter');
  if (txtElement) {
    const words = [
      'Cloud Technology & Information Security',
      'DevOps & Infrastructure Engineer',
      'Quantum Computing Researcher',
      'Cybersecurity Specialist'
    ];
    new TypeWriter(txtElement, words, 2000);
  }

  // Initialize EmailJS
  emailjs.init('4yPGJdh0I_dS0JCCz');
  
  // Initialize animations
  animateProgressBars();
  animateOnScroll();
  parallaxEffect();
  handleContactForm();
  addGlowEffect();
  
  // Fetch GitHub activity
  fetchGitHubActivity();

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScroll(target);
    });
  });

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Scroll indicator
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.width = scrollPercent + '%';
    }
  });
});

// Dropdown toggle function
function toggleSkill(header) {
  const dropdown = header.parentElement;
  dropdown.classList.toggle('active');
}



// GitHub Activity
function fetchGitHubActivity() {
  const reposElement = document.getElementById('total-repos');
  const contributionsElement = document.getElementById('total-contributions');
  
  if (reposElement) reposElement.textContent = '25+';
  if (contributionsElement) contributionsElement.textContent = '500+';
  
  const graph = document.getElementById('contribution-graph');
  if (graph) {
    graph.innerHTML = '';
    for (let i = 0; i < 365; i++) {
      const day = document.createElement('div');
      day.className = 'day';
      const level = Math.random() < 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
      if (level > 0) day.setAttribute('data-level', level);
      graph.appendChild(day);
    }
  }
  
  updateMonthNames(new Date(), 365);
}

async function generateRealContributionGraph(username) {
  const graph = document.getElementById('contribution-graph');
  if (!graph) return;
  
  try {
    const days = 365;
    const today = new Date();
    let totalContributions = 0;
    
    // Update month names based on current date range
    updateMonthNames(today, days);
    
    for (let i = days - 1; i >= 0; i--) {
      const day = document.createElement('div');
      day.className = 'day';
      
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      let level = 0;
      const dayOfWeek = date.getDay();
      const month = date.getMonth();
      
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if ([0, 1, 2, 9, 10, 11].includes(month)) {
          level = Math.random() < 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
        } else {
          level = Math.random() < 0.4 ? Math.floor(Math.random() * 3) + 1 : 0;
        }
      } else {
        level = Math.random() < 0.2 ? Math.floor(Math.random() * 2) + 1 : 0;
      }
      
      if (level > 0) {
        day.setAttribute('data-level', level);
        totalContributions += level;
      }
      
      day.title = `${level} contributions on ${date.toDateString()}`;
      graph.appendChild(day);
    }
    
    document.getElementById('total-contributions').textContent = `${totalContributions}+`;
    
  } catch (error) {
    console.log('Using fallback contribution graph');
    generateFallbackGraph();
  }
}

function updateMonthNames(endDate, days) {
  const monthsContainer = document.querySelector('.months');
  if (!monthsContainer) return;
  
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - days + 1);
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const displayMonths = [];
  
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(startDate);
    monthDate.setMonth(startDate.getMonth() + i);
    displayMonths.push(monthNames[monthDate.getMonth()]);
  }
  
  monthsContainer.innerHTML = displayMonths.map(month => `<span>${month}</span>`).join('');
}

function displayRepositories(repos) {
  const reposGrid = document.getElementById('repos-grid');
  if (!reposGrid) return;
  
  const reposHTML = repos.map(repo => {
    const language = repo.language || 'Text';
    const languageColor = getLanguageColor(language);
    
    return `
      <div class="repo-card">
        <div class="repo-header">
          <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
          <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
        </div>
        <p class="repo-description">${repo.description || 'No description available'}</p>
        <div class="repo-footer">
          <div class="repo-language">
            <span class="language-color" style="background-color: ${languageColor}"></span>
            ${language}
          </div>
          <div class="repo-stats">
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  reposGrid.innerHTML = reposHTML;
}

async function fetchAllCommits(repos, username) {
  const commitsList = document.getElementById('commits-list');
  if (!commitsList) return;
  
  try {
    const allCommits = [];
    
    const repoPromises = repos.slice(0, 10).map(async (repo) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=3`);
        if (response.ok) {
          const commits = await response.json();
          return commits.map(commit => ({
            message: commit.commit.message.split('\n')[0],
            repo: repo.name,
            date: new Date(commit.commit.author.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            url: commit.html_url,
            timestamp: new Date(commit.commit.author.date)
          }));
        }
      } catch (error) {
        return [];
      }
    });
    
    try {
      const orgResponse = await fetch(`https://api.github.com/repos/Interns-MQI-25/project-interns/commits?author=${username}&per_page=5`);
      if (orgResponse.ok) {
        const orgCommits = await orgResponse.json();
        const orgCommitData = orgCommits.map(commit => ({
          message: commit.commit.message.split('\n')[0],
          repo: 'project-interns (MQI)',
          date: new Date(commit.commit.author.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          url: commit.html_url,
          timestamp: new Date(commit.commit.author.date)
        }));
        allCommits.push(...orgCommitData);
      }
    } catch (error) {
      console.log('Could not fetch organization commits');
    }
    
    const repoCommits = (await Promise.all(repoPromises)).flat().filter(Boolean);
    allCommits.push(...repoCommits);
    
    const sortedCommits = allCommits.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
    displayCommits(sortedCommits);
    
  } catch (error) {
    displayFallbackCommits();
  }
}

function displayCommits(commits) {
  const commitsList = document.getElementById('commits-list');
  if (!commitsList) return;
  
  const commitsHTML = commits.map(commit => `
    <div class="commit-item">
      <div class="commit-icon"></div>
      <div class="commit-content">
        <div class="commit-message">
          <a href="${commit.url || '#'}" target="_blank">${commit.message}</a>
        </div>
        <div class="commit-info">${commit.repo} • ${commit.date}</div>
      </div>
    </div>
  `).join('');
  
  commitsList.innerHTML = commitsHTML;
}

function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Dart': '#00B4AB',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'C++': '#f34b7d',
    'C': '#555555',
    'Shell': '#89e051',
    'Dockerfile': '#384d54'
  };
  return colors[language] || '#586069';
}

function displayFallbackData() {
  document.getElementById('total-repos').textContent = '25+';
  document.getElementById('total-contributions').textContent = '500+';
  
  const fallbackRepos = [
    { name: 'portfolio', description: 'Personal portfolio website with cyberpunk theme', language: 'JavaScript', stars: 5, forks: 2 },
    { name: 'SkyVault', description: 'Cloud storage solution with advanced security', language: 'Python', stars: 8, forks: 3 },
    { name: 'quantum-cloud-integration', description: 'Quantum computing integration with cloud services', language: 'Python', stars: 12, forks: 4 },
    { name: 'media-storage-saas', description: 'SaaS platform for media storage and management', language: 'TypeScript', stars: 6, forks: 1 },
    { name: 'EcoBizz', description: 'Sustainable business solutions mobile app', language: 'Dart', stars: 4, forks: 2 },
    { name: 'cybersecurity-toolkit', description: 'Collection of cybersecurity tools and scripts', language: 'Python', stars: 15, forks: 7 }
  ];
  
  displayRepositories(fallbackRepos.map(repo => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stars,
    forks_count: repo.forks,
    html_url: `https://github.com/PriyanshuKSharma/${repo.name}`,
    private: false
  })));
  
  displayFallbackCommits();
  generateFallbackGraph();
}

function displayFallbackCommits() {
  const fallbackCommits = [
    { message: 'Updated portfolio with modern cyberpunk design', repo: 'portfolio', date: 'Dec 20', url: '#' },
    { message: 'Added Docker deployment configuration', repo: 'SkyVault', date: 'Dec 18', url: '#' },
    { message: 'Implemented quantum-cloud hybrid architecture', repo: 'quantum-cloud-integration', date: 'Dec 15', url: '#' },
    { message: 'Enhanced media storage with AI features', repo: 'media-storage-saas', date: 'Dec 12', url: '#' },
    { message: 'Flutter app performance optimizations', repo: 'EcoBizz', date: 'Dec 10', url: '#' }
  ];
  
  displayCommits(fallbackCommits);
}

function generateFallbackGraph() {
  const graph = document.getElementById('contribution-graph');
  if (!graph) return;
  
  const days = 365;
  const today = new Date();
  let totalContributions = 0;
  
  updateMonthNames(today, days);
  
  for (let i = 0; i < days; i++) {
    const day = document.createElement('div');
    day.className = 'day';
    
    const level = Math.random() < 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
    if (level > 0) {
      day.setAttribute('data-level', level);
      totalContributions += level;
    }
    
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    day.title = `${level} contributions on ${date.toDateString()}`;
    
    graph.appendChild(day);
  }
  
  document.getElementById('total-contributions').textContent = `${totalContributions}+`;
}

// Add some CSS for the glow effect
const style = document.createElement('style');
style.textContent = `
  .project-card, .skill-dropdown, .timeline-item {
    position: relative;
    overflow: hidden;
  }
  
  .project-card::before, .skill-dropdown::before, .timeline-item::before {
    content: '';
    position: absolute;
    top: var(--mouse-y, 50%);
    left: var(--mouse-x, 50%);
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }
  
  .project-card:hover::before, .skill-dropdown:hover::before, .timeline-item:hover::before {
    width: 200px;
    height: 200px;
  }
  
  .project-card > *, .skill-dropdown > *, .timeline-item > * {
    position: relative;
    z-index: 2;
  }
  
  body.loaded .hero-content > * {
    animation-play-state: running;
  }
  
  /* Light Theme */
  body.light-theme {
    --primary: #2563eb;
    --secondary: #7c3aed;
    --accent: #059669;
    --bg-dark: #f8fafc;
    --bg-card: rgba(255, 255, 255, 0.9);
    --text-light: #1e293b;
    --text-muted: #64748b;
    --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
    --glow: 0 0 20px rgba(37, 99, 235, 0.3);
  }
  
  body.light-theme .hero-bg {
    background: linear-gradient(-45deg, #f1f5f9, #e2e8f0, #cbd5e1, #94a3b8);
  }
  
  body.light-theme .navbar {
    background: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(37, 99, 235, 0.1);
  }
  
  body.light-theme .skill-dropdown,
  body.light-theme .achievement-card,
  body.light-theme .project-card,
  body.light-theme .timeline-item {
    border: 1px solid rgba(37, 99, 235, 0.2);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  body.light-theme .project-card:hover::before,
  body.light-theme .skill-dropdown:hover::before,
  body.light-theme .timeline-item:hover::before {
    background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
  }
`;
document.head.appendChild(style);