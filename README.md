# Krati — A Day Written in the Stars

A mobile-first, single-page birthday experience for October 18, built with plain HTML, CSS, and JavaScript.

## Features
- Animated starfield and atmospheric moon illustration
- Custom decorative constellation (clearly marked as artistic, not an official constellation)
- Enter a birth year to calculate an **approximate** Moon phase and illumination
- Birthday countdown to the next October 18
- Responsive design and reduced-motion support
- No build step, API key, or backend required

## Run locally
Open `index.html` in a browser.

## Deploy
This is a static site. Import the repository into Netlify or Vercel, or upload the project folder to Netlify Drop. No build command is needed; the publish directory is the repository root.

## Accuracy note
The lunar phase is estimated using a mean synodic month and a reference new-moon timestamp. It is not a precision ephemeris. The star pattern is original decorative artwork, not the real sky for a particular date. Exact historical positions of the Moon, planets, and constellations require a verified astronomical ephemeris and a precise time/location. The birth year is intentionally not assumed.
