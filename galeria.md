---
layout: default
title: "Galería de Fotos"
permalink: /galeria/
---

<section class="page-header">
  <div class="container">
    <h1 class="page-title">Galería de Fotos</h1>
    <p class="page-subtitle">Momentos, actividades y recuerdos de la institución</p>
  </div>
</section>

<section class="gallery-section container">
  {% assign fotos_from_data = site.data.fotos | default: [] %}
  {% assign fotos_from_collection = site.galeria | default: [] %}

  {% assign all_fotos = fotos_from_data | concat: fotos_from_collection %}

  {% if all_fotos and all_fotos.size > 0 %}
    <div class="gallery-grid">
      {% for foto in all_fotos %}
        {%- comment -%}
          foto puede venir de _data/fotos.yml (estructura: url, title, caption)
          o de la colección _galeria (con front matter: title, image, excerpt)
        {%- endcomment -%}

        {% assign img_url = foto.url | default: foto.image | default: "" %}
        {% assign title = foto.title | default: foto.name | default: "" %}
        {% assign caption = foto.caption | default: foto.excerpt | default: "" %}

        <figure class="gallery-item">
          <button class="gallery-thumb" data-src="{{ img_url | relative_url }}" data-title="{{ title | escape }}" data-caption="{{ caption | escape }}" aria-label="Abrir imagen: {{ title | escape }}">
            <img src="{{ img_url | relative_url }}" alt="{{ title | escape }}">
          </button>
          {% if title %}
            <figcaption class="gallery-caption">{{ title }}</figcaption>
          {% endif %}
        </figure>
      {% endfor %}
    </div>
  {% else %}
    <div class="no-photos" style="text-align:center; padding:40px; color:#666;">
      <p>📸 No hay fotos en la galería por el momento.</p>
    </div>
  {% endif %}
</section>

<!-- LIGHTBOX / MODAL -->
<div id="gallery-lightbox" class="glightbox" aria-hidden="true" style="display:none;">
  <div class="glightbox-backdrop" data-close="true"></div>
  <div class="glightbox-body" role="dialog" aria-modal="true" tabindex="-1">
    <button class="glightbox-close" aria-label="Cerrar">&times;</button>
    <div class="glightbox-media">
      <img id="glightbox-image" src="" alt="">
    </div>
    <div class="glightbox-info">
      <h3 id="glightbox-title"></h3>
      <p id="glightbox-caption"></p>
    </div>
    <button class="glightbox-prev" aria-label="Anterior">‹</button>
    <button class="glightbox-next" aria-label="Siguiente">›</button>
  </div>
</div>

<!-- Estilos específicos de galería (puedes moverlos a tu CSS) -->
<style>
.gallery-grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  align-items: start;
}
.gallery-item{border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,0.06);}
.gallery-thumb{border:0;padding:0;margin:0;display:block;width:100%;cursor:pointer;background:transparent;}
.gallery-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease;}
.gallery-thumb:hover img{transform:scale(1.05);}
.gallery-caption{padding:10px 12px;font-weight:600;color:var(--text-dark);font-size:0.95rem}

/* Lightbox */
.glightbox{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center}
.glightbox-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.7)}
.glightbox-body{position:relative;z-index:2;max-width:1100px;width:95%;max-height:90vh;overflow:auto;background:#fff;border-radius:12px;padding:18px;box-shadow:0 30px 80px rgba(0,0,0,0.4);display:grid;grid-template-columns:1fr;gap:12px}
.glightbox-media img{width:100%;height:auto;border-radius:8px;display:block;max-height:65vh;object-fit:contain}
.glightbox-info{padding:6px 2px}
.glightbox-title{margin:0}
.glightbox-close{position:absolute;right:12px;top:10px;border:0;background:transparent;font-size:28px;cursor:pointer}
.glightbox-prev,.glightbox-next{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.05);border:0;padding:8px 12px;border-radius:6px;cursor:pointer;font-size:22px}
.glightbox-prev{left:10px}
.glightbox-next{right:10px}

/* Responsive: lightbox layout on small screens */
@media (max-width:640px){
  .glightbox-body{padding:12px}
  .glightbox-prev,.glightbox-next{display:none}
}
</style>

<!-- Script ligero para lightbox (no depende de librerías) -->
<script>
(function(){
  const lightbox = document.getElementById('gallery-lightbox');
  const imgEl = document.getElementById('glightbox-image');
  const titleEl = document.getElementById('glightbox-title');
  const captionEl = document.getElementById('glightbox-caption');
  const closeBtn = document.querySelector('.glightbox-close');
  const backdrop = document.querySelector('.glightbox-backdrop');
  const prevBtn = document.querySelector('.glightbox-prev');
  const nextBtn = document.querySelector('.glightbox-next');

  const items = Array.from(document.querySelectorAll('.gallery-thumb'));
  let current = -1;

  function openAt(i){
    const btn = items[i];
    if(!btn) return;
    const src = btn.getAttribute('data-src');
    const title = btn.getAttribute('data-title') || '';
    const caption = btn.getAttribute('data-caption') || '';
    imgEl.src = src;
    imgEl.alt = title;
    titleEl.textContent = title;
    captionEl.textContent = caption;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    current = i;
  }

  function closeLB(){
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden','true');
    imgEl.src = '';
    document.body.style.overflow = '';
    current = -1;
  }

  function showNext(){
    if(current < items.length - 1) openAt(current + 1);
  }
  function showPrev(){
    if(current > 0) openAt(current - 1);
  }

  // abrir al click
  items.forEach((btn, idx) => {
    btn.addEventListener('click', function(e){
      e.preventDefault();
      openAt(idx);
    });
  });

  // cerrar
  closeBtn && closeBtn.addEventListener('click', closeLB);
  backdrop && backdrop.addEventListener('click', closeLB);

  // prev/next
  prevBtn && prevBtn.addEventListener('click', showPrev);
  nextBtn && nextBtn.addEventListener('click', showNext);

  // keyboard
  document.addEventListener('keydown', function(e){
    if(lightbox.style.display !== 'flex') return;
    if(e.key === 'Escape') closeLB();
    if(e.key === 'ArrowRight') showNext();
    if(e.key === 'ArrowLeft') showPrev();
  });
})();
</script>
