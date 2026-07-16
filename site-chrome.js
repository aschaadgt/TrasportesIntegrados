(() => {
  const isHome = document.body.dataset.page === "home";
  const link = (fragment) => (isHome ? fragment : `index.html${fragment}`);
  const quoteLink = isHome ? "movilidad-ejecutiva.html#cotizador" : "#cotizador";

  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");

  if (header) {
    header.innerHTML = `
      <a class="brand" href="${isHome ? "#inicio" : "index.html#inicio"}" aria-label="Transportes Integrados">
        <img src="assets/3%20logo-TI-wh.png" alt="Transportes Integrados">
        <span class="brand-fallback" hidden>Transportes Integrados</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
      <nav class="nav" id="site-nav" aria-label="Principal">
        <a href="${link("#servicios")}">Servicios</a>
        <a href="${link("#industrias")}">Industrias</a>
        <a href="${link("#operacion")}">Operación</a>
        <a href="${link("#cobertura")}">Cobertura</a>
        <a href="${link("#contacto")}">Contacto</a>
      </nav>
      <a class="header-action" href="${quoteLink}">Cotizar</a>`;
  }

  if (footer) {
    footer.innerHTML = `
      <div>
        <a class="footer-brand" href="${isHome ? "#inicio" : "index.html#inicio"}" aria-label="Ir al inicio"><img src="assets/3%20logo-TI-wh.png" alt="Transportes Integrados"></a>
        <p>&copy; <span id="year"></span> Transportes Integrados. Todos los derechos reservados.</p>
      </div>
      <nav aria-label="Enlaces secundarios">
        <a href="${link("#servicios")}">Servicios</a>
        <a href="movilidad-ejecutiva.html">Movilidad ejecutiva</a>
        <a href="${link("#cobertura")}">Cobertura</a>
        <a href="${link("#contacto")}">Contacto</a>
      </nav>`;
  }
})();
