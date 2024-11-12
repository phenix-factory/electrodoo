const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    setPushToTalkKey: (key) => ipcRenderer.send("getPushToTalkKey", key),
    openOdoo: (url) => ipcRenderer.send("odooUrl", url),
});
