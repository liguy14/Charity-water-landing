document.addEventListener('DOMContentLoaded', () => {
  // Donate overlay elements
  const donateOverlay = document.querySelector('.donate-overlay');
  const openDonateBtns = document.querySelectorAll('.open-donate');
  const returnBtn = document.querySelector('.return-btn');
  const continueBtn = document.getElementById('continue-donate');

  // Newsletter overlay elements
  const nlForm = document.getElementById('newsletter-form');
  const nlOverlay = document.querySelector('.newsletter-overlay');
  const nlClose = document.querySelector('.nl-close');

  /* ---------- Helpers ---------- */
  function launchConfetti(count = 140){
    const layer = document.createElement('div');
    layer.className = 'confetti-layer';
    document.body.appendChild(layer);

    const colors = ['#1A1A1A','#3b3b3b','#787576','#bf6c46','#ffffff'];
    for (let i = 0; i < count; i++){
      const p = document.createElement('span');
      p.className = 'confetti-piece';
      p.style.left = Math.random()*100 + '%';
      p.style.background = colors[Math.floor(Math.random()*colors.length)];
      p.style.opacity = (0.7 + Math.random()*0.3).toFixed(2);
      p.style.transform = `translateY(${(-60 - Math.random()*80)}px) rotate(${Math.random()*360}deg)`;
      p.style.animationDelay = Math.random()*300 + 'ms';
      p.style.width  = (6 + Math.random()*6) + 'px';
      p.style.height = (10 + Math.random()*12) + 'px';
      layer.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
    setTimeout(() => layer.remove(), 1600);
  }

  function rippleAndCloseOverlay(overlayEl, x, y){
    if (!overlayEl) return;
    const layers = 5, delays = 100;
    for (let i = 0; i < layers; i++){
      const el = document.createElement('span');
      el.className = 'ripple' + (i % 2 ? ' ring' : '');
      el.style.left = x + 'px';
      el.style.top  = y + 'px';
      el.style.setProperty('--size', (14 + i*4) + 'px');
      el.style.setProperty('--scale', 16 + i*2);
      el.style.animationDelay = (i * delays) + 'ms';
      if (!(i % 2)) el.style.background = 'rgba(249,196,9,' + (0.55 - i*0.08) + ')';
      overlayEl.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
    setTimeout(() => overlayEl.classList.remove('show'), layers*delays + 400);
  }

  function pointFromEvent(evt){
    if (evt?.touches && evt.touches[0]) return {x: evt.touches[0].clientX, y: evt.touches[0].clientY};
    return {x: evt?.clientX ?? window.innerWidth/2, y: evt?.clientY ?? window.innerHeight/2};
  }

  /* ---------- Donate overlay ---------- */
  function openDonateOverlay(e){
    e?.preventDefault?.();
    donateOverlay?.classList.add('show'); // CSS animates brown -> blue over 8s
  }
  openDonateBtns.forEach(btn => btn.addEventListener('click', openDonateOverlay));

  continueBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    launchConfetti(140);
    setTimeout(() => openDonateOverlay(), 600);
  });

  returnBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const p = pointFromEvent(e);
    rippleAndCloseOverlay(donateOverlay, p.x, p.y);
  });

  donateOverlay?.addEventListener('click', (e) => {
    const card = e.target.closest('.donate-inner');
    if (!card) donateOverlay.classList.remove('show');
  });

  /* ---------- Newsletter overlay ---------- */
  nlForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    nlOverlay?.classList.add('show');
    try { nlForm.reset(); } catch {}
  });

  nlClose?.addEventListener('click', (e) => {
    e.preventDefault();
    const p = pointFromEvent(e);
    rippleAndCloseOverlay(nlOverlay, p.x, p.y);
  });

  nlOverlay?.addEventListener('click', (e) => {
    const card = e.target.closest('.newsletter-inner');
    if (!card) nlOverlay.classList.remove('show');
  });
});
