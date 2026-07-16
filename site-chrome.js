(() => {
  const isHome = document.body.dataset.page === "home";
  const rootLink = (fragment = "") => (isHome ? fragment || "#inicio" : `../${fragment}`);
  const executiveLink = isHome ? "movilidad-ejecutiva/" : "./";
  const assetPath = isHome ? "assets" : "../assets";
  const quoteLink = isHome ? "movilidad-ejecutiva/#cotizador" : "#cotizador";

  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");

  if (header) {
    header.innerHTML = `
      <a class="brand" href="${rootLink()}" aria-label="Transportes Integrados">
        <img src="${assetPath}/3%20logo-TI-wh.png" alt="Transportes Integrados">
        <span class="brand-fallback" hidden>Transportes Integrados</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
      <nav class="nav" id="site-nav" aria-label="Principal">
        <a href="${rootLink("#servicios")}">Servicios</a>
        <a href="${rootLink("#industrias")}">Industrias</a>
        <a href="${rootLink("#operacion")}">Operación</a>
        <a href="${rootLink("#cobertura")}">Cobertura</a>
        <a href="${rootLink("#contacto")}">Contacto</a>
      </nav>
      <a class="header-action" href="${quoteLink}">Cotizar</a>`;
  }

  if (footer) {
    footer.innerHTML = `
      <div>
        <a class="footer-brand" href="${rootLink()}" aria-label="Ir al inicio"><img src="${assetPath}/3%20logo-TI-wh.png" alt="Transportes Integrados"></a>
        <p>&copy; <span id="year"></span> Transportes Integrados. Todos los derechos reservados.</p>
      </div>
      <nav aria-label="Enlaces secundarios">
        <a href="${rootLink("#servicios")}">Servicios</a>
        <a href="${executiveLink}">Movilidad ejecutiva</a>
        <a href="${rootLink("#cobertura")}">Cobertura</a>
        <a href="${rootLink("#contacto")}">Contacto</a>
      </nav>`;
  }
})();
