/* Ajustes del sitio que comparten index.html y mentores.html.
   · mentoresEndpoint: URL de la aplicación web de Apps Script (termina en /exec) que guarda los registros de mentores
     en una Google Sheet. Instrucciones en docs/mentores-apps-script.gs. Mientras esté vacío, el formulario
     de mentores.html envía cada registro por correo a mentoresCorreo.
   · mentoresSheet: (opcional) liga a esa Google Sheet, para abrirla desde el panel. */
window.SITIO = {
  mentoresEndpoint: '',
  mentoresSheet: '',
  mentoresCorreo: 'olivia_calderon@tec.mx'
};
