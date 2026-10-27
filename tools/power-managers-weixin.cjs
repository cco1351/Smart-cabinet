const automator=require('miniprogram-automator')
;(async()=>{
 const mini=await automator.connect({wsEndpoint:'ws://127.0.0.1:9420'})
 try{
  console.log('PAGE',(await mini.currentPage())?.path)
  if((await mini.currentPage())?.path!=='packages/teacher/power-admin'){
   await mini.evaluate(()=>{wx.navigateTo({url:'/packages/teacher/power-admin'});return true})
  }
  await new Promise(resolve=>setTimeout(resolve,1800))
  console.log('POWER PAGE',(await mini.currentPage())?.path)
  console.log('STATE',await mini.evaluate(()=>{
   const v=getCurrentPages().slice(-1)[0].$vm,r=v?._runtime
   return {failed:v?.failed,hasRuntime:!!r,managers:r?.scope.get('MGS')?.length,
    hasEnterHandler:String(r?.scope.get('goTab')).includes("managers"),
    handler:String(r?.scope.get('goTab')),
    cards:r?.document.getElementById('mgrContent')?.children.length}
  }))
  await mini.evaluate(async()=>{
   const v=getCurrentPages().slice(-1)[0].$vm,r=v._runtime
   const tab=r.document.getElementById('tab2')
   // Dispatch the rendered navigation target through the same page action as a tap.
   const key=find(v.tree)
   function find(n){if(n?.actionKey&&n.children?.some(c=>c.text==='管理'))return n.actionKey;for(const c of n.children||[]){const k=find(c);if(k)return k}}
   if(!key)throw new Error('Management navigation target missing')
   await v.action({key,type:'tap'})
   return true
  })
  await new Promise(resolve=>setTimeout(resolve,700))
  console.log('AFTER TAP',await mini.evaluate(()=>{
   const v=getCurrentPages().slice(-1)[0].$vm,r=v._runtime
   return {failed:v.failed,active:r.document.getElementById('pg-manage').className,
    cards:r.document.getElementById('mgrContent').children.length,
    inTree:JSON.stringify(v.tree).includes('张老师')}
  }))
  await mini.screenshot({path:'docs/screenshots/power-admin-managers-native.png'})
 }finally{mini.disconnect()}
})().catch(e=>{console.error(e);process.exitCode=1})
