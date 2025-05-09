window.addEventListener('DOMContentLoaded', () => {
  const botonesContainer = document.getElementById('botonesTipoEnvio');
  const indicaciones = document.querySelectorAll('.indicacion');

  botonesContainer.addEventListener('click', (event) => {
    const botonPulsado = event.target;

    // Verifica si se ha hecho click en un botón dentro de envío normal o inmediato
    if (botonPulsado.closest('#botonesEnvioNormal') || botonPulsado.closest('#botonesEnvioInmediato')) {
      // Cambiar texto en todas las indicaciones
      indicaciones.forEach((indicacion) => {
        const texto = indicacion.querySelector('.texto p');
        texto.innerHTML = 'Pulsa el botón<br>de Continuar';

        // Mover flecha y cambiar dirección
        const flecha = indicacion.querySelector('.flecha');
        flecha.textContent = '↓';
        indicacion.style.top = '60%';
        indicacion.style.left = '65%';
      });
    }
  });
});