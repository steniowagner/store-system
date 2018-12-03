const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const handleEvent = require('./events-handlers');
const { OPERATION_REQUEST, OPERATION_RESPONSE } = require('../common/entitiesTypes');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
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

ipcMain.on(OPERATION_REQUEST, async (event, entitie, operation, tag, args) => {
  const eventResponseId = `${OPERATION_RESPONSE}_${tag}`;
  const result = await handleEvent(entitie, operation, args);

  event.sender.send(eventResponseId, result);
});
