import {animate,onScroll} from 'animejs';

// One full-viewport data surface, projected from three-dimensional coordinates.
// Scroll drives the camera and surface; no perpetual render loop is needed.
const canvas=document.createElement('canvas');
canvas.id='data-universe';
canvas.setAttribute('aria-hidden','true');
document.body.prepend(canvas);
document.body.classList.add('immersive-background');
const context=canvas.getContext('2d',{alpha:true});
const preference=matchMedia('(prefers-reduced-motion: reduce)');
const state={progress:0};
const variant='mesh';
canvas.dataset.variant=variant;
document.body.classList.add('background-mesh');
let width=0,height=0,frame=0,observer,animation;
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;draw()})}
function draw(){
 if(!context||!width||document.hidden)return;
 const reduced=preference.matches||document.body.classList.contains('minimal-motion');
 const p=reduced?0:state.progress;
 canvas.dataset.progress=p.toFixed(3);
 const ctx=context;
 ctx.clearRect(0,0,width,height);
 const unit=Math.max(width,height)*.64;
 const angle=-.32+p*.85,tilt=.38+Math.sin(p*3)*.09;
 const ca=Math.cos(angle),sa=Math.sin(angle),ct=Math.cos(tilt),st=Math.sin(tilt);
 const cols=width<600?32:56,rows=width<600?14:22;
 const points=[];
 const glow=ctx.createRadialGradient(width*.72,height*.45,0,width*.72,height*.45,width*.75);
 glow.addColorStop(0,'rgba(20,70,125,.10)');glow.addColorStop(.55,'rgba(15,40,85,.055)');glow.addColorStop(1,'rgba(5,7,15,0)');
 ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
 for(let r=0;r<rows;r++){
  points[r]=[];
  for(let c=0;c<cols;c++){
   const u=c/(cols-1),v=r/(rows-1),x=(u-.5)*3.6,z=(v-.5)*2.4;
   const wave=Math.sin(u*9+p*4+v*3)*.18+Math.cos(v*8-u*4+p*2)*.16;
   const y=wave+Math.sin(u*4+p*1.8)*.23;
   const rx=x*ca-z*sa,rz=x*sa+z*ca;
   const ry=y*ct-rz*st,depth=y*st+rz*ct;
   const perspective=2.7/(3.8+depth);
   const sx=width*.56+rx*unit*perspective,sy=height*.56+ry*unit*perspective;
   // Keep typography readable without hiding the sculpture on the left.
   const a=Math.min(.65,Math.max(.08,.25+(depth+1.5)*.085));
   points[r][c]={x:sx,y:sy,a,depth,perspective};
  }
 }
 // A connected wire surface gives depth, with bright signal paths woven through it.
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
  const q=points[r][c];
  if(c<cols-1){const n=points[r][c+1];ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(n.x,n.y);ctx.strokeStyle=`rgba(60,147,220,${q.a*.34})`;ctx.lineWidth=r%5===0?.9:.45;ctx.stroke();}
  if(r<rows-1&&c%3===0){const n=points[r+1][c];ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(n.x,n.y);ctx.strokeStyle=`rgba(75,130,210,${q.a*.19})`;ctx.lineWidth=.45;ctx.stroke();}
  const signal=(c/cols+p*1.1+r*.027)%1;
  const lit=signal>.975&&r%6===0;
  ctx.beginPath();ctx.arc(q.x,q.y,lit?1.35:q.perspective*.65,0,Math.PI*2);
  ctx.fillStyle=lit?'rgba(127,231,255,.55)':`rgba(82,173,238,${q.a})`;ctx.fill();
  if(lit){const g=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,9);g.addColorStop(0,'rgba(75,190,250,.20)');g.addColorStop(1,'rgba(75,190,250,0)');ctx.fillStyle=g;ctx.fillRect(q.x-9,q.y-9,18,18);}
 }
 // Distant observations move at a different depth from the main surface.
 for(let i=0;i<24;i++){
  const x=((Math.sin(i*127.1)*43758.5453%1+1)%1*width+p*width*(i%2?.12:-.08)+width)%width;
  const y=((Math.sin(i*311.7)*19421.412%1+1)%1*height-p*height*.28+height)%height;
  ctx.fillStyle=`rgba(135,183,230,${i%7===0?.35:.12})`;ctx.fillRect(x,y,i%7===0?2:1,i%7===0?2:1);
 }
}
function resize(){width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);context?.setTransform(ratio,0,0,ratio,0,0);schedule();observer?.refresh();}
function setup(){animation?.revert();observer?.revert();if(!preference.matches&&!document.body.classList.contains('minimal-motion')){
 observer=onScroll({target:document.body,enter:'top top',leave:'bottom bottom',sync:.6});
 animation=animate(state,{progress:[0,1],duration:1000,ease:'linear',autoplay:observer,onUpdate:schedule});
 }schedule();}
new MutationObserver(setup).observe(document.body,{attributes:true,attributeFilter:['class']});
preference.addEventListener('change',setup);
addEventListener('resize',resize,{passive:true});
document.addEventListener('visibilitychange',schedule);
resize();setup();
