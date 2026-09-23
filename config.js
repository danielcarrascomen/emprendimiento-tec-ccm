/* Ajustes del sitio que comparten index.html y mentores.html.
   · mentoresEndpoint: URL de la aplicación web de Apps Script (termina en /exec) que guarda los registros de mentores
     en una Google Sheet. Instrucciones en docs/mentores-apps-script.gs. Mientras esté vacío, el formulario
     de mentores.html envía cada registro por correo a mentoresCorreo.
   · mentoresSheet: (opcional) liga a esa Google Sheet, para abrirla desde el panel. */
window.SITIO = {
  mentoresEndpoint: 'https://script.google.com/macros/s/AKfycbwv-9AtELMGNvpLS2TUjdldsTdMob6KNLEAF6yq1BJDmibGGYAneohqgpijoAJ58yAQJg/exec',
  mentoresSheet: 'https://docs.google.com/spreadsheets/d/1RRiD2uu2vaB-q8so5VO-OO6X5MAMWQlfbfaNNJXCRtg/edit',
  mentoresCorreo: 'olivia_calderon@tec.mx'
};
