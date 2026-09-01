/* Páginas de catálogo (experiencias.html y eventos.html): collage estilo cartelera + secciones. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ILUS = { ilu1: 'assets/ilustracion-1.webp', ilu2: 'assets/ilustracion-2.webp', ilu3: 'assets/ilustracion-3.webp', ilu4: 'assets/ilustracion-4.webp', ilu5: 'assets/ilustracion-5.webp' };
  const toDate = (f, h) => { const [y, m, d] = String(f).split('-').map(Number); const [hh, mm] = String(h || '00:00').split(':').map(Number); return new Date(y, m - 1, d, hh || 0, mm || 0); };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const fmtDay = new Intl.DateTimeFormat('es-MX', { weekday: 'short', day: 'numeric', month: 'short' });
  const clean = s => s.replace(/\./g, '');
  const isDraft = ev => !!ev.estado && !/^publicado$/i.test(ev.estado);
  const isUpcoming = ev => toDate(ev.fechaFin || ev.fecha, ev.fin || ev.inicio) >= today;
  const imgOf = ev => ILUS[ev.imagen] || ev.imagen || ILUS.ilu1;

  function tile(o) {
    return `<a class="tile${o.featured ? ' featured' : ''}${o.art ? ' art' : ''}" href="${esc(o.href)}"${o.ext ? ' target="_blank" rel="noopener"' : ''}>
      <img src="${esc(o.img)}" alt="" loading="${o.featured ? 'eager' : 'lazy'}" decoding="async">
      <div class="txt"><span class="tag">${esc(o.tag)}</span><span class="ttl">${esc(o.title)}</span>${o.sub ? `<span class="sub">${esc(o.sub)}</span>` : ''}</div>
    </a>`;
  }
  const section = (title, tiles, note) => `<section class="cat-sec"><div class="wrap"><h2>${esc(title)}</h2>${tiles.length ? `<div class="grid-tiles">${tiles.join('')}</div>` : `<p class="cat-empty">${esc(note || 'Nada por ahora.')}</p>`}</div></section>`;

  /* ---- Experiencias ---- */
  const pc = $('#progCollage');
  if (pc && window.PROGRAMAS) {
    const P = window.PROGRAMAS;
    const name = x => x.top + (x.sub ? ' ' + x.sub : '');
    const T = (x, featured) => tile({ featured, art: true, href: x.url, ext: true, img: x.img, tag: x.stage, title: name(x), sub: x.q });
    pc.innerHTML = P.slice(0, 5).map((x, i) => T(x, i === 0)).join('');
    const groups = [['Para encontrar y validar tu idea', ['lab', 'explora']], ['Para crecer tu proyecto', ['founder', 'labs']], ['Para trabajar por tu cuenta', ['freeland', 'entrenamiento']], ['Para PrepaTec', ['spark']]];
    $('#progSections').innerHTML = groups.map(([t, ids]) => section(t, ids.map(id => P.find(p => p.id === id)).filter(Boolean).map(x => tile({ art: true, href: x.url, ext: true, img: x.img, tag: x.stage, title: name(x), sub: x.facts[0] })))).join('');
  }

  /* ---- Eventos ---- */
  const ec = $('#evCollage');
  if (ec) {
    const T = (ev, featured) => tile({ featured, href: 'index.html#evento/' + encodeURIComponent(ev.id), img: imgOf(ev), tag: ev.periodicidad === 'porconfirmar' ? 'Fecha por confirmar' : clean(fmtDay.format(toDate(ev.fecha, '12:00'))) + (ev.inicio && ev.periodicidad !== 'convocatoria' && ev.inicio !== '00:00' ? ' · ' + ev.inicio + ' h' : ''), title: ev.titulo, sub: ev.lugar || ev.modalidad });
    const show = list => {
      const vis = list.filter(e => e && e.titulo && e.fecha && !isDraft(e));
      const up = vis.filter(isUpcoming).sort((a, b) => toDate(a.fecha, a.inicio) - toDate(b.fecha, b.inicio));
      const past = vis.filter(e => !isUpcoming(e)).sort((a, b) => toDate(b.fecha, b.inicio) - toDate(a.fecha, a.inicio));
      ec.innerHTML = up.length ? up.slice(0, 5).map((ev, i) => T(ev, i === 0)).join('') : '<p class="cat-empty" style="color:#fff">Todavía no hay eventos publicados. Síguenos en Instagram @emprendimientoccm.</p>';
      const cats = [...new Set(up.map(e => e.categoria || 'Otros'))];
      const secs = cats.map(c => section(c === 'Taller' ? 'Talleres' : c === 'Charla' ? 'Charlas' : c === 'Convocatoria' ? 'Convocatorias' : c === 'Concurso' ? 'Concursos' : c === 'Mentoría' ? 'Mentorías' : c, up.filter(e => (e.categoria || 'Otros') === c).map(ev => T(ev, false))));
      if (past.length) secs.push(section('Eventos pasados', past.slice(0, 9).map(ev => T(ev, false))));
      $('#evSections').innerHTML = secs.join('');
    };
    let cached = null; try { cached = JSON.parse(localStorage.getItem('eventosCache') || 'null'); } catch (e) { /* sin caché */ }
    if (Array.isArray(cached) && cached.length) show(cached);
    fetch(`eventos.json?t=${Date.now()}`, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(list => {
      if (Array.isArray(list)) { show(list); try { localStorage.setItem('eventosCache', JSON.stringify(list)); } catch (e) { /* sin almacenamiento */ } }
      else if (!cached) show([]);
    }).catch(() => { if (!cached) show([]); });
  }

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
