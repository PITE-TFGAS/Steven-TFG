/**
* MENSAJES DE AYUDA
*
* Muestra un mensaje de ayuda después de 5 segundos de inactividad.
* Permite al usuario aceptar o rechazar la ayuda.
* Muestra un mensaje persistente con información útil.
*/

import { obtenerMensajesAyudaPorSitio } from './enlazarMensajesAyuda.js';

export async function inicializarMensajesAyuda() {
  // Lista de mensajes de ayuda
  const mensajesAyuda = await obtenerMensajesAyudaPorSitio();
  console.log("📦 Mensajes cargados:", mensajesAyuda);

  
  // Crear el contenedor para el mensaje de ayuda
  const mensajeAyuda = document.createElement('div');
  mensajeAyuda.id = 'mensajeAyuda';
  mensajeAyuda.innerHTML = `
    <p>¿Necesitas ayuda?</p>
    <button id="aceptarAyuda">Sí</button>
    <button id="negarAyuda">No</button>
  `;
  document.body.appendChild(mensajeAyuda);
  
  // Crear el mensaje de ayuda persistente
  const mensajePersistente = document.createElement('div');
  mensajePersistente.className = 'textoAyuda';
  mensajePersistente.innerHTML = `
    <p id="contenidoMensajeAyuda"></p>
    <button id="cerrarAyuda">Cerrar</button>
  `;
  document.body.appendChild(mensajePersistente);
  
  // Estilo para asegurar visibilidad y orden en pantalla
  Object.assign(mensajeAyuda.style, {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#97dbe5',
    color: '#094d6f',
    padding: '10px',
    border: '1px solid #31a4de',
    borderRadius: '5px',
    zIndex: '1000',
    display: 'none'
  });
  
  Object.assign(mensajePersistente.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#97dbe5',
    color: '#094d6f',
    padding: '10px',
    border: '1px solid #31a4de',
    borderRadius: '5px',
    zIndex: '1000',
    display: 'none'
  });
  
  // Detectar inactividad
  let tiempoInactivo;
  
  function resetearTemporizador() {
    clearTimeout(tiempoInactivo);
    tiempoInactivo = setTimeout(() => {
      mensajeAyuda.style.display = 'block'; // Mostrar mensaje tras 5 segundos de inactividad
    }, 5000);
  }
  
  document.addEventListener('mousemove', resetearTemporizador);
  document.addEventListener('keydown', resetearTemporizador);
  document.addEventListener('click', resetearTemporizador);
  
  resetearTemporizador(); // Iniciar temporizador al cargar la página
  
  // Mostrar mensaje de ayuda aleatorio
  function mostrarMensajeAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * mensajesAyuda.length);
    const contenidoMensaje = document.getElementById('contenidoMensajeAyuda');
    contenidoMensaje.textContent = mensajesAyuda[indiceAleatorio];
    mensajePersistente.style.display = 'block';
  }
  
  // Evento para aceptar ayuda
  document.getElementById('aceptarAyuda').addEventListener('click', () => {
    mensajeAyuda.style.display = 'none';
    mostrarMensajeAleatorio();
  });
  
  // Evento para rechazar ayuda
  document.getElementById('negarAyuda').addEventListener('click', () => {
    mensajeAyuda.style.display = 'none';
  });
  
  // Evento para cerrar el mensaje persistente
  document.getElementById('cerrarAyuda').addEventListener('click', () => {
    mensajePersistente.style.display = 'none';
  });
}