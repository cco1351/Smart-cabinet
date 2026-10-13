// 在逻辑层计算原型样式，组件层只接收原生支持的 style，无浏览器 DOM 依赖。
const inherited = ['color','font-size','font-family','font-weight','font-style','line-height','text-align','letter-spacing','white-space','visibility']
const inlineTags = new Set(['span','b','strong','em','i','small','a','label'])
export function computeStyle(el,rules,parent={}){
  const result={}; for(const [k,v] of Object.entries(parent))if(k.startsWith('--')||inherited.includes(k))result[k]=v
  result.display=inlineTags.has(el.localName)?'inline':'block'
  result['box-sizing']='border-box'
  if(el.localName==='input'&&!['checkbox','radio','file'].includes(el.type)){result.height='42px';result['min-width']='0'}
  if(el.localName==='textarea'){result.height='96px';result.width='100%'}
  if(el.localName==='select')result['min-height']='40px'
  if(['h1','h2','h3','h4'].includes(el.localName)){result['font-weight']='bold';result['font-size']=({h1:24,h2:20,h3:16,h4:14}[el.localName])+'px';result.margin='1em 0'}
  if(el.localName==='p')result.margin='1em 0'
  const priorities={}
  for(const r of rules){
    if(r.hint && !el.matches(r.hint))continue
    let match=false;try{match=r.selector===':root'?el.localName==='body':el.matches(r.selector)}catch{}
    if(!match)continue
    for(const [k,v,important] of r.values){const rank=r.rank+(important?100000:0);if((priorities[k]??-1)<=rank){priorities[k]=rank;result[k]=v}}
  }
  const inline=el.getAttribute('style')||''
  inline.split(';').forEach(x=>{const p=x.indexOf(':');if(p>0){const k=x.slice(0,p).trim(),v=x.slice(p+1).trim();if(!priorities[k]||priorities[k]<100000||v.includes('!important'))result[k]=v.replace(/!important/g,'').trim()}})
  if(el.hasAttribute('hidden'))result.display='none'
  if(el.id==='deviceResourceNotice')result.display='none'
  // 浏览器展示外框不属于小程序页面。
  if(el.classList.contains('shell'))Object.assign(result,{width:'100%',height:'100vh',margin:'0',border:'0','border-radius':'0','box-shadow':'none'})
  if(el.classList.contains('phone'))Object.assign(result,{width:'100%',height:'100vh','min-height':'100vh',border:'0','border-radius':'0','box-shadow':'none',margin:'0'})
  if(el.classList.contains('power-phone'))Object.assign(result,{width:'100%',height:'100vh','min-height':'100vh',border:'0','border-radius':'0','box-shadow':'none',margin:'0'})
  if(el.classList.contains('workspace')||el.classList.contains('prototype-main')||el.id==='appFrame')Object.assign(result,{width:'100%',padding:'0',margin:'0',display:'block','max-width':'100%'})
  if(el.classList.contains('tabbar'))Object.assign(result,{width:'100%',left:'0',right:'0',display:'flex','flex-direction':'row'})
  if(el.classList.contains('tab'))Object.assign(result,{flex:'1',width:'25%','min-width':'0',padding:'0',display:'flex','flex-direction':'column','align-items':'center','justify-content':'center','text-align':'center'})
  if(el.classList.contains('content')&&el.closest('.phone'))result.height='calc(100% - 52px)'
  if(el.classList.contains('content')&&el.closest('.power-phone')){result['padding-bottom']='80px';result['min-height']='calc(100% - 107px)'}
  if(el.classList.contains('status'))result.display='none'
  if(el.classList.contains('header')&&el.closest('.shell')){result.top='0';result.height='50px';result.padding='12px 14px'}
  if(el.classList.contains('top')&&el.closest('.phone'))result.top='0'
  return result
}
export function nativeStyle(style){
  const expand=v=>{let old;for(let i=0;i<8&&v!==old;i++){old=v;v=v.replace(/var\((--[\w-]+)(?:,\s*([^()]*))?\)/g,(_,k,f)=>style[k]??f??'inherit')}return v}
  return Object.entries(style).filter(([k])=>!k.startsWith('--')&&!['cursor','appearance','-webkit-appearance','font'].includes(k)).map(([k,v])=>k+':'+expand(String(v))).join(';')
}
