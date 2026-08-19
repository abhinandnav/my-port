# Abhinandna Vaidya — Interactive Portfolio

A responsive, dependency-free portfolio built around Abhinandna's illustrated creative workspace.

## Preview locally

The project is plain HTML, CSS and JavaScript. Open `index.html` directly, or serve the folder for the most consistent browser behaviour:

```bash
python3 -m http.server 4173 --directory abhinandna-portfolio
```

Then visit `http://localhost:4173`.

## Interactions

- **UI/UX paper:** choose FridgeMate or Gatha, then read the structured case study.
- **Black or pink pinboard poster:** open the five-work visual design carousel.
- **Pinned photographs:** open the photography browser at the selected image.
- **Framed portrait:** open the split profile and scrollable résumé.
- **Sleeping dog:** hover, focus or tap to wake the studio helper for a moment.
- **Ambient room:** illustrated leaves move gently in a reduced-motion-safe breeze.
- **Keyboard:** Tab reaches every hotspot; Escape closes a modal; arrow keys browse galleries.

Graphic work and photographs use a full-containment gallery stage: every item is fitted completely inside the available viewport without cropping, page scrolling or zoom controls.

## Project files

- `index.html` — structure and complete case-study content
- `styles.css` — responsive layout, visual system and motion
- `script.js` — dialogs, gallery state, swipe, keyboard and reading progress
- `assets/` — optimized artwork, photography, Gatha prototype scenes and résumé PDF

No build step or external package is required.
