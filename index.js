"use strict";
const { app, BrowserWindow, globalShortcut, shell, ipcMain } = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile(path.join(__dirname, "index.html"));
    return win;
};

app.whenReady().then(() => {
    const win = createWindow();
    ipcMain.on("odooUrl", (event, url) => {
        const encoded = encodeURI(`${url}/discuss/channel/1?debug=assets`);
        win.loadURL(`${url}/web/login?redirect=${encoded}`);
    });
    ipcMain.on("getPushToTalkKey", (event, key) => {
        const pushToTalkKey = key.split(".")[3];
        // Globally listen to the push to talk key and pass the event to Odoo
        globalShortcut.register(pushToTalkKey, () => {
            win.webContents.send("push-to-talk");
        });
    });

    // open target="_blank" link with the default browser
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
});

// From electron documentation
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
