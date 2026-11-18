import test from 'node:test';
import assert from 'node:assert/strict';
import {problems} from '../docs/problems.js';
import {details} from '../docs/problem-details.js';
import {executeJava} from '../docs/engine.js';
const unordered=new Set([15,18,49,78,347]);
const normalize=(id,value)=>{if(!unordered.has(id)||!Array.isArray(value))return value;return value.map(v=>Array.isArray(v)?[...v].sort((a,b)=>typeof a==='number'?a-b:String(a).localeCompare(String(b))):v).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));};
test('every runnable problem has a complete sourced contract and distinct baseline',()=>{assert.equal(Object.keys(details).length,75);for(const p of problems){const d=details[p.id];assert.ok(d.statement.length>30,p.id);assert.ok(d.constraints.length>0,p.id);assert.match(d.source,/^https:\/\/leetcode.com\/problems\/[\w-]+\/$/);assert.ok(d.constraintNote);assert.ok(d.brute.idea&&d.brute.time&&d.brute.space&&d.improvement);assert.notEqual(d.brute.code,p.code);assert.equal(d.verified,p.id!==370&&p.id!==774);}});
for(const p of problems)for(const [i,input]of p.examples.entries())test(`baseline LC ${p.id}: example ${i+1}`,()=>{const r=executeJava(details[p.id].brute.code,structuredClone(input));assert.equal(r.error,null,JSON.stringify(r.error));if(p.id===162){const index=r.result;assert.ok(index>=0&&index<input.nums.length);assert.ok(index===0||input.nums[index]>input.nums[index-1]);assert.ok(index===input.nums.length-1||input.nums[index]>input.nums[index+1]);}else if(p.tolerance){assert.ok(Math.abs(r.result-p.expected[i])<=p.tolerance);}else{assert.deepEqual(normalize(p.id,r.result),normalize(p.id,p.expected[i]));}assert.ok(r.steps.length>1);});
test('efficient merge uses merge sort and agrees with baseline on bridge intervals',()=>{const d=details[56];assert.ok(d.efficientCode);const input={intervals:[[1,2],[8,9],[2,8],[20,21]]};const expected=[[1,9],[20,21]];for(const code of [d.brute.code,d.efficientCode]){const r=executeJava(code,structuredClone(input));assert.equal(r.error,null);assert.deepEqual(r.result,expected);}});
test('deterministic small-input comparisons exercise both approaches beyond examples',()=>{
 let seed=20261118;const random=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};
 const compare=(id,input)=>{const p=problems.find(p=>p.id===id);const a=executeJava(details[id].brute.code,structuredClone(input)),b=executeJava(p.code,structuredClone(input));assert.equal(a.error,null,`baseline ${id}: ${JSON.stringify(a.error)}`);assert.equal(b.error,null,`efficient ${id}: ${JSON.stringify(b.error)}`);assert.deepEqual(normalize(id,a.result),normalize(id,b.result),`LC ${id}, input ${JSON.stringify(input)}`);};
 for(let trial=0;trial<20;trial++){
  const values=Array.from({length:random(7)},()=>random(7)-3),positive=values.map(x=>Math.abs(x)+1),s=Array.from({length:random(7)},()=>['a','b','c'][random(3)]).join('');
  for(const id of [15,128,217,503,84])compare(id,id===84?{heights:positive}:{nums:values});
  compare(18,{nums:values,target:random(7)-3});compare(3,{s});compare(76,{s,t:trial%3===0?'aa':'ab'});compare(904,{fruits:positive});compare(209,{target:1+random(12),nums:positive});compare(560,{nums:values,k:random(7)-3});compare(974,{nums:values,k:2+random(4)});compare(523,{nums:positive,k:1+random(5)});compare(11,{height:positive});
  const intervals=Array.from({length:random(5)},()=>{const a=random(8),b=random(8);return [Math.min(a,b),Math.max(a,b)];});compare(56,{intervals});
  const grid=Array.from({length:3},()=>Array.from({length:3},()=>String(random(2))));compare(85,{matrix:grid});compare(200,{grid});
 }
});
