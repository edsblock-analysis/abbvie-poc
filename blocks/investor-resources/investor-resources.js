export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cells = [...row.children];

  if (cells[0]) {
    cells[0].classList.add('investor-resources-earnings');
  }

  if (cells[1]) {
    cells[1].classList.add('investor-resources-links');

    // Add arrow icons to links
    const links = cells[1].querySelectorAll('a');
    links.forEach((link) => {
      link.classList.add('investor-resources-link');
    });
  }
}
