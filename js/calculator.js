/* ===================== MATH ===================== */
const $=id=>document.getElementById(id);
const vv=id=>parseFloat($(id)?.value)||0;
const ff=n=>{const r=Math.round(n*1e9)/1e9;return r===0?0:r}
const deg=r=>ff(r*180/Math.PI);
const nm=(x,y,z)=>Math.sqrt(x*x+y*y+z*z);

/* show toast */
function toast(msg){$('toast-msg').textContent=msg;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2200)}

/* op select visibility */
$('cop-select').addEventListener('change', function(){
  $('cw-section').style.display = this.value==='misto'?'block':'none';
});

/* ===================== CALCULATION ENGINE ===================== */
function getInputs(prefix='') {
  const ax=vv((prefix||'a')+'-x'), ay=vv((prefix||'a')+'-y'), az=vv((prefix||'a')+'-z');
  const bx=vv((prefix||'b')+'-x'), by=vv((prefix||'b')+'-y'), bz=vv((prefix||'b')+'-z');
  const op = $(prefix?'cop-select':'op-select').value;
  let wx=0,wy=0,wz=0;
  if(op==='misto'){wx=vv((prefix?'cw':'w')+'-x');wy=vv((prefix?'cw':'w')+'-y');wz=vv((prefix?'cw':'w')+'-z')}
  return {ax,ay,az,bx,by,bz,wx,wy,wz,op};
}

function computeResult(inp) {
  const {ax,ay,az,bx,by,bz,wx,wy,wz,op}=inp;
  const ma=nm(ax,ay,az), mb=nm(bx,by,bz);
  let mainLabel='', mainVal='', rows=[], steps=[], vectors=[];

  // always show A and B
  vectors.push({from:[0,0,0],to:[ax,ay,az],color:0x7c6af7,label:'A'});
  vectors.push({from:[0,0,0],to:[bx,by,bz],color:0x2dd4a0,label:'B'});

  if(op==='soma'){
    const rx=ax+bx,ry=ay+by,rz=az+bz;
    mainLabel='A + B ='; mainVal=`(${ff(rx)}, ${ff(ry)}, ${ff(rz)})`;
    rows=[
      {k:'|A|',v:`√${ff(ma*ma)} ≈ ${ff(ma)}`,c:''},
      {k:'|B|',v:`√${ff(mb*mb)} ≈ ${ff(mb)}`,c:''},
      {k:'|A + B|',v:`√${ff(nm(rx,ry,rz)**2)} ≈ ${ff(nm(rx,ry,rz))}`,c:''},
      {k:'A · B',v:`${ff(ax*bx+ay*by+az*bz)}`,c:'accent'},
    ];
    steps=[
      {n:'1',t:'Componentes correspondentes',h:`(${ax}+${bx}, ${ay}+${by}, ${az}+${bz})`},
      {n:'2',t:'Soma componente a componente',h:`(${ff(rx)}, ${ff(ry)}, ${ff(rz)})`},
      {n:'3',t:'Vetor resultante',h:`A + B = (${ff(rx)}, ${ff(ry)}, ${ff(rz)})`},
    ];
    vectors.push({from:[0,0,0],to:[rx,ry,rz],color:0x4a9eff,label:'A+B'});
    vectors.push({from:[ax,ay,az],to:[rx,ry,rz],color:0x2dd4a0,label:'',dashed:true});
    vectors.push({from:[bx,by,bz],to:[rx,ry,rz],color:0x7c6af7,label:'',dashed:true});
  } else if(op==='sub'){
    const rx=ax-bx,ry=ay-by,rz=az-bz;
    mainLabel='A − B ='; mainVal=`(${ff(rx)}, ${ff(ry)}, ${ff(rz)})`;
    rows=[{k:'|A−B|',v:ff(nm(rx,ry,rz)),c:'blue'},{k:'|A|',v:ff(ma),c:''},{k:'|B|',v:ff(mb),c:''}];
    steps=[{n:'1',t:'Subtração componente a componente',h:`(${ax}-${bx}, ${ay}-${by}, ${az}-${bz})`},{n:'2',t:'Resultado',h:`(${ff(rx)}, ${ff(ry)}, ${ff(rz)})`}];
    vectors.push({from:[0,0,0],to:[rx,ry,rz],color:0xf97316,label:'A−B'});
  } else if(op==='escalar'){
    const dot=ax*bx+ay*by+az*bz;
    const cosT=ma>0&&mb>0?dot/(ma*mb):0;
    const theta=Math.acos(Math.max(-1,Math.min(1,cosT)));
    mainLabel='A · B ='; mainVal=`${ff(dot)}`;
    rows=[{k:'|A|',v:ff(ma),c:''},{k:'|B|',v:ff(mb),c:''},{k:'cosθ',v:ff(cosT),c:'accent'},{k:'θ',v:deg(theta)+'°',c:'green'},{k:'Relação',v:Math.abs(dot)<1e-9?'⊥ Perp.':theta<Math.PI/2?'Agudo':'Obtuso',c:''}];
    steps=[{n:'1',t:'Produto escalar',h:`${ax}·${bx} + ${ay}·${by} + ${az}·${bz} = ${ff(dot)}`},{n:'2',t:'Ângulo',h:`cosθ = ${ff(dot)}/(${ff(ma)}·${ff(mb)}) = ${ff(cosT)}`},{n:'3',t:'θ',h:`θ = arccos(${ff(cosT)}) ≈ ${deg(theta)}°`}];
    // angle arc
    vectors.push({type:'arc',v1:[ax,ay,az],v2:[bx,by,bz],color:0xffcc00});
  } else if(op==='vetorial'){
    const rx=ay*bz-az*by, ry=-(ax*bz-az*bx), rz=ax*by-ay*bx;
    const area=nm(rx,ry,rz);
    mainLabel='A × B ='; mainVal=`(${ff(rx)}, ${ff(ry)}, ${ff(rz)})`;
    rows=[{k:'|A×B|',v:ff(area),c:'blue'},{k:'Área paralel.',v:ff(area),c:'accent'},{k:'Área triâng.',v:ff(area/2),c:'green'}];
    steps=[{n:'1',t:'Sarrus: î componente',h:`î(${ay}·${bz} − ${az}·${by}) = î(${ff(rx)})`},{n:'2',t:'Sarrus: ĵ componente',h:`−ĵ(${ax}·${bz} − ${az}·${bx}) = ĵ(${ff(ry)})`},{n:'3',t:'Sarrus: k̂ componente',h:`k̂(${ax}·${by} − ${ay}·${bx}) = k̂(${ff(rz)})`},{n:'4',t:'Resultado',h:`A×B = (${ff(rx)}, ${ff(ry)}, ${ff(rz)})`}];
    vectors.push({from:[0,0,0],to:[rx,ry,rz],color:0xffcc00,label:'A×B'});
    vectors.push({type:'para',u:[ax,ay,az],v:[bx,by,bz],color:0x4a9eff});
  } else if(op==='misto'){
    const rx=ay*bz-az*by, ry=-(ax*bz-az*bx), rz=ax*by-ay*bx;
    const misto=rx*wx+ry*wy+rz*wz, vol=Math.abs(misto);
    const cop=Math.abs(misto)<1e-9;
    mainLabel='[A,B,W] ='; mainVal=`${ff(misto)}`;
    rows=[{k:'Volume',v:ff(vol),c:'accent'},{k:'Coplanares?',v:cop?'Sim ✓':'Não',c:cop?'green':''}];
    steps=[{n:'1',t:'Produto vetorial A×B',h:`(${ff(rx)}, ${ff(ry)}, ${ff(rz)})`},{n:'2',t:'Produto escalar com W',h:`${ff(rx)}·${wx}+${ff(ry)}·${wy}+${ff(rz)}·${wz}=${ff(misto)}`},{n:'3',t:'Volume',h:`|${ff(misto)}| = ${ff(vol)}`}];
    vectors.push({from:[0,0,0],to:[wx,wy,wz],color:0xf97316,label:'W'});
    vectors.push({type:'box',u:[ax,ay,az],v:[bx,by,bz],w:[wx,wy,wz]});
  } else if(op==='projecao'){
    const mu2=bx*bx+by*by+bz*bz;
    if(mu2<1e-12){mainLabel='Erro';mainVal='B é nulo'}
    else{
      const dot=ax*bx+ay*by+az*bz, k=dot/mu2;
      const px=ff(k*bx),py=ff(k*by),pz=ff(k*bz);
      const qx=ff(ax-k*bx),qy=ff(ay-k*by),qz=ff(az-k*bz);
      mainLabel='proj_B A ='; mainVal=`(${px}, ${py}, ${pz})`;
      rows=[{k:'k = A·B/|B|²',v:ff(k),c:''},{k:'|proj|',v:ff(nm(px,py,pz)),c:'blue'},{k:'A⊥ = A−proj',v:`(${qx},${qy},${qz})`,c:'accent'}];
      steps=[{n:'1',t:'k = A·B/|B|²',h:`k = ${ff(dot)}/${ff(mu2)} = ${ff(k)}`},{n:'2',t:'Projeção A∥',h:`k·B = ${ff(k)}·(${bx},${by},${bz}) = (${px},${py},${pz})`},{n:'3',t:'Componente A⊥',h:`(${qx},${qy},${qz})`}];
      vectors.push({from:[0,0,0],to:[px,py,pz],color:0x2dd4a0,label:'proj'});
      vectors.push({from:[px,py,pz],to:[ax,ay,az],color:0xf97316,label:'A⊥'});
      vectors.push({type:'dash',from:[px,py,pz],to:[ax,ay,az]});
    }
  } else if(op==='modulo'){
    const ua=ax/ma, ub=ay/ma, uc=az/ma;
    mainLabel='|A| ='; mainVal=`${ff(ma)}`;
    rows=[{k:'|A|',v:ff(ma),c:'accent'},{k:'û',v:`(${ff(ua)},${ff(ub)},${ff(uc)})`,c:'green'},{k:'É unitário?',v:Math.abs(ma-1)<1e-9?'Sim ✓':'Não',c:''}];
    steps=[{n:'1',t:'Módulo',h:`|A|=√(${ax}²+${ay}²+${az}²)=√${ff(ma*ma)}≈${ff(ma)}`},{n:'2',t:'Vetor unitário',h:`û=(${ff(ua)},${ff(ub)},${ff(uc)})`}];
    vectors.push({from:[0,0,0],to:[ua,ub,uc],color:0xf97316,label:'û'});
  } else if(op==='angulo'){
    const dot=ax*bx+ay*by+az*bz;
    const cosT=ma>0&&mb>0?dot/(ma*mb):0;
    const theta=Math.acos(Math.max(-1,Math.min(1,cosT)));
    mainLabel='θ ≈'; mainVal=deg(theta)+'°';
    rows=[{k:'A · B',v:ff(dot),c:''},{k:'cosθ',v:ff(cosT),c:'accent'},{k:'Relação',v:Math.abs(dot)<1e-9?'⊥':deg(theta)>90?'Obtuso':'Agudo',c:''}];
    steps=[{n:'1',t:'Produto escalar',h:`A·B=${ff(dot)}`},{n:'2',t:'cosθ',h:`${ff(dot)}/(${ff(ma)}·${ff(mb)})=${ff(cosT)}`},{n:'3',t:'θ',h:`arccos(${ff(cosT)})≈${deg(theta)}°`}];
    vectors.push({type:'arc',v1:[ax,ay,az],v2:[bx,by,bz],color:0xffcc00});
  } else if(op==='angulos_dir'){
    const ua=ax/ma,ub=ay/ma,uc=az/ma;
    const a=Math.acos(Math.max(-1,Math.min(1,ua)));
    const b=Math.acos(Math.max(-1,Math.min(1,ub)));
    const g=Math.acos(Math.max(-1,Math.min(1,uc)));
    mainLabel='α, β, γ ='; mainVal=`${deg(a)}°, ${deg(b)}°, ${deg(g)}°`;
    rows=[{k:'α (eixo x)',v:deg(a)+'°',c:'accent'},{k:'β (eixo y)',v:deg(b)+'°',c:'green'},{k:'γ (eixo z)',v:deg(g)+'°',c:'blue'},{k:'cos²α+cos²β+cos²γ',v:ff(ua*ua+ub*ub+uc*uc),c:''}];
    steps=[{n:'1',t:'α=arccos(x/|A|)',h:`arccos(${ff(ua)})≈${deg(a)}°`},{n:'2',t:'β=arccos(y/|A|)',h:`arccos(${ff(ub)})≈${deg(b)}°`},{n:'3',t:'γ=arccos(z/|A|)',h:`arccos(${ff(uc)})≈${deg(g)}°`}];
    vectors.push({type:'projaxes',v:[ax,ay,az]});
  } else if(op==='ponto_medio'){
    const mx=(ax+bx)/2,my=(ay+by)/2,mz=(az+bz)/2;
    mainLabel='M ='; mainVal=`(${ff(mx)}, ${ff(my)}, ${ff(mz)})`;
    rows=[{k:'|AB|',v:ff(nm(bx-ax,by-ay,bz-az)),c:''},{k:'|AM|',v:ff(nm(mx-ax,my-ay,mz-az)),c:''}];
    steps=[{n:'1',t:'M=((x₁+x₂)/2,…)',h:`M=(${ff(mx)},${ff(my)},${ff(mz)})`}];
    vectors.push({type:'midpoint',a:[ax,ay,az],b:[bx,by,bz],m:[mx,my,mz]});
  }

  return {mainLabel,mainVal,rows,steps,vectors};
}

function renderResult(r) {
  $('res-main-label').textContent = r.mainLabel;
  $('res-main-val').textContent = r.mainVal;
  $('res-main-val').style.color = 'var(--accent)';
  $('res-main-val').style.fontSize = r.mainVal.length>18?'13px':'22px';
  $('result-rows').innerHTML = r.rows.map(row=>
    `<div class="result-row"><span class="result-row-key">${row.k}</span><span class="result-row-val ${row.c}">${row.v}</span></div>`
  ).join('');
  $('step-list').innerHTML = r.steps.map(s=>
    `<div class="step-item"><div class="step-num">${s.n}</div><div class="step-content">${s.t}<br><span class="step-highlight">${s.h}</span></div></div>`
  ).join('');
}

function calculate() {
  navigate('calc', document.querySelector('.nav-item:nth-child(2)'));
  setTimeout(calculateFull, 100);
}
function calculateFull() {
  if(!calcVW) { calcVW = initViewer('calc-canvas-host'); }
  const ax=vv('ca-x'),ay=vv('ca-y'),az=vv('ca-z');
  const bx=vv('cb-x'),by=vv('cb-y'),bz=vv('cb-z');
  const op=$('cop-select').value;
  let wx=0,wy=0,wz=0;
  if(op==='misto'){wx=vv('cw-x');wy=vv('cw-y');wz=vv('cw-z')}
  const r = computeResult({ax,ay,az,bx,by,bz,wx,wy,wz,op});
  // render result in calc-page panel
  $('c-res-label').textContent = r.mainLabel;
  $('c-res-val').textContent = r.mainVal;
  $('c-res-val').style.color = 'var(--accent)';
  $('c-res-val').style.fontSize = r.mainVal.length>18?'13px':'22px';
  $('c-res-rows').innerHTML = r.rows.map(row=>
    `<div class="result-row"><span class="result-row-key">${row.k}</span><span class="result-row-val ${row.c}">${row.v}</span></div>`
  ).join('');
  $('c-step-list').innerHTML = r.steps.map(s=>
    `<div class="step-item"><div class="step-num">${s.n}</div><div class="step-content">${s.t}<br><span class="step-highlight">${s.h}</span></div></div>`
  ).join('');
  renderScene(calcVW, r.vectors);
  toast('Calculado com sucesso!');
}
function resetCalc() { resetFull(); }
function resetFull() {
  ['ca-x','ca-y','ca-z','cb-x','cb-y','cb-z'].forEach(id=>{$(id).value='0'});
  $('cop-select').value='soma';
  $('cw-section').style.display='none';
  $('c-res-label').textContent='Aguardando cálculo...';
  $('c-res-val').textContent='—';
  $('c-res-val').style.color='var(--text2)';
  $('c-res-rows').innerHTML='';
  $('c-step-list').innerHTML='<div style="font-size:12px;color:var(--text3)">Configure os vetores e clique em Calcular.</div>';
  if(calcVW) renderScene(calcVW,[]);
}

/* LOAD EXERCISE */
function loadExercise(n) {
  const exData = [
    null,
    {ax:3,ay:4,az:0,bx:0,by:0,bz:0,op:'modulo'},
    {ax:1,ay:2,az:3,bx:4,by:-1,bz:2,op:'escalar'},
    {ax:2,ay:1,az:0,bx:0,by:3,bz:1,op:'vetorial'},
    {ax:2,ay:-1,az:1,bx:1,by:0,bz:-1,op:'misto',wx:2,wy:-1,wz:4},
    {ax:1,ay:-1,az:0,bx:0,by:0,bz:0,op:'angulos_dir'},
    {ax:2,ay:3,az:4,bx:3,by:-3,bz:0,op:'projecao'},
    {ax:2,ay:3,az:-4,bx:1,by:-2,bz:3,op:'soma'},
    {ax:3,ay:1,az:-1,bx:-2,by:1,bz:3,op:'angulo'},
  ][n];
  if(!exData) return;
  $('ca-x').value=exData.ax; $('ca-y').value=exData.ay; $('ca-z').value=exData.az;
  $('cb-x').value=exData.bx; $('cb-y').value=exData.by; $('cb-z').value=exData.bz;
  $('cop-select').value=exData.op;
  if(exData.op==='misto'&&exData.wx!==undefined){$('cw-x').value=exData.wx;$('cw-y').value=exData.wy;$('cw-z').value=exData.wz;$('cw-section').style.display='block'}
  navigate('calc', document.querySelector('.nav-item:nth-child(2)'));
  setTimeout(calculateFull,100);
}
