import test from 'node:test'
import assert from 'node:assert/strict'
import {createPrototype as student} from '../src/packages/student/student.js'
import {createPrototype as teacher} from '../src/packages/teacher/teacher.js'
import {generateDemoAccessCode} from '../src/runtime/access-code.js'
const host=()=>({user:{id:'test',name:'测试用户',teacherPermission:'admin'},page(){},alert(){},error(e){throw e},backToTeacher(){}})

test('merged cabinet pickup/return cards hide RFID codes while preserving label codes',()=>{
 const r=student(host())
 try{
  for(const [fn,id] of [['renderContentPickup','homeContentBox'],['renderContentReturn','homeContentBox'],['renderPickupList','pickupListWrap']]){
   r.scope.get(fn)()
   const cards=[...r.document.getElementById(id).querySelectorAll('.card')]
   const rfid=cards.filter(c=>c.textContent.includes('RFID码'))
   const labeled=cards.filter(c=>c.textContent.includes('标签码'))
   assert.ok(rfid.length>0,fn+' includes an RFID example')
   assert.ok(labeled.length>0,fn+' includes a label example')
   for(const card of rfid)assert.equal(card.querySelector('.access-code'),null)
   for(const card of labeled)assert.match(card.querySelector('.access-code').textContent,/^\d{4}$/)
  }
 }finally{r.dispose()}
})
test('merged cabinet management uses two demo numeric codes and preserves the return destination',()=>{
 const r=teacher(host())
 try{
  for(const [page,name,back] of [['12-device-qr','数字示波器','09-device-detail'],['12-device-qr-direct','数字万用表','09c-label-direct-device-detail']]){
   r.scope.get('openPage')(page)
   const content=r.document.querySelector('.phone[data-id="'+page+'"]')
   assert.ok(content)
   assert.equal(content.querySelectorAll('.qr-grid').length,0)
   const codes=[...content.querySelectorAll('.access-code')].map(n=>n.textContent)
   assert.deepEqual(codes,['领取','归还'].map(type=>generateDemoAccessCode(type,name,'C 柜')))
   const button=[...content.querySelectorAll('.fixed-actions .btn')].find(n=>n.textContent.includes('返回设备详情'))
   assert.ok(button)
   button.click()
   assert.ok(r.document.querySelector('.phone[data-id="'+back+'"]'))
  }
 }finally{r.dispose()}
})
