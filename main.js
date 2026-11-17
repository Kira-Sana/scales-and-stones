/* ==========================================================================
   Scales & Stones — Shared Frame, Botanical Corners & "CONTENTS" Overlay
   Kira & Sana Marlowe
   ========================================================================== */

const BOTANICAL_CORNER_HTML = `
  <img src="corner-parchment.png" alt="" class="corner-img corner-light" draggable="false">
  <img src="corner-ink.png" alt="" class="corner-img corner-dark" draggable="false">
`;

const PAGES = [
  { href: 'home.html',  label: 'Home' },
  { href: 'book.html',  label: 'Scales & Stones' },
  { href: 'bonus.html', label: 'Bonus Content' },
  { href: 'about.html', label: 'About Us' },
  { href: 'blog.html',  label: 'Blog' }
];

document.addEventListener('DOMContentLoaded', () => {
  // Populate hand-drawn corner engravings on landing page if present
  document.querySelectorAll('.landing-corner').forEach(el => {
    el.innerHTML = `<img src="corner-parchment.png" alt="" class="corner-img" draggable="false">`;
  });

  // If this is an inner page with .viewport-frame, inject corners + CONTENTS overlay
  const frame = document.querySelector('.viewport-frame');
  if (!frame) return;

  frame.innerHTML = `
    <div class="botanical-corner tl">${BOTANICAL_CORNER_HTML}</div>
    <div class="botanical-corner tr">${BOTANICAL_CORNER_HTML}</div>
    <div class="botanical-corner bl">${BOTANICAL_CORNER_HTML}</div>
    <div class="botanical-corner br">${BOTANICAL_CORNER_HTML}</div>
  `;

  const currentFile = window.location.pathname.split('/').pop() || 'home.html';

  // Inject the CONTENTS / CLOSE button and full-screen parchment overlay
  const tocButtonWrap = document.createElement('div');
  tocButtonWrap.className = 'contents-pill-wrap';
  tocButtonWrap.innerHTML = `
    <button type="button" class="contents-pill" id="contents-toggle" aria-expanded="false" aria-controls="toc-overlay">
      <span class="pill-dot"></span>
      <span class="pill-label">CONTENTS</span>
      <span class="pill-dot"></span>
    </button>
  `;
  document.body.appendChild(tocButtonWrap);

  const tocOverlay = document.createElement('div');
  tocOverlay.className = 'toc-overlay';
  tocOverlay.id = 'toc-overlay';
  tocOverlay.setAttribute('aria-hidden', 'true');

  const navLinksHtml = PAGES.map(page => {
    const isActive = page.href === currentFile ? 'active' : '';
    return `<a href="${page.href}" class="toc-link ${isActive}">${page.label}</a>`;
  }).join('');

  tocOverlay.innerHTML = `
    <nav class="toc-nav" aria-label="Table of Contents">
      ${navLinksHtml}
    </nav>
    <div class="toc-footer-note">KIRA &amp; SANA MARLOWE &middot; SCALES &amp; STONES</div>
  `;
  document.body.appendChild(tocOverlay);

  const toggleBtn = document.getElementById('contents-toggle');
  const labelEl = toggleBtn.querySelector('.pill-label');

  function toggleToc(forceState) {
    const isOpen = typeof forceState === 'boolean'
      ? forceState
      : !document.body.classList.contains('toc-open');

    document.body.classList.toggle('toc-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    tocOverlay.setAttribute('aria-hidden', String(!isOpen));
    labelEl.textContent = isOpen ? 'CLOSE' : 'CONTENTS';
  }

  toggleBtn.addEventListener('click', () => toggleToc());

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('toc-open')) {
      toggleToc(false);
    }
  });

  // ─── 2-Minute Delayed Gothic Arch Newsletter Pop-Up (Crow Scrolls) ───
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'sanctuary-modal-backdrop';
  modalBackdrop.id = 'sanctuary-newsletter-modal';
  modalBackdrop.setAttribute('aria-hidden', 'true');
  modalBackdrop.innerHTML = `
    <div class="sanctuary-arch-modal" role="dialog" aria-modal="true" aria-labelledby="sanctuary-modal-title">
      <div class="wax-seal-crest" aria-hidden="true">S &amp; S</div>
      <div class="modal-kicker">✦ Crow Scrolls ✦</div>
      <h2 id="sanctuary-modal-title">Before You Leave the Deep...</h2>
      <p>
        Receive Crow Scrolls from Kira &amp; Sana Marlowe with cover reveals, release dates, secret chapters from <em>Scales &amp; Stones</em>, and so on.
      </p>
      <form class="sanctuary-modal-form" id="sanctuary-newsletter-form">
        <input type="text" name="first_name" class="form-control" placeholder="Your first name or nickname..." required>
        <input type="email" name="email" class="form-control" placeholder="Your email address..." required>
        <label class="sanctuary-consent-label">
          <input type="checkbox" name="consent" required>
          <span>I agree to receive Crow Scrolls (email updates) from Kira &amp; Sana Marlowe. You can unsubscribe at any time.</span>
        </label>
        <button type="submit" class="btn-gothic" style="width: 100%; margin-top: 0.2rem;">Seal Your Name</button>
      </form>
      <button type="button" class="sanctuary-close-btn" id="sanctuary-modal-close">Close</button>
    </div>
  `;
  document.body.appendChild(modalBackdrop);

  function openNewsletterModal() {
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    sessionStorage.setItem('ss_newsletter_shown', 'true');
  }

  function closeNewsletterModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem('ss_newsletter_shown', 'true');
  }

  document.getElementById('sanctuary-modal-close').addEventListener('click', closeNewsletterModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeNewsletterModal();
  });

  document.getElementById('sanctuary-newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your name has been added to our Crow Scrolls.');
    closeNewsletterModal();
  });

  // Add a subtle "Crow Scrolls (Newsletter)" trigger link in the footer so visitors (or you!) can also open it anytime
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    const triggerLink = document.createElement('div');
    triggerLink.style.marginTop = '0.6rem';
    triggerLink.innerHTML = `<button type="button" class="sanctuary-close-btn" id="footer-newsletter-trigger" style="margin-top:0;">✦ Subscribe to Crow Scrolls (Newsletter)</button>`;
    footerCopy.parentNode.insertBefore(triggerLink, footerCopy);
    document.getElementById('footer-newsletter-trigger').addEventListener('click', openNewsletterModal);
  }

  // Track cumulative browsing time across pages so it pops up after 2 minutes (120,000 ms)
  if (!sessionStorage.getItem('ss_newsletter_shown')) {
    let startTime = Number(sessionStorage.getItem('ss_browse_start'));
    if (!startTime) {
      startTime = Date.now();
      sessionStorage.setItem('ss_browse_start', String(startTime));
    }
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(1000, 120000 - elapsed);
    setTimeout(() => {
      if (!sessionStorage.getItem('ss_newsletter_shown')) {
        openNewsletterModal();
      }
    }, remaining);
  }
});
