"use strict";
const { app, BrowserWindow, globalShortcut, shell, ipcMain } = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        nodeIntegration: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    const encoded = encodeURI("http://localhost:8069/discuss/channel/1?debug=assets");
    win.loadURL(`http://localhost:8069/web/login?redirect=${encoded}`);
    return win;
};

app.whenReady().then(() => {
    let pushToTalkKey;
    ipcMain.on("getPushToTalkKey", (event, key) => {
        pushToTalkKey = key;
    });
    // ipcMain.on("public_page_loaded", () => console.log("wololo", pushToTalkKey));
    const win = createWindow();

    // Globally listen to the push to talk key and pass the event to Odoo
    if (pushToTalkKey) {
        globalShortcut.register(pushToTalkKey, () => {
            win.webContents.sendInputEvent({ keyCode: pushToTalkKey, type: "keydown" });
        });
    }

    // open target="_blank" link with the default browser
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
});

// From electron documentation
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
