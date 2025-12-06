document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  init3DTilt();
  initGlitchEffect();
  initHackerTextEffect();
});

function initHackerTextEffect() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', event => {
      let iteration = 0;
      const originalText = button.innerText; // Keep original text
      
      // Find the text node or span to animate
      let target = button.querySelector('span') || button;
      
      // Store original text in data attribute if not present
      if(!button.dataset.value) button.dataset.value = originalText;

      clearInterval(button.interval);

      button.interval = setInterval(() => {
        target.innerText = button.dataset.value
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return button.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
        
        if(iteration >= button.dataset.value.length){ 
          clearInterval(button.interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    });
  });
}


function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.classList.add('custom-cursor-dot');
  document.body.appendChild(cursorDot);

  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  const interactiveElements = document.querySelectorAll('a, button, .card, .skill-header, .tech-icon, input, textarea');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorDot.classList.remove('hover');
    });
  });
}

function init3DTilt() {
  const cards = document.querySelectorAll('.metric-card, .expertise-item, .skill-dropdown, .skill-card, .achievement-card, .project-content, .intro-point');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.1s ease';
      
      // Add shine effect
      const shine = card.querySelector('.card-shine') || document.createElement('div');
      if (!card.querySelector('.card-shine')) {
        shine.className = 'card-shine';
        card.appendChild(shine);
      }
      
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 80%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
      const shine = card.querySelector('.card-shine');
      if (shine) shine.remove();
    });
  });
}

function initGlitchEffect() {
  const title = document.querySelector('.hero-title');
  if (title) {
    title.setAttribute('data-text', title.innerText);
    title.classList.add('glitch-text');
  }
}
