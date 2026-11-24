# Láminas del README

Las imágenes de `assets/` salen de `laminas.html`: una página con los tokens de Valion Studio (negro, hueso y grises; Sora 300/500 y JetBrains Mono). Cada lámina es una sección, y las de trabajos y stack tienen versión clara y oscura.

```sh
node src/render.mjs
```

Las capturas se hacen a 2× con el Chrome del sistema, sobre fondo transparente. Las portadas `*-bn.jpg` son las del portafolio pasadas a blanco y negro, con el blanco bajado a #E6E6E6 para que la carta no se pierda sobre el fondo blanco de GitHub.

En GitHub, una imagen con versión clara y oscura (`<picture>`) no puede ir dentro de un enlace: el renderizador le pone su propio enlace y rompe el cambio de tema. Por eso solo llevan enlace la portada, el pie y los botones, que se ven igual en los dos temas.
