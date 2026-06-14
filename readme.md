# Portfolio Website

Source for my personal portfolio: **[rohitkr7.github.io](https://rohitkr7.github.io)**

A single-page site built with plain HTML, CSS, and a small amount of vanilla
JavaScript — no frameworks or build step. Dark theme by default with a light
toggle (the choice is remembered in `localStorage`).

```
index.html          markup + content
assets/css/site.css styles (CSS variables drive theming)
assets/js/site.js    theme toggle, scroll reveal, nav state
images/              profile photo + favicon
```

To preview locally, open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server
```
