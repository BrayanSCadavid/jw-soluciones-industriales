# JW Soluciones Industriales — Página web

Página informativa de la empresa, organizada con el patrón **MVC** (Modelo – Vista – Controlador).

## Estructura

```
Javier/
├── index.html          Esqueleto de la página: carga estilos y scripts
├── css/
│   └── estilos.css     Diseño: colores, tamaños y espacios
├── js/
│   ├── modelo.js       MODELO: textos y datos de la empresa
│   ├── vista.js        VISTA: convierte los datos en HTML
│   └── controlador.js  CONTROLADOR: arranca la página y anima el logo 3D
└── img/
    └── logo-jw.png     Logo con colores vivos y fondo transparente
```

## ¿Qué archivo edito?

| Quiero cambiar…                                  | Archivo            | Dónde                          |
|--------------------------------------------------|--------------------|--------------------------------|
| Número o mensaje de WhatsApp                     | `js/modelo.js`     | `contacto.whatsapp` y `contacto.mensajeWhatsApp` |
| Teléfono, correo o dirección                     | `js/modelo.js`     | `contacto`                     |
| Título, eslogan, misión o visión                 | `js/modelo.js`     | `portada` y `nosotros`         |
| Agregar o quitar un servicio, beneficio o compromiso | `js/modelo.js` | listas `items` / `tareas`      |
| Colores de la página                             | `css/estilos.css`  | bloque `:root` al inicio       |
| Orden de las secciones                           | `js/vista.js`      | función `pagina()` al final    |
| Velocidad o grosor del logo 3D                   | `js/controlador.js`| objeto `config` al inicio      |
| Logo                                             | `img/logo-jw.png`  | reemplaza la imagen (mismo nombre) |

## Cómo funciona

1. `index.html` carga `estilos.css` y los tres scripts en orden.
2. **Modelo** (`modelo.js`) define todos los datos.
3. **Vista** (`vista.js`) tiene una función por sección que recibe el Modelo y devuelve su HTML.
4. **Controlador** (`controlador.js`), al cargar la página, pide a la Vista el HTML completo, lo coloca en `<div id="app">` y activa la animación del logo.

## Publicar en el hosting

Sube la carpeta completa respetando la estructura: `index.html`, `css/`, `js/` e `img/`.
Los archivos `logo.png`, `logo_vivo.png` y la propuesta `.docx` no son necesarios en el hosting.

## Cómo ejecutar la página en tu computador

### Opción 1: doble clic (la más fácil)

1. Abre la carpeta `Javier` en el Explorador de archivos.
2. Haz doble clic en `index.html`.
3. Se abre en tu navegador (Chrome, Edge, Firefox…).

Si cambias algo en los archivos, guarda y presiona **F5** en el navegador para ver el cambio.

### Opción 2: con un servidor local (igual a como se verá en internet)

Necesitas tener **Python** instalado. Para comprobarlo, abre una terminal y escribe `python --version`.

1. Abre una terminal (PowerShell o CMD) **dentro de la carpeta del proyecto**.
   Forma rápida: en el Explorador, entra a la carpeta `Javier`, escribe `cmd` en la barra de dirección y presiona Enter.
2. Ejecuta:

   ```
   python -m http.server 8765
   ```

3. Abre en el navegador: **http://localhost:8765**
4. Para apagar el servidor, vuelve a la terminal y presiona **Ctrl + C**.

> Si el puerto 8765 está ocupado, usa otro número, por ejemplo `python -m http.server 8080`, y abre `http://localhost:8080`.

### Opción 3: con Visual Studio Code

1. Abre la carpeta `Javier` en Visual Studio Code.
2. Instala la extensión **Live Server** (de Ritwick Dey).
3. Haz clic derecho sobre `index.html` → **Open with Live Server**.
4. La página se recarga sola cada vez que guardas un cambio.
