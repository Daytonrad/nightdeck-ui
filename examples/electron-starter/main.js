// Minimal Electron main process for a nightdeck-ui panel.
const { app, BrowserWindow, ipcMain } = require("electron");
const os = require("os");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000, height: 560, backgroundColor: "#0c0f12", autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: true }
  });
  win.loadFile("index.html");
}

// The renderer asks for real system numbers through the preload bridge.
let last = os.cpus().map(c => c.times);
ipcMain.handle("stats", () => {
  const now = os.cpus().map(c => c.times);
  let idle = 0, total = 0;
  now.forEach((t, i) => {
    const p = last[i], sum = x => x.user + x.nice + x.sys + x.idle + x.irq;
    idle += t.idle - p.idle; total += sum(t) - sum(p);
  });
  last = now;
  return { cpu: total ? (1 - idle / total) * 100 : 0, memTotal: os.totalmem(), memFree: os.freemem(), uptime: os.uptime(), platform: os.platform() };
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
