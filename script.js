/* ============================================
   CAVALO.APP — Landing Page Script
   ============================================ */

// Simple form handler — no backend needed for now
// Emails are stored locally + you can connect a service later

document.addEventListener('DOMContentLoaded', () => {

  const forms = [
    { form: document.getElementById('register-form'), note: document.getElementById('form-note') },
    { form: document.getElementById('cta-form'), note: document.getElementById('cta-note') },
  ];

  forms.forEach(({ form, note }) => {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = form.querySelector('input[type="email"]').value.trim();
      const nameInput = form.querySelector('input[placeholder*="Prénom"]');
      const name = nameInput ? nameInput.value.trim() : '';

      if (!email) return;

      // Store in localStorage
      const leads = JSON.parse(localStorage.getItem('cavalo_leads') || '[]');
      leads.push({ email, name, date: new Date().toISOString() });
      localStorage.setItem('cavalo_leads', JSON.stringify(leads));

      // Success feedback
      const msg = name
        ? `Merci ${name} ! Vous serez informé du lancement. 🐴`
        : 'Merci ! Vous serez informé du lancement. 🐴';

      if (note) {
        note.textContent = msg;
        note.className = 'form-note success';
      }

      showToast(msg);
      form.reset();
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
