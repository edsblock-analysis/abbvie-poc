export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cells = [...row.children];
  if (cells[0]) cells[0].classList.add('media-promo-image');
  if (cells[1]) cells[1].classList.add('media-promo-content');
}
