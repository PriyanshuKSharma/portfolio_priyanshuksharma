/**
 * Real-time Interactive 3D Particle System
 * Uses Three.js for rendering and MediaPipe for hand tracking.
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
    const config = {
        particleCount: 3500, 
        particleSize: 0.2,   // Fine detail size (reduced from 0.35)
        colors: [0x00ffff, 0xff00ff, 0x00ff00, 0xffaa00, 0xffffff, 0xff0088, 0x0088ff], 
        cameraZ: 30,
        interactionRadius: 8,
        repulsionForce: 0.5,
        attractionForce: 0.3
    };

    // --- State ---
    let particles;
    let particleSystem;
    let scene, camera, renderer;
    let handPosition = new THREE.Vector3(0, 0, 0);
    let isHandDetected = false;
    let currentShape = 'default';
    let targetPositions = [];
    let isThreeInitialized = false;

    // --- Check Dependencies ---
    if (typeof THREE === 'undefined') {
        updateDebugBox("Error: Three.js not loaded", true);
        return;
    }
    if (typeof Hands === 'undefined') {
         updateDebugBox("Warning: MediaPipe Hands not loaded. Hand tracking disabled.", true);
    }
    if (typeof Camera === 'undefined') {
        updateDebugBox("Warning: MediaPipe Camera Utils not loaded. Hand tracking disabled.", true);
    }

    // --- Three.js Setup (Called Immediately) ---
    function initThree() {
        if (isThreeInitialized) return;
        
        try {
            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000000, 0.005); // Reduced fog for clarity (was 0.02)

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

        for (let i = 0; i < config.particleCount; i++) {
            positions[i * 3] = (Math.random() * 2 - 1) * 50;
            positions[i * 3 + 1] = (Math.random() * 2 - 1) * 30;
            positions[i * 3 + 2] = (Math.random() * 2 - 1) * 20;

            color.setHex(config.colors[Math.floor(Math.random() * config.colors.length)]);
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
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        });

        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
        updateDebugBox("Particles Enhanced: Brighter & Bigger");
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

            if (isHandDetected) {
                const dx = px - handPosition.x;
                const dy = py - handPosition.y;
                const dz = pz - handPosition.z;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                if (dist < config.interactionRadius) {
                    if (currentShape === 'firework') {
                        const force = (config.interactionRadius - dist) * config.repulsionForce;
                        px += (dx / dist) * force;
                        py += (dy / dist) * force;
                        pz += (dz / dist) * force;
                    } else {
                         const force = (config.interactionRadius - dist) * config.attractionForce;
                         px -= (dy / dist) * force;
                         py += (dx / dist) * force;
                         pz -= (dz / dist) * force * 0.5;
                    }
                }
            }
            positions[ix] = px;
            positions[iy] = py;
            positions[iz] = pz;
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    // --- MediaPipe Hand Handling ---
    function onHandsResults(results) {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            isHandDetected = true;
            updateDebugBox("Hand Detected! Gesture active.");
            
            const landmarks = results.multiHandLandmarks[0];
            const x = (1 - landmarks[9].x) * 2 - 1;
            const y = (1 - landmarks[9].y) * 2 - 1;
            handPosition.set(x * 20, y * 15, 0);

            detectGesture(landmarks);
        } else {
            isHandDetected = false;
        }
    }

    function detectGesture(landmarks) {
        const indexTip = landmarks[8];
        const middleTip = landmarks[12];
        const ringTip = landmarks[16];
        const pinkyTip = landmarks[20];
        const thumbTip = landmarks[4];
        
        const isIndexOpen = indexTip.y < landmarks[6].y;
        const isMiddleOpen = middleTip.y < landmarks[10].y;
        const isRingOpen = ringTip.y < landmarks[14].y;
        const isPinkyOpen = pinkyTip.y < landmarks[18].y;

        const openFingers = [isIndexOpen, isMiddleOpen, isRingOpen, isPinkyOpen].filter(Boolean).length;

        if (openFingers === 4) {
            // Open Hand -> Firework
            if (currentShape !== 'firework') generateShape('firework');
        } else if (openFingers === 0) {
            // Fist -> Vortex (DNA/Helix)
            if (currentShape !== 'vortex') generateShape('vortex');
        } else if (isIndexOpen && isPinkyOpen && !isMiddleOpen && !isRingOpen) {
            // Rock On / Spiderman -> Spiral
            if (currentShape !== 'spiral') generateShape('spiral');
        } else if (isIndexOpen && isMiddleOpen && !isRingOpen && !isPinkyOpen) {
            if (currentShape !== 'heart') generateShape('heart');
        } else if (isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen) {
             if (currentShape !== 'flower') generateShape('flower');
        } else if (!isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen && thumbTip.y < landmarks[3].y) {
             // Thumbs Up -> Saturn
             if (currentShape !== 'saturn') generateShape('saturn');
        }
    }

    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Initialize Three.js immediately for visuals
    initThree();

    // Initialize Camera for interaction (progressive enhancement)
    if (typeof Hands !== 'undefined' && typeof Camera !== 'undefined') {
        const videoElement = document.createElement('video');
        videoElement.style.display = 'none';
        document.body.appendChild(videoElement);

        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        hands.onResults(onHandsResults);

        const cameraUtils = new Camera(videoElement, {
            onFrame: async () => {
                await hands.send({image: videoElement});
            },
            width: 640,
            height: 480
        });
        
        updateDebugBox("Initializing Camera...");
        cameraUtils.start()
            .then(() => {
                updateDebugBox("Camera Active. Interaction Enabled.");
            })
            .catch(err => {
                console.warn("Camera failed to start:", err);
                updateDebugBox("Camera access denied. Interaction disabled.", true);
            });
    }
});
