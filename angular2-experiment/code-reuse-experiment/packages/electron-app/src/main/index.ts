import { app, BrowserWindow } from 'electron'

let mainWindow: BrowserWindow | null;

function createMainWindow() {
    const window = new BrowserWindow({
        width: 300,
        height: 300,
        frame: false
    });

    const isDevelopment = process.env.NODE_ENV !== 'production';
    if(isDevelopment) {
        //window.webContents.openDevTools();
    }
    const url = isDevelopment
        ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
        : `file://${__dirname}/index.html`;
    window.loadURL(url);

    window.on('closed', () => {
        mainWindow = null;
    });

    return window;
}

app.on('window-all-closed', () => {
    app.quit();
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});
