import {animate,createScope,createTimeline,stagger,onScroll,svg} from 'animejs';
import rainfall from './rainfall.json';
import {projects} from '../src/data.js';
import {extraProjects} from './extra-projects.js';
const chart=document.querySelector('#rain-chart');
const W=560,H=280,left=42,right=14,top=20,bottom=35;
const min=600,max=1500;
const x=i=>left+i/(rainfall.length-1)*(W-left-right);
const y=v=>top+(max-v)/(max-min)*(H-top-bottom);
const line=rainfall.map((d,i)=>`${i?'L':'M'}${x(i).toFixed(2)} ${y(d.annual).toFixed(2)}`).join(' ');
chart.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="rain-title rain-desc"><title id="rain-title">India annual rainfall, 1901–2015</title><desc id="rain-desc">Line chart of 115 annual rainfall observations in millimetres. Source: supplied Rainfall Trends.csv. Year-to-year variation is shown; this is historical data, not a forecast.</desc><defs><linearGradient id="rain-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#38bdf8" stop-opacity=".2"/><stop offset="1" stop-color="#38bdf8" stop-opacity="0"/></linearGradient></defs>${[600,900,1200,1500].map(v=>`<path d="M${left} ${y(v)}H${W-right}" stroke="#94b7e0" stroke-opacity=".12"/><text x="${left-9}" y="${y(v)+3}" text-anchor="end">${v}</text>`).join('')}<path d="${line} L${x(rainfall.length-1)} ${H-bottom} L${left} ${H-bottom}Z" fill="url(#rain-fill)"/><path class="rain-line" d="${line}" stroke="#38bdf8" stroke-width="2" stroke-linejoin="round" fill="none"/>${[0,29,59,89,114].map(i=>`<text x="${x(i)}" y="${H-11}" text-anchor="middle">${rainfall[i].year}</text>`).join('')}</svg>`;
const media={
 movies:{image:'framelight.png',label:'Application screenshot · MovieLens recommendations',alt:'FrameLight app with movie selection, discovery controls and recommendation cards',evaluation:'recommender-evaluation.png',evaluationAlt:'Validation learning curves and held-out full-catalogue NDCG at 20 comparison'},
 ocr:{image:'ocr-evaluation.png',label:'Actual evaluation · synthetic printed documents',alt:'Character error rate by input language for two Tesseract configurations',evaluation:'ocr.png',evaluationAlt:'Multilingual document reader application'},
 flow:{image:'youtube.png',label:'Application screenshot · sample-data demonstration',alt:'YouTube Toolkit collection progress using sample data, not real video data'},
 weather:{image:'weather.png',label:'Actual research chart · retrospective ERA5 proxy',alt:'Eight-city temperature MAE comparison of research models and baselines'}
};
const rail=document.querySelector('#project-gallery');
const galleryProjects=[...projects.filter(p=>p.art!=='rain'),...extraProjects];
rail.innerHTML=galleryProjects.map((p,i)=>{const m=media[p.art];return `<article class="gallery-card" aria-label="${i+1} of ${galleryProjects.length}: ${p.title}"><a class="gallery-art media-art ${p.art}" href="${p.url||(p.art==='flow'?'https://github.com/Kirtibhanu07/Youtube-Data-Toolkit':'./project-media/'+m.image)}" target="_blank" rel="noreferrer" aria-label="${p.url||p.art==='flow'?'View repository: ':'Open image: '}${p.title}"><img src="./project-media/${m.image}" alt="${m.alt}" loading="lazy" width="800" height="450"><span class="image-expand" aria-hidden="true">↗</span></a><p class="media-caption">${m.label}</p><div class="gallery-body"><div class="section-tag">${p.type}</div><h3>${p.title}</h3><p>${p.desc}</p><div class="project-stack">${p.stack.slice(0,4).map(t=>`<span>${t}</span>`).join('')}</div><details class="case-study"><summary>View details <span>+</span></summary><div class="case-content"><h4>${p.subtitle}</h4><p>${p.detail}</p>${m.evaluation?`<a class="evaluation-image" href="./project-media/${m.evaluation}" target="_blank" rel="noreferrer"><img src="./project-media/${m.evaluation}" alt="${m.evaluationAlt}" loading="lazy" width="800" height="450"><span>Open full-size image ↗</span></a>`:''}${p.url?`<a href="${p.url}" target="_blank" rel="noreferrer">Source & evaluation ↗</a>`:''}</div></details></div></article>`}).join('');
const prev=document.querySelector('#projects-prev'),next=document.querySelector('#projects-next');
function scrollProject(direction){const step=rail.querySelector('.gallery-card').getBoundingClientRect().width+24;rail.scrollBy({left:step*direction,behavior:mq.matches||userMinimal?'instant':'smooth'})}
function updateGallery(){const last=rail.scrollWidth-rail.clientWidth;prev.disabled=rail.scrollLeft<4;next.disabled=rail.scrollLeft>=last-4}
prev.addEventListener('click',()=>scrollProject(-1));next.addEventListener('click',()=>scrollProject(1));rail.addEventListener('scroll',updateGallery,{passive:true});new ResizeObserver(updateGallery).observe(rail);
rail.addEventListener('keydown',e=>{if(e.target!==rail)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();scrollProject(e.key==='ArrowRight'?1:-1)}else if(e.key==='Home'||e.key==='End'){e.preventDefault();rail.scrollTo({left:e.key==='Home'?0:rail.scrollWidth,behavior:'instant'})}});
// Source-supported results; numbers remain visible without motion.
const mq=matchMedia('(prefers-reduced-motion: reduce)');
const userMinimal=false;
let scope;
function setupMotion(){
 scope?.revert();
 const reduced=mq.matches||userMinimal;
 document.body.classList.toggle('minimal-motion',reduced);
 document.querySelectorAll('[data-count]').forEach(el=>el.textContent=el.dataset.count);
 if(reduced)return;
 const mobile=matchMedia('(max-width: 768px)').matches;
 scope=createScope({root:document.body}).add(()=>{
  createTimeline({defaults:{duration:700,ease:'out(3)'}})
   .add('.hero-tag, .hero h1, .hero-sub, .hero-cta',{opacity:[0,1],y:[18,0],delay:stagger(90)},0);
  document.querySelectorAll('.fade-up, .reveal').forEach(el=>animate(el,{opacity:[0,1],y:[mobile?12:24,0],duration:650,ease:'out(3)',autoplay:onScroll({target:el,enter:'bottom-=35 top',repeat:false})}));
  animate(svg.createDrawable('.rain-line'),{draw:['0 0','0 1'],duration:1800,ease:'inOut(2)',autoplay:onScroll({target:chart,repeat:false})});
  animate(svg.createDrawable('.career-draw'),{draw:['0 0','0 1'],ease:'linear',autoplay:onScroll({target:'.timeline',enter:'bottom top',leave:'top bottom',sync:.5})});
  document.querySelectorAll('[data-count]').forEach(el=>{const value={n:0};animate(value,{n:Number(el.dataset.count),duration:1300,ease:'out(3)',onUpdate:()=>el.textContent=Math.round(value.n),autoplay:onScroll({target:el,repeat:false})})});
 });
}
mq.addEventListener('change',setupMotion);
document.querySelectorAll('.case-study').forEach(details=>{
 let running;
 details.addEventListener('toggle',()=>{
  running?.revert();
  if(details.open&&!mq.matches&&!userMinimal){running=animate(details.querySelector('.case-content'),{opacity:[0,1],y:[8,0],duration:350,ease:'out(3)'})}
 });
});
const menu=document.querySelector('#menu-toggle');const nav=document.querySelector('.nav-links');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu';nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.textContent='Menu';nav.classList.remove('open')}));
const links=[...nav.querySelectorAll('a')];
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){links.forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.style.color=active?'#22d3ee':'';if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}},{rootMargin:'-15% 0px -60% 0px'});
document.querySelectorAll('section[id]').forEach(el=>observer.observe(el));
document.querySelectorAll('a[target="_blank"]').forEach(a=>a.rel='noreferrer');
setupMotion();
