---
layout: default
title: "Eventos"
permalink: /eventos/
---

<style>
.page-header {
    padding: 60px 0 40px;
    text-align: center;
}

.page-header h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 20px;
    background: linear-gradient(135deg, #c8102e, #667eea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.page-header p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #666;
}

.events-timeline {
    max-width: 1000px;
    margin: 0 auto;
}

.event-item {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 30px;
    margin-bottom: 30px;
    padding: 30px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
}

.event-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.event-date {
    background: linear-gradient(135deg, #c8102e, #a00d26);
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 120px;
}

.event-date .day {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1;
}

.event-date .month {
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 5px;
}

.event-date .year {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-top: 5px;
}

.event-badge {
    display: inline-block;
    background: #2d8659;
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    margin-bottom: 12px;
    font-weight: 600;
}

.event-content h3 {
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    margin-bottom: 12px;
}

.event-content h3 a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
}

.event-content h3 a:hover {
    color: #667eea;
}

.event-content > p {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.6;
}

.event-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    font-size: 0.95rem;
    color: #888;
}

.event-meta span {
    display: flex;
    align-items: center;
    gap: 5px;
}

.event-link {
    display: inline-block;
    padding: 12px 28px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 600;
    transition: all 0.3s;
}

.event-link:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.empty-state {
    text-align: center;
    padding: 80px 20px;
}

.empty-state-icon {
    font-size: 5rem;
    margin-bottom: 20px;
    opacity: 0.5;
}

.empty-state h2 {
    font-size: 2rem;
    color: #666;
    margin-bottom: 10px;
}

.empty-state p {
    color: #999;
    font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
    .event-item {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
    }
    
    .event-date {
        flex-direction: row;
        justify-content: space-around;
        min-height: auto;
        padding: 15px;
    }
    
    .event-date .day {
        font-size: 2.5rem;
    }
    
    .event-date .month {
        font-size: 1rem;
    }
    
    .page-header {
        padding: 40px 0 30px;
    }
}

@media (max-width: 480px) {
    .event-date {
        flex-direction: column;
        gap: 5px;
    }
    
    .event-meta {
        flex-direction: column;
        gap: 8px;
    }
}
</style>

<div class="container">
 
<section class="page-header">
  <div class="container">
  <span class="icon">📅</span>
    <h1 class="page-title">Eventos</h1>
    <p class="page-subtitle">Cronograma Institucional</p>
  </div>
</section>


  <section class="eventos-list">
    {% if site.eventos.size > 0 %}
      <div class="events-timeline">
        {% for evento in site.eventos %}
        <div class="event-item">
          <div class="event-date">
            <span class="day">{{ evento.date | date: "%d" }}</span>
            <span class="month">{{ evento.date | date: "%b" }}</span>
            <span class="year">{{ evento.date | date: "%Y" }}</span>
          </div>
          
          <div class="event-content">
            <span class="event-badge">📅 Evento</span>
            <h3><a href="{{ evento.url | relative_url }}">{{ evento.title }}</a></h3>
            <p>{{ evento.description }}</p>
            
            <div class="event-meta">
              {% if evento.location %}
              <span>📍 {{ evento.location }}</span>
              {% endif %}
              {% if evento.time %}
              <span>🕐 {{ evento.time }}</span>
              {% endif %}
            </div>
            
            <a href="{{ evento.url | relative_url }}" class="event-link">Ver detalles →</a>
          </div>
        </div>
        {% endfor %}
      </div>
    {% else %}
      <div class="empty-state">
        <div class="empty-state-icon">📅</div>
        <h2>No hay eventos programados</h2>
        <p>Próximamente publicaremos los eventos de nuestra institución</p>
      </div>
    {% endif %}
  </section>
</div>