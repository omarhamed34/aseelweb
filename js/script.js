// ===== Progress Bar =====
let progress = 0;
const bar = document.getElementById('bar');
const percent = document.getElementById('percent');
const interval = setInterval(() => {
  if(progress < 80) { 
    progress += 1;
    bar.style.width = progress+'%';
    percent.innerText = progress+'%';
  } else clearInterval(interval);
},50);

// ===== Floating Image + Confetti =====
const floatClick = document.getElementById('floatClick');
floatClick.addEventListener('click', () => {
  floatClick.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.02)' },
      { transform: 'scale(1)' }
    ],
    { duration: 900 }
  );
  fireConfetti();
});

function fireConfetti() {
  const c = document.createElement('canvas');
  c.style.position = 'fixed';
  c.style.left = 0;
  c.style.top = 0;
  c.style.width = '100%';
  c.style.height = '100%';
  c.style.pointerEvents = 'none';
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  document.body.appendChild(c);

  const ctx = c.getContext('2d');
  const pieces = [];
  for (let i = 0; i < 90; i++) {
    pieces.push({
      x: Math.random() * c.width,
      y: Math.random() * -c.height * 0.2 + 50,
      vy: 2 + Math.random() * 5,
      angle: Math.random() * 6,
      va: 0.1 - Math.random() * 0.2,
      size: 6 + Math.random() * 8,
      color: ['#f97316','#ffd280','#8dd3c7','#ff6b6b'][Math.floor(Math.random()*4)]
    });
  }

  let t = 0;
  function loop() {
    t++;
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of pieces) {
      p.y += p.vy;
      p.angle += p.va;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
      ctx.restore();
    }
    if (t < 160) requestAnimationFrame(loop);
    else c.remove();
  }
  loop();
}

// ===== Accessibility: pause animations when tab hidden =====
document.addEventListener('visibilitychange', () => {
  if(document.hidden) {
    // هنا ممكن توقف أي animations ثقيلة
  }
});

// ===== Disable Right Click + Dev Tools =====
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = e => {
  if(['F12','U'].includes(e.key)) e.preventDefault();
  if(e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) e.preventDefault();
};
