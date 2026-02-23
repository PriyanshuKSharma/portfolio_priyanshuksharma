# Priyanshu Kumar Sharma | Cloud, Security, DevOps Portfolio

<div align="center">
  <p>High-signal, data-driven portfolio built with Express and EJS. Designed for motion, clarity, and fast updates.</p>
  <p>
    <a href="https://priyanshuksharma.github.io/portfolio_priyanshuksharma/">Live Demo</a> |
    <a href="#quick-start">Quick Start</a> |
    <a href="#customization">Customization</a> |
    <a href="#deployment">Deployment</a>
  </p>
  <p>
    <img src="https://cdn.simpleicons.org/amazonaws/FF9900" height="36" alt="AWS" />
    <img src="https://cdn.simpleicons.org/microsoftazure/0078D4" height="36" alt="Microsoft Azure" />
    <img src="https://cdn.simpleicons.org/googlecloud/4285F4" height="36" alt="Google Cloud" />
    <img src="https://cdn.simpleicons.org/docker/2496ED" height="36" alt="Docker" />
    <img src="https://cdn.simpleicons.org/terraform/7B42BC" height="36" alt="Terraform" />
    <img src="https://cdn.simpleicons.org/vercel/000000" height="36" alt="Vercel" />
    <img src="https://cdn.simpleicons.org/github/181717" height="36" alt="GitHub" />
    <img src="https://cdn.simpleicons.org/nodedotjs/339933" height="36" alt="Node.js" />
    <img src="https://cdn.simpleicons.org/express/000000" height="36" alt="Express" />
    <img src="https://cdn.simpleicons.org/ejs/B4CA65" height="36" alt="EJS" />
    <img src="https://cdn.simpleicons.org/javascript/F7DF1E" height="36" alt="JavaScript" />
    <img src="https://cdn.simpleicons.org/html5/E34F26" height="36" alt="HTML5" />
    <img src="https://cdn.simpleicons.org/css3/1572B6" height="36" alt="CSS3" />
  </p>
</div>

---

## Table of Contents
1. [At a Glance](#at-a-glance)
1. [What Makes It Different](#what-makes-it-different)
1. [Feature Highlights](#feature-highlights)
1. [Information Architecture](#information-architecture)
1. [Data Model](#data-model)
1. [Architecture](#architecture)
1. [Project Structure](#project-structure)
1. [Tech Stack](#tech-stack)
1. [Quick Start](#quick-start)
1. [Customization](#customization)
1. [Deployment](#deployment)
1. [Scripts](#scripts)
1. [Contributing](#contributing)
1. [License](#license)
1. [Author](#author)

## At a Glance
| Focus | Built With | Update Flow |
| --- | --- | --- |
| Cloud, Security, DevOps portfolio | Express, EJS, GSAP, ScrollReveal | Edit JSON -> refresh -> done |

## What Makes It Different
- Data-first content: update JSON and the site updates automatically.
- Command palette navigation for instant section jumps and project search.
- Motion-focused UI with particles, 3D hovers, and scroll reveals.

## Feature Highlights
- Neon glassmorphism theme with gradient lighting.
- Responsive layout with mobile navigation and touch-friendly interactions.
- SEO-ready metadata and clean semantic structure.
- Modular EJS partials for rapid iteration.
- Contact form wiring ready for email delivery.

## Information Architecture
- Hero with dynamic tagline.
- About.
- Timeline for experience and education.
- Skills and achievements.
- Projects and case studies.
- Contact and command palette.

## Data Model
Content is sourced from `data/*.json` and rendered through EJS partials.

Project card schema:
```json
{
  "title": "Project Name",
  "description": "Short description of the project.",
  "image": "/images/project.png",
  "tags": ["Tech 1", "Tech 2"],
  "github": "https://github.com/your/repo",
  "demo": "https://your-demo-link"
}
```

## Architecture
```text
Request -> Express routes -> EJS templates -> HTML/CSS/JS -> Browser
                         ^
                         |
                   data/*.json
```

## Project Structure
```text
portfolio/
├─ data/
│  ├─ projects.json
│  ├─ skills.json
│  └─ timeline.json
├─ public/
│  ├─ css/
│  ├─ js/
│  ├─ images/
│  └─ resume/
├─ routes/
│  └─ main.js
├─ views/
│  ├─ partials/
│  │  └─ command-palette.ejs
│  ├─ index.ejs
│  └─ layout.ejs
├─ app.js
├─ build.js
└─ package.json
```

## Tech Stack
| Layer | Tech |
| --- | --- |
| Backend | Node.js, Express |
| Templating | EJS, express-ejs-layouts |
| Motion | GSAP, ScrollReveal |
| UI | HTML5, CSS3, JavaScript |
| Email | Nodemailer |

## Quick Start
Prerequisites:
- Node.js v14+
- npm

1. `git clone https://github.com/PriyanshuKSharma/portfolio.git`
2. `cd portfolio`
3. `npm install`
4. `npm start`
5. Open `http://localhost:3000`

## Customization
- `views/index.ejs` for page composition and ordering.
- `views/partials/*` for individual sections and reusable blocks.
- `data/projects.json` to add or update project cards.
- `data/skills.json` to edit skill categories and levels.
- `data/timeline.json` for experience and education entries.
- `public/images/` for project and profile images.
- `public/resume/` for resume files.
- `EMAILJS_SETUP.md` for contact email setup details.

## Deployment
### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
1. Connect the GitHub repository.
2. Set build command to `npm run build`.
3. Set publish directory to `public`.

### Heroku
```bash
heroku login
heroku create your-portfolio-name
git push heroku main
```

## Scripts
- `npm start` runs the server.
- `npm run build` runs the build script.

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## License
MIT License. See `LICENSE`.

## Author
Priyanshu Kumar Sharma
- Portfolio: https://priyanshuksharma.github.io/portfolio_priyanshuksharma/
- LinkedIn: https://www.linkedin.com/in/priyanshu-kumar-sharma-333800251/
- GitHub: https://github.com/PriyanshuKSharma
- DockerHub: https://hub.docker.com/u/priyanshuksharma
