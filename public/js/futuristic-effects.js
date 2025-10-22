// ULTIMATE FUTURISTIC EFFECTS
document.addEventListener('DOMContentLoaded', function() {
    createQuantumField();
    createHologramProjection();
    addNeuralNetworkBackground();
    createDataStreams();
    addQuantumParticles();
    createEnergyPulses();
    addHolographicInterface();
    createCyberSpace();
});

function createQuantumField() {
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
        opacity: 0.4;
    `;
    
    document.body.appendChild(canvas);
    
    const particles = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                hue: Math.random() * 60 + 280,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 17, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.pulse += 0.02;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            const alpha = (Math.sin(particle.pulse) + 1) * 0.5;
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 3
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${alpha})`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Quantum connections
            particles.slice(i + 1).forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `hsla(${(particle.hue + other.hue) / 2}, 100%, 60%, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    window.addEventListener('resize', resize);
}

function createHologramProjection() {
    const hologram = document.createElement('div');
    hologram.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        background: 
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 136, 0.03) 2px,
                rgba(0, 255, 136, 0.03) 4px
            );
        animation: hologramScan 3s linear infinite;
    `;
    
    document.body.appendChild(hologram);
}

function addNeuralNetworkBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -4;
        opacity: 0.2;
    `;
    
    document.body.appendChild(canvas);
    
    const nodes = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        nodes.length = 0;
        for (let i = 0; i < 80; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4ff';
            ctx.fill();
            
            nodes.forEach(other => {
                if (node !== other) {
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const opacity = (1 - distance / 100) * 0.5;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
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

function createDataStreams() {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(container);
    
    function createStream() {
        const stream = document.createElement('div');
        const isVertical = Math.random() > 0.5;
        const colors = ['#ff0080', '#00d4ff', '#00ff88', '#7928ca'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        if (isVertical) {
            stream.style.cssText = `
                position: absolute;
                width: 2px;
                height: 100px;
                background: linear-gradient(to bottom, transparent, ${color}, transparent);
                left: ${Math.random() * 100}%;
                top: -100px;
                animation: streamVertical ${5 + Math.random() * 5}s linear infinite;
                box-shadow: 0 0 10px ${color};
            `;
        } else {
            stream.style.cssText = `
                position: absolute;
                width: 100px;
                height: 2px;
                background: linear-gradient(to right, transparent, ${color}, transparent);
                left: -100px;
                top: ${Math.random() * 100}%;
                animation: streamHorizontal ${5 + Math.random() * 5}s linear infinite;
                box-shadow: 0 0 10px ${color};
            `;
        }
        
        container.appendChild(stream);
        
        setTimeout(() => {
            stream.remove();
        }, 10000);
    }
    
    setInterval(createStream, 500);
}

function addQuantumParticles() {
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
    
    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 3; i++) {
            quantumParticles.push({
                x: e.clientX + (Math.random() - 0.5) * 20,
                y: e.clientY + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1,
                decay: 0.02,
                size: Math.random() * 3 + 1,
                hue: Math.random() * 360
            });
        }
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        quantumParticles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                quantumParticles.splice(index, 1);
                return;
            }
            
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.life})`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    window.addEventListener('resize', resize);
}

function createEnergyPulses() {
    document.querySelectorAll('.btn, .project-card, .achievement-card, .skill-header').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const pulse = document.createElement('div');
            pulse.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 0, 128, 0.3), transparent);
                transform: translate(-50%, -50%);
                animation: energyPulse 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.appendChild(pulse);
            
            setTimeout(() => {
                pulse.remove();
            }, 600);
        });
    });
}

function addHolographicInterface() {
    document.querySelectorAll('.hero, .about-section, .skills-section, .projects-section, .contact-section').forEach(element => {
        const holographic = document.createElement('div');
        holographic.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.1) 50%, transparent 70%),
                linear-gradient(-45deg, transparent 30%, rgba(255, 0, 128, 0.1) 50%, transparent 70%);
            background-size: 20px 20px;
            animation: holographicShift 4s ease-in-out infinite;
            pointer-events: none;
            border-radius: inherit;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(holographic);
    });
}

function createCyberSpace() {
    const cyberspace = document.createElement('div');
    cyberspace.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -5;
        background: 
            radial-gradient(circle at 20% 20%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(121, 40, 202, 0.05) 0%, transparent 50%);
        animation: cyberspacePulse 8s ease-in-out infinite;
    `;
    
    document.body.appendChild(cyberspace);
}

// Enhanced CSS animations
const ultimateStyles = document.createElement('style');
ultimateStyles.textContent = `
    @keyframes hologramScan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes streamVertical {
        from { top: -100px; }
        to { top: 100vh; }
    }
    
    @keyframes streamHorizontal {
        from { left: -100px; }
        to { left: 100vw; }
    }
    
    @keyframes energyPulse {
        from {
            width: 0;
            height: 0;
            opacity: 1;
        }
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    @keyframes holographicShift {
        0%, 100% { 
            background-position: 0 0, 0 0;
            opacity: 0.3;
        }
        50% { 
            background-position: 20px 20px, -20px -20px;
            opacity: 0.6;
        }
    }
    
    @keyframes cyberspacePulse {
        0%, 100% { 
            transform: scale(1);
            opacity: 0.5;
        }
        50% { 
            transform: scale(1.1);
            opacity: 0.8;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 0.5s;
    }
    
    .btn:hover::after {
        left: 100%;
    }
    
    .quantum-text {
        background: linear-gradient(45deg, #ff0080, #00d4ff, #00ff88, #7928ca);
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: quantumShift 3s ease-in-out infinite;
    }
    
    @keyframes quantumShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    .glow-effect {
        filter: drop-shadow(0 0 20px currentColor);
        animation: glowPulse 2s ease-in-out infinite alternate;
    }
    
    @keyframes glowPulse {
        from { filter: drop-shadow(0 0 20px currentColor); }
        to { filter: drop-shadow(0 0 40px currentColor); }
    }
`;

document.head.appendChild(ultimateStyles);