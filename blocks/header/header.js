import { getMetadata } from '../../scripts/aem.js';

/* Icons matching live site exactly */
const ICON_HAMBURGER = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_CLOSE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2"/><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_SEARCH = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_MORE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_GLOBE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/></svg>';

const isDesktop = window.matchMedia('(min-width: 900px)');

function closeAllPanels(nav) {
  nav.querySelectorAll('.nav-item[aria-expanded="true"]').forEach((item) => {
    item.setAttribute('aria-expanded', 'false');
  });
  document.body.style.overflow = '';
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);
  if (!resp.ok) return;

  const html = await resp.text();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const navDivs = tmp.querySelectorAll(':scope > div > div');

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Primary');
  nav.setAttribute('aria-expanded', 'false');

  /* ── Logo ── */
  const navBrand = document.createElement('div');
  navBrand.className = 'nav-brand';
  const brandDiv = navDivs[0];
  if (brandDiv) {
    const link = brandDiv.querySelector('a');
    if (link) {
      link.className = 'nav-logo-link';
      link.setAttribute('aria-label', 'AbbVie home');
      const img = link.querySelector('img');
      if (img) {
        img.className = 'nav-logo';
      }
      navBrand.append(link);
    }
  }

  /* ── Primary nav links (NO chevron arrows — live site has plain text buttons) ── */
  const navSections = document.createElement('div');
  navSections.className = 'nav-sections';
  const linksDiv = navDivs[1];
  if (linksDiv) {
    const topUl = linksDiv.querySelector(':scope > ul');
    if (topUl) {
      [...topUl.children].forEach((li) => {
        const item = document.createElement('div');
        item.className = 'nav-item';
        item.setAttribute('aria-expanded', 'false');

        const link = li.querySelector(':scope > a');
        const label = link ? link.textContent.trim() : '';
        const href = link ? link.getAttribute('href') : null;
        const subUl = li.querySelector(':scope > ul');

        /* Button with dropdown (no arrow icon — matches live site) */
        const btn = document.createElement('button');
        btn.className = 'nav-item-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          const isOpen = item.getAttribute('aria-expanded') === 'true';
          if (isOpen) {
            closeAllPanels(nav);
          } else {
            closeAllPanels(nav);
            item.setAttribute('aria-expanded', 'true');
            if (!isDesktop.matches) document.body.style.overflow = 'hidden';
          }
        });
        item.append(btn);

        /* Flyout panel */
        if (subUl) {
          const panel = document.createElement('div');
          panel.className = 'nav-panel';

          /* 3-column nav links grid */
          const panelLinks = document.createElement('ul');
          panelLinks.className = 'nav-panel-links';
          [...subUl.children].forEach((subLi) => {
            const subLink = subLi.querySelector(':scope > a');
            if (subLink) {
              const pli = document.createElement('li');
              pli.append(subLink);
              panelLinks.append(pli);
            }
          });
          panel.append(panelLinks);

          /* "CLOSE ✕" button — blue text like live site */
          const closeBtn = document.createElement('button');
          closeBtn.className = 'nav-panel-close';
          closeBtn.innerHTML = `CLOSE ${ICON_CLOSE}`;
          closeBtn.setAttribute('aria-label', 'Close menu');
          closeBtn.addEventListener('click', () => closeAllPanels(nav));
          panel.append(closeBtn);

          /* Dashboard area (lavender bg) */
          if (href) {
            const dashboard = document.createElement('div');
            dashboard.className = 'nav-panel-dashboard';
            const dashInner = document.createElement('div');
            dashInner.className = 'nav-panel-dashboard-inner';

            /* Left col: section title + desc + GO TO PAGE button */
            const dashLeft = document.createElement('div');
            const dashH4 = document.createElement('h4');
            dashH4.textContent = label;
            const dashP = document.createElement('p');
            dashP.textContent = `Explore ${label} at AbbVie.`;
            const goLink = document.createElement('a');
            goLink.className = 'nav-panel-go';
            goLink.href = href;
            goLink.textContent = 'GO TO PAGE';
            dashLeft.append(dashH4, dashP, goLink);

            dashInner.append(dashLeft);
            dashboard.append(dashInner);
            panel.append(dashboard);
          }

          item.append(panel);
        }

        navSections.append(item);
      });
    }
  }

  /* ── Utility bar (MORE + GLOBAL + Search) — matches live site right side ── */
  const navUtils = document.createElement('div');
  navUtils.className = 'nav-utils';

  const moreBtn = document.createElement('button');
  moreBtn.className = 'nav-util-btn';
  moreBtn.innerHTML = `${ICON_MORE}<span>MORE</span>`;
  moreBtn.setAttribute('aria-label', 'More links');

  const globalBtn = document.createElement('button');
  globalBtn.className = 'nav-util-btn';
  globalBtn.innerHTML = `${ICON_GLOBE}<span>GLOBAL</span>`;
  globalBtn.setAttribute('aria-label', 'Global site selector');

  const searchBtn = document.createElement('button');
  searchBtn.className = 'nav-util-btn nav-search-btn';
  searchBtn.innerHTML = ICON_SEARCH;
  searchBtn.setAttribute('aria-label', 'Search AbbVie.com');

  navUtils.append(moreBtn, globalBtn, searchBtn);

  /* ── Hamburger (mobile only) ── */
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = ICON_HAMBURGER;
  hamburger.setAttribute('aria-label', 'Open menu');
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    hamburger.innerHTML = expanded ? ICON_HAMBURGER : ICON_CLOSE;
    hamburger.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
    document.body.style.overflow = expanded ? '' : 'hidden';
    if (expanded) closeAllPanels(nav);
  });

  /* ── Assemble ── */
  nav.append(navBrand, navSections, navUtils, hamburger);

  /* Escape key closes everything */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllPanels(nav);
      nav.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = ICON_HAMBURGER;
      document.body.style.overflow = '';
    }
  });

  /* Resize resets mobile state */
  isDesktop.addEventListener('change', () => {
    closeAllPanels(nav);
    nav.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = ICON_HAMBURGER;
    document.body.style.overflow = '';
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);
}
