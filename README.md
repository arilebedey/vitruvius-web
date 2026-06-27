# Vitruvius Web

React + TypeScript web app for public Foxling pages served at
`https://foxlingapp.com/` behind Traefik on the existing VPS.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Docker

```sh
docker build -t vitruvius-web .
docker run --rm -p 8080:80 vitruvius-web
```

The production image builds the Vite app and serves `dist` with nginx. nginx is
configured as an SPA server, so direct browser visits to `/privacy-policy` and
future React Router routes return `index.html`.

## Deployment

The GitHub Actions workflow builds and pushes
`ghcr.io/arilebedey/vitruvius_web`, then SSHes to the VPS and starts the `web`
service from `~/vitruvius_backend/compose.yml`.

Do not activate a GitHub Pages or Cloudflare Pages custom domain for this repo.
DNS should keep `A @ -> 157.245.13.93`.
