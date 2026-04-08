export default function decorate(block) {
  const firstRow = block.firstElementChild;
  if (!firstRow) return;

  const colCount = [...firstRow.children].length;
  block.classList.add(`columns-${colCount}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-row');

    [...row.children].forEach((col) => {
      col.classList.add('columns-col');

      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
