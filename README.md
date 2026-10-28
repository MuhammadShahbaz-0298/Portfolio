# Muhammad Shahbaz — Portfolio

A fast, one-page personal portfolio built with **React + Vite (plain JavaScript)** and **Tailwind CSS v4**.
Light/dark mode, self-hosted fonts, SEO-ready, and deliberately simple code you can copy-paste and extend.

## Commands

```bash
npm install      # install dependencies (first time)
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## How the code is organized

```
src/
├── data/                  ← ALL text, links and lists live here (one source of truth)
│   ├── profile.js         name, role, email, links, githubUsername, hero text, photo
│   ├── projects.js        project cards
│   ├── experience.js      jobs + stats
│   ├── skills.js          skill badges
│   ├── navigation.js      navbar + footer links
│   └── site.js            reads the site URL/title/description from .env
├── components/
│   ├── ui/                reusable building blocks (Container, Section, Button, Card, ScrollProgress, BackToTop, GitHubStats...)
│   ├── sections/          one file per page section (Hero, About, Projects...)
│   └── layout/            Navbar + Footer
├── hooks/                 useTheme, useReveal, usePageMetadata, useScrollProgress, useActiveSection, useScrolledPast, useCountUp, useGitHubStats
└── styles/index.css       ALL theme colors (CSS variables) + animations
```

**Rule of thumb:** if you want to change *words or links*, edit `src/data/`. If you want to change *looks*, edit a `ui/` component or `src/styles/index.css`.

---

## Replace these placeholders first

| What | Where to put it |
|---|---|
| Your photo (4:5 portrait, WebP) | `public/images/muhammad-shahbaz.webp` |
| Your CV | `public/Muhammad-Shahbaz-CV.pdf` |
| Social preview image (1200x630) | `public/og-image.png` |
| Real site URL | `.env` (`VITE_SITE_URL`) **and** `public/robots.txt` + `public/sitemap.xml` |

The project screenshots in `public/projects/` are **real captures** of the live apps
(Campus Coin and School Portal from their live URLs, BookStore from its GitHub repo).
To swap in better ones, drop a new image in `public/projects/` and update its `image`
path in `src/data/projects.js`.

Nothing breaks while a file is missing — the site shows a neutral placeholder instead.

---

## Recipes (copy-paste)

### Add a project

1. Copy one object in `src/data/projects.js` and edit it:

```js
{
  id: 'my-new-app',                       // must be unique
  title: 'My New App',
  summary: 'One sentence about what it does.',
  stack: ['React', 'Tailwind CSS'],
  image: '/projects/my-new-app.svg',      // screenshot in public/projects/ (or null)
  liveUrl: 'https://myapp.com',           // or null
  githubUrl: 'https://github.com/you/repo',
  featured: true,                         // true = big card with screenshot
},
```

2. Drop the screenshot into `public/projects/`. That's it — the Work section renders it automatically.

### Add a job

Copy one object in `experienceList` in `src/data/experience.js`:

```js
{
  id: 'my-company',
  role: 'Frontend Developer',
  company: 'Company Name',
  location: 'Karachi',
  period: 'Jan 2027 – Present',
  highlights: ['One result-style sentence.'],
},
```

### Change a stat

Edit one object in `experienceStats` in `src/data/experience.js`:

```js
{ id: 'screens', value: '15+', label: 'Screens shipped' },
```

### Add a skill

Copy one line in `src/data/skills.js`:

```js
{ id: 'nextjs', name: 'Next.js' },
```

### Add a navbar / footer link

Copy one object in `src/data/navigation.js` (the `href` must match a section id):

```js
{ id: 'blog', label: 'Blog', href: '#blog' },
```

### Add a new section

1. Copy an existing file in `src/components/sections/` (e.g. `Skills.jsx`) and rename it.
2. Register it in `src/App.jsx`:

```jsx
import Blog from './components/sections/Blog';
// then inside <main>:
<Blog />
```

3. Add its link in `src/data/navigation.js` with the matching `id`.

Sections are built only from `ui/` components (Section, SectionHeading, Card, Button, Badge, Reveal...), so every new section automatically matches the site's look.

### Change the accent color

Everything uses one accent color. Open `src/styles/index.css` and change **two** lines:

```css
:root { --accent: #4f46e5; }   /* light mode */
.dark { --accent: #818cf8; }   /* dark mode */
```

Keep enough contrast against the background (WCAG AA needs ~4.5:1 for text).

### Change the photo

Put your 4:5 portrait at `public/images/muhammad-shahbaz.webp`. Different file or path?
Edit one line in `src/data/profile.js`:

```js
photo: '/images/muhammad-shahbaz.webp',
```

### Change the site URL, title or description

The three settings live in `.env.Example`. For local builds, copy it to `.env`
(`copy .env.Example .env`). When deploying, add the same three `VITE_...`
variables in your host's dashboard instead (Vercel: **Settings → Environment
Variables**):

```
VITE_SITE_URL=https://your-domain.com
VITE_SITE_TITLE=Muhammad Shahbaz | React and React Native Developer in Karachi
VITE_SITE_DESCRIPTION=Frontend developer in Karachi building fast, clean React and React Native apps. Open to freelance projects and full-time roles.
```

2. Update the URL inside `public/robots.txt` and `public/sitemap.xml` (static files cannot read env values).

`index.html` picks the values up automatically via `%VITE_...%` placeholders — never edit the tags in `index.html` by hand.

### Replace a project screenshot

1. Drop the new screenshot (any size) into `public/projects/`.
2. Run `npm run optimize-images` — it resizes every screenshot to exactly
   what the page displays and saves it as WebP (much smaller than JPG at the
   same quality). Bigger files than the screen shows only slow the site down.
3. Point `image:` in `src/data/projects.js` at the file it produced (`.webp`).

### Change the font

The site self-hosts two fonts via `@fontsource` (no external requests):

- **Plus Jakarta Sans Variable** — all body/UI text (`--font-sans`). One
  variable file covers every weight, which keeps the page fast.
- **Great Vibes** — the handwritten signature for the name (`--font-script`,
  rendered by `src/components/ui/ScriptName.jsx` in the navbar, hero and footer)

To use another body font (e.g. Inter):

```bash
npm install @fontsource/inter
```

Then swap the imports in `src/main.jsx` and the `--font-sans` value in `src/styles/index.css`.

### Change how the name is signed

Edit `src/components/ui/ScriptName.jsx` — it reads the name from
`src/data/profile.js` and only holds the script style and sizes
(`xs` copyright, `sm` navbar/footer, `lg` hero).

### Add an icon

Open `src/components/ui/Icon.jsx`, copy one entry in `iconPaths` and use it by name:

```jsx
<Icon name="twitter" className="size-5" />
```

### Deploy (free)

All three are free for a personal site and need no config — the project is a plain Vite build (`npm run build` → `dist/`).

**Vercel (recommended — best defaults, auto-HTTPS, instant rollbacks):**

1. Push the project to GitHub.
2. On [vercel.com](https://vercel.com) click **Add New → Project** and import the repo.
3. Vercel detects Vite automatically (build command `npm run build`, output `dist`). Click **Deploy**.
4. Every push to `main` redeploys automatically.

**Netlify (easiest — no Git needed, drag & drop):**

1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the whole `dist/` folder onto the page.
3. You get a live URL instantly. (Later: connect the GitHub repo for auto-deploys.)

**Cloudflare Pages (fastest global CDN, also free):**

1. Push to GitHub, then on [pages.cloudflare.com](https://pages.cloudflare.com) create a project → **Connect to Git**.
2. Build command `npm run build`, output directory `dist`, deploy.

**GitHub Pages (free but static-only, needs a tiny tweak):**

1. `npm install --save-dev gh-pages`, add `"predeploy": "npm run build"` and `"deploy": "gh-pages -d dist"` to `package.json`.
2. Run `npm run deploy` — your site appears at `https://<username>.github.io/<repo>/`.
3. Because it lives under a sub-path, set `base: '/<repo>/'` in `vite.config.js`.

After the first deploy on any host, put the real URL in `.env` (`VITE_SITE_URL`), `public/robots.txt` and `public/sitemap.xml`, then redeploy.

### Change the favicon

The favicon is the logo artwork: `public/favicon.png` (180×180 — art on a
**white circle** with transparent corners, so it looks round in the browser
tab and still reads on light *and* dark tab strips). iOS home-screen icons
use `public/apple-touch-icon.png` (square version, because iOS fills
transparent pixels with black). To swap it:

1. Drop your new image into `public/` (e.g. `favicon.png`).
2. Point the `<link rel="icon">` tag in `index.html` at it (and
   `<link rel="apple-touch-icon">` at a square copy of the same art).
3. For a round look: fill a white circle, center the art inside it, and
   leave the corners transparent — browsers render the PNG as-is.

---

## Good to know

- **Performance (mobile Lighthouse ~87, was ~85):** one variable font file instead of five weight files, the hero image preloaded (it only exists after React renders), below-the-fold sections lazy-loaded in `App.jsx` (`React.lazy` — smaller first paint), WebP images sized to their display via `npm run optimize-images`, and an early connection to the GitHub API. The two remaining Lighthouse flags are React's own internals and an image advisory — nothing actionable left.

- **Power features:** gradient reading-progress bar at the top (`ScrollProgress`), scroll-spy nav that highlights the section you're reading (`useActiveSection` in `Navbar`), a back-to-top button (`BackToTop`), one-click copy-email with "Copied!" feedback (`Contact`), and **live GitHub stats** in About — real repos/stars/followers from the free GitHub API, driven by `githubUsername` in `src/data/profile.js`. Set `githubUsername: ''` to hide that card; it also hides itself automatically if the API is unreachable (no made-up numbers, ever).
- **Animations (no libraries, all CSS/JS):** every card grid is equal-height (cards stretch to the row and buttons share a baseline). `<Reveal variant="left|right|scale|blur">` picks how a block enters on scroll, with `delay` for staggering; stats count up to their real value (`useCountUp`); the hero headline shimmers (`gradient-pan`), the avatar floats (`float-soft`), buttons press (`active:scale-95`), skill chips pop on hover. Everything is disabled for `prefers-reduced-motion`.
- **Theme:** the light/dark choice is stored in `localStorage` (`theme`) and applied before first paint by a tiny inline script in `index.html`, so there is no flash.
- **Motion:** only hover transitions and a gentle fade-in on scroll (`Reveal`). Everything is disabled when the visitor prefers reduced motion.
- **SEO:** title/description/canonical/Open Graph/Twitter tags, the logo-art favicon (`public/favicon.png`), `robots.txt`, `sitemap.xml`, JSON-LD Person schema, and readable HTML fallback text for crawlers and no-JS visitors.
- **Accessibility:** one `h1`, semantic landmarks, labelled icon buttons, keyboard focus rings, AA contrast in both themes.
