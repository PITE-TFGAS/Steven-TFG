// core/functionalities/clickIndebido.js
function inicializarClicNoInteractivo() {
  const mensajeErrorNoInteractivo = document.createElement("div");
  mensajeErrorNoInteractivo.id = "mensajeNoInteractivo";
  mensajeErrorNoInteractivo.className = "mensajeErrorNoInteractivo";
  document.body.appendChild(mensajeErrorNoInteractivo);
  Object.assign(mensajeErrorNoInteractivo.style, {
    position: "fixed",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#ffdddd",
    color: "#d8000c",
    padding: "10px",
    border: "1px solid #d8000c",
    borderRadius: "4px",
    zIndex: "1000",
    display: "none",
    visibility: "visible"
  });
  const elementosInteractivos = [
    "input",
    "select",
    "textarea",
    "button",
    "a",
    "details",
    "[tabindex]",
    '[contenteditable="true"]'
  ];
  function resaltarElementos() {
    const elementos = document.querySelectorAll(elementosInteractivos.join(","));
    elementos.forEach((el) => el.classList.add("highlight"));
    setTimeout(() => {
      elementos.forEach((el) => el.classList.remove("highlight"));
    }, 2e3);
  }
  document.addEventListener("click", (event) => {
    const esInteractivo = event.target.closest(elementosInteractivos.join(","));
    if (!esInteractivo) {
      mostrarMensaje("\u2757 Se ha hecho clic en un lugar no permitido");
      resaltarElementos();
    }
  });
  function mostrarMensaje(texto) {
    mensajeErrorNoInteractivo.textContent = texto;
    mensajeErrorNoInteractivo.style.display = "block";
    setTimeout(() => {
      mensajeErrorNoInteractivo.style.display = "none";
    }, 2e3);
  }
  const style = document.createElement("style");
  style.textContent = `
    .highlight {
      outline: 2px solid rgb(52, 167, 255);
      transition: outline 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}

// trainings/caixabank/mensajesAyuda.js
var mensajesAyuda = [
  "\u{1F4A1} Bienvenido a Caixabank. Un portal web bancario de La Caixa.",
  "\u{1F510} Ingresa tu nombre de usuario y contrase\xF1a para entrar en CaixaBank"
];
var mensajesAyuda_default = mensajesAyuda;

// trainings/ruralvia/mensajesAyuda.js
var mensajesAyuda2 = [
  "\u{1F3E6} Bienvenido a la banca digital de Cajasiete.",
  "\u{1F511} Introduce tu usuario y contrase\xF1a para acceder a Ruralv\xEDa."
];
var mensajesAyuda_default2 = mensajesAyuda2;

// trainings/santander/mensajesAyuda.js
var mensajesAyuda3 = [
  "\u{1F4A1} Esto es Banco Santander. Un portal web bancario.",
  "\u{1F510} Introduce tu DNI y tu contrase\xF1a en el inicio de sesi\xF3n de Santander."
];
var mensajesAyuda_default3 = mensajesAyuda3;

// core/functionalities/enlazarMensajesAyuda.js
var mensajesPorSitio = {
  "caixabank": mensajesAyuda_default,
  "ruralvia": mensajesAyuda_default2,
  "santander": mensajesAyuda_default3
};
function obtenerMensajesAyudaPorSitio() {
  const hostname = window.location.hostname.toLowerCase();
  for (const clave in mensajesPorSitio) {
    if (hostname.includes(clave)) {
      return mensajesPorSitio[clave];
    }
  }
  mensajeSinImplementar = "Esta p\xE1gina a\xFAn no ha sido revisada, por lo que se mostrar\xE1 un mensaje gen\xE9rico de ayuda. ";
  return [
    mensajeSinImplementar + "\u{1F449} Prueba a rellenar los campos de texto.",
    mensajeSinImplementar + "\u26A0\uFE0F Aseg\xFArate de introducir correctamente tus datos.",
    mensajeSinImplementar + '\u2139\uFE0F Si olvidaste tu contrase\xF1a, puedes restablecerla usando el bot\xF3n "\xBFOlvidaste tu contrase\xF1a?".',
    mensajeSinImplementar + '\u2705 Para continuar, haz clic en el bot\xF3n "Enviar" despu\xE9s de completar todos los campos requeridos.',
    mensajeSinImplementar + "\u{1F4A1} Prueba a ir al comienzo de la p\xE1gina y leer con detenimiento los datos que se piden."
  ];
}

// core/functionalities/mostrarMensajeAyuda.js
async function inicializarMensajesAyuda() {
  const mensajesAyuda4 = await obtenerMensajesAyudaPorSitio();
  console.log("\u{1F4E6} Mensajes cargados:", mensajesAyuda4);
  const mensajeAyuda = document.createElement("div");
  mensajeAyuda.id = "mensajeAyuda";
  mensajeAyuda.innerHTML = `
    <p>\xBFNecesitas ayuda?</p>
    <button id="aceptarAyuda">S\xED</button>
    <button id="negarAyuda">No</button>
  `;
  document.body.appendChild(mensajeAyuda);
  const mensajePersistente = document.createElement("div");
  mensajePersistente.className = "textoAyuda";
  mensajePersistente.innerHTML = `
    <p id="contenidoMensajeAyuda"></p>
    <button id="cerrarAyuda">Cerrar</button>
  `;
  document.body.appendChild(mensajePersistente);
  Object.assign(mensajeAyuda.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#97dbe5",
    color: "#094d6f",
    padding: "10px",
    border: "1px solid #31a4de",
    borderRadius: "5px",
    zIndex: "1000",
    display: "none"
  });
  Object.assign(mensajePersistente.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#97dbe5",
    color: "#094d6f",
    padding: "10px",
    border: "1px solid #31a4de",
    borderRadius: "5px",
    zIndex: "1000",
    display: "none"
  });
  let tiempoInactivo;
  function resetearTemporizador() {
    clearTimeout(tiempoInactivo);
    tiempoInactivo = setTimeout(() => {
      mensajeAyuda.style.display = "block";
    }, 5e3);
  }
  document.addEventListener("mousemove", resetearTemporizador);
  document.addEventListener("keydown", resetearTemporizador);
  document.addEventListener("click", resetearTemporizador);
  resetearTemporizador();
  function mostrarMensajeAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * mensajesAyuda4.length);
    const contenidoMensaje = document.getElementById("contenidoMensajeAyuda");
    contenidoMensaje.textContent = mensajesAyuda4[indiceAleatorio];
    mensajePersistente.style.display = "block";
  }
  document.getElementById("aceptarAyuda").addEventListener("click", () => {
    mensajeAyuda.style.display = "none";
    mostrarMensajeAleatorio();
  });
  document.getElementById("negarAyuda").addEventListener("click", () => {
    mensajeAyuda.style.display = "none";
  });
  document.getElementById("cerrarAyuda").addEventListener("click", () => {
    mensajePersistente.style.display = "none";
  });
}

// core/functionalities/navegacionSegura.js
async function verificarSeguridadPagina() {
  const mensajeSeguridad = document.createElement("div");
  mensajeSeguridad.id = "mensajeSeguridad";
  document.body.appendChild(mensajeSeguridad);
  Object.assign(mensajeSeguridad.style, {
    position: "fixed",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgb(211, 162, 226)",
    color: "rgb(83, 23, 101)",
    padding: "10px",
    border: "1px solid rgb(158, 56, 189)",
    borderRadius: "5px",
    zIndex: "1000",
    display: "none"
  });
  const cerrarSeguridad = document.createElement("button");
  cerrarSeguridad.textContent = "Cerrar";
  Object.assign(cerrarSeguridad.style, {
    marginLeft: "10px",
    padding: "5px",
    backgroundColor: "rgb(158, 56, 189)",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer"
  });
  mensajeSeguridad.appendChild(cerrarSeguridad);
  async function verificarPaginaSegura() {
    const url = window.location.href;
    const apiKey = "AIzaSyAcxSGd2kIeufhYlDCI_9EfjZk8tGT1p_M";
    try {
      const respuesta = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
          client: {
            clientId: "tu-app",
            clientVersion: "1.0"
          },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
          }
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const datos = await respuesta.json();
      if (Object.keys(datos).length !== 0) {
        mensajeSeguridad.textContent = "\u26A0\uFE0F La p\xE1gina podr\xEDa ser peligrosa.";
        mensajeSeguridad.appendChild(cerrarSeguridad);
        mensajeSeguridad.style.display = "block";
      } else {
        mensajeSeguridad.textContent = "\u2705 La p\xE1gina es segura.";
        mensajeSeguridad.appendChild(cerrarSeguridad);
        mensajeSeguridad.style.display = "block";
        setTimeout(() => {
          mensajeSeguridad.style.display = "none";
        }, 3e3);
      }
    } catch (error) {
      console.error("Error al verificar la seguridad de la p\xE1gina:", error);
    }
  }
  cerrarSeguridad.addEventListener("click", () => {
    mensajeSeguridad.style.display = "none";
  });
  verificarPaginaSegura();
}

// core/content.js
inicializarClicNoInteractivo();
inicializarMensajesAyuda();
verificarSeguridadPagina();
