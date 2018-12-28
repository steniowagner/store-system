const net = require('net');

const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;
process.env.NODE_ENV = 'development';

const client = new net.Socket();

let isElectronStarted = false;

const tryConnectionWithReact = () => client.connect({ port }, () => {
  client.end();
  if (!isElectronStarted) {
    console.log(`Electron is Running at ${process.env.ELECTRON_START_URL}!`);
    isElectronStarted = true;
    const { exec } = require('child_process');
    exec('npm run electron');
  }
});

tryConnectionWithReact();

client.on('error', (_error) => {
  setTimeout(tryConnectionWithReact, 1000);
});
