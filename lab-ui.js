'use strict';
let labDataPromise;
let labGeneration = 0;
const displayValue = value => value === undefined ? '—' : value === null ? 'null' : typeof value === 'object' ? JSON.stringify(value) : String(value);
const sameValue = (a,b) => JSON.stringify(a) === JSON.stringify(b);

function valueCells(value, previous) {
  if (Array.isArray(value)) {
    if (!value.length) return '<span class="lab-empty">empty</span>';
    if (value.every(row => Array.isArray(row))) {
      return `<div class="matrix-scroll"><table class="lab-matrix"><thead><tr><th scope="col">r / c</th>${Array.from({length:Math.max(...value.map(r=>r.length))},(_,i)=>`<th scope="col">${i}</th>`).join('')}</tr></thead><tbody>${value.map((row,r)=>`<tr><th scope="row">${r}</th>${row.map((v,c)=>`<td class="${sameValue(v,previous?.[r]?.[c])?'':'value-changed'}">${escapeHTML(displayValue(v))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    return `<div class="lab-array">${value.map((v,i)=>`<div class="lab-cell ${sameValue(v,previous?.[i])?'':'value-changed'}"><small>${i}</small><span>${escapeHTML(displayValue(v))}</span></div>`).join('')}</div>`;
  }
  if (value && typeof value === 'object') {
    const keys=Object.keys(value);
    if(!keys.length)return '<span class="lab-empty">empty</span>';
    return `<div class="matrix-scroll"><table class="lab-map"><thead><tr><th scope="col">Key / node</th><th scope="col">Value / reference</th></tr></thead><tbody>${keys.map(k=>`<tr class="${sameValue(value[k],previous?.[k])?'':'value-changed'}"><th scope="row">${escapeHTML(k)}</th><td>${escapeHTML(displayValue(value[k]))}</td></tr>`).join('')}</tbody></table></div>`;
  }
  return `<span class="lab-scalar">${escapeHTML(displayValue(value))}</span>`;
}

function pointerDiagram(structures, variables) {
  const tree=structures.tree, links=structures['next pointers'], trie=structures['trie edges'];
  if(!tree && !links && !trie)return '';
  const data=tree||links||trie, names=Object.keys(data);
  const nodeCard=name=>{
    const refs=Object.entries(variables).filter(([,value])=>value===name).map(([k])=>k);
    let edges=tree?Object.entries(data[name]).filter(([k])=>k==='left'||k==='right'):links?[['next',data[name]]]:Object.entries(data[name]);
    return `<div class="pointer-node ${refs.length?'pointer-active':''}"><small>${escapeHTML(refs.join(', ')||'node')}</small><strong>${escapeHTML(name)}${tree?` : ${escapeHTML(tree[name].value)}`:''}</strong>${edges.length?edges.map(([edge,target])=>`<span>${escapeHTML(edge)} → <b>${escapeHTML(target===null?'null':target)}</b></span>`).join(''):'<span>no children</span>'}</div>`;
  };
  return `<section class="lab-structure"><h4>Node references</h4><div class="pointer-graph">${names.map(nodeCard).join('')}</div></section>`;
}

async function renderVisual(p) {
  const generation=++labGeneration;
  $('#panel').innerHTML='<p class="notice">Loading algorithm lab…</p>';
  try {
    labDataPromise ||= fetch('./labs.json').then(r=>{if(!r.ok)throw Error();return r.json();}).catch(error=>{labDataPromise=null;throw error;});
    const labs=await labDataPromise;
    if(generation!==labGeneration||tabName!=='visual'||selected!==p.id)return;
    const lab=labs.find(l=>l.id===p.id);
    if(!lab)throw Error();
    let current=0;
    $('#panel').innerHTML=`<div class="trace-title"><h3>${escapeHTML(lab.title)}</h3><span>INSTRUCTION LAB / ${String(p.id).padStart(2,'0')}</span></div><p class="notice">One worked algorithm for this pattern. Each Next instruction executes the highlighted step; the panels show state <strong>after</strong> it. Java-style teaching instructions are simulated, including loop checks and recursive calls.</p><details class="lab-inputs" open><summary>Example input</summary><div id="lab-input-values"></div></details><div class="lab-toolbar"><button class="btn secondary" id="lab-back">← Back</button><button class="btn" id="lab-next">Next instruction →</button><button class="btn secondary" id="lab-reset">Reset</button><span id="lab-counter"></span></div><label class="lab-scrub-label" for="lab-scrub">Jump to instruction <input id="lab-scrub" type="range" min="0" max="${lab.steps.length}" value="0"></label><div id="lab-announcement" class="lab-announcement" role="status" aria-live="polite"></div><div class="lab-layout"><section class="lab-program"><h4>Algorithm instructions</h4><p class="notice">The highlighted instruction has just executed. Loop instructions repeat as execution proceeds.</p><ol id="lab-code"></ol></section><section class="lab-state"><h4>Variables <span class="change-key">highlight = changed this step</span></h4><div id="lab-variables"></div><div id="lab-memory"></div></section></div><details class="lab-history"><summary>Execution history</summary><ol id="lab-history"></ol></details><div class="callout"><strong>THE INVARIANT</strong>${escapeHTML(p.why)}</div>${p.id===1?'<button id="custom-window" class="btn secondary">Try a custom sliding-window input →</button>':''}`;
    $('#lab-input-values').innerHTML=Object.entries(lab.inputs).map(([k,v])=>`<div><strong>${escapeHTML(k)}</strong><code>${escapeHTML(displayValue(v))}</code></div>`).join('');
    function draw() {
      const state=current?lab.steps[current-1]:null;
      const previous=current>1?lab.steps[current-2]:null;
      const next=lab.steps[current];
      $('#lab-code').innerHTML=lab.code.map((code,i)=>`<li class="${state?.line===i?'instruction-active':''}" ${state?.line===i?'aria-current="step"':''}><code>${escapeHTML(code)}</code></li>`).join('');
      const variables=state?.variables||{}, old=previous?.variables||{};
      $('#lab-variables').innerHTML=Object.keys(variables).length?`<table class="lab-vars"><thead><tr><th scope="col">Variable</th><th scope="col">Before</th><th scope="col">After</th></tr></thead><tbody>${Object.entries(variables).map(([name,value])=>`<tr class="${sameValue(value,old[name])?'':'value-changed'}"><th scope="row">${escapeHTML(name)}</th><td>${escapeHTML(displayValue(old[name]))}</td><td>${escapeHTML(displayValue(value))}</td></tr>`).join('')}</tbody></table>`:'<p class="lab-empty">Ready. Press Next instruction to initialize the algorithm.</p>';
      $('#lab-memory').innerHTML=state?pointerDiagram(state.structures,variables)+Object.entries(state.structures).map(([name,value])=>`<section class="lab-structure"><h4>${escapeHTML(name)}</h4>${valueCells(value,previous?.structures?.[name])}</section>`).join(''):'';
      $('#lab-announcement').innerHTML=`${state?`<span class="step-label">EXECUTED</span><code>${escapeHTML(lab.code[state.line])}</code>${state.note?`<p>${escapeHTML(state.note)}</p>`:''}`:'<strong>Ready to trace the algorithm.</strong>'}<div class="next-instruction">${next?`Next: <code>${escapeHTML(lab.code[next.line])}</code>`:`<strong>Complete · Result: ${escapeHTML(displayValue(lab.result))}</strong>`}</div>`;
      $('#lab-counter').textContent=`${current} / ${lab.steps.length}`;
      $('#lab-scrub').value=current;$('#lab-back').disabled=current===0;$('#lab-next').disabled=current===lab.steps.length;
      $('#lab-history').innerHTML=lab.steps.slice(0,current).map((s,i)=>`<li>${escapeHTML(lab.code[s.line])}${s.note?` — ${escapeHTML(s.note)}`:''}</li>`).join('')||'<li>No instructions executed yet.</li>';
    }
    $('#lab-back').onclick=()=>{current=Math.max(0,current-1);draw();};
    $('#lab-next').onclick=()=>{current=Math.min(lab.steps.length,current+1);draw();};
    $('#lab-reset').onclick=()=>{current=0;draw();};
    $('#lab-scrub').oninput=e=>{current=+e.target.value;draw();};
    if(p.id===1)$('#custom-window').onclick=()=>{++labGeneration;renderLegacyVisual(p);const back=document.createElement('button');back.className='btn secondary';back.textContent='← Return to instruction lab';back.onclick=()=>renderVisual(p);$('#panel').prepend(back);};
    draw();
  } catch {
    if(generation===labGeneration&&tabName==='visual')$('#panel').innerHTML='<p>The instruction lab could not load. Please reload the page and try again.</p>';
  }
}
