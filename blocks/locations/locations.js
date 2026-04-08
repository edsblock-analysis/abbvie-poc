export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('locations-entry');

    const cells = [...row.children];
    cells.forEach((cell) => {
      // Check if cell contains a heading
      const heading = cell.querySelector('h5, h4, h3');
      if (heading) {
        cell.classList.add('locations-heading');
      } else {
        cell.classList.add('locations-details');
      }

      // Style phone links
      const telLinks = cell.querySelectorAll('a[href^="tel:"]');
      telLinks.forEach((link) => {
        link.classList.add('locations-phone');
      });
    });
  });
}
