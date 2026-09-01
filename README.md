# Emprendimiento Tec · Campus Ciudad de México — sitio de eventos

Sitio estático (HTML/CSS/JS, sin dependencias) listo para **GitHub Pages**.

## Publicar en GitHub Pages (una sola vez)

1. Crea un repositorio en GitHub (por ejemplo `emprendimiento-ccm`) y sube **todo el contenido de esta carpeta**
   (`index.html`, `eventos.json`, `.nojekyll` y la carpeta `assets/`). Puedes arrastrar los archivos en la web de GitHub
   ("Add file → Upload files").
2. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root) → Save**.
3. En un minuto la página queda en `https://TU-USUARIO.github.io/emprendimiento-ccm/`.
   Cada vez que se sube un cambio al repositorio, la página se actualiza sola.

## Cómo publica eventos el administrador (sin programar)

**Opción A — archivo `eventos.json` (la más simple):**
1. Abre la página, entra a **Admin** (arriba a la derecha), agrega/edita/borra eventos con el formulario.
2. Da clic en **Descargar eventos.json**.
3. En GitHub, entra a la carpeta del repositorio, sube el archivo `eventos.json` reemplazando el anterior (Upload files → Commit).
   En un minuto la página muestra los eventos nuevos. Los eventos pasados se archivan solos por fecha.

**Opción B — Google Sheet (recomendada cuando haya varios admins):**
1. Crea una hoja con estas columnas en la primera fila:
   `id, titulo, descripcion, categoria, modalidad, fecha, inicio, fin, lugar, registro, imagen, estado`
   - `categoria`: Taller · Charla · Pitch · Networking · Convocatoria
   - `modalidad`: Presencial · En línea · Híbrido
   - `fecha`: AAAA-MM-DD · `inicio`/`fin`: HH:MM · `imagen`: ilu1…ilu5 · `estado`: publicado / borrador
2. Archivo → Compartir → **Publicar en la web** → toda la hoja, formato CSV → copia la liga.
3. En `index.html` busca `CONFIG` y pega la liga en `sheetCsvUrl`. Sube el cambio. Desde entonces basta editar la hoja.

## Estructura

- `index.html` — la página completa (estilos y lógica incluidos; Kumbh Sans y Poppins se cargan de Google Fonts).
- `eventos.json` — los eventos que se muestran (si no existe o falla, se usan los eventos de ejemplo incrustados).
- `assets/` — logos oficiales (sin modificar), banners GIF originales, gráficos de las experiencias, fotos e ilustraciones.

## Marca

Colores y tipografía según el Brand Book Emprendimiento Tec 2022 V2.1. Los logos y GIF se usan tal como fueron entregados.
Para dudas de aplicación de marca, consultar al contacto indicado en el brandbook.
