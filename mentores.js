/* Registro de mentores (mentores.html).
   Envía cada registro a la Google Sheet del instituto (config.js → mentoresEndpoint, ver docs/mentores-apps-script.gs).
   Si todavía no hay hoja conectada, abre un correo ya redactado para mentoresCorreo. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const SITIO = window.SITIO || {};
  const AREAS = ['Modelo de negocio', 'Validación con clientes', 'Marketing y marca', 'Ventas', 'Finanzas y métricas', 'Levantar capital', 'Producto digital y software', 'Hardware y manufactura', 'Operaciones y logística', 'Legal y propiedad intelectual', 'Diseño y UX', 'Liderazgo y equipos', 'Pitch y comunicación', 'Internacionalización', 'Impacto y sustentabilidad'];
  const ETAPAS = ['Idea', 'Validación', 'Prototipo o MVP', 'Primeras ventas', 'Crecimiento'];
  const SECTORES = ['Tecnología y software', 'Manufactura e industria', 'Energía y sustentabilidad', 'Salud y biotecnología', 'Consumo y retail', 'Alimentos y bebidas', 'Servicios financieros y fintech', 'Educación', 'Impacto social', 'Industrias creativas y medios', 'Consultoría', 'Gobierno y sector público', 'Otro'];

  const form = $('#mentorForm');
  if (!form) return;
  const box = (name, v) => `<label><input type="checkbox" name="${name}" value="${esc(v)}">${esc(v)}</label>`;
  $('#areasPick').innerHTML = AREAS.map(a => box('areas', a)).join('');
  $('#etapasPick').innerHTML = ETAPAS.map(a => box('etapas', a)).join('');
  form.elements.sector.insertAdjacentHTML('beforeend', SECTORES.map(s => `<option>${esc(s)}</option>`).join(''));
  const err = $('#meErr');

  form.addEventListener('change', e => {
    if (e.target.name !== 'areas') return;
    if ($$('input[name="areas"]:checked', form).length > 5) { e.target.checked = false; err.textContent = 'Elige máximo 5 campos de expertise.'; }
    else if (err.textContent.startsWith('Elige máximo')) err.textContent = '';
  });
  form.elements.bio.addEventListener('input', e => { $('#bioCount').textContent = `${e.target.value.length} / 500`; });

  function mailBody(r) {
    const L = [['Nombre', r.nombre], ['Correo', r.correo], ['Teléfono', r.telefono], ['LinkedIn o web', r.linkedin], ['Relación con el Tec', r.relacion], ['Carrera o formación', r.carrera],
      ['Empresa', r.empresa], ['Puesto', r.puesto], ['Sector', r.sector], ['Años de experiencia', r.anios], ['¿Ha fundado una empresa?', r.fundador],
      ['Campos de expertise', r.areas.concat(r.otraArea ? [r.otraArea] : []).join(', ')], ['Etapas que prefiere', r.etapas.join(', ')], ['Modalidad', r.modalidad],
      ['Horas al mes', r.horas], ['Idiomas', r.idiomas], ['Trayectoria', r.bio], ['Motivación', r.motivo]];
    return 'Registro de mentor(a) · Emprendimiento Tec CCM\n\n' + L.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const f = form.elements;
    const vals = n => $$(`input[name="${n}"]:checked`, form).map(i => i.value);
    const r = {
      id: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), fecha: new Date().toISOString(),
      nombre: f.nombre.value.trim(), correo: f.correo.value.trim(), telefono: f.telefono.value.trim(), linkedin: f.linkedin.value.trim(),
      relacion: f.relacion.value, carrera: f.carrera.value.trim(), empresa: f.empresa.value.trim(), puesto: f.puesto.value.trim(),
      sector: f.sector.value, anios: f.anios.value, fundador: f.fundador.value, areas: vals('areas'), otraArea: f.otraArea.value.trim(),
      etapas: vals('etapas'), modalidad: f.modalidad.value, horas: f.horas.value, idiomas: f.idiomas.value.trim(), bio: f.bio.value.trim(), motivo: f.motivo.value.trim()
    };
    const faltan = [];
    if (!r.nombre) faltan.push('tu nombre');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.correo)) faltan.push('un correo válido');
    if (!r.relacion) faltan.push('tu relación con el Tec');
    if (!r.carrera) faltan.push('tu carrera o formación');
    if (!r.anios) faltan.push('tus años de experiencia');
    if (!r.areas.length && !r.otraArea) faltan.push('al menos un campo de expertise');
    if (!r.bio) faltan.push('tu trayectoria');
    if (r.linkedin && !/^https?:\/\//i.test(r.linkedin)) faltan.push('una liga de LinkedIn que empiece con https://');
    if (!f.acepto.checked) faltan.push('aceptar el uso de tus datos');
    if (faltan.length) { err.textContent = 'Falta: ' + faltan.join(', ') + '.'; err.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    err.textContent = '';
    const btn = $('#meSubmit'); btn.disabled = true; btn.textContent = 'Enviando…';
    const nombre1 = r.nombre.split(/\s+/)[0];
    if (SITIO.mentoresEndpoint) {
      try {
        await fetch(SITIO.mentoresEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(r) });
        $('#meDoneTitle').textContent = `¡Gracias, ${nombre1}!`;
        $('#meDoneText').textContent = 'Recibimos tu registro. El equipo del Instituto lo revisa y te escribe por correo en los próximos días.';
      } catch (ex) {
        btn.disabled = false; btn.innerHTML = 'Enviar mi registro <span class="arrow">→</span>';
        err.textContent = 'No pudimos enviar tu registro. Revisa tu conexión e inténtalo de nuevo.'; return;
      }
    } else {
      const to = SITIO.mentoresCorreo || 'olivia_calderon@tec.mx';
      location.href = `mailto:${to}?subject=${encodeURIComponent('Registro de mentor(a): ' + r.nombre)}&body=${encodeURIComponent(mailBody(r))}`;
      $('#meDoneTitle').textContent = `¡Casi listo, ${nombre1}!`;
      $('#meDoneText').innerHTML = `Se abrió tu correo con el registro ya redactado para <b>${esc(to)}</b>. Solo da clic en <b>Enviar</b>. Si no se abrió, escríbenos a <a href="mailto:${esc(to)}">${esc(to)}</a>.`;
    }
    btn.disabled = false; btn.innerHTML = 'Enviar mi registro <span class="arrow">→</span>';
    form.hidden = true; $('#mentorDone').hidden = false; $('#mentorDone').focus();
    window.scrollTo({ top: $('#mentorDone').getBoundingClientRect().top + scrollY - 120, behavior: 'smooth' });
  });
  $('#meAgain').addEventListener('click', () => { form.reset(); $('#bioCount').textContent = '0 / 500'; form.hidden = false; $('#mentorDone').hidden = true; form.elements.nombre.focus(); });

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
