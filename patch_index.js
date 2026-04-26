const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update CSS
const cssToInsert = `
  /* ============================================================
     HOME - MENU
  ============================================================ */
  #page-home {
    background: #080808;
    color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 24px;
    position: relative;
    overflow: hidden;
  }
  #page-home .home-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 8vw, 80px);
    letter-spacing: 0.04em;
    margin-bottom: 16px;
    text-align: center;
    animation: fadeUp 0.8s ease both;
  }
  #page-home .home-subtitle {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    color: #aaa;
    margin-bottom: 64px;
    text-align: center;
    animation: fadeUp 0.8s 0.1s ease both;
  }
  .home-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    width: 100%;
    max-width: 1200px;
    animation: fadeUp 0.8s 0.2s ease both;
  }
  .home-card {
    background: #111;
    border: 1px solid #222;
    border-radius: 8px;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s, border-color 0.3s, background 0.3s;
    position: relative;
    overflow: hidden;
  }
  .home-card:hover {
    transform: translateY(-8px);
    background: #181818;
  }
  .home-card img {
    height: 240px;
    object-fit: contain;
    margin-bottom: 24px;
    transition: transform 0.3s;
  }
  .home-card:hover img {
    transform: scale(1.05);
  }
  .home-card h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }
  .home-card p {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #888;
    line-height: 1.6;
  }
  .home-card[data-target="eboost"]:hover { border-color: #d4ff00; }
  .home-card[data-target="eboost"] h3 { color: #d4ff00; }
  
  .home-card[data-target="renova"]:hover { border-color: #b56ef5; }
  .home-card[data-target="renova"] h3 { color: #b56ef5; }
  
  .home-card[data-target="burn24"]:hover { border-color: #7ed321; }
  .home-card[data-target="burn24"] h3 { color: #7ed321; }

  /* Update .hero to use flex row for image and content */
  .product-page .hero {
    display: flex; flex-direction: row;
    justify-content: space-between; align-items: center;
  }
  .product-page .hero-content {
    flex: 1;
    max-width: 60%;
    position: relative; z-index: 2;
  }
  .product-page .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; z-index: 2;
  }
  .product-page .hero-image img {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    animation: fadeUp 0.8s 0.2s ease both;
  }
  
  /* Make nav-brand clickable to go home */
  .nav-brand { cursor: pointer; }
  .nav-brand:hover { color: #ddd; }

  @media (max-width: 768px) {
    .home-cards { grid-template-columns: 1fr; }
    .product-page .hero { flex-direction: column; align-items: flex-start; }
    .product-page .hero-image { width: 100%; margin-top: 40px; }
  }
`;

html = html.replace('/* ============================================================', cssToInsert + '\n  /* ============================================================');

// Also in responsive css:
// .product-page .hero-content { max-width: 100%; } is already there. Let's make sure flex-direction column works.
// Actually it's simpler if I replace `.product-page .hero {` rules in the original code, but let's let my additions override the original since they are later in the CSS or I'll just replace the original hero rules.
html = html.replace(/\.product-page \.hero \{[\s\S]*?\}/, '');

// 2. Add #page-home
const homePageHtml = `
<!-- ====================================================
     HOME PAGE
===================================================== -->
<div id="page-home" class="product-page active">
  <h1 class="home-title">Bienvenido a FWP</h1>
  <p class="home-subtitle">Selecciona un producto para ver su guía completa</p>
  <div class="home-cards">
    <div class="home-card" data-target="eboost" onclick="switchProduct('eboost')">
      <img src="assets/eboost.png" alt="E-BOOST">
      <h3>E-BOOST</h3>
      <p>Energía, Concentración y Recuperación Total. Suplemento de Alto Rendimiento.</p>
    </div>
    <div class="home-card" data-target="renova" onclick="switchProduct('renova')">
      <img src="assets/renova.png" alt="RENÖVA+">
      <h3>RENÖVA+</h3>
      <p>Dosis Diaria de Juventud. Fórmula Antiedad de Alto Impacto con colágeno y vitaminas.</p>
    </div>
    <div class="home-card" data-target="burn24" onclick="switchProduct('burn24')">
      <img src="assets/burn24.png" alt="24BURN">
      <h3>24BURN</h3>
      <p>Reduce y Activa Todos los Días. Guía Completa de Ingredientes y Consumo.</p>
    </div>
  </div>
</div>
`;

html = html.replace('<!-- ====================================================', homePageHtml + '\n<!-- ====================================================');

// 3. Update nav-brand to be clickable
html = html.replace('<div class="nav-brand">FWP <span>Guías de Productos</span></div>', '<div class="nav-brand" onclick="goHome()">FWP <span>Guías de Productos</span></div>');

// 4. Update the other pages to not be active by default
html = html.replace('<div id="page-eboost" class="product-page active">', '<div id="page-eboost" class="product-page">');

// 5. Update nav-tab active state removal
html = html.replace('<div class="nav-tab active" data-product="eboost"', '<div class="nav-tab" data-product="eboost"');

// 6. Wrap contents in hero for E-BOOST and 24BURN, and add images
// EBOOST
html = html.replace(
  '<div class="hero">\n  <span class="hero-tag">⚡ Suplemento de Alto Rendimiento</span>\n  <h1>E-<span>BOOST</span></h1>\n  <p class="hero-sub">\n    <strong>Energía, Concentración y Recuperación Total.</strong><br>\n    Estudiar a alto nivel es una demanda física y mental agotadora. E-Boost no es una bebida azucarada; es ciencia aplicada para que tu cuerpo y tu cerebro no se "apaguen" cuando más los necesitas.\n  </p>\n  <div class="hero-scroll">Desplaza para descubrir</div>\n</div>',
  `<div class="hero">
  <div class="hero-content">
    <span class="hero-tag">⚡ Suplemento de Alto Rendimiento</span>
    <h1>E-<span>BOOST</span></h1>
    <p class="hero-sub">
      <strong>Energía, Concentración y Recuperación Total.</strong><br>
      Estudiar a alto nivel es una demanda física y mental agotadora. E-Boost no es una bebida azucarada; es ciencia aplicada para que tu cuerpo y tu cerebro no se "apaguen" cuando más los necesitas.
    </p>
  </div>
  <div class="hero-image">
    <img src="assets/eboost.png" alt="E-BOOST">
  </div>
  <div class="hero-scroll">Desplaza para descubrir</div>
</div>`
);

// RENOVA
html = html.replace(
  `<div class="hero-stats">
    <div class="hero-stat">
      <span class="hero-stat-val">11g</span>
      <span class="hero-stat-label">Proteína por porción</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-val">0g</span>
      <span class="hero-stat-label">Azúcar añadida</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-val">315g</span>
      <span class="hero-stat-label">Neto por envase</span>
    </div>
  </div>
  </div>
  <div class="hero-scroll">Desplaza para descubrir</div>
</div>`,
  `<div class="hero-stats">
    <div class="hero-stat">
      <span class="hero-stat-val">11g</span>
      <span class="hero-stat-label">Proteína por porción</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-val">0g</span>
      <span class="hero-stat-label">Azúcar añadida</span>
    </div>
    <div class="hero-stat">
      <span class="hero-stat-val">315g</span>
      <span class="hero-stat-label">Neto por envase</span>
    </div>
  </div>
  </div>
  <div class="hero-image">
    <img src="assets/renova.png" alt="RENÖVA+">
  </div>
  <div class="hero-scroll">Desplaza para descubrir</div>
</div>`
);

// 24BURN
html = html.replace(
  `<div class="hero">\n  <span class="hero-tag">🍵 Guía Completa de Ingredientes y Consumo</span>\n  <h1>24<span>BURN</span></h1>\n  <p class="hero-sub">\n    <strong>Reduce y Activa Todos los Días.</strong><br>\n    Todo lo que necesitas saber sobre los ingredientes de 24BURN, cómo actúan en tu cuerpo y cómo tomarlo correctamente para obtener los mejores resultados.\n  </p>\n  <div class="hero-stats">\n    <div class="hero-stat">\n      <span class="hero-stat-val">🍃</span>\n      <span class="hero-stat-label">Té Verde</span>\n    </div>\n    <div class="hero-stat">\n      <span class="hero-stat-val">⚡</span>\n      <span class="hero-stat-label">L-Carnitina</span>\n    </div>\n    <div class="hero-stat">\n      <span class="hero-stat-val">🌿</span>\n      <span class="hero-stat-label">Guaraná</span>\n    </div>\n    <div class="hero-stat">\n      <span class="hero-stat-val">🌱</span>\n      <span class="hero-stat-label">Ginseng</span>\n    </div>\n  </div>\n  <div class="hero-scroll">Desplaza para descubrir</div>\n</div>`,
  `<div class="hero">
  <div class="hero-content">
    <span class="hero-tag">🍵 Guía Completa de Ingredientes y Consumo</span>
    <h1>24<span>BURN</span></h1>
    <p class="hero-sub">
      <strong>Reduce y Activa Todos los Días.</strong><br>
      Todo lo que necesitas saber sobre los ingredientes de 24BURN, cómo actúan en tu cuerpo y cómo tomarlo correctamente para obtener los mejores resultados.
    </p>
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-val">🍃</span>
        <span class="hero-stat-label">Té Verde</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-val">⚡</span>
        <span class="hero-stat-label">L-Carnitina</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-val">🌿</span>
        <span class="hero-stat-label">Guaraná</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-val">🌱</span>
        <span class="hero-stat-label">Ginseng</span>
      </div>
    </div>
  </div>
  <div class="hero-image">
    <img src="assets/burn24.png" alt="24BURN">
  </div>
  <div class="hero-scroll">Desplaza para descubrir</div>
</div>`
);

// 7. Update JS switchProduct and add goHome
const jsAdditions = `
  function goHome() {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.product-page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-home').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(initReveal, 50);
  }
`;
html = html.replace('function switchProduct(product) {', jsAdditions + '\n  function switchProduct(product) {');

fs.writeFileSync('index.html', html, 'utf8');
