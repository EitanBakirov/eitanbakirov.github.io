# Eitan Bakirov's portfolio

Static HTML, CSS and JavaScript. No build or install step is required.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. Save a file and refresh the browser to see changes; no upload is needed. Stop the server with Ctrl+C. Serve over HTTP because the site uses JavaScript modules; opening index.html directly with file:// will not work reliably.

Fonts, logos, portrait and project screenshots are stored locally. The preview itself does not call external APIs. Following GitHub/LinkedIn links requires internet access.

## Editing

- `user-data/data.js`: biography, experience, skills, education and project content.
- `user-data/presentation.js`: employer logos, project categories and local image paths.
- `css/style.css`: layout, spacing, colors, responsive styles and dark theme.
- `index.js`: rendering, project filters, accessible project dialog and theme toggle.
- `assets/credits.html`: asset sources and licenses.

The redesign takes visual inspiration from Yuval Bakirov's portfolio while using its own layout and implementation. Publication is separate from local preview; push/merge to the GitHub Pages publishing branch only when ready.
