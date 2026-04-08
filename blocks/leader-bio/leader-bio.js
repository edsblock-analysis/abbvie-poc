export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cells = [...row.children];

  if (cells[0]) {
    const pic = cells[0].querySelector('picture');
    if (pic) {
      cells[0].classList.add('leader-bio-image');
    }
  }

  if (cells[1]) {
    cells[1].classList.add('leader-bio-content');

    // Add class to LinkedIn CTA if present
    const cta = cells[1].querySelector('a');
    if (cta) {
      cta.classList.add('leader-bio-cta');
    }
  }
}
