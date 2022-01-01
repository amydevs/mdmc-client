const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

contextBridge.exposeInMainWorld("electron", {
    dialog: {
        openDialog: () => {
            return ipcRenderer.sendSync('open-dialog') // adjust naming for your project
        },
    },
    fs: {
        existsSync: require('fs').existsSync
    },
    axios: {
        async get(url) {
            return (await ipcRenderer.invoke("request", url))
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