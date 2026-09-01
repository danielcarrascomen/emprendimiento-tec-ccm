# Emprendimiento Tec CCM — notas para Claude

Sitio estático (HTML/CSS/JS sin build) publicado en GitHub Pages desde la rama `main`.
No agregar frameworks ni pasos de compilación: el admin publica desde la propia página.

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Flujo de trabajo
- Probar en local con `python -m http.server 8765` y el navegador de `/browse`; revisar escritorio (1280) y celular (390).
- Verificar sintaxis del JS embebido antes de subir (`node -e` con `new Function`).
- Commit y push a `main`; GitHub Pages tarda 1–2 minutos. Si se reemplaza un archivo de `assets/` con el mismo nombre, subir `VERSION` en `sw.js`.
- Los eventos viven en `eventos.json`; las experiencias en el arreglo `PROGRAMAS` de `index.html`; el acceso admin en `admin.json` (nunca guardar contraseñas ni tokens en claro).
