/**
 * Real-time Interactive 3D Particle System
 * Uses Three.js for rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Particle System: DOM loaded. Initializing...");

    const container = document.querySelector('.hero-particles');
    if (!container) {
        console.error("Particle System: Container .hero-particles not found!");
        return; 
    }
    console.log("Particle System: Container found.");

    function updateDebugBox(msg, isError = false) {
        console.log(`Particle System Status: ${msg}`);
        if(isError) console.error(msg);
    }

    // --- Configuration ---
    const darkColors = [0x818cf8, 0x14b8a6, 0x00ffff, 0xff00ff, 0xffaa00, 0xff0088, 0x0088ff]; // Cyber neon theme
    const lightColors = [0x4f46e5, 0x0d9488, 0x6366f1, 0x0d9488, 0x8b5cf6, 0x2563eb, 0x0891b2]; // Soft indigo/teal palette for white bg

    const config = {
        particleCount: 3500, 
        particleSize: 0.2,   // Fine detail size (reduced from 0.35)
        cameraZ: 30
    };

    // --- State ---
    let particles;
    let particleSystem;
    let scene, camera, renderer;
    let currentShape = 'default';
    let targetPositions = [];
    let isThreeInitialized = false;

    // --- Check Dependencies ---
    if (typeof THREE === 'undefined') {
        updateDebugBox("Error: Three.js not loaded", true);
        return;
    }
    // --- Three.js Setup (Called Immediately) ---
    function initThree() {
        if (isThreeInitialized) return;
        
        try {
            scene = new THREE.Scene();
            const isLightInit = document.body.classList.contains('light-theme');
            scene.fog = new THREE.FogExp2(isLightInit ? 0xf4f4f8 : 0x000000, 0.005); // Theme-aware fog

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = config.cameraZ;

            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            // Ensure canvas is correctly styled
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = '0';
            renderer.domElement.style.left = '0';
            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';
            renderer.domElement.style.zIndex = '1'; // Ensure it's above background

            container.innerHTML = ''; // Clear container
            container.appendChild(renderer.domElement);

            createParticles();
            animate();

            window.addEventListener('resize', onWindowResize);
            isThreeInitialized = true;
            updateDebugBox("Three.js System Initialized.");

            // Theme observer to watch body class changes and update colors dynamically
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        updateParticleColors();
                    }
                });
            });
            observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        } catch (e) {
            console.error(e);
            updateDebugBox("Three.js Init Error: " + e.message, true);
        }
    }

    function createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(config.particleCount * 3);
        const colors = new Float32Array(config.particleCount * 3);
        const sizes = new Float32Array(config.particleCount);

        const color = new THREE.Color();
        const activeColors = document.body.classList.contains('light-theme') ? lightColors : darkColors;

        for (let i = 0; i < config.particleCount; i++) {
            positions[i * 3] = (Math.random() * 2 - 1) * 50;
            positions[i * 3 + 1] = (Math.random() * 2 - 1) * 30;
            positions[i * 3 + 2] = (Math.random() * 2 - 1) * 20;

            color.setHex(activeColors[Math.floor(Math.random() * activeColors.length)]);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = config.particleSize * (Math.random() * 0.5 + 0.8); // Larger base size
            targetPositions.push(new THREE.Vector3(positions[i*3], positions[i*3+1], positions[i*3+2]));
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Create a procedural texture (stronger glow)
        const canvas = document.createElement('canvas');
        canvas.width = 64; // Higher res
        canvas.height = 64;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.3, 'rgba(255,255,255,0.9)'); // Extended core
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: texture }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z) * 2.0; // Refined scale
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                void main() {
                    gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
                }
            `,
            blending: document.body.classList.contains('light-theme') ? THREE.NormalBlending : THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        });

        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
        updateDebugBox("Particles Enhanced: Brighter & Bigger");
    }

    function updateParticleColors() {
        if (!particleSystem) return;
        const isLightTheme = document.body.classList.contains('light-theme');
        const activeColors = isLightTheme ? lightColors : darkColors;
        
        // Update fog to match theme
        if (scene.fog) {
            scene.fog.color.setHex(isLightTheme ? 0xf4f4f8 : 0x000000);
        }

        // Update blending mode
        particleSystem.material.blending = isLightTheme ? THREE.NormalBlending : THREE.AdditiveBlending;
        particleSystem.material.needsUpdate = true;

        const colorsAttr = particleSystem.geometry.attributes.color;
        const color = new THREE.Color();
        
        for (let i = 0; i < config.particleCount; i++) {
            color.setHex(activeColors[Math.floor(Math.random() * activeColors.length)]);
            colorsAttr.array[i * 3] = color.r;
            colorsAttr.array[i * 3 + 1] = color.g;
            colorsAttr.array[i * 3 + 2] = color.b;
        }
        colorsAttr.needsUpdate = true;
    }

    function generateShape(type) {
        currentShape = type;
        const positions = particleSystem.geometry.attributes.position.array;
        targetPositions = [];

        for (let i = 0; i < config.particleCount; i++) {
            let x, y, z;

            if (type === 'heart') {
                const t = Math.PI * 2 * Math.random();
                x = 16 * Math.pow(Math.sin(t), 3);
                y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
                z = (Math.random() - 0.5) * 5;
                x *= 0.5; y *= 0.5;
            } else if (type === 'flower') {
                 const angle = i * 137.5 * (Math.PI / 180);
                 const r = 0.5 * Math.sqrt(i);
                 x = r * Math.cos(angle);
                 y = r * Math.sin(angle);
                 z = (Math.random() - 0.5) * 5;
            } else if (type === 'saturn') {
                if (i < config.particleCount * 0.3) {
                    const r = 4 * Math.cbrt(Math.random());
                    const theta = Math.random() * 2 * Math.PI;
                    const phi = Math.acos(2 * Math.random() - 1);
                    x = r * Math.sin(phi) * Math.cos(theta);
                    y = r * Math.sin(phi) * Math.sin(theta);
                    z = r * Math.cos(phi);
                } else {
                    const angle = Math.random() * 2 * Math.PI;
                    const r = 8 + Math.random() * 6;
                    x = r * Math.cos(angle);
                    z = r * Math.sin(angle) * 0.4;
                    y = r * Math.sin(angle) * 0.2;
                }
            } else if (type === 'spiral') {
                const a = 0.5;
                const b = 0.5;
                const t = i * 0.1;
                x = (a + b * t) * Math.cos(t);
                y = (a + b * t) * Math.sin(t);
                z = (Math.random() - 0.5) * 10;
                x *= 0.5; y *= 0.5;
            } else if (type === 'vortex') {
                 // Double Helix / DNA like structure
                 const t = i * 0.1;
                 const radius = 5;
                 x = radius * Math.cos(t);
                 y = (i * 0.05) - 20; // Spread vertically
                 z = radius * Math.sin(t);
                 if (i % 2 === 0) {
                     x = -x;
                     z = -z;
                 }
            } else if (type === 'firework') {
                const r = Math.random() * 20;
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos(2 * Math.random() - 1);
                x = r * Math.sin(phi) * Math.cos(theta);
                y = r * Math.sin(phi) * Math.sin(theta);
                z = r * Math.cos(phi);
            } else {
                 x = (Math.random() * 2 - 1) * 30;
                 y = (Math.random() * 2 - 1) * 20;
                 z = (Math.random() * 2 - 1) * 10;
            }
            targetPositions.push(new THREE.Vector3(x, y, z));
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        const positions = particleSystem.geometry.attributes.position.array;
        
        for (let i = 0; i < config.particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            let px = positions[ix];
            let py = positions[iy];
            let pz = positions[iz];

            if (currentShape !== 'default') {
                const target = targetPositions[i];
                if (target) {
                    px += (target.x - px) * 0.05;
                    py += (target.y - py) * 0.05;
                    pz += (target.z - pz) * 0.05;
                }
            } else {
                py += Math.sin(Date.now() * 0.001 + px * 0.1) * 0.02;
                px += Math.cos(Date.now() * 0.002 + py * 0.1) * 0.02;
            }

            positions[ix] = px;
            positions[iy] = py;
            positions[iz] = pz;
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Initialize Three.js immediately for visuals
    initThree();
});
