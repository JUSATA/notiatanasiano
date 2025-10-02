---
layout: default
title: "Noticias"
permalink: /noticias/
---

<section class="page-header">
  <div class="container">
    <h1 class="page-title"><span class="icon">📰</span>Últimas Noticias</h1>
    <p class="page-subtitle">Novedades y comunicados de la institución</p>
  </div>
</section>

<section class="news-section container">
  {% if site.noticias and site.noticias.size > 0 %}
    <div class="news-grid">
      {% assign noticias_sorted = site.noticias | sort: "date" | reverse %}
      {% for noticia in noticias_sorted %}
        <article class="news-card">
          <a href="{{ noticia.url | relative_url }}" class="news-link">
            {% if noticia.image %}
              <div class="news-image">
                <img src="{{ noticia.image | relative_url }}" alt="{{ noticia.title }}">
              </div>
            {% endif %}
            <div class="news-content">
              <h2 class="news-title">{{ noticia.title }}</h2>
              <p class="news-meta">📅 {{ noticia.date | date: "%d %b %Y" }} {% if noticia.author %} • ✍️ {{ noticia.author }}{% endif %}</p>
              <p class="news-excerpt">{{ noticia.excerpt | default: noticia.content | strip_html | truncate: 180 }}</p>
            </div>
          </a>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <div style="text-align:center; padding:40px; color:#666;">
      <p>📰 No hay noticias publicadas por el momento.</p>
    </div>
  {% endif %}
</section>
