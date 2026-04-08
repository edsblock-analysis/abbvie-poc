/**
 * Hero Banner Block
 * Variants: .hero (image bg), .hero.video (video bg),
 * .hero.solid (navy/gradient bg), .hero.overlap (overlapping card)
 */

function findVideoLink(block) {
  const links = block.querySelectorAll('a');
  return [...links].find((a) => {
    const href = a.href || '';
    return href.match(/\.(mp4|webm|ogg)(\?|$)/i)
      || href.includes('youtube.com')
      || href.includes('youtu.be')
      || href.includes('vimeo.com');
  });
}

function addPlayPauseButton(block, video) {
  const btn = document.createElement('button');
  btn.className = 'hero-play-pause';
  btn.setAttribute('aria-label', 'Pause video');
  btn.innerHTML = '<span class="pause-icon">&#10074;&#10074;</span>';
  btn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      btn.innerHTML = '<span class="pause-icon">&#10074;&#10074;</span>';
      btn.setAttribute('aria-label', 'Pause video');
    } else {
      video.pause();
      btn.innerHTML = '<span class="play-icon">&#9654;</span>';
      btn.setAttribute('aria-label', 'Play video');
    }
  });
  block.append(btn);
}

function buildVideoBackground(block, videoLink) {
  const { href } = videoLink;
  const isDirectVideo = href.match(/\.(mp4|webm|ogg)(\?|$)/i);
  const linkParent = videoLink.closest('p') || videoLink.closest('div');

  if (isDirectVideo) {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.classList.add('hero-video');

    const source = document.createElement('source');
    source.src = href;
    source.type = `video/${href.split('.').pop().split('?')[0]}`;
    video.append(source);

    const picture = block.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) video.setAttribute('poster', img.src);
      picture.remove();
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.removeAttribute('autoplay');
    }

    block.prepend(video);
    addPlayPauseButton(block, video);
  }

  if (linkParent) linkParent.remove();
}

export default function decorate(block) {
  const rows = [...block.children];
  const mediaRow = rows[0];
  const contentRow = rows[1];

  // Detect media type
  const picture = mediaRow ? mediaRow.querySelector('picture') : null;
  const videoLink = findVideoLink(block);

  // Build background
  if (videoLink && block.classList.contains('video')) {
    buildVideoBackground(block, videoLink);
  } else if (picture) {
    picture.classList.add('hero-bg');
    block.prepend(picture);
    if (
      mediaRow
      && !mediaRow.querySelector('picture')
      && !mediaRow.textContent.trim()
    ) {
      mediaRow.remove();
    }
  }

  // Clean up empty media row
  if (
    mediaRow
    && mediaRow.parentNode === block
    && !mediaRow.textContent.trim()
    && !mediaRow.querySelector('picture, video')
  ) {
    mediaRow.remove();
  }

  // Build overlay from content row
  if (contentRow) {
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    const cells = [...contentRow.children];
    cells.forEach((cell) => {
      while (cell.firstChild) overlay.append(cell.firstChild);
    });
    contentRow.remove();
    block.append(overlay);
  }

  // Solid variant: no media needed
  if (
    block.classList.contains('solid')
    && !picture
    && !videoLink
  ) {
    block.classList.add('no-media');
  }
}
