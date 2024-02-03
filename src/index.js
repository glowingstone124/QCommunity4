const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const settings = require('electron-settings');
global.apiEndpoint = "http://qoriginal.vip:8080";
app.setAppUserModelId(process.execPath)
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const electron = require('electron');
  const Menu = electron.Menu;
  Menu.setApplicationMenu(null);
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    minWidth: 1100,
    minHeight: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use the preload script
    },
  });
  const iconPath = path.join(__dirname, 'assets', '222.jpg');
  mainWindow.setIcon(iconPath);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.on('ready', () => {
  settings.configure({
    
  });
  ipcMain.on('settings-ready', (event) => {
    event.sender.send('settings-ready', settings);
  });

  createWindow();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on('quit', () => {
  app.quit();
});
