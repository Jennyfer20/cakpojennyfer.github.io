// ══ FORMULAIRE CONTACT ══
const form = document.getElementById('contact-form');
const merci = document.getElementById('form-merci');
const btnNouveau = document.getElementById('btn-nouveau');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-envoyer');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.style.display = 'none';
      merci.style.display = 'block';
    } else {
      btn.textContent = 'Envoyer';
      btn.disabled = false;
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  });
}

if (btnNouveau) {
  btnNouveau.addEventListener('click', () => {
    merci.style.display = 'none';
    form.style.display = 'block';
    form.reset();
    document.getElementById('btn-envoyer').textContent = 'Envoyer';
    document.getElementById('btn-envoyer').disabled = false;
  });
}

// Animation des compteurs statistiques
const counters = document.querySelectorAll('.stat-nombre');
const speed = 200;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = Math.ceil(target / speed);
    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(animateCounters, 10);
    } else {
      counter.innerText = target;
    }
  });
};

// Déclencher quand la section est visible
const statsSection = document.getElementById('statistiques');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    observer.disconnect();
  }
});
if (statsSection) observer.observe(statsSection);