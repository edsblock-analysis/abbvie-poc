export default function decorate(block) {
  const hr = document.createElement('hr');
  hr.setAttribute('aria-hidden', 'true');
  block.textContent = '';
  block.appendChild(hr);
}
