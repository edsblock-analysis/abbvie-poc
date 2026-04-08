export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('related-content-card');

    const cells = [...row.children];

    if (cells[0]) {
      const pic = cells[0].querySelector('picture');
      if (pic) {
        cells[0].classList.add('related-content-image');
      } else {
        cells[0].classList.add('related-content-body');
      }
    }

    if (cells[1]) {
      cells[1].classList.add('related-content-body');
    }

    // Make entire card clickable if there's a link
    const link = row.querySelector('a');
    if (link) {
      row.style.cursor = 'pointer';
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          link.click();
        }
      });
    }
  });
}
