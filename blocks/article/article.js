/**
 * Article Block — Single-column article body
 * Metadata bar: back link, date, category, reading time
 * Minimal JS — mostly CSS styling
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // First row is treated as metadata bar
  const firstRow = rows[0];
  if (firstRow) {
    firstRow.classList.add('article-meta');
  }

  // Remaining rows are article body content
  rows.slice(1).forEach((row) => {
    row.classList.add('article-body');
  });

  // Detect and style pull quotes (blockquote elements)
  block.querySelectorAll('blockquote').forEach((bq) => {
    bq.classList.add('article-pullquote');
  });
}
