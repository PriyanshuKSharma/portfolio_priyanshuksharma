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
      'Cloud Technology',
      'Information Security',
      'DevOps & Infrastructure',
      'Full Stack Web Development'
      
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

// Social sidebar toggle function
function toggleSocialSidebar() {
  const sidebar = document.getElementById('socialSidebar');
  sidebar.classList.toggle('collapsed');
}

// Resume dropdown toggle function
function toggleResumeDropdown() {
  const dropdown = document.querySelector('.resume-dropdown');
  dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.resume-dropdown');
  if (dropdown && !dropdown.contains(event.target)) {
    dropdown.classList.remove('active');
  }
});



// GitHub Activity with real contribution graph
async function fetchGitHubActivity() {
  try {
    const username = 'PriyanshuKSharma';
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();
    
    // Update profile info
    document.getElementById('github-avatar').src = userData.avatar_url;
    document.getElementById('github-name').textContent = userData.name || userData.login;
    document.getElementById('github-followers').textContent = `${userData.followers} followers`;
    document.getElementById('github-following').textContent = `${userData.following} following`;
    document.getElementById('github-repos').textContent = `${userData.public_repos} repositories`;
    
    // Get current IST time
    const now = new Date();
    const istTime = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    // GitHub achievements (common ones)
    const achievements = [
      '🌟 Quickdraw',
      '⭐ Starstruck', 
      '🎯 Pull Shark',
      '🔥 YOLO',
      '💎 Galaxy Brain'
    ];
    
    // Display achievements only
    document.getElementById('contribution-calendar').innerHTML = `
      <div class="github-achievements">
        <h5><img src="https://img.icons8.com/color/20/github.png" width="20" height="20"> GitHub Achievements</h5>
        <div class="achievement-images">
          <img src="https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png" alt="Pair Extraordinaire" title="Pair Extraordinaire - Coauthored commits">
          <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" alt="Pull Shark x2" title="Pull Shark x2 - Merged pull requests">
          <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" alt="Quickdraw" title="Quickdraw - Closed within 5 minutes">
          <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" alt="YOLO" title="YOLO - Merged without review">
        </div>
      </div>
      <div class="hackerrank-achievements">
        <h5><img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/20/external-hackerrank-is-a-technology-company-that-focuses-on-competitive-programming-logo-color-tal-revivo.png" width="20" height="20"> HackerRank Badges</h5>
        <div class="hr-badges-container">
          <div class="hr-badge-item">
            <img src="https://hrcdn.net/fcore/assets/badges/python-f70befd824.svg" alt="Python 5 Star">
            <span class="badge-label">Python 2⭐</span>
          </div>
          <div class="hr-badge-item">
            <img src="https://hrcdn.net/fcore/assets/badges/sql-89e76e7082.svg" alt="SQL 1 Star">
            <span class="badge-label">SQL 1⭐</span>
          </div>
          <div class="hr-badge-item">
            <img src="https://hrcdn.net/fcore/assets/badges/problem-solving-ecaf59a612.svg" alt="Problem Solving">
            <span class="badge-label">Problem Solving 2⭐</span>
          </div>
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    document.getElementById('contribution-calendar').innerHTML = '<p>Unable to load GitHub data</p>';
  }
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