---
layout: default
title: "Contacto"
permalink: /contacto/
---

<section class="page-header">
  <div class="container">
    <h1 class="page-title">Contáctanos</h1>
    <p class="page-subtitle">Escríbenos tus dudas, sugerencias o colaboraciones</p>
  </div>
</section>

<section class="contact-section container">
  <div class="contact-grid" style="display:grid;grid-template-columns:1fr;gap:24px;max-width:900px;margin:0 auto;">
    <div class="contact-card" style="background:#fff;padding:24px;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.06)">
      <h2>Envíanos un mensaje</h2>

      <!-- Formulario usando Formspree (recomiendo crear una cuenta gratuita y reemplazar 'YOUR_FORMSPREE_ID') -->
      <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
        <label for="name">Nombre</label><br>
        <input id="name" name="name" type="text" required style="width:100%;padding:10px;margin:8px 0;border-radius:6px;border:1px solid #ddd">

        <label for="email">Correo</label><br>
        <input id="email" name="email" type="email" required style="width:100%;padding:10px;margin:8px 0;border-radius:6px;border:1px solid #ddd">

        <label for="message">Mensaje</label><br>
        <textarea id="message" name="message" rows="6" required style="width:100%;padding:10px;margin:8px 0;border-radius:6px;border:1px solid #ddd"></textarea>

        <button type="submit" style="background:linear-gradient(135deg,#2d8659,#1e5f42);color:#fff;padding:10px 18px;border:none;border-radius:8px;cursor:pointer">Enviar</button>
      </form>

      <p style="margin-top:12px;color:#666;font-size:0.95rem">
        Si no quieres usar Formspree, reemplaza el atributo <code>action</code> por <code>mailto:tu@correo.com</code> (no recomendado para formularios largos).
      </p>
    </div>

    <div class="contact-info" style="padding:12px">
      <h3>Información</h3>
      <p>📍 Dirección: Institución Educativa Atanasio Girardot</p>
      <p>📞 Teléfono: (xxx) xxx-xxxx</p>
      <p>✉️ Correo: <a href="mailto:contacto@ejemplo.com">contacto@ejemplo.com</a></p>
    </div>
  </div>
</section>
