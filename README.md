# 📰 Periódico Digital - IE Atanasio Girardot

Periódico digital institucional desarrollado con Jekyll para GitHub Pages. Incluye sistema automatizado de contenido, diseño moderno y animado, soporte multimedia completo y reproducción del himno institucional.

## 🚀 Características

- ✅ **Diseño Moderno y Animado**: Interfaz atractiva con animaciones fluidas
- ✅ **Sistema de Noticias**: Publicación automática con categorías y fechas
- ✅ **Galería Multimedia**: Soporte para fotos, videos y audio
- ✅ **Frases Diarias**: Sistema rotativo de frases inspiradoras
- ✅ **Reproductor de Himno**: Audio de fondo con control de reproducción
- ✅ **Responsive**: Adaptado a dispositivos móviles, tablets y escritorio
- ✅ **SEO Optimizado**: Mejor posicionamiento en buscadores
- ✅ **Compartir en Redes**: Integración con Facebook, Twitter, WhatsApp

## 📁 Estructura del Proyecto

```
tu-repositorio/
├── _config.yml                 # Configuración principal
├── _layouts/
│   ├── default.html           # Layout base
│   ├── noticia.html          # Layout para noticias
│   └── evento.html           # Layout para eventos
├── _noticias/                # Artículos de noticias
│   └── 2025-09-29-ejemplo.md
├── _eventos/                 # Eventos próximos
├── _data/
│   ├── frases.yml           # Frases inspiradoras
│   ├── videos.yml           # Videos destacados
│   └── fotos.yml            # Galería de fotos
├── assets/
│   ├── css/
│   │   └── main.css         # Estilos principales
│   ├── js/
│   │   └── main.js          # JavaScript
│   ├── images/
│   │   ├── logo.png         # Logo institucional
│   │   ├── bandera-girardota.png
│   │   └── noticias/
│   └── audio/
│       └── himno.mp3        # Himno institucional
├── index.html               # Página principal
├── noticias.html           # Listado de noticias
├── galeria.html            # Galería de fotos
├── Gemfile                 # Dependencias Ruby
└── README.md
```

## 🛠️ Instalación Local

### Requisitos Previos

- Ruby 2.7 o superior
- Bundler
- Git

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

2. **Instalar dependencias:**
```bash
bundle install
```

3. **Ejecutar servidor local:**
```bash
bundle exec jekyll serve
```

4. **Abrir en navegador:**
```
http://localhost:4000
```

## 🚀 Despliegue en GitHub Pages

### Opción 1: Configuración Automática

1. **Crear repositorio en GitHub**
   - Nombre: `tu-usuario.github.io` o cualquier nombre

2. **Subir el código:**
```bash
git add .
git commit -m "Primer commit - Periódico Digital"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

3. **Configurar GitHub Pages:**
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/root`
   - Guarda los cambios

4. **Tu sitio estará disponible en:**
   - `https://tu-usuario.github.io/tu-repositorio/`

### Opción 2: GitHub Actions (Recomendado)

Crea el archivo `.github/workflows/jekyll.yml`:

```yaml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## ✏️ Crear Nueva Noticia

1. **Crear archivo en `_noticias/`:**
```bash
_noticias/2025-09-30-titulo-noticia.md
```

2. **Agregar contenido:**
```markdown
---
layout: noticia
title: "Título de la Noticia"
date: 2025-09-30
category: "Eventos"
author: "Nombre del Autor"
image: "/assets/images/noticias/imagen.jpg"
video: "https://www.youtube.com/embed/VIDEO_ID"
excerpt: "Breve descripción de la noticia"
galeria:
  - "/assets/images/galeria/foto1.jpg"
  - "/assets/images/galeria/foto2.jpg"
---

## Tu contenido aquí

Escribe tu noticia en formato Markdown...
```

## 📸 Agregar Imágenes

1. Coloca las imágenes en `assets/images/noticias/`
2. Referéncialas en el front matter: `/assets/images/noticias/nombre.jpg`

## 🎥 Agregar Videos

### YouTube
```markdown
video: "https://www.youtube.com/embed/VIDEO_ID"
```

### Videos Locales
```markdown
video: "/assets/videos/mi-video.mp4"
```

## 🎵 Configurar Himno

1. Coloca el archivo MP3 en `assets/audio/himno.mp3`
2. Actualiza `_config.yml`:
```yaml
institution:
  anthem: "/assets/audio/himno.mp3"
```

## 📝 Agregar Nuevas Frases

Edita `_data/frases.yml`:
```yaml
- texto: "Tu frase inspiradora aquí"
  autor: "Autor de la frase"
```

## 🎨 Personalización

### Colores
Edita las variables CSS en `assets/css/main.css`:
```css
:root {
  --primary-green: #2d8659;
  --secondary-red: #c8102e;
  --accent-gold: #ffd700;
}
```

### Logo
Reemplaza `/assets/images/logo.png` con tu logo institucional

### Redes Sociales
Actualiza en `_config.yml`:
```yaml
social:
  facebook: "https://facebook.com/tu-pagina"
  youtube: "https://youtube.com/tu-canal"
  instagram: "https://instagram.com/tu-cuenta"
```

## 📱 Características Responsive

El sitio se adapta automáticamente a:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1920px+)

## 🔧 Solución de Problemas

### El sitio no se despliega
- Verifica que el repositorio sea público
- Revisa la configuración en Settings → Pages
- Verifica que `_config.yml` tenga `baseurl` correcto

### Las imágenes no cargan
- Verifica las rutas en `_config.yml`
- Usa rutas relativas: `/assets/images/...`

### El himno no suena
- Verifica que el archivo MP3 esté en la ruta correcta
- Comprueba el formato de audio (MP3 recomendado)
- Verifica permisos de autoplay en el navegador

## 📚 Recursos Adicionales

- [Documentación Jekyll](https://jekyllrb.com/docs/)
- [GitHub Pages](https://pages.github.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [AOS Animation](https://michalsnik.github.io/aos/)

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 💖 Desarrollado con

- Jekyll 4.3
- HTML5 & CSS3
- JavaScript ES6
- AOS Animations
- GitHub Pages

---

**Hecho con ❤️ para la comunidad educativa de la IE Atanasio Girardot**

🌐 **Sitio Web:** https://tu-usuario.github.io/tu-repositorio
📧 **Contacto:** contacto@ieatanasiogirardot.edu.co
📍 **Ubicación:** Girardota, Antioquia, Colombia