const indicacion = document.getElementById('indicacion');
const dni = document.getElementById('DNI');
const contrasenya = document.getElementById('Contrasenya');
const botonAcceder = document.getElementById('botonAcceder');

window.addEventListener('load', () => {
  indicacion.style.top = '32%';
  indicacion.style.left = '15.7%';
  indicacion.querySelector('.texto').textContent = 'Introduce el DNI';
});

// Paso 1 -> Paso 2
dni.addEventListener('input', () => {
  if (dni.value.trim().length > 3) {
    indicacion.style.top = '44%';
    indicacion.querySelector('.texto').textContent = 'Ahora introduce la contraseña';
  }
});

// Paso 2 -> Paso 3
contrasenya.addEventListener('input', () => {
  if (contrasenya.value.trim().length > 3) {
    indicacion.style.top = '56%';
    indicacion.style.left = '14%';
    indicacion.querySelector('.texto').textContent = 'Haz clic para continuar';
  }
});