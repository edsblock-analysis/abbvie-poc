import { getMetadata } from '../../scripts/aem.js';

const ICON_ARROW_UP = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="6,15 12,9 18,15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/**
 * Build scroll-to-top button.
 * @returns {HTMLElement}
 */
function buildScrollToTop() {
  const btn = document.createElement('button');
  btn.className = 'footer-scroll-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = ICON_ARROW_UP;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return btn;
}

/**
 * Build the footer logo section from the first content div.
 * @param {Element} div - source div with logo link
 * @returns {HTMLElement}
 */
function buildLogo(div) {
  const section = document.createElement('div');
  section.className = 'footer-logo';
  const link = div.querySelector('a');
  if (link) {
    const a = document.createElement('a');
    a.href = link.getAttribute('href') || '/';
    a.setAttribute('aria-label', link.getAttribute('title') || 'AbbVie home');
    const img = link.querySelector('img');
    if (img) {
      const clone = img.cloneNode(true);
      clone.className = 'footer-logo-img';
      a.append(clone);
    } else {
      a.textContent = link.textContent.trim();
    }
    section.append(a);
  }
  return section;
}

/**
 * Build the primary nav links and social icons from the second content div.
 * @param {Element} div - source div with two ULs
 * @returns {HTMLElement}
 */
function buildNavAndSocial(div) {
  const section = document.createElement('div');
  section.className = 'footer-nav-social';

  const lists = div.querySelectorAll(':scope > ul');

  /* Primary nav links */
  if (lists[0]) {
    const navList = document.createElement('ul');
    navList.className = 'footer-nav-links';
    lists[0].querySelectorAll('li').forEach((li) => {
      const a = li.querySelector('a');
      if (a) {
        const newLi = document.createElement('li');
        const newA = document.createElement('a');
        newA.href = a.getAttribute('href');
        newA.textContent = a.textContent.trim();
        newLi.append(newA);
        navList.append(newLi);
      }
    });
    section.append(navList);
  }

  /* Social icons */
  if (lists[1]) {
    const socialList = document.createElement('ul');
    socialList.className = 'footer-social-links';
    lists[1].querySelectorAll('li').forEach((li) => {
      const a = li.querySelector('a');
      if (a) {
        const newLi = document.createElement('li');
        const newA = document.createElement('a');
        newA.href = a.getAttribute('href');
        newA.setAttribute('aria-label', a.getAttribute('aria-label') || a.getAttribute('title') || a.textContent.trim());
        newA.setAttribute('target', '_blank');
        newA.setAttribute('rel', 'noopener noreferrer');
        const img = a.querySelector('img');
        if (img) {
          const clone = img.cloneNode(true);
          clone.className = 'footer-social-icon';
          newA.append(clone);
        } else {
          newA.textContent = a.textContent.trim();
        }
        newLi.append(newA);
        socialList.append(newLi);
      }
    });
    section.append(socialList);
  }

  return section;
}

/**
 * Build a link column (Popular Pages or External Links).
 * @param {Element} div - source div with h2 + ul
 * @returns {HTMLElement}
 */
function buildLinkColumn(div) {
  const section = document.createElement('div');
  section.className = 'footer-link-column';

  const h2 = div.querySelector('h2');
  if (h2) {
    const heading = document.createElement('h2');
    heading.textContent = h2.textContent.trim();
    section.append(heading);
  }

  const ul = div.querySelector('ul');
  if (ul) {
    const list = document.createElement('ul');
    list.className = 'footer-column-links';
    ul.querySelectorAll('li').forEach((li) => {
      const a = li.querySelector('a');
      if (a) {
        const newLi = document.createElement('li');
        const newA = document.createElement('a');
        newA.href = a.getAttribute('href');
        newA.textContent = a.textContent.trim();
        if (newA.href.startsWith('http') && !newA.href.includes(window.location.hostname)) {
          newA.setAttribute('target', '_blank');
          newA.setAttribute('rel', 'noopener noreferrer');
        }
        newLi.append(newA);
        list.append(newLi);
      }
    });
    section.append(list);
  }

  return section;
}

/**
 * Build the legal text section.
 * @param {Element} div - source div with paragraphs
 * @returns {HTMLElement}
 */
function buildLegalText(div) {
  const section = document.createElement('div');
  section.className = 'footer-legal-text';
  div.querySelectorAll('p').forEach((p) => {
    const newP = document.createElement('p');
    newP.innerHTML = p.innerHTML;
    section.append(newP);
  });
  return section;
}

/**
 * Build the legal links bar.
 * @param {Element} div - source div with ul
 * @returns {HTMLElement}
 */
function buildLegalLinks(div) {
  const section = document.createElement('div');
  section.className = 'footer-legal-links';

  const ul = div.querySelector('ul');
  if (ul) {
    const list = document.createElement('ul');
    ul.querySelectorAll('li').forEach((li) => {
      const a = li.querySelector('a');
      if (a) {
        const newLi = document.createElement('li');
        const newA = document.createElement('a');
        newA.href = a.getAttribute('href');
        newA.textContent = a.textContent.trim();
        if (a.classList.contains('cookie-settings')) {
          newA.className = 'cookie-settings';
        }
        newLi.append(newA);
        list.append(newLi);
      }
    });
    section.append(list);
  }

  return section;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';

  const resp = await fetch(`${footerPath}.plain.html`);
  if (!resp.ok) return;

  const html = await resp.text();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const divs = [...tmp.querySelectorAll(':scope > div > div')];

  block.textContent = '';

  const footer = document.createElement('div');
  footer.className = 'footer-content';

  /* Scroll-to-top */
  const scrollTopWrap = document.createElement('div');
  scrollTopWrap.className = 'footer-scroll-top-wrap';
  scrollTopWrap.append(buildScrollToTop());
  footer.append(scrollTopWrap);

  /* Main grid */
  const grid = document.createElement('div');
  grid.className = 'footer-grid';

  /* Logo — div[0] */
  if (divs[0]) grid.append(buildLogo(divs[0]));

  /* Nav + Social — div[1] */
  if (divs[1]) grid.append(buildNavAndSocial(divs[1]));

  /* Popular Pages — div[2] */
  if (divs[2]) grid.append(buildLinkColumn(divs[2]));

  /* External Links — div[3] */
  if (divs[3]) grid.append(buildLinkColumn(divs[3]));

  footer.append(grid);

  /* Legal text — div[4] */
  if (divs[4]) footer.append(buildLegalText(divs[4]));

  /* Legal links — div[5] */
  if (divs[5]) footer.append(buildLegalLinks(divs[5]));

  block.append(footer);
}
