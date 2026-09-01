# Emprendimiento Tec · Campus Ciudad de México

Sitio estático (HTML/CSS/JS, sin dependencias) publicado en **GitHub Pages**:
https://danielcarrascomen.github.io/emprendimiento-tec-ccm/

## Qué contiene

- **Experiencias de Emprendimiento** (programas estrella del Instituto): tarjetas con etapa, fechas del semestre, para quién es y liga de postulación. Los datos viven en el arreglo `PROGRAMAS` de `index.html` (búscalo y edita textos/fechas cada semestre).
- **Eventos**: se cargan de `eventos.json`. Cada evento tiene su pantalla individual y liga compartible: `…/#evento/ID`.
- **Comunidad**: WhatsApp e Instagram.
- **Panel de administración** con usuario y contraseña (sin botón visible): `…/admin.html`.

## Cómo publica eventos el administrador

1. Abre `https://danielcarrascomen.github.io/emprendimiento-tec-ccm/admin.html` y entra con tu usuario y contraseña.
2. Usa **＋ Nuevo evento** o **Editar / Borrar** en cada tarjeta. Puedes poner título, categoría, modalidad, fecha, horario, lugar, liga de registro, descripción corta, información completa, estado (publicado / borrador) e imagen (ilustración de marca, archivo propio o liga).
3. Al terminar, **Publicar cambios**. La página se actualiza para todo el mundo en 1 a 2 minutos (los eventos pasados se archivan solos por fecha).
   - Si el acceso no tiene token de GitHub configurado, en lugar de «Publicar» aparece **Descargar eventos.json**: sube ese archivo al repositorio (Add file → Upload files → Commit) reemplazando el anterior.

## Crear o cambiar el usuario, la contraseña o el token

Abre `…/configurar-admin.html`, llena usuario y contraseña y (recomendado) un **token fine-grained de GitHub** con permiso *Contents: Read and write* solo sobre este repositorio; la misma página explica cómo crearlo. Con «Guardar en GitHub» queda listo. Sin token, descarga `admin.json` y súbelo a la raíz del repositorio.

`admin.json` es público pero no contiene la contraseña ni el token en claro: guarda un verificador PBKDF2 y el token cifrado con AES-GCM usando la contraseña. Quien no tenga la contraseña no puede publicar.

**Acceso inicial** (cámbialo en cuanto puedas): usuario `admin`, contraseña `EmprendeCCM-2026!` (sin token: solo descarga `eventos.json`).

## Opción alterna: Google Sheet

Si prefieren editar una hoja, publica la Sheet como CSV (columnas `id, titulo, descripcion, detalle, categoria, modalidad, fecha, inicio, fin, lugar, registro, imagen, estado`) y pega la liga en `CONFIG.sheetCsvUrl` dentro de `index.html`. En ese modo la página lee la hoja y el panel no publica.

## Estructura

- `index.html` — la página completa (estilos, datos de experiencias y lógica).
- `eventos.json` — eventos publicados. `admin.json` — credenciales (verificador + token cifrado).
- `admin.html` — atajo de acceso (redirige a `index.html#admin`). `configurar-admin.html` — genera `admin.json`.
- `sw.js` — service worker: caché para que cargue al instante en visitas repetidas. Si cambias un archivo de `assets/` conservando el nombre, sube `VERSION` en `sw.js`.
- `assets/` — logos oficiales, ilustraciones, gráficos de las experiencias, fotos; `assets/video/` banners del carrusel en MP4 (versión escritorio y versión recortada para celular); `assets/eventos/` imágenes subidas desde el panel.

## Marca

Colores y tipografía según el Brand Book Emprendimiento Tec 2022 V2.1 y la UI del sitio de Experiencias del Instituto. Los logos se usan tal como fueron entregados. Los GIF originales de campaña están en la carpeta madre del proyecto; en el sitio van como MP4 para que pese 30 veces menos.
