/**
 * AssetBase — recepción de solicitudes de demo en Google Sheets.
 *
 * Escribe una fila por cada lead que manda /api/demo.
 *
 * ── Instalación ────────────────────────────────────────────────────────
 *
 *  1. Crea una hoja de cálculo nueva en Google Sheets.
 *  2. Extensiones → Apps Script. IMPORTANTE que sea desde la hoja: el
 *     script queda "enlazado" a ella y por eso funciona
 *     getActiveSpreadsheet(). Un proyecto suelto de script.google.com NO
 *     encuentra la hoja.
 *  3. Pega este archivo completo, reemplazando lo que traiga por defecto.
 *  4. Configuración del proyecto (el engrane) → Propiedades del script →
 *     agrega una propiedad:
 *         TOKEN = una cadena larga y aleatoria
 *     La misma cadena va en DEMO_WEBHOOK_TOKEN del entorno de Vercel.
 *     Se guarda como propiedad y no aquí para que el secreto no viva en
 *     el código.
 *  5. Implementar → Nueva implementación → tipo "Aplicación web":
 *         Ejecutar como:       Yo
 *         Quién tiene acceso:  Cualquier usuario
 *     Google exige "cualquier usuario" para que un servidor externo pueda
 *     llamarlo — no hay forma de autenticar por OAuth desde aquí. Por eso
 *     el TOKEN del paso 4 no es opcional en la práctica.
 *  6. Copia la URL que termina en /exec y ponla en DEMO_WEBHOOK_URL.
 *
 *  Cada vez que cambies este código hay que crear una NUEVA versión de la
 *  implementación (Implementar → Administrar implementaciones → editar →
 *  Versión: nueva). Si no, la URL sigue sirviendo el código viejo — es el
 *  error más común con Apps Script.
 *
 * ── Prueba ─────────────────────────────────────────────────────────────
 *
 *  curl -X POST "https://script.google.com/macros/s/.../exec" \
 *    -H "content-type: application/json" \
 *    -d '{"token":"TU_TOKEN","nombre":"Prueba","empresa":"Prueba SA",
 *         "correo":"p@p.mx","telefono":"","usuarios":"1 a 5",
 *         "origen":"curl","recibido":"2026-01-01T00:00:00.000Z"}'
 */

var NOMBRE_HOJA = 'Leads';

var COLUMNAS = [
  'Recibido',
  'Empresa',
  'Nombre',
  'Correo',
  'Teléfono',
  'Usuarios',
  'Origen',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responder({ ok: false, error: 'sin cuerpo' });
    }

    var lead = JSON.parse(e.postData.contents);

    var esperado = PropertiesService.getScriptProperties().getProperty('TOKEN');
    if (esperado && lead.token !== esperado) {
      return responder({ ok: false, error: 'token invalido' });
    }

    hoja().appendRow([
      fechaLocal(lead.recibido),
      lead.empresa || '',
      lead.nombre || '',
      lead.correo || '',
      // El apóstrofo evita que Sheets se coma el cero inicial de la lada
      // y convierta "33 1234 5678" en un número.
      lead.telefono ? "'" + lead.telefono : '',
      lead.usuarios || '',
      lead.origen || '',
    ]);

    return responder({ ok: true });
  } catch (err) {
    // Sin esto el error se queda en los registros de Apps Script y del
    // lado de la landing todo parece haber salido bien.
    console.error('doPost falló: ' + err);
    return responder({ ok: false, error: String(err) });
  }
}

/** Apps Script no puede devolver códigos HTTP: siempre es 200. El estado
 *  real viaja en el cuerpo, y la landing lee `ok` para saber si la fila
 *  se escribió de verdad. */
function responder(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function hoja() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var destino = libro.getSheetByName(NOMBRE_HOJA);

  if (!destino) {
    destino = libro.insertSheet(NOMBRE_HOJA);
  }

  if (destino.getLastRow() === 0) {
    destino.appendRow(COLUMNAS);
    destino.getRange(1, 1, 1, COLUMNAS.length).setFontWeight('bold');
    destino.setFrozenRows(1);
  }

  return destino;
}

/** La landing manda ISO en UTC; en la hoja se quiere hora de México. */
function fechaLocal(iso) {
  var fecha = iso ? new Date(iso) : new Date();
  if (isNaN(fecha.getTime())) fecha = new Date();
  return Utilities.formatDate(
    fecha,
    'America/Mexico_City',
    'yyyy-MM-dd HH:mm:ss'
  );
}

/** Un GET a la URL sirve para confirmar de un vistazo que la
 *  implementación está viva y sirviendo la versión correcta. */
function doGet() {
  return responder({ ok: true, servicio: 'assetbase-demo', metodo: 'usa POST' });
}
