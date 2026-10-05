/* ==========================================================
   DATOS.JS  —  ESTE ES EL ÚNICO ARCHIVO QUE TIENES QUE EDITAR
   Cambia los textos entre comillas "..." por los tuyos.
   Cuidado: no borres las comillas, las comas ni las llaves.
   ========================================================== */

const DATOS = {

  // --- Nombres ---
  suNombre: "Mi amor",          // Cómo le dices a ella (ej. "Valeria")
  tuNombre: "Tu nombre",        // Tu nombre, aparece en la firma final

  // --- Fecha en que empezaron (año-mes-día) ---
  // Ejemplo: 14 de febrero de 2024 → "2024-02-14T00:00:00"
  fechaInicio: "2024-02-14T00:00:00",

  // --- Mensaje que se escribe solo al abrir la página ---
  mensajeInicial:
    "Desde que llegaste a mi vida, todo tiene más color. " +
    "Hice esta página con mucho cariño, porque quiero que sepas " +
    "lo importante que eres para mí.",

  // --- Música (opcional) ---
  // Pon un archivo de audio en esta carpeta y escribe su nombre aquí.
  // También puedes cargar una canción con el botón de la nube.
  // Si todavía no tienes un archivo de música, deja las comillas vacías.
  musica: "",

  // --- Línea de tiempo: sus recuerdos (agrega o quita los que quieras) ---
  recuerdos: [
    {
      fecha: "El día que nos conocimos",
      titulo: "Todo empezó",
      texto: "No sabía que ese día iba a cambiar mi vida para siempre."
    },
    {
      fecha: "Nuestra primera cita",
      titulo: "Nervios y sonrisas",
      texto: "Me acuerdo de lo nervioso que estaba… y de lo bonita que te veías."
    },
    {
      fecha: "El día que fuimos novios",
      titulo: "Nuestro mejor sí",
      texto: "El día en que le dije sí a la mejor decisión de mi vida."
    },
    {
      fecha: "Hoy",
      titulo: "Y lo que viene…",
      texto: "Quiero seguir sumando recuerdos contigo, todos los días."
    }
  ],

  // --- Razones por las que la quieres (cada una es una tarjeta) ---
  razones: [
    "Porque tu risa me arregla hasta el peor día.",
    "Porque contigo puedo ser yo mismo.",
    "Porque me haces querer ser mejor persona.",
    "Porque tu abrazo se siente como estar en casa.",
    "Porque eres mi lugar favorito en el mundo.",
    "Porque aun en lo simple, contigo todo es especial."
  ],

  // --- Fotos (pon tus fotos en una carpeta llamada "fotos") ---
  // Si una foto no existe todavía, se muestra un corazón en su lugar.
  fotos: [
    { src: "fotos/foto1.jpg", texto: "Nuestro primer viaje" },
    { src: "fotos/foto2.jpg", texto: "Ese día tan divertido" },
    { src: "fotos/foto3.jpg", texto: "Mi sonrisa favorita" }
  ],

  // --- La gran pregunta ---
  pregunta: "¿Quieres seguir escribiendo esta historia conmigo?",

  // --- Mensaje final cuando ella dice que sí ---
  respuestaSi:
    "Sabía que dirías que sí 💖 Gracias por existir, por quedarte " +
    "y por hacerme tan feliz. Te amo, hoy y siempre."
};
