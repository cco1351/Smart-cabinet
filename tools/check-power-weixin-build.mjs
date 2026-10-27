import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import assert from 'node:assert/strict'
import {createPrototype as admin} from '../src/packages/teacher/powerAdmin.js'
import {createPrototype as approver} from '../src/packages/teacher/powerApprover.js'
const root=path.resolve('dist/build/mp-weixin')
const visited=new Set()
function check(file){
 if(visited.has(file))return
 assert.ok(fs.existsSync(file),'Missing WeChat module: '+file);visited.add(file)
 const source=fs.readFileSync(file,'utf8');new vm.Script(source,{filename:file})
 for(const [,dep] of source.matchAll(/require\(["']([^"']+)["']\)/g))if(dep.startsWith('.'))check(path.resolve(path.dirname(file),dep.endsWith('.js')?dep:dep+'.js'))
}
for(const page of ['power-admin','power-approver'])check(path.join(root,'packages/teacher/'+page+'.js'))
assert.ok(![...visited].some(file=>file.endsWith('power-stations.js')),'Must not depend on the newly introduced standalone module')
const exports={}
vm.runInNewContext(fs.readFileSync(path.join(root,'packages/teacher/power-layout.js'),'utf8'),{exports})
assert.equal(typeof exports.installPowerStations,'function')
for(const [name,factory,isAdmin] of [['powerAdmin',admin,true],['powerApprover',approver,false]]){
 const runtime=factory({alert(){}})
 try{
  const controller=exports.installPowerStations(runtime,{admin:isAdmin})
  assert.equal(runtime.document.querySelectorAll('[data-test="lab-card"]').length,6)
  controller.choose('302 实验室','off');controller.selectAll()
  assert.equal(controller.state.selected.size,14)
  const rules=JSON.parse(fs.readFileSync('src/packages/teacher/'+name+'.styles.json','utf8'))
  const tree=JSON.stringify(runtime.snapshot(exports.powerRules(rules,34)))
  assert.ok(tree.includes('实验室概览'));assert.ok(tree.includes('全选当前结果'))
 }finally{runtime.dispose()}
}
const component=JSON.parse(fs.readFileSync(path.join(root,'packages/teacher/PowerNode.json'),'utf8'))
assert.equal(component.usingComponents['power-node'],'./PowerNode')
console.log(`Verified ${visited.size} compiled WeChat dependencies, recursive component registration, and both compiled station controllers.`)
