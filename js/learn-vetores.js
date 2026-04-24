'use strict';
// ═══════════════════════════════════════════════════════════════
//  Módulo Vetores — learn-vetores.js
// ═══════════════════════════════════════════════════════════════

const MOD_SECS = [
  {short:'Conceito',     title:'O que é um Vetor?'},
  {short:'Notação',      title:'Representação Formal'},
  {short:'Plano 2D',     title:'Vetor no Plano Cartesiano'},
  {short:'Espaço 3D',    title:'Vetor no Espaço 3D'},
  {short:'Módulo',       title:'Módulo de um Vetor'},
  {short:'Soma',         title:'Soma de Vetores'},
  {short:'Subtração',    title:'Subtração de Vetores'},
  {short:'Escalar',      title:'Multiplicação por Escalar'},
  {short:'Geométrica',   title:'Interpretação Geométrica'},
  {short:'Propriedades', title:'Propriedades dos Vetores'},
  {short:'Exemplos',     title:'Exemplos Resolvidos'},
  {short:'Erros Comuns', title:'Erros Comuns'},
  {short:'Exercícios',   title:'Exercícios'},
  {short:'Resumo',       title:'Resumo Final'},
];

let _cur = 0;
const _vis = new Set();

// ─── Public API ───────────────────────────────────────────────
function openModule() {
  navigate('module', null);
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const learnItem = document.querySelector('.nav-item:nth-child(3)');
  if (learnItem) learnItem.classList.add('active');
  _cur = 0; _vis.clear();
  _renderNav(); _goSec(0);
}

function backToLearn() {
  navigate('learn', document.querySelector('.nav-item:nth-child(3)'));
}

function gotoSection(i) {
  _vis.add(_cur);
  _goSec(i);
}

function nextSection() {
  if (_cur < MOD_SECS.length - 1) gotoSection(_cur + 1);
  else { _vis.add(_cur); _renderNav(); _renderProg(); }
}

function prevSection() {
  if (_cur > 0) gotoSection(_cur - 1);
}

// ─── Core rendering ───────────────────────────────────────────
function _goSec(i) {
  _cur = i;
  _renderNav(); _renderProg();
  const el = document.getElementById('mod-content');
  if (!el) return;
  el.innerHTML = _secHTML(i) + _btnsHTML(i);
  el.scrollTop = 0;
  rerenderMath(el);
  requestAnimationFrame(() => requestAnimationFrame(() => _initSec(i)));
}

function _renderNav() {
  const el = document.getElementById('mod-nav'); if (!el) return;
  el.innerHTML = MOD_SECS.map((s, i) => {
    const done = _vis.has(i);
    const act  = i === _cur;
    return `<div class="mod-nav-item${act?' active':''}${done?' done':''}" onclick="gotoSection(${i})">
      <div class="mod-nav-num">${done
        ? '<svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>'
        : i + 1}</div>
      <span>${s.short}</span>
    </div>`;
  }).join('');
}

function _renderProg() {
  const f = document.getElementById('mod-prog-fill');
  const t = document.getElementById('mod-prog-txt');
  if (f) f.style.width = (_vis.size / MOD_SECS.length * 100) + '%';
  if (t) t.textContent = _vis.size + ' / ' + MOD_SECS.length;
}

function _btnsHTML(i) {
  const last = i === MOD_SECS.length - 1;
  return `<div class="mod-nav-btns">
    ${i > 0
      ? `<button class="mod-btn mod-btn-secondary" onclick="prevSection()">← Anterior</button>`
      : '<div></div>'}
    <button class="mod-btn mod-btn-primary" onclick="nextSection()" style="margin-left:auto">
      ${last ? '✓ Concluir módulo' : 'Próxima seção →'}
    </button>
  </div>`;
}

function _secHTML(i) {
  return [_s1,_s2,_s3,_s4,_s5,_s6,_s7,_s8,_s9,_s10,_s11,_s12,_s13,_s14][i]();
}

function _initSec(i) {
  const fns = [_i1,_i2,_i3,_i4,_i5,_i6,_i7,_i8,_i9,_i10,_i11,_i12,_i13,_i14];
  if (fns[i]) fns[i]();
}

// ─── Canvas helpers ───────────────────────────────────────────
function _arrow(ctx, x1, y1, x2, y2, color, lw) {
  lw = lw || 2;
  ctx.strokeStyle = color; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hl = 11, hw = 5;
  ctx.fillStyle = color;
  ctx.save(); ctx.translate(x2, y2); ctx.rotate(ang);
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-hl,-hw); ctx.lineTo(-hl,hw); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function _dot(ctx, x, y, color, r) {
  r = r || 5;
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
}

function _grid(ctx, W, H, step, ox, oy) {
  ctx.strokeStyle = 'rgba(42,51,80,.9)'; ctx.lineWidth = .7;
  for (let x = ox % step; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = oy % step; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  // axes
  ctx.strokeStyle = 'rgba(74,158,255,.35)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox,0); ctx.lineTo(ox,H); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,oy); ctx.lineTo(W,oy); ctx.stroke();
}

function _txt(ctx, txt, x, y, color, sz) {
  ctx.fillStyle = color;
  ctx.font = (sz||12) + 'px JetBrains Mono,monospace';
  ctx.fillText(txt, x, y);
}

function _canvasW(id) {
  const el = document.getElementById(id);
  return el ? el.offsetWidth || 500 : 500;
}

// ─── SECTION 1: O que é um Vetor? ─────────────────────────────
function _s1() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">O que é um Vetor?</h2>
    <p class="mod-section-sub">Vetores são objetos matemáticos com <strong>magnitude</strong>, <strong>direção</strong> e <strong>sentido</strong> — ao contrário de escalares, que possuem apenas um valor numérico.</p>
    <div class="mod-two-col">
      <div class="mod-card">
        <h4>📊 Escalar</h4>
        <p>Um número sem direção.<br>Ex: temperatura (25°C), massa (70 kg), tempo (5 s)</p>
        <div class="mod-formula-box" style="font-size:26px;padding:14px">25°C</div>
      </div>
      <div class="mod-card">
        <h4>→ Vetor</h4>
        <p>Tem magnitude <em>e</em> direção.<br>Ex: velocidade (60 km/h Norte), força (10 N ↗)</p>
        <div class="mod-formula-box">$$\\vec{v} = (x, y, z)$$</div>
      </div>
    </div>
    <div class="mod-canvas-wrap">
      <canvas id="s1c" style="width:100%;height:200px"></canvas>
      <div class="mod-canvas-controls">
        <div class="mod-slider-wrap">
          <label>Magnitude:</label>
          <input type="range" id="s1-mag" min="20" max="140" value="80" oninput="s1Upd()">
          <span class="mod-slider-val" id="s1-mv">80</span>
        </div>
        <div class="mod-slider-wrap">
          <label>Ângulo:</label>
          <input type="range" id="s1-ang" min="0" max="360" value="35" oninput="s1Upd()">
          <span class="mod-slider-val" id="s1-av">35°</span>
        </div>
      </div>
    </div>
    <div class="mod-card">
      <h4>Notação</h4>
      <p>Um vetor é representado por letra com seta <span class="mod-hl">$\\vec{v}$</span>, ou em negrito: <strong>v</strong>.
      No plano 2D: <span class="mod-hl">$\\vec{v}=(x,y)$</span>. No espaço 3D: <span class="mod-hl">$\\vec{v}=(x,y,z)$</span>.</p>
    </div>
    <div class="mod-info-row">
      <span class="mod-info-icon">💡</span>
      <span>Todo vetor tem três atributos inseparáveis: <strong>módulo</strong> (comprimento), <strong>direção</strong> (reta suporte) e <strong>sentido</strong> (de onde para onde aponta).</span>
    </div>
  </div>`;
}

function _i1() {
  const c = document.getElementById('s1c'); if (!c) return;
  c.width = c.offsetWidth; c.height = 200;
  s1Upd();
}

function s1Upd() {
  const c = document.getElementById('s1c'); if (!c) return;
  const mag = +document.getElementById('s1-mag').value;
  const ang = +document.getElementById('s1-ang').value;
  document.getElementById('s1-mv').textContent = mag;
  document.getElementById('s1-av').textContent = ang + '°';
  const W = c.width, H = c.height, ctx = c.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  _grid(ctx, W, H, 40, W/2, H/2);
  const rad = ang * Math.PI / 180;
  const ox = W/2, oy = H/2;
  const ex = ox + mag * Math.cos(rad), ey = oy - mag * Math.sin(rad);
  // projections
  ctx.strokeStyle = 'rgba(74,158,255,.4)'; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(ex,oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ex,oy); ctx.lineTo(ox,oy); ctx.stroke();
  ctx.setLineDash([]);
  // main vector
  _arrow(ctx, ox, oy, ex, ey, '#7c6af7', 2.5);
  _dot(ctx, ox, oy, '#7c6af7', 4);
  _dot(ctx, ex, ey, '#a78bfa', 5);
  // labels
  _txt(ctx, 'v⃗', (ox+ex)/2-6, (oy+ey)/2-10, '#a78bfa', 13);
  _txt(ctx, 'x='+Math.round(mag*Math.cos(rad)), ex+6, oy+14, '#4a9eff', 11);
  _txt(ctx, 'y='+Math.round(mag*Math.sin(rad)), ox-50, ey-6, '#2dd4a0', 11);
  _txt(ctx, '|v⃗|='+mag, ox+4, oy-8, '#8892b0', 10);
}

// ─── SECTION 2: Representação Formal ─────────────────────────
function _s2() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Representação Formal</h2>
    <p class="mod-section-sub">Um vetor é definido por dois pontos: <strong>origem A</strong> e <strong>extremidade B</strong>. O vetor <span class="mod-hl">$\\overrightarrow{AB}$</span> aponta de A para B.</p>
    <div class="mod-canvas-wrap">
      <canvas id="s2c" style="width:100%;height:220px"></canvas>
    </div>
    <div class="mod-card">
      <h4>Definição por coordenadas</h4>
      <p>Dados dois pontos A = (x₁, y₁, z₁) e B = (x₂, y₂, z₂):</p>
      <div class="mod-formula-box">$$\\vec{v}=\\overrightarrow{AB}=B-A=(x_2-x_1,\\;y_2-y_1,\\;z_2-z_1)$$</div>
    </div>
    <div class="mod-two-col">
      <div class="mod-card">
        <h4>Vetores equipolentes</h4>
        <p>Dois vetores são <strong>iguais</strong> se têm o mesmo módulo, direção e sentido — independentemente da posição no plano.</p>
      </div>
      <div class="mod-card">
        <h4>Vetor nulo</h4>
        <p>O vetor nulo <span class="mod-hl">$\\vec{0}=(0,0,0)$</span> tem módulo zero e direção indefinida. Elemento neutro da adição.</p>
      </div>
    </div>
    <div class="mod-card">
      <h4>Representação na base canônica</h4>
      <p>Qualquer vetor 3D pode ser escrito como combinação dos vetores unitários <span class="mod-hl">$\\hat{\\imath}=(1,0,0)$</span>, <span class="mod-hl">$\\hat{\\jmath}=(0,1,0)$</span>, <span class="mod-hl">$\\hat{k}=(0,0,1)$</span>:</p>
      <div class="mod-formula-box">$$\\vec{v}=x\\,\\hat{\\imath}+y\\,\\hat{\\jmath}+z\\,\\hat{k}$$</div>
    </div>
  </div>`;
}

function _i2() {
  const c = document.getElementById('s2c'); if (!c) return;
  c.width = c.offsetWidth; c.height = 220;
  const ctx = c.getContext('2d'), W = c.width, H = c.height;
  _grid(ctx, W, H, 40, W*0.2, H*0.8);
  const ax=W*.2, ay=H*.75, bx=W*.7, by=H*.22;
  _arrow(ctx, ax, ay, bx, by, '#7c6af7', 2.5);
  // equipolent copy
  const dx=bx-ax, dy=by-ay;
  ctx.setLineDash([4,3]);
  _arrow(ctx, ax+80, ay+14, bx+80, by+14, 'rgba(124,106,247,.45)', 2);
  ctx.setLineDash([]);
  // dots
  _dot(ctx, ax, ay, '#2dd4a0', 5); _dot(ctx, bx, by, '#f97316', 5);
  _dot(ctx, ax+80, ay+14, '#2dd4a0', 4); _dot(ctx, bx+80, by+14, '#f97316', 4);
  // labels
  _txt(ctx, 'A', ax-14, ay+4, '#2dd4a0', 13);
  _txt(ctx, 'B', bx+6, by-4, '#f97316', 13);
  _txt(ctx, 'AB⃗', (ax+bx)/2-12, (ay+by)/2-12, '#a78bfa', 13);
  _txt(ctx, 'vetor equipolente', ax+90, ay+30, '#4a5578', 11);
}

// ─── SECTION 3: Vetor no Plano 2D ────────────────────────────
function _s3() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Vetor no Plano Cartesiano 2D</h2>
    <p class="mod-section-sub">Arraste os pontos <strong>A</strong> (verde) e <strong>B</strong> (laranja) no plano para ver o vetor <span class="mod-hl">$\\overrightarrow{AB}=B-A$</span> calculado em tempo real.</p>
    <div class="mod-canvas-wrap">
      <canvas id="s3c" style="width:100%;height:300px;cursor:crosshair"></canvas>
      <div class="mod-canvas-controls">
        <span style="font-size:12px;color:var(--text2)">Coordenadas:</span>
        <span id="s3-info" style="font-family:var(--mono);font-size:12px;color:var(--accent)">—</span>
      </div>
    </div>
    <div class="mod-two-col">
      <div class="mod-card">
        <h4>Componentes do vetor</h4>
        <p>As componentes do vetor AB⃗ são as diferenças entre as coordenadas de B e A:</p>
        <div class="mod-formula-box" style="font-size:12px">$$\\overrightarrow{AB}=(B_x-A_x,\\;B_y-A_y)$$</div>
      </div>
      <div class="mod-card">
        <h4>Interpretação geométrica</h4>
        <p>As componentes são as <strong>projeções</strong> do vetor nos eixos x e y — os catetos do triângulo retângulo formado.</p>
      </div>
    </div>
  </div>`;
}

let _s3A = {x:0.25, y:0.65}, _s3B = {x:0.72, y:0.28};
let _s3drag = null;

function _i3() {
  const c = document.getElementById('s3c'); if (!c) return;
  c.width = c.offsetWidth; c.height = 300;
  s3Draw();

  function getPos(e) {
    const r = c.getBoundingClientRect();
    const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
    return {x: cx/c.width, y: cy/c.height};
  }

  function hitTest(p, pt) {
    return Math.hypot((p.x - pt.x)*c.width, (p.y - pt.y)*c.height) < 12;
  }

  function onDown(e) {
    const p = getPos(e);
    if (hitTest(p, _s3A)) _s3drag = 'A';
    else if (hitTest(p, _s3B)) _s3drag = 'B';
  }

  function onMove(e) {
    if (!_s3drag) return;
    e.preventDefault();
    const p = getPos(e);
    p.x = Math.max(0.05, Math.min(.95, p.x));
    p.y = Math.max(0.05, Math.min(.95, p.y));
    if (_s3drag === 'A') _s3A = p;
    else _s3B = p;
    s3Draw();
  }

  function onUp() { _s3drag = null; }

  c.addEventListener('mousedown', onDown);
  c.addEventListener('mousemove', onMove);
  c.addEventListener('mouseup', onUp);
  c.addEventListener('touchstart', onDown, {passive:false});
  c.addEventListener('touchmove', onMove, {passive:false});
  c.addEventListener('touchend', onUp);
}

function s3Draw() {
  const c = document.getElementById('s3c'); if (!c) return;
  const W = c.width, H = c.height, ctx = c.getContext('2d');
  const step = 40;
  ctx.clearRect(0, 0, W, H);
  _grid(ctx, W, H, step, W/2, H/2);

  const ax = _s3A.x * W, ay = _s3A.y * H;
  const bx = _s3B.x * W, by = _s3B.y * H;

  // projections
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,ay); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bx,ay); ctx.lineTo(bx,by); ctx.stroke();
  ctx.setLineDash([]);

  _arrow(ctx, ax, ay, bx, by, '#7c6af7', 2.5);

  // component labels
  const cx2 = (ax+bx)/2, cy2 = (ay+by)/2;
  const scl = step/40;
  const vx = Math.round((bx-ax)/step*scl*10)/10;
  const vy = Math.round((ay-by)/step*scl*10)/10;
  _txt(ctx, 'x='+vx, (ax+bx)/2, ay+(by>ay?-6:14), '#4a9eff', 11);
  _txt(ctx, 'y='+vy, bx+5, (ay+by)/2, '#2dd4a0', 11);

  _dot(ctx, ax, ay, '#2dd4a0', 8); _dot(ctx, bx, by, '#f97316', 8);
  _txt(ctx, 'A', ax-16, ay-4, '#2dd4a0', 13);
  _txt(ctx, 'B', bx+6, by-4, '#f97316', 13);
  _txt(ctx, 'v⃗=('+vx+', '+vy+')', cx2-20, cy2-14, '#a78bfa', 12);

  const info = document.getElementById('s3-info');
  if (info) info.textContent = 'A=('+Math.round(_s3A.x*10-5)+', '+Math.round(5-_s3A.y*10)+
    ')  B=('+Math.round(_s3B.x*10-5)+', '+Math.round(5-_s3B.y*10)+
    ')  v⃗=('+vx+', '+vy+')  |v⃗|='+Math.round(Math.hypot(bx-ax,by-ay)/step*scl*100)/100;
}

// ─── SECTION 4: Vetor no Espaço 3D ───────────────────────────
function _s4() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Vetor no Espaço 3D</h2>
    <p class="mod-section-sub">No R³ um vetor tem três componentes <span class="mod-hl">(x, y, z)</span>. Use os controles para explorar como cada componente afeta a direção no espaço.</p>
    <div class="mod-canvas-wrap">
      <canvas id="s4c" style="width:100%;height:280px"></canvas>
      <div class="mod-canvas-controls">
        <div class="mod-slider-wrap">
          <label>x:</label>
          <input type="range" id="s4x" min="-5" max="5" value="3" step=".5" oninput="s4Upd()">
          <span class="mod-slider-val" id="s4xv">3</span>
        </div>
        <div class="mod-slider-wrap">
          <label>y:</label>
          <input type="range" id="s4y" min="-5" max="5" value="2" step=".5" oninput="s4Upd()">
          <span class="mod-slider-val" id="s4yv">2</span>
        </div>
        <div class="mod-slider-wrap">
          <label>z:</label>
          <input type="range" id="s4z" min="-5" max="5" value="2" step=".5" oninput="s4Upd()">
          <span class="mod-slider-val" id="s4zv">2</span>
        </div>
        <span id="s4-mod" style="font-family:var(--mono);font-size:12px;color:var(--text2);margin-left:auto"></span>
      </div>
    </div>
    <div class="mod-two-col">
      <div class="mod-card">
        <h4>Projeção nos eixos</h4>
        <p>As linhas tracejadas mostram as <strong>projeções</strong> do vetor nos planos coordenados. Cada componente é a "sombra" do vetor no eixo correspondente.</p>
      </div>
      <div class="mod-card">
        <h4>Base canônica R³</h4>
        <p><span class="mod-hl">î</span>= eixo X (vermelho) &nbsp; <span class="mod-green">ĵ</span>= eixo Y (verde) &nbsp; <span class="mod-blue">k̂</span>= eixo Z (azul)</p>
      </div>
    </div>
  </div>`;
}

function _i4() {
  const c = document.getElementById('s4c'); if (!c) return;
  c.width = c.offsetWidth; c.height = 280;
  s4Upd();
}

function s4Upd() {
  const c = document.getElementById('s4c'); if (!c) return;
  const vx = +document.getElementById('s4x').value;
  const vy = +document.getElementById('s4y').value;
  const vz = +document.getElementById('s4z').value;
  document.getElementById('s4xv').textContent = vx;
  document.getElementById('s4yv').textContent = vy;
  document.getElementById('s4zv').textContent = vz;
  const mod = Math.sqrt(vx*vx+vy*vy+vz*vz);
  const mEl = document.getElementById('s4-mod');
  if (mEl) mEl.textContent = '|v⃗| = ' + mod.toFixed(2);

  const W = c.width, H = c.height, ctx = c.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  // Isometric projection
  const sc = 24; // scale per unit
  const ox = W*0.48, oy = H*0.65;
  // Iso vectors: X→right-down, Y→left-down, Z→up
  const ix = {dx: sc*0.866, dy: sc*0.5};  // X axis iso
  const iy = {dx:-sc*0.866, dy: sc*0.5};  // Y axis iso
  const iz = {dx:0,         dy:-sc};       // Z axis iso

  function iso(x, y, z) {
    return {
      sx: ox + x*ix.dx + y*iy.dx + z*iz.dx,
      sy: oy + x*ix.dy + y*iy.dy + z*iz.dy
    };
  }

  // Draw axis grid (partial)
  ctx.lineWidth = .7;
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue;
    ctx.strokeStyle = 'rgba(42,51,80,.6)';
    const a = iso(i, -5, 0), b = iso(i, 5, 0);
    const c1 = iso(-5, i, 0), d1 = iso(5, i, 0);
    ctx.beginPath(); ctx.moveTo(a.sx,a.sy); ctx.lineTo(b.sx,b.sy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(c1.sx,c1.sy); ctx.lineTo(d1.sx,d1.sy); ctx.stroke();
  }

  // Axes
  const axLen = 5;
  const o = iso(0,0,0);
  const xEnd = iso(axLen,0,0), yEnd = iso(0,axLen,0), zEnd = iso(0,0,axLen);
  _arrow(ctx, o.sx,o.sy, xEnd.sx,xEnd.sy, '#ef4444', 2);
  _arrow(ctx, o.sx,o.sy, yEnd.sx,yEnd.sy, '#22c55e', 2);
  _arrow(ctx, o.sx,o.sy, zEnd.sx,zEnd.sy, '#3b82f6', 2);
  _txt(ctx, 'X', xEnd.sx+4, xEnd.sy+4, '#ef4444', 12);
  _txt(ctx, 'Y', yEnd.sx-16, yEnd.sy+4, '#22c55e', 12);
  _txt(ctx, 'Z', zEnd.sx+4, zEnd.sy-4, '#3b82f6', 12);

  // Vector projections (dashed)
  const vEnd = iso(vx, vy, vz);
  const pxy = iso(vx, vy, 0);
  const pxz = iso(vx, 0, vz);
  const pyz = iso(0, vy, vz);
  ctx.setLineDash([4, 3]);
  ctx.lineWidth = 1;
  // shadow on xy plane
  ctx.strokeStyle = 'rgba(124,106,247,.35)';
  ctx.beginPath(); ctx.moveTo(o.sx,o.sy); ctx.lineTo(pxy.sx,pxy.sy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pxy.sx,pxy.sy); ctx.lineTo(vEnd.sx,vEnd.sy); ctx.stroke();
  ctx.setLineDash([]);

  // Main vector
  _arrow(ctx, o.sx, o.sy, vEnd.sx, vEnd.sy, '#7c6af7', 2.8);
  _dot(ctx, o.sx, o.sy, '#7c6af7', 5);
  _dot(ctx, vEnd.sx, vEnd.sy, '#a78bfa', 6);
  _txt(ctx, 'v⃗('+vx+','+vy+','+vz+')', vEnd.sx+6, vEnd.sy-6, '#a78bfa', 12);
}

// ─── SECTION 5: Módulo ────────────────────────────────────────
function _s5() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Módulo de um Vetor</h2>
    <p class="mod-section-sub">O <strong>módulo</strong> (ou norma) de um vetor é seu comprimento. É calculado pela generalização do Teorema de Pitágoras.</p>
    <div class="mod-canvas-wrap">
      <canvas id="s5c" style="width:100%;height:280px;cursor:crosshair"></canvas>
      <div class="mod-canvas-controls">
        <span id="s5-info" style="font-family:var(--mono);font-size:12px;color:var(--accent)">Arraste a ponta do vetor</span>
      </div>
    </div>
    <div class="mod-formula-box">$$|\\vec{v}|=\\sqrt{x^2+y^2}\\qquad\\text{(3D: }\\sqrt{x^2+y^2+z^2}\\text{)}$$</div>
    <div class="mod-two-col">
      <div class="mod-card">
        <h4>Propriedades do módulo</h4>
        <p>• $|\\vec{v}|\\geq 0$ &nbsp; (sempre não-negativo)<br>
           • $|\\vec{v}|=0\\iff\\vec{v}=\\vec{0}$<br>
           • $|\\lambda\\,\\vec{v}|=|\\lambda|\\,|\\vec{v}|$ &nbsp; (escalar)</p>
      </div>
      <div class="mod-card">
        <h4>Vetor unitário</h4>
        <p>O vetor unitário <span class="mod-hl">$\\hat{v}$</span> tem módulo 1 e aponta na mesma direção de $\\vec{v}$:</p>
        <div class="mod-formula-box" style="font-size:11px">$$\\hat{v}=\\dfrac{\\vec{v}}{|\\vec{v}|}$$</div>
      </div>
    </div>
  </div>`;
}

let _s5pt = {x:0.65, y:0.25};
let _s5drag = false;

function _i5() {
  const c = document.getElementById('s5c'); if (!c) return;
  c.width = c.offsetWidth; c.height = 280;
  s5Draw();

  function getPos(e) {
    const r = c.getBoundingClientRect();
    return {
      x: ((e.touches?e.touches[0].clientX:e.clientX)-r.left)/c.width,
      y: ((e.touches?e.touches[0].clientY:e.clientY)-r.top)/c.height
    };
  }

  c.addEventListener('mousedown', e => {
    const p = getPos(e);
    const px = _s5pt.x*c.width, py = _s5pt.y*c.height;
    if (Math.hypot(p.x*c.width-px, p.y*c.height-py) < 14) _s5drag = true;
  });
  c.addEventListener('mousemove', e => {
    if (!_s5drag) return;
    const p = getPos(e);
    _s5pt = {x:Math.max(.1,Math.min(.9,p.x)), y:Math.max(.05,Math.min(.9,p.y))};
    s5Draw();
  });
  c.addEventListener('mouseup', () => _s5drag = false);
  c.addEventListener('touchstart', e => {
    const p = getPos(e);
    const px = _s5pt.x*c.width, py = _s5pt.y*c.height;
    if (Math.hypot(p.x*c.width-px, p.y*c.height-py) < 18) _s5drag = true;
  }, {passive:true});
  c.addEventListener('touchmove', e => {
    if (!_s5drag) return; e.preventDefault();
    const p = getPos(e);
    _s5pt = {x:Math.max(.1,Math.min(.9,p.x)), y:Math.max(.05,Math.min(.9,p.y))};
    s5Draw();
  }, {passive:false});
  c.addEventListener('touchend', () => _s5drag = false);
}

function s5Draw() {
  const c = document.getElementById('s5c'); if (!c) return;
  const W = c.width, H = c.height, ctx = c.getContext('2d');
  const step = 40;
  ctx.clearRect(0, 0, W, H);
  _grid(ctx, W, H, step, W*0.15, H*0.8);
  const ox = W*0.15, oy = H*0.8;
  const ex = _s5pt.x*W, ey = _s5pt.y*H;
  const dx = ex-ox, dy = ey-oy;
  const mag = Math.sqrt(dx*dx+dy*dy);

  // Right triangle legs
  ctx.fillStyle = 'rgba(74,158,255,.07)';
  ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ex,oy); ctx.lineTo(ex,ey); ctx.closePath(); ctx.fill();
  // Right angle mark
  const sz = 10;
  ctx.strokeStyle='rgba(74,158,255,.5)'; ctx.lineWidth=1;
  ctx.strokeRect(ex-sz*(dx>0?1:-1), oy-sz*(dy<0?1:-1), sz*(dx>0?1:-1), sz*(dy<0?1:-1));

  // Legs
  ctx.strokeStyle='#4a9eff'; ctx.lineWidth=1.8; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ex,oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ex,oy); ctx.lineTo(ex,ey); ctx.stroke();
  ctx.setLineDash([]);

  // Main vector (hypotenuse)
  _arrow(ctx, ox, oy, ex, ey, '#7c6af7', 2.5);

  // Labels
  const vx = (dx/step).toFixed(1), vy = (-dy/step).toFixed(1);
  const vm = (mag/step).toFixed(2);
  _txt(ctx, 'x='+vx, (ox+ex)/2, oy+16, '#4a9eff', 11);
  _txt(ctx, 'y='+vy, ex+(dx>0?6:-34), (oy+ey)/2, '#2dd4a0', 11);
  _txt(ctx, '|v⃗|='+vm, (ox+ex)/2-20, (oy+ey)/2-12, '#a78bfa', 12);

  _dot(ctx, ox, oy, '#7c6af7', 5);
  _dot(ctx, ex, ey, '#a78bfa', 8);

  const info = document.getElementById('s5-info');
  if (info) info.textContent = 'v⃗=('+vx+', '+vy+')  |v⃗|=√('+vx+'²+'+vy+'²) = '+vm;
}

// ─── SECTION 6: Soma ─────────────────────────────────────────
function _s6() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Soma de Vetores</h2>
    <p class="mod-section-sub">A soma vetorial é feita componente a componente. Geometricamente pode ser visualizada pela <strong>regra do triângulo</strong> ou pela <strong>regra do paralelogramo</strong>.</p>
    <div class="mod-toggle-group">
      <button class="mod-toggle-btn on" id="s6-tri" onclick="s6Mode('tri')">Regra do Triângulo</button>
      <button class="mod-toggle-btn" id="s6-par" onclick="s6Mode('par')">Regra do Paralelogramo</button>
    </div>
    <div class="mod-canvas-wrap">
      <canvas id="s6c" style="width:100%;height:260px"></canvas>
      <div class="mod-canvas-controls">
        <div class="mod-slider-wrap"><label>A = (</label>
          <input type="range" id="s6ax" min="-4" max="4" value="2" step=".5" oninput="s6Draw()">
          <span class="mod-slider-val" id="s6axv">2</span>
          <span style="color:var(--text2)">,</span>
          <input type="range" id="s6ay" min="-4" max="4" value="1" step=".5" oninput="s6Draw()">
          <span class="mod-slider-val" id="s6ayv">1</span>
          <label>)</label>
        </div>
        <div class="mod-slider-wrap"><label>B = (</label>
          <input type="range" id="s6bx" min="-4" max="4" value="1" step=".5" oninput="s6Draw()">
          <span class="mod-slider-val" id="s6bxv">1</span>
          <span style="color:var(--text2)">,</span>
          <input type="range" id="s6by" min="-4" max="4" value="2" step=".5" oninput="s6Draw()">
          <span class="mod-slider-val" id="s6byv">2</span>
          <label>)</label>
        </div>
      </div>
    </div>
    <div class="mod-formula-box">$$\\vec{A}+\\vec{B}=(A_x+B_x,\\;A_y+B_y)$$</div>
    <div class="mod-card">
      <h4>Propriedades da soma</h4>
      <p>• Comutativa: <span class="mod-hl">$\\vec{A}+\\vec{B}=\\vec{B}+\\vec{A}$</span><br>
         • Associativa: <span class="mod-hl">$(\\vec{A}+\\vec{B})+\\vec{C}=\\vec{A}+(\\vec{B}+\\vec{C})$</span><br>
         • Elemento neutro: <span class="mod-hl">$\\vec{A}+\\vec{0}=\\vec{A}$</span></p>
    </div>
  </div>`;
}

let _s6mode = 'tri';
function s6Mode(m) {
  _s6mode = m;
  document.getElementById('s6-tri').classList.toggle('on', m==='tri');
  document.getElementById('s6-par').classList.toggle('on', m==='par');
  s6Draw();
}

function s6Draw() {
  const c = document.getElementById('s6c'); if (!c) return;
  if (!c.width) { c.width = c.offsetWidth; c.height = 260; }
  const W=c.width, H=c.height, ctx=c.getContext('2d');
  const sc=36;
  const ax=+document.getElementById('s6ax').value, ay=+document.getElementById('s6ay').value;
  const bx=+document.getElementById('s6bx').value, by=+document.getElementById('s6by').value;
  document.getElementById('s6axv').textContent=ax;
  document.getElementById('s6ayv').textContent=ay;
  document.getElementById('s6bxv').textContent=bx;
  document.getElementById('s6byv').textContent=by;

  ctx.clearRect(0,0,W,H);
  _grid(ctx,W,H,sc,W/2,H/2);
  const ox=W/2, oy=H/2;

  if (_s6mode==='tri') {
    // Triangle rule: A from O, B from tip of A, result from O to tip of B
    const ax1=ox+ax*sc, ay1=oy-ay*sc;
    const bx1=ax1+bx*sc, by1=ay1-by*sc;
    _arrow(ctx, ox, oy, ax1, ay1, '#7c6af7', 2.5);
    _arrow(ctx, ax1, ay1, bx1, by1, '#2dd4a0', 2.5);
    _arrow(ctx, ox, oy, bx1, by1, '#f97316', 2.8);
    _txt(ctx,'A⃗',ox+(ax1-ox)/2-16, oy+(ay1-oy)/2+4,'#7c6af7',12);
    _txt(ctx,'B⃗',ax1+(bx1-ax1)/2+4,ay1+(by1-ay1)/2-4,'#2dd4a0',12);
    _txt(ctx,'A⃗+B⃗='+'('+( ax+bx)+','+(ay+by)+')',(ox+bx1)/2+4,(oy+by1)/2+4,'#f97316',12);
    _dot(ctx,ox,oy,'#8892b0',4);
    _dot(ctx,ax1,ay1,'#7c6af7',5);
    _dot(ctx,bx1,by1,'#f97316',6);
  } else {
    // Parallelogram rule
    const ax1=ox+ax*sc, ay1=oy-ay*sc;
    const bx1=ox+bx*sc, by1=oy-by*sc;
    const rx=ox+(ax+bx)*sc, ry=oy-(ay+by)*sc;
    // parallelogram fill
    ctx.fillStyle='rgba(124,106,247,.07)';
    ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ax1,ay1); ctx.lineTo(rx,ry); ctx.lineTo(bx1,by1); ctx.closePath(); ctx.fill();
    // sides
    ctx.strokeStyle='rgba(124,106,247,.3)'; ctx.lineWidth=1; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(ax1,ay1); ctx.lineTo(rx,ry); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx1,by1); ctx.lineTo(rx,ry); ctx.stroke();
    ctx.setLineDash([]);
    _arrow(ctx, ox, oy, ax1, ay1, '#7c6af7', 2.5);
    _arrow(ctx, ox, oy, bx1, by1, '#2dd4a0', 2.5);
    _arrow(ctx, ox, oy, rx, ry, '#f97316', 2.8);
    _txt(ctx,'A⃗',ox+(ax1-ox)/2-16, oy+(ay1-oy)/2+14,'#7c6af7',12);
    _txt(ctx,'B⃗',ox+(bx1-ox)/2+4,oy+(by1-oy)/2-4,'#2dd4a0',12);
    _txt(ctx,'A⃗+B⃗',(ox+rx)/2+4,(oy+ry)/2-8,'#f97316',12);
    _dot(ctx,ox,oy,'#8892b0',4); _dot(ctx,rx,ry,'#f97316',6);
  }
}

function _i6() {
  const c=document.getElementById('s6c'); if(!c) return;
  c.width=c.offsetWidth; c.height=260;
  s6Draw();
}

// ─── SECTION 7: Subtração ─────────────────────────────────────
function _s7() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Subtração de Vetores</h2>
    <p class="mod-section-sub">A subtração <span class="mod-hl">$\\vec{A}-\\vec{B}$</span> é equivalente a somar o oposto de $\\vec{B}$: <span class="mod-hl">$\\vec{A}+(-\\vec{B})$</span>. Geometricamente é a diagonal do paralelogramo no sentido contrário.</p>
    <div class="mod-canvas-wrap">
      <canvas id="s7c" style="width:100%;height:260px"></canvas>
      <div class="mod-canvas-controls">
        <div class="mod-slider-wrap"><label>A:</label>
          <input type="range" id="s7ax" min="-4" max="4" value="3" step=".5" oninput="s7Draw()">
          <span class="mod-slider-val" id="s7axv">3</span>
          <span style="color:var(--text2)">,</span>
          <input type="range" id="s7ay" min="-4" max="4" value="1" step=".5" oninput="s7Draw()">
          <span class="mod-slider-val" id="s7ayv">1</span>
        </div>
        <div class="mod-slider-wrap"><label>B:</label>
          <input type="range" id="s7bx" min="-4" max="4" value="1" step=".5" oninput="s7Draw()">
          <span class="mod-slider-val" id="s7bxv">1</span>
          <span style="color:var(--text2)">,</span>
          <input type="range" id="s7by" min="-4" max="4" value="3" step=".5" oninput="s7Draw()">
          <span class="mod-slider-val" id="s7byv">3</span>
        </div>
        <span id="s7-res" style="font-family:var(--mono);font-size:12px;color:var(--orange);margin-left:auto"></span>
      </div>
    </div>
    <div class="mod-formula-box">$$\\vec{A}-\\vec{B}=(A_x-B_x,\\;A_y-B_y)$$</div>
    <div class="mod-info-row">
      <span class="mod-info-icon">💡</span>
      <span>A − B aponta <strong>de B para A</strong> (diagonal do paralelogramo). Também é o vetor que, somado a B, resulta em A: <span class="mod-hl">B + (A−B) = A</span>.</span>
    </div>
  </div>`;
}

function s7Draw() {
  const c=document.getElementById('s7c'); if(!c) return;
  if(!c.width){c.width=c.offsetWidth;c.height=260;}
  const W=c.width, H=c.height, ctx=c.getContext('2d');
  const sc=34;
  const ax=+document.getElementById('s7ax').value, ay=+document.getElementById('s7ay').value;
  const bx=+document.getElementById('s7bx').value, by=+document.getElementById('s7by').value;
  document.getElementById('s7axv').textContent=ax; document.getElementById('s7ayv').textContent=ay;
  document.getElementById('s7bxv').textContent=bx; document.getElementById('s7byv').textContent=by;
  const res=document.getElementById('s7-res');
  if(res) res.textContent='A−B=('+((ax-bx).toFixed(1))+','+(( ay-by).toFixed(1))+')';

  ctx.clearRect(0,0,W,H); _grid(ctx,W,H,sc,W/2,H/2);
  const ox=W/2, oy=H/2;
  const ax1=ox+ax*sc, ay1=oy-ay*sc;
  const bx1=ox+bx*sc, by1=oy-by*sc;
  const rx=ox+(ax-bx)*sc, ry=oy-(ay-by)*sc;

  // parallelogram ghost
  ctx.fillStyle='rgba(124,106,247,.05)';
  ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ax1,ay1); ctx.lineTo(ox+(ax+bx)*sc,oy-(ay+by)*sc); ctx.lineTo(bx1,by1); ctx.closePath(); ctx.fill();

  // dashed sides
  ctx.strokeStyle='rgba(255,255,255,.15)'; ctx.lineWidth=1; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(bx1,by1); ctx.lineTo(ox+(ax+bx)*sc,oy-(ay+by)*sc); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ax1,ay1); ctx.lineTo(ox+(ax+bx)*sc,oy-(ay+by)*sc); ctx.stroke();
  ctx.setLineDash([]);

  _arrow(ctx,ox,oy,ax1,ay1,'#7c6af7',2.5);
  _arrow(ctx,ox,oy,bx1,by1,'#2dd4a0',2.5);
  // −B dashed
  ctx.setLineDash([4,3]);
  _arrow(ctx,ax1,ay1,ox+(ax-bx)*sc,oy-(ay-by)*sc,'rgba(45,212,160,.6)',1.8);
  ctx.setLineDash([]);
  _arrow(ctx,ox,oy,rx,ry,'#f97316',2.8);

  _txt(ctx,'A⃗',(ox+ax1)/2-16,(oy+ay1)/2+4,'#7c6af7',12);
  _txt(ctx,'B⃗',(ox+bx1)/2+4,(oy+by1)/2-4,'#2dd4a0',12);
  _txt(ctx,'A−B',(ox+rx)/2+4,(oy+ry)/2-8,'#f97316',12);
  _dot(ctx,ox,oy,'#8892b0',4); _dot(ctx,ax1,ay1,'#7c6af7',5); _dot(ctx,bx1,by1,'#2dd4a0',5); _dot(ctx,rx,ry,'#f97316',6);
}

function _i7() {
  const c=document.getElementById('s7c'); if(!c) return;
  c.width=c.offsetWidth; c.height=260;
  s7Draw();
}

// ─── SECTION 8: Multiplicação por Escalar ────────────────────
function _s8() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Multiplicação por Escalar</h2>
    <p class="mod-section-sub">Multiplicar um vetor por um escalar λ <strong>escala</strong> seu comprimento. Se λ < 0, o sentido é <strong>invertido</strong>.</p>
    <div class="mod-canvas-wrap">
      <canvas id="s8c" style="width:100%;height:260px"></canvas>
      <div class="mod-canvas-controls">
        <div class="mod-slider-wrap">
          <label>λ =</label>
          <input type="range" id="s8-lam" min="-3" max="3" value="1.5" step=".25" oninput="s8Draw()">
          <span class="mod-slider-val" id="s8-lamv">1.5</span>
        </div>
        <div class="mod-slider-wrap">
          <label>v⃗ = (</label>
          <input type="range" id="s8-vx" min="-3" max="3" value="2" step=".5" oninput="s8Draw()">
          <span class="mod-slider-val" id="s8-vxv">2</span>
          <label>,</label>
          <input type="range" id="s8-vy" min="-3" max="3" value="1" step=".5" oninput="s8Draw()">
          <span class="mod-slider-val" id="s8-vyv">1</span>
          <label>)</label>
        </div>
        <span id="s8-res" style="font-family:var(--mono);font-size:12px;color:var(--orange);margin-left:auto"></span>
      </div>
    </div>
    <div class="mod-formula-box">$$\\lambda\\,\\vec{v}=(\\lambda x,\\;\\lambda y,\\;\\lambda z)\\qquad|\\lambda\\,\\vec{v}|=|\\lambda|\\,|\\vec{v}|$$</div>
    <div class="mod-two-col">
      <div class="mod-card"><h4>λ > 0</h4><p>Mesmo sentido, módulo multiplicado por λ.</p></div>
      <div class="mod-card"><h4>λ < 0</h4><p>Sentido oposto (vetor oposto), módulo multiplicado por |λ|.</p></div>
    </div>
  </div>`;
}

function s8Draw() {
  const c=document.getElementById('s8c'); if(!c) return;
  if(!c.width){c.width=c.offsetWidth;c.height=260;}
  const W=c.width, H=c.height, ctx=c.getContext('2d'), sc=44;
  const lam=+document.getElementById('s8-lam').value;
  const vx=+document.getElementById('s8-vx').value;
  const vy=+document.getElementById('s8-vy').value;
  document.getElementById('s8-lamv').textContent=lam;
  document.getElementById('s8-vxv').textContent=vx;
  document.getElementById('s8-vyv').textContent=vy;
  const res=document.getElementById('s8-res');
  if(res) res.textContent='λv⃗=('+((lam*vx).toFixed(1))+','+(( lam*vy).toFixed(1))+')';

  ctx.clearRect(0,0,W,H); _grid(ctx,W,H,sc,W/2,H/2);
  const ox=W/2, oy=H/2;
  // original
  _arrow(ctx,ox,oy,ox+vx*sc,oy-vy*sc,'rgba(124,106,247,.45)',1.8);
  _txt(ctx,'v⃗',ox+vx*sc/2-12,oy-vy*sc/2-6,'rgba(167,139,250,.7)',11);
  // scaled
  const col=lam<0?'#f87171':'#f97316';
  _arrow(ctx,ox,oy,ox+lam*vx*sc,oy-lam*vy*sc,col,2.8);
  _txt(ctx,'λv⃗',ox+lam*vx*sc/2+4,oy-lam*vy*sc/2-8,col,12);
  _dot(ctx,ox,oy,'#7c6af7',5);
}

function _i8() {
  const c=document.getElementById('s8c'); if(!c) return;
  c.width=c.offsetWidth; c.height=260;
  s8Draw();
}

// ─── SECTION 9: Interpretação Geométrica ─────────────────────
function _s9() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Interpretação Geométrica</h2>
    <p class="mod-section-sub">Combine as operações visualmente. Ative ou desative cada camada para ver como a soma, subtração e escalonamento se relacionam geometricamente.</p>
    <div class="mod-canvas-wrap">
      <canvas id="s9c" style="width:100%;height:280px"></canvas>
      <div class="mod-canvas-controls">
        <div class="mod-toggle-group" style="margin:0">
          <button class="mod-toggle-btn on" id="s9-ta" onclick="s9Toggle('a')">A⃗</button>
          <button class="mod-toggle-btn on" id="s9-tb" onclick="s9Toggle('b')">B⃗</button>
          <button class="mod-toggle-btn on" id="s9-ts" onclick="s9Toggle('s')">A+B</button>
          <button class="mod-toggle-btn on" id="s9-td" onclick="s9Toggle('d')">A−B</button>
          <button class="mod-toggle-btn on" id="s9-tn" onclick="s9Toggle('n')">−A</button>
        </div>
      </div>
    </div>
    <div class="mod-card">
      <h4>Conexão com álgebra linear</h4>
      <p>Vetores e suas operações formam um <strong>espaço vetorial</strong>: um conjunto com operações de adição e multiplicação por escalar que satisfazem os 8 axiomas fundamentais.</p>
    </div>
  </div>`;
}

const _s9show = {a:true,b:true,s:true,d:true,n:true};
function s9Toggle(k) {
  _s9show[k]=!_s9show[k];
  document.getElementById('s9-t'+k).classList.toggle('on',_s9show[k]);
  s9Draw();
}

function s9Draw() {
  const c=document.getElementById('s9c'); if(!c) return;
  if(!c.width){c.width=c.offsetWidth;c.height=280;}
  const W=c.width, H=c.height, ctx=c.getContext('2d'), sc=36;
  ctx.clearRect(0,0,W,H); _grid(ctx,W,H,sc,W/2,H/2);
  const ox=W/2, oy=H/2;
  const ax=2,ay=1, bx=1,by=2;
  if(_s9show.a) { _arrow(ctx,ox,oy,ox+ax*sc,oy-ay*sc,'#7c6af7',2.5); _txt(ctx,'A⃗',ox+ax*sc/2-16,oy-ay*sc/2-6,'#a78bfa',12); }
  if(_s9show.b) { _arrow(ctx,ox,oy,ox+bx*sc,oy-by*sc,'#2dd4a0',2.5); _txt(ctx,'B⃗',ox+bx*sc/2+4,oy-by*sc/2+10,'#2dd4a0',12); }
  if(_s9show.s) { _arrow(ctx,ox,oy,ox+(ax+bx)*sc,oy-(ay+by)*sc,'#f97316',2.5); _txt(ctx,'A+B',ox+(ax+bx)*sc/2+4,oy-(ay+by)*sc/2-6,'#f97316',12); }
  if(_s9show.d) { _arrow(ctx,ox,oy,ox+(ax-bx)*sc,oy-(ay-by)*sc,'#f472b6',2.5); _txt(ctx,'A−B',ox+(ax-bx)*sc/2+4,oy-(ay-by)*sc/2-6,'#f472b6',12); }
  if(_s9show.n) { _arrow(ctx,ox,oy,ox-ax*sc,oy+ay*sc,'#60a5fa',2.5); _txt(ctx,'−A',ox-ax*sc/2-16,oy+ay*sc/2+12,'#60a5fa',12); }
  _dot(ctx,ox,oy,'#8892b0',5);
}

function _i9() {
  const c=document.getElementById('s9c'); if(!c) return;
  c.width=c.offsetWidth; c.height=280;
  _s9show.a=_s9show.b=_s9show.s=_s9show.d=_s9show.n=true;
  ['a','b','s','d','n'].forEach(k=>document.getElementById('s9-t'+k).classList.add('on'));
  s9Draw();
}

// ─── SECTION 10: Propriedades ─────────────────────────────────
function _s10() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Propriedades dos Vetores</h2>
    <p class="mod-section-sub">Os vetores satisfazem um conjunto de propriedades algébricas que formam a base do espaço vetorial.</p>
    <div class="mod-accordion" id="s10-acc">
      <div class="mod-acc-item open">
        <div class="mod-acc-header" onclick="accToggle(this)">
          Propriedades da Adição
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="mod-acc-body">
          <div class="mod-formula-box" style="font-size:12px;text-align:left;line-height:2.4">
            $$\\vec{A}+\\vec{B}=\\vec{B}+\\vec{A}$$
            $$(\\vec{A}+\\vec{B})+\\vec{C}=\\vec{A}+(\\vec{B}+\\vec{C})$$
            $$\\vec{A}+\\vec{0}=\\vec{A}$$
            $$\\vec{A}+(-\\vec{A})=\\vec{0}$$
          </div>
        </div>
      </div>
      <div class="mod-acc-item">
        <div class="mod-acc-header" onclick="accToggle(this)">
          Propriedades do Produto por Escalar
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="mod-acc-body">
          <div class="mod-formula-box" style="font-size:12px;text-align:left;line-height:2.4">
            $$(\\lambda+\\mu)\\,\\vec{v}=\\lambda\\,\\vec{v}+\\mu\\,\\vec{v}$$
            $$\\lambda\\,(\\vec{A}+\\vec{B})=\\lambda\\,\\vec{A}+\\lambda\\,\\vec{B}$$
            $$\\lambda\\,(\\mu\\,\\vec{v})=(\\lambda\\mu)\\,\\vec{v}$$
            $$1\\,\\vec{v}=\\vec{v}$$
          </div>
        </div>
      </div>
      <div class="mod-acc-item">
        <div class="mod-acc-header" onclick="accToggle(this)">
          Vetores Paralelos
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="mod-acc-body">
          <p style="font-size:12px;color:var(--text2);margin-bottom:8px;line-height:1.7">Dois vetores $\\vec{A}$ e $\\vec{B}$ são <strong>paralelos</strong> (colineares) se um é múltiplo escalar do outro:</p>
          <div class="mod-formula-box">$$\\vec{A}\\parallel\\vec{B}\\iff\\vec{A}=\\lambda\\,\\vec{B}\\text{ para algum }\\lambda\\in\\mathbb{R}$$</div>
          <p style="font-size:12px;color:var(--text2);margin-top:8px;line-height:1.7">Equivalentemente: <span class="mod-hl">$\\vec{A}\\times\\vec{B}=\\vec{0}$</span> (produto vetorial nulo).</p>
        </div>
      </div>
    </div>
    <div class="mod-canvas-wrap">
      <canvas id="s10c" style="width:100%;height:200px"></canvas>
    </div>
  </div>`;
}

function accToggle(h) {
  h.parentElement.classList.toggle('open');
}

function _i10() {
  const c=document.getElementById('s10c'); if(!c) return;
  c.width=c.offsetWidth; c.height=200;
  const W=c.width, H=c.height, ctx=c.getContext('2d');
  _grid(ctx,W,H,40,W*0.12,H/2);
  const sc=40, ox1=W*0.12, oy=H/2, ox2=W*0.58;
  // Commutativity: A+B
  _arrow(ctx,ox1,oy,ox1+3*sc,oy-sc,'#7c6af7',2.5);
  _arrow(ctx,ox1+3*sc,oy-sc,ox1+4*sc,oy-3*sc,'#2dd4a0',2.5);
  _arrow(ctx,ox1,oy,ox1+4*sc,oy-3*sc,'#f97316',2.2);
  // B+A
  _arrow(ctx,ox2,oy,ox2+sc,oy-2*sc,'#2dd4a0',2.5);
  _arrow(ctx,ox2+sc,oy-2*sc,ox2+4*sc,oy-3*sc,'#7c6af7',2.5);
  ctx.strokeStyle='rgba(249,115,22,.5)'; ctx.lineWidth=1.5; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(ox2,oy); ctx.lineTo(ox2+4*sc,oy-3*sc); ctx.stroke();
  ctx.setLineDash([]);
  _txt(ctx,'A⃗+B⃗ = B⃗+A⃗',W/2-36,H-12,'#8892b0',11);
  _txt(ctx,'A⃗+B⃗',ox1+sc,oy-2*sc-8,'#f97316',11);
  _txt(ctx,'B⃗+A⃗',ox2+2*sc,oy-2*sc-8,'#f97316',11);
}

// ─── SECTION 11: Exemplos Resolvidos ──────────────────────────
function _s11() {
  const examples = [
    {
      title:'Dados $A=(1,2,3)$ e $B=(4,-1,2)$, calcule $A+B$ e $A\\cdot B$',
      steps:[
        '<strong>Soma:</strong> $A+B=(1+4,\\;2+(-1),\\;3+2)=$ <span class="mod-hl">$(5,1,5)$</span>',
        '<strong>Produto escalar:</strong> $A\\cdot B=1\\cdot4+2\\cdot(-1)+3\\cdot2=4-2+6=$ <span class="mod-hl">$8$</span>',
        '<strong>Interpretação:</strong> como $A\\cdot B>0$, o ângulo entre os vetores é agudo ($<90°$).',
      ]
    },
    {
      title:'Calcule o módulo e vetor unitário de $\\vec{v}=(3,4,0)$',
      steps:[
        '<strong>Módulo:</strong> $|\\vec{v}|=\\sqrt{3^2+4^2+0^2}=\\sqrt{25}=$ <span class="mod-hl">$5$</span>',
        '<strong>Vetor unitário:</strong> $\\hat{v}=\\vec{v}/|\\vec{v}|=(3/5,\\;4/5,\\;0)=$ <span class="mod-hl">$(0.6,0.8,0)$</span>',
        '<strong>Verificação:</strong> $|\\hat{v}|=\\sqrt{0.36+0.64}=1$ ✓',
      ]
    },
    {
      title:'Determine se $A=(2,4,-2)$ e $B=(1,2,-1)$ são paralelos',
      steps:[
        'Verificamos se existe $\\lambda$ tal que $A=\\lambda\\cdot B$.',
        'De $A=\\lambda\\cdot B$: $(2,4,-2)=\\lambda\\cdot(1,2,-1)$ → $\\lambda=2$ em todas as componentes.',
        '<strong>Conclusão:</strong> <span class="mod-hl">$A=2B$</span>, portanto os vetores são paralelos $\\parallel$.',
      ]
    },
  ];

  return `<div class="mod-section">
    <h2 class="mod-section-title">Exemplos Resolvidos</h2>
    <p class="mod-section-sub">Clique em cada exemplo para ver a resolução passo a passo.</p>
    <div class="mod-accordion">
      ${examples.map((ex,i)=>`
      <div class="mod-acc-item">
        <div class="mod-acc-header" onclick="accToggle(this)">
          <span>${i+1}. ${ex.title}</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="mod-acc-body">
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
            ${ex.steps.map((s,j)=>`
            <div class="mod-step">
              <div class="mod-step-n">${j+1}</div>
              <p>${s}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function _i11() {}

// ─── SECTION 12: Erros Comuns ─────────────────────────────────
function _s12() {
  const cards = [
    {err:'Somar módulos',cor:'Somar componentes',fix:'$|A+B|\\neq|A|+|B|$ (exceto paralelos). Some coordenada a coordenada: $(a+b,\\;c+d,\\;e+f)$'},
    {err:'Confundir vetor com ponto',cor:'Vetor ≠ Ponto',fix:'Um ponto indica posição; um vetor indica deslocamento. O vetor $AB$ aponta de $A$ para $B$.'},
    {err:'Esquecer o módulo ao unitarizar',cor:'Dividir pelo módulo',fix:'$\\hat{v}=v/|v|$, não $\\hat{v}=v/v$. $|v|$ é um número escalar (comprimento).'},
    {err:'Inverter a subtração',cor:'A−B = B→A',fix:'$A-B$ aponta de $B$ até $A$. Se $A=(3,1)$ e $B=(1,3)$, então $A-B=(2,-2)$, apontando de $B$ para $A$.'},
    {err:'λ negativo não inverte',cor:'λ<0 inverte sentido',fix:'Se $\\lambda<0$, o vetor $\\lambda\\vec{v}$ aponta na direção oposta de $\\vec{v}$, além de escalar o módulo por $|\\lambda|$.'},
    {err:'Produto escalar é vetor',cor:'Produto escalar = número',fix:'$A\\cdot B=A_x B_x+A_y B_y+A_z B_z$. O resultado é um número real (escalar), não um vetor.'},
  ];

  return `<div class="mod-section">
    <h2 class="mod-section-title">Erros Comuns</h2>
    <p class="mod-section-sub">Clique em cada cartão para ver a correção.</p>
    <div class="flip-grid">
      ${cards.map((c,i)=>`
      <div class="flip-card" onclick="this.classList.toggle('flipped')">
        <div class="flip-inner">
          <div class="flip-front">
            <span class="flip-label err">✗ Erro</span>
            <h4>${c.err}</h4>
            <span class="flip-hint" style="font-size:10px;color:var(--text3);margin-top:auto">Clique para ver a correção</span>
          </div>
          <div class="flip-back">
            <span class="flip-label fix">✓ Correto</span>
            <h4>${c.cor}</h4>
            <p>${c.fix}</p>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function _i12() {}

// ─── SECTION 13: Exercícios ───────────────────────────────────
function _s13() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Exercícios</h2>
    <p class="mod-section-sub">Resolva os exercícios e clique em <strong>Verificar</strong>. Os valores com vírgula use ponto (ex: 3.74).</p>

    <div class="mod-exercise">
      <div class="mod-ex-num">Exercício 1 — Módulo</div>
      <h4>Calcule o módulo do vetor $\vec{v}=(3,4,0)$</h4>
      <div class="mod-ex-problem">$\vec{v}=(3,4,0)$ &nbsp;→&nbsp; $|\vec{v}|=\sqrt{3^2+4^2+0^2}=?$</div>
      <div class="mod-ex-row">
        <span style="font-size:12px;color:var(--text2)">$|\vec{v}|=$</span>
        <input class="mod-ex-input" id="e1-ans" type="number" step="0.01" placeholder="?">
        <button class="mod-ex-btn" onclick="checkEx('e1-ans',5,'e1-fb',0.01)">Verificar</button>
      </div>
      <div class="mod-ex-fb" id="e1-fb"></div>
    </div>

    <div class="mod-exercise">
      <div class="mod-ex-num">Exercício 2 — Soma</div>
      <h4>Dados $\vec{A}=(2,-1,3)$ e $\vec{B}=(-1,4,2)$, calcule a componente z de $\vec{A}+\vec{B}$</h4>
      <div class="mod-ex-problem">$\vec{A}+\vec{B}=(2+(-1),\;-1+4,\;3+2)=(?,?,?)$</div>
      <div class="mod-ex-row">
        <span style="font-size:12px;color:var(--text2)">z =</span>
        <input class="mod-ex-input" id="e2-ans" type="number" placeholder="?">
        <button class="mod-ex-btn" onclick="checkEx('e2-ans',5,'e2-fb',0)">Verificar</button>
      </div>
      <div class="mod-ex-fb" id="e2-fb"></div>
    </div>

    <div class="mod-exercise">
      <div class="mod-ex-num">Exercício 3 — Produto Escalar</div>
      <h4>Calcule $\vec{A}\cdot\vec{B}$ com $\vec{A}=(1,2,3)$ e $\vec{B}=(4,-1,2)$</h4>
      <div class="mod-ex-problem">$A\cdot B=1\cdot4+2\cdot(-1)+3\cdot2=?$</div>
      <div class="mod-ex-row">
        <span style="font-size:12px;color:var(--text2)">$A\cdot B=$</span>
        <input class="mod-ex-input" id="e3-ans" type="number" placeholder="?">
        <button class="mod-ex-btn" onclick="checkEx('e3-ans',8,'e3-fb',0)">Verificar</button>
      </div>
      <div class="mod-ex-fb" id="e3-fb"></div>
    </div>

    <div class="mod-exercise">
      <div class="mod-ex-num">Exercício 4 — Escalar</div>
      <h4>Dado $\vec{v}=(2,-3,1)$, calcule o módulo de $2\,\vec{v}$</h4>
      <div class="mod-ex-problem">$2\vec{v}=(4,-6,2)$ &nbsp;→&nbsp; $|2\vec{v}|=2\cdot|\vec{v}|=2\sqrt{14}=?$</div>
      <div class="mod-ex-row">
        <span style="font-size:12px;color:var(--text2)">$|2\vec{v}|=$</span>
        <input class="mod-ex-input" id="e4-ans" type="number" step="0.01" placeholder="?">
        <button class="mod-ex-btn" onclick="checkEx('e4-ans',2*Math.sqrt(14),'e4-fb',0.05)">Verificar</button>
      </div>
      <div class="mod-ex-fb" id="e4-fb"></div>
    </div>

    <div class="mod-exercise">
      <div class="mod-ex-num">Exercício 5 — Vetor Unitário</div>
      <h4>Para $\vec{v}=(0,3,4)$, qual a componente y do vetor unitário $\hat{v}$?</h4>
      <div class="mod-ex-problem">$|\vec{v}|=\sqrt{0+9+16}=5$ &nbsp;→&nbsp; $\hat{v}=(0,\;3/5,\;4/5)$ &nbsp;→&nbsp; $y=?$</div>
      <div class="mod-ex-row">
        <span style="font-size:12px;color:var(--text2)">$\hat{v}_y=$</span>
        <input class="mod-ex-input" id="e5-ans" type="number" step="0.01" placeholder="?">
        <button class="mod-ex-btn" onclick="checkEx('e5-ans',0.6,'e5-fb',0.01)">Verificar</button>
      </div>
      <div class="mod-ex-fb" id="e5-fb"></div>
    </div>
  </div>`;
}

function checkEx(inputId, correct, fbId, tol) {
  const inp = document.getElementById(inputId);
  const fb  = document.getElementById(fbId);
  if (!inp || !fb) return;
  const val = parseFloat(inp.value);
  if (isNaN(val)) { fb.className='mod-ex-fb no'; fb.textContent='Digite um número.'; return; }
  if (Math.abs(val - correct) <= (tol || 0.01)) {
    fb.className='mod-ex-fb ok';
    fb.textContent='✓ Correto! Resposta: ' + (Math.round(correct*1000)/1000);
    _confetti();
  } else {
    fb.className='mod-ex-fb no';
    fb.textContent='✗ Tente novamente. Dica: verifique os cálculos.';
  }
}

function _confetti() {
  const colors=['#7c6af7','#2dd4a0','#f97316','#f472b6','#4a9eff','#fbbf24'];
  for (let i=0; i<18; i++) {
    const el=document.createElement('div');
    el.className='cf-piece';
    el.style.cssText=`left:${Math.random()*100}vw;top:${10+Math.random()*40}vh;background:${colors[i%colors.length]};animation-delay:${Math.random()*0.3}s;animation-duration:${0.9+Math.random()*0.6}s`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 1600);
  }
}

function _i13() {}

// ─── SECTION 14: Resumo Final ─────────────────────────────────
function _s14() {
  return `<div class="mod-section">
    <h2 class="mod-section-title">Resumo Final</h2>
    <p class="mod-section-sub">Você concluiu o módulo Vetores no R³! Aqui está o guia de referência rápida com tudo o que aprendeu.</p>
    <div class="mod-cheat">
      <div class="mod-cheat-card">
        <h5>Definição</h5>
        <div class="mod-formula-box">$$\\vec{v}=B-A=(x_2-x_1,\\;y_2-y_1,\\;z_2-z_1)$$</div>
      </div>
      <div class="mod-cheat-card">
        <h5>Módulo</h5>
        <div class="mod-formula-box">$$|\\vec{v}|=\\sqrt{x^2+y^2+z^2}$$</div>
      </div>
      <div class="mod-cheat-card">
        <h5>Vetor Unitário</h5>
        <div class="mod-formula-box">$$\\hat{v}=\\dfrac{\\vec{v}}{|\\vec{v}|}$$</div>
      </div>
      <div class="mod-cheat-card">
        <h5>Soma e Subtração</h5>
        <div class="mod-formula-box">$$\\vec{A}\\pm\\vec{B}=(A_x\\pm B_x,\\;A_y\\pm B_y,\\;A_z\\pm B_z)$$</div>
      </div>
      <div class="mod-cheat-card">
        <h5>Produto por Escalar</h5>
        <div class="mod-formula-box">$$\\lambda\\,\\vec{v}=(\\lambda x,\\;\\lambda y,\\;\\lambda z)$$</div>
      </div>
      <div class="mod-cheat-card">
        <h5>Vetores Paralelos</h5>
        <div class="mod-formula-box">$$\\vec{A}\\parallel\\vec{B}\\iff\\vec{A}=\\lambda\\,\\vec{B}$$</div>
      </div>
      <div class="mod-cheat-card">
        <h5>Base Canônica R³</h5>
        <div class="mod-formula-box">$$\\vec{v}=x\\,\\hat{\\imath}+y\\,\\hat{\\jmath}+z\\,\\hat{k}$$</div>
      </div>
      <div class="mod-cheat-card">
        <h5>Produto Escalar</h5>
        <div class="mod-formula-box">$$\\vec{A}\\cdot\\vec{B}=A_x B_x+A_y B_y+A_z B_z$$</div>
      </div>
    </div>
    <div class="mod-info-row" style="background:rgba(124,106,247,.08);border-color:rgba(124,106,247,.3)">
      <span class="mod-info-icon">🎉</span>
      <div>
        <strong style="color:var(--accent)">Módulo concluído!</strong>
        <span style="display:block;font-size:12px;margin-top:2px">Continue para os próximos módulos: Produtos de Vetores, Ângulos e Projeções...</span>
      </div>
    </div>
    <div class="mod-canvas-wrap">
      <canvas id="s14c" style="width:100%;height:200px"></canvas>
    </div>
  </div>`;
}

function _i14() {
  const c=document.getElementById('s14c'); if(!c) return;
  c.width=c.offsetWidth; c.height=200;
  const W=c.width, H=c.height, ctx=c.getContext('2d');
  // celebratory summary canvas
  ctx.fillStyle='var(--bg)';
  const sc=28, ox=W/2, oy=H/2+20;
  _grid(ctx,W,H,sc,ox,oy);
  const vecs=[
    {x:3,y:1,c:'#7c6af7',l:'A⃗'},
    {x:1,y:3,c:'#2dd4a0',l:'B⃗'},
    {x:4,y:4,c:'#f97316',l:'A+B'},
    {x:2,y:-2,c:'#f472b6',l:'A−B'},
    {x:-3,y:-1,c:'#60a5fa',l:'−A'},
  ];
  vecs.forEach(v=>{
    _arrow(ctx,ox,oy,ox+v.x*sc,oy-v.y*sc,v.c,2.2);
    _txt(ctx,v.l,ox+v.x*sc+(v.x>0?4:-22),oy-v.y*sc+(v.y>0?-4:14),v.c,11);
  });
  _dot(ctx,ox,oy,'#8892b0',5);
  _txt(ctx,'Vetores no R² — visão geral',10,H-8,'#4a5578',11);
}
