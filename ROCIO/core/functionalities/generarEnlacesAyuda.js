/**
 * Genera un archivo enlazarMensajesAyuda.js que importa los mensajes de ayuda de cada sitio
 * y los enlaza a un objeto que se puede usar para obtener los mensajes de ayuda según el hostname.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Solución para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const interfacesPath = path.resolve(__dirname, '../../trainings');
const outputPath = path.resolve(__dirname, '../functionalities/enlazarMensajesAyuda.js');

const sitios = [];

function recorrerCarpetas(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      recorrerCarpetas(fullPath);
    } else if (entry.isFile() && entry.name === 'mensajesAyuda.js') {
      const relativePath = path.relative(path.join(__dirname, '../functionalities'), fullPath).replace(/\\/g, '/');
      const nombreSitio = path.basename(path.dirname(fullPath)).toLowerCase();

      sitios.push({ nombreSitio, importPath: relativePath });
    }
  });
}

recorrerCarpetas(interfacesPath);

const imports = sitios.map((s, i) => `import mensajes_${i} from '${s.importPath}';`).join('\n');
const mapeo = sitios.map((s, i) => `  '${s.nombreSitio}': mensajes_${i},`).join('\n');

const contenido = `
// ⚠️ AUTO-GENERADO por generarEnlacesAyuda.js. No editar manualmente.
${imports}

const mensajesPorSitio = {
${mapeo}
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
`;

fs.writeFileSync(outputPath, contenido);
console.log(`✅ Archivo enlazarMensajesAyuda.js generado con ${sitios.length} sitio(s).`);
