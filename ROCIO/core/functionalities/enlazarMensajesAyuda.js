
// ⚠️ AUTO-GENERADO por generarEnlacesAyuda.js. No editar manualmente.
import mensajes_0 from '../../trainings/caixabank/mensajesAyuda.js';
import mensajes_1 from '../../trainings/ruralvia/mensajesAyuda.js';
import mensajes_2 from '../../trainings/santander/mensajesAyuda.js';

const mensajesPorSitio = {
  'caixabank': mensajes_0,
  'ruralvia': mensajes_1,
  'santander': mensajes_2,
};

export function obtenerMensajesAyudaPorSitio() {
  const hostname = window.location.hostname.toLowerCase();

  for (const clave in mensajesPorSitio) {
    if (hostname.includes(clave)) {
      return mensajesPorSitio[clave];
    }
  }

  mensajeSinImplementar = 'Esta página aún no ha sido revisada, por lo que se mostrará un mensaje genérico de ayuda. ';

  return [
    mensajeSinImplementar + '👉 Prueba a rellenar los campos de texto.',
    mensajeSinImplementar + '⚠️ Asegúrate de introducir correctamente tus datos.',
    mensajeSinImplementar + 'ℹ️ Si olvidaste tu contraseña, puedes restablecerla usando el botón "¿Olvidaste tu contraseña?".',
    mensajeSinImplementar + '✅ Para continuar, haz clic en el botón "Enviar" después de completar todos los campos requeridos.',
    mensajeSinImplementar + '💡 Prueba a ir al comienzo de la página y leer con detenimiento los datos que se piden.'
  ];
}
