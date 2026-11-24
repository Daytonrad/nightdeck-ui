// Builds the files in dist/ from src/. Run with: npm run build
// - dist/nightdeck.js       readable, works as a <script> tag, with require() and with AMD
// - dist/nightdeck.min.js   the same, minified (for CDNs)
// - dist/nightdeck.mjs      ES module: import Nightdeck from "nightdeck-ui"
// - dist/nightdeck.css / dist/nightdeck.min.css
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { transform } from "esbuild";

const root = new URL("..", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const write = (p, s) => writeFileSync(new URL(p, root), s);
const { version } = JSON.parse(read("package.json"));
const banner = `/*! nightdeck-ui v${version} | (c) 2026 mvhmuod | MIT License */\n`;

const core = read("src/core.js").replace("__VERSION__", version).replace(/^\/\*[\s\S]*?\*\/\n/, "");

const umd = `${banner}(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else root.Nightdeck = factory();
})(typeof self !== "undefined" ? self : this, function () {
${core}
  return nightdeckFactory();
});
`;

const esm = `${banner}${core}
const Nightdeck = nightdeckFactory();
export const create = Nightdeck.create;
export const version = Nightdeck.version;
export default Nightdeck;
`;

const css = banner + read("src/nightdeck.css").replace(/^\/\*![\s\S]*?\*\/\n/, "");

mkdirSync(new URL("dist/", root), { recursive: true });
write("dist/nightdeck.js", umd);
write("dist/nightdeck.mjs", esm);
write("dist/nightdeck.css", css);
write("dist/nightdeck.min.js", (await transform(umd, { minify: true, legalComments: "none", target: "es2017" })).code.replace(/^/, banner));
write("dist/nightdeck.min.css", (await transform(css, { loader: "css", minify: true, legalComments: "none", target: ["chrome90", "firefox121", "safari16"] })).code.replace(/^/, banner));
// the demo site (docs/, published with GitHub Pages) gets its own copy of the build
mkdirSync(new URL("docs/lib/", root), { recursive: true });
for (const f of ["nightdeck.min.js", "nightdeck.min.css"]) copyFileSync(new URL("dist/" + f, root), new URL("docs/lib/" + f, root));
console.log(`built nightdeck-ui ${version} into dist/ (and docs/lib/)`);
