import {parseHTML,Element,HTMLElement,HTMLInputElement,HTMLSelectElement} from './vendor/dom.js'
import {runExpression} from './expressions.js'
import {computeStyle,nativeStyle} from './styles.js'
const hosts=new WeakMap()
const listenerTypes=new WeakMap()
const nativeAddEventListener=Element.prototype.addEventListener
Element.prototype.addEventListener=function(type,listener,options){let types=listenerTypes.get(this);if(!types){types=new Set();listenerTypes.set(this,types)}types.add(type);return nativeAddEventListener.call(this,type,listener,options)}
const inner=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML')
Object.defineProperty(Element.prototype,'innerHTML',{...inner,set(v){inner.set.call(this,String(v??''))}})
Object.defineProperty(HTMLInputElement.prototype,'checked',{configurable:true,get(){return this.hasAttribute('checked')},set(v){this.toggleAttribute('checked',!!v)}})
Object.defineProperty(HTMLSelectElement.prototype,'value',{configurable:true,get(){const a=Array.from(this.querySelectorAll('option'));const o=a.find(x=>x.hasAttribute('selected'))||a[0];return o?(o.getAttribute('value')??o.textContent):''},set(v){Array.from(this.querySelectorAll('option')).forEach(o=>o.toggleAttribute('selected',(o.getAttribute('value')??o.textContent)===String(v)))}})
Object.defineProperty(HTMLSelectElement.prototype,'selectedIndex',{configurable:true,get(){return Array.from(this.options).findIndex(o=>o.value===this.value)},set(i){const o=this.options[i];if(o)this.value=o.value}})
HTMLElement.prototype.scrollIntoView=function(){}
HTMLElement.prototype.showPicker=function(){hosts.get(this.ownerDocument)?.datePicker(this)}
HTMLElement.prototype.click=function(){const h=hosts.get(this.ownerDocument);if(this.localName==='input'&&this.type==='file')return h?.chooseFiles(this);if(this.localName==='a')return h?.openLink(this);this.dispatchEvent(new (this.ownerDocument.defaultView.Event)('click',{bubbles:true}))}
class SearchParams{constructor(s=''){this.map=new Map(String(s).replace(/^\?/,'').split('&').filter(Boolean).map(x=>x.split('=').map(decodeURIComponent)))}get(k){return this.map.get(k)||null}set(k,v){this.map.set(k,String(v))}toString(){return Array.from(this.map).map(([k,v])=>encodeURIComponent(k)+'='+encodeURIComponent(v)).join('&')}}
class LocalURL{constructor(s){this.base=String(s).split('?')[0];this.searchParams=new SearchParams(String(s).split('?')[1]||'')}toString(){return this.base+'?'+this.searchParams}static createObjectURL(blob){return blob}static revokeObjectURL(){}}
export function createEnvironment(html,host){
 const parsed=parseHTML(html),document=parsed.document
 let scope,sequence=0,disposed=false,notifyTimer,version=0
 const ids=new WeakMap(),refs=new Map(),bound=new WeakMap(),timers=new Set(),intervals=new Set()
 function notify(){if(disposed)return;clearTimeout(notifyTimer);notifyTimer=setTimeout(()=>{version++;host.changed?.()},20)}
 const timeout=(fn,ms,...args)=>{const id=setTimeout(()=>{timers.delete(id);if(!disposed){try{fn(...args)}catch(e){host.error?.(e)}notify()}},ms);timers.add(id);return id}
 const interval=(fn,ms,...args)=>{const id=setInterval(()=>{if(!disposed){try{fn(...args)}catch(e){host.error?.(e)}notify()}},ms);intervals.add(id);return id}
 const location={href:'https://prototype.local/',search:''}
 const window={location,setTimeout:timeout,setInterval:interval,clearTimeout,clearInterval,innerWidth:390,innerHeight:780,addEventListener:(type,fn)=>document.addEventListener(type,fn)}
 const storage={getItem:k=>host.storage?.get(k)??null,setItem:(k,v)=>host.storage?.set(k,String(v)),removeItem:k=>host.storage?.remove(k)}
 class FileReader{readAsDataURL(file){this.result=file.path||file.tempFilePath;timeout(()=>this.onload?.({target:this}),0)}}
 class Blob{constructor(parts,options){this.parts=parts;this.type=options?.type}}
 hosts.set(document,{chooseFiles:async el=>{const files=await host.chooseFiles();el.files=files;emit(el,'change');notify()},openLink:el=>host.openLink?.(el.href,el.download),datePicker:el=>host.datePicker?.(el)})
 const globals={document,window,location,URL:LocalURL,URLSearchParams:SearchParams,localStorage:storage,sessionStorage:storage,setTimeout:timeout,setInterval:interval,clearTimeout,clearInterval,alert:m=>host.alert(m),confirm:m=>{host.alert(m);return false},FileReader,Blob,history:{replaceState(){}},Date,Math,Number,String,Boolean,Array,Object,JSON,Set,Map,parseInt,parseFloat,isNaN,encodeURIComponent,decodeURIComponent,undefined,console}
 Object.assign(window,globals,{window});window.document=document
 function bind(el){
  if(!scope)return
  const seen=bound.get(el)||{}
  for(const a of Array.from(el.attributes||[]))if(a.name.startsWith('on')){
   const type=a.name.slice(2);if(seen[type]===a.value)continue
   if(seen[type])continue
   const expression=a.value;seen[type]=expression;el.addEventListener(type,event=>{try{runExpression(expression,scope,el,event)}catch(e){host.error?.(e)}})
  }
  bound.set(el,seen)
 }
 function emit(el,type,extra={}){const ev=new parsed.Event(type,{bubbles:true,cancelable:true});Object.assign(ev,extra);el.dispatchEvent(ev)}
 function snapshot(rules){
  refs.clear()
  function visit(el,parent){
   if(el.nodeType===3)return el.textContent.trim()?{key:'t'+sequence++,kind:'text',text:el.textContent,actionKey:parent.__actionKey||''}:null
   if(el.nodeType!==1||['script','style','head','option','meta','link'].includes(el.localName))return null
   if(['roleSwitch','roleSummary','pageTabs'].includes(el.id)||el.classList.contains('toolbar'))return null
   const style=computeStyle(el,rules,parent);if(style.display==='none')return null
   bind(el)
   if(!ids.has(el))ids.set(el,'n'+sequence++)
   const key=ids.get(el);refs.set(key,el)
   const tag=el.localName,type=el.getAttribute('type')||'text'
   const kind=tag==='input'?(type==='checkbox'||type==='radio'?'check':type==='date'||type==='time'?'date':type==='file'?'file':'input'):tag==='select'?'select':tag==='textarea'?'textarea':tag==='img'?'image':tag==='video'?'video':tag==='br'?'br':'view'
   if(kind==='file')return null
   const clickable=!!el.getAttribute('onclick')||listenerTypes.get(el)?.has('click')||['button','a','label'].includes(tag)||!!el.closest('.organization-member-card,.organization-candidate-card')
   const actionKey=clickable?key:(parent.__actionKey||'')
   const data={key,kind,tag,style:nativeStyle(style),text:'',type,value:el.value||'',placeholder:el.getAttribute('placeholder')||'',disabled:!!el.disabled||el.hasAttribute('readonly'),checked:!!el.checked,maxlength:Number(el.getAttribute('maxlength')||140),src:el.getAttribute('src')||'',swipe:!!el.closest('.organization-member-card,.organization-candidate-card'),clickable,actionKey,children:[]}
   if(kind==='select'){data.options=Array.from(el.querySelectorAll('option')).map(o=>({value:o.getAttribute('value')??o.textContent,label:o.textContent,disabled:!!o.disabled}));data.index=Math.max(0,data.options.findIndex(o=>o.value===data.value));data.text=data.options[data.index]?.label||'请选择'}
   if(kind==='view')data.children=Array.from(el.childNodes).map(n=>visit(n,Object.assign({__actionKey:actionKey},style))).filter(Boolean)
   return data
  }
  return visit(document.body,{})
 }
 async function dispatch(payload){
  const el=refs.get(payload.key);if(!el||el.disabled||disposed)return
  try{
   if(payload.type==='input'||payload.type==='change'){
    if(el.localName==='select'){const option=el.options[Number(payload.value)];if(!option||option.disabled)return;el.value=option.value}else el.value=payload.value
    emit(el,payload.type)
   }else if(payload.type==='check'){
    if(el.type==='radio')document.querySelectorAll(`input[name="${el.name}"]`).forEach(x=>x.checked=false)
    el.checked=el.type==='radio'?true:!el.checked;emit(el,'change');emit(el,'click')
   }else if(payload.type==='tap'){
    // 微信 picker 的原生弹出层有时会把 tap 目标回报为外层遮罩；忽略该遮罩 tap，避免选择时间时弹层被误关闭。
    if(el.id==='timePickerModal'){notify();return}
    if(el.localName==='a')host.openLink?.(el.href,el.download)
    else if(el.localName==='label'&&el.querySelector('input')){const input=el.querySelector('input');if(input.type==='radio')document.querySelectorAll(`input[name="${input.name}"]`).forEach(x=>x.checked=false);input.checked=input.type==='radio'?true:!input.checked;emit(input,'change');emit(el,'click')}
    else emit(el,'click')
   }else {const point=payload.touches?.[0]||payload.changedTouches?.[0]||{};const type={touchstart:'pointerdown',touchmove:'pointermove',touchend:'pointerup',touchcancel:'pointercancel'}[payload.type]||payload.type;emit(el,type,{pointerType:'touch',pointerId:1,clientX:point.clientX??point.pageX,clientY:point.clientY??point.pageY,touches:payload.touches||[],changedTouches:payload.changedTouches||[]})}
  }catch(e){host.error?.(e)}
  notify()
 }
 return {globals,host,finish(s,current){scope=s;document.querySelectorAll('*').forEach(bind);return {document,scope,snapshot,dispatch,current,notify,dispose(){disposed=true;clearTimeout(notifyTimer);timers.forEach(clearTimeout);intervals.forEach(clearInterval);refs.clear()},version:()=>version}}}
}
