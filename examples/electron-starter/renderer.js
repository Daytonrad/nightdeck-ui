// Builds the panel and fills it with real numbers from the main process.
const panel = Nightdeck.create("#app", {
  title: "My App",
  version: "electron starter",
  tabs: {
    system: [
      { type: "meter", id: "cpu", label: "cpu" },
      { type: "meter", id: "mem", label: "memory" },
      { type: "info", id: "uptime", label: "computer up for" },
      { type: "info", id: "platform", label: "platform" }
    ],
    settings: [
      { type: "toggle", id: "dark", label: "dark mode", value: true },
      { type: "slider", id: "refresh", label: "refresh every", value: 1, min: 1, max: 10, unit: " s" }
    ]
  }
});

const gb = n => (n / 1073741824).toFixed(1);
async function tick() {
  const s = await window.system.stats();
  const used = s.memTotal - s.memFree;
  panel.set("cpu", s.cpu)
    .set("mem", used / s.memTotal * 100, { text: gb(used) + " / " + gb(s.memTotal) + " GB" })
    .set("uptime", Math.floor(s.uptime / 3600) + " h " + Math.floor(s.uptime % 3600 / 60) + " min")
    .set("platform", s.platform);
  setTimeout(tick, panel.get("refresh") * 1000);
}
tick();
