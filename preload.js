const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    setPushToTalkKey: (key) => ipcRenderer.send("getPushToTalkKey", key),
    openOdoo: (url) => ipcRenderer.send("odooUrl", url),
    isTalking: () => {
        ipcRenderer.on("push-to-talk", (_event) => {
            window.postMessage("push-to-talk", window.location.origin);
        });
    }
});
