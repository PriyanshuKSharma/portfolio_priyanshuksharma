// Revolutionary Liquid Metal AI Dock - Most Advanced Navigation Ever Created
document.addEventListener('DOMContentLoaded', function() {
    const dock = document.querySelector('.bottom-nav-dock');
    const dockContainer = document.querySelector('.dock-container');
    const dockLinks = document.querySelectorAll('.dock-link');
    
    // Liquid Metal Mouse Tracking System
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    
    function updateMousePosition(e) {
        const rect = dockContainer.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    }
    
    function animateMouseTracker() {
        targetX += (mouseX - targetX) * 0.15;
        targetY += (mouseY - targetY) * 0.15;
        
        dockContainer.style.setProperty('--mouse-x', targetX + '%');
        dockContainer.style.setProperty('--mouse-y', targetY + '%');
        
        requestAnimationFrame(animateMouseTracker);
    }
    
    dockContainer.addEventListener('mousemove', updateMousePosition);
    animateMouseTracker();
    
    // Liquid Metal Morphing Effect
    function createLiquidMorph(element) {
        const morphEffect = document.createElement('div');
        morphEffect.className = 'liquid-morph';
        morphEffect.style.cssText = `
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: radial-gradient(circle, 
                rgba(0, 255, 255, 0.4) 0%, 
                rgba(255, 0, 128, 0.3) 50%, 
                transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: liquidExpand 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        element.appendChild(morphEffect);
        
        setTimeout(() => {
            morphEffect.remove();
        }, 800);
    }
    
    // Consciousness-Based Active State Detection
    let sectionMemory = {};
    let adaptationRate = 0.12;
    
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id], .hero-section');
        const scrollPos = window.scrollY + 100;
        const viewportHeight = window.innerHeight;
        
        let maxConsciousness = 0;
        let consciousSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id || 'hero';
            
            // Calculate consciousness level
            const visibleTop = Math.max(0, scrollPos - sectionTop);
            const visibleBottom = Math.min(sectionHeight, scrollPos + viewportHeight - sectionTop);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const consciousnessLevel = visibleHeight / Math.min(sectionHeight, viewportHeight);
            
            // Memory adaptation
            if (!sectionMemory[sectionId]) sectionMemory[sectionId] = 0;
            sectionMemory[sectionId] += (consciousnessLevel - sectionMemory[sectionId]) * adaptationRate;
            
            if (sectionMemory[sectionId] > maxConsciousness) {
                maxConsciousness = sectionMemory[sectionId];
                consciousSection = sectionId;
            }
        });
        
        // Update consciousness states
        dockLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const targetId = href.replace('#', '');
                if (targetId === consciousSection) {
                    link.classList.add('active');
                    activateConsciousness(link);
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    
    // Consciousness Activation Animation
    function activateConsciousness(element) {
        element.style.animation = 'consciousnessAwakening 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 1000);
    }
    
    // Liquid Metal Ripple System
    function createLiquidRipple(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.className = 'liquid-ripple';
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.8) 0%, 
                rgba(0, 255, 255, 0.6) 30%, 
                rgba(255, 0, 128, 0.4) 60%, 
                transparent 100%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10;
        `;
        
        element.appendChild(ripple);
        
        const animation = ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: '120px', height: '120px', opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => ripple.remove();
    }
    
    // Quantum Entanglement Hover Effects
    dockLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            createLiquidMorph(this);
            
            // Quantum entanglement with neighboring items
            dockLinks.forEach((otherLink, otherIndex) => {
                if (otherIndex !== index) {
                    const distance = Math.abs(otherIndex - index);
                    const entanglement = Math.max(0, 1 - distance * 0.3);
                    
                    otherLink.style.filter = `brightness(${1 + entanglement * 0.3}) saturate(${1 + entanglement * 0.5})`;
                    otherLink.style.transform = `scale(${1 + entanglement * 0.1})`;
                }
            });
        });
        
        link.addEventListener('mouseleave', function() {
            dockLinks.forEach(otherLink => {
                otherLink.style.filter = '';
                otherLink.style.transform = '';
            });
        });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            createLiquidRipple(this, e);
            
            const targetId = this.getAttribute('href').replace('#', '');
            const targetElement = document.getElementById(targetId) || document.querySelector('.hero-section');
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Immediate consciousness activation
                dockLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                activateConsciousness(this);
            }
        });
    });
    
    // Optimized scroll listener with consciousness
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initialize consciousness
    updateActiveLink();
    
    // Add dynamic CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes liquidExpand {
            0% { 
                transform: scale(0) rotate(0deg);
                opacity: 0;
            }
            50% { 
                transform: scale(1.5) rotate(180deg);
                opacity: 1;
            }
            100% { 
                transform: scale(2) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes consciousnessAwakening {
            0% { 
                transform: scale(1) rotate(0deg);
                filter: brightness(1);
            }
            25% { 
                transform: scale(1.2) rotate(90deg);
                filter: brightness(1.5);
            }
            50% { 
                transform: scale(0.9) rotate(180deg);
                filter: brightness(2);
            }
            75% { 
                transform: scale(1.3) rotate(270deg);
                filter: brightness(1.5);
            }
            100% { 
                transform: scale(1.1) rotate(360deg);
                filter: brightness(1.2);
            }
        }
    `;
    document.head.appendChild(style);
});