'use strict';
const $ = s => document.querySelector(s);
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let patterns = [], selected = 1, tabName = 'learn', completed = {}, states = [], frame = 0;
let storageAvailable = true;
try { completed = JSON.parse(localStorage.getItem('dsa-atlas-progress-v1') || '{}'); if (!completed || Array.isArray(completed) || typeof completed !== 'object') completed = {}; } catch { completed = {}; storageAvailable = false; }
const key = (p, problem) => `${p.id}:${problem.id}`;
const doneCount = p => p.problems.filter(x => completed[key(p,x)] === true).length;
function toast(message) { $('#toast').textContent = message; $('#toast').style.display='block'; clearTimeout(toast.timer); toast.timer=setTimeout(()=>$('#toast').style.display='none',3500); }
function save() { try { localStorage.setItem('dsa-atlas-progress-v1',JSON.stringify(completed)); } catch { toast('Browser storage is unavailable. Export progress to keep a copy.'); } }
function navigation() {
  const query = $('#search').value.trim().toLowerCase().replace(/^lc\s*#?\s*/, '');
  let group = '', html = '', count=0;
  for (const p of patterns) {
    if ($('#unfinished').checked && doneCount(p)===6) continue;
    if (query && !`${p.name} ${p.group} ${p.problems.map(x=>`${x.id} ${x.title}`).join(' ')}`.toLowerCase().includes(query)) continue;
    if (group!==p.group) {group=p.group;html+=`<p class="nav-group">${escapeHTML(group)}</p>`;}
    html+=`<a class="pattern-link ${selected===p.id?'active':''}" ${selected===p.id?'aria-current="page"':''} href="#pattern-${p.id}"><span class="number">${String(p.id).padStart(2,'0')}</span><span>${escapeHTML(p.name)}</span><span class="nav-count">${doneCount(p)}/6</span></a>`;count++;
  }
  $('#patterns').innerHTML = html || '<p class="empty">No matching patterns. Try a different search.</p>';
  const total=patterns.reduce((n,p)=>n+doneCount(p),0);
  $('#total-done').textContent=total; $('#progress-label').textContent=`${total} / 180 roadmap entries complete`;
  $('#progress-fill').style.width=`${total/180*100}%`;
}
function commentedCode(p) {
 return `/*\n * WHEN: ${p.when}\n * NAIVE: ${p.naive}\n * WHY: ${p.why}\n * EXAMPLE: ${p.example}\n * LEETCODE: ${p.applies}\n * IMPORT: ${p.imports}\n * COST: ${p.cost}\n */\n${p.code}`;
}
function diagram(p) {
  const nodes=p.diagram.split(' → ');
  return `<div class="diagram"><p class="card-label">PATTERN MAP / CONCEPTUAL DIAGRAM</p><div class="diagram-nodes">${nodes.map((n,i)=>`${i?'<span class="diagram-arrow" aria-hidden="true">→</span>':''}<span class="diagram-node">${escapeHTML(n)}</span>`).join('')}</div><small>${escapeHTML(p.example)}</small></div>`;
}
function lesson() {
 const p=patterns[selected-1];
 $('#lesson').innerHTML=`<div class="lesson-meta"><span>FIELD NOTE ${String(p.id).padStart(2,'0')} / 30 · ${escapeHTML(p.group).toUpperCase()}</span><span class="badge">6 practice problems</span></div><h2>${escapeHTML(p.name)}</h2><p class="when">${escapeHTML(p.when)}</p><div class="tabs" role="tablist" aria-label="Lesson sections">${[['learn','Field guide'],['practice','Practice'],['visual','Visual lab']].map(([id,label])=>`<button id="tab-${id}" role="tab" aria-selected="${tabName===id}" aria-controls="panel" tabindex="${tabName===id?0:-1}" data-tab="${id}">${label}</button>`).join('')}</div><section id="panel" role="tabpanel" aria-labelledby="tab-${tabName}"></section><div class="lesson-bottom">${p.id>1?`<a href="#pattern-${p.id-1}">← Previous pattern</a>`:'<span></span>'}${p.id<30?`<a href="#pattern-${p.id+1}">Next pattern →</a>`:'<a href="#pattern-1">Back to the beginning ↑</a>'}</div>`;
 $('.tabs').addEventListener('click',e=>{const button=e.target.closest('[data-tab]'); if(button){tabName=button.dataset.tab;lesson();$(`#tab-${tabName}`).focus();}});
 $('.tabs').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=['learn','practice','visual'];let i=tabs.indexOf(tabName);i=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;tabName=tabs[i];lesson();$(`#tab-${tabName}`).focus();});
 if(tabName==='learn') renderLearn(p); else if(tabName==='practice') renderPractice(p); else renderVisual(p);
}
function renderLearn(p) {
 $('#panel').innerHTML=`<div class="explain-grid"><div class="card"><p class="card-label">THE NAIVE APPROACH</p><p>${escapeHTML(p.naive)}</p></div><div class="card better"><p class="card-label">THE PATTERN'S ADVANTAGE</p><p>${escapeHTML(p.why)}</p></div></div>${diagram(p)}<h3>The Java micro-pattern</h3><p class="notice">A reusable example for LC ${escapeHTML(p.applies)}. Adapt the invariant and state for the other practice problems. Supplied nodes, inputs, and output containers are assumed where noted.</p><div class="code-wrap"><div class="code-head"><span>JAVA / ANNOTATED REFERENCE</span><button id="copy-code">Copy code</button></div><pre><code>${commentedCode(p).split('\n').map(line=>line.startsWith(' *')||line==='/*'||line===' */'?`<span class="comment">${escapeHTML(line)}</span>`:escapeHTML(line)).join('\n')}</code></pre></div><p class="cost">${escapeHTML(p.cost)}</p><div class="callout"><strong>WATCH THE BOUNDARY</strong>${escapeHTML(p.mistake)}</div><details><summary>How to practice this pattern</summary><p>State the invariant in one sentence. Trace the example by hand, then solve the first linked problem without copying. Test an empty or smallest allowed input, duplicates, and a boundary case. Return to explain why each state update is safe.</p></details>`;
 $('#copy-code').onclick=async()=>{try{await navigator.clipboard.writeText(commentedCode(p));toast('Java reference copied.');}catch{toast('Clipboard unavailable. Select and copy the reference text.');}};
}
function renderPractice(p) {
 $('#panel').innerHTML=`<div class="problem-header"><h3>Your practice trail</h3><span>${doneCount(p)} of 6 complete</span></div><p class="notice">Original roadmap order. Some LeetCode problems require Premium. A repeated problem is tracked separately for each pattern.</p><div>${p.problems.map(x=>`<div class="problem-row ${completed[key(p,x)]?'done':''}"><input type="checkbox" id="done-${x.id}" data-id="${x.id}" ${completed[key(p,x)]?'checked':''} aria-label="Mark LC ${x.id} ${escapeHTML(x.title)} complete"><span class="lc-id">LC ${x.id}</span><a href="https://leetcode.com/problems/${x.slug}/" target="_blank" rel="noopener">${escapeHTML(x.title)}</a><span class="external" aria-hidden="true">↗</span></div>`).join('')}</div><div class="callout"><strong>BEFORE YOU MARK IT DONE</strong>Can you explain the invariant, time complexity, and why the naive approach does extra work? Revisit the problem until you can.</div>`;
 $('#panel').onchange=e=>{if(!e.target.matches('[data-id]'))return;const k=`${p.id}:${e.target.dataset.id}`;if(e.target.checked)completed[k]=true;else delete completed[k];save();navigation();e.target.closest('.problem-row').classList.toggle('done',e.target.checked);$('.problem-header span').textContent=`${doneCount(p)} of 6 complete`;};
}
function trace(s) {
 const result=[], seen=new Set();let left=0,best=0;
 const push=(right,message,phase)=>result.push({right,left,best,set:[...seen],message,phase});
 push(-1,'Start with an empty set. left = 0 and best = 0.','start');
 for(let right=0;right<s.length;right++) {
   push(right,`Inspect ${JSON.stringify(s[right])} at right = ${right}.`,'inspect');
   while(seen.has(s[right])) {
     const removed=s[left];seen.delete(removed);left++;
     push(right,`Duplicate ${JSON.stringify(s[right])}: remove ${JSON.stringify(removed)} and move left to ${left}. Recheck before adding.`,'shrink');
   }
   seen.add(s[right]);best=Math.max(best,right-left+1);
   push(right,`Add ${JSON.stringify(s[right])}. Window is unique; best = max(best, ${right-left+1}) = ${best}.`,'add');
 }
 push(s.length,`Finished. Longest unique substring length = ${best}.`,'done');return result;
}
function renderLegacyVisual(p) {
 if(p.id!==1) {
  $('#panel').innerHTML=`<h3>See the invariant</h3>${diagram(p)}<div class="explain-grid"><div class="card"><p class="card-label">STATE TO TRACK</p><p>${escapeHTML(p.why)}</p></div><div class="card better"><p class="card-label">HAND-TRACE CHALLENGE</p><p>${escapeHTML(p.example)}</p></div></div><p class="notice">This is a conceptual diagram. The step-by-step execution lab is available for Sliding Window / LC 3.</p><a class="btn" href="#pattern-1">Open the sliding-window lab →</a>`;return;
 }
 $('#panel').innerHTML=`<div class="trace-title"><h3>Longest unique substring</h3><span>LC 3 · EXECUTION TRACE</span></div><p class="notice">Watch the pointers, HashSet, and best length change. This is a simulated trace of the supplied algorithm, not a Java runtime or memory debugger. Use up to 24 printable ASCII characters.</p><form class="trace-form"><label class="sr-only" for="trace-input">Input string</label><input id="trace-input" value="abcabcbb" maxlength="24" autocomplete="off"><button class="btn" type="submit">Trace input</button></form><div class="card"><div id="trace-cells" class="cells"></div><div id="trace-stats" class="trace-stats"></div><div id="trace-set" class="state-set"></div><p id="trace-message" class="trace-message" aria-live="polite"></p><div class="trace-controls"><button class="btn secondary" id="trace-prev">← Back</button><button class="btn" id="trace-next">Next step →</button><button class="btn secondary" id="trace-reset">Reset</button><small id="trace-position"></small></div></div><div class="callout"><strong>WHY THE NESTED LOOP IS STILL LINEAR</strong>right advances n times in total. left also advances at most n times in total. It does not restart for every right, so set operations total O(n) on average.</div>`;
 let input='abcabcbb';states=trace(input);frame=0;
 const draw=()=>{const st=states[frame];$('#trace-cells').innerHTML=[...input].map((c,i)=>`<span class="cell ${i>=st.left&&i<=st.right&&(st.phase==='add'||i<st.right)?'window':''} ${i===st.right?'current':''}"><small>${i}</small><b>${escapeHTML(c===' '?'␠':c)}</b><small>${i===st.left?'L':''}${i===st.right?' R':''}</small></span>`).join('')||(input===''?'<span class="notice">Empty input: answer 0.</span>':'');$('#trace-stats').innerHTML=[['left',st.left],['right',st.right<0?'—':st.right],['window',st.set.length],['best',st.best]].map(([name,value])=>`<div>${name}<strong>${value}</strong></div>`).join('');$('#trace-set').textContent=`HashSet → { ${st.set.map(c=>JSON.stringify(c)).join(', ')} }`;$('#trace-message').textContent=st.message;$('#trace-position').textContent=`${frame+1} / ${states.length}`;$('#trace-prev').disabled=frame===0;$('#trace-next').disabled=frame===states.length-1;};
 $('.trace-form').onsubmit=e=>{e.preventDefault();const candidate=$('#trace-input').value;if(!/^[\x20-\x7e]{0,24}$/.test(candidate)){toast('Please use up to 24 printable ASCII characters.');return;}input=candidate;states=trace(input);frame=0;draw();};
 $('#trace-prev').onclick=()=>{if(frame>0)frame--;draw();};$('#trace-next').onclick=()=>{if(frame<states.length-1)frame++;draw();};$('#trace-reset').onclick=()=>{frame=0;draw();};draw();
}
function route(){const match=location.hash.match(/^#pattern-(\d+)$/);selected=match&&+match[1]>=1&&+match[1]<=30?+match[1]:1;navigation();lesson();}
$('#search').addEventListener('input',navigation);$('#unfinished').addEventListener('change',navigation);
window.addEventListener('hashchange',route);
$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({version:1,completed},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='dsa-atlas-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('#import').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>100000)throw Error();const data=JSON.parse(await file.text());if(data.version!==1||!data.completed||typeof data.completed!=='object'||Array.isArray(data.completed))throw Error();const valid=new Set(patterns.flatMap(p=>p.problems.map(x=>key(p,x))));for(const [k,v] of Object.entries(data.completed)){if(!valid.has(k)||v!==true)throw Error();}completed={...completed,...data.completed};save();route();toast('Progress imported and merged.');}catch{toast('Invalid progress file. Use an atlas progress export.');}e.target.value='';};
fetch('./patterns.json').then(r=>{if(!r.ok)throw Error('Could not load lessons');return r.json();}).then(data=>{patterns=data;route();if(!storageAvailable)toast('Browser storage is unavailable. Export progress to keep it.');}).catch(()=>{$('#lesson').innerHTML='<h2>The atlas could not load.</h2><p>Please reload the page. The lesson data may be temporarily unavailable.</p>';});
