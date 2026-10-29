# Muhammad Shahbaz — Portfolio

My personal portfolio site. React + Vite (plain JavaScript) and Tailwind CSS v4, with a light/dark theme and self-hosted fonts.

Live: https://muhammad-shahbaz.vercel.app

## Running it

```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the build locally
```

Copy `.env.Example` to `.env` before building locally. It holds the site URL, title and description.

## Project layout

```
src/
├── data/          all text, links and lists
├── components/
│   ├── ui/        small reusable pieces (Button, Section, Reveal, ...)
│   ├── sections/  one file per page section
│   └── layout/    Navbar and Footer
├── hooks/         scroll, theme, reveal and GitHub-stats hooks
└── styles/        index.css: theme colors and animations
```

To change words or links, edit `src/data/`. To change how things look, edit `src/styles/index.css` or the matching component.

## Files to add yourself

| File | Notes |
| --- | --- |
| `public/images/muhammad-shahbaz.webp` | portrait photo, 4:5 |
| `public/Muhammad-Shahbaz-CV.pdf` | CV for the download button |
| `public/og-image.png` | social preview image, 1200×630 |

The site URL also goes in `.env` (`VITE_SITE_URL`), `public/robots.txt` and `public/sitemap.xml`. The last two are static files and can't read env values.

A missing image shows a plain placeholder instead of breaking the page.

## Common edits

**Add a project.** Add an object to `src/data/projects.js`:

```js
{
  id: 'my-app',
  title: 'My App',
  summary: 'One sentence about what it does.',
  stack: ['React', 'Tailwind CSS'],
  image: '/projects/my-app.webp',
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/you/repo',
  featured: true,
},
```

Put the screenshot in `public/projects/`, then run `npm run optimize-images` to generate the smaller WebP sizes.

**Add a job.** Add an object to `experienceList` in `src/data/experience.js`. Stats live in `experienceStats` in the same file.

**Add a skill.** Add a line to `src/data/skills.js`.

**Add a nav or footer link.** Add an object to `src/data/navigation.js`. The `href` must match a section id.

**Add a section.** Copy an existing file in `src/components/sections/`, register it in `src/App.jsx`, and add its link in `src/data/navigation.js`.

**Change the accent color.** Edit these values in `src/styles/index.css`, once in `:root` and once in `.dark`:

```css
--accent: #b4491f;
--accent-soft: rgb(180 73 31 / 0.1);
--grad-1: #b4491f;
--grad-2: #c0562a;
```

Keep the accent readable against the page color (about 4.5:1 for text).

**Change the fonts.** Body text uses Plus Jakarta Sans and the name signature uses Great Vibes, both self-hosted through `@fontsource`. To swap one, install the new package, change the import in `src/main.jsx`, and update `--font-sans` or `--font-script` in `src/styles/index.css`.

**GitHub stats.** The About section pulls repo, star and follower counts from the public GitHub API using `githubUsername` in `src/data/profile.js`. Leave it empty to hide the card. The card also hides itself if the API is unreachable.

## Deploying

The site is a plain Vite build (`npm run build`, output in `dist/`), so any static host works.

- **Vercel:** import the repo and deploy. Vite is detected automatically. Add the three `VITE_` variables under Settings → Environment Variables.
- **Netlify:** connect the repo, or drag the `dist/` folder onto app.netlify.com/drop.
- **Cloudflare Pages:** connect the repo with build command `npm run build` and output directory `dist`.
- **GitHub Pages:** works, but the site lives under a sub-path, so set `base: '/<repo>/'` in `vite.config.js`.

After the first deploy, put the real URL in `.env`, `public/robots.txt` and `public/sitemap.xml`, then redeploy.

## Notes

- The theme choice is saved in `localStorage` and applied before the first paint by a small inline script in `index.html`, so there's no flash.
- Animations are CSS and small hooks, with no animation library. They switch off for visitors who prefer reduced motion.
- SEO: page title, description, canonical and Open Graph tags are set from the `.env` values. The site also has a sitemap, `robots.txt`, and Person structured data.