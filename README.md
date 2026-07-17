# gururajseethur.in

<p>
<a href="https://gururajseethur.in"><img src="https://img.shields.io/badge/live-gururajseethur.in-0a7" alt="live" /></a>
<img src="https://img.shields.io/badge/stack-React%20%2B%20Vite-61dafb" alt="stack" />
<img src="https://img.shields.io/badge/host-Netlify-00C7B7" alt="host" />
<img src="https://img.shields.io/badge/DNS-Cloudflare-F38020" alt="dns" />
</p>

Source code for **[gururajseethur.in](https://gururajseethur.in)** - my personal portfolio.

Built with React + Vite, deployed on Netlify, fronted by Cloudflare DNS. The site covers what I am building (Cyber Range Labs, HEXAVAULT, local AI security tools), what I have shipped (CEH v12, BIA Master-Diploma in progress, TryHackMe rooms), and the filmmaking / marketing side of my work.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build       # outputs to dist/
npm run preview     # local preview of the production build
```

## Deploy

Pushes to `main` auto-deploy via Netlify. DNS is managed in Cloudflare; the apex `gururajseethur.in` and `www.gururajseethur.in` both resolve to the Netlify build.

---

For more context on what I work on, see my [GitHub profile](https://github.com/gururajseethur).
