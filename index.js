"use strict";
const { app, BrowserWindow, globalShortcut, shell } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        nodeIntegration: false,
    });
    const encoded = encodeURI("http://localhost:8069/discuss/channel/1?debug=assets");
    win.loadURL(`http://localhost:8069/web/login?redirect=${encoded}`);
    return win;
};

app.whenReady().then(() => {
    const win = createWindow();

    win.on("mail:public_page_ready", () => console.log("wololo"));

    // win.webContents.on("mail:public_page_ready", () => {
    //     const pushToTalkKey = win.webContents.executeJavaScript('window.odoo.__WOWL_DEBUG__');
    //     console.log(pushToTalkKey);
    // });

    globalShortcut.register('F1', () => {
        win.webContents.sendInputEvent({ keyCode: "F1", type: "keydown" });
    });

    // open target="_blank" link with the default browser
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
