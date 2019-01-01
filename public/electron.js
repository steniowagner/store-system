const {
  BrowserWindow,
  ipcMain,
  shell,
  app,
} = require('electron');

const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');

const OPERATIONS = {
  OPERATION_RESPONSE: 'OPERATION_RESPONSE',
  CLOSE_PRINT_WINDOW: 'CLOSE_PRINT_WINDOW',
  OPEN_PRINT_WINDOW: 'OPEN_PRINT_WINDOW',
  OPERATION_REQUEST: 'OPERATION_REQUEST',
  OPEN_URL: 'OPEN_URL',
};

const handleEvent = require('./back-end/events-handlers');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

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

ipcMain.on(OPERATIONS.OPERATION_REQUEST, async (event, entitie, operation, tag, args) => {
  const eventResponseId = `${OPERATIONS.OPERATION_RESPONSE}_${tag}`;
  const result = await handleEvent(entitie, operation, args);

  event.sender.send(eventResponseId, result);
});

ipcMain.on(OPERATIONS.OPEN_PRINT_WINDOW, (event, fileName) => {
  const pdfPath = path.join(os.tmpdir(), `${fileName}.pdf`);

  const pdfOptions = {
    printSelectionOnly: false,
    printBackground: false,
    landscape: false,
    marginsType: 1,
    pageSize: 'A4',
  };

  const window = BrowserWindow.fromWebContents(event.sender);

  window.webContents.printToPDF(pdfOptions, (err, data) => {
    if (err) {
      throw err;
    }

    fs.writeFile(pdfPath, data, (writeError) => {
      if (writeError) {
        throw writeError;
      }

      shell.openExternal(`file://${pdfPath}`);

      event.sender.send(OPERATIONS.CLOSE_PRINT_WINDOW);
    });
  });
});

ipcMain.on(OPERATIONS.OPEN_URL, (event, socialURL) => shell.openExternal(socialURL));
