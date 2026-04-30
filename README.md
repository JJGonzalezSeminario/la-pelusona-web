# La Pelusona - Sitio Web Oficial

Sitio web One-Pager para La Pelusona, fonda cultural en Berlín. Desarrollado con Next.js, Tailwind CSS y Framer Motion.

## 🚀 Características

- ✨ Diseño moderno con animaciones fluidas (Framer Motion)
- 🌍 Trilingüe: Español, Alemán e Inglés
- 📱 Totalmente responsive
- 🎨 Paleta de colores personalizada basada en el logo
- 📸 Galería por años con placeholders para tus fotos
- 📅 Sección de eventos próximos
- 📝 Formulario de postulaciones integrable con Formspree/Netlify Forms
- ⚡ Optimizado para rendimiento

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

## 🛠️ Instalación

1. **Clona o descarga este proyecto**

2. **Instala las dependencias:**

```bash
npm install
# o
yarn install
```

## 🏃‍♂️ Comandos de Desarrollo

### Modo desarrollo (con hot reload):
```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción:
```bash
npm run build
# o
yarn build
```

### Iniciar servidor de producción:
```bash
npm run start
# o
yarn start
```

## 🎨 Personalización

### 1. Reemplazar el Logo

En `components/LaPelusona.tsx`, línea ~196:

```tsx
{/* Logo placeholder - REEMPLAZA CON TU LOGO */}
<motion.div className="mb-12 flex justify-center">
  <img 
    src="/images/logo-la-pelusona.png" 
    alt="La Pelusona Logo"
    className="w-48 h-48 rounded-full"
  />
</motion.div>
```

### 2. Añadir Fotos a la Galería

En la sección `GallerySection`, reemplaza los placeholders:

```tsx
{/* MARCADOR DE POSICIÓN - Reemplazar con: */}
<img 
  src="https://tu-url-de-imagen.com/foto.jpg" 
  alt={`La Pelusona ${edition.year} - Foto ${i + 1}`}
  className="w-full h-full object-cover"
/>
```

**Recomendación:** Sube tus fotos a:
- Cloudinary (gratis hasta 25GB)
- ImgBB
- Tu propio servidor
- GitHub (para imágenes estáticas)

### 3. Configurar Formspree para el Formulario

1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia tu Form ID
5. En `components/LaPelusona.tsx`, línea ~494, reemplaza:

```tsx
action="https://formspree.io/f/TU_FORM_ID_AQUI"
```

**Alternativa con Netlify Forms:**
Si deployeas en Netlify, simplemente añade:
```tsx
<form name="postulaciones" method="POST" data-netlify="true">
```

### 4. Actualizar Eventos

En `components/LaPelusona.tsx`, modifica el array `upcomingEvents`:

```tsx
const upcomingEvents = [
  {
    id: 1,
    date: '2025-05-15',
    title: { 
      es: 'Tu Evento en Español', 
      de: 'Dein Event auf Deutsch', 
      en: 'Your Event in English' 
    },
    description: { 
      es: 'Descripción del evento...', 
      de: 'Veranstaltungsbeschreibung...', 
      en: 'Event description...' 
    }
  },
  // Añade más eventos aquí
];
```

### 5. Enlaces de Redes Sociales

En el componente `Footer`, líneas ~563-573, actualiza los enlaces:

```tsx
<a href="https://instagram.com/tu_usuario" ...>
<a href="https://facebook.com/tu_pagina" ...>
```

### 6. Colores Personalizados

Si quieres ajustar la paleta de colores, edita `tailwind.config.js`:

```js
colors: {
  navy: {
    DEFAULT: '#0a1628',  // Azul marino principal
    dark: '#050b14',     // Azul marino oscuro
  },
  burgundy: {
    DEFAULT: '#8b0000',  // Rojo burdeos
    light: '#a31010',    // Rojo burdeos claro
  },
  lightblue: '#87ceeb',  // Azul claro
},
```

## 📁 Estructura del Proyecto

```
la-pelusona-website/
├── app/
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página home
│   └── globals.css       # Estilos globales
├── components/
│   └── LaPelusona.tsx    # Componente principal
├── public/
│   └── images/           # Coloca aquí tus imágenes
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🌐 Deployment

### Vercel (Recomendado para Next.js)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. ¡Deploy automático!

### Netlify

1. Sube tu código a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. Importa tu repositorio
4. Build command: `npm run build`
5. Publish directory: `.next`

## 📝 Páginas Legales (Obligatorias en Alemania)

Debes crear las páginas:
- `/impressum` - Información legal del sitio
- `/datenschutz` - Política de privacidad

Genera el contenido legal usando:
- [Impressum Generator](https://www.impressum-generator.de/)
- [Datenschutz Generator](https://datenschutz-generator.de/)

## 🎯 Próximos Pasos

1. Reemplaza el logo y las imágenes
2. Configura Formspree
3. Actualiza los eventos y textos
4. Añade tus enlaces de redes sociales
5. Crea las páginas legales
6. ¡Deploy a producción!

## 🐛 Troubleshooting

### Error de instalación
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problemas con Framer Motion
```bash
npm install framer-motion@latest
```

### Error de build
Asegúrate de tener Node.js 18+ instalado:
```bash
node --version
```

## 📧 Soporte

Para cualquier duda o problema, contacta con el equipo de desarrollo.

---

**¡Hecho con ❤️ para La Pelusona!**
