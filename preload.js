const { contextBridge } = require('electron');

// Exponer API segura al renderer si es necesario
contextBridge.exposeInMainWorld('electronAPI', {
  // Aquí puedes agregar funciones si necesitas comunicación entre procesos
});
