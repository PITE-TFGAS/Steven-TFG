window.addEventListener('DOMContentLoaded', () => {
  const importe = document.getElementById('Importe');
  const indicacion = document.querySelector('.indicacion');
  const textoIndicacion = indicacion.querySelector('.texto p');

  importe.addEventListener('input', (event) => {
    textoIndicacion.innerHTML = 'Pulsa el botón<br>de Continuar';
    // Opcional: mover la flecha junto al botón pulsado
    indicacion.style.top = '65.5%'; // Ajusta la posición vertical
    indicacion.style.left = '71%'; // Ajusta la posición horizontal
    const flecha = indicacion.querySelector('.flecha');
    flecha.textContent = '↓';
  });
});