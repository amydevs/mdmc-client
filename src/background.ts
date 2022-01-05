'use strict'

import path from 'path'
import { app, protocol, BrowserWindow, ipcMain, dialog, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

let win: BrowserWindow;
let overlayActivated = false;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    width: 1200,
    height: 780,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js")
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e:any) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  
  createWindow();
  
  var lib = (await import('ffi-napi')).Library(path.join(__dirname, "..", "overlay", "target", "release", "overlay"), {
    fibonacci: ['int', ['pointer']]
  });
  console.log(lib.fibonacci(win.getNativeWindowHandle() as any));
  // win.setAlwaysOnTop(true, 'normal');
  // win.setFocusable(false);
  // globalShortcut.register('CommandOrControl+Shift+O', () => {
  //   overlayActivated = !overlayActivated;
  //   win.setAlwaysOnTop(overlayActivated, 'normal');
  // })
  libraryScan()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// custom code
import Store from "electron-store";

const store = new Store();

import axios from "axios"

import fs from 'fs';
import { Chart, QChart } from '@/types/chart'
import { Headers } from '@/types/headers'
import JSZip, { remove } from "jszip";

import { API } from './modules/api'
const api = new API();

import async, { doWhilst } from 'async'
import getRawBody from 'raw-body'
import zlib from 'zlib'
import { match } from 'assert'

// Path
function getAlbumsPath() {
  const albumspath = path.join(store.get("gamePath") as string, "Custom_Albums");
  if (!fs.existsSync(albumspath)) {
    fs.mkdirSync(albumspath);
  }
  return albumspath;
}

// library scanning
let library: Chart[] = [];
store.events.on("change", (key: string) => {
  if(key == "gamePath") {
    libraryScan()
  }
})
async function libraryScan() {
  const cb = () => {
    win.webContents.send("library-update", library);
    console.log(`scan complete: ${albumsPath}, got ${library.length} charts`);
    return;
  }

  library = []
  const albumsPath = getAlbumsPath();
  console.log(`scanning: ${albumsPath}`)
  if (albumsPath) {
    const files = fs.readdirSync(albumsPath)

    for (const [i, file] of files.entries()) {
      if (file.endsWith(".mdm")) {
        const zip = new JSZip();
        try {
          const localPath = path.join(albumsPath, file);
          const zipfile = await zip.loadAsync(fs.readFileSync(localPath));
          let tempChartFile = {
            isLocal: true,
            localPath: file
          } as Chart
          for (const [name, file] of Object.entries(zipfile.files)) {
            if (name.endsWith(".png")) {
              tempChartFile.b64Cover = await file.async("base64");
            }
            if (name.endsWith(".json")) {
              Object.assign(tempChartFile, JSON.parse(await file.async("string")) as Chart);
            }
          }
          library.push(tempChartFile)
        }
        catch {
          console.error(`failed to load chart: ${file}`)
        }
      }
      if (i === files.length -1) cb();
    }
    if (0 === files.length) cb()
  }
}

//handlers
ipcMain.on('window-handle', (event, handletype) => {
  switch (handletype) {
    case "minimize":
      win.minimize();
      break;
    case "maximize":
      !win.isMaximized() ? win.maximize() : win.unmaximize();
      break;
    case "close":
      win.close();
      break;
  }
})
ipcMain.on('library-get', (event) => {
  event.returnValue = library;
})
ipcMain.on('library-scan', (event) => {
  libraryScan()
})
ipcMain.on('library-delete', (event, fileName) => {
  const filePath = path.join(getAlbumsPath(), fileName);
  fs.unlink(filePath, () => {
    libraryScan();
  });
})
ipcMain.handle('request-get', async (_, axios_request: string | any) => {
  const result = await axios(axios_request)
  return { data: result.data, status: result.status }
})

// IPC listener
ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on("electron-store-set", async (event, key, val) => {
  store.set(key, val);
});

ipcMain.on('dialog-open', (event) => {
  try {
    event.returnValue = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })
  }
  catch {
    event.returnValue = null
  } 
})

// download
const axiosDownloadInst = axios.create({
  decompress: false,
  baseURL: `${api.getChartDownloadBaseUrl()}`,
  timeout: 60000,
  headers: Headers.DownloadHeaders,
  responseType: "stream"
});
let downloads = async.queue((chart: QChart, cb) => {
  win.webContents.send("download-changed", getAllDownloads())
  console.log("Starting Download > " + api.getChartDownloadUrl(chart.id as number));
  axiosDownloadInst.get(`${chart.id}`).catch(err => {
    cb(Error(err.message))
  })
  .then(async (resp: any) => {
    try {
      const decomp = resp.data.pipe(zlib.createBrotliDecompress()) as zlib.BrotliDecompress
      var len = 0;
      var count = 0;
      resp.data.on("data", function (chunk:Uint8Array) {
        len += chunk.length;
        count++;
        if(count >= 40) {
          win.webContents.send("download-prog",  (len/(1024*1024)).toPrecision(3), 100*(len/20971520))
          count = 0
        }
      });
      const buf = Buffer.from(await getRawBody(decomp, {
        encoding: "ascii"
      }), "base64")
      fs.writeFileSync(path.join(getAlbumsPath(), chart.name + ".mdm"), buf);
      cb()
    }
    catch {
      cb(Error('Could not download chart'))
    }
  })
}, 1);

downloads.drain(() => {
  win.webContents.send("download-changed", getAllDownloads())
  console.log("All downloads finished");
  libraryScan();
});

downloads.error((err, task) => {
  console.error(`${task.name} failed to download!`)
})

ipcMain.on("download-add", (event, chart: Chart) => {
  console.log("Added Download > " + chart.name);
  var qchart = chart as QChart
  qchart.QIndex = Math.floor(Math.random() * 1000000).toString()
  downloads.push(qchart)
  win.webContents.send("download-changed", getAllDownloads())
});

ipcMain.on("download-remove", (event, QueueID: string) => {
  console.log("Removed Download > " + QueueID);
  downloads.remove((e) => { 
    return e.data.QIndex == QueueID 
  })
  win.webContents.send("download-changed", getAllDownloads())
});

ipcMain.on("download-getAll", (event) => {
  event.returnValue = getAllDownloads();
});

function getAllDownloads() {
  return downloads.workersList().map(w => w.data).concat([...(downloads as any)])
}