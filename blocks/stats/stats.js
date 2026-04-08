function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  const decimalPlaces = isDecimal ? String(target).split('.')[1].length : 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const current = eased * target;
    el.textContent = isDecimal
      ? `${current.toFixed(decimalPlaces)}${suffix}`
      : `${Math.round(current)}${suffix}`;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    row.classList.add('stats-item');

    if (cells[0]) {
      cells[0].classList.add('stats-label');
    }

    if (cells[1]) {
      cells[1].classList.add('stats-number');
      const text = cells[1].textContent.trim();
      const match = text.match(/^([\d,.]+)(.*)$/);
      if (match) {
        const numStr = match[1].replace(/,/g, '');
        const num = parseFloat(numStr);
        const suffix = match[2].trim();
        cells[1].dataset.target = num;
        cells[1].dataset.suffix = suffix;
        cells[1].textContent = `0${suffix}`;
      }
    }

    if (cells[2]) {
      cells[2].classList.add('stats-description');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberEls = block.querySelectorAll('.stats-number');
        numberEls.forEach((el) => {
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          if (!Number.isNaN(target)) {
            animateCounter(el, target, suffix);
          }
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(block);
}
