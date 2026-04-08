import { getMetadata } from '../../scripts/aem.js';

/* SVG icons matching live site */
const ICON_HAMBURGER = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_CLOSE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2"/><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_SEARCH = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_MORE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_GLOBE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_CLOSE_SM = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2"/><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_BACK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="15,4 7,12 15,20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const isDesktop = window.matchMedia('(min-width: 900px)');

function closeAllPanels(nav) {
  nav.querySelectorAll('.nav-item[aria-expanded="true"]').forEach((item) => {
    item.setAttribute('aria-expanded', 'false');
  });
  document.body.style.overflow = '';
}

/**
 * Parse dashboard data from the third div of nav.plain.html.
 * Returns a map keyed by section label.
 */
function parseDashboards(container) {
  const dashboards = {};
  container.querySelectorAll('.nav-dashboard').forEach((div) => {
    const section = div.getAttribute('data-section');
    if (!section) return;

    const data = {};
    const titleEl = div.querySelector('.dash-title');
    if (titleEl) data.title = titleEl.textContent.trim();

    const descEl = div.querySelector('.dash-desc');
    if (descEl) data.desc = descEl.textContent.trim();

    const gotoEl = div.querySelector('.dash-goto a');
    if (gotoEl) data.gotoHref = gotoEl.getAttribute('href');

    data.quickLinks = [];
    div.querySelectorAll('.dash-quicklinks a').forEach((a) => {
      data.quickLinks.push({ text: a.textContent.trim(), href: a.getAttribute('href') });
    });

    const feat = div.querySelector('.dash-featured');
    if (feat) {
      data.featured = {};
      const eyebrow = feat.querySelector('.dash-featured-eyebrow');
      if (eyebrow) data.featured.eyebrow = eyebrow.textContent.trim();
      const ftitle = feat.querySelector('.dash-featured-title');
      if (ftitle) data.featured.title = ftitle.textContent.trim();
      const fdesc = feat.querySelector('.dash-featured-desc');
      if (fdesc) data.featured.desc = fdesc.textContent.trim();
      const fcta = feat.querySelector('.dash-featured-cta a');
      if (fcta) {
        data.featured.ctaText = fcta.textContent.trim();
        data.featured.ctaHref = fcta.getAttribute('href');
      }
    }

    const stat = div.querySelector('.dash-stat');
    if (stat) {
      data.stat = {};
      const seyebrow = stat.querySelector('.dash-stat-eyebrow');
      if (seyebrow) data.stat.eyebrow = seyebrow.textContent.trim();
      const snum = stat.querySelector('.dash-stat-number');
      if (snum) data.stat.number = snum.textContent.trim();
      const ssuffix = stat.querySelector('.dash-stat-suffix');
      if (ssuffix) data.stat.suffix = ssuffix.textContent.trim();
      const slabel = stat.querySelector('.dash-stat-label');
      if (slabel) data.stat.label = slabel.textContent.trim();
    }

    dashboards[section] = data;
  });
  return dashboards;
}

/**
 * Build the dashboard area for a mega-menu panel.
 */
function buildDashboard(data) {
  const dashboard = document.createElement('div');
  dashboard.className = 'nav-panel-dashboard';

  const inner = document.createElement('div');
  inner.className = 'nav-panel-dashboard-inner';

  /* Column 1: Info + quick links */
  const col1 = document.createElement('div');
  col1.className = 'nav-panel-dash-info';

  const h4 = document.createElement('h4');
  h4.textContent = data.title || '';
  col1.append(h4);

  if (data.desc) {
    const p = document.createElement('p');
    p.className = 'nav-panel-dash-desc';
    p.textContent = data.desc;
    col1.append(p);
  }

  if (data.gotoHref) {
    const goLink = document.createElement('a');
    goLink.className = 'nav-panel-go';
    goLink.href = data.gotoHref;
    goLink.textContent = 'GO TO PAGE';
    col1.append(goLink);
  }

  if (data.quickLinks && data.quickLinks.length > 0) {
    const ql = document.createElement('ul');
    ql.className = 'nav-panel-quicklinks';
    data.quickLinks.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.append(a);
      ql.append(li);
    });
    col1.append(ql);
  }

  inner.append(col1);

  /* Column 2: Featured card */
  if (data.featured) {
    const col2 = document.createElement('div');
    col2.className = 'nav-panel-dash-featured';

    if (data.featured.eyebrow) {
      const eyebrow = document.createElement('h2');
      eyebrow.textContent = data.featured.eyebrow;
      col2.append(eyebrow);
    }

    if (data.featured.title) {
      const ftitle = document.createElement('h4');
      ftitle.textContent = data.featured.title;
      col2.append(ftitle);
    }

    if (data.featured.desc) {
      const fdesc = document.createElement('p');
      fdesc.textContent = data.featured.desc;
      col2.append(fdesc);
    }

    if (data.featured.ctaHref) {
      const cta = document.createElement('a');
      cta.className = 'nav-panel-cta';
      cta.href = data.featured.ctaHref;
      cta.textContent = data.featured.ctaText || 'Learn More';
      col2.append(cta);
    }

    inner.append(col2);
  }

  /* Column 3: Stat card */
  if (data.stat) {
    const col3 = document.createElement('div');
    col3.className = 'nav-panel-dash-stat';

    if (data.stat.eyebrow) {
      const sEyebrow = document.createElement('h2');
      sEyebrow.textContent = data.stat.eyebrow;
      col3.append(sEyebrow);
    }

    const numWrap = document.createElement('div');
    numWrap.className = 'nav-panel-stat-number';
    const num = document.createElement('span');
    num.className = 'stat-value';
    num.textContent = data.stat.number || '';
    numWrap.append(num);

    if (data.stat.suffix) {
      const suffix = document.createElement('span');
      suffix.className = 'stat-suffix';
      suffix.textContent = data.stat.suffix;
      numWrap.append(suffix);
    }
    col3.append(numWrap);

    if (data.stat.label) {
      const sLabel = document.createElement('p');
      sLabel.className = 'nav-panel-stat-label';
      sLabel.textContent = data.stat.label;
      col3.append(sLabel);
    }

    inner.append(col3);
  }

  dashboard.append(inner);
  return dashboard;
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);
  if (!resp.ok) return;

  const html = await resp.text();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const navDivs = [...tmp.querySelectorAll(':scope > div > div')];

  /* Parse dashboard data from third div */
  const dashDiv = navDivs[2];
  const dashboards = dashDiv ? parseDashboards(dashDiv) : {};

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
      if (img) img.className = 'nav-logo';
      navBrand.append(link);
    }
  }

  /* ── Primary nav (NO chevron arrows) ── */
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
        const subUl = li.querySelector(':scope > ul');

        /* Button trigger */
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

          /* Close button */
          const closeBtn = document.createElement('button');
          closeBtn.className = 'nav-panel-close';
          closeBtn.innerHTML = `CLOSE ${ICON_CLOSE_SM}`;
          closeBtn.setAttribute('aria-label', 'Close menu');
          closeBtn.addEventListener('click', () => closeAllPanels(nav));
          panel.append(closeBtn);

          /* Mobile back button */
          const backBtn = document.createElement('button');
          backBtn.className = 'nav-panel-back';
          backBtn.innerHTML = `${ICON_BACK}<span>Back</span>`;
          backBtn.setAttribute('aria-label', 'Back to menu');
          backBtn.addEventListener('click', () => {
            item.setAttribute('aria-expanded', 'false');
          });
          panel.append(backBtn);

          /* 3-column nav links grid */
          const panelLinks = document.createElement('ul');
          panelLinks.className = 'nav-panel-links';
          [...subUl.children].forEach((subLi) => {
            const subLink = subLi.querySelector(':scope > a');
            const hasChildren = subLi.querySelector(':scope > ul');
            if (subLink) {
              const pli = document.createElement('li');
              if (hasChildren) pli.classList.add('has-children');
              const a = document.createElement('a');
              a.href = subLink.getAttribute('href');
              a.textContent = subLink.textContent;
              pli.append(a);
              panelLinks.append(pli);
            }
          });
          panel.append(panelLinks);

          /* Dashboard */
          const dashData = dashboards[label];
          if (dashData) {
            panel.append(buildDashboard(dashData));
          }

          item.append(panel);
        }

        navSections.append(item);
      });
    }
  }

  /* ── Utility bar ── */
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

  /* ── Hamburger ── */
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

  /* Escape key */
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
