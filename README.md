# Emprendimiento Tec · Campus Ciudad de México

Sitio estático (HTML/CSS/JS, sin dependencias) publicado en **GitHub Pages**:
https://danielcarrascomen.github.io/emprendimiento-tec-ccm/

## Qué contiene

- **Experiencias de Emprendimiento** (programas estrella del Instituto): tarjetas con etapa, fechas del semestre, para quién es y liga de postulación. Los datos viven en el arreglo `PROGRAMAS` de `index.html` (búscalo y edita textos/fechas cada semestre).
- **Eventos**: se cargan de `eventos.json`. Cada evento tiene su pantalla individual y liga compartible: `…/#evento/ID`.
- **Comunidad**: WhatsApp e Instagram.
- **Sé mentor(a)** (`mentores.html`): registro de mentores (datos personales, carrera, experiencia, campos de expertise, etapas, modalidad y disponibilidad).
- **Panel de administración** con usuario y contraseña (sin botón visible): `…/admin.html` → abre `index.html#panel` con Resumen, Eventos (tabla con editar, duplicar, ocultar/publicar y borrar), Mentores (solicitudes) y Publicar y respaldos.

## Cómo publica eventos el administrador

1. Abre `https://danielcarrascomen.github.io/emprendimiento-tec-ccm/admin.html` y entra con tu usuario y contraseña.
2. Usa **＋ Nuevo evento** o **Editar / Borrar** en cada tarjeta. Campos (inspirados en el registro de experiencias de Nerix, solo lo esencial para eventos de campus): título, categoría, modalidad, tipo de fecha (fecha establecida · convocatoria con apertura y cierre · fecha por confirmar), fecha, horario, fecha de fin, lugar o plataforma, liga de registro, página web o red social, registro hasta, costo y precio, cupo, correo de contacto, público dirigido, premio, palabras clave, descripción corta (300), descripción detallada (2500), estado (publicado / borrador), imagen banner (ilustración de marca, archivo propio o liga) y logo opcional.
3. Al terminar, **Publicar cambios**. La página se actualiza para todo el mundo en 1 a 2 minutos (los eventos pasados se archivan solos por fecha).
   - Si el acceso no tiene token de GitHub configurado, en lugar de «Publicar» aparece **Descargar eventos.json**: sube ese archivo al repositorio (Add file → Upload files → Commit) reemplazando el anterior.

## Registro de mentores

`mentores.html` envía cada registro a una Google Sheet por medio de un Apps Script (`docs/mentores-apps-script.gs`, trae las instrucciones). Pega la URL `/exec` en `config.js → mentoresEndpoint`. El panel (pestaña Mentores) lee la hoja con la clave definida en el script, permite cambiar el estado (Nueva, En revisión, Aprobada, Descartada) y descargar CSV. Mientras `mentoresEndpoint` esté vacío, el formulario abre un correo ya redactado para `mentoresCorreo`.

## Segundo botón en eventos

Cada evento puede tener un segundo botón (`extraTexto`, `extraLiga`, `extraPrecio`), p. ej. «Quiero un stand · $200 MXN». Si el evento no tiene `registro`, la tarjeta muestra «Entrada libre» y ese botón como único llamado.

## Crear o cambiar el usuario, la contraseña o el token

Abre `…/configurar-admin.html`, llena usuario y contraseña y (recomendado) un **token fine-grained de GitHub** con permiso *Contents: Read and write* solo sobre este repositorio; la misma página explica cómo crearlo. Con «Guardar en GitHub» queda listo. Sin token, descarga `admin.json` y súbelo a la raíz del repositorio.

`admin.json` es público pero no contiene la contraseña ni el token en claro: guarda un verificador PBKDF2 y el token cifrado con AES-GCM usando la contraseña. Quien no tenga la contraseña no puede publicar.

**Acceso**: usuario `adminemprendimiento`, contraseña `adminemprendimiento2026` (definidos el 31 ago 2026; sin token de GitHub todavía, así que el panel ofrece «Descargar eventos.json»).

## Opción alterna: Google Sheet

Si prefieren editar una hoja, publica la Sheet como CSV (columnas `id, titulo, descripcion, detalle, categoria, modalidad, periodicidad, fecha, fechaFin, inicio, fin, lugar, registro, web, limiteRegistro, costo, precio, cupo, contacto, publico, premio, premioDetalle, tags, imagen, logo, estado`; `publico` y `tags` separados por coma) y pega la liga en `CONFIG.sheetCsvUrl` dentro de `index.html`. En ese modo la página lee la hoja y el panel no publica.

## Estructura

- `index.html` — la página completa (estilos, datos de experiencias y lógica) y el panel de administración (`#panel`).
- `mentores.html` + `mentores.js` — registro de mentores. `config.js` — ajustes compartidos (liga del Apps Script de mentores). `docs/mentores-apps-script.gs` — script de la hoja.
- `eventos.json` — eventos publicados. `admin.json` — credenciales (verificador + token cifrado).
- `admin.html` — atajo de acceso (redirige a `index.html#admin`). `configurar-admin.html` — genera `admin.json`.
- `sw.js` — service worker: caché para que cargue al instante en visitas repetidas. Si cambias un archivo de `assets/` conservando el nombre, sube `VERSION` en `sw.js`.
- `assets/` — logos oficiales, ilustraciones, gráficos de las experiencias, fotos; `assets/video/` banners del carrusel en MP4 (versión escritorio y versión recortada para celular); `assets/eventos/` imágenes subidas desde el panel.

## Marca

Colores y tipografía según el Brand Book Emprendimiento Tec 2022 V2.1 y la UI del sitio de Experiencias del Instituto. Los logos se usan tal como fueron entregados. Los GIF originales de campaña están en la carpeta madre del proyecto; en el sitio van como MP4 para que pese 30 veces menos.
