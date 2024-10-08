const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    loaded: () => ipcRenderer.send('public_page_loaded'),
    setPushToTalkKey: (key) => ipcRenderer.send("getPushToTalkKey", key)
});
