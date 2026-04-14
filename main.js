const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');

// Manejar la creación de accesos directos en Windows
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Crear la ventana principal
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: 'Braunwald - Tratado de Cardiología 12ª Edición',
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true
    },
    show: false,
    backgroundColor: '#0a0c10'
  });

  // Cargar el archivo HTML principal
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Mostrar ventana cuando esté lista
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Manejar cierre de ventana
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Crear menú personalizado en español
  createMenu();
};

// Crear menú de la aplicación en español
const createMenu = () => {
  const template = [
    // Menú Archivo
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Ir a Inicio',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            if (mainWindow) {
              mainWindow.loadFile(path.join(__dirname, 'index.html'));
            }
          }
        },
        {
          label: 'Recargar Página',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (mainWindow) {
              mainWindow.reload();
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Abrir Carpeta PDFs',
          click: async () => {
            const pdfsPath = path.join(__dirname, 'pdfs');
            await shell.openPath(pdfsPath);
          }
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    // Menú Navegación
    {
      label: 'Navegación',
      submenu: [
        {
          label: 'Atrás',
          accelerator: 'Alt+Left',
          click: () => {
            if (mainWindow && mainWindow.webContents.canGoBack()) {
              mainWindow.webContents.goBack();
            }
          }
        },
        {
          label: 'Adelante',
          accelerator: 'Alt+Right',
          click: () => {
            if (mainWindow && mainWindow.webContents.canGoForward()) {
              mainWindow.webContents.goForward();
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Inicio',
          accelerator: 'Home',
          click: () => {
            if (mainWindow) {
              mainWindow.loadFile(path.join(__dirname, 'index.html'));
            }
          }
        }
      ]
    },
    // Menú Ver
    {
      label: 'Ver',
      submenu: [
        {
          label: 'Zoom +',
          accelerator: 'CmdOrCtrl+Plus',
          click: () => {
            if (mainWindow) {
              const currentZoom = mainWindow.webContents.getZoomLevel();
              mainWindow.webContents.setZoomLevel(currentZoom + 1);
            }
          }
        },
        {
          label: 'Zoom -',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            if (mainWindow) {
              const currentZoom = mainWindow.webContents.getZoomLevel();
              mainWindow.webContents.setZoomLevel(currentZoom - 1);
            }
          }
        },
        {
          label: 'Restablecer Zoom',
          accelerator: 'CmdOrCtrl+0',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.setZoomLevel(0);
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Pantalla Completa',
          accelerator: 'F11',
          click: () => {
            if (mainWindow) {
              const isFullScreen = mainWindow.isFullScreen();
              mainWindow.setFullScreen(!isFullScreen);
            }
          }
        },
        {
          label: 'Herramientas de Desarrollo',
          accelerator: 'F12',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.toggleDevTools();
            }
          }
        }
      ]
    },
    // Menú Ayuda
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Documentación',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Documentación',
              message: 'Braunwald - Tratado de Cardiología 12ª Edición',
              detail: 'Esta aplicación permite navegar fácilmente por las diferentes partes del Tratado de Cardiología de Braunwald.\n\nUso:\n• Haz clic en cualquier tarjeta para abrir el PDF correspondiente\n• Usa el menú Navegación para moverte entre páginas\n• Usa Ctrl+R para recargar la página principal',
              buttons: ['Aceptar'],
              icon: path.join(__dirname, 'assets/icon.png')
            });
          }
        },
        {
          label: 'Atajos de Teclado',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Atajos de Teclado',
              message: 'Atajos disponibles',
              detail: 'Ctrl+H - Ir a Inicio\nCtrl+R - Recargar página\nAlt+← - Atrás\nAlt+→ - Adelante\nCtrl++ - Zoom +\nCtrl+- - Zoom -\nCtrl+0 - Restablecer zoom\nF11 - Pantalla completa\nF12 - Herramientas de desarrollo',
              buttons: ['Aceptar']
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Acerca de',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Acerca de',
              message: 'Braunwald - Tratado de Cardiología',
              detail: `Versión: 1.0.0
Edición: 12ª Edición Español

Estructura y Digitalización:
René Hernández Hernández
Email: renediana2014@gmail.com

© 2024 Todos los derechos reservados.

Esta aplicación fue desarrollada como organizador
de contenido del Tratado de Cardiología de Braunwald.`,
              buttons: ['Aceptar'],
              icon: path.join(__dirname, 'assets/icon.png')
            });
          }
        }
      ]
    }
  ];

  // Ajustes específicos para macOS
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          label: 'Acerca de ' + app.getName(),
          role: 'about'
        },
        { type: 'separator' },
        {
          label: 'Ocultar ' + app.getName(),
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Ocultar Otros',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Mostrar Todo',
          role: 'unhide'
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

// Eventos de la aplicación
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Prevenir navegación externa no deseada
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});
