/* ============================================
   CAVALO.APP — Landing Page Script
   ============================================ */
// Emails envoyés vers Google Sheets via Apps Script

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyJOOLMVFwu_kkXQ6dCYybeeH0omLtnKzyWp7OY7PlaQ7Zu80efkqzsziJxoJB0_0-A/exec';

document.addEventListener('DOMContentLoaded', () => {

  const forms = [
    { form: document.getElementById('register-form'), note: document.getElementById('form-note') },
    { form: document.getElementById('cta-form'), note: document.getElementById('cta-note') },
  ];

  forms.forEach(({ form, note }) => {
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = form.querySelector('input[type="email"]').value.trim();
      const nameInput = form.querySelector('input[placeholder*="Prénom"]');
      const name = nameInput ? nameInput.value.trim() : '';

      if (!email) return;

      // Send to Google Sheets
      try {
        const resp = await fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        });

        const msg = name
          ? `Merci ${name} ! Vous serez informé du lancement. 🐴`
          : 'Merci ! Vous serez informé du lancement. 🐴';

        if (note) {
          note.textContent = msg;
          note.className = 'form-note success';
        }
        showToast(msg);
        form.reset();

      } catch (err) {
        if (note) {
          note.textContent = 'Erreur réseau — réessayez plus tard.';
          note.className = 'form-note error';
        }
      }
    });
  });

  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
});
