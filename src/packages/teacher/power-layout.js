// Keep the station controller in this existing module: WeChat incremental reloads
// may retain an old module registry when a new standalone chunk is introduced.
// Only the station page is replaced. Original navigation and other pages stay intact.
export function installPowerStations(runtime,{admin=false,user={},demo=true,confirm=async()=>false,message=()=>{}}={}){
 const d=runtime.document,s=runtime.scope,page=d.getElementById(admin?'pg-stations':'page-stations')
 const stations=()=>s.get(admin?'SS':'STATIONS')||[]
 const rooms=()=>s.get(admin?'ALL_R':'ALL_ROOMS')||[]
 const allowed=room=>admin||(s.get('MANAGER_ROOMS')||[]).includes(room)
 const usable=station=>['on','off'].includes(station.status)&&!station.isolated&&!station.disabled&&!station.courseActive
 const state={room:null,filter:'all',selected:new Set(),busy:false}
 for(const child of [...page.children])child.setAttribute('hidden','')
 const root=d.createElement('div');root.id='power-lab-list';root.setAttribute('style','padding:12px');page.append(root)
 const css={muted:'font-size:12px;color:#71818b;line-height:1.6',row:'display:flex;align-items:center;justify-content:space-between;gap:10px',button:'border:0;border-radius:8px;padding:9px 12px;font-size:12px;font-weight:600;line-height:1.5;margin:0;'}
 const node=(parent,tag,text,style='',id='')=>{const el=d.createElement(tag);if(text!==null)el.textContent=text;if(style)el.setAttribute('style',style);if(id)el.setAttribute('data-test',id);parent.append(el);return el}
 const button=(parent,label,fn,style='',disabled=false,id='')=>{const el=node(parent,'button',label,css.button+style,id);if(disabled)el.setAttribute('disabled','');el.addEventListener('click',e=>{e.stopPropagation();if(disabled||state.busy)return;Promise.resolve(fn()).catch(()=>message('操作未完成，请重试'))});return el}
 const list=room=>stations().filter(x=>x.location===room)
 const visible=()=>list(state.room).filter(x=>state.filter==='all'||x.status===state.filter)
 function choose(room,filter='all',toggle=false){state.room=toggle&&state.room===room?null:room;state.filter=filter;state.selected.clear();render()}
 function selectAll(){state.selected=new Set(allowed(state.room)?visible().filter(usable).map(x=>x.id):[]);render()}
 function plan(room,target,scope='selected',id){
  const candidates=scope==='room'?list(room):scope==='single'?list(room).filter(x=>x.id===id):visible().filter(x=>state.selected.has(x.id)&&x.location===room)
  const eligible=allowed(room)?candidates.filter(usable):[]
  return {room,target,scope,ids:eligible.filter(x=>x.status!==target).map(x=>x.id),blocked:candidates.length-eligible.length,unchanged:eligible.filter(x=>x.status===target).length}
 }
 async function power(target,scope='selected',id){
  if(state.busy)return
  if(!demo){message('真实设备控制尚未接入，未发送操作指令');return}
  const p=plan(state.room,target,scope,id)
  if(!p.ids.length){message('没有可执行此操作的工位');return}
  const action=target==='on'?'通电':'断电'
  state.busy=true;render()
  try{
   const ok=await confirm(`【演示】${p.room}\n范围：${scope==='room'?'整间实验室':scope==='single'?'单个工位':'已选工位'}\n将${action} ${p.ids.length} 个工位\n跳过不可操作 ${p.blocked} 个，已是目标状态 ${p.unchanged} 个。\n仅模拟操作，不向真实设备发送指令。`)
   if(!ok)return
   const targets=p.ids.map(id=>stations().find(x=>x.id===id))
   if(!allowed(p.room)||targets.some(x=>!x||x.location!==p.room||!usable(x)||x.status===target)){message('工位状态或权限已变化，请重新选择');return}
   const logs=s.get(admin?'LOGS':'logs'),now=new Date(),pad=n=>String(n).padStart(2,'0')
   const time=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
   for(const [index,x] of targets.entries()){
    x.status=target;x.voltage=target==='on'?220:0;x.current=0;x.power=0
    logs?.unshift({id:`power-lab-${Date.now()}-${index}`,time,stationName:x.name,lab:p.room,action:`【演示】远程${action}`,actionType:'remote_'+target,source:'电源工位页',operator:user.name||'演示管理员',result:'成功'})
   }
   state.selected.clear();message(`演示：已模拟${action} ${targets.length} 个工位`)
  }finally{state.busy=false;render()}
 }
 function render(){
  root.innerHTML=''
  node(root,'div','实验室概览','font-size:17px;font-weight:700;margin:2px 2px 5px;color:#162127')
  node(root,'div','点击实验室展开工位，点击状态数字筛选',css.muted+';margin:0 2px 12px')
  for(const room of rooms()){
   const all=list(room),open=state.room===room,can=allowed(room)
   const card=node(root,'div',null,'background:#fff;border:1px solid #dbe5e8;border-radius:14px;margin-bottom:12px;overflow:hidden', 'lab-card')
   const head=node(card,'div',null,css.row+';padding:15px 14px', 'lab-heading')
   head.addEventListener('click',()=>{if(!state.busy)choose(room,'all',true)})
   const title=node(head,'div',null)
   node(title,'div',room,'font-size:16px;font-weight:700;color:#203a35')
   node(title,'div',`${all.length} 个工位 · ${can?'可管理':'仅查看'}`,css.muted+';margin-top:4px')
   node(head,'span',open?'收起 ⌃':'展开 ⌄','font-size:12px;color:#16826c')
   const chips=node(card,'div',null,'display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 12px')
   for(const [key,label,color] of [['all','全部','#516771'],['on','通电','#16826c'],['off','断电','#687782'],['fault','故障','#bc3f4f'],['offline','离线','#b87918']]){
    const count=key==='all'?all.length:all.filter(x=>x.status===key).length,active=open&&state.filter===key
    button(chips,`${label} ${count}`,()=>choose(room,key),'padding:6px 9px;color:'+color+';background:'+(active?'#e3f2ec':'#f4f7f8')+';border:1px solid '+(active?color:'transparent'),false,'filter-'+key)
   }
   if(!open)continue
   const panel=node(card,'div',null,'border-top:1px solid #edf1f3;padding:12px')
   if(can){
    const bulk=node(panel,'div',null,css.row+';margin-bottom:10px')
    node(bulk,'span','整间实验室',css.muted)
    const actions=node(bulk,'div',null,'display:flex;gap:8px')
    button(actions,'整间通电',()=>power('on','room'),'color:#16826c;background:#edf8f3',!all.some(x=>usable(x)&&x.status==='off'),'room-on')
    button(actions,'整间断电',()=>power('off','room'),'color:#bc3f4f;background:#fef2f2',!all.some(x=>usable(x)&&x.status==='on'),'room-off')
    node(panel,'div','故障、离线、隔离或课程占用的工位不参与操作',css.muted+';font-size:11px;margin-bottom:10px')
    const selection=node(panel,'div',null,'display:flex;gap:8px;flex-wrap:wrap;align-items:center')
    button(selection,'全选当前结果',selectAll,'color:#16826c;background:#edf8f3',!visible().some(usable),'select-all')
    button(selection,'取消选择',()=>{state.selected.clear();render()},'color:#687782;background:#f4f7f8',!state.selected.size,'clear')
    node(selection,'span',`已选 ${state.selected.size} 个`,css.muted)
    const batch=node(panel,'div',null,'display:flex;gap:10px;margin:10px 0')
    button(batch,'批量通电',()=>power('on'),'flex:1;color:#fff;background:'+(state.selected.size?'#16826c':'#b6c7c1'),!state.selected.size,'batch-on')
    button(batch,'批量断电',()=>power('off'),'flex:1;color:#bc3f4f;background:#fef2f2',!state.selected.size,'batch-off')
   }else node(panel,'div','此实验室仅可查看，无法进行通断电操作。',css.muted+';margin-bottom:12px')
   const rows=visible()
   if(!rows.length)node(panel,'div','当前筛选下暂无工位',css.muted+';text-align:center;padding:24px 0')
   for(const x of rows){
    const row=node(panel,'div',null,css.row+';padding:13px 0;border-top:1px solid #edf1f3','station-row')
    if(can&&usable(x))button(row,state.selected.has(x.id)?'☑':'□',()=>{state.selected.has(x.id)?state.selected.delete(x.id):state.selected.add(x.id);render()},'padding:4px;color:#16826c;font-size:22px;background:transparent',false,'select-'+x.id)
    const detail=node(row,'div',null,'flex:1;min-width:0')
    node(detail,'div',x.name,'font-size:14px;font-weight:600;color:#162127')
    node(detail,'div',({on:'通电',off:'断电',fault:'故障',offline:'离线'}[x.status]||'状态未知')+(x.isolated?' · 已隔离':x.courseActive?' · 课程占用':''),css.muted+';margin-top:3px')
    if(x.status==='on')node(detail,'div',`${x.voltage}V · ${x.current}A · ${x.power}W`,css.muted+';font-size:11px')
    if(can&&usable(x))button(row,x.status==='on'?'断电':'通电',()=>power(x.status==='on'?'off':'on','single',x.id),'color:'+(x.status==='on'?'#bc3f4f':'#16826c')+';background:'+(x.status==='on'?'#fef2f2':'#edf8f3'),false,'power-'+x.id)
    else node(row,'span',can?'不可操作':'仅查看',css.muted)
   }
  }
  if(!rooms().length)node(root,'div','暂无实验室',css.muted)
  runtime.notify()
 }
 render()
 return {state,choose,selectAll,visible,plan,power,render}
}

// Preserve the original UI; only adjust safe-area layout and redundant simulated status.
export function powerRules(rules,bottom=0){
 const add=(selector,values)=>({selector,rank:9000,values:Object.entries(values).map(([k,v])=>[k,v,true])})
 return [...rules,
 add('body',{display:'block',padding:'0','padding-bottom':'0',margin:'0',background:'#edf1f4','min-height':'0',width:'100%'}),
 add('.module-status,.module-level',{display:'none'}),
 add('.module-header',{'grid-template-columns':'1fr 76px','flex-shrink':'0'}),
 add('.banner,.role-banner',{'flex-shrink':'0','flex-wrap':'wrap',gap:'6px'}),
 add('.power-phone',{display:'flex','flex-direction':'column'}),
 add('.power-phone > .page',{flex:'1','min-height':'0',height:'0','overflow-y':'auto','padding-bottom':'12px'}),
 add('.power-phone .tab-bar',{position:'relative',width:'100%',margin:'0',height:(64+bottom)+'px','padding-bottom':bottom+'px','flex-shrink':'0'}),
 add('.room-tab',{'flex-shrink':'0'}),
 add('.ap-btns,.ac-actions',{'justify-content':'space-between',gap:'12px','padding-top':'12px'}),
 add('.approval-result-tabs',{display:'flex',gap:'10px','margin-bottom':'14px'}),
 add('.approval-result-filter',{flex:'1',width:'0','min-width':'0',margin:'0',padding:'10px 6px',border:'1px solid #e0e9e6','border-radius':'10px',background:'#fff',color:'#73827e','font-size':'14px','font-weight':'600','line-height':'20px','text-align':'center'}),
 add('.approval-result-filter.approved.active',{background:'#e8f5ef',color:'#16826c',border:'1px solid #16826c'}),
 add('.approval-result-filter.rejected.active',{background:'#fff0f1',color:'#c44350',border:'1px solid #d76772'}),
 add('.ap-btns .ap-btn,.ac-actions .ac-btn',{flex:'1',width:'0','min-width':'0',height:'40px',margin:'0',padding:'0 12px',display:'flex','align-items':'center','justify-content':'center','line-height':'normal'}),
 add('.range-bar .header-export,.range-bar .export-btn',{'margin-left':'auto','margin-right':'0','flex-shrink':'0'}),
 add('.power-demo-label',{'font-size':'10px',color:'#71837c','margin-left':'auto'})]
}
