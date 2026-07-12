# Transportes Integrados

Sitio web estatico para `transportesintegrados.com`.

## Estructura

- `index.html`: pagina principal.
- `styles.css`: estilos responsive.
- `script.js`: ajustes menores del sitio.
- `assets/`: imagenes del sitio.
- `.htaccess`: configura `index.html` como portada y desactiva listado de directorios.
- `.cpanel.yml`: tareas de despliegue para Git Version Control en cPanel.

## Despliegue recomendado con cPanel y GitHub

1. Crear un repositorio en GitHub.
2. Subir estos archivos al repositorio.
3. En cPanel, abrir **Git Version Control**.
4. Clonar el repositorio en una carpeta fuera de `public_html`, por ejemplo:
   `/home/transportesinteg/repositories/transportes-integrados`.
5. Usar **Deploy HEAD Commit**. El archivo `.cpanel.yml` copiara el sitio a:
   `/home/transportesinteg/public_html/`.

Si el usuario de cPanel o la ruta de `public_html` cambia, actualizar `DEPLOYPATH`
en `.cpanel.yml`.
