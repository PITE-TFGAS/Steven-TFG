/**
 * MENSAJE DE SEGURIDAD DE LA PÁGINA
 * 
 * Verifica la seguridad de la página utilizando la API de Google Safe Browsing.
 * Muestra un mensaje de advertencia si la página es potencialmente peligrosa.
 */
// Crear contenedor para mostrar el mensaje de seguridad
export async function verificarSeguridadPagina() {
  const mensajeSeguridad = document.createElement('div');
  mensajeSeguridad.id = 'mensajeSeguridad';
  document.body.appendChild(mensajeSeguridad);

  Object.assign(mensajeSeguridad.style, {
    position: 'fixed',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgb(211, 162, 226)',
    color: 'rgb(83, 23, 101)',
    padding: '10px',
    border: '1px solid rgb(158, 56, 189)',
    borderRadius: '5px',
    zIndex: '1000',
    display: 'none'
  });

  // Crear botón para cerrar el mensaje
  const cerrarSeguridad = document.createElement('button');
  cerrarSeguridad.textContent = 'Cerrar';

  Object.assign(cerrarSeguridad.style, {
    marginLeft: '10px',
    padding: '5px',
    backgroundColor: 'rgb(158, 56, 189)',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  });
  mensajeSeguridad.appendChild(cerrarSeguridad);

  // Función para verificar la seguridad de la página
  async function verificarPaginaSegura() {
    const url = window.location.href;
    const apiKey = 'AIzaSyAcxSGd2kIeufhYlDCI_9EfjZk8tGT1p_M';
    
    try {
      const respuesta = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
          client: {
            clientId: 'tu-app',
            clientVersion: '1.0'
          },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }]
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const datos = await respuesta.json();

      if (Object.keys(datos).length !== 0) {
        // Página potencialmente peligrosa
        mensajeSeguridad.textContent = '⚠️ La página podría ser peligrosa.';
        mensajeSeguridad.appendChild(cerrarSeguridad);
        mensajeSeguridad.style.display = 'block';
      } else {
        // Página segura
        mensajeSeguridad.textContent = '✅ La página es segura.';
        mensajeSeguridad.appendChild(cerrarSeguridad);
        mensajeSeguridad.style.display = 'block';

        // Ocultar el mensaje después de 3 segundos si la página es segura
        setTimeout(() => {
          mensajeSeguridad.style.display = 'none';
        }, 3000);
      }
    } catch (error) {
      console.error('Error al verificar la seguridad de la página:', error);
    }
  }

  // Evento para cerrar el mensaje de seguridad manualmente
  cerrarSeguridad.addEventListener('click', () => {
    mensajeSeguridad.style.display = 'none';
  });

  // Llamar a la función al cargar la página
  verificarPaginaSegura();
}