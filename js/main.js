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

  // ─── 2-Minute Delayed Gothic Arch Newsletter Pop-Up ───
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'sanctuary-modal-backdrop';
  modalBackdrop.id = 'sanctuary-newsletter-modal';
  modalBackdrop.setAttribute('aria-hidden', 'true');
  modalBackdrop.innerHTML = `
    <div class="sanctuary-arch-modal" role="dialog" aria-modal="true" aria-labelledby="sanctuary-modal-title">
      <div class="wax-seal-crest" aria-hidden="true">
        <img src="emblem.svg" alt="Scales & Stones Emblem" class="modal-emblem-img">
      </div>
      <div class="modal-kicker">✦ Newsletter ✦</div>
      <h2 id="sanctuary-modal-title">Before You Leave the Deep...</h2>
      <p>
        Join the Newsletter from Kira &amp; Sana Marlowe for cover reveals, release dates, secret chapters from <em>Scales &amp; Stones</em>, and so on.
      </p>
      <form class="sanctuary-modal-form" id="sanctuary-newsletter-form" action="https://assets.mailerlite.com/jsonp/2802467/forms/204368528875193774/subscribe" method="POST">
        <input type="text" name="fields[name]" class="form-control" placeholder="Your first name or nickname..." required autocomplete="given-name">
        <input type="email" name="fields[email]" class="form-control" placeholder="Your email address..." required autocomplete="email">
        <input type="hidden" name="ml-submit" value="1">
        <input type="hidden" name="anticsrf" value="true">
        <label class="sanctuary-consent-label">
          <input type="checkbox" name="consent" required>
          <span>I agree to receive newsletter email updates from Kira &amp; Sana Marlowe. You can unsubscribe at any time.</span>
        </label>
        <button type="submit" class="btn-gothic" id="sanctuary-modal-submit-btn" style="width: 100%; margin-top: 0.2rem;">Seal Your Name</button>
        <div id="sanctuary-modal-status" style="display:none; font-size: 0.85rem; margin-top: 0.8rem; color: #B89B67; text-align: center; font-style: italic;"></div>
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
  window.openNewsletterModal = openNewsletterModal;

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-newsletter]')) {
      e.preventDefault();
      openNewsletterModal();
    }
  });

  function closeNewsletterModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem('ss_newsletter_shown', 'true');
  }

  document.getElementById('sanctuary-modal-close').addEventListener('click', closeNewsletterModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeNewsletterModal();
  });

  const newsletterForm = document.getElementById('sanctuary-newsletter-form');
  const submitBtn = document.getElementById('sanctuary-modal-submit-btn');
  const statusEl = document.getElementById('sanctuary-modal-status');

  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sealing Your Oath...';
    statusEl.style.display = 'block';
    statusEl.innerText = 'Dispatching raven to Lucantis...';

    const formData = new FormData(newsletterForm);

    fetch('https://assets.mailerlite.com/jsonp/2802467/forms/204368528875193774/subscribe', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    .then(() => {
      submitBtn.innerText = '✦ Oath Sealed ✦';
      statusEl.innerHTML = '✦ Your name has been added to our Newsletter.<br>Check your inbox for your welcome email!';
      setTimeout(() => {
        closeNewsletterModal();
        newsletterForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerText = 'Seal Your Name';
        statusEl.style.display = 'none';
      }, 3500);
    })
    .catch((err) => {
      console.error('Newsletter submit error:', err);
      // Fallback submit
      newsletterForm.submit();
    });
  });

  // Add a subtle "Join Our Newsletter" trigger link in the footer so visitors (or you!) can also open it anytime
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    const triggerLink = document.createElement('div');
    triggerLink.style.marginTop = '0.6rem';
    triggerLink.innerHTML = `<button type="button" class="sanctuary-close-btn" id="footer-newsletter-trigger" style="margin-top:0;">✦ Join Our Newsletter</button>`;
    footerCopy.parentNode.insertBefore(triggerLink, footerCopy);
    document.getElementById('footer-newsletter-trigger').addEventListener('click', openNewsletterModal);
  }

  // Event delegation for any "[data-open-newsletter]" button (e.g., at the bottom of blog posts)
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-newsletter]')) {
      e.preventDefault();
      openNewsletterModal();
    }
  });

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
