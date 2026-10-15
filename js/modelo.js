/* =====================================================================
   MODELO — Datos de la empresa
   ---------------------------------------------------------------------
   Este archivo contiene TODO el contenido de la página: textos,
   datos de contacto, servicios, misión, visión, etc.

   Para cambiar algo que se lee en la página, edítalo aquí.
   No hace falta tocar la Vista ni el Controlador.

   Reglas:
   - Los textos van entre comillas "...".
   - Cada elemento de una lista termina en coma, excepto el último.
   - "\n" dentro de un texto significa salto de línea.
   ===================================================================== */

const Modelo = {

  /* ---------- Empresa ---------- */
  empresa: {
    nombreCorto: "JW",
    nombreResto: "Soluciones Industriales",
    ciudad: "Bogotá, Colombia",
    logo: "img/logo-jw.png"
  },

  /* ---------- Contacto ----------
     whatsapp: indicativo 57 + celular, sin espacios, sin "+" ni guiones. */
  contacto: {
    whatsapp: "573011329360",
    mensajeWhatsApp: "Hola, quiero cotizar mantenimiento de mis equipos",
    telefonoTexto: "301 132 93 60",   // como se ve escrito en la página
    telefonoLink: "+573011329360",    // para llamar al tocarlo en el celular
    correo: "jwserviciosindustriales@gmail.com",
    direccion: "Diagonal 5F Bis A # 43B - 51, Bogotá"
  },

  /* ---------- Menú superior ----------
     "ancla" debe coincidir con el id de la sección (ver vista.js). */
  menu: [
    { texto: "Servicios", ancla: "servicios" },
    { texto: "Nosotros", ancla: "nosotros" },
    { texto: "Compromiso", ancla: "compromiso" }
  ],

  /* ---------- Portada ---------- */
  portada: {
    fraseCorta: "Calor que funciona · Frío que conserva",
    titulo: "Más de 10 años cuidando cocinas industriales.",
    intro: "Mantenimiento preventivo de equipos calientes, refrigeración y congelación para restaurantes y cocinas industriales en Bogotá."
  },

  /* ---------- Beneficios ----------
     icono: reloj | rayo | gota | grafica | llama | copo
     tono:  calor (terracota) | frio (azul petróleo) */
  beneficios: {
    titulo: "Lo que gana tu negocio",
    subtitulo: "Anticipar fallas garantiza el funcionamiento diario de tu cocina.",
    items: [
      { icono: "reloj", tono: "calor", titulo: "Vida útil", texto: "Protege la inversión en tus equipos." },
      { icono: "rayo", tono: "frio", titulo: "Eficiencia", texto: "Mejor rendimiento en el día a día." },
      { icono: "gota", tono: "calor", titulo: "Inocuidad", texto: "Equipos limpios, alimentos seguros." },
      { icono: "grafica", tono: "frio", titulo: "Productividad", texto: "Calidad constante en tu servicio." }
    ]
  },

  /* ---------- Paneles Calor / Frío ---------- */
  paneles: [
    {
      tono: "calor",
      etiqueta: "CALOR",
      titulo: "Calor que\nfunciona.",
      texto: "Estufas, hornos, planchas y freidoras a gas, calibrados y sin fugas."
    },
    {
      tono: "frio",
      etiqueta: "FRÍO",
      titulo: "Frío que\nconserva.",
      texto: "Neveras, congeladores y cuartos fríos limpios y eficientes."
    }
  ],

  /* ---------- Qué hacemos en cada visita ---------- */
  servicios: {
    titulo: "Qué hacemos en cada visita",
    nota: "Incluye ajuste de estructuras si el equipo lo requiere. Escríbenos por WhatsApp y te enviamos tu cotización.",
    items: [
      {
        tono: "calor",
        icono: "llama",
        nombre: "Equipos calientes",
        descripcion: "Estufas, hornos, planchas y freidoras a gas.",
        tareas: [
          "Calibración de fistos",
          "Calibración de venturis",
          "Lubricación de válvulas",
          "Ajuste de presión de gas",
          "Revisión y corrección de fugas",
          "Limpieza de quemadores"
        ]
      },
      {
        tono: "frio",
        icono: "copo",
        nombre: "Refrigeración y congelación",
        descripcion: "Neveras, congeladores y cuartos fríos.",
        tareas: [
          "Lavado de cabinaje y condensadores",
          "Limpieza de bandeja del defrost",
          "Manguera de ruta de evaporación",
          "Conexiones eléctricas",
          "Limpieza de ventiladores",
          "Empaque de puertas"
        ]
      }
    ]
  },

  /* ---------- Quiénes somos ---------- */
  nosotros: {
    titulo: "Quiénes somos",
    eslogan: "Más de 10 años cuidando cocinas industriales.",
    mision: "Brindar mantenimiento preventivo a equipos calientes, de refrigeración y congelación, con personal experto que identifica fallas a tiempo, lleva un registro de cada servicio y asesora a los colaboradores de nuestros clientes, para que su negocio funcione con eficiencia, seguridad y calidad todos los días.",
    vision: "Ser el aliado técnico de referencia para restaurantes y cocinas industriales en Colombia, con un servicio preventivo que alargue la vida útil de los equipos, mejore su eficiencia y garantice la inocuidad de los alimentos."
  },

  /* ---------- Nuestro compromiso ----------
     El número (01, 02...) se pone solo según el orden. */
  compromiso: {
    titulo: "Nuestro compromiso",
    subtitulo: "Lo que puedes esperar de nosotros en cada visita.",
    items: [
      { titulo: "Personal experto", texto: "Técnicos con fuerte conocimiento en refrigeración y equipos calientes, que conocen a detalle cómo funciona tu cocina." },
      { titulo: "Registro de cada servicio", texto: "Llevamos el historial de mantenimiento de cada equipo para anticipar fallas antes de que aparezcan." },
      { titulo: "Asesoría a tu equipo", texto: "Enseñamos a tus colaboradores las medidas preventivas para mantener los equipos en perfecto estado." },
      { titulo: "A la medida de tu negocio", texto: "Adaptamos el servicio a tu operación y a tus horarios, para que tu cocina no se detenga." }
    ]
  },

  /* ---------- Textos del bloque de contacto ---------- */
  contactoTextos: {
    titulo: "Hablemos de tus equipos",
    texto: "Cuéntanos cuántos equipos tienes y te enviamos tu propuesta."
  },

  /* ---------- Datos calculados (no editar) ---------- */

  // Arma el enlace de WhatsApp con el número y el mensaje de arriba
  enlaceWhatsApp() {
    return "https://wa.me/" + this.contacto.whatsapp +
      "?text=" + encodeURIComponent(this.contacto.mensajeWhatsApp);
  },

  // Nombre completo de la empresa: "JW Soluciones Industriales"
  nombreCompleto() {
    return this.empresa.nombreCorto + " " + this.empresa.nombreResto;
  }
};
