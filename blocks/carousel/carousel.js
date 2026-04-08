/**
 * Carousel Block — Press release carousel with prev/next arrows and counter
 * Each row = 1 slide with: date paragraph, headline (h3), "Read More" link
 */
export default function decorate(block) {
  const slides = [...block.children];
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let currentIndex = 0;

  // Build track
  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide) => {
    const slideEl = document.createElement('div');
    slideEl.className = 'carousel-slide';
    while (slide.firstChild) slideEl.append(slide.firstChild);
    track.append(slideEl);
  });

  // Build navigation
  const nav = document.createElement('div');
  nav.className = 'carousel-nav';

  const counter = document.createElement('span');
  counter.className = 'carousel-counter';
  counter.setAttribute('aria-live', 'polite');

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn carousel-btn-prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn carousel-btn-next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  nav.append(counter, prevBtn, nextBtn);

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    counter.textContent = `${currentIndex + 1} of ${totalSlides}`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  // Replace block contents
  block.textContent = '';
  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';
  viewport.append(track);
  block.append(viewport, nav);

  updateCarousel();
}
