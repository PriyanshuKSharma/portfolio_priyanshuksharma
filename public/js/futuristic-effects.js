// ULTIMATE FUTURISTIC EFFECTS - OPTIMIZED & THEME-AWARE
document.addEventListener('DOMContentLoaded', function() {
    // Check for prefers-reduced-motion or mobile screens
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    if (prefersReducedMotion || isMobile) {
        console.log("Futuristic Effects: Reduced motion or mobile active. Skipping background canvas.");
        // We can still initialize hover effects since they are lightweight
        createEnergyPulses();
        return;
    }

    // Initialize premium animations
    createNeuralNetworkBackground();
    createDataStreams();
    addMouseQuantumTrails();
    createEnergyPulses();
    createCyberSpace();
});

// Gorgeous Interactive Neural Network/Constellation Background
function createNeuralNetworkBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -3;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(canvas);
    
    const nodes = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    // Get colors based on active theme
    function getThemeColors() {
        const isLight = document.body.classList.contains('light-theme');
        return {
            nodeColor: isLight ? 'rgba(79, 70, 229, 0.4)' : 'rgba(0, 212, 255, 0.35)',
            lineColor: isLight ? '79, 70, 229' : '0, 212, 255',
            opacity: isLight ? 0.15 : 0.25
        };
    }
    
    let theme = getThemeColors();
    canvas.style.opacity = theme.opacity;
    
    // Listen to theme changes via MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                theme = getThemeColors();
                canvas.style.opacity = theme.opacity;
            }
        });
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Adjust node count dynamically based on screen resolution
        const nodeCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
        nodes.length = 0;
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                radius: Math.random() * 2 + 1.5
            });
        }
    }
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        nodes.forEach(node => {
            // Smooth float
            node.x += node.vx;
            node.y += node.vy;
            
            // Screen boundaries bounce
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Mouse Interaction: attract nodes slightly
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - node.x;
                const dy = mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    // Attract slightly
                    node.x += (dx / dist) * force * 0.5;
                    node.y += (dy / dist) * force * 0.5;
                }
            }
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = theme.nodeColor;
            ctx.fill();
            
            // Connections
            nodes.forEach(other => {
                if (node !== other) {
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 110) {
                        const opacity = (1 - distance / 110) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(${theme.lineColor}, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    window.addEventListener('resize', resize);
}

// Sparse, beautiful horizontal/vertical floating neon data streams
function createDataStreams() {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        overflow: hidden;
    `;
    
    document.body.appendChild(container);
    
    function createStream() {
        // Limit active streams count
        if (container.children.length > 8) return;
        
        const stream = document.createElement('div');
        const isVertical = Math.random() > 0.5;
        
        // Theme aware stream colors
        const isLight = document.body.classList.contains('light-theme');
        const colors = isLight 
            ? ['#4f46e5', '#0d9488', '#d97706', '#7c3aed'] // Soft matching light colors
            : ['#ff0080', '#00d4ff', '#00ff88', '#7928ca']; // Vibrant dark neon
            
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        if (isVertical) {
            stream.style.cssText = `
                position: absolute;
                width: 1.5px;
                height: 80px;
                background: linear-gradient(to bottom, transparent, ${color}, transparent);
                left: ${Math.random() * 100}%;
                top: -100px;
                animation: streamVertical ${6 + Math.random() * 6}s linear forwards;
                box-shadow: 0 0 8px ${color};
                opacity: ${isLight ? 0.3 : 0.6};
            `;
        } else {
            stream.style.cssText = `
                position: absolute;
                width: 80px;
                height: 1.5px;
                background: linear-gradient(to right, transparent, ${color}, transparent);
                left: -100px;
                top: ${Math.random() * 100}%;
                animation: streamHorizontal ${6 + Math.random() * 6}s linear forwards;
                box-shadow: 0 0 8px ${color};
                opacity: ${isLight ? 0.3 : 0.6};
            `;
        }
        
        container.appendChild(stream);
        
        // Remove stream after animation completes
        setTimeout(() => {
            stream.remove();
        }, 12000);
    }
    
    // Spawn stream sparsely
    setInterval(createStream, 1500);
}

// Sparkle mouse trails on move
function addMouseQuantumTrails() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.8;
    `;
    
    document.body.appendChild(canvas);
    
    const quantumParticles = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Sparse mouse move particle generation
    let lastMoveTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMoveTime < 15) return; // Rate limit to prevent massive performance cost
        lastMoveTime = now;
        
        const isLight = document.body.classList.contains('light-theme');
        
        for (let i = 0; i < 2; i++) {
            quantumParticles.push({
                x: e.clientX + (Math.random() - 0.5) * 10,
                y: e.clientY + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1.0,
                decay: 0.03 + Math.random() * 0.02,
                size: Math.random() * 2 + 1,
                hue: isLight ? (Math.random() > 0.5 ? 240 : 170) : Math.random() * 360 // blue/teal in light, random in dark
            });
        }
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = quantumParticles.length - 1; i >= 0; i--) {
            const p = quantumParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            
            if (p.life <= 0) {
                quantumParticles.splice(i, 1);
                continue;
            }
            
            const gradient = ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.size * 2
            );
            gradient.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${p.life})`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    window.addEventListener('resize', resize);
}

// Pulse visual feedback on button/card hovers
function createEnergyPulses() {
    document.querySelectorAll('.btn, .project-card, .achievement-card, .chronicle-card, .metric-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.querySelector('.energy-pulse-effect')) return;
            
            const pulse = document.createElement('div');
            pulse.classList.add('energy-pulse-effect');
            pulse.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(129, 140, 248, 0.4), transparent 70%);
                transform: translate(-50%, -50%);
                animation: energyPulse 0.5s ease-out forwards;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.style.position = 'relative';
            this.appendChild(pulse);
            
            setTimeout(() => {
                pulse.remove();
            }, 550);
        });
    });
}

// Background pulsing spatial glow layers
function createCyberSpace() {
    const cyberspace = document.createElement('div');
    cyberspace.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -4;
        background: 
            radial-gradient(circle at 15% 15%, rgba(129, 140, 248, 0.05) 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, rgba(20, 184, 166, 0.05) 0%, transparent 60%);
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(cyberspace);
    
    function updateSpaceGlow() {
        const isLight = document.body.classList.contains('light-theme');
        cyberspace.style.opacity = isLight ? '0.4' : '1.0';
    }
    
    updateSpaceGlow();
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateSpaceGlow();
            }
        });
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

// Appending shared dynamic CSS animations once
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes streamVertical {
        from { transform: translateY(0); }
        to { transform: translateY(115vh); }
    }
    
    @keyframes streamHorizontal {
        from { transform: translateX(0); }
        to { transform: translateX(115vw); }
    }
    
    @keyframes energyPulse {
        from {
            width: 0;
            height: 0;
            opacity: 1;
        }
        to {
            width: 250px;
            height: 250px;
            opacity: 0;
        }
    }
    
    .quantum-text {
        background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent), var(--primary));
        background-size: 300% 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: quantumShift 6s ease-in-out infinite;
    }
    
    @keyframes quantumShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    .glow-effect {
        filter: drop-shadow(0 0 10px rgba(var(--primary-rgb), 0.2));
    }
`;
document.head.appendChild(animationStyles);