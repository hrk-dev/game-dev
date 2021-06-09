// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

let mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 768,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // mainWindow.webContents.openDevTools()
  // mainWindow.maximize()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('app:quit', () => {
  app.exit()
})

ipcMain.on('app:dev', () => {
  if (mainWindow) {
    mainWindow.webContents.openDevTools()
  }
})

ipcMain.on('app:max', e => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})

ipcMain.on('app:min', () => {
  mainWindow.minimize()
})

ipcMain.on('app:reload', () => {
  mainWindow.webContents.reload()
})

ipcMain.on('vue:ready', () => {
  mainWindow.show()
})


let blogWindow
ipcMain.on('open-blog', () => {
  if (blogWindow) {
    blogWindow.show()
  } else {
    blogWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 768,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    blogWindow.setMenu(null)
    blogWindow.loadFile(path.join(__dirname, './html/blog/index.html'))

    blogWindow.once('ready-to-show', () => {
      blogWindow.show()
    })
    blogWindow.once('closed', () => {
      blogWindow = null
    })
  }
})

let hrkWindow
ipcMain.on('open-hrk', () => {
  if (hrkWindow) {
    hrkWindow.show()
  } else {
    hrkWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 768,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    hrkWindow.setMenu(null)
    hrkWindow.loadFile(path.join(__dirname, './html/hrk/index.html'))

    hrkWindow.once('ready-to-show', () => {
      hrkWindow.show()
    })
    hrkWindow.once('closed', () => {
      hrkWindow = null
    })
  }
})