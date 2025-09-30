
AOS.init({
  duration: 800,
  offset: 100,
  once: true,
  easing: 'ease-in-out'
});

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    

    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
      ? 'rotate(45deg) translate(5px, 5px)' 
      : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
      ? 'rotate(-45deg) translate(7px, -6px)' 
      : 'none';
  });
}


const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navMenu.classList.remove('active');
    }
  });
});

const audioPlayer = document.getElementById('himno');
const audioToggle = document.getElementById('toggle-audio');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

if (audioToggle && audioPlayer) {
  audioToggle.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline';
      audioToggle.classList.add('playing');
    } else {
      audioPlayer.pause();
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      audioToggle.classList.remove('playing');
    }
  });
}

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

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

// Observador para elementos que entran en el viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Si es un contador, animarlo
      if (entry.target.classList.contains('counter')) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    }
  });
}, {
  threshold: 0.1
});

// Observar todos los elementos con la clase 'animate-on-scroll'
document.querySelectorAll('.animate-on-scroll, .counter').forEach(el => {
  observer.observe(el);
});

// Galería lightbox simple
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

// Agregar estilos para el lightbox dinámicamente
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

const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Lazy loading para imágenes
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

// Búsqueda en tiempo real (si existe campo de búsqueda)
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
      const title = card.querySelector('.news-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Actualizar año en el footer automáticamente
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement && yearElement.textContent.includes('2024')) {
  yearElement.textContent = yearElement.textContent.replace('2024', new Date().getFullYear());
}

console.log('🎓 Periódico Digital Atanasio Girardot - Cargado exitosamente!');