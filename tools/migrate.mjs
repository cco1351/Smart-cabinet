import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {fileURLToPath} from 'node:url'
import {parse} from 'acorn'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const student='D:/Desktop/研一/智能柜/小程序学生端/演示9.9.html'
const teacher='D:/Desktop/研一/智能柜/小程序教师端/原型框图'
const read=p=>fs.readFileSync(p,'utf8')
const write=(p,s)=>{p=path.join(root,p);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,s)}
const manifest=[]
function source(p,name){const s=read(p);write('reference/'+name,s);manifest.push({source:p,copy:'reference/'+name,sha256:crypto.createHash('sha256').update(s).digest('hex')});return s}
const sources={}
sources.student=source(student,'student.html')
sources.teacher=source(teacher+'/小程序/小程序管理员端页面线框图.html','teacher.html')
const teacherCSS=source(teacher+'/小程序/css/小程序管理员端页面线框图.css','teacher.css')
const teacherJS=['data','render','app'].map(k=>source(teacher+`/小程序/js/小程序管理员端页面线框图.${k}.js`,`teacher.${k}.js`)).join('\n')
sources.powerAdmin=source(teacher+'/admin-demo.html','power-admin.html')
sources.powerApprover=source(teacher+'/manager-demo-v2.html','power-approver.html')
function bindings(code){const out=[];for(const n of parse(code,{ecmaVersion:2022}).body){if(n.type==='FunctionDeclaration')out.push([n.id.name,true]);if(n.type==='VariableDeclaration')for(const d of n.declarations)if(d.id.type==='Identifier')out.push([d.id.name,n.kind!=='const'])}return out}
function cssRules(css){
 const out=[]
 postcss.parse(css).walkRules(rule=>{
  if(rule.parent.type==='atrule')return
  for(const sel of rule.selectors){
   if(/::|:hover|:focus|:active|:root/.test(sel)&&sel!==':root')continue
   let rank=0,hint=''
   selectorParser(s=>{
    s.walk(n=>{rank+=n.type==='id'?100:n.type==='class'||n.type==='attribute'||n.type==='pseudo'?10:n.type==='tag'?1:0})
    let tail=[];for(const n of s.first.nodes){if(n.type==='combinator')tail=[];else tail.push(n)}
    hint=tail.filter(n=>['class','id','tag'].includes(n.type)).map(n=>n.toString()).join('')
   }).processSync(sel)
   out.push({selector:sel,rank,hint,values:rule.nodes.filter(n=>n.type==='decl').map(n=>[n.prop,n.value,!!n.important])})
  }
 });return out
}
const catalog={}
for(const [kind,html] of Object.entries(sources)){
 const folder=kind==='student'?'student':'teacher'
 let code=kind==='teacher'?teacherJS:[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(x=>x[1]).join('\n')
 if(kind==='powerAdmin')code='var _apprTab;\n'+code
 const css=kind==='teacher'?teacherCSS:[...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]).join('\n')
 let body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
 const names=bindings(code)
 // 所有业务 JS 均在实例闭包内，两个身份之间不共享全局变量。
 let extras=''
 if(kind==='student')extras=`
 const prototypeShow=show; show=function(id,record){if(['login','forgetPassword'].includes(id)){env.host.authPage(id);return}prototypeShow(id,record);env.host.page(id)};
 logout=()=>env.host.logout();
 const rawChangePassword=changePassword; changePassword=()=>env.host.password(document.getElementById('changePwdOld').value,document.getElementById('changePwdNew').value,document.getElementById('changePwdConfirm').value);
 window.onload(); show('home',false);
 const person=document.querySelector('#profile h3');if(person)person.textContent=env.host.user.name;
 `
 if(kind==='teacher')extras=`
 currentRole=env.host.user.teacherPermission==='approver'?'approver':'admin';
 const rawOpen=openPage;openPage=function(id,options){rawOpen(id,options);env.host.page(uiState.currentPageId)};
 openPowerManagement=()=>env.host.power(currentRole);
 openPage(roleConfigs[currentRole].homeId,{pushHistory:false});
 `
 if(kind.startsWith('power'))extras=`returnToMiniApp=()=>env.host.backToTeacher();if(window.onload)window.onload();`
 const scope=`const scope={get(name){switch(name){${names.map(([n])=>`case ${JSON.stringify(n)}:return ${n};`).join('')}default:return env.globals[name]??document.getElementById(name)}},set(name,value){switch(name){${names.filter(x=>x[1]).map(([n])=>`case ${JSON.stringify(n)}:${n}=value;return value;`).join('')}default:throw Error('不可写变量 '+name)}}};`
 const prelude=`import {createEnvironment} from '../../runtime/environment.js';\nexport function createPrototype(host){const env=createEnvironment(${JSON.stringify(body)},host);const {document,window,location,URL,URLSearchParams,localStorage,sessionStorage,setTimeout,setInterval,clearTimeout,clearInterval,alert,confirm,FileReader,Blob}=env.globals;${kind==='teacher'?'const history=env.globals.history;':''}\n`
 // innerText 在轻量逻辑树中由 textContent 兼容实现；不改变业务内容。
 code=code.replace(/\.innerText/g,'.textContent')
 if(kind==='student')code=code.replace(/new Date\(([ab])\.(time|date)\)/g,'parsePrototypeDate($1.$2)')
 write(`src/packages/${folder}/${kind}.js`,(kind==='student'?"import {parsePrototypeDate} from '../../runtime/dates.js';\n":'')+prelude+code+'\n'+extras+'\n'+scope+`\nreturn env.finish(scope,()=>(${kind==='student'?'current':kind==='teacher'?'uiState.currentPageId':'"power"'}));}\n`)
 write(`src/packages/${folder}/${kind}.styles.json`,JSON.stringify(cssRules(css)))
 catalog[kind]=kind==='teacher'?[...code.matchAll(/id:\s*"([\w-]+)",\s*title:\s*"([^"]+)"/g)].map(m=>({id:m[1],title:m[2]})):[...html.matchAll(/<(?:section|div)\s+class="page[^\"]*"\s+id="([^"]+)"/g)].map(m=>({id:m[1]}))
}
write('reference/manifest.json',JSON.stringify(manifest,null,2));write('docs/page-inventory.json',JSON.stringify(catalog,null,2))
write('src/runtime/vendor/dom.js',read(path.join(root,'node_modules/linkedom/worker.js')))
write('src/runtime/vendor/LICENSE-linkedom',read(path.join(root,'node_modules/linkedom/LICENSE')))
console.log('Migrated',Object.fromEntries(Object.entries(catalog).map(([k,v])=>[k,v.length])))
