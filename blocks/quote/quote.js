export default function decorate(block) {
  const rows = [...block.children];
  const isTestimonial = block.classList.contains('testimonial');

  const blockquote = document.createElement('blockquote');
  blockquote.classList.add('quote-blockquote');

  // Row 1: quote text
  if (rows[0]) {
    const quoteText = document.createElement('div');
    quoteText.classList.add('quote-text');

    if (isTestimonial) {
      // Check for background image
      const pic = rows[0].querySelector('picture');
      if (pic) {
        const bgWrapper = document.createElement('div');
        bgWrapper.classList.add('quote-bg');
        bgWrapper.appendChild(pic);
        block.prepend(bgWrapper);
        // Remove picture from quote text, keep remaining text
        const textContent = rows[0].textContent.trim();
        if (textContent) {
          quoteText.innerHTML = `<p>${textContent}</p>`;
        }
      } else {
        quoteText.innerHTML = rows[0].innerHTML;
      }
    } else {
      quoteText.innerHTML = rows[0].innerHTML;
    }
    blockquote.appendChild(quoteText);
  }

  const footer = document.createElement('footer');
  footer.classList.add('quote-attribution');

  // Row 2: author name
  if (rows[1]) {
    const cite = document.createElement('cite');
    cite.classList.add('quote-author');
    cite.textContent = rows[1].textContent.trim();
    footer.appendChild(cite);
  }

  // Row 3: author title (optional)
  if (rows[2]) {
    const title = document.createElement('span');
    title.classList.add('quote-author-title');
    title.textContent = rows[2].textContent.trim();
    footer.appendChild(title);
  }

  if (footer.children.length) {
    blockquote.appendChild(footer);
  }

  // Clear original rows and append structured content
  [...block.children].forEach((child) => {
    if (!child.classList.contains('quote-bg')) {
      child.remove();
    }
  });
  block.appendChild(blockquote);
}
