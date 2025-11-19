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
        try {
            const response = await fetch('/api/chatbot-data');
            this.chatData = await response.json();
        } catch (error) {
            console.error('Failed to load chatbot data:', error);
        }
    }

    createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.innerHTML = `
            <div id="chatbot-toggle" class="chatbot-toggle">
                <i class="fas fa-robot"></i>
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