export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('card-grid-card');

    const cells = [...row.children];

    // Find image cell
    cells.forEach((cell) => {
      const pic = cell.querySelector('picture');
      if (pic) {
        cell.classList.add('card-grid-card-image');
      } else {
        cell.classList.add('card-grid-card-body');
      }
    });

    // For teaser variant, wrap the whole card content
    if (block.classList.contains('teaser')) {
      const link = row.querySelector('a');
      if (link) {
        link.classList.add('card-grid-cta');
      }
    }
  });
}
