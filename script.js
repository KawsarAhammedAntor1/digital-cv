// ----------------------
// Footer year
// ----------------------
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// ----------------------
// Mobile menu
// ----------------------
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primaryNav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// ----------------------
// Active nav by URL
// ----------------------
(function setActiveNav () {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
})();

// ===================================================
// CONTACT FORM: success popup (white box with check)
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const getField = (name) => form.elements.namedItem(name);

  const showError = (input, msg) => {
    const small = input?.parentElement?.querySelector('.error');
    if (small) small.textContent = msg || '';
  };

  const showSuccessPopup = (message) => {
    // remove any old popup
    const old = document.querySelector('.success-box');
    if (old) old.remove();

    const box = document.createElement('div');
    box.className = 'success-box';
    box.innerHTML = `<span class="check">✓</span><span>${message}</span>`;
    document.body.appendChild(box);

    // close after 2.6s or on click/ESC
    const remove = () => box.remove();
    setTimeout(remove, 2600);
    box.addEventListener('click', remove);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') remove(); }, { once: true });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // fields
    const name = getField('name');
    const email = getField('email');
    const message = getField('message');

    let ok = true;

    if (!name.value.trim()) { showError(name, 'Please enter your name'); ok = false; } else showError(name, '');
    const emailOk = /^\S+@\S+\.\S+$/.test(email.value);
    if (!email.value.trim() || !emailOk) { showError(email, 'Enter a valid email'); ok = false; } else showError(email, '');
    if (!message.value.trim()) { showError(message, 'Please write a short message'); ok = false; }
    else if (message.value.length > 1000) { showError(message, 'Max 1000 characters'); ok = false; }
    else showError(message, '');

    if (!ok) return;

    // Demo: pretend success, then reset + popup
    form.reset();
    showSuccessPopup('Thanks—your message was sent successfully.');
  });
});