<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9a3c921e-8c1c-4816-8b99-0965a97ba8e1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to Netlify

This is a static site — no server or API keys required.

1. Push this folder to a GitHub repo (or drag-and-drop the `dist/` folder
   after building, for a manual deploy).
2. In Netlify: **New site from Git** → select the repo.
3. Build settings (also pre-set in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. No environment variables are needed.

After deploying, open the site, go to the footer's "Apps Script Guide"
link, and paste in your deployed Google Apps Script Web App URL so
Catalog/Contact form submissions save to your Google Sheet.
