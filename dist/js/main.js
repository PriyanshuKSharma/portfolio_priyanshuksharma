document.addEventListener('DOMContentLoaded', () => {
  // Cyberpunk Loading Sequence
  const loader = document.querySelector('.loading-overlay');
  const percentage = document.querySelector('.loading-percentage');
  const bootLog = document.getElementById('boot-log');
  const accessText = document.querySelector('.access-text');

  if (loader) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 1;
      if (progress > 100) progress = 100;
      
      if (percentage) percentage.textContent = `${progress}%`;
      
      if (progress === 30 && bootLog) {
        bootLog.innerHTML += '<div>> CONNECTING TO NEURAL NET...</div>';
      }
      if (progress === 60 && bootLog) {
        bootLog.innerHTML += '<div>> DOWNLOADING ASSETS...</div>';
      }
      if (progress === 90 && bootLog) {
        bootLog.innerHTML += '<div>> SYSTEM OPTIMIZED.</div>';
      }

      if (progress === 100) {
        clearInterval(interval);
        if (accessText) accessText.textContent = "ACCESS GRANTED";
        if (accessText) accessText.style.color = "#00ff88";
        
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 800);
      }
    }, 30);
  }

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Elements to animate
  const animatedElements = document.querySelectorAll('.hero-content, .about-img, .about-text, .timeline-item, .skill-dropdown, .achievement-card, .terminal-window');
  
  animatedElements.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.resume-dropdown');
    const btn = document.querySelector('.resume-btn');
    if (dropdown && !dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
  // Tech Icon Rotation - Disabled for Grid Layout
  // const techIcons = document.querySelectorAll('.tech-icon');
  // if (techIcons.length > 0) { ... }

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.innerText = 'SENDING...';
      btn.disabled = true;

      // EmailJS Submission
      const serviceID = 'service_idfdyx2';
      const templateID = 'template_i7v0fyg';
      const publicKey = '4yPGJdh0I_dS0JCCz';

      // Initialize EmailJS (if not already done)
      if (window.emailjs) {
        emailjs.init(publicKey);
      }

      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          btn.innerText = 'MESSAGE SENT!';
          btn.style.background = '#00ff88';
          btn.style.color = '#000';
          this.reset();
        }, (err) => {
          console.error('EmailJS Error:', err);
          btn.innerText = 'FAILED';
          btn.style.background = '#ff0055';
          alert('Failed to send message. Please check your EmailJS configuration.');
        })
        .finally(() => {
          setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.background = '';
            btn.style.color = '';
          }, 3000);
        });
    });
  }
  // Typewriter Effect
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = ["Full Stack Web Development", "Cloud Technology", "Information Security", "DevOps & Infrastructure"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing new
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }
  // Drag to Scroll removed in favor of CSS Marquee
  // const slider = document.querySelector('.skills-grid');
  // if (slider) { ... }

  // Initialize theme
  loadTheme();
  
  // Theme toggle click handler
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

function toggleResumeDropdown() {
  const dropdown = document.querySelector('.resume-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

function toggleSkill(element) {
  const dropdown = element.parentElement;
  dropdown.classList.toggle('active');
}

function toggleSocialSidebar() {
  const sidebar = document.getElementById('socialSidebar');
  if (sidebar) {
    sidebar.classList.toggle('active');
  }
}

// Theme toggle function
function toggleTheme() {
  const body = document.body;
  
  body.classList.toggle('light-theme');
  
  if (body.classList.contains('light-theme')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
  }
}