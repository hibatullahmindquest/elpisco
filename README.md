# Elpis.Co

Static one-page website for Elpis.Co — Interior Design, Build &amp; Renovation.

## Structure

- `index.html` — the site (plain HTML/CSS, no build step)
- `assets/` — hero and project imagery

## Deploy on Vercel

This is a static site with no framework and no build step. In Vercel:

1. Import this repository as a new project.
2. Framework Preset: **Other**.
3. Leave Build Command and Output Directory empty (or set Output Directory to `.`).
4. Deploy.

## Local preview

```
python3 -m http.server 8000
```

Then open http://localhost:8000.
