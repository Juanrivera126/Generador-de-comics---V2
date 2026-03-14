# *Generador de Cómics con IA - V2*

Crea historietas completas con las API de Pollinations AI: guiones automáticos, imágenes generadas, subpaneles dinámicos, edición de guiones y descarga como presentación interactiva o tira cómica.

[Demo](https://juanrivera126.github.io/Generador-de-comics---V2/Ejemplos/Demo/)

![License](https://img.shields.io/badge/license-MIT-green)
![Languages](https://img.shields.io/badge/languages-ES%20|%20EN%20|%20FR-brightgreen)

## Características

- **Guiones automáticos** con personajes, diálogos y descripciones visuales
- **3 a 6 paneles** por historieta, con subpaneles dinámicos (2, 3 o 4 subpaneles por panel)
- **Título integrado** en la imagen del primer panel con tipografía creativa
- **Globos de texto** generados directamente en las imágenes
- **Estilos de arte**: Cartoon, Anime, Realista, Cómic, Acuarela, Boceto o estilo personalizado
- **Multiidioma**: Español, Inglés y Francés
- **Relaciones de aspecto**: 16:9, 1:1 y 9:16
- **Continuar historia**: agrega más paneles manteniendo personajes y ambiente
- **Edición de guión**: modifica el JSON y regenera solo los paneles cambiados
- **Herramientas por panel**: Reintentar, Simplificar, Editar u Ocultar
- **Descarga como presentación** HTML interactiva con transiciones animadas
- **Descarga como tira cómica** HTML con vista ampliada al hacer clic en cada panel
- **Modelos dinámicos**: los selectores de modelo de texto e imagen se cargan desde la API de Pollinations

## Inicio Rápido

1. Abre `index.html` en tu navegador (o usa un servidor local)
2. Ve a **Ajustes** y obtén tu clave API con el botón "Obtener Key"
3. Configura idioma, relación de aspecto y estilo de arte
4. Escribe tu idea en el campo de texto y haz clic en **Generar Cómic**

## Uso del Estilo Personalizado

El campo "Estilo Personalizado" define el estilo visual, no el tema. Ejemplos:
- `estilo Ukiyo-e japonés, grabado en madera`
- `art nouveau, líeas orgánicas, estilo Alphonse Mucha`
- `pixel art 8-bit, paleta limitada`
- `estilo Los Simpsons, líneas gruesas`

El estilo se incluye automáticamente en el prompt enviado a la IA.

## Edición Eficiente

Para modificar paneles sin regenerar todo el cómic:
1. Edita el guion JSON directamente en la interfaz
2. Haz clic en **Actualizar Guion**
3. Solo se regeneran los paneles que ya tienen imagen y fueron modificados

Esto ahorra hasta 75% en llamadas a la API comparado con regenerar todo.

## Descargas

- **Presentación**: archivo HTML con navegación por teclado/botones, 7 transiciones animadas y soporte para pantalla completa
- **Tira Cómica**: archivo HTML con grid de paneles, clic para ampliar cada imagen

## APIs Utilizadas

- **Texto (guiones)**: `https://gen.pollinations.ai/v1/chat/completions` (POST)
- **Imágenes**: `https://enter.pollinations.ai/api/generate/image/{prompt}` (GET)
- **Modelos de texto**: `https://gen.pollinations.ai/text/models`
- **Modelos de imagen**: `https://enter.pollinations.ai/api/generate/image/models`

## Autor

**Juan Guillermo Rivera Berrío**
Diseñado con tecnología Gemini 2.5 Pro - Idea original de dimlylitsouls en WebSim

## Licencia

MIT
