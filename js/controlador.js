/* =====================================================================
   CONTROLADOR — Une el Modelo con la Vista y maneja la interacción
   ---------------------------------------------------------------------
   1. iniciar():       pinta la página con los datos del Modelo.
   2. animarMoneda():  hace girar el logo 3D, lo inclina con el mouse
                       y le da una vuelta completa al hacer clic.
   ===================================================================== */

const Controlador = {

  // Ajustes de la animación del logo 3D
  config: {
    capasCanto: 16,                  // grosor de la moneda (número de capas)
    separacionCapas: 1.6,            // px entre capas
    colorCantoInicio: [180, 85, 63], // terracota (RGB)
    colorCantoFin: [44, 82, 96],     // azul petróleo (RGB)
    velocidadGiro: 30,               // grados por segundo
    inclinacionMaxX: 40,             // grados al mover el mouse arriba/abajo
    inclinacionMaxY: 50,             // grados al mover el mouse a los lados
    suavizado: 0.12,                 // 0 a 1: qué tan rápido sigue al mouse
    suavizadoVuelta: 0.08            // qué tan rápida es la vuelta del clic
  },

  /* ---------- Arranque ---------- */
  iniciar() {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = Vista.pagina(Modelo);
    document.getElementById("favicon").href = Modelo.empresa.logo;

    this.animarMoneda();
  },

  /* ---------- Logo 3D ---------- */
  animarMoneda() {
    const moneda = document.getElementById("moneda");
    const cuerpo = document.getElementById("monedaCuerpo");
    const reflejo = document.getElementById("monedaReflejo");
    if (!moneda || !cuerpo || !reflejo) return;

    this.crearCanto(cuerpo);

    const cfg = this.config;
    const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inicio = performance.now();

    // Estado de la animación
    const estado = {
      mouseEncima: false,
      objetivoX: 0, objetivoY: 0,   // hacia dónde inclinar
      rotacionX: 8, rotacionY: 0,   // inclinación actual
      vueltaObjetivo: 0, vuelta: 0  // vuelta extra por clic
    };

    // Eventos del mouse
    moneda.addEventListener("mousemove", (evento) => {
      const caja = moneda.getBoundingClientRect();
      const x = (evento.clientX - caja.left) / caja.width - 0.5;  // -0.5 a 0.5
      const y = (evento.clientY - caja.top) / caja.height - 0.5;
      estado.objetivoX = -y * cfg.inclinacionMaxX;
      estado.objetivoY = x * cfg.inclinacionMaxY;
      estado.mouseEncima = true;
    });

    moneda.addEventListener("mouseleave", () => {
      estado.mouseEncima = false;
    });

    moneda.addEventListener("click", () => {
      estado.vueltaObjetivo += 360;
    });

    // Bucle de animación (≈60 cuadros por segundo)
    const dibujarCuadro = (ahora) => {
      const segundos = (ahora - inicio) / 1000;
      const giroAutomatico = reducirMovimiento ? 0 : segundos * cfg.velocidadGiro;

      const destinoX = estado.mouseEncima ? estado.objetivoX : 8;
      const destinoY = estado.mouseEncima ? estado.objetivoY : 0;
      estado.rotacionX += (destinoX - estado.rotacionX) * cfg.suavizado;
      estado.rotacionY += (destinoY - estado.rotacionY) * cfg.suavizado;
      estado.vuelta += (estado.vueltaObjetivo - estado.vuelta) * cfg.suavizadoVuelta;

      const anguloY = giroAutomatico + estado.rotacionY + estado.vuelta;
      cuerpo.style.transform =
        `rotateX(${estado.rotacionX.toFixed(2)}deg) rotateY(${anguloY.toFixed(2)}deg)`;

      // Reflejo de luz que se mueve con el giro
      const anguloLuz = Math.round(100 + anguloY * 1.4);
      reflejo.style.background =
        `linear-gradient(${anguloLuz}deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.55) 47%, rgba(255,255,255,0) 64%)`;

      requestAnimationFrame(dibujarCuadro);
    };

    requestAnimationFrame(dibujarCuadro);
  },

  // Crea las capas apiladas que forman el canto (grosor) de la moneda,
  // con un degradado de terracota a azul petróleo.
  crearCanto(cuerpo) {
    const cfg = this.config;
    const caraAtras = cuerpo.querySelector(".moneda__cara--atras");

    for (let i = 0; i < cfg.capasCanto; i++) {
      const avance = i / (cfg.capasCanto - 1);   // 0 a 1
      const color = cfg.colorCantoInicio.map((valor, canal) =>
        Math.round(valor + (cfg.colorCantoFin[canal] - valor) * avance)
      );

      const capa = document.createElement("span");
      capa.className = "moneda__capa";
      capa.style.background = `rgb(${color.join(",")})`;
      capa.style.transform = `translateZ(${-1 - i * cfg.separacionCapas}px)`;
      cuerpo.insertBefore(capa, caraAtras);
    }
  }
};


/* ---------- Punto de entrada ----------
   Se ejecuta cuando el HTML terminó de cargar. */
document.addEventListener("DOMContentLoaded", () => Controlador.iniciar());
