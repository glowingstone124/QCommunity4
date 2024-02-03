// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const settings = require('electron-settings');

contextBridge.exposeInMainWorld('electronSettings', {
    // Expose get, set, and delete methods from electron-settings
    get: (key) => settings.get(key),
    set: (key, value) => settings.set(key, value),
    delete: (key) => settings.delete(key),
});

// Request 'settings-ready' message from the main process
ipcRenderer.send('settings-ready');