---
description: How to deploy the portfolio to Vercel
---

1.  **Prepare the Project**:

    - Ensure `vercel.json` is present in the root directory.
    - Ensure `app.js` exports the Express app (`module.exports = app;`).
    - Ensure `package.json` has the correct dependencies.

2.  **Push to GitHub**:

    - Commit all changes: `git add . && git commit -m "Prepare for Vercel deployment"`
    - Push to GitHub: `git push origin main`

3.  **Deploy on Vercel**:

    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click "Add New..." -> "Project".
    - Import your GitHub repository.
    - **Framework Preset**: Select "Other" (or leave as default if it detects Node.js).
    - **Root Directory**: `./` (default).
    - **Build Command**: Leave empty (or `npm run build` if you want to check for errors, but we are using the dynamic app).
    - **Output Directory**: Leave empty (default).
    - **Install Command**: `npm install` (default).
    - **Environment Variables**: Add any variables from your `.env` file (e.g., `EMAIL_USER`, `EMAIL_PASS`, `RECIPIENT_EMAIL` if you use them server-side).
    - Click "Deploy".

4.  **Verify Deployment**:
    - Visit the provided URL.
    - Check if the site loads correctly.
    - Test the contact form (if applicable).
