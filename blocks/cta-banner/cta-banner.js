/**
 * CTA Banner Block — Full-width colored banner
 * Variants: .cta-banner (navy bg), .cta-banner.blue (blue bg)
 */
export default function decorate(block) {
  const rows = [...block.children];
  const inner = document.createElement('div');
  inner.className = 'cta-banner-inner';

  const textCol = document.createElement('div');
  textCol.className = 'cta-banner-text';

  const ctaCol = document.createElement('div');
  ctaCol.className = 'cta-banner-action';

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const link = cell.querySelector('a');
      const hasOnlyLink = link && cell.children.length === 1
        && (cell.firstElementChild.tagName === 'A'
          || (cell.firstElementChild.tagName === 'P' && cell.firstElementChild.querySelector('a') && cell.firstElementChild.childNodes.length === 1));
      if (hasOnlyLink && !cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        ctaCol.append(link);
      } else {
        while (cell.firstChild) textCol.append(cell.firstChild);
      }
    });
  });

  inner.append(textCol);
  if (ctaCol.children.length) inner.append(ctaCol);

  block.textContent = '';
  block.append(inner);
}
