import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Cards Block — Grid of linked cards
 * Variants: .cards (full teaser), .cards.compact (image + title only)
 */
export default function decorate(block) {
  const isCompact = block.classList.contains('compact');
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cells = [...row.children];

    cells.forEach((cell) => {
      if (cell.children.length === 1 && cell.querySelector('picture')) {
        cell.className = 'cards-card-image';
      } else {
        cell.className = 'cards-card-body';
      }
      li.append(cell);
    });

    // Wrap entire card in a link if there's a link in the body
    const link = li.querySelector('.cards-card-body a');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'cards-card-link';
      anchor.setAttribute('aria-label', link.textContent || 'Read more');

      // In compact mode, remove CTA text
      if (isCompact) {
        const ctaWrapper = link.closest('p');
        if (ctaWrapper) ctaWrapper.remove();
      }

      while (li.firstChild) anchor.append(li.firstChild);
      li.append(anchor);
    }

    ul.append(li);
  });

  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    const pic = img.closest('picture');
    if (pic) {
      pic.replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
      );
    }
  });

  block.replaceChildren(ul);
}
