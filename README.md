# nightdeck-ui

[![CI](https://github.com/mvhmuod/nightdeck-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/mvhmuod/nightdeck-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/nightdeck-ui.svg)](https://www.npmjs.com/package/nightdeck-ui)
[![gzip size](https://img.shields.io/badge/gzip-~6%20KB-informational)](dist/)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**A dark control-panel UI kit for dashboards, settings screens and Electron apps.**
Sidebar tabs, toggles, sliders, dropdowns, meters, buttons and a live console, in plain JavaScript and CSS. No dependencies, no framework, about 6 KB gzipped.

![nightdeck-ui panel with sidebar tabs, meters and a console](https://raw.githubusercontent.com/mvhmuod/nightdeck-ui/main/docs/screenshot.png)

**[Live demo →](https://mvhmuod.github.io/nightdeck-ui/)**

## Why

- **One config object, a whole panel.** Describe tabs and items; get a working, keyboard-accessible UI.
- **Looks finished out of the box.** A dark, game-settings style that works for system monitors, admin tools and app settings.
- **Works everywhere.** Script tag, CDN, CommonJS, ES modules, Electron. No build step needed to use it.
- **Fully themeable** with CSS variables.

## Quick start

```
npm install nightdeck-ui
```

```js
import Nightdeck from "nightdeck-ui";
import "nightdeck-ui/css";
```

Or without installing anything:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nightdeck-ui@0.1/dist/nightdeck.min.css">
<script src="https://cdn.jsdelivr.net/npm/nightdeck-ui@0.1/dist/nightdeck.min.js"></script>
```

A complete page:

```html
<div id="app"></div>
<script>
  const panel = Nightdeck.create("#app", {
    title: "Settings",
    tabs: {
      display: [
        { type: "toggle", id: "vsync", label: "vertical sync", value: true },
        { type: "slider", id: "brightness", label: "brightness", value: 60 },
        { type: "select", id: "quality", label: "quality", options: ["low", "high"], value: "high" }
      ],
      status: [
        { type: "meter", id: "cpu", label: "cpu usage", value: 35 }
      ]
    },
    presets: { performance: { vsync: false, quality: "low" } },
    onChange(id, value, all) { console.log(id, value, all); }
  });

  panel.set("cpu", 72);   // update a meter
</script>
```

## Items

Every item needs a unique `id`. `label` is the text shown next to it.

| `type` | What it is | Extra options | Value |
| --- | --- | --- | --- |
| `toggle` | On/off switch | | `true` / `false` |
| `slider` | Range | `min` (0), `max` (100), `step` (1), `unit` | number |
| `select` | Dropdown | `options`: strings or `{ value, label }` | string |
| `text` | Text field | `placeholder` | string |
| `button` | Button, fires `action` | `variant`: `"accent"` or `"danger"` | - |
| `meter` | Progress bar 0-100 | `text`, `warn` (50) | display only |
| `info` | Label and value row | | display only |
| `custom` | Your own content | `render(element, panel)` | - |

Any item can take `wide: true` to span the full width.

```js
{ type: "slider", id: "fov", label: "field of view", value: 90, min: 60, max: 120, unit: "°" }
{ type: "meter", id: "temp", label: "gpu temperature", value: 64, text: "64 °C", warn: 70 }
{ type: "button", id: "save", label: "save", variant: "accent" }
{ type: "custom", id: "chart", wide: true, render(el) { el.textContent = "anything you like"; } }
```

## Options

| Option | Default | |
| --- | --- | --- |
| `title` | `"Panel"` | Text at the top left |
| `tabs` | `{}` | `{ tabName: [items] }` |
| `presets` | `{}` | `{ presetName: { id: value } }`, shown as footer buttons |
| `version` | `""` | Small text in the footer |
| `console` | `true` | `false` hides the console, a string renames it |
| `reset` | `true` | Show the reset button |
| `maxLog` | `500` | Console lines to keep |
| `onChange` | | `(id, value, allValues)` |
| `onAction` | | `(id)` when a button is pressed |
| `onSelect` | | `(tabName)` when the tab changes |

## Methods

`Nightdeck.create(target, options)` returns a panel. Most methods return the panel, so they can be chained.

| Method | |
| --- | --- |
| `get(id)` | Current value |
| `set(id, value, { silent, text })` | Change a value (fires `change` unless `silent`); for meters and info rows, update the display (`text` replaces the shown number) |
| `values()` | All values as one object |
| `reset()` | Back to the starting values |
| `preset(name)` | Apply a preset |
| `select(tab)` | Switch tab; `panel.tab` is the current one |
| `log(text)` / `clearLog()` | Write to / clear the console |
| `setFooter(text)` | Change the footer text |
| `on(event, fn)` / `off(event, fn)` | Events: `change`, `action`, `select`, `reset`, `preset` |
| `item(id)` | The element of an item |
| `destroy()` | Remove the panel |

## Theming

Every colour, font and size is a CSS variable on `.nd-root`:

```css
#app {
  --nd-accent: #b07cf0;   /* sliders, meters, hover */
  --nd-on: #f06fa8;       /* toggles that are on, selected tab */
  --nd-warn: #e2574c;     /* meters above their warn level */
  --nd-full: #e8c547;     /* meters at 100% */
  --nd-panel: #15191d;    /* window background */
  --nd-stripe: linear-gradient(90deg, #6a5cd6, #b07cf0, #f06fa8);
  --nd-font: "Inter", system-ui, sans-serif;
}
```

All variables: [`src/nightdeck.css`](src/nightdeck.css). The [demo](https://mvhmuod.github.io/nightdeck-ui/) has a theme switcher.

## Examples

| | |
| --- | --- |
| [basic.html](examples/basic.html) | Every item type |
| [dashboard.html](examples/dashboard.html) | System-monitor dashboard with live meters |
| [settings.html](examples/settings.html) | Settings that save to localStorage and re-theme live |
| [electron-starter](examples/electron-starter) | A complete minimal Electron app |

## Browser support

Current Chrome, Edge, Firefox and Safari, and Electron 20 or newer. Uses CSS `:has()` (for the toggle label colour) and `color-mix()` (for the tab glow); older browsers still work with plainer styling.

## Accessibility

Tabs use the ARIA tab pattern and work with the arrow keys, Home and End. All controls are real form elements with labels, meters have `role="meter"`, the console is a live region, and animations respect `prefers-reduced-motion`.

## Contributing

Bug reports, ideas and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md); issues labelled **good first issue** are a good start.

## License

[MIT](LICENSE) © 2026 [mvhmuod](https://github.com/mvhmuod)
