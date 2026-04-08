export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    const panel = document.createElement('div');
    panel.classList.add('accordion-panel');

    // Title (cell 0)
    const title = document.createElement('button');
    title.classList.add('accordion-title');
    title.setAttribute('aria-expanded', 'false');
    title.type = 'button';

    const titleText = document.createElement('span');
    titleText.textContent = cells[0] ? cells[0].textContent.trim() : '';
    title.appendChild(titleText);

    const chevron = document.createElement('span');
    chevron.classList.add('accordion-chevron');
    chevron.setAttribute('aria-hidden', 'true');
    title.appendChild(chevron);

    // Body (cell 1)
    const body = document.createElement('div');
    body.classList.add('accordion-body');
    body.setAttribute('role', 'region');
    body.hidden = true;
    if (cells[1]) {
      body.innerHTML = cells[1].innerHTML;
    }

    // Generate unique IDs for accessibility
    const id = `accordion-${Math.random().toString(36).slice(2, 9)}`;
    title.setAttribute('aria-controls', id);
    body.id = id;

    title.addEventListener('click', () => {
      const isOpen = title.getAttribute('aria-expanded') === 'true';

      // Close all other panels
      block.querySelectorAll('.accordion-title').forEach((otherTitle) => {
        if (otherTitle !== title) {
          otherTitle.setAttribute('aria-expanded', 'false');
          const otherBody = otherTitle.parentElement.querySelector('.accordion-body');
          if (otherBody) otherBody.hidden = true;
        }
      });

      title.setAttribute('aria-expanded', String(!isOpen));
      body.hidden = isOpen;
    });

    panel.appendChild(title);
    panel.appendChild(body);

    row.textContent = '';
    row.appendChild(panel);
    row.classList.add('accordion-item');
  });
}
