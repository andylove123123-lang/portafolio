// Motion enhances reading; every element remains visible if observation or scripting fails.
(() => {
 if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
 const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   const el = entry.target;
   observer.unobserve(el);
   const image = el.matches('.connection-image, .project-thumbnail');
   const row = el.matches('.project-card');
   el.classList.add(image ? 'motion-picture' : row ? 'motion-row' : 'motion-text');
   el.style.animationDelay = (Number(el.dataset.motionDelay||0))+'ms';
   el.classList.add('is-revealed');
  }
 }, {threshold:.08});
 document.querySelectorAll('.signal-work h2,.connection-controls,.connection-image,.connection-caption,.catalogue .section-heading,.search-row,.project-card,.about-section h2,.about-story p,.capabilities h2,.skills-panel h3,.skill-group,.contact h2,.contact p,.email,.footer-name').forEach((el,i)=>{
  el.dataset.motionDelay=String((i%3)*65);observer.observe(el);
 });
})();
