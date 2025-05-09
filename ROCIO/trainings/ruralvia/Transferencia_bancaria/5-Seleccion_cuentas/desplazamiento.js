window.addEventListener('DOMContentLoaded', () => {
  const botonesContainer = document.getElementById('botones');
  const indicacion = document.querySelector('.indicacion');
  const textoIndicacion = indicacion.querySelector('.texto p');

  botonesContainer.addEventListener('click', (event) => {
    const botonPulsado = event.target;

    if (botonPulsado.classList.contains('botonCuenta') || botonPulsado.classList.contains('botonTexto')) {
      textoIndicacion.innerHTML = 'Pulsa el botón<br>de Continuar';
    }

    indicacion.style.top = '71%'; // Ajusta la posición vertical
    indicacion.style.left = '71%'; // Ajusta la posición horizontal
    const flecha = indicacion.querySelector('.flecha');
    flecha.textContent = '↓';
  });
});