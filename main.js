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