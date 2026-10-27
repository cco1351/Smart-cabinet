import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createPrototype as admin} from '../src/packages/teacher/powerAdmin.js'
import {createPrototype as approver} from '../src/packages/teacher/powerApprover.js'
import {powerRules} from '../src/packages/teacher/power-layout.js'
import {addPowerDemoRecords} from '../src/packages/teacher/power-demo.js'
import {computeStyle} from '../src/runtime/styles.js'
for(const [kind,factory] of [['powerAdmin',admin],['powerApprover',approver]]){
 test(kind+' renders managers on first entry and after returning from another page',()=>{
  const r=factory({alert(){}});try{
   const navigate=r.scope.get(kind==='powerAdmin'?'goTab':'switchTab')
   const subTab=r.scope.get(kind==='powerAdmin'?'mgrTab':'manageTab')
   const content=r.document.getElementById(kind==='powerAdmin'?'mgrContent':'manageContent')
   navigate(2)
   assert.ok(content.textContent.includes('张老师'))
   assert.ok(content.textContent.includes('刘队长'))
   subTab('courses')
   assert.ok(!content.textContent.includes('学号:'))
   navigate(3);navigate(2)
   assert.ok(content.textContent.includes('张老师'))
   assert.ok(content.textContent.includes('刘队长'))
   if(kind==='powerAdmin'){
    assert.ok(r.document.getElementById('mtb-mgr').classList.contains('sel'))
    const managers=r.scope.get('MGS')
    managers.splice(0,managers.length,{id:'cached-manager',name:'缓存管理者',phone:'13800000000',rooms:['301 实验室']})
    navigate(0);navigate(2)
    assert.ok(content.textContent.includes('缓存管理者'))
    assert.ok(!content.textContent.includes('张老师'))
    managers.splice(0);navigate(3);navigate(2)
    assert.ok(content.textContent.includes('暂无管理者'))
   }
  }finally{r.dispose()}
 })
 test(kind+' separates approval results without changing records or room permissions',()=>{
  const r=factory({alert(){}});try{
   addPowerDemoRecords(r)
   const records=r.scope.get('RS'),before=JSON.stringify(records)
   const show=r.scope.get(kind==='powerAdmin'?'apprTab':'approvalTab')
   const content=r.document.getElementById(kind==='powerAdmin'?'aprContent':'approvalContent')
   const visible=kind==='powerAdmin'?records:records.filter(x=>r.scope.get('MANAGER_ROOMS').includes(x.location))
   const count=status=>visible.filter(x=>x.status===status).length
   show('done')
   assert.equal(content.querySelector('.approved').textContent,'已通过 '+count('approved'))
   assert.equal(content.querySelector('.rejected').textContent,'已驳回 '+count('rejected'))
   assert.equal(content.querySelectorAll('.ap-card,.approval-card').length,count('approved'))
   assert.equal(content.querySelectorAll('.ap-tag.no,.ac-status-tag.fail').length,0)
   assert.ok(content.querySelector('.approved.active'))
   show('rejected')
   assert.equal(content.querySelectorAll('.ap-card,.approval-card').length,count('rejected'))
   assert.equal(content.querySelectorAll('.ap-tag.ok,.ac-status-tag.ok').length,0)
   assert.ok(content.querySelector('.rejected.active'))
   assert.ok(content.textContent.includes('驳回原因'))
   show('pending')
   assert.equal(content.querySelector('.approval-result-tabs'),null)
   assert.equal(content.querySelectorAll('.ap-card,.approval-card').length,count('pending_review'))
   assert.equal(JSON.stringify(records),before,'Filtering must not mutate persisted approval records')
   records.splice(0)
   for(const [tab,label] of [['approved','已通过'],['rejected','已驳回']]){
    show(tab)
    assert.ok(content.textContent.includes('暂无'+label+'记录'))
    assert.equal(content.querySelectorAll('.approval-result-filter').length,2)
   }
  }finally{r.dispose()}
 })
 test(kind+' aligns approval actions and keeps only the right-aligned export action',()=>{
  const r=factory({alert(){}});try{
   const rules=powerRules(JSON.parse(fs.readFileSync(new URL('../src/packages/teacher/'+kind+'.styles.json',import.meta.url))))
   r.scope.get(kind==='powerAdmin'?'goTab':'switchTab')(1)
   const buttons=[...r.document.querySelectorAll('.ap-btns .ap-btn,.ac-actions .ac-btn')]
   assert.ok(buttons.length>=2)
   for(const button of buttons){const style=computeStyle(button,rules);assert.equal(style.flex,'1');assert.equal(style.height,'40px');assert.equal(style.margin,'0')}
   for(const sub of ['alarms','logs']){
    r.scope.get('openSub')(sub)
    const container=r.document.getElementById('sub-'+sub)
    assert.equal(container.querySelector('.range-count'),null,'Record count must not be generated, not just hidden by styles')
    assert.equal(container.querySelector('.range-bar').children.length,2,'Toolbar contains only the date filter and export action')
    assert.equal(computeStyle(container.querySelector('.range-bar'),rules)['justify-content'],'space-between')
    assert.equal(computeStyle(container.querySelector('.header-export,.export-btn'),rules)['margin-left'],'auto')
    assert.ok(container.querySelector('.range-select'))
   }
  }finally{r.dispose()}
 })
 test(kind+' keeps original navigation and only adjusts safe areas',()=>{
  const r=factory({alert(){}});try{
   const original=JSON.parse(fs.readFileSync(new URL('../src/packages/teacher/'+kind+'.styles.json',import.meta.url)))
   const tree=JSON.stringify(r.snapshot(powerRules(original,34)))
   assert.ok(!tree.includes('9:41'))
   assert.ok(tree.includes('padding-bottom:34px'))
   assert.ok(tree.includes('height:98px'))
   assert.deepEqual([...r.document.querySelectorAll('.tab-bar .tab-text')].map(x=>x.textContent),['工位','审批','管理','我的'])
   assert.equal(r.document.querySelectorAll('#roomTabs .room-tab').length,6)
   assert.ok(r.document.querySelector('.dev-chk,.dev-item-check')||kind==='powerApprover')
  }finally{r.dispose()}
 })
 test(kind+' adds labeled demo cases without duplicating or replacing existing records',()=>{
  const r=factory({alert(){}});try{
   const list=r.scope.get('RS'),initial=list.length,old=list[0]
   addPowerDemoRecords(r,new Date(2026,11,31,0,5))
   assert.equal(list.length,initial+4);assert.equal(list[0],old)
   const demo=list.find(x=>x.id==='power-demo-res-01')
   assert.equal(demo.date,'2027-01-01');demo.status='approved'
   addPowerDemoRecords(r,new Date(2026,11,31,0,5))
   assert.equal(list.length,initial+4);assert.equal(demo.status,'approved')
   const alerts=r.scope.get('ALARMS')||r.scope.get('alarms')
   assert.equal(alerts.filter(x=>x.id.startsWith('power-demo-')).length,3)
   assert.ok(alerts.find(x=>x.id==='power-demo-alarm-03').time.startsWith('2026-12-30'))
  }finally{r.dispose()}
 })
}
test('power-only renderer emits no synthetic second touchend tap',()=>{
 const source=fs.readFileSync(new URL('../src/packages/teacher/PowerNode.vue',import.meta.url),'utf8')
 assert.ok(!source.includes("if(type==='touchend'"))
 assert.ok(source.includes("import PowerNode from './PowerNode.vue'"),'WeChat recursion requires explicit component registration')
 assert.ok(source.includes('components:{PowerNode}'))
})
