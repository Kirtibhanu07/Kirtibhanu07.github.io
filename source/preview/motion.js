import {animate,createScope,createTimeline,stagger,onScroll,svg} from 'animejs';
import rainfall from './rainfall-predictions.json';
import {projects} from '../src/data.js';
import {extraProjects} from './extra-projects.js';
const chart=document.querySelector('#rain-chart');
const W=Math.max(300,chart.clientWidth||560),H=340,left=57,right=20,top=28,bottom=58;
const values=rainfall.flatMap(d=>[d.actual,d.predicted]);
const min=Math.floor((Math.min(...values)-40)/100)*100,max=Math.ceil((Math.max(...values)+40)/100)*100;
const x=i=>left+i/(rainfall.length-1)*(W-left-right);
const y=v=>top+(max-v)/(max-min)*(H-top-bottom);
const line=key=>rainfall.map((d,i)=>`${i?'L':'M'}${x(i).toFixed(2)} ${y(d[key]).toFixed(2)}`).join(' ');
const ticks=Array.from({length:(max-min)/100+1},(_,i)=>min+i*100);
chart.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="rain-title rain-desc"><title id="rain-title">Actual versus ARIMA-predicted annual rainfall, 1996–2015</title><desc id="rain-desc">Twenty held-out, expanding-window one-year predictions from saved evaluation results. Blue is observed rainfall; dashed amber is ARIMA(3,1,2). Each prediction uses only preceding years. Historical mean was the validation winner; ARIMA is shown for comparison, not as a proven best model.</desc>${ticks.map(v=>`<path d="M${left} ${y(v)}H${W-right}" stroke="#94b7e0" stroke-opacity=".13"/><text x="${left-10}" y="${y(v)+4}" text-anchor="end">${v}</text>`).join('')}<path class="rain-line" d="${line('actual')}" stroke="#38bdf8" stroke-width="2.5" stroke-linejoin="round" fill="none"/><path class="rain-prediction" d="${line('predicted')}" stroke="#edbd73" stroke-width="2.2" stroke-dasharray="6 5" stroke-linejoin="round" fill="none"/>${rainfall.map((d,i)=>`<circle cx="${x(i)}" cy="${y(d.actual)}" r="3" fill="#38bdf8"><title>${d.year}: actual ${d.actual.toFixed(1)} mm; predicted ${d.predicted.toFixed(1)} mm</title></circle>`).join('')}${[0,4,9,14,19].map(i=>`<text x="${x(i)}" y="${H-35}" text-anchor="middle">${rainfall[i].year}</text>`).join('')}<text x="${(left+W-right)/2}" y="${H-8}" text-anchor="middle">Year</text><text transform="translate(13 ${(top+H-bottom)/2}) rotate(-90)" text-anchor="middle">Annual rainfall (mm)</text></svg><div class="rain-legend"><span><i class="actual-key"></i>Actual</span><span><i class="prediction-key"></i>ARIMA prediction</span></div><p class="rain-method">20 held-out years · trained on prior years only. Historical mean won validation; ARIMA did not clearly beat that stronger baseline.</p>`;
const media={
 movies:{image:'cover-framelight.svg',label:'Recommendation workflow · project illustration',alt:'MovieLens recommendation workflow illustration',evaluation:'recommender-evaluation.png',evaluationAlt:'Validation learning curves and held-out full-catalogue NDCG at 20 comparison'},
 ocr:{image:'cover-ocr.svg',label:'Document workflow · project illustration',alt:'Five-language OCR workflow illustration',evaluation:'ocr.png',evaluationAlt:'Multilingual document reader application'},
 flow:{image:'cover-youtube.svg',label:'Metadata workflow · project illustration',alt:'Video and playlist metadata flowing into Google Sheets illustration'},
 weather:{image:'cover-weather.svg',label:'Forecast comparison · project illustration',alt:'Weather forecast evaluation workflow illustration'}
};
const rail=document.querySelector('#project-gallery');
const galleryProjects=[...projects.filter(p=>p.art!=='rain'),...extraProjects];
rail.innerHTML=galleryProjects.map((p,i)=>{const m=media[p.art];return `<article class="gallery-card" aria-label="${i+1} of ${galleryProjects.length}: ${p.title}"><button type="button" class="gallery-art media-art ${p.art}" aria-label="Read case study: ${p.title}" aria-expanded="false"><img src="./project-media/${m.image}" alt="${m.alt}" loading="lazy" width="800" height="450"><span class="image-expand" aria-hidden="true">+</span></button><p class="media-caption">${m.label}</p><div class="gallery-body"><div class="section-tag">${p.type}</div><h3>${p.title}</h3><p>${p.desc}</p><div class="project-stack">${p.stack.slice(0,4).map(t=>`<span>${t}</span>`).join('')}</div><details class="case-study"><summary>View details <span>+</span></summary><div class="case-content"><h4>${p.subtitle}</h4><p>${p.detail}</p>${m.evaluation?`<a class="evaluation-image" href="./project-media/${m.evaluation}" target="_blank" rel="noreferrer"><img src="./project-media/${m.evaluation}" alt="${m.evaluationAlt}" loading="lazy" width="800" height="450"><span>Open full-size image ↗</span></a>`:''}${p.url?`<a href="${p.url}" target="_blank" rel="noreferrer">Source & evaluation ↗</a>`:''}</div></details></div></article>`}).join('');
rail.querySelectorAll('.gallery-card').forEach(card=>{const button=card.querySelector('.gallery-art'),details=card.querySelector('details');button.addEventListener('click',()=>{details.open=!details.open;button.setAttribute('aria-expanded',String(details.open));if(details.open)details.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});});details.addEventListener('toggle',()=>button.setAttribute('aria-expanded',String(details.open)));});
const prev=document.querySelector('#projects-prev'),next=document.querySelector('#projects-next');
function scrollProject(direction){const step=rail.querySelector('.gallery-card').getBoundingClientRect().width+24;rail.scrollBy({left:step*direction,behavior:mq.matches||userMinimal?'instant':'smooth'})}
function updateGallery(){const last=rail.scrollWidth-rail.clientWidth;prev.disabled=rail.scrollLeft<4;next.disabled=rail.scrollLeft>=last-4}
prev.addEventListener('click',()=>scrollProject(-1));next.addEventListener('click',()=>scrollProject(1));rail.addEventListener('scroll',updateGallery,{passive:true});new ResizeObserver(updateGallery).observe(rail);
rail.addEventListener('keydown',e=>{if(e.target!==rail)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();scrollProject(e.key==='ArrowRight'?1:-1)}else if(e.key==='Home'||e.key==='End'){e.preventDefault();rail.scrollTo({left:e.key==='Home'?0:rail.scrollWidth,behavior:'instant'})}});
// Source-supported results; numbers remain visible without motion.
const mq=matchMedia('(prefers-reduced-motion: reduce)');
let userMinimal=false,scope;
const toggle=document.querySelector('#motion-toggle');
function setupMotion(){
 scope?.revert();
 const reduced=mq.matches||userMinimal;
 document.body.classList.toggle('minimal-motion',reduced);
 toggle.textContent=reduced?'Motion off':'Motion on';
 toggle.setAttribute('aria-pressed',String(reduced));
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
toggle.addEventListener('click',()=>{userMinimal=!userMinimal;setupMotion()});
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
