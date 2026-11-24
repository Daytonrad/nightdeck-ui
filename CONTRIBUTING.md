# Contributing to nightdeck-ui

Thanks for helping! Small fixes, new item types, docs and examples are all welcome.

## Getting started

```
git clone https://github.com/mvhmuod/nightdeck-ui.git
cd nightdeck-ui
npm install
npm test
```

- The library lives in `src/core.js` and `src/nightdeck.css`.
- `npm run build` writes the ready-to-use files to `dist/` (and a copy for the demo site to `docs/lib/`).
- `npm test` builds and runs the tests in `test/`.
- Open `examples/basic.html` or `docs/index.html` in a browser to see your change.

## Guidelines

- **No runtime dependencies.** The library must stay plain JavaScript and CSS.
- **Keep it themeable.** New colours, fonts and sizes should be CSS variables on `.nd-root`.
- **Keep it accessible.** Controls must work with the keyboard and have proper labels.
- **Text, not HTML.** Never put user-provided strings into `innerHTML`.
- **Add a test** for new behaviour, and a line to `CHANGELOG.md`.
- Commit the rebuilt `dist/` and `docs/lib/` files with your change (CI checks this).

## Reporting bugs and ideas

Open an [issue](https://github.com/mvhmuod/nightdeck-ui/issues) with the smallest code that shows the problem. Issues marked **good first issue** are a good place to start.

## Security

Please do not open a public issue for security problems. See [SECURITY.md](SECURITY.md).

By contributing you agree that your contribution is released under the [MIT License](LICENSE) and that you follow the [Code of Conduct](CODE_OF_CONDUCT.md).
