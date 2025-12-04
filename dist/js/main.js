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
});

function toggleResumeDropdown() {
  const dropdown = document.querySelector('.resume-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}