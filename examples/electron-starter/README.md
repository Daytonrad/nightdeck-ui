# Electron starter

A minimal Electron app that shows real CPU and memory numbers in a nightdeck-ui panel.

```
npm install
npm start
```

- `main.js` opens the window and reads system numbers with Node's `os` module.
- `preload.js` passes them safely to the page (`contextIsolation` and `sandbox` are on).
- `renderer.js` builds the panel.
