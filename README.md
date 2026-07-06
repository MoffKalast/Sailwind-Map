# Sailwind Web Map

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Originally by Sycosis and made with [ArcGIS](https://developers.arcgis.com/javascript/latest/), but it was eventually abandoned so I've forked it for further development. 

Feel free to submit any PRs if you want :)

See [Contributing.md](Contributing.md) for more info.

## Running Locally

Locally, the project is a static site with no build step, but it **must be served over HTTP**.
Opening `index.html` directly as a `file://` URL will silently fail to load island data because the browser blocks the `fetch()` calls used in `js/island_loader.js`.

You also need an internet connection while running it. ArcGIS, jQuery, and Google Fonts are loaded at runtime from their respective CDNs.

Serve the project from its root directory using whichever of these you have installed:

```bash
# Python 3 (no install needed)
python3 -m http.server 8000

# Node, static server
npx serve -l 8000

# Node, static server with auto-reload on file changes
npx live-server --port=8000
```

Then open <http://localhost:8000> in your browser.

---

### Tips & Notes

- Always serve from the repo root.
- The Island JSON and ArcGIS assets are cached aggressively. Hard-refresh after edits or use live-server.
- Failed island fetches and malformed island data currently only surface as `console.error` messages.