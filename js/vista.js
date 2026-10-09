/* =====================================================================
   VISTA — Cómo se muestra la página
   ---------------------------------------------------------------------
   Cada función recibe el Modelo (m) y devuelve el HTML de una sección.
   La Vista NO guarda datos ni maneja eventos: solo "dibuja".

   Si quieres cambiar el ORDEN de las secciones, edita la función
   pagina() al final de este archivo.
   ===================================================================== */

const Vista = {

  /* ---------- Utilidades ---------- */

  // Escapa caracteres especiales para que un texto del Modelo
  // nunca rompa el HTML (por ejemplo, un "<" dentro de una frase).
  esc(texto) {
    const reemplazos = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return String(texto).replace(/[&<>"']/g, (c) => reemplazos[c]);
  },

  // Igual que esc(), pero convierte "\n" en un salto de línea <br>.
  escConSaltos(texto) {
    return this.esc(texto).replace(/\n/g, "<br>");
  },


  /* ---------- Íconos (SVG de línea) ----------
     Los nombres coinciden con el campo "icono" del Modelo. */
  trazosIconos: {
    reloj: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
    rayo: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    gota: '<path d="M12 2.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    grafica: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    llama: '<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z"/>',
    copo: '<path d="M12 2v20M4.9 6l14.2 12M19.1 6 4.9 18"/>'
  },

  icono(nombre) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + this.trazosIconos[nombre] + "</svg>";
  },

  iconoWhatsApp:
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.9 1 3.9.8a3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.5z"/></svg>',


  /* ---------- Componentes reutilizables ---------- */

  // Botón de WhatsApp. "variante" puede ser "" (verde) o "btn--blanco".
  botonWhatsApp(m, texto, variante = "") {
    return `
      <a class="btn btn--whatsapp ${variante}" href="${this.esc(m.enlaceWhatsApp())}" target="_blank" rel="noopener">
        ${this.iconoWhatsApp}${this.esc(texto)}
      </a>`;
  },


  /* ---------- Secciones (en el orden en que aparecen) ---------- */

  encabezado(m) {
    const enlaces = m.menu
      .map((e) => `<a href="#${this.esc(e.ancla)}">${this.esc(e.texto)}</a>`)
      .join("");

    return `
      <header class="encabezado">
        <div class="contenedor">
          <a href="#inicio" class="marca">
            <img src="${this.esc(m.empresa.logo)}" alt="">
            <span>${this.esc(m.empresa.nombreCorto)} <span class="marca__resto">${this.esc(m.empresa.nombreResto)}</span></span>
          </a>
          <nav class="menu" aria-label="Menú principal">
            ${enlaces}
            <a href="#contacto" class="menu__contacto">Contacto</a>
          </nav>
        </div>
      </header>`;
  },

  portada(m) {
    return `
      <section id="inicio" class="portada">
        <div class="contenedor">
          <p class="portada__frase">${this.esc(m.portada.fraseCorta)}</p>
          <h1 class="portada__titulo">${this.esc(m.portada.titulo)}</h1>
          <p class="portada__intro">${this.esc(m.portada.intro)}</p>
        </div>
      </section>`;
  },

  // Franja de dos colores con el logo 3D. Las capas del canto de la
  // moneda las agrega el Controlador (ver animarMoneda).
  franja(m) {
    const logo = this.esc(m.empresa.logo);
    return `
      <section class="franja" aria-label="Logo y accesos rápidos">
        <div class="contenedor">
          <a href="#servicios" class="btn btn--blanco">¿Qué incluye?</a>
          <div class="moneda-marco">
            <button type="button" class="moneda" id="moneda" aria-label="Logo ${this.esc(m.nombreCompleto())}. Clic para girar">
              <span class="moneda__brillo"></span>
              <span class="moneda__cuerpo" id="monedaCuerpo">
                <span class="moneda__cara moneda__cara--atras"><img src="${logo}" alt=""></span>
                <span class="moneda__cara moneda__cara--frente">
                  <img src="${logo}" alt="">
                  <span class="moneda__reflejo" id="monedaReflejo"></span>
                </span>
              </span>
            </button>
          </div>
          ${this.botonWhatsApp(m, "Cotizar por WhatsApp", "btn--blanco")}
        </div>
      </section>`;
  },

  beneficios(m) {
    const b = m.beneficios;
    const tarjetas = b.items.map((item) => `
      <article class="tarjeta">
        <div class="icono icono--${item.tono}">${this.icono(item.icono)}</div>
        <h3>${this.esc(item.titulo)}</h3>
        <p>${this.esc(item.texto)}</p>
      </article>`).join("");

    return `
      <section id="beneficios" class="seccion">
        <div class="contenedor">
          <h2 class="titulo-seccion centrado">${this.esc(b.titulo)}</h2>
          <p class="subtitulo centrado">${this.esc(b.subtitulo)}</p>
          <div class="beneficios__grid">${tarjetas}</div>
        </div>
      </section>`;
  },

  paneles(m) {
    const paneles = m.paneles.map((p) => `
      <article class="panel panel--${p.tono}">
        <span class="panel__etiqueta">${this.esc(p.etiqueta)}</span>
        <h2>${this.escConSaltos(p.titulo)}</h2>
        <p>${this.esc(p.texto)}</p>
      </article>`).join("");

    return `<section class="paneles" aria-label="Líneas de servicio">${paneles}</section>`;
  },

  servicios(m) {
    const s = m.servicios;
    const bloques = s.items.map((servicio) => {
      const tareas = servicio.tareas.map((t) => `<li>${this.esc(t)}</li>`).join("");
      return `
        <article class="servicio servicio--${servicio.tono}">
          <div class="servicio__info">
            <span class="servicio__etiqueta">${this.icono(servicio.icono)}${this.esc(servicio.nombre)}</span>
            <p class="servicio__descripcion">${this.esc(servicio.descripcion)}</p>
          </div>
          <ul class="servicio__tareas">${tareas}</ul>
        </article>`;
    }).join("");

    return `
      <section id="servicios" class="seccion">
        <div class="contenedor">
          <h2 class="titulo-seccion">${this.esc(s.titulo)}</h2>
          <div class="servicios__lista">${bloques}</div>
          <p class="servicios__nota">${this.esc(s.nota)}</p>
        </div>
      </section>`;
  },

  nosotros(m) {
    const n = m.nosotros;
    return `
      <section id="nosotros" class="seccion nosotros">
        <div class="contenedor">
          <h2 class="titulo-seccion centrado">${this.esc(n.titulo)}</h2>
          <p class="subtitulo centrado" style="margin-bottom: 0;">${this.esc(n.eslogan)}</p>
          <div class="nosotros__grid">
            <article class="nosotros__tarjeta nosotros__tarjeta--calor">
              <span class="nosotros__etiqueta">NUESTRA MISIÓN</span>
              <p>${this.esc(n.mision)}</p>
            </article>
            <article class="nosotros__tarjeta nosotros__tarjeta--frio">
              <span class="nosotros__etiqueta">NUESTRA VISIÓN</span>
              <p>${this.esc(n.vision)}</p>
            </article>
          </div>
        </div>
      </section>`;
  },

  compromiso(m) {
    const c = m.compromiso;
    const items = c.items.map((item, i) => `
      <article class="compromiso">
        <span class="compromiso__numero">${String(i + 1).padStart(2, "0")}</span>
        <h3>${this.esc(item.titulo)}</h3>
        <p>${this.esc(item.texto)}</p>
      </article>`).join("");

    return `
      <section id="compromiso" class="seccion">
        <div class="contenedor">
          <h2 class="titulo-seccion centrado">${this.esc(c.titulo)}</h2>
          <p class="subtitulo centrado">${this.esc(c.subtitulo)}</p>
          <div class="compromiso__grid">${items}</div>
        </div>
      </section>`;
  },

  contacto(m) {
    const c = m.contacto;
    const t = m.contactoTextos;
    return `
      <section id="contacto" class="seccion contacto">
        <div class="contenedor">
          <div class="contacto__caja">
            <div class="contacto__texto">
              <h2>${this.esc(t.titulo)}</h2>
              <p>${this.esc(t.texto)}</p>
              ${this.botonWhatsApp(m, "Escribir por WhatsApp")}
            </div>
            <div class="contacto__datos">
              <a class="dato" href="tel:${this.esc(c.telefonoLink)}">
                <span class="dato__etiqueta">TELÉFONO</span>${this.esc(c.telefonoTexto)}
              </a>
              <a class="dato" href="mailto:${this.esc(c.correo)}">
                <span class="dato__etiqueta">CORREO</span>${this.esc(c.correo)}
              </a>
              <div class="dato">
                <span class="dato__etiqueta">DIRECCIÓN</span>${this.esc(c.direccion)}
              </div>
            </div>
          </div>
        </div>
      </section>`;
  },

  pie(m) {
    const anio = new Date().getFullYear();
    const eslogan = m.nosotros.eslogan.replace(/\.$/, ""); // sin el punto final
    return `
      <footer class="pie">
        <div class="contenedor">
          <span>© ${anio} ${this.esc(m.nombreCompleto())} · ${this.esc(eslogan)}</span>
          <span>${this.esc(m.empresa.ciudad)}</span>
        </div>
      </footer>`;
  },


  /* ---------- Página completa ----------
     Aquí se define el ORDEN de las secciones. */
  pagina(m) {
    return [
      this.encabezado(m),
      "<main>",
      this.portada(m),
      this.franja(m),
      this.beneficios(m),
      this.paneles(m),
      this.servicios(m),
      this.nosotros(m),
      this.compromiso(m),
      this.contacto(m),
      "</main>",
      this.pie(m)
    ].join("");
  }
};
