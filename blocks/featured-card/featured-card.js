/**
 * Featured Card Block — 2-column card: image left (~40%), content right (~60%)
 * Content: date, category eyebrow (H2), H4 title, description, "Read story" CTA
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const card = document.createElement('div');
  card.className = 'featured-card-inner';

  const imageCol = document.createElement('div');
  imageCol.className = 'featured-card-image';

  const contentCol = document.createElement('div');
  contentCol.className = 'featured-card-content';

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const pic = cell.querySelector('picture');
      if (pic && !cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        imageCol.append(pic);
      } else {
        while (cell.firstChild) contentCol.append(cell.firstChild);
      }
    });
  });

  card.append(imageCol, contentCol);
  block.textContent = '';
  block.append(card);
}
