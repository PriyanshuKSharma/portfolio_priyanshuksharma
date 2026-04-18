// World's Most Innovative Floating Navbar - AI-Powered Multi-Dimensional Dock
document.addEventListener('DOMContentLoaded', function() {
    const dock = document.querySelector('.bottom-nav-dock');
    const collapseToggle = document.getElementById('dock-collapse-toggle');
    const dockLinks = document.querySelectorAll('.dock-link:not(.dock-collapse-toggle)');
    
    // AI-Powered Mouse Tracking for Reactive Background
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    
    function updateMousePosition(e) {
        const rect = dock.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    }
    
    function animateMouseTracker() {
        targetX += (mouseX - targetX) * 0.1;
        targetY += (mouseY - targetY) * 0.1;
        
        dock.style.setProperty('--mouse-x', targetX + '%');
        dock.style.setProperty('--mouse-y', targetY + '%');
        
        requestAnimationFrame(animateMouseTracker);
    }
    
    dock.addEventListener('mousemove', updateMousePosition);
    animateMouseTracker();
    
    // Quantum Physics-Inspired Magnetic Hover Effect
    function createMagneticField() {
        dockLinks.forEach((link, index) => {
            link.addEventListener('mouseenter', function() {
                // Create magnetic repulsion effect on neighboring items
                dockLinks.forEach((otherLink, otherIndex) => {
                    if (otherIndex !== index) {
                        const distance = Math.abs(otherIndex - index);
                        const force = Math.max(0, 20 - distance * 5);
                        const direction = otherIndex > index ? 1 : -1;
                        
                        otherLink.style.transform = `translateX(${direction * force}px) scale(${1 - distance * 0.05})`;
                        otherLink.style.filter = `blur(${distance * 0.5}px)`;
                    }
                });
                
                // Create particle explosion effect
                createParticleExplosion(this);
            });
            
            link.addEventListener('mouseleave', function() {
                // Reset all items
                dockLinks.forEach(otherLink => {
                    otherLink.style.transform = '';
                    otherLink.style.filter = '';
                });
            });
        });
    }
    
    // Particle Explosion System
    function createParticleExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'dock-particle';
            
            const angle = (i / 12) * Math.PI * 2;
            const velocity = 50 + Math.random() * 30;
            const size = 2 + Math.random() * 3;
            
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, var(--primary), var(--secondary));
                border-radius: 50%;
                pointer-events: none;
                z-index: 1001;
                box-shadow: 0 0 10px currentColor;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const animation = particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }
    
    // Neural Network-Inspired Active State Detection
    let sectionWeights = {};
    let learningRate = 0.1;
    
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id], .hero-section');
        const scrollPos = window.scrollY + 100;
        const viewportHeight = window.innerHeight;
        
        let maxWeight = 0;
        let activeSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id || 'hero';
            
            // Calculate visibility weight using neural network approach
            const visibleTop = Math.max(0, scrollPos - sectionTop);
            const visibleBottom = Math.min(sectionHeight, scrollPos + viewportHeight - sectionTop);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibilityRatio = visibleHeight / Math.min(sectionHeight, viewportHeight);
            
            // Update section weight with learning
            if (!sectionWeights[sectionId]) sectionWeights[sectionId] = 0;
            sectionWeights[sectionId] += (visibilityRatio - sectionWeights[sectionId]) * learningRate;
            
            if (sectionWeights[sectionId] > maxWeight) {
                maxWeight = sectionWeights[sectionId];
                activeSection = sectionId;
            }
        });
        
        // Update active states with morphing animation
        dockLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const targetId = href.replace('#', '');
                if (targetId === activeSection) {
                    link.classList.add('active');
                    morphToActive(link);
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    
    // Morphing Active State Animation
    function morphToActive(element) {
        element.style.animation = 'morphActive 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
    
    // Quantum Entanglement Scroll Behavior
    let scrollVelocity = 0;
    let lastScrollTop = 0;
    let scrollDirection = 0;
    
    function quantumScrollBehavior() {
        const scrollTop = window.pageYOffset;
        scrollVelocity = scrollTop - lastScrollTop;
        scrollDirection = scrollVelocity > 0 ? 1 : -1;
        
        // Apply quantum effects based on scroll velocity
        const intensity = Math.min(Math.abs(scrollVelocity) / 10, 1);
        
        dock.style.filter = `blur(${intensity * 2}px) brightness(${1 + intensity * 0.3})`;
        dock.style.transform = `translateX(-50%) translateY(${scrollDirection * intensity * 3}px) scale(${1 - intensity * 0.05})`;
        
        // Reset effects
        setTimeout(() => {
            dock.style.filter = '';
            dock.style.transform = 'translateX(-50%)';
        }, 100);
        
        lastScrollTop = scrollTop;
    }
    
    // Holographic Ripple Effect
    function createHolographicRipple(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.className = 'holographic-ripple';
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(0, 255, 255, 0.6) 0%, 
                rgba(255, 0, 128, 0.4) 50%, 
                transparent 100%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10;
        `;
        
        element.appendChild(ripple);
        
        const animation = ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: '100px', height: '100px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => ripple.remove();
    }
    
    // Initialize all systems
    createMagneticField();
    
    // Event listeners
    dockLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            createHolographicRipple(this, e);
            
            const targetId = this.getAttribute('href').replace('#', '');
            const targetElement = document.getElementById(targetId) || document.querySelector('.hero-section');
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Immediate active state for better UX
                dockLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                morphToActive(this);
            }
        });
    });
    
    // Optimized scroll listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveLink();
                quantumScrollBehavior();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initialize
    updateActiveLink();
    
    // Add dynamic CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes morphActive {
            0% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.3) rotate(90deg); }
            50% { transform: scale(0.9) rotate(180deg); }
            75% { transform: scale(1.2) rotate(270deg); }
            100% { transform: scale(1.1) rotate(360deg); }
        }
        
        .dock-link.active {
            background: linear-gradient(135deg, 
                rgba(0, 255, 255, 0.3) 0%,
                rgba(255, 0, 128, 0.2) 50%,
                rgba(0, 255, 255, 0.3) 100%) !important;
            border: 2px solid var(--primary) !important;
            box-shadow: 
                0 0 30px rgba(0, 255, 255, 0.8),
                0 0 60px rgba(0, 255, 255, 0.4),
                inset 0 0 20px rgba(0, 255, 255, 0.2) !important;
            color: var(--primary) !important;
            animation: activeGlow 2s ease-in-out infinite alternate;
        }
        
        @keyframes activeGlow {
            0% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.2); }
            100% { box-shadow: 0 0 40px rgba(0, 255, 255, 1), 0 0 80px rgba(0, 255, 255, 0.6), inset 0 0 30px rgba(0, 255, 255, 0.3); }
        }
    `;
    document.head.appendChild(style);
});