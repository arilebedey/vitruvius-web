# Vitruvius Web

React + TypeScript web app for public Foxling pages hosted separately on Cloudflare Pages.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Production domain: `foxlingapp.com`

The app currently serves the privacy policy at `/privacy-policy`.

## Cloudflare Pages Setup

1. Push this directory as its own Git repository.
2. In Cloudflare, go to Workers & Pages.
3. Choose Create application > Pages > Connect to Git.
4. Select the repository for `vitruvius-web`.
5. Use these build settings:
   - Framework preset: `React` or `Vite`
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Save and deploy.
7. After the first deploy, open the Pages project and add the custom domain:
   - Domain: `foxlingapp.com`
8. Verify these URLs:
   - `https://foxlingapp.com/privacy-policy`
   - Refreshing directly on `/privacy-policy`

Cloudflare Pages deploys automatically on pushes to the production branch.
