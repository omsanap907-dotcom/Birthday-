# Happy Birthday, Krati! 🎂

A mobile-friendly birthday surprise with interactive celebrations **plus a separate playable monkey runner**. Built with plain HTML, CSS and JavaScript; no framework, backend, API key, or third-party runtime dependency is required.

## Pages

- `index.html` — original birthday page: celebration confetti, cake candle, interactive balloons, birthday wishes, gift reveal, balloon-popping mini-game and a link to Monkey Run.
- `monkey-game.html` — Birthday Monkey Run: collect bananas, jump over coconuts, protect three lives, pause/resume, replay and save the best score locally on that device.

## Run locally

Open `index.html` in a modern browser. Open `monkey-game.html` directly to play the runner. For automated checks, use Node.js 20 or newer:

```sh
npm test
```

The checks validate that both pages exist, links and important game controls are present, and inline JavaScript parses. They are smoke checks, not a substitute for testing touch input and gameplay in a real browser.

## Deploy

### GitHub Pages
The workflow in `.github/workflows/pages.yml` runs the smoke tests before publishing the repository. In **Settings → Pages**, choose **GitHub Actions** as the source. A push to `main` triggers deployment; the workflow can also be started manually.

### Netlify
The `netlify.toml` configuration publishes the repository root and runs `npm test` before deployment.

## Notes

- The game stores its high score in the browser's local storage; it is not shared between devices or browsers.
- Chime/animation behavior can vary by browser and device.
- The site uses system emoji for the game characters, so their appearance varies slightly by operating system.
- No analytics, tracking, payment, or user account features are included.
- Reduced-motion preferences are respected by the birthday page's CSS.
