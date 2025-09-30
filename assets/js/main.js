// Envolver todo en IIFE para evitar conflictos de variables globales
(function() {
  'use strict';

  // ==========================================
  // INICIALIZACIÓN DE AOS
  // ==========================================
  AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: 'ease-in-out'
  });

  // ==========================================
  // MENÚ MÓVIL
  // ==========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      const spans = navToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = navMenu.classList.contains('active') 
          ? 'rotate(45deg) translate(5px, 5px)' 
          : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
          ? 'rotate(-45deg) translate(7px, -6px)' 
          : 'none';
      }
    });
  }

  // ==========================================
  // CERRAR MENÚ AL HACER CLICK EN ENLACES
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navMenu) {
        navMenu.classList.remove('active');
      }
    });
  });

  // ==========================================
  // CONTROL DE AUDIO DEL HIMNO
  // ==========================================
const audioPlayer = document.getElementById('himno');
const audioToggle = document.getElementById('toggle-audio');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const audioOverlay = document.getElementById('audio-overlay');
const overlayPlay = document.getElementById('overlay-play');

function updateToggleUI(isPlaying) {
  if (!audioToggle) return;
  if (isPlaying) {
    audioToggle.classList.add('playing');
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'inline';
    audioToggle.style.display = 'inline-block';
  } else {
    audioToggle.classList.remove('playing');
    if (playIcon) playIcon.style.display = 'inline';
    if (pauseIcon) pauseIcon.style.display = 'none';
    audioToggle.style.display = 'inline-block';
  }
}
if (audioPlayer) {
  // Forzar volumen si quieres; por defecto 1.0
  audioPlayer.volume = 1.0;

  // Intentamos reproducir (puede fallar por política de autoplay)
  audioPlayer.play().then(() => {
    updateToggleUI(true);
    console.log('Himno: reproducido automáticamente.');
  }).catch((err) => {
    console.warn('Autoplay bloqueado por el navegador:', err);
    // Mostrar overlay para pedir interacción del usuario
    if (audioOverlay) audioOverlay.style.display = 'flex';
    if (audioToggle) audioToggle.style.display = 'none'; // esconder toggle hasta que el usuario interactúe
  });

  // Toggle botón (si el autoplay sí se permitió o después de interacción)
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      if (audioPlayer.paused) {
        audioPlayer.play().then(() => updateToggleUI(true)).catch(() => {
          // si falla, mostrar overlay
          if (audioOverlay) audioOverlay.style.display = 'flex';
        });
      } else {
        audioPlayer.pause();
        updateToggleUI(false);
      }
    });
  }

  // Overlay play (gesto del usuario)
  if (overlayPlay) {
    overlayPlay.addEventListener('click', () => {
      audioPlayer.play().then(() => {
        if (audioOverlay) audioOverlay.style.display = 'none';
        updateToggleUI(true);
      }).catch(err => {
        console.error('No se pudo reproducir tras interacción:', err);
      });
    });
  }
}

  // ==========================================
  // FRASES DIARIAS
  // ==========================================
  const frases = [
    {
      texto: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
      autor: "Nelson Mandela"
    },
    {
      texto: "El conocimiento es poder, la información es libertad.",
      autor: "Bill Gates"
    },
    {
      texto: "La educación no es preparación para la vida; la educación es la vida misma.",
      autor: "John Dewey"
    },
    {
      texto: "Nunca consideres el estudio como una obligación, sino como una oportunidad.",
      autor: "Albert Einstein"
    },
    {
      texto: "La mejor herencia que podemos dejar es la educación.",
      autor: "Proverbio"
    }
  ];

  function cambiarFraseDiaria() {
    const quoteElement = document.getElementById('daily-quote');
    const authorElement = document.getElementById('quote-author');
    
    if (quoteElement && authorElement) {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      
      const fraseIndex = dayOfYear % frases.length;
      const fraseDelDia = frases[fraseIndex];
      
      quoteElement.textContent = fraseDelDia.texto;
      authorElement.textContent = `— ${fraseDelDia.autor}`;
    }
  }

  cambiarFraseDiaria();

  // ==========================================
  // SCROLL SUAVE PARA ANCLAS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ==========================================
  // EFECTO PARALLAX EN HERO
  // ==========================================
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const hero = document.querySelector('.hero-section');
    
    if (hero && scrollTop < window.innerHeight) {
      hero.style.opacity = 1 - (scrollTop / window.innerHeight) * 0.8;
      hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }
    
    lastScrollTop = scrollTop;
  });

  // ==========================================
  // ANIMACIÓN DE CONTADORES
  // ==========================================
  function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = Math.round(target);
        clearInterval(timer);
      } else {
        element.textContent = Math.round(current);
      }
    }, 16);
  }

  // ==========================================
  // INTERSECTION OBSERVER PARA ANIMACIONES
  // ==========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Si es un contador, animarlo
        if (entry.target.classList.contains('counter')) {
          const target = parseInt(entry.target.dataset.target);
          if (!isNaN(target)) {
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
          }
        }
      }
    });
  }, {
    threshold: 0.1
  });

  // Observar elementos con animación
  document.querySelectorAll('.animate-on-scroll, .counter').forEach(el => {
    observer.observe(el);
  });

  // ==========================================
  // GALERÍA LIGHTBOX
  // ==========================================
  document.querySelectorAll('.photo-item img').forEach(img => {
    img.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img src="${this.src}" alt="${this.alt}">
        </div>
      `;
      
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Cerrar lightbox
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.className === 'lightbox-close') {
          document.body.removeChild(lightbox);
          document.body.style.overflow = 'auto';
        }
      });
    });
  });

  // ==========================================
  // ESTILOS PARA LIGHTBOX
  // ==========================================
  const lightboxStyles = `
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    }
    
    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }
    
    .lightbox-content img {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 10px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    
    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      color: white;
      font-size: 40px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .lightbox-close:hover {
      transform: scale(1.2);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  // Solo agregar estilos si no existen
  if (!document.getElementById('lightbox-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'lightbox-styles';
    styleSheet.textContent = lightboxStyles;
    document.head.appendChild(styleSheet);
  }

  // ==========================================
  // LAZY LOADING DE IMÁGENES
  // ==========================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ==========================================
  // BÚSQUEDA EN TIEMPO REAL
  // ==========================================
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const newsCards = document.querySelectorAll('.news-card');
      
      newsCards.forEach(card => {
        const titleElement = card.querySelector('.news-title');
        const excerptElement = card.querySelector('.news-excerpt');
        
        if (titleElement && excerptElement) {
          const title = titleElement.textContent.toLowerCase();
          const excerpt = excerptElement.textContent.toLowerCase();
          
          if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  }

  // ==========================================
  // ACTUALIZAR AÑO EN FOOTER
  // ==========================================
  const yearElement = document.querySelector('.footer-bottom p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace(/\d{4}/, currentYear);
  }

  // ==========================================
  // LOG DE INICIALIZACIÓN
  // ==========================================
  console.log('🎓 Periódico Digital Atanasio Girardot - Cargado exitosamente!');

})(); // Fin del IIFE