# jussodev-portfolio

Personal portfolio for Justin Middler, an Indigenous Australian cyber security and software engineering practitioner with almost 15 years in and alongside the Australian Public Service, plus prior Microsoft Azure control-plane experience.

Static Next.js site styled as a declassified government dossier. Ships to GitHub Pages.

Live at [justin.middler.io](https://justin.middler.io/).

## Screenshot

![Portfolio homepage](docs/screenshots/portfolio-home.png)

<details>
<summary>View the dossier sections</summary>

| Subject profile | Mission record |
| --- | --- |
| ![Portfolio subject profile](docs/screenshots/subject.png) | ![Portfolio mission record](docs/screenshots/mission-record.png) |

| Notable impact | Field artifacts |
| --- | --- |
| ![Portfolio notable impact](docs/screenshots/notable-impact.png) | ![Portfolio field artifacts](docs/screenshots/field-artifacts.png) |

| Contact channels |
| --- |
| ![Portfolio contact channels](docs/screenshots/address-disposition.png) |

</details>

## Local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes ./out
```

## Deploy

Pushes to `main` build and publish to GitHub Pages via `.github/workflows/deploy.yml`. The site is built for the custom domain root, so Next.js assets resolve from `/_next/` instead of the old `/jussodev-portfolio/_next/` project-page path.

In the GitHub repo:

1. **Settings → Pages → Build and deployment → Source**: select **GitHub Actions**.
2. **Settings → Pages → Custom domain**: set `justin.middler.io`.
3. Push to `main`. The workflow does the rest.

## Stack

- Next.js 16 (App Router, `output: "export"`)
- React 19
- Tailwind v4 (tokens only; component styles hand-rolled in `globals.css`)
- TypeScript

## Design system

See `PRODUCT.md` and `DESIGN.md` at repo root.
