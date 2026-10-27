import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import {createPrototype} from '../src/packages/student/student.js'

const source=fs.readFileSync(new URL('../src/components/NativeNode.vue',import.meta.url),'utf8')
const script=source.match(/<script>([\s\S]*?)<\/script>/)[1]
const component=vm.runInNewContext(script.replace('export default','component ='),{component:null})
const rules=JSON.parse(fs.readFileSync(new URL('../src/packages/student/student.styles.json',import.meta.url)))
function find(node,predicate){
 if(predicate(node))return node
 for(const child of node.children||[]){const result=find(child,predicate);if(result)return result}
}
function bind(node,emit){
 const context={node,$emit:emit}
 for(const [name,method] of Object.entries(component.methods))context[name]=method.bind(context)
 return context
}
for(const [label,type] of [['待领取','pickup'],['待归还','return'],['待审批','approval'],['工位预约','reserve']]){
 test(label+' handles one physical tap once and stays open across rendering',async()=>{
  const runtime=createPrototype({user:{id:'test',name:'测试用户'},alert(){},page(){},error(e){throw e}})
  try{
   const tree=runtime.snapshot(rules)
   const labelNode=find(tree,n=>n.kind==='text'&&n.text.trim().startsWith(label)&&n.actionKey)
   assert.ok(labelNode,label+' navigation exists')
   const pending=[],events=[]
   const context=bind({key:labelNode.key,actionKey:labelNode.actionKey,kind:'view'},(name,event)=>{
    events.push(event);pending.push(runtime.dispatch(event))
   })
   context.touch('touchstart',{touches:[{clientX:10,clientY:10}]})
   context.touch('touchend',{changedTouches:[{clientX:10,clientY:10}]})
   context.send('tap')
   await Promise.all(pending)
   assert.equal(events.filter(e=>e.type==='tap').length,1,'touchend must not synthesize a second tap')
   assert.equal(runtime.scope.get('currentActivePanel'),type)
   for(let i=0;i<3;i++)runtime.snapshot(rules)
   assert.ok(runtime.document.getElementById('homeContentBox').classList.contains('open'))
   context.send('tap');await Promise.all(pending)
   assert.equal(runtime.scope.get('currentActivePanel'),'','A separate second tap closes the panel')
  }finally{runtime.dispose()}
 })
}
test('native touch events preserve swipe completion and ignore ordinary touch bubbling',()=>{
 const events=[]
 const context=bind({key:'row',actionKey:'row',kind:'view',swipe:true},(_,e)=>events.push(e.type))
 for(const type of ['touchstart','touchmove','touchend'])context.touch(type,{touches:[],changedTouches:[]})
 assert.deepEqual(events,['touchstart','touchmove','touchend'])
 events.length=0;context.node.swipe=false;context.touch('touchend',{})
 assert.deepEqual(events,[])
 context.node.disabled=true;context.send('tap')
 assert.deepEqual(events,[])
})
