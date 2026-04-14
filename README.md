# 📘 Braunwald · Tratado de Cardiología (12ª ed.)

Aplicación de escritorio multiplataforma que organiza y visualiza la 12ª edición del *Braunwald. Tratado de Cardiología* en español. Desarrollada con **Electron**, incluye un visor PDF integrado con desplazamiento continuo, marcadores laterales extraídos del documento, zoom dinámico y menú de navegación en español.

## ✨ Características

- **Tarjetas interactivas** con cada parte del libro (11 secciones).
- **Visor PDF interno**:
  - Páginas continuas (scroll vertical).
  - Barra lateral con marcadores (outline) para saltar a secciones.
  - Zoom ajustable (+/-).
- **Menú en español**:
  - Navegación: Inicio, Atrás, Adelante (con historial).
  - Ver: Recargar, Pantalla completa.
  - Ayuda: Acerca de (créditos del autor).
- **Créditos**: René Hernández Hernández (renediana2014@gmail.com).
- **Empaquetado nativo** con `electron-builder`:
  - Windows: `.exe` (NSIS).
  - Linux: `.deb`, `.AppImage`, `.snap`.

## 📦 Requisitos previos

- Node.js (v18 o superior)
- npm o yarn
- Carpeta `pdfs/` con los 11 archivos PDF (nombres exactos según las secciones).

## 🚀 Instalación y ejecución en desarrollo

```bash
# Clonar o crear el proyecto
npm init -y

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
