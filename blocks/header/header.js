import { getMetadata } from '../../scripts/aem.js';

/* SVG icons matching live site */
const ICON_HAMBURGER = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_CLOSE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2"/><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_SEARCH = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_MORE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_GLOBE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_CLOSE_SM = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2"/><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2"/></svg>';
const ICON_BACK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="15,4 7,12 15,20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_ARROW_RIGHT = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="14,6 20,12 14,18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Close all nav panels and utility panels.
 * @param {Element} nav
 */
function closeAllPanels(nav) {
  nav.querySelectorAll('.nav-item[aria-expanded="true"]').forEach((item) => {
    item.setAttribute('aria-expanded', 'false');
  });
  nav.querySelectorAll('.mobile-accordion-item[aria-expanded="true"]').forEach((item) => {
    item.setAttribute('aria-expanded', 'false');
  });
  nav.querySelectorAll('.nav-util-panel[aria-hidden="false"]').forEach((panel) => {
    panel.setAttribute('aria-hidden', 'true');
  });
  nav.querySelectorAll('.nav-util-btn[aria-expanded="true"]').forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');
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
 * Build the dashboard area for a mega-menu panel (desktop).
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

/**
 * Build the mobile dashboard section (lavender bg, on top of accordion).
 */
function buildMobileDashboard(data) {
  const dashboard = document.createElement('div');
  dashboard.className = 'mobile-panel-dashboard';

  const h4mk = document.createElement('h4');
  h4mk.textContent = data.title || '';
  dashboard.append(h4mk);

  if (data.desc) {
    const p = document.createElement('p');
    p.className = 'mobile-panel-dash-desc';
    p.textContent = data.desc;
    dashboard.append(p);
  }

  if (data.gotoHref) {
    const goLink = document.createElement('a');
    goLink.className = 'mobile-panel-go';
    goLink.href = data.gotoHref;
    goLink.textContent = 'GO TO PAGE';
    dashboard.append(goLink);
  }

  if (data.quickLinks && data.quickLinks.length > 0) {
    const ql = document.createElement('ul');
    ql.className = 'mobile-panel-quicklinks';
    data.quickLinks.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.append(a);
      ql.append(li);
    });
    dashboard.append(ql);
  }

  return dashboard;
}

/**
 * Build mobile accordion list from sub-navigation items.
 */
function buildMobileAccordion(subUl) {
  const accordion = document.createElement('div');
  accordion.className = 'mobile-accordion';

  [...subUl.children].forEach((subLi) => {
    const subLink = subLi.querySelector(':scope > a');
    const childUl = subLi.querySelector(':scope > ul');
    if (!subLink) return;

    const itemLabel = subLink.textContent.trim();
    const itemHref = subLink.getAttribute('href');

    if (childUl) {
      const accItem = document.createElement('div');
      accItem.className = 'mobile-accordion-item';
      accItem.setAttribute('aria-expanded', 'false');

      const accBtn = document.createElement('button');
      accBtn.className = 'mobile-accordion-btn';
      accBtn.innerHTML = `<span class="mobile-accordion-label">${itemLabel}</span><span class="mobile-accordion-icon">+</span>`;
      accBtn.addEventListener('click', () => {
        const wasOpen = accItem.getAttribute('aria-expanded') === 'true';
        accordion.querySelectorAll('.mobile-accordion-item[aria-expanded="true"]').forEach((other) => {
          other.setAttribute('aria-expanded', 'false');
          const icon = other.querySelector('.mobile-accordion-icon');
          if (icon) icon.textContent = '+';
        });
        if (!wasOpen) {
          accItem.setAttribute('aria-expanded', 'true');
          accBtn.querySelector('.mobile-accordion-icon').textContent = '\u2212';
        }
      });
      accItem.append(accBtn);

      const accContent = document.createElement('div');
      accContent.className = 'mobile-accordion-content';

      const goLink = document.createElement('a');
      goLink.className = 'mobile-accordion-goto';
      goLink.href = itemHref;
      goLink.innerHTML = 'GO TO PAGE &rsaquo;';
      accContent.append(goLink);

      [...childUl.children].forEach((childLi) => {
        const childLink = childLi.querySelector(':scope > a');
        if (childLink) {
          const a = document.createElement('a');
          a.className = 'mobile-accordion-child-link';
          a.href = childLink.getAttribute('href');
          a.textContent = childLink.textContent.trim();
          accContent.append(a);
        }
      });

      accItem.append(accContent);
      accordion.append(accItem);
    } else {
      const linkItem = document.createElement('div');
      linkItem.className = 'mobile-accordion-item mobile-accordion-link-only';
      const a = document.createElement('a');
      a.className = 'mobile-accordion-btn-link';
      a.href = itemHref;
      a.textContent = itemLabel;
      linkItem.append(a);
      accordion.append(linkItem);
    }
  });

  return accordion;
}

/**
 * Update mobile header bar state based on whether we're in a sub-menu.
 */
function updateMobileHeaderState(nav) {
  const backBtn = nav.querySelector('.nav-mobile-back');
  const brand = nav.querySelector('.nav-brand');
  const hasOpenPanel = nav.querySelector('.nav-item[aria-expanded="true"]');

  if (!isDesktop.matches && hasOpenPanel) {
    backBtn.style.display = 'flex';
    brand.style.display = 'none';
  } else {
    backBtn.style.display = '';
    brand.style.display = '';
  }
}

/* ── MORE panel data ── */
const MORE_SECTIONS = [
  {
    label: 'Popular Pages',
    links: [
      { text: 'Pipeline', href: '/science/pipeline.html' },
      { text: 'Products', href: '/patients/products.html' },
      { text: 'Partner with Us', href: '/science/partner-with-us.html' },
      { text: 'Patient Support', href: '/patients/patient-support.html' },
      { text: 'Contact Center', href: '/contact-center.html' },
    ],
  },
  {
    label: 'News Center',
    links: [
      { text: 'Visit News Center', href: 'https://news.abbvie.com/' },
    ],
  },
  {
    label: 'Investors',
    links: [
      { text: 'Visit Investor Relations', href: 'https://investors.abbvie.com/' },
    ],
  },
  {
    label: 'External Links',
    links: [
      { text: 'Contract Manufacturing', href: 'https://www.abbviecontractmfg.com/' },
      { text: 'Medical Information', href: 'https://www.abbviemedinfo.com/' },
    ],
  },
  {
    label: 'Social Links',
    links: [
      { text: 'Facebook', href: 'https://www.facebook.com/AbbVieGlobal' },
      { text: 'Twitter', href: 'https://twitter.com/abbvie' },
      { text: 'Instagram', href: 'https://www.instagram.com/abbvie' },
      { text: 'LinkedIn', href: 'https://www.linkedin.com/company/abbvie' },
      { text: 'YouTube', href: 'https://www.youtube.com/user/AbbVie' },
      { text: 'TikTok', href: 'https://www.tiktok.com/@abbvie' },
    ],
  },
];

/**
 * Build an accordion panel for utility buttons (MORE / GLOBAL).
 * @param {Array} sections - Array of { label, links } objects
 * @param {string} className - CSS class for the panel
 * @param {number} defaultOpen - Index of section to expand by default (-1 for none)
 * @returns {HTMLElement}
 */
function buildUtilAccordionPanel(sections, className, defaultOpen) {
  const panel = document.createElement('div');
  panel.className = `nav-util-panel ${className}`;
  panel.setAttribute('aria-hidden', 'true');

  const inner = document.createElement('div');
  inner.className = 'nav-util-panel-inner';

  /* Close button */
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-util-panel-close';
  closeBtn.innerHTML = `CLOSE ${ICON_CLOSE_SM}`;
  closeBtn.setAttribute('aria-label', 'Close panel');
  inner.append(closeBtn);

  /* Accordion */
  const accordion = document.createElement('div');
  accordion.className = 'nav-util-accordion';

  sections.forEach((section, idx) => {
    const item = document.createElement('div');
    item.className = 'nav-util-accordion-item';
    const isOpen = idx === defaultOpen;
    item.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    const btn = document.createElement('button');
    btn.className = 'nav-util-accordion-btn';
    btn.innerHTML = `<span>${section.label}</span><span class="nav-util-accordion-icon">${isOpen ? '\u2212' : '+'}</span>`;
    btn.addEventListener('click', () => {
      const wasOpen = item.getAttribute('aria-expanded') === 'true';
      /* Close all siblings */
      accordion.querySelectorAll('.nav-util-accordion-item[aria-expanded="true"]').forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        const icon = other.querySelector('.nav-util-accordion-icon');
        if (icon) icon.textContent = '+';
      });
      if (!wasOpen) {
        item.setAttribute('aria-expanded', 'true');
        btn.querySelector('.nav-util-accordion-icon').textContent = '\u2212';
      }
    });
    item.append(btn);

    const content = document.createElement('div');
    content.className = 'nav-util-accordion-content';
    const ul = document.createElement('ul');
    section.links.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      if (a.href.startsWith('http')) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
      li.append(a);
      ul.append(li);
    });
    content.append(ul);
    item.append(content);
    accordion.append(item);
  });

  inner.append(accordion);
  panel.append(inner);
  return panel;
}

/**
 * Build the search panel.
 * @returns {HTMLElement}
 */
function buildSearchPanel() {
  const panel = document.createElement('div');
  panel.className = 'nav-util-panel nav-search-panel';
  panel.setAttribute('aria-hidden', 'true');

  const inner = document.createElement('div');
  inner.className = 'nav-util-panel-inner nav-search-panel-inner';

  /* Close button */
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-util-panel-close';
  closeBtn.innerHTML = `CLOSE ${ICON_CLOSE_SM}`;
  closeBtn.setAttribute('aria-label', 'Close search');
  inner.append(closeBtn);

  /* Search form */
  const form = document.createElement('form');
  form.className = 'nav-search-form';
  form.setAttribute('role', 'search');
  form.setAttribute('action', '/search');
  form.setAttribute('method', 'get');

  const inputWrap = document.createElement('div');
  inputWrap.className = 'nav-search-input-wrap';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'q';
  input.className = 'nav-search-input';
  input.placeholder = 'Search AbbVie.com';
  input.setAttribute('aria-label', 'Search AbbVie.com');
  input.autocomplete = 'off';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'nav-search-submit';
  submitBtn.innerHTML = ICON_SEARCH;
  submitBtn.setAttribute('aria-label', 'Submit search');

  inputWrap.append(input, submitBtn);
  form.append(inputWrap);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });

  inner.append(form);
  panel.append(inner);
  return panel;
}

/**
 * Toggle a utility panel (MORE, GLOBAL, Search).
 * @param {Element} nav
 * @param {Element} panel
 * @param {Element} btn
 */
function toggleUtilPanel(nav, panel, btn) {
  const isOpen = panel.getAttribute('aria-hidden') === 'false';

  /* Close everything first */
  closeAllPanels(nav);
  updateMobileHeaderState(nav);

  if (!isOpen) {
    panel.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');

    /* Auto-focus search input if search panel */
    const searchInput = panel.querySelector('.nav-search-input');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  }
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

  /* ── Mobile Back Button (in header bar, replaces logo) ── */
  const mobileBack = document.createElement('button');
  mobileBack.className = 'nav-mobile-back';
  mobileBack.innerHTML = `${ICON_BACK}<span>BACK</span>`;
  mobileBack.setAttribute('aria-label', 'Back to menu');
  mobileBack.addEventListener('click', () => {
    nav.querySelectorAll('.nav-item[aria-expanded="true"]').forEach((item) => {
      item.setAttribute('aria-expanded', 'false');
      item.querySelectorAll('.mobile-accordion-item[aria-expanded="true"]').forEach((acc) => {
        acc.setAttribute('aria-expanded', 'false');
        const icon = acc.querySelector('.mobile-accordion-icon');
        if (icon) icon.textContent = '+';
      });
    });
    updateMobileHeaderState(nav);
  });

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

  /* ── Primary nav ── */
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
        btn.innerHTML = `<span class="nav-item-label">${label}</span>`;
        btn.addEventListener('click', () => {
          const isOpen = item.getAttribute('aria-expanded') === 'true';
          if (isOpen) {
            closeAllPanels(nav);
            updateMobileHeaderState(nav);
          } else {
            closeAllPanels(nav);
            item.setAttribute('aria-expanded', 'true');
            if (!isDesktop.matches) {
              document.body.style.overflow = 'hidden';
              updateMobileHeaderState(nav);
            }
          }
        });
        item.append(btn);

        /* Flyout panel (desktop) + mobile sub-menu */
        if (subUl) {
          const panel = document.createElement('div');
          panel.className = 'nav-panel';

          /* Desktop: Close button */
          const closeBtn = document.createElement('button');
          closeBtn.className = 'nav-panel-close';
          closeBtn.innerHTML = `CLOSE ${ICON_CLOSE_SM}`;
          closeBtn.setAttribute('aria-label', 'Close menu');
          closeBtn.addEventListener('click', () => {
            closeAllPanels(nav);
            updateMobileHeaderState(nav);
          });
          panel.append(closeBtn);

          /* Desktop: 3-column nav links grid */
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

          /* Desktop: Dashboard */
          const dashData = dashboards[label];
          if (dashData) {
            panel.append(buildDashboard(dashData));
          }

          /* Mobile: Dashboard on top + accordion below */
          const mobileContent = document.createElement('div');
          mobileContent.className = 'mobile-panel-content';

          if (dashData) {
            mobileContent.append(buildMobileDashboard(dashData));
          }
          mobileContent.append(buildMobileAccordion(subUl));

          panel.append(mobileContent);
          item.append(panel);
        }

        navSections.append(item);
      });
    }
  }

  /* ── Mobile utility nav items (Quick Links, GLOBAL) ── */
  const mobileQuickLinks = document.createElement('div');
  mobileQuickLinks.className = 'nav-mobile-utils';

  const qlBtn = document.createElement('button');
  qlBtn.className = 'nav-mobile-util-btn';
  qlBtn.innerHTML = `<span>Quick Links</span>${ICON_ARROW_RIGHT}`;

  const globalBtn2 = document.createElement('button');
  globalBtn2.className = 'nav-mobile-util-btn';
  globalBtn2.innerHTML = `<span>GLOBAL</span>${ICON_ARROW_RIGHT}`;

  mobileQuickLinks.append(qlBtn, globalBtn2);

  /* ── Utility panels ── */
  const morePanel = buildUtilAccordionPanel(MORE_SECTIONS, 'nav-more-panel', 0);
  const searchPanel = buildSearchPanel();

  /* ── Utility bar (desktop) ── */
  const navUtils = document.createElement('div');
  navUtils.className = 'nav-utils';

  const moreBtn = document.createElement('button');
  moreBtn.className = 'nav-util-btn';
  moreBtn.innerHTML = `${ICON_MORE}<span>MORE</span>`;
  moreBtn.setAttribute('aria-label', 'More links');
  moreBtn.setAttribute('aria-expanded', 'false');
  moreBtn.addEventListener('click', () => {
    toggleUtilPanel(nav, morePanel, moreBtn);
  });

  const globalBtn = document.createElement('button');
  globalBtn.className = 'nav-util-btn';
  globalBtn.innerHTML = `${ICON_GLOBE}<span>GLOBAL</span>`;
  globalBtn.setAttribute('aria-label', 'Global site selector');
  globalBtn.setAttribute('aria-expanded', 'false');
  globalBtn.addEventListener('click', () => {
    window.location.href = '/contact-center/locations.html';
  });

  const searchBtn = document.createElement('button');
  searchBtn.className = 'nav-util-btn nav-search-btn';
  searchBtn.innerHTML = ICON_SEARCH;
  searchBtn.setAttribute('aria-label', 'Search AbbVie.com');
  searchBtn.setAttribute('aria-expanded', 'false');
  searchBtn.addEventListener('click', () => {
    toggleUtilPanel(nav, searchPanel, searchBtn);
  });

  navUtils.append(moreBtn, globalBtn, searchBtn);

  /* ── Mobile Quick Links panel toggle ── */
  qlBtn.addEventListener('click', () => {
    toggleUtilPanel(nav, morePanel, qlBtn);
    /* Ensure nav overlay stays open for mobile */
    if (!isDesktop.matches) {
      nav.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  /* ── Mobile GLOBAL button ── */
  globalBtn2.addEventListener('click', () => {
    window.location.href = '/contact-center/locations.html';
  });

  /* ── Mobile close button (X, separate from hamburger) ── */
  const mobileClose = document.createElement('button');
  mobileClose.className = 'nav-mobile-close';
  mobileClose.innerHTML = ICON_CLOSE;
  mobileClose.setAttribute('aria-label', 'Close menu');
  mobileClose.addEventListener('click', () => {
    closeAllPanels(nav);
    nav.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    updateMobileHeaderState(nav);
  });

  /* ── Hamburger ── */
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = ICON_HAMBURGER;
  hamburger.setAttribute('aria-label', 'Open menu');
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      nav.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      closeAllPanels(nav);
    } else {
      nav.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    updateMobileHeaderState(nav);
  });

  /* ── Close button delegates for utility panels ── */
  [morePanel, searchPanel].forEach((panel) => {
    const closeBtn = panel.querySelector('.nav-util-panel-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeAllPanels(nav);
        updateMobileHeaderState(nav);
      });
    }
  });

  /* ── Assemble ── */
  navSections.append(mobileQuickLinks);
  nav.append(mobileBack, navBrand, navSections, navUtils, mobileClose, hamburger);

  /* Append utility panels to wrapper (outside nav flow) */
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav, morePanel, searchPanel);
  block.append(wrapper);

  /* Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllPanels(nav);
      nav.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      updateMobileHeaderState(nav);
    }
  });

  /* Resize resets state */
  isDesktop.addEventListener('change', () => {
    closeAllPanels(nav);
    nav.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    updateMobileHeaderState(nav);
  });
}
