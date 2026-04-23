/* FREE VISUALIZER */
let freeVectors=[{x:2,y:1,z:3,color:'#7c6af7',name:'v₁'},{x:-1,y:3,z:1,color:'#2dd4a0',name:'v₂'}];
function renderFreeList(){
  $('viz-vectors-list').innerHTML=freeVectors.map((v,i)=>`
    <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-size:11px;font-weight:700;color:${v.color};font-family:var(--mono)">${v.name}</span>
        <button onclick="removeFreeVector(${i})" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px">×</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px">
        <div><div style="font-size:9px;color:var(--text3);text-align:center;font-family:var(--mono)">x</div><input type="number" value="${v.x}" step="any" onchange="updateFreeVector(${i},'x',this.value)" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:5px 4px;color:var(--text);font-family:var(--mono);font-size:13px;text-align:center;outline:none"></div>
        <div><div style="font-size:9px;color:var(--text3);text-align:center;font-family:var(--mono)">y</div><input type="number" value="${v.y}" step="any" onchange="updateFreeVector(${i},'y',this.value)" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:5px 4px;color:var(--text);font-family:var(--mono);font-size:13px;text-align:center;outline:none"></div>
        <div><div style="font-size:9px;color:var(--text3);text-align:center;font-family:var(--mono)">z</div><input type="number" value="${v.z}" step="any" onchange="updateFreeVector(${i},'z',this.value)" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:5px 4px;color:var(--text);font-family:var(--mono);font-size:13px;text-align:center;outline:none"></div>
      </div>
    </div>
  `).join('');
}
function addVizVector(){
  const colors=['#f97316','#f472b6','#fbbf24','#60a5fa','#a78bfa'];
  freeVectors.push({x:1,y:1,z:1,color:colors[freeVectors.length%colors.length],name:`v${freeVectors.length+1}`});
  renderFreeList(); updateFreeScene();
}
function removeFreeVector(i){freeVectors.splice(i,1);renderFreeList();updateFreeScene()}
function updateFreeVector(i,k,val){freeVectors[i][k]=parseFloat(val)||0;updateFreeScene()}
function updateFreeScene(){
  if(!freeVW)return;
  const vecs=freeVectors.map(v=>({from:[0,0,0],to:[v.x,v.y,v.z],color:parseInt(v.color.replace('#',''),16),label:v.name}));
  renderScene(freeVW,vecs);
  $('viz-legend').innerHTML=freeVectors.map(v=>`<div class="leg-item"><div class="leg-dot" style="background:${v.color}"></div>${v.name} = (${v.x},${v.y},${v.z})</div>`).join('');
}
function initFreeViewer(){freeVW=initViewer('viz-canvas-host');renderFreeList();updateFreeScene()}
function initCalcViewer(){calcVW=initViewer('calc-canvas-host')}
