/* ===================== NAVIGATION ===================== */
function navigate(page, el) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  if(el) el.classList.add('active');
  // init viewers on first visit
  if(page==='viz' && !freeVW) initFreeViewer();
  if(page==='calc' && !calcVW) { setTimeout(()=>{ calcVW=initViewer('calc-canvas-host'); },50); }
  if(page==='learn' && typeof initLearnGA === 'function') initLearnGA();
}

