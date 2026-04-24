# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

No build step, no package manager. Open `index.html` directly in a browser, or serve it with any static file server:

```bash
# Python
python -m http.server 8080

# Node (if available)
npx serve .
```

There are no tests and no linter configured.

## Architecture

**Vetorium** is a single-page 3D Analytical Geometry learning platform written in plain HTML/CSS/JS (Brazilian Portuguese UI).

All six "pages" (home, calculator, visualizer, formulas, exercises, learn, about + module) live as sibling `<div id="page-*">` elements inside `index.html`. Navigation works by toggling the `.active` CSS class — only the active page is visible (`display:flex`). There is no router; `navigate(page, navEl)` in `js/navigation.js` handles all transitions.

### Script load order matters

Scripts are loaded at the bottom of `index.html` in this sequence:

| File | Responsibility |
|------|---------------|
| `js/viewer.js` | Three.js engine — defines `initViewer()`, `renderScene()`, global vars `calcVW`/`freeVW` |
| `js/calculator.js` | Math engine + calculator page UI; defines the `$` shorthand (`getElementById`) |
| `js/visualizer.js` | Free-mode visualizer page; defines `initFreeViewer()` |
| `js/navigation.js` | `navigate()` and `toggleSidebar()` |
| `js/learn-vetores.js` | Interactive vector learning module (14 sections, mini Three.js canvases) |
| `js/app.js` | DOMContentLoaded init and global keyboard shortcut (`/` focuses search) |

`viewer.js` uses `$` (defined in `calculator.js`) inside its functions, not at parse time, so the load order is safe — but it means `$` must not be removed from `calculator.js`.

### 3D coordinate convention

Three.js scene axes differ from the math notation used in the UI:

```
math  →  Three.js scene
  x   →  z (scene)
  y   →  x (scene)
  z   →  y (scene)
```

Helper functions `sv3(x,y,z)`, `sa3([x,y,z])`, `sp3([x,y,z])` in `viewer.js` perform this swap. All vector data flowing from `calculator.js` into `renderScene()` is in **math coordinates** and must go through these helpers.

### Calculator data flow

`computeResult(inp)` in `calculator.js` is the pure math core — it takes `{ax,ay,az,bx,by,bz,wx,wy,wz,op}` and returns `{mainLabel, mainVal, rows, steps, vectors}`. The `vectors` array is passed directly to `renderScene(calcVW, vectors)`. Adding a new operation means adding a branch in `computeResult` and optionally a new vector type handled in `renderScene`.

### CSS design tokens

All colours, spacing, and radii are defined as CSS custom properties on `:root` in `css/style.css`. The accent colour is `--accent: #7c6af7` (purple). Use these variables for any new UI elements — do not hardcode colours.
