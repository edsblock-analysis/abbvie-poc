/**
 * Video Block — Poster image with click-to-play
 * Variants: .video (default full-width),
 * .video.inline (contained article embed ~640px)
 */

function findVideoLink(block) {
  const links = block.querySelectorAll('a');
  return [...links].find((a) => {
    const h = a.href || '';
    return h.match(/\.(mp4|webm|ogg)(\?|$)/i)
      || h.includes('youtube.com')
      || h.includes('youtu.be')
      || h.includes('vimeo.com');
  });
}

function extractYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

function createPlayer(container, href) {
  container.innerHTML = '';
  container.classList.add('video-playing');
  container.removeAttribute('role');
  container.removeAttribute('tabindex');

  if (href.includes('youtube.com') || href.includes('youtu.be')) {
    const videoId = extractYouTubeId(href);
    if (videoId) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('frameborder', '0');
      iframe.title = 'Video player';
      container.append(iframe);
    }
  } else if (href.includes('vimeo.com')) {
    const vimeoId = href.match(/vimeo\.com\/(\d+)/);
    if (vimeoId) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://player.vimeo.com/video/${vimeoId[1]}?autoplay=1`;
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('frameborder', '0');
      iframe.title = 'Video player';
      container.append(iframe);
    }
  } else {
    const video = document.createElement('video');
    video.setAttribute('controls', '');
    video.setAttribute('autoplay', '');
    video.src = href;
    container.append(video);
  }
}

export default function decorate(block) {
  const rows = [...block.children];
  const mediaRow = rows[0];
  const contentRow = rows[1];

  const picture = mediaRow ? mediaRow.querySelector('picture') : null;
  const videoLink = findVideoLink(block);

  // Build poster container
  const posterContainer = document.createElement('div');
  posterContainer.className = 'video-poster';
  posterContainer.setAttribute('role', 'button');
  posterContainer.setAttribute('tabindex', '0');
  posterContainer.setAttribute('aria-label', 'Play video');

  if (picture) {
    posterContainer.append(picture);
  }

  // Play button overlay
  const playBtn = document.createElement('div');
  playBtn.className = 'video-play-btn';
  playBtn.innerHTML = [
    '<svg width="64" height="64" viewBox="0 0 64 64" fill="none">',
    '<circle cx="32" cy="32" r="31" stroke="white" stroke-width="2"/>',
    '<path d="M26 20L44 32L26 44V20Z" fill="white"/></svg>',
    '<span class="video-play-label">Watch</span>',
  ].join('');
  posterContainer.append(playBtn);

  // Build info
  const info = document.createElement('div');
  info.className = 'video-info';
  if (contentRow) {
    const cells = [...contentRow.children];
    cells.forEach((cell) => {
      while (cell.firstChild) info.append(cell.firstChild);
    });
  }

  // Click to play
  const href = videoLink ? videoLink.href : '';
  if (href) {
    const handlePlay = () => {
      createPlayer(posterContainer, href);
    };

    posterContainer.addEventListener('click', handlePlay);
    posterContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePlay();
      }
    });

    // Remove the original link
    if (videoLink) {
      const linkParent = videoLink.closest('p')
        || videoLink.closest('div');
      if (linkParent) linkParent.remove();
    }
  }

  // Replace block contents
  block.textContent = '';
  block.append(posterContainer);
  if (info.children.length) block.append(info);
}
