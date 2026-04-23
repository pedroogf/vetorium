/* ===================== 3D ENGINE ===================== */
let mainVW=null, calcVW=null, freeVW=null;
const V3=(...a)=>new THREE.Vector3(...a);
const sv3=(x,y,z)=>V3(y,z,x);
const sa3=([x,y,z])=>V3(y,z,x);
const sp3=([x,y,z])=>[y,z,x];

function initViewer(hostId) {
  const host=$(hostId);
  const W=host.clientWidth||600, H=host.clientHeight||400;
  const scene=new THREE.Scene(); scene.background=new THREE.Color(0x0a0d14);
  const camera=new THREE.PerspectiveCamera(45,W/H,.01,1000);
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(W,H);
  host.insertBefore(renderer.domElement,host.firstChild);
  scene.add(new THREE.AmbientLight(0xffffff,.9));
  const dl=new THREE.DirectionalLight(0xffffff,.5); dl.position.set(5,10,5); scene.add(dl);

  // axes
  const axG=new THREE.Group();
  [[0,0,5,'x','#ef4444'],[5,0,0,'y','#22c55e'],[0,5,0,'z','#3b82f6']].forEach(([x,y,z,n,c])=>{
    const cl=parseInt(c.replace('#',''),16);
    axG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([V3(0,0,0),V3(x,y,z)]),new THREE.LineBasicMaterial({color:cl})));
    axG.add(makeSpriteLabel(n,V3(x*1.12,y*1.12,z*1.12),c));
  });
  scene.add(axG);

  // grid
  const gVerts=[]; for(let i=-6;i<=6;i++){gVerts.push(i,0,-6,i,0,6,-6,0,i,6,0,i)}
  const gg=new THREE.BufferGeometry(); gg.setAttribute('position',new THREE.Float32BufferAttribute(gVerts,3));
  const gridG=new THREE.LineSegments(gg,new THREE.LineBasicMaterial({color:0x1e2a45,opacity:.8,transparent:true}));
  scene.add(gridG);

  const labG=new THREE.Group(); scene.add(labG);
  const vecG=new THREE.Group(); scene.add(vecG);
  const extG=new THREE.Group(); scene.add(extG);

  let theta=.6,phi=.52,rad=14,tx=0,ty=0,tz=0;
  function upCam(){camera.position.set(tx+rad*Math.sin(phi)*Math.sin(theta),ty+rad*Math.cos(phi),tz+rad*Math.sin(phi)*Math.cos(theta));camera.lookAt(tx,ty,tz)}
  upCam();

  let drag=false,lx=0,ly=0,rc=false;
  renderer.domElement.addEventListener('mousedown',e=>{drag=true;lx=e.clientX;ly=e.clientY;rc=e.button===2});
  renderer.domElement.addEventListener('contextmenu',e=>e.preventDefault());
  window.addEventListener('mouseup',()=>drag=false);
  window.addEventListener('mousemove',e=>{if(!drag)return;const dx=(e.clientX-lx)*.013,dy=(e.clientY-ly)*.013;lx=e.clientX;ly=e.clientY;if(rc){tx-=dx*1.8;ty+=dy*1.8}else{theta-=dx;phi=Math.max(.06,Math.min(Math.PI-.06,phi+dy))}upCam()});
  renderer.domElement.addEventListener('wheel',e=>{rad=Math.max(1.5,Math.min(50,rad+e.deltaY*.025));upCam()},{passive:true});
  let tch=[],ld2=0;
  renderer.domElement.addEventListener('touchstart',e=>{tch=[...e.touches];if(e.touches.length===2)ld2=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)});
  renderer.domElement.addEventListener('touchmove',e=>{if(e.touches.length===1&&tch.length){const dx=(e.touches[0].clientX-tch[0].clientX)*.015,dy=(e.touches[0].clientY-tch[0].clientY)*.015;theta-=dx;phi=Math.max(.06,Math.min(Math.PI-.06,phi+dy));upCam()}else if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);rad=Math.max(1.5,Math.min(50,rad-(d-ld2)*.05));ld2=d;upCam()}tch=[...e.touches];e.preventDefault()},{passive:false});
  const ro=new ResizeObserver(()=>{const W=host.clientWidth,H=host.clientHeight||400;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix()});ro.observe(host);
  function animate(){requestAnimationFrame(animate);renderer.render(scene,camera)}animate();
  return {scene,camera,renderer,axG,gridG,labG,vecG,extG,upCam,
    get theta(){return theta},set theta(v){theta=v},
    get phi(){return phi},set phi(v){phi=v},
    get rad(){return rad},set rad(v){rad=v},
    get tx(){return tx},set tx(v){tx=v},
    showAxes:true,showGrid:true,showLabels:true,showExtra:true};
}

function makeSpriteLabel(text,pos,color='#ffffff'){
  const cv=document.createElement('canvas');cv.width=192;cv.height=56;
  const ctx=cv.getContext('2d');
  ctx.fillStyle='rgba(10,13,20,.82)';ctx.roundRect(2,2,188,52,8);ctx.fill();
  ctx.font='bold 26px JetBrains Mono,monospace';ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,96,28);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthTest:false}));
  sp.scale.set(.8,.22,1);sp.position.copy(pos);return sp;
}

function addArrow(scene,from,to,color,hs=0.15){
  const dir=new THREE.Vector3().subVectors(to,from);const len=dir.length();if(len<1e-9)return;
  const n=dir.clone().normalize();const sl=Math.max(0,len-hs*1.5);
  const geo=new THREE.BufferGeometry().setFromPoints([from,from.clone().add(n.clone().multiplyScalar(sl))]);
  scene.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color,linewidth:2})));
  const c=new THREE.Mesh(new THREE.ConeGeometry(hs*.35,hs*1.4,10),new THREE.MeshPhongMaterial({color}));
  c.position.copy(to);c.quaternion.setFromUnitVectors(V3(0,1,0),n);scene.add(c);
}

function addDash(scene,p1,p2,color=0x4a5578){
  const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints([V3(...p1),V3(...p2)]),new THREE.LineDashedMaterial({color,dashSize:.12,gapSize:.08}));l.computeLineDistances();scene.add(l);
}
function addDot(scene,pos,color,r=.1){const m=new THREE.Mesh(new THREE.SphereGeometry(r,12,12),new THREE.MeshPhongMaterial({color}));m.position.set(...pos);scene.add(m);return m}

function renderScene(vw,vectors){
  if(!vw)return;
  while(vw.vecG.children.length)vw.vecG.remove(vw.vecG.children[0]);
  while(vw.labG.children.length)vw.labG.remove(vw.labG.children[0]);
  while(vw.extG.children.length)vw.extG.remove(vw.extG.children[0]);

  vectors.forEach(v=>{
    if(v.type==='arc'){
      const n1=sa3(v.v1).normalize(),n2=sa3(v.v2).normalize();
      const pts=[];for(let i=0;i<=24;i++)pts.push(n1.clone().lerp(n2,i/24).normalize().multiplyScalar(.6));
      const geo=new THREE.BufferGeometry().setFromPoints(pts);
      vw.extG.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:v.color})));
      const mid=n1.clone().lerp(n2,.5).normalize().multiplyScalar(.85);
      vw.labG.add(makeSpriteLabel('θ',mid,'#fbbf24'));
    } else if(v.type==='para'){
      const [x1,y1,z1]=v.u,[x2,y2,z2]=v.v;
      const verts=new Float32Array([0,0,0,y1,z1,x1,y1+y2,z1+z2,x1+x2,0,0,0,y1+y2,z1+z2,x1+x2,y2,z2,x2]);
      const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
      vw.extG.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:v.color,opacity:.15,transparent:true,side:THREE.DoubleSide})));
    } else if(v.type==='box'){
      const [x1,y1,z1]=v.u,[x2,y2,z2]=v.v,[x3,y3,z3]=v.w;
      const A=[0,0,0],B=[x1,y1,z1],C=[x2,y2,z2],D=[x3,y3,z3];
      const E=[x1+x2,y1+y2,z1+z2],F=[x1+x3,y1+y3,z1+z3],G=[x2+x3,y2+y3,z2+z3],H=[x1+x2+x3,y1+y2+y3,z1+z2+z3];
      [[A,B],[A,C],[A,D],[B,E],[B,F],[C,E],[C,G],[D,F],[D,G],[E,H],[F,H],[G,H]].forEach(([p,q])=>{
        const geo=new THREE.BufferGeometry().setFromPoints([sa3(p),sa3(q)]);
        vw.extG.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x886644,opacity:.5,transparent:true})));
      });
    } else if(v.type==='projaxes'){
      const [x,y,z]=v.v;
      addDash(vw.extG.parent?vw.scene:vw.extG,sp3([x,y,z]),sp3([x,0,0]));
      addDash(vw.extG.parent?vw.scene:vw.extG,sp3([x,y,z]),sp3([0,y,0]));
      addDash(vw.extG.parent?vw.scene:vw.extG,sp3([x,y,z]),sp3([0,0,z]));
      [[x,0,0,0xff4444],[0,y,0,0x22c55e],[0,0,z,0x3b82f6]].forEach(([px,py,pz,c])=>addDot(vw.scene,sp3([px,py,pz]),c,.07));
    } else if(v.type==='midpoint'){
      const [ax,ay,az]=v.a,[bx,by,bz]=v.b,[mx,my,mz]=v.m;
      vw.scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([sv3(ax,ay,az),sv3(bx,by,bz)]),new THREE.LineBasicMaterial({color:0x4a5578})));
      addDot(vw.scene,sp3(v.a),0x7c6af7,.12);addDot(vw.scene,sp3(v.b),0x2dd4a0,.12);addDot(vw.scene,sp3(v.m),0xfbbf24,.14);
      vw.labG.add(makeSpriteLabel('A',sv3(ax+.2,ay+.25,az+.1),'#a78bfa'));
      vw.labG.add(makeSpriteLabel('B',sv3(bx+.2,by+.25,bz+.1),'#34d399'));
      vw.labG.add(makeSpriteLabel('M',sv3(mx+.2,my+.25,mz+.1),'#fbbf24'));
    } else if(v.type==='dash'){
      addDash(vw.vecG,sp3(v.from),sp3(v.to));
    } else {
      // regular arrow
      addArrow(vw.vecG,sa3(v.from),sa3(v.to),v.color);
      if(v.dashed) addDash(vw.vecG,sp3(v.from),sp3(v.to),v.color);
      if(v.label){
        const mid=sa3(v.from).lerp(sa3(v.to),.62).add(V3(.15,.2,.1));
        vw.labG.add(makeSpriteLabel(v.label,mid,'#'+v.color.toString(16).padStart(6,'0')));
      }
    }
  });
}

/* viewer toggle features */
function toggleFeature(feat,btn){
  if(!mainVW)return;
  if(feat==='axes'){mainVW.showAxes=!mainVW.showAxes;mainVW.axG.visible=mainVW.showAxes}
  if(feat==='grid'){mainVW.showGrid=!mainVW.showGrid;mainVW.gridG.visible=mainVW.showGrid}
  if(feat==='labels'){mainVW.showLabels=!mainVW.showLabels;mainVW.labG.visible=mainVW.showLabels}
  if(feat==='extra'){mainVW.showExtra=!mainVW.showExtra;mainVW.extG.visible=mainVW.showExtra}
  btn.classList.toggle('on');
}
function toggleFeatureC(feat,btn){
  if(!calcVW)return;
  if(feat==='axes')calcVW.axG.visible=!calcVW.axG.visible;
  if(feat==='grid')calcVW.gridG.visible=!calcVW.gridG.visible;
  if(feat==='labels')calcVW.labG.visible=!calcVW.labG.visible;
  if(feat==='extra')calcVW.extG.visible=!calcVW.extG.visible;
  btn.classList.toggle('on');
}
function toggleFreeFeature(feat,btn){
  if(!freeVW)return;
  if(feat==='axes')freeVW.axG.visible=!freeVW.axG.visible;
  if(feat==='grid')freeVW.gridG.visible=!freeVW.gridG.visible;
  if(feat==='labels')freeVW.labG.visible=!freeVW.labG.visible;
  btn.classList.toggle('on');
}
function resetMainCam(){if(mainVW){mainVW.theta=.6;mainVW.phi=.52;mainVW.rad=14;mainVW.tx=0;mainVW.upCam()}}
function resetCalcCam(){if(calcVW){calcVW.theta=.6;calcVW.phi=.52;calcVW.rad=14;calcVW.tx=0;calcVW.upCam()}}
function resetFreeCam(){if(freeVW){freeVW.theta=.6;freeVW.phi=.52;freeVW.rad=14;freeVW.tx=0;freeVW.upCam()}}
