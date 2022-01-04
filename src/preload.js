const {
    contextBridge,
    ipcRenderer,
    shell
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

contextBridge.exposeInMainWorld("electron", {
    shell: {
        openExternalPlayer: (id) => {
            shell.openExternal(`https://musedash.moe/mdmc/player/${id}`);
        }
    },
    ipc: {
        invoke: (channel, data) => {
            return ipcRenderer.invoke(channel, data);
        },
        send: (channel, data) => {
            return ipcRenderer.send(channel, data);
        },
        receive: (channel, func) => {
            // Deliberately strip event as it includes `sender` 
            const subscription = (event, ...args) => func(...args);
            ipcRenderer.on(channel, subscription);
            return () => {
                ipcRenderer.removeListener(channel, subscription);
            }
        },
        removeAll: (channel) => {
            ipcRenderer.removeAllListeners(channel);
        }
    },
    downloads: {
        getAll: () => {
            return ipcRenderer.sendSync('download-getAll') // adjust naming for your project
        },
    },
    library: {
        get: () => {
            return ipcRenderer.sendSync('library-get') // adjust naming for your project
        },
        delete: (fileName) => {
            ipcRenderer.send('library-delete', fileName) // adjust naming for your project
        }
    },
    dialog: {
        openDialog: () => {
            return ipcRenderer.sendSync('dialog-open') // adjust naming for your project
        },
    },
    fs: {
        existsSync: require('fs').existsSync
    },
    axios: {
        async get(url) {
            return (await ipcRenderer.invoke("request-get", url))
        }
    },
    store: {
        get(val) {
          return ipcRenderer.sendSync("electron-store-get", val);
        },
        set(property, val) {
          ipcRenderer.send("electron-store-set", property, val);
        },
        // Other method you want to add like has(), reset(), etc.
    },
});
console.log("preload.js");