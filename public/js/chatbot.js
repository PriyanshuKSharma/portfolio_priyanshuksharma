class RecruitmentChatbot {
    constructor() {
        this.isOpen = false;
        this.isExpanded = false;
        this.chatData = null;
        this.init();
    }

    async init() {
        await this.loadChatData();
        this.createChatWidget();
        this.bindEvents();
    }

    async loadChatData() {
        // Static data for GitHub Pages compatibility
        this.chatData = {
            "responses": {
                "greeting": [
                    "Hello! I'm here to help you learn about Priyanshu Kumar Sharma - a talented B.Tech IT student specializing in Cloud Technology & Information Security. What would you like to know?",
                    "Hi there! I can provide detailed information about Priyanshu's technical skills, work experience, projects, and achievements. How can I assist you today?"
                ],
                "skills": "Priyanshu possesses comprehensive technical expertise across multiple domains: \n\n🔹 PROGRAMMING LANGUAGES: Advanced proficiency in Python (data structures, algorithms, automation), JavaScript (ES6+, async programming, DOM manipulation), Java (OOP, enterprise applications), and C++ (system programming, performance optimization). Also familiar with Go, Rust, and various scripting languages. \n\n🔹 CLOUD PLATFORMS: Extensive hands-on experience with AWS (EC2, S3, Lambda, CloudFormation, IAM, VPC, RDS, DynamoDB), Azure (Virtual Machines, Blob Storage, Functions, Resource Manager, Active Directory), and Google Cloud Platform (Compute Engine, Cloud Storage, Cloud Functions). Specializes in multi-cloud deployments and serverless architectures. \n\n🔹 CONTAINERIZATION & ORCHESTRATION: Expert-level Docker skills including multi-stage builds, container optimization, and security best practices. Kubernetes proficiency in container orchestration, service mesh implementation, and cluster management for microservices architecture. \n\n🔹 SECURITY EXPERTISE: Specialized in cybersecurity with focus on vulnerability assessment, penetration testing, security auditing, SAST/DAST implementation, and compliance frameworks. Cloud security expertise includes IAM management, network security, data encryption, and security monitoring. \n\n🔹 DEVOPS & INFRASTRUCTURE: Comprehensive DevOps pipeline implementation using Jenkins, GitHub Actions, GitLab CI for CI/CD. Infrastructure as Code with Terraform, Ansible, CloudFormation. Monitoring and observability with Prometheus, Grafana, and ELK Stack.",
                "experience": "Priyanshu has gained invaluable industry experience through three distinct internships: \n\n🔹 WEB DEVELOPMENT INTERN at Marquardt India Pvt. Ltd., Pune (June 2025 - September 2025): Led full-stack development initiatives using HTML5, CSS3, JavaScript, Node.js, Express.js, and MySQL. Key achievements include improving application load time by 40%, successfully delivering 3 major feature implementations, and receiving excellent feedback for code quality and documentation. Responsibilities encompassed responsive web application development, UI/UX optimization, performance enhancement, and security implementation. \n\n🔹 IT INTERN - PLACEMENT COORDINATOR at Seamless Education and Services (March 2025 - June 2025): Coordinated comprehensive placement activities for 200+ students, managed candidate databases, and integrated IT solutions for process efficiency. Achieved 35% increase in placement efficiency, coordinated 50+ company visits, and implemented digital tracking systems reducing manual work by 60%. Developed automated reporting systems and facilitated seamless communication between stakeholders. \n\n🔹 CLOUD RESEARCH INTERN at Indian Institute of Technology Ropar (May 2024 - July 2024): Conducted cutting-edge research on distributed computing systems and serverless architectures. Implemented XFBench framework for Function-as-a-Service performance evaluation and developed XFaaS optimization algorithms. Contributed to 2 research papers, improved FaaS performance benchmarking by 25%, and presented findings at internal research symposium. Collaborated with PhD researchers on advanced cloud technologies.",
                "education": "Priyanshu is currently pursuing Bachelor of Technology in Information Technology at Ajeenkya D Y Patil University, Pune (August 2022 - Present, Expected: 2026) with an exceptional CGPA of 9.9/10. \n\n🔹 SPECIALIZATION: Cloud Technology and Information Security - a cutting-edge program focusing on modern cloud architectures, cybersecurity frameworks, and distributed systems. \n\n🔹 RELEVANT COURSEWORK: Cloud Computing Architecture, Information Security Management, Distributed Systems, Database Management Systems, Software Engineering, Computer Networks, Operating Systems, Data Structures and Algorithms. \n\n🔹 ACADEMIC ACTIVITIES: Active member of Cybersecurity Club, participant in multiple hackathons and coding competitions, technical lead in university tech fest, and mentor for junior students in cloud computing. \n\n🔹 PREVIOUS EDUCATION: Completed Intermediate Education (12th Grade) at Sri Chaitanya Jr. Kalasala, Hyderabad with 93.9% in Science stream (PCM), and Higher Secondary Education (10th Grade) at Sri Chaitanya High School, Hyderabad with 87.6%. Consistent academic excellence throughout educational journey.",
                "projects": "Priyanshu has developed several impactful projects demonstrating practical application of advanced technologies: \n\n🔹 SECURE CLOUD ARCHITECTURE IMPLEMENTATION: Designed and implemented a comprehensive multi-tier secure cloud architecture featuring automated scaling, load balancing, security monitoring, and cost optimization. Technologies used: AWS, Terraform, Docker, Kubernetes, Python. Impact: Reduced infrastructure costs by 30% while significantly improving security posture. \n\n🔹 XFBENCH - SERVERLESS PERFORMANCE BENCHMARKING: Developed an innovative benchmarking framework for Function-as-a-Service platforms including performance metrics analysis, cost analysis, scalability testing, and comparative analysis. Technologies: Python, AWS Lambda, Docker, Prometheus. Impact: Adopted by IIT Ropar research team for ongoing serverless computing studies. \n\n🔹 MODERN PORTFOLIO WEBSITE: Built a responsive, interactive portfolio featuring advanced animations, cyberpunk theme, responsive design, contact form integration, and SEO optimization. Technologies: Node.js, Express.js, EJS, CSS3, JavaScript. Impact: Effectively showcases technical skills and attracts potential employers. \n\n🔹 AI RECRUITMENT CHATBOT: Developed an intelligent chatbot system to help recruiters learn about candidate qualifications through natural language processing, quick response system, and mobile-responsive design. Technologies: JavaScript, Node.js, JSON, CSS3. Impact: Streamlines initial screening process for recruiters and enhances candidate presentation.",
                "achievements": "Priyanshu has accomplished remarkable achievements across academic, research, and technical domains: \n\n🔹 ACADEMIC EXCELLENCE: Maintained an outstanding 9.9/10 CGPA throughout his B.Tech program, demonstrating consistent high performance and deep understanding of complex technical concepts. This exceptional academic record places him in the top 1% of his cohort. \n\n🔹 RESEARCH CONTRIBUTIONS: Secured a prestigious research internship at Indian Institute of Technology Ropar, one of India's premier technical institutions. Contributed to 2 research papers on serverless computing, improved FaaS performance benchmarking by 25%, and presented findings at internal research symposium. \n\n🔹 COMPETITIVE PROGRAMMING & HACKATHONS: Active participant in 10+ hackathons and coding competitions, demonstrating problem-solving skills under pressure and innovative thinking. Winner of multiple university-level coding competitions, showcasing algorithmic expertise and programming proficiency. \n\n🔹 LEADERSHIP & MENTORSHIP: Technical mentor for 20+ junior students in cloud computing, demonstrating leadership skills and knowledge sharing capabilities. Served as technical lead in university tech fest, coordinating technical events and managing teams. \n\n🔹 COMMUNITY INVOLVEMENT: Active member of Cybersecurity Club, contributing to security awareness and knowledge dissemination. Regular participant in tech community events, workshops, and seminars. \n\n🔹 PROFESSIONAL RECOGNITION: Received excellent feedback for code quality and documentation during internships. Successfully delivered multiple major feature implementations with measurable impact on performance and efficiency.",
                "contact": "Priyanshu is actively seeking opportunities in cloud computing, cybersecurity, and full-stack development roles. You can reach him through his portfolio website, LinkedIn, or GitHub. He's particularly interested in positions involving cloud security, DevOps, and distributed systems.",
                "strengths": "Priyanshu possesses exceptional strengths that make him an ideal candidate for technical roles: \n\n🔹 ANALYTICAL & PROBLEM-SOLVING SKILLS: Demonstrated ability to break down complex problems, analyze requirements, and develop innovative solutions. Research experience at IIT Ropar showcases advanced analytical thinking and systematic approach to problem-solving. \n\n🔹 CLOUD SECURITY EXPERTISE: Specialized knowledge in cloud security architecture, distributed systems, and cybersecurity frameworks. Hands-on experience with security monitoring, vulnerability assessment, and compliance implementation. \n\n🔹 ACADEMIC EXCELLENCE: Outstanding 9.9/10 CGPA demonstrates strong theoretical foundation, consistent performance, and ability to master complex technical concepts quickly. \n\n🔹 RESEARCH & DEVELOPMENT: Proven research capabilities through IIT Ropar internship, contributing to cutting-edge serverless computing research and framework development. \n\n🔹 LEADERSHIP & MENTORSHIP: Natural leadership abilities demonstrated through technical mentorship of 20+ students, tech fest coordination, and community involvement. \n\n🔹 ADAPTABILITY & LEARNING: Quick adaptation to new technologies and frameworks, evidenced by diverse internship experiences and successful project implementations across different domains.",
                "interests": "Professional interests include cloud security architecture, serverless computing optimization, cybersecurity frameworks, DevOps automation, and emerging technologies like quantum computing. Passionate about contributing to open-source projects and research in distributed systems.",
                "default": "I can provide detailed information about Priyanshu's technical skills, work experience, education (9.9 CGPA), projects, achievements, or career interests. What specific area would you like to explore?"
            }
        };
    }

    createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.innerHTML = `
            <div id="chatbot-toggle" class="chatbot-toggle">
                <img src="images/chatbot-icon.png" alt="Chatbot" class="chatbot-icon-img">
                <span class="chat-notification">Ask about Priyanshu!</span>
            </div>
            <div id="chatbot-container" class="chatbot-container">
                <div class="chatbot-header">
                    <h4>💼 Recruitment Assistant</h4>
                    <div class="chatbot-controls">
                        <button id="chatbot-expand" title="Expand/Collapse">⛶</button>
                        <button id="chatbot-close" title="Close">&times;</button>
                    </div>
                </div>
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="bot-message">
                        Hi! I'm here to help you learn about Priyanshu Kumar Sharma. 
                        Ask me about his skills, experience, projects, or education! 🚀
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input" placeholder="Ask about skills, experience, projects...">
                    <button id="chatbot-send"><i class="fas fa-paper-plane"></i></button>
                </div>
                <div class="quick-questions">
                    <button class="quick-btn" data-question="skills">Technical Skills</button>
                    <button class="quick-btn" data-question="experience">Work Experience</button>
                    <button class="quick-btn" data-question="education">Education (9.9 CGPA)</button>
                    <button class="quick-btn" data-question="projects">Key Projects</button>
                    <button class="quick-btn" data-question="achievements">Achievements</button>
                    <button class="quick-btn" data-question="strengths">Core Strengths</button>
                </div>
            </div>
        `;
        document.body.appendChild(chatWidget);
    }

    bindEvents() {
        document.getElementById('chatbot-toggle').addEventListener('click', () => this.toggleChat());
        document.getElementById('chatbot-close').addEventListener('click', () => this.toggleChat());
        document.getElementById('chatbot-expand').addEventListener('click', () => this.toggleExpand());
        document.getElementById('chatbot-send').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.handleQuickQuestion(question);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');
        
        if (this.isOpen) {
            container.style.display = 'flex';
            toggle.style.display = 'none';
        } else {
            container.style.display = 'none';
            toggle.style.display = 'flex';
            this.isExpanded = false;
            container.classList.remove('expanded');
        }
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        const container = document.getElementById('chatbot-container');
        const expandBtn = document.getElementById('chatbot-expand');
        
        if (this.isExpanded) {
            container.classList.add('expanded');
            expandBtn.innerHTML = '⛷';
            expandBtn.title = 'Collapse';
        } else {
            container.classList.remove('expanded');
            expandBtn.innerHTML = '⛶';
            expandBtn.title = 'Expand';
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }

    handleQuickQuestion(question) {
        this.addMessage(question.charAt(0).toUpperCase() + question.slice(1), 'user');
        setTimeout(() => {
            const response = this.generateResponse(question);
            this.addMessage(response, 'bot');
        }, 500);
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(message) {
        const msg = message.toLowerCase();
        
        // Fallback responses if data isn't loaded
        if (!this.chatData) {
            if (msg.includes('achievement') || msg.includes('award') || msg === 'achievements' || msg === 'awards') {
                return "🏆 REMARKABLE ACHIEVEMENTS: Priyanshu has accomplished exceptional milestones including maintaining 9.9/10 CGPA throughout B.Tech (top 1% of cohort), securing prestigious research internship at IIT Ropar with contributions to 2 research papers, active participation in 10+ hackathons with multiple wins, technical mentorship of 20+ junior students, research contributions in serverless computing with 25% performance improvements, university-level coding competition victories, and leadership roles in cybersecurity club and tech community.";
            }
            if (msg.includes('skill') || msg.includes('technology')) {
                return "💻 COMPREHENSIVE TECHNICAL EXPERTISE: Priyanshu possesses advanced skills in cloud computing (AWS: EC2, S3, Lambda, CloudFormation; Azure: VMs, Functions, Storage; GCP), cybersecurity (vulnerability assessment, penetration testing, SAST/DAST), full-stack development (Python, JavaScript ES6+, Java, C++), containerization (Docker, Kubernetes), infrastructure as code (Terraform, Ansible), DevOps (CI/CD pipelines, Jenkins, GitHub Actions), and serverless architectures with hands-on research experience.";
            }
            if (msg.includes('experience') || msg.includes('work') || msg.includes('intern')) {
                return "💼 DIVERSE PROFESSIONAL EXPERIENCE: Web Development Intern at Marquardt India (full-stack development, 40% performance improvement, 3 major feature deliveries), IT Intern at Seamedu (placement coordination for 200+ students, 35% efficiency increase, 60% manual work reduction), Cloud Research Intern at IIT Ropar (distributed computing research, XFBench framework development, 2 research paper contributions, 25% FaaS performance improvement). Currently pursuing B.Tech IT with 9.9/10 CGPA.";
            }
            if (msg.includes('education') || msg.includes('study') || msg.includes('university')) {
                return "🎓 OUTSTANDING ACADEMIC RECORD: B.Tech in Information Technology at Ajeenkya D Y Patil University, Pune with exceptional 9.9/10 CGPA. Specializing in Cloud Technology & Information Security with coursework in distributed systems, cloud architecture, cybersecurity, software engineering. Active in Cybersecurity Club, hackathons, tech fest leadership, and mentoring 20+ students. Previous education: 93.9% in 12th grade, 87.6% in 10th grade. Expected graduation: 2026.";
            }
            if (msg.includes('project')) {
                return "🚀 IMPACTFUL PROJECT PORTFOLIO: Secure Cloud Architecture (AWS, Terraform, Kubernetes - 30% cost reduction), XFBench Serverless Benchmarking Framework (Python, AWS Lambda - adopted by IIT Ropar research team), Modern Portfolio Website (Node.js, Express.js - advanced animations, cyberpunk theme), AI Recruitment Chatbot (JavaScript, natural language processing - streamlines recruiter screening). Each project demonstrates practical application of cutting-edge technologies.";
            }
            return "I can provide extremely detailed information about Priyanshu's technical skills, work experience, education (9.9 CGPA), projects, achievements, or career interests. What specific area would you like to explore in depth?";
        }

        if (msg.includes('achievement') || msg.includes('award') || msg.includes('accomplish') || msg === 'achievements' || msg === 'awards') {
            return this.chatData.responses.achievements;
        }
        if (msg.includes('skill') || msg.includes('technology') || msg.includes('programming') || msg.includes('technical')) {
            return this.chatData.responses.skills;
        }
        if (msg.includes('experience') || msg.includes('work') || msg.includes('intern') || msg.includes('job')) {
            return this.chatData.responses.experience;
        }
        if (msg.includes('education') || msg.includes('study') || msg.includes('university') || msg.includes('cgpa') || msg.includes('degree')) {
            return this.chatData.responses.education;
        }
        if (msg.includes('project') || msg.includes('build') || msg.includes('develop')) {
            return this.chatData.responses.projects;
        }
        if (msg.includes('strength') || msg.includes('strong') || msg.includes('good at')) {
            return this.chatData.responses.strengths;
        }
        if (msg.includes('interest') || msg.includes('passion') || msg.includes('like')) {
            return this.chatData.responses.interests;
        }
        if (msg.includes('contact') || msg.includes('reach') || msg.includes('hire') || msg.includes('recruit')) {
            return this.chatData.responses.contact;
        }
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greet')) {
            return this.chatData.responses.greeting[0];
        }
        
        return this.chatData.responses.default;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RecruitmentChatbot();
});