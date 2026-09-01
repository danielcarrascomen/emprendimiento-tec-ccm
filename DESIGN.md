# Design System — Emprendimiento Tec · Campus Ciudad de México

Fuente de verdad del diseño del sitio. Lee este archivo antes de tocar cualquier cosa visual.
Los valores viven como variables CSS en `index.html` (`:root`); si cambias algo aquí, cámbialo allá.

## Product Context
- **What this is:** página única (HTML/CSS/JS sin build) con las experiencias del Instituto de Emprendimiento, los eventos del campus y la comunidad. Panel de administración con login para publicar eventos; pantalla individual por evento con liga compartible.
- **Who it's for:** estudiantes de Profesional, Posgrado y PrepaTec, docentes, colaboradores y EXATEC del Tec de Monterrey Campus Ciudad de México. Llegan desde Instagram y WhatsApp, casi siempre en celular.
- **Space/industry:** emprendimiento universitario. Pares: sitio de Experiencias del Instituto (Google Sites), emprendimiento.tec.mx, catálogo IEEGL.
- **Project type:** sitio de marketing/comunidad con un pequeño CMS estático (GitHub Pages).
- **Lo memorable:** "todo el emprendimiento del campus en un solo lugar" y la voz de la campaña *Yo emprendo* / *Todas y todos podemos emprender*. La página debe sentirse como una extensión del Instituto, no como una herramienta.

## Aesthetic Direction
- **Direction:** Vibrante por bloques (bold, energético, geométrico), heredado del Brand Book Emprendimiento Tec 2022 V2.1 y de la UI del sitio de Experiencias.
- **Decoration level:** intencional. El rayo (`assets/rayo-*.png`) como forma recurrente (marca de agua, viñetas, chips) y garabato ovalado azul en frases de impacto. Nada de blobs, glows ni gradientes decorativos ajenos a la marca. (La banda cinética con frases se retiró el 31 ago 2026 a petición del usuario.)
- **Mood:** enérgico y directo; institucional sin ser corporativo. Bloques de color plano, mucho contraste, tipografía grande y frases cortas en mayúsculas para los programas.
- **Reference sites:** https://sites.google.com/tec.mx/emprendimiento-tec/ (programas), https://emprendimiento.tec.mx/es (footer), https://www.instagram.com/emprendimientoccm/ (calendarios mensuales).

## Typography
- **Display/Hero y cuerpo:** Kumbh Sans 400/700 (brand book). Títulos con `letter-spacing` negativo ligero (-0.015em en H1).
- **Programas (experiencias):** Poppins 400/700/800, como en el sitio del Instituto: nombre del programa en mayúsculas 700, subtítulo 400, frases de impacto 800 en mayúsculas con colores lima/blanco/verde.
- **UI/Labels:** Kumbh Sans 700 (etiquetas, chips, botones). Los chips de etapa y los "Detalles" de programas usan Poppins 700 para pertenecer al bloque navy.
- **Data/Tables:** Kumbh Sans con `font-variant-numeric: tabular-nums` en fechas y stats.
- **Code:** no aplica (sin código visible).
- **Loading:** Google Fonts, `display=swap`, con preconnect. Fallback: "Segoe UI", Roboto, Helvetica, Arial.
- **Scale:** body 17px / 1.55 · lede clamp(17–20px) · h3 20px · h2 clamp(26–34px) · h1 clamp(32–56px) · wordmark de programa clamp(30–42px), destacado clamp(38–54px) · chips 13–14px · meta 15px. Mínimo en pantalla: 13px.

## Color
- **Approach:** expresivo dentro de la paleta de marca. Índigo como color primario (~60 % de los acentos), navy para superficies oscuras, lima como acento de los programas.
- **Primary:** Índigo `#3333C0` (`--indigo`), botones primarios en degradado oficial navy→índigo→eléctrico `#0C318D → #3333C0 → #3838F1`.
- **Secondary:** Azul Marino `#0C318D` (`--navy`) en títulos, comunidad y barra de admin. Navy del Instituto `#061D5D` (`--xp-navy`) en la sección de experiencias.
- **Accents:** Lima `#CCF020` (`--xp-lime`) y Verde `#82F35C` (`--xp-green`) solo en el bloque de experiencias; Cyan `#33CBFF` para marcas y etiqueta "by Freeland"; Lila `#CBCFF0` para texto secundario sobre navy; Naranja `#FFB548` solo en SparkCamp.
- **Neutrals:** fondo `#FFFFFF`, fondo suave `#F2F3FB`, línea `#DCDEF3`, chip `#E8EAFA`, texto `#151519` (nunca negro puro), texto secundario `#55566A`. Footer: `--footer-bg #0B1B4D` (navy más profundo que `--navy`, como emprendimiento.tec.mx), enlaces en blanco con hover lila.
- **Semantic:** éxito `#E3F8EA / #0F5132` (chip "Sin costo"), aviso `#FFF3CD / #7A5A00` (borrador), error `#B3261E`, foco `#33CBFF` y anillo `rgba(51,51,192,.18)`.
- **Dark mode:** no existe por decisión del usuario (31 ago 2026): la página es siempre blanca. Las secciones oscuras (experiencias, comunidad, footer) son parte del diseño, no un tema.
- **Contraste:** todo texto sobre navy va en blanco o lila; sobre lima va en navy. Nunca lila sobre blanco ni blanco sobre lila.

## Spacing
- **Base unit:** 4px. Escala `--sp-1..8`: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72. Los tokens existen en `:root`; buena parte del CSS heredado todavía usa valores en px (10, 14, 18, 22, 26, 28) que deben migrar a la escala al tocarlos. Pendiente de la auditoría del 31 ago 2026.
- **Density:** cómoda. Secciones 72px (48px en celular), tarjetas 18–26px de padding, grid 20–22px de separación.
- **Regla "nadie lee todo":** en la portada cada tarjeta muestra solo lo esencial (imagen, fecha, título, una línea de datos, dos chips como máximo, un botón). El resto vive en "Detalles" (programas) o en la pantalla del evento.

## Layout
- **Approach:** híbrido con asimetría (variance 8): hero dividido texto/stats, LAB como tarjeta destacada a todo lo ancho, stats 1.35/1/1, recursos 1.5fr/1fr con el catálogo ocupando dos filas. Todo cae a una columna por debajo de 900px (programas) y 640px (eventos).
- **Grid:** contenedor `min(1120px, 100% - 40px)`; eventos 3 / 2 / 1 columnas (980px / 640px); programas 2 / 1.
- **Breakpoints en uso (max-width):** 380 · 480 (celular chico: logo rayo, botones a todo el ancho) · 560 (formularios y tarjeta de programa a una columna) · 640 (eventos a una columna, banner recortado) · 720 · 760 (header y footer compactos) · 860 (hero, comunidad y recursos a una columna) · 900 (programas a una columna) · 980 (eventos a dos columnas). Al agregar reglas, reutilizar uno de estos.
- **Max content width:** 1120px. Texto largo máx. 62ch.
- **Border radius:** `--r-sm` 8 · `--r-md` 12 · `--r-lg` 16 (tarjetas) · `--r-xl` 22 (programas, diálogo) · píldora 999.
- **Sombras:** tintadas al navy: `--sh-sm` 0 2px 8px rgba(12,49,141,.08) · `--sh-md` 0 10px 30px .10 · `--sh-lg` 0 18px 44px .16. Botones con `--btn-shadow`. Sobre fondos navy, sombras negras al 25–35 %.
- **Orden de la portada (index.html):** header → eventos → experiencias en carrusel → «¿Qué es emprender en el Tec?» (definición con reglas y foco) → test de perfil emprendedor (Typeform) → comunidad con el carrusel de campaña → footer compacto. Sin hero de texto.
- **Páginas de catálogo:** `experiencias.html` y `eventos.html` con collage tipo cartelera (una pieza grande + cuadrícula) y secciones debajo (por etapa / por categoría). Estilos compartidos en `styles.css`; datos de programas en `programas.js`; lógica de catálogo en `catalogo.js`.
- **Resaltado:** los estados de selección, foco y el spotlight del cursor usan cyan `#33CBFF`, nunca lima (decisión del usuario, 31 ago 2026).
- **Móvil:** banners en versión recortada 3:1 a todo el ancho; objetivos táctiles ≥44px; barra de admin no fija.

## Motion
- **Approach:** intencional. Solo `transform` y `opacity`; todo se apaga con `prefers-reduced-motion`.
- **Easing:** `--ease` cubic-bezier(.2,.7,.2,1) para entrar y mover.
- **Duration:** `--t-fast` 150ms (hover, foco) · `--t-base` 220ms (tarjetas, diálogo) · revelado al hacer scroll 550ms con escalón de 70ms · óvalo que se dibuja 900ms.
- **Perpetuas:** carrusel de video (6s por banner, con botón de pausa), rayo flotante 5s, punto que respira 2.4s, shimmer del esqueleto 1.4s.
- **Revelado al hacer scroll:** pre-revela 25 % por debajo del viewport y tiene respaldo de 3 s para que nada quede oculto en scroll rápido o navegadores embebidos.
- **Interacción:** hover eleva 1–3px y sube la sombra; `:active` scale(.98); spotlight lima que sigue el cursor en programas (solo `hover: hover`).

## Components
- **Botones:** primario (degradado, píldora), secundario (blanco con borde índigo), ghost (borde línea), danger (rojo sobre blanco), `btn-sm` 40px / 44px en táctil. Píldora blanca `xp-pill` con tick verde solo dentro de experiencias.
- **Chips:** filtro (activo índigo), `modal-pill` informativos, `soft` grises, `free` verde, `draft` ámbar, etapa de programa con degradado azul→lima y rayo.
- **Tarjeta de evento:** imagen 16:9 (ilustración de marca, foto propia o liga) + logo opcional en la esquina, fecha grande, título como liga que cubre toda la tarjeta, meta, chips, botón Registrarme y "Ver más".
- **Tarjeta de programa:** chip de etapa, wordmark, pregunta, frase de impacto con óvalo, 2 datos clave, píldora de postulación, `Detalles` desplegable con descripción, resto de datos, público y contacto.
- **Diálogo:** título y acciones fijos, inputs con anillo de foco, selects con chevron propio, grupos separados por línea, checkboxes en `fieldset`.
- **Estados:** esqueleto shimmer al cargar eventos, error con "Reintentar", vacío con invitación a la comunidad, toast para confirmaciones.

## Do / Don't
- Do: usar el rayo como único ornamento; frases cortas; un CTA por tarjeta; mostrar fechas en español con `Intl.DateTimeFormat('es-MX')`.
- Don't: modo oscuro; emojis como íconos (usar SVG); gradientes fuera del botón primario y el chip de etapa; tres tarjetas iguales en fila; texto menor a 13px; párrafos largos en la portada.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-31 | Tema claro fijo, sin modo oscuro | El usuario vio la página oscura en su celular y pidió que siempre sea blanca |
| 2026-08-31 | Banners GIF → MP4 con versión móvil 3:1 | 49 MB → 1.5 MB; en celular el banner 5:1 era ilegible |
| 2026-08-31 | Experiencias antes que eventos, como programas estrella | El usuario los considera lo principal; los eventos van después |
| 2026-08-31 | Estilo de programas tomado del sitio de Experiencias (navy, lima, Poppins, óvalo) | Coherencia con el material que la comunidad ya conoce |
| 2026-08-31 | Footer al estilo emprendimiento.tec.mx | Petición explícita con captura de referencia |
| 2026-08-31 | Portada con la mínima información por tarjeta; detalle en pantalla de evento o desplegable | "Nadie lee todo" (usuario) |
| 2026-08-31 | DESIGN.md creado por /design-consultation | Documenta el sistema ya construido; no se cambiaron tipografías ni colores porque los fija el brand book |
| 2026-08-31 | /design-review: 7 arreglos (revelado con respaldo, sin banda cinética, texto ≥13 px, 44 px táctil, footer con tokens y h3) | Auditoría en vivo + subagente; Codex no disponible en Windows. Diferido: migrar px sueltos a `--sp-*` y sombras sobre navy a un token |
| 2026-09-01 | Footer gris negro (`--footer-bg: #1B1B1F`) | Petición del usuario, con la referencia del footer negro 2023 |
| 2026-09-01 | Rayito de color del catálogo junto al wordmark en el carrusel de experiencias (`assets/catalogo-rayo-*.png`) | Petición del usuario "como en el canvas"; lab→verde, explora/spark→azul-lima, founder/labs→venture, freeland/entrenamiento→freeland |
| 2026-09-01 | Login de admin como página propia (`admin.html`) en vez de diálogo | Petición del usuario; misma verificación PBKDF2 contra admin.json, sesión en sessionStorage |
