# Visualizador ES

Visualizador ES (Visualizador de Estructuras de Datos) es un proyecto **open source** para aprender estructuras de datos mediante visualizaciones 3D, análisis en tiempo real y ejemplos interactivos. La interfaz funciona en español e inglés.

## Metodología

Metodología: aprendizaje basado en práctica con simulaciones 3D y análisis en tiempo real.

## Características principales

- Visualizaciones 3D interactivas para estructuras esenciales.
- Aplicaciones educativas con escenarios reales.
- Feedback paso a paso y análisis de complejidad.
- Soporte bilingüe ES/EN.
- Control por gestos con MediaPipe en la app de visión artificial.
- Interacción con mouse (pan, rotación y zoom).

## Estructuras y aplicaciones incluidas

### Estructuras de datos

- Pila, Cola, Lista Enlazada, Árbol Binario de Búsqueda (BST), AVL, Heap.

### Aplicaciones

- Cola de Mensajes, Multiplicación Polinomial, Algoritmo de Dijkstra, Aprendizaje con Visión Artificial.

## Stack tecnológico

- Next.js 15.1.2 + React 19
- TypeScript 5
- Three.js 0.182 / @react-three/fiber / @react-three/drei
- @react-spring/three y framer-motion
- MediaPipe Tasks Vision
- i18next + react-i18next
- TailwindCSS + shadcn/ui

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/israelgo93/v-estructuradatos.git
cd v-estructuradatos
```

1. Instalar dependencias:

```bash
npm install
```

1. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

1. Abrir [http://localhost:3000](http://localhost:3000)

## Internacionalización (i18n)

- Español e inglés listos de fábrica.
- Archivos de traducción en `public/locales/`.

## Contribuir

Las contribuciones son bienvenidas. Abre un issue para discutir cambios mayores y envía un Pull Request con una descripción clara.

## Créditos

- Este es un proyecto educativo.
- Creador: Ing. Israel J. Gomez, Mgtr.
- Para la materia de Estructura de Datos.
- Facultad de Ciencias de la Vida y Tecnologías - ULEAM.

## Licencia

MIT. Ver [LICENSE](LICENSE).
