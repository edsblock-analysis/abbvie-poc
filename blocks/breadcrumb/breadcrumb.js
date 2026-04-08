export default function decorate(block) {
  const rows = [...block.children];
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');
  ol.classList.add('breadcrumb-list');

  rows.forEach((row, index) => {
    const li = document.createElement('li');
    li.classList.add('breadcrumb-item');

    const isLast = index === rows.length - 1;
    const link = row.querySelector('a');

    if (link && !isLast) {
      li.appendChild(link);
    } else {
      const span = document.createElement('span');
      span.setAttribute('aria-current', 'page');
      span.textContent = row.textContent.trim();
      li.appendChild(span);
    }

    if (isLast) {
      li.classList.add('breadcrumb-current');
    }

    ol.appendChild(li);
  });

  nav.appendChild(ol);
  block.textContent = '';
  block.appendChild(nav);
}
