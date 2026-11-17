// Deliberately bounded Java teaching interpreter. No eval, network, or host access.
export class JavaError extends Error { constructor(message,line=1){super(message);this.line=line;} }
const TYPES=new Set(['int','long','double','float','boolean','char','String','void','Integer','Long','Character','Boolean','List','ArrayList','LinkedList','Map','HashMap','Set','HashSet','Deque','ArrayDeque','Stack','Queue']);
export function tokenize(src){
 const ts=[];let i=0,line=1;
 while(i<src.length){let c=src[i];if(/\s/.test(c)){if(c==='\n')line++;i++;continue;}
 if(src.slice(i,i+2)==='//'){while(i<src.length&&src[i]!=='\n')i++;continue;}
 if(src.slice(i,i+2)==='/*'){let n=src.indexOf('*/',i+2);if(n<0)throw new JavaError('Unclosed comment.',line);line+=(src.slice(i,n+2).match(/\n/g)||[]).length;i=n+2;continue;}
 if(c==='"'||c==="'"){let q=c,v='',l=line;i++;while(i<src.length&&src[i]!==q){if(src[i]==='\\'){i++;const esc={n:'\n',t:'\t',r:'\r','0':'\0'};v+=esc[src[i]]??src[i];i++;}else{if(src[i]==='\n')throw new JavaError('Unclosed string.',line);v+=src[i++];}}if(src[i]!==q)throw new JavaError('Unclosed string.',l);i++;ts.push({v,kind:q==="'"?'char':'str',line:l});continue;}
 let m=src.slice(i).match(/^\d+(?:\.\d+)?[LlFfDd]?/);if(m){ts.push({v:m[0],kind:'num',line});i+=m[0].length;continue;}
 m=src.slice(i).match(/^[a-zA-Z_$][\w$]*/);if(m){ts.push({v:m[0],kind:'id',line});i+=m[0].length;continue;}
 let op=['++','--','+=','-=','*=','/=','%=','==','!=','<=','>=','&&','||'].find(o=>src.startsWith(o,i));if(op){ts.push({v:op,line});i+=op.length;continue;}
 if('{}()[].,;:?+-*/%<>=!'.includes(c)){ts.push({v:c,line});i++;continue;}throw new JavaError(`Unsupported character “${c}”.`,line);
 }ts.push({v:'<eof>',line});return ts;
}
class Parser{
 constructor(src){this.t=tokenize(src);this.i=0;}
 at(v){return this.t[this.i].v===v;} take(){return this.t[this.i++];} eat(v){if(this.at(v)){this.i++;return true;}return false;} need(v){if(!this.at(v))throw new JavaError(`Expected “${v}”, found “${this.t[this.i].v}”.`,this.t[this.i].line);return this.take();}
 type(){let t=this.take();if(!TYPES.has(t.v))throw new JavaError(`Unsupported type “${t.v}”. See Java support.`,t.line);let name=t.v;
 if(this.eat('<')){let depth=1;while(depth&&!this.at('<eof>')){let v=this.take().v;if(v==='<')depth++;if(v==='>')depth--;}if(depth)throw new JavaError('Unclosed generic type.',t.line);}
 while(this.at('[')&&this.t[this.i+1]?.v===']'){this.i+=2;name+='[]';}return name;}
 program(){const methods={};while(!this.at('<eof>')){
 if(this.eat('import')||this.eat('package')){while(!this.eat(';')&&!this.at('<eof>'))this.take();continue;}
 if(this.eat('}')||this.eat('{'))continue;
 while(['public','private','protected','static','final'].includes(this.t[this.i].v))this.take();
 if(this.eat('class')){this.take();this.need('{');continue;}
 let line=this.t[this.i].line;const returnType=this.type(),name=this.take().v;this.need('(');const params=[];
 if(!this.at(')'))do{this.eat('final');const type=this.type(),p=this.take();params.push({name:p.v,type});}while(this.eat(','));this.need(')');
 const body=this.block();methods[name]={name,returnType,params,body,line};}
 if(!Object.keys(methods).length)throw new JavaError('Paste a Java method or a class Solution containing a method.');return methods;}
 block(){let line=this.need('{').line,body=[];while(!this.at('}')){if(this.at('<eof>'))throw new JavaError('Missing closing brace.',line);body.push(this.stmt());}this.need('}');return {kind:'block',body,line};}
 stmt(){let line=this.t[this.i].line;if(this.at('{'))return this.block();if(this.eat(';'))return {kind:'empty',line};
 if(this.eat('if')){this.need('(');let test=this.expr();this.need(')');const yes=this.stmt(),no=this.eat('else')?this.stmt():null;return {kind:'if',test,yes,no,line};}
 if(this.eat('while')){this.need('(');let test=this.expr();this.need(')');return {kind:'while',test,body:this.stmt(),line};}
 if(this.eat('for')){this.need('(');let init=null,test=null,update=[];if(!this.at(';'))init=TYPES.has(this.t[this.i].v)?this.decl():{kind:'expr',expr:this.expr(),line};this.need(';');if(!this.at(';'))test=this.expr();this.need(';');if(!this.at(')'))do{update.push(this.expr());}while(this.eat(','));this.need(')');return {kind:'for',init,test,update,body:this.stmt(),line};}
 if(this.eat('return')){let expr=this.at(';')?null:this.expr();this.need(';');return {kind:'return',expr,line};}
 if(this.eat('break')){this.need(';');return {kind:'break',line};}if(this.eat('continue')){this.need(';');return {kind:'continue',line};}
 this.eat('final');if(TYPES.has(this.t[this.i].v)&&this.t[this.i+1]?.v!=='.'){let n=this.decl();this.need(';');return n;}
 let expr=this.expr();this.need(';');return {kind:'expr',expr,line};}
 decl(){let line=this.t[this.i].line,type=this.type(),items=[];do{let name=this.take().v;let value=this.eat('=')?this.expr():null;items.push({name,value});}while(this.eat(','));return {kind:'decl',type,items,line};}
 expr(min=0){let t=this.take(),n;const line=t.line;
 if(t.kind==='num')n={kind:'literal',value:Number(t.v.replace(/[LlFfDd]$/,'')),line};
 else if(t.kind==='str'||t.kind==='char')n={kind:'literal',value:t.v,char:t.kind==='char',line};
 else if(t.v==='true'||t.v==='false'||t.v==='null')n={kind:'literal',value:t.v==='null'?null:t.v==='true',line};
 else if(t.v==='new'){let type=this.type();if(this.eat('[')){const size=this.expr();this.need(']');n={kind:'new',type,size,line};}else if(type.endsWith('[]')&&this.at('{')){n={kind:'array',items:this.arrayItems(),line};}else{this.need('(');let args=[];if(!this.at(')'))do{args.push(this.expr());}while(this.eat(','));this.need(')');n={kind:'new',type,args,line};}}
 else if(t.v==='{'){this.i--;n={kind:'array',items:this.arrayItems(),line};}
 else if(t.v==='('){if(['int','long','double','char'].includes(this.t[this.i].v)&&this.t[this.i+1]?.v===')'){let type=this.take().v;this.need(')');n={kind:'cast',type,expr:this.expr(10),line};}else{n=this.expr();this.need(')');}}
 else if(['!','-','+','++','--'].includes(t.v))n={kind:'unary',op:t.v,expr:this.expr(10),prefix:true,line};
 else if(t.kind==='id')n={kind:'id',name:t.v,line};else throw new JavaError(`Cannot parse “${t.v}”. See Java support.`,line);
 while(true){let op=this.t[this.i].v;
 if(['.','[','(','++','--'].includes(op)&&11>=min){this.take();if(op==='.'){n={kind:'member',object:n,name:this.take().v,line};}else if(op==='['){let index=this.expr();this.need(']');n={kind:'index',object:n,index,line};}else if(op==='('){let args=[];if(!this.at(')'))do{args.push(this.expr());}while(this.eat(','));this.need(')');n={kind:'call',callee:n,args,line};}else n={kind:'unary',op,expr:n,prefix:false,line};continue;}
 if(op==='?'&&min<=2){this.take();let yes=this.expr();this.need(':');n={kind:'ternary',test:n,yes,no:this.expr(2),line};continue;}
 let p=({'=':1,'+=':1,'-=':1,'*=':1,'/=':1,'%=':1,'||':3,'&&':4,'==':5,'!=':5,'<':6,'>':6,'<=':6,'>=':6,'+':7,'-':7,'*':8,'/':8,'%':8})[op];if(!p||p<min)break;this.take();n={kind:p===1?'assign':'binary',op,left:n,right:this.expr(p===1?p:p+1),line};}
 return n;}
 arrayItems(){this.need('{');const a=[];if(!this.at('}'))do{a.push(this.expr());}while(this.eat(',')&&!this.at('}'));this.need('}');return a;}
}
export function parseJava(src){if(src.length>16000)throw new JavaError('Keep the solution under 16,000 characters.');return new Parser(src).program();}
const isObj=x=>x!==null&&typeof x==='object';
const num=x=>typeof x==='string'&&x.length===1?x.charCodeAt(0):Number(x);
class VM{
 constructor(methods,limit){this.methods=methods;this.limit=limit;this.frames=[];this.trace=[];this.heap=new Map();this.ops=0;this.snapshotCells=0;this.output=undefined;}
 ref(v){if(!this.heap.has(v)){if(this.heap.size>=256)throw new JavaError('Allocation limit (256 objects). Use a smaller input.');this.heap.set(v,`@${this.heap.size+1}`);}return this.heap.get(v);}
 value(v){if(isObj(v))return {ref:this.ref(v)};return v===undefined?null:v;}
 plain(v){if(v instanceof Map)return Object.fromEntries([...v].map(([k,x])=>[k,this.plain(x)]));if(v instanceof Set)return [...v].map(x=>this.plain(x));if(Array.isArray(v))return v.map(x=>this.plain(x));return v;}
 snap(line,note,kind='statement'){
 if(this.trace.length>=this.limit)throw new JavaError(`Trace limit (${this.limit} steps). Use smaller inputs or check the loop.`,line);
 const frames=this.frames.map(f=>{let locals={};for(let s of f.scopes)for(let [k,v] of s)locals[k]=this.value(v);return {name:f.name,locals};});
 const heaps=[];for(let [obj,id] of this.heap){let type=obj instanceof Map?'HashMap':obj instanceof Set?'HashSet':Array.isArray(obj)?obj._javaType||'array':'object';let data=obj instanceof Map?[...obj].map(([k,v])=>[this.value(k),this.value(v)]):obj instanceof Set?[...obj].map(v=>this.value(v)):Array.isArray(obj)?obj.map(v=>this.value(v)):obj;heaps.push({id,type,data});}
 this.snapshotCells+=heaps.reduce((n,h)=>n+h.data.length,0)+frames.reduce((n,f)=>n+Object.keys(f.locals).length,0);if(this.snapshotCells>750000)throw new JavaError('Snapshot memory budget reached. Use a smaller input.',line);this.trace.push({line,note,kind,frames,heap:heaps});
 }
 frame(){return this.frames.at(-1);} lookup(name){if(['Math','Arrays','Integer','Long','Character','System'].includes(name))return {builtin:name};for(let s of [...this.frame().scopes].reverse())if(s.has(name))return s.get(name);throw new JavaError(`Unknown variable “${name}”.`);}
 scope(name){for(let s of [...this.frame().scopes].reverse())if(s.has(name))return s;throw new JavaError(`Unknown variable “${name}”.`);}
 tick(line){if(++this.ops>100000)throw new JavaError('Execution budget exceeded. Use smaller inputs.',line);}
 *evaluate(n){if(!n)return null;this.tick(n.line);const ev=x=>this.evaluate(x);
 switch(n.kind){case 'literal':return n.value;case 'id':return this.lookup(n.name);case 'array':{let a=[];for(let x of n.items)a.push(yield* ev(x));this.ref(a);return a;}
 case 'new':{let a;if(n.size){let z=yield* ev(n.size);if(!Number.isInteger(z)||z<0||z>512)throw new JavaError('Array size must be between 0 and 512.',n.line);a=Array(z).fill(n.type==='char'?'\0':n.type==='boolean'?false:0);}else{let args=[];for(let x of n.args||[])args.push(yield* ev(x));if(args.length)throw new JavaError('Only no-argument collection constructors are supported.',n.line);if(!/^(ArrayList|LinkedList|HashMap|HashSet|ArrayDeque|Stack)$/.test(n.type))throw new JavaError(`Unsupported constructor “${n.type}”.`,n.line);a=/Map/.test(n.type)?new Map():/Set/.test(n.type)?new Set():[];if(Array.isArray(a))Object.defineProperty(a,'_javaType',{value:n.type,configurable:true});}this.ref(a);return a;}
 case 'member':{let o=yield* ev(n.object);if(n.name==='length'&&(Array.isArray(o)||typeof o==='string'))return o.length;if(o?.builtin){if(n.name==='MAX_VALUE')return o.builtin==='Long'?Number.MAX_SAFE_INTEGER:2147483647;if(n.name==='MIN_VALUE')return o.builtin==='Long'?-Number.MAX_SAFE_INTEGER:-2147483648;}throw new JavaError(`Unsupported property “${n.name}”.`,n.line);}
 case 'index':{let o=yield* ev(n.object),i=yield* ev(n.index);this.bounds(o,i,n.line);return o[i];}
 case 'cast':{let v=yield* ev(n.expr);return n.type==='char'?String.fromCharCode(num(v)):n.type==='double'?num(v):Math.trunc(num(v));}
 case 'ternary':return (yield* ev(n.test))?yield* ev(n.yes):yield* ev(n.no);
 case 'unary':{if(n.op==='++'||n.op==='--'){let loc=yield* this.location(n.expr),v=num(loc.get());loc.set(v+(n.op==='++'?1:-1));return n.prefix?loc.get():v;}let v=yield* ev(n.expr);return n.op==='!'?!v:n.op==='-'?-num(v):num(v);}
 case 'binary':{let a=yield* ev(n.left);if(n.op==='&&'&&!a)return false;if(n.op==='||'&&a)return true;let b=yield* ev(n.right);if(n.op==='+'&&(this.stringExpr(n.left)||this.stringExpr(n.right)))return String(a)+String(b);return this.binary(n.op,a,b,n.line);}
 case 'assign':{let loc=yield* this.location(n.left),b=yield* ev(n.right);let v=n.op==='='?b:this.binary(n.op[0],loc.get(),b,n.line);loc.set(v);return v;}
 case 'call':{let args=[];if(n.callee.kind==='id'){for(let x of n.args)args.push(yield* ev(x));return yield* this.call(n.callee.name,args,n.line);}if(n.callee.kind!=='member')throw new JavaError('Unsupported call.',n.line);let o=yield* ev(n.callee.object);for(let x of n.args)args.push(yield* ev(x));return this.method(o,n.callee.name,args,n.line);}
 }throw new JavaError(`Unsupported expression ${n.kind}.`,n.line);}
 stringExpr(n){if(n.kind==='literal')return typeof n.value==='string'&&!n.char;if(n.kind==='id'){for(let s of [...this.frame().scopes].reverse())if(s.has(n.name))return s.types?.get(n.name)==='String';}if(n.kind==='binary'&&n.op==='+')return this.stringExpr(n.left)||this.stringExpr(n.right);if(n.kind==='call'){if(n.callee.kind==='id')return this.methods[n.callee.name]?.returnType==='String';return ['substring','toLowerCase'].includes(n.callee.name);}return false;}
 bounds(o,i,line){if(!(Array.isArray(o)||typeof o==='string')||!Number.isInteger(i)||i<0||i>=o.length)throw new JavaError(`Index ${i} is outside length ${o?.length??0}.`,line);}
 *location(n){if(n.kind==='id'){let s=this.scope(n.name);return {get:()=>s.get(n.name),set:v=>s.set(n.name,v)};}if(n.kind==='index'){let o=yield* this.evaluate(n.object),i=yield* this.evaluate(n.index);this.bounds(o,i,n.line);if(!Array.isArray(o))throw new JavaError('Strings cannot be mutated.',n.line);return {get:()=>o[i],set:v=>o[i]=v};}throw new JavaError('Expected a variable or array element.',n.line);}
 binary(op,a,b,line){switch(op){case '+':return num(a)+num(b);case '-':return num(a)-num(b);case '*':return num(a)*num(b);case '/':if(!num(b))throw new JavaError('Division by zero.',line);return Math.trunc(num(a)/num(b));case '%':return num(a)%num(b);case '<':return num(a)<num(b);case '>':return num(a)>num(b);case '<=':return num(a)<=num(b);case '>=':return num(a)>=num(b);case '==':return a===b;case '!=':return a!==b;case '&&':return !!(a&&b);case '||':return !!(a||b);}throw new JavaError(`Unsupported operator ${op}.`,line);}
 method(o,m,a,l){
 if(o?.builtin==='Math'){if(['max','min','abs','floor','ceil','sqrt','pow'].includes(m))return Math[m](...a);}
 if(o?.builtin==='Arrays'){if(m==='sort'){a[0].sort((x,y)=>x-y);return null;}if(m==='fill'){a[0].fill(a[1]);return null;}if(m==='equals')return JSON.stringify(a[0])===JSON.stringify(a[1]);if(m==='asList'){this.ref(a);Object.defineProperty(a,'_javaType',{value:'List'});return a;}}
 if(o?.builtin==='Character'){if(m==='isLetterOrDigit')return /^[a-zA-Z0-9]$/.test(a[0]);if(m==='toLowerCase')return a[0].toLowerCase();}
 if(o?.builtin==='Integer'&&m==='parseInt')return parseInt(a[0],10);
 if(typeof o==='string'){if(m==='length')return o.length;if(m==='charAt'){this.bounds(o,a[0],l);return o[a[0]];}if(m==='substring'){if(a[0]<0||(a[1]??o.length)>o.length)throw new JavaError('Invalid substring range.',l);return o.slice(...a);}if(m==='equals')return o===a[0];if(m==='toLowerCase')return o.toLowerCase();if(m==='toCharArray'){let x=[...o];this.ref(x);return x;}}
 if(o instanceof Map){if(m==='put'){let old=o.get(a[0])??null;o.set(a[0],a[1]);return old;}if(m==='get')return o.get(a[0])??null;if(m==='getOrDefault')return o.has(a[0])?o.get(a[0]):a[1];if(m==='containsKey')return o.has(a[0]);if(m==='remove'){let v=o.get(a[0])??null;o.delete(a[0]);return v;}if(m==='size')return o.size;if(m==='isEmpty')return !o.size;}
 if(o instanceof Set){if(m==='add'){let had=o.has(a[0]);o.add(a[0]);return !had;}if(m==='remove')return o.delete(a[0]);if(m==='contains')return o.has(a[0]);if(m==='size')return o.size;if(m==='isEmpty')return !o.size;}
 if(Array.isArray(o)){if(m==='size')return o.length;if(m==='isEmpty')return !o.length;if(m==='add'||m==='offer'){o.push(a[0]);return true;}if(m==='push'){o.push(a[0]);return a[0];}if(m==='pop')return o.pop()??null;if(m==='poll')return o.shift()??null;if(m==='peek')return o[o.length-1]??null;if(m==='get'){this.bounds(o,a[0],l);return o[a[0]];}if(m==='set'){this.bounds(o,a[0],l);let v=o[a[0]];o[a[0]]=a[1];return v;}if(m==='contains')return o.includes(a[0]);if(m==='remove'){this.bounds(o,a[0],l);return o.splice(a[0],1)[0];}}
 throw new JavaError(`Unsupported method “${m}”. See Java support.`,l);
 }
 *statement(n){this.tick(n.line);switch(n.kind){case 'empty':return;case 'block':{this.frame().scopes.push(new Map());try{for(let x of n.body){let flow=yield* this.statement(x);if(flow)return flow;}}finally{this.frame().scopes.pop();}return;}
 case 'decl':for(let x of n.items){let v=x.value?yield* this.evaluate(x.value):null;const scope=this.frame().scopes.at(-1);scope.set(x.name,v);scope.types??=new Map();scope.types.set(x.name,n.type);this.snap(n.line,`${x.name} = ${this.display(v)}`,'declare');}return;
 case 'expr':yield* this.evaluate(n.expr);this.snap(n.line,'Executed statement.');return;
 case 'if':{let v=yield* this.evaluate(n.test);this.snap(n.line,`Condition → ${!!v}`,v?'true':'false');return v?yield* this.statement(n.yes):n.no?yield* this.statement(n.no):undefined;}
 case 'while':while(true){let v=yield* this.evaluate(n.test);this.snap(n.line,`While condition → ${!!v}`,v?'true':'false');if(!v)break;let f=yield* this.statement(n.body);if(f?.kind==='return')return f;if(f?.kind==='break')break;}return;
 case 'for':{this.frame().scopes.push(new Map());try{if(n.init)yield* this.statement(n.init);while(true){let v=n.test?yield* this.evaluate(n.test):true;this.snap(n.line,`For condition → ${!!v}`,v?'true':'false');if(!v)break;let f=yield* this.statement(n.body);if(f?.kind==='return')return f;if(f?.kind==='break')break;for(let e of n.update){yield* this.evaluate(e);this.snap(e.line,'Advanced loop index.');}}}finally{this.frame().scopes.pop();}return;}
 case 'return':{let value=n.expr?yield* this.evaluate(n.expr):null;this.snap(n.line,`Return ${this.display(value)}`,'return');return {kind:'return',value};}
 case 'break':case 'continue':this.snap(n.line,n.kind);return {kind:n.kind};}throw new JavaError('Unsupported statement.',n.line);}
 display(v){return JSON.stringify(this.plain(v));}
 *call(name,args,line){let m=this.methods[name];if(!m)throw new JavaError(`Unknown method “${name}”.`,line);if(this.frames.length>=32)throw new JavaError('Call stack limit (32 frames).',line);if(args.length!==m.params.length)throw new JavaError(`“${name}” expects ${m.params.length} arguments.`,line);let scope=new Map(m.params.map((p,i)=>[p.name,args[i]]));scope.types=new Map(m.params.map(p=>[p.name,p.type]));this.frames.push({name,scopes:[scope]});for(let x of args)if(isObj(x))this.ref(x);this.snap(m.line,`Enter ${name}()`,'call');let f=yield* this.statement(m.body);this.frames.pop();return f?.value??null;}
}
export function executeJava(source,inputs,entry,limit=4000){const methods=parseJava(source),name=entry||Object.keys(methods)[0],m=methods[name];if(!m)throw new JavaError('Select a valid entry method.');if(!inputs||typeof inputs!=='object'||Array.isArray(inputs))throw new JavaError('Inputs must be a JSON object keyed by parameter name.');const args=m.params.map(p=>{if(!(p.name in inputs))throw new JavaError(`Missing input “${p.name}”.`,m.line);let v=structuredClone(inputs[p.name]);if(p.type.endsWith('[]')&&!Array.isArray(v))throw new JavaError(`“${p.name}” must be an array.`,m.line);if(p.type==='String'&&typeof v!=='string')throw new JavaError(`“${p.name}” must be a string.`,m.line);if(['int','long'].includes(p.type)&&!Number.isInteger(v))throw new JavaError(`“${p.name}” must be an integer.`,m.line);if((Array.isArray(v)||typeof v==='string')&&v.length>128)throw new JavaError('Use inputs with at most 128 items.');return v;});let vm=new VM(methods,limit),error=null,result;try{let g=vm.call(name,args,m.line),r=g.next();while(!r.done)r=g.next();result=vm.plain(r.value);}catch(e){error={message:e.message,line:e.line||vm.trace.at(-1)?.line||1};}return {steps:vm.trace,result,error,method:name,params:m.params,methods:Object.keys(methods)};}
