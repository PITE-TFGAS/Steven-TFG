/**  
* CONTENEDOR PARA EL MENSAJE DE CLICK INCORRECTO
*
* Crea un contenedor para mostrar un mensaje de error cuando se hace clic en un lugar no interactivo.
* Resalta los elementos interactivos en la página para indicar al usuario dónde puede hacer clic.
*/
export function inicializarClicNoInteractivo() {
  // Crear el contenedor para el mensaje de error
  const mensajeErrorNoInteractivo = document.createElement('div');
  mensajeErrorNoInteractivo.id = 'mensajeNoInteractivo';
  mensajeErrorNoInteractivo.className = 'mensajeErrorNoInteractivo';
  document.body.appendChild(mensajeErrorNoInteractivo);

  // Aplicar estilos directamente desde el script para asegurar visibilidad
  Object.assign(mensajeErrorNoInteractivo.style, {
    position: 'fixed',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffdddd',
    color: '#d8000c',
    padding: '10px',
    border: '1px solid #d8000c',
    borderRadius: '4px',
    zIndex: '1000',
    display: 'none',
    visibility: 'visible'
  });

  // Lista de elementos interactivos
  const elementosInteractivos = [
    'input',
    'select',
    'textarea',
    'button',
    'a',           
    'details',      
    '[tabindex]',   
    '[contenteditable="true"]'
  ];

  // Función para resaltar los elementos interactivos
  function resaltarElementos() {
    const elementos = document.querySelectorAll(elementosInteractivos.join(','));
    
    // Añadir la clase highlight
    elementos.forEach(el => el.classList.add('highlight'));

    // Eliminar el resaltado después de 2 segundos
    setTimeout(() => {
      elementos.forEach(el => el.classList.remove('highlight'));
    }, 2000);
  }

  // Detectar clic en el documento
  document.addEventListener('click', (event) => {
    const esInteractivo = event.target.closest(elementosInteractivos.join(','));
    
    if (!esInteractivo) {
      mostrarMensaje('❗ Se ha hecho clic en un lugar no permitido');
      resaltarElementos(); // Resaltar elementos interactivos
    }
  });

  // Función para mostrar el mensaje en pantalla
  function mostrarMensaje(texto) {
    mensajeErrorNoInteractivo.textContent = texto;
    mensajeErrorNoInteractivo.style.display = 'block';

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      mensajeErrorNoInteractivo.style.display = 'none';
    }, 2000);
  }

  // Crear los estilos para resaltar los elementos interactivos
  const style = document.createElement('style');
  style.textContent = `
    .highlight {
      outline: 2px solid rgb(52, 167, 255);
      transition: outline 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}