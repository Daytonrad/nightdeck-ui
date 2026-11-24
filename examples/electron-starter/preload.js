// Exposes one safe function to the page: window.system.stats()
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("system", { stats: () => ipcRenderer.invoke("stats") });
