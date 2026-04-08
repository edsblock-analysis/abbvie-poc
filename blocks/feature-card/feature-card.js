/**
 * Feature Card Block — Vertical card: image top, content below
 * Entire card wrapped in anchor link
 */
export default function decorate(block) {
  const rows = [...block.children];

  const card = document.createElement('div');
  card.className = 'feature-card-inner';

  const imageWrap = document.createElement('div');
  imageWrap.className = 'feature-card-image';

  const content = document.createElement('div');
  content.className = 'feature-card-content';

  let cardLink = null;

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const pic = cell.querySelector('picture');
      if (pic && !cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        imageWrap.append(pic);
      } else {
        while (cell.firstChild) content.append(cell.firstChild);
      }
    });
  });

  // Find link for wrapping
  const link = content.querySelector('a');
  if (link) {
    cardLink = document.createElement('a');
    cardLink.href = link.href;
    cardLink.className = 'feature-card-link';
    cardLink.setAttribute('aria-label', link.textContent || 'Learn More');
  }

  card.append(imageWrap, content);

  block.textContent = '';

  if (cardLink) {
    cardLink.append(card);
    block.append(cardLink);
  } else {
    block.append(card);
  }
}
