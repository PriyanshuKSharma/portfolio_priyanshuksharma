class RecruitmentChatbot {
    constructor() {
        this.isOpen = false;
        this.isExpanded = false;
        this.lastIntent = null;
        this.lastEntity = null;
        this.typingNode = null;
        this.links = {
            portfolio: "https://priyanshuksharma.github.io/portfolio_priyanshuksharma/",
            github: "https://github.com/PriyanshuKSharma",
            linkedin: "https://www.linkedin.com/in/priyanshu-kumar-sharma-333800251/",
            email: "mailto:priyanshu17ks@gmail.com"
        };
        this.data = { projects: [], timeline: [], skills: [], awards: [] };
    }

    async init() {
        if (window.__portfolioChatbotInitialized) return;
        window.__portfolioChatbotInitialized = true;
        await this.loadData();
        this.createWidget();
        this.bindEvents();
        this.addBot(this.welcome());
        this.setQuick(this.defaultQuick());
    }

    async loadData() {
        const [projects, timeline, skills] = await Promise.all([
            this.fetchJson("/data/projects.json"),
            this.fetchJson("/data/timeline.json"),
            this.fetchJson("/data/skills.json")
        ]);
        this.data.projects = Array.isArray(projects) && projects.length ? projects : this.domProjects();
        this.data.timeline = Array.isArray(timeline) && timeline.length ? timeline : this.domTimeline();
        this.data.skills = Array.isArray(skills) && skills.length ? skills : this.domSkills();
        this.data.awards = Array.from(document.querySelectorAll("#awards .achievement-card h3")).map((n) => this.clean(n.textContent)).filter(Boolean);
    }

    async fetchJson(path) {
        try {
            const res = await fetch(path, { cache: "no-store" });
            return res.ok ? res.json() : null;
        } catch {
            return null;
        }
    }

    domProjects() {
        return Array.from(document.querySelectorAll("#projects .project-content")).map((n) => ({
            title: this.clean(n.querySelector("h3")?.textContent),
            description: this.clean(n.querySelector("p")?.textContent),
            tags: Array.from(n.querySelectorAll(".project-tags .tag")).map((t) => this.clean(t.textContent)),
            github: n.querySelector(".project-links a")?.getAttribute("href") || ""
        })).filter((p) => p.title);
    }

    domTimeline() {
        const rows = [];
        const push = (sel, type) => {
            document.querySelectorAll(sel).forEach((n) => {
                const title = this.clean(n.querySelector(".chronicle-role")?.textContent);
                if (!title) return;
                rows.push({
                    title,
                    organization: this.clean(n.querySelector(".chronicle-org")?.textContent),
                    period: this.clean(n.querySelector(".chronicle-period")?.textContent),
                    description: this.clean(n.querySelector(".chronicle-desc")?.textContent),
                    type
                });
            });
        };
        push(".chronicle-section--experience .chronicle-card--experience", "work");
        push(".chronicle-section--education .chronicle-card", "education");
        return rows;
    }

    domSkills() {
        return Array.from(document.querySelectorAll("#skills .chronicle-accordion-item")).map((n) => {
            const name = this.clean(n.querySelector(".chronicle-title-sm")?.textContent);
            const vals = Array.from(n.querySelectorAll(".skill-percentage")).map((v) => parseInt(this.clean(v.textContent), 10)).filter(Number.isFinite);
            const level = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
            return { name, level };
        }).filter((s) => s.name && s.level !== null);
    }

    createWidget() {
        if (document.querySelector(".chatbot-root")) return;
        // Remove any legacy floating toggle node from older builds.
        document.querySelectorAll("#chatbot-toggle").forEach((node) => node.remove());
        const root = document.createElement("div");
        root.className = "chatbot-root";
        root.innerHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-title-wrap">
                        <h4>Recruitment Assistant</h4>
                        <div class="chatbot-meta"><span class="chatbot-status">online</span><span id="chatbot-context" class="chatbot-context">context: general</span></div>
                    </div>
                    <div class="chatbot-controls"><button id="chatbot-expand" title="Expand/Collapse" aria-label="Expand chat"><i class="fa-solid fa-expand"></i></button><button id="chatbot-close" title="Close" aria-label="Close chat"><i class="fa-solid fa-xmark"></i></button></div>
                </div>
                <div class="chatbot-messages" id="chatbot-messages"></div>
                <div class="quick-questions" id="chatbot-quick-actions"></div>
                <div class="chatbot-input"><input type="text" id="chatbot-input" placeholder="Ask about skills, projects, experience, contact..."><button id="chatbot-send" aria-label="Send message"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg></button></div>
            </div>`;
        document.body.appendChild(root);
    }

    bindEvents() {
        const input = () => document.getElementById("chatbot-input");
        const dockTrigger = document.getElementById("chatbot-dock-trigger");
        if (dockTrigger) {
            dockTrigger.addEventListener("click", () => this.toggle());
        }
        document.getElementById("chatbot-close").addEventListener("click", () => this.toggle(false));
        document.getElementById("chatbot-expand").addEventListener("click", () => this.expand());
        document.getElementById("chatbot-send").addEventListener("click", () => this.send());
        input().addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); this.send(); } });
        document.getElementById("chatbot-quick-actions").addEventListener("click", (e) => {
            const btn = e.target.closest("button[data-query]");
            if (btn) this.send(btn.dataset.query || "");
        });
        document.getElementById("chatbot-messages").addEventListener("click", (e) => {
            const btn = e.target.closest("button[data-query]");
            if (btn) this.send(btn.dataset.query || "");
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen) this.toggle(false);
            if (e.key === "/" && this.isOpen && document.activeElement !== input()) { e.preventDefault(); input().focus(); }
        });
    }

    toggle(force) {
        this.isOpen = typeof force === "boolean" ? force : !this.isOpen;
        const c = document.getElementById("chatbot-container");
        const dockTrigger = document.getElementById("chatbot-dock-trigger");
        c.style.display = this.isOpen ? "flex" : "none";
        if (dockTrigger) {
            dockTrigger.classList.toggle("active", this.isOpen);
        }
        if (this.isOpen) document.getElementById("chatbot-input").focus();
        if (!this.isOpen) { c.classList.remove("expanded"); this.isExpanded = false; }
    }

    expand() {
        this.isExpanded = !this.isExpanded;
        const c = document.getElementById("chatbot-container");
        c.classList.toggle("expanded", this.isExpanded);
        document.getElementById("chatbot-expand").innerHTML = this.isExpanded
            ? '<i class="fa-solid fa-compress"></i>'
            : '<i class="fa-solid fa-expand"></i>';
    }

    async send(override = "") {
        const input = document.getElementById("chatbot-input");
        const msg = (override || input.value).trim();
        if (!msg) return;
        this.addUser(msg);
        input.value = "";
        this.typing(true);
        await this.sleep(Math.min(850, Math.max(260, 220 + msg.length * 8)));
        const res = this.respond(msg.toLowerCase());
        this.typing(false);
        this.addBot(res);
        this.setQuick(res.actions?.length ? res.actions : this.defaultQuick());
        this.lastIntent = res.intent || this.lastIntent;
        this.lastEntity = res.entity || this.lastEntity;
        document.getElementById("chatbot-context").textContent = `context: ${res.intent || "general"}`;
    }

    respond(msg) {
        const cmd = this.command(msg);
        if (cmd) return this.commandResponse(cmd);
        const intent = this.intent(msg);
        if (intent === "summary") return this.summary();
        if (intent === "skills") return this.skills(msg);
        if (intent === "experience") return this.experience();
        if (intent === "education") return this.education();
        if (intent === "projects") return this.projects(msg);
        if (intent === "achievements") return this.achievements();
        if (intent === "contact") return this.contact();
        if (intent === "greeting") return this.greeting();
        if (intent === "help") return this.help();
        return this.fallback();
    }

    intent(msg) {
        if (/(more|details|elaborate|continue)/.test(msg) && this.lastIntent) return this.lastIntent;
        const map = {
            greeting: ["hello", "hi", "hey"],
            summary: ["about", "who is", "profile", "summary"],
            skills: ["skill", "tech", "stack", "tool", "framework"],
            experience: ["experience", "intern", "work", "role", "job"],
            education: ["education", "cgpa", "college", "university", "degree"],
            projects: ["project", "built", "deploy", "portfolio"],
            achievements: ["achievement", "award", "certification", "hackathon"],
            contact: ["contact", "hire", "reach", "linkedin", "github", "email"],
            help: ["help", "commands", "options"]
        };
        let best = "unknown";
        let score = 0;
        Object.entries(map).forEach(([k, words]) => {
            const s = words.reduce((n, w) => n + (msg.includes(w) ? 1 : 0), 0);
            if (s > score) { score = s; best = k; }
        });
        if (!score && this.findProject(msg)) return "projects";
        return best;
    }

    command(msg) {
        const nav = [
            ["go to skills", "#skills", "Skills"], ["go to experience", "#experience", "Experience"], ["go to education", "#education", "Education"],
            ["go to projects", "#projects", "Projects"], ["go to contact", "#contact", "Contact"], ["go to achievements", "#awards", "Achievements"]
        ];
        const link = [["open github", "GitHub", this.links.github], ["open linkedin", "LinkedIn", this.links.linkedin], ["open portfolio", "Portfolio", this.links.portfolio], ["open email", "Email", this.links.email]];
        const n = nav.find((x) => msg.includes(x[0]) || msg.includes(`${x[2].toLowerCase()} section`));
        if (n) return { type: "nav", target: n[1], label: n[2] };
        const l = link.find((x) => msg.includes(x[0]) || msg.includes(x[1].toLowerCase()));
        if (l) return { type: "link", label: l[1], url: l[2] };
        return null;
    }

    commandResponse(cmd) {
        if (cmd.type === "nav") {
            document.querySelector(cmd.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
            return { intent: "navigate", title: "Navigation", text: `Moved to ${cmd.label}.`, actions: this.defaultQuick() };
        }
        return { intent: "contact", title: `${cmd.label} Link`, text: `Direct link for ${cmd.label}.`, links: [{ label: `Open ${cmd.label}`, url: cmd.url }], actions: this.defaultQuick() };
    }

    greeting() { return { intent: "greeting", title: "Hello", text: "Ask recruiter-focused questions about skills, experience, projects, education, or contact.", actions: this.defaultQuick() }; }
    welcome() { return { intent: "welcome", title: "Recruiter Assistant", text: "Data-aware assistant is ready. Try commands like \"show top projects\" or \"go to contact section\".", actions: this.defaultQuick() }; }
    help() { return { intent: "help", title: "Help", bullets: ["show top projects", "latest internship details", "go to skills section"], actions: this.defaultQuick() }; }
    summary() {
        const exp = this.data.timeline.filter((t) => t.type === "work").length;
        const top = this.data.skills.slice().sort((a, b) => (b.level || 0) - (a.level || 0))[0];
        return { intent: "summary", title: "Profile Snapshot", text: "B.Tech IT candidate focused on cloud, security, and production engineering.", bullets: [`Projects: ${this.data.projects.length}`, `Experience entries: ${exp}`, top ? `Top skill: ${top.name} (${top.level}%)` : "Top skill: Cloud stack"], actions: this.defaultQuick() };
    }
    skills(msg) {
        const m = this.data.skills.find((s) => this.clean(s.name).toLowerCase().split(/[\s/&(),]+/).some((t) => t.length > 3 && msg.includes(t)));
        if (m) return { intent: "skills", entity: m.name, title: "Skill Deep Dive", text: `${m.name} is a strong area.`, bullets: [`Estimated proficiency: ${m.level}%`, "Applied in internships and project delivery."], actions: [{ label: "Related Projects", query: `projects using ${m.name}` }, { label: "Experience Mapping", query: "map skills to experience" }] };
        const top = this.data.skills.slice().sort((a, b) => (b.level || 0) - (a.level || 0)).slice(0, 5).map((s) => `${s.name} (${s.level}%)`);
        return { intent: "skills", title: "Technical Skills", text: "Core strengths across cloud, security, and delivery.", bullets: top, actions: [{ label: "Go to Skills Section", query: "go to skills section" }, { label: "Top Projects", query: "show top projects" }] };
    }
    experience() {
        const exp = this.data.timeline.filter((t) => t.type === "work");
        const latest = exp[0];
        const bullets = exp.slice(0, 3).map((x) => `${x.title} @ ${x.organization} (${x.period})`);
        return { intent: "experience", entity: latest?.title, title: "Experience Runbook", text: latest ? `Latest role: ${latest.title}.` : "Experience data unavailable.", bullets, actions: [{ label: "Go to Experience Section", query: "go to experience section" }, { label: "Education Summary", query: "education summary" }] };
    }
    education() {
        const edu = this.data.timeline.filter((t) => t.type === "education").map((x) => `${x.title} - ${x.organization} (${x.period})`);
        return { intent: "education", title: "Education Kernel", text: "Strong academic track with high consistency.", bullets: edu, actions: [{ label: "Go to Education Section", query: "go to education section" }, { label: "Latest Internship", query: "latest internship" }] };
    }
    projects(msg) {
        const p = this.findProject(msg);
        if (p) return { intent: "projects", entity: p.title, title: p.title, text: this.cut(this.clean(p.description), 220), bullets: [`Tech: ${(p.tags || []).slice(0, 6).join(", ")}`], links: p.github ? [{ label: "Open GitHub Repository", url: p.github }] : [], actions: [{ label: "More Projects", query: "show top projects" }, { label: "Go to Projects Section", query: "go to projects section" }] };
        const bullets = this.data.projects.slice(0, 4).map((x) => `${x.title} (${(x.tags || []).slice(0, 3).join(", ")})`);
        return { intent: "projects", title: "Project Portfolio", text: "Key projects aligned with cloud and security roles.", bullets, actions: [{ label: "Cloud Project", query: "multi cloud project" }, { label: "Quantum Project", query: "quantum cloud integration" }] };
    }
    achievements() {
        const hack = document.querySelectorAll("#hackathons .achievement-card").length;
        const cert = document.querySelectorAll("#certifications .achievement-card").length;
        const bullets = [];
        if (this.data.awards.length) bullets.push(`Awards: ${this.data.awards.slice(0, 3).join(" | ")}`);
        if (hack) bullets.push(`Hackathons listed: ${hack}`);
        if (cert) bullets.push(`Certifications listed: ${cert}`);
        return { intent: "achievements", title: "Achievements Snapshot", text: "Academic and technical milestones are tracked across sections.", bullets: bullets.length ? bullets : ["Milestones available in awards section."], actions: [{ label: "Go to Achievements Section", query: "go to achievements section" }, { label: "Contact", query: "how to contact priyanshu" }] };
    }
    contact() {
        return { intent: "contact", title: "Contact and Hiring", text: "Direct channels for recruiter outreach:", links: [{ label: "Email", url: this.links.email }, { label: "LinkedIn", url: this.links.linkedin }, { label: "GitHub", url: this.links.github }, { label: "Portfolio", url: this.links.portfolio }], actions: [{ label: "Go to Contact Section", query: "go to contact section" }, { label: "Profile Summary", query: "profile summary" }] };
    }
    fallback() { return { intent: "help", title: "Clarify Request", text: "I could not map that query confidently.", actions: this.defaultQuick() }; }

    findProject(msg) {
        return this.data.projects.find((p) => {
            const t = this.clean(p.title).toLowerCase();
            const tags = (p.tags || []).join(" ").toLowerCase();
            return t.includes(msg) || msg.includes(t) || t.split(/\s+/).some((k) => k.length > 3 && msg.includes(k)) || tags.split(/\s+/).some((k) => k.length > 3 && msg.includes(k));
        });
    }

    addBot(res) {
        const box = document.createElement("div");
        box.className = "bot-message";
        const title = document.createElement("div");
        title.className = "bot-title";
        title.textContent = res.title || "Assistant";
        box.appendChild(title);
        if (res.text) { const p = document.createElement("p"); p.className = "bot-text"; p.textContent = res.text; box.appendChild(p); }
        if (res.bullets?.length) { const ul = document.createElement("ul"); ul.className = "bot-list"; res.bullets.forEach((b) => { const li = document.createElement("li"); li.textContent = b; ul.appendChild(li); }); box.appendChild(ul); }
        if (res.links?.length) { const row = document.createElement("div"); row.className = "bot-links"; res.links.forEach((l) => { const a = document.createElement("a"); a.className = "bot-link"; a.href = l.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = l.label; row.appendChild(a); }); box.appendChild(row); }
        if (res.actions?.length) { const row = document.createElement("div"); row.className = "bot-actions"; res.actions.slice(0, 4).forEach((a) => { const b = document.createElement("button"); b.className = "bot-action-btn"; b.dataset.query = a.query; b.textContent = a.label; row.appendChild(b); }); box.appendChild(row); }
        document.getElementById("chatbot-messages").appendChild(box);
        this.scroll();
    }

    addUser(msg) {
        const n = document.createElement("div");
        n.className = "user-message";
        n.textContent = msg;
        document.getElementById("chatbot-messages").appendChild(n);
        this.scroll();
    }

    setQuick(items) {
        const wrap = document.getElementById("chatbot-quick-actions");
        wrap.innerHTML = "";
        items.slice(0, 6).forEach((q) => {
            const b = document.createElement("button");
            b.className = "quick-btn";
            b.dataset.query = q.query;
            b.textContent = q.label;
            wrap.appendChild(b);
        });
    }

    defaultQuick() {
        return [
            { label: "Skills Overview", query: "show technical skills" },
            { label: "Latest Experience", query: "latest internship" },
            { label: "Top Projects", query: "show top projects" },
            { label: "Education Summary", query: "education summary" },
            { label: "Contact", query: "how to contact priyanshu" }
        ];
    }

    typing(show) {
        const root = document.getElementById("chatbot-messages");
        if (show) {
            if (this.typingNode) return;
            const t = document.createElement("div");
            t.className = "bot-message typing-message";
            t.innerHTML = `<div class="bot-title">Assistant</div><div class="typing-dots"><span></span><span></span><span></span></div>`;
            root.appendChild(t);
            this.typingNode = t;
            this.scroll();
        } else if (this.typingNode) {
            this.typingNode.remove();
            this.typingNode = null;
        }
    }

    scroll() {
        const root = document.getElementById("chatbot-messages");
        root.scrollTop = root.scrollHeight;
    }

    clean(v) { return String(v || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
    cut(v, n) { return !v || v.length <= n ? v : `${v.slice(0, n - 3)}...`; }
    sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
}

document.addEventListener("DOMContentLoaded", () => {
    const bot = new RecruitmentChatbot();
    bot.init();
});
