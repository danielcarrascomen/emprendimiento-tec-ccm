/**
 * Registro de mentores · Emprendimiento Tec CCM
 * Guarda en esta Google Sheet cada registro que llega desde mentores.html y deja que el panel
 * de administración (index.html#panel) los lea y cambie su estado con una clave.
 *
 * 1) Crea una Google Sheet con la cuenta @tec.mx → Extensiones → Apps Script → pega este archivo.
 * 2) Cambia CLAVE por una clave propia (es la que pedirá el panel en la pestaña Mentores).
 * 3) Implementar → Nueva implementación → Tipo: Aplicación web · Ejecutar como: yo · Acceso: Cualquier persona.
 * 4) Copia la URL que termina en /exec y pégala en config.js → mentoresEndpoint. Sube config.js al repositorio.
 * Si cambias el código después, usa Implementar → Administrar implementaciones → Editar → Nueva versión.
 */
const CLAVE = 'cambia-esta-clave';
const COLS = ['id', 'fecha', 'estado', 'nombre', 'correo', 'telefono', 'linkedin', 'relacion', 'carrera', 'empresa', 'puesto',
  'sector', 'anios', 'fundador', 'areas', 'otraArea', 'etapas', 'modalidad', 'horas', 'idiomas', 'bio', 'motivo'];

function hoja_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(COLS);
  return sh;
}
function salida_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents || '{}');
  const sh = hoja_();
  if (d.accion === 'estado') {
    if (d.clave !== CLAVE) return salida_({ ok: false, error: 'clave' });
    const datos = sh.getDataRange().getValues();
    const cId = COLS.indexOf('id'), cEstado = COLS.indexOf('estado');
    for (let i = 1; i < datos.length; i++) {
      if (String(datos[i][cId]) === String(d.id)) { sh.getRange(i + 1, cEstado + 1).setValue(d.estado); return salida_({ ok: true }); }
    }
    return salida_({ ok: false, error: 'no-encontrado' });
  }
  if (!d.nombre || !d.correo) return salida_({ ok: false, error: 'faltan-datos' });
  d.estado = 'Nueva';
  sh.appendRow(COLS.map(k => Array.isArray(d[k]) ? d[k].join('; ') : String(d[k] || '').slice(0, 1000)));
  return salida_({ ok: true });
}

function doGet(e) {
  if ((e.parameter.clave || '') !== CLAVE) return salida_({ ok: false, error: 'clave' });
  const datos = hoja_().getDataRange().getValues();
  const head = datos.shift();
  const rows = datos.map(r => {
    const o = {};
    head.forEach((h, i) => { o[h] = r[i] instanceof Date ? r[i].toISOString() : r[i]; });
    return o;
  });
  return salida_({ ok: true, rows });
}
