const electron = require('electron');
const path = require('path');
const url = require('url');
console.log(electron)
const config = require('../config');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

createWindow = () => {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.webContents.openDevTools();

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  }

  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

connectWithDatabase = () => {
  //mongoose.Promise = global.Promise;
  //mongoose.connect(config.mongoConnectionURL, { useMongoClient: true });
}

app.on('ready', () => {
  connectWithDatabase();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
