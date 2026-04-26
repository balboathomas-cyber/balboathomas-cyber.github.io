const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const originalHero = `.product-page .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
    padding: 80px 48px;
    position: relative; overflow: hidden;
    border-bottom: 1px solid var(--border);
  }`;

const newHero = `.product-page .hero {
    min-height: 100vh;
    display: flex; flex-direction: row;
    justify-content: space-between; align-items: center;
    padding: 80px 48px;
    position: relative; overflow: hidden;
    border-bottom: 1px solid var(--border);
  }`;

html = html.replace(originalHero, newHero);

const imageCss = `
  .product-page .hero-content {
    flex: 1;
    max-width: 50%;
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
`;
if (!html.includes('.product-page .hero-image img {')) {
  html = html.replace(newHero, newHero + '\n' + imageCss);
} else {
  html = html.replace('max-width: 60%;', 'max-width: 50%;');
}

fs.writeFileSync('index.html', html, 'utf8');
