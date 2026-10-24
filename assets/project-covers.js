import {animate,stagger} from './comparison-anime.js';
const repo='https://github.com/Kirtibhanu07/india-temperature-forecast';
const grid='<path class="cover-grid" d="M60 80H600 M60 140H600 M60 200H600 M60 260H600"/>';
const line=(d,c)=>`<path class="cover-line" pathLength="1" d="${d}" stroke="${c}"/>`;
const frame=content=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" aria-hidden="true">${content}</svg>`;
const titles=(a,b)=>`<text x="30" y="36" class="cover-title">${a}</text><text x="30" y="59" class="cover-subtitle">${b}</text>`;
const label=(x,y,t,color='#566174',size=14)=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}">${t}</text>`;
const colors=['#3576d8','#9e62cf','#159e8b','#eb873a','#df6083'];
const ocrNames=['English','Hindi','Kannada','Tamil','Telugu'],ocrValues=[.05,.25,1.33,4.65,.32];
const nodes=[['Input links','Videos · playlists · channels',25,90],['Resolve video IDs','Parse links · paginate lists',235,90],['Fetch metadata','YouTube API · up to 50 IDs',445,90],['Read video fields','Title · views · duration',445,210],['Apply filters','Dates · duration · duplicates',235,210],['Write to Sheets','Rows · status · retry/resume',25,210]];
const covers={
movies:{label:'Animated model evaluation · saved validation results',alt:'Recommendation model validation scores across training epochs',svg:frame(titles('FRAMELIGHT / MODEL TRAINING','Validation NDCG@20 · higher is better')+grid+line('M60 250L168 177L276 147L384 118L492 96L600 102','#3576d8')+line('M60 217L168 214L276 204L384 184L492 170L600 151','#e4753c')+label(60,294,'Epoch 5')+label(525,294,'Epoch 30')+label(60,330,'● BPR MF','#3576d8')+label(235,330,'● LightGCN','#ce602e'))},
ocr:{label:'Character error rate (%) · synthetic printed-document evaluation',alt:'OCR character error percentages by full language name: English 0.05%, Hindi 0.25%, Kannada 1.33%, Tamil 4.65%, Telugu 0.32%',svg:frame(titles('MULTILINGUAL OCR / LANGUAGE RESULTS','Character error rate (%) · lower is better')+grid+ocrValues.map((v,i)=>{const x=87+i*108,h=v/5*175;return `<g class="cover-bar"><rect x="${x}" y="${260-h}" width="42" height="${h}" fill="${colors[i]}" rx="4"/></g><text x="${x+21}" y="${244-h}" text-anchor="middle" fill="#414b5d" font-size="17" font-weight="600">${v.toFixed(2)}%</text><text x="${x+21}" y="291" text-anchor="middle" fill="#49556a" font-size="15">${ocrNames[i]}</text>`}).join('')+label(60,332,'Saved Tesseract raw_psm6 test results', '#657184',13))},
flow:{label:'Extraction workflow · YouTube Data API → Google Sheets',alt:'Six-step YouTube metadata extraction workflow: input links, resolve video IDs, fetch metadata, read fields, apply filters, write to Google Sheets',svg:frame(titles('YOUTUBE DATA TOOLKIT / HOW IT WORKS','Public metadata → clean, organised spreadsheet rows')+'<path d="M200 130H235 M410 130H445 M530 170V210 M445 250H410 M235 250H200" stroke="#95a4b7" stroke-width="2" fill="none"/>'+nodes.map((n,i)=>`<g><rect x="${n[2]}" y="${n[3]}" width="170" height="82" rx="12" fill="${['#e5efff','#efe4fa','#e1f1ea','#fcebdc','#fbe4e9','#e5efff'][i]}" stroke="${colors[i%5]}" stroke-opacity=".5"/>${label(n[2]+12,n[3]+23,`0${i+1}`,colors[i%5],11)}${label(n[2]+12,n[3]+44,n[0],'#26364c',15)}${label(n[2]+12,n[3]+65,n[1],'#566174',10)}</g>`).join('')+'<circle class="cover-packet" r="4" cx="210" cy="130" fill="#ed8644"/>'+label(30,337,'API batching · progress tracking · pause and resume','#657184',12))},
weather:{label:'Saved October 2026 evaluation · mean absolute error (°C)',alt:'Forecast mean absolute error in degrees Celsius across Delhi, Mumbai and Bengaluru, comparing provider forecast, corrected forecast and persistence',svg:frame(titles('INDIA WEATHER LAB / FORECAST EVALUATION','Mean absolute error (°C) · lower is better')+grid+[[1.451,1.097,.467],[2.2,.922,.628],[1.505,.624,1]].map((vs,i)=>vs.map((v,j)=>{let x=96+i*172+j*30,h=v/2.5*175;return `<g class="cover-bar"><rect x="${x}" y="${260-h}" width="23" height="${h}" rx="3" fill="${['#3576d8','#159e8b','#ed9246'][j]}"/></g><text x="${x+11}" y="${250-h}" text-anchor="middle" fill="#465164" font-size="12">${v.toFixed(2)}</text>`}).join('')+label(91+i*172,286,['Delhi','Mumbai','Bengaluru'][i])).join('')+label(45,321,'● Provider','#3576d8',12)+label(180,321,'● Corrected','#148975',12)+label(330,321,'● Persistence','#bc6327',12)+label(45,345,'Short test window · 39 / 43 / 43 matched outcomes','#657184',11))}
};
function start(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');const controllers=[];
 document.querySelectorAll('#project-gallery .gallery-card').forEach(card=>{
 const art=card.querySelector('.gallery-art');if(!art)return;const key=Object.keys(covers).find(k=>art.classList.contains(k));const cover=covers[key];if(!cover)return;
 art.innerHTML=cover.svg+'<span class="image-expand" aria-hidden="true">↗</span>';art.classList.add('cream-cover');art.setAttribute('aria-label',cover.alt+' — open repository');
 card.querySelector('.media-caption').textContent=cover.label;
 if(key==='weather'){
 art.href=repo;art.removeAttribute('download');art.setAttribute('aria-label',cover.alt+' — open repository');card.setAttribute('aria-label','4 of 4: India Weather Lab');card.querySelector('h3').textContent='India Weather Lab';card.querySelector('.gallery-body>p').textContent='Evaluate and correct next-day temperature forecasts for Delhi, Mumbai and Bengaluru.';
 card.querySelector('.project-stack').innerHTML=['Python','Scikit-learn','FastAPI','Streamlit'].map(x=>`<span>${x}</span>`).join('');
 const detail=card.querySelector('.case-content');detail.innerHTML='<h4>Local temperature forecast correction</h4><p>Pairs NOAA station observations with archived ECMWF forecasts supplied through Open-Meteo. Chronological training selects boosted trees for Delhi and Ridge regression for Mumbai and Bengaluru. Includes FastAPI, Streamlit and a browser dashboard. Saved October 2026 results cover 39, 43 and 43 matched outcomes: persistence performs better in Delhi and Mumbai. These are exploratory results, not a guarantee of live forecast accuracy.</p><a href="'+repo+'" target="_blank" rel="noreferrer">Source &amp; evaluation ↗</a>';
 }
 let animations=[],visible=false;
 function stop(){animations.forEach(a=>a.revert());animations=[];}
 function sync(){if(reduced.matches){stop();return}if(!visible||document.hidden){animations.forEach(a=>a.pause());return}if(!animations.length){const paths=art.querySelectorAll('.cover-line'),bars=art.querySelectorAll('.cover-bar'),packet=art.querySelector('.cover-packet');
 if(paths.length)animations.push(animate(paths,{strokeDasharray:'1',strokeDashoffset:[1,0],duration:2100,delay:stagger(200),ease:'inOutSine',loop:true,loopDelay:2600}));
 if(bars.length)animations.push(animate(bars,{scaleY:[.12,1],duration:1300,delay:stagger(90),ease:'outCubic',loop:true,loopDelay:3800}));
 if(packet)animations.push(animate(packet,{translateX:[0,215,320,320,215,0,-105],translateY:[0,0,0,120,120,120,120],duration:6500,ease:'linear',loop:true}));
 }else animations.forEach(a=>a.play())}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.15}).observe(art);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
