import test from 'node:test'
import assert from 'node:assert/strict'
import {createPrototype as admin} from '../src/packages/teacher/powerAdmin.js'
import {createPrototype as approver} from '../src/packages/teacher/powerApprover.js'
import {installPowerStations} from '../src/packages/teacher/power-stations.js'
for(const [name,factory,isAdmin] of [['admin',admin,true],['approver',approver,false]]){
 test(name+' accordion, filtering, selection and unchanged surrounding pages',async()=>{
  const r=factory({alert(){}}),notes=[]
  try{
   const before=r.document.querySelector('.tab-bar').outerHTML
   const c=installPowerStations(r,{admin:isAdmin,confirm:async()=>true,message:m=>notes.push(m)})
   assert.equal(r.document.querySelectorAll('[data-test="lab-card"]').length,6)
   assert.equal(r.document.querySelectorAll('[data-test="station-row"]').length,0)
   assert.equal(r.document.querySelector('.tab-bar').outerHTML,before)
   c.choose('302 实验室','off');c.selectAll()
   assert.equal(c.state.selected.size,c.visible().length)
   assert.ok(c.visible().every(x=>x.status==='off'))
   c.choose('301 实验室','all');assert.equal(c.state.selected.size,0)
   if(!isAdmin){c.selectAll();assert.equal(c.state.selected.size,0);assert.equal(c.plan('301 实验室','off','room').ids.length,0)}
   c.choose('302 实验室','offline');assert.ok(c.visible().every(x=>x.status==='offline'));c.selectAll();assert.equal(c.state.selected.size,0)
   c.choose('302 实验室','off');c.selectAll()
   const expected=c.plan('302 实验室','on').ids.length
   const other=(r.scope.get('SS')||r.scope.get('STATIONS')).filter(x=>x.location!=='302 实验室').map(x=>x.status)
   await c.power('on');assert.ok(notes.at(-1).includes(String(expected)))
   assert.deepEqual((r.scope.get('SS')||r.scope.get('STATIONS')).filter(x=>x.location!=='302 实验室').map(x=>x.status),other)
   assert.equal(c.state.selected.size,0)
   const logs=r.scope.get('LOGS')||r.scope.get('logs');assert.equal(logs[0].lab,'302 实验室')
   c.choose('302 实验室','all',true);assert.equal(c.state.room,null)
  }finally{r.dispose()}
 })
}
test('cancel, duplicate submission, and changed device state do not execute power changes',async()=>{
 const r=admin({alert(){}})
 try{
  let accept;const messages=[]
  const c=installPowerStations(r,{admin:true,confirm:()=>new Promise(resolve=>accept=resolve),message:m=>messages.push(m)})
  c.choose('301 实验室','off');c.selectAll()
  const targets=c.plan('301 实验室','on').ids
  let pending=c.power('on');assert.equal(c.state.busy,true);await c.power('on');accept(false);await pending
  assert.ok(r.scope.get('SS').filter(x=>targets.includes(x.id)).every(x=>x.status==='off'))
  pending=c.power('on');r.scope.get('SS').find(x=>x.id===targets[0]).status='offline';accept(true);await pending
  assert.ok(messages.at(-1).includes('状态或权限已变化'))
  assert.ok(r.scope.get('SS').filter(x=>targets.slice(1).includes(x.id)).every(x=>x.status==='off'))
 }finally{r.dispose()}
})
test('whole-room plan skips offline, fault, isolated and course-held stations',()=>{
 const r=admin({alert(){}})
 try{
  const c=installPowerStations(r,{admin:true}),ss=r.scope.get('SS').filter(x=>x.location==='301 实验室')
  ss[0].isolated=true;ss[1].courseActive=true;ss[2].status='fault'
  const p=c.plan('301 实验室','off','room')
  assert.ok(p.blocked>=5);assert.ok(!p.ids.includes(ss[0].id));assert.ok(!p.ids.includes(ss[1].id));assert.ok(!p.ids.includes(ss[2].id))
 }finally{r.dispose()}
})
