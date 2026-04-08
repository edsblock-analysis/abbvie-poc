export default function decorate(block) {
  const rows = [...block.children];

  // Row 1: background image
  if (rows[0]) {
    const pic = rows[0].querySelector('picture');
    if (pic) {
      rows[0].classList.add('esg-impact-bg');
    }
  }

  // Wrap overlay cards
  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('esg-impact-cards');

  rows.slice(1).forEach((row) => {
    row.classList.add('esg-impact-card');
    cardsWrapper.appendChild(row);
  });

  block.appendChild(cardsWrapper);
}
