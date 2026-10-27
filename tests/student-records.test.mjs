import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import {createPrototype} from '../src/packages/student/student.js'
import {persistSelectedMedia} from '../src/runtime/media.js'

const storage = new Map()
const session = {user:{id:'records-test',name:'测试学生',roles:['student'],personType:'student'}}
const uni = {getStorageSync:key=>storage.get(key),setStorageSync:(key,value)=>storage.set(key,value),showModal(){},showToast(){}}
const source = fs.readFileSync(new URL('../src/runtime/page.js',import.meta.url),'utf8')
const nativePage = vm.runInNewContext(source.replace(/^import .*$/gm,'').replace('export function nativePage','function nativePage')+'\nnativePage',{
  uni,session,NativeNode:null,markRaw:x=>x,guard:async()=>true,hasRole:role=>role==='student',
  switchRole(){},logout(){},changePassword(){},safeReLaunch(){},persistSelectedMedia,console
})
function boot(){
  const definition=nativePage(createPrototype,[],'student')
  const page={...definition.data(),_query:{}}
  for(const [name,fn] of Object.entries(definition.methods))page[name]=fn.bind(page)
  page.boot()
  return page
}
function orders(runtime){runtime.scope.get('show')('orderRecords');return [...runtime.document.querySelectorAll('#orderListWrap .order-card')]}

test('new device orders have unique numbers, appear in records, cancel and survive page recreation',()=>{
  storage.clear()
  const page=boot(),r=page._runtime
  const before=orders(r).length
  for(const name of ['函数信号发生器','函数信号发生器','数字示波器']){
    r.scope.set('pendingDevice',name)
    r.scope.get('submitBorrow')()
  }
  assert.equal(orders(r).length,before+3)
  const created=r.scope.get('deviceOrderData').slice(-3)
  assert.equal(new Set(created.map(x=>x.orderNo)).size,3)
  r.scope.get('cancelApproval')(0)
  assert.equal(created[2].status,'已取消')
  page.saveState();r.dispose()
  const restored=boot()
  try{
    assert.equal(orders(restored._runtime).length,before+3)
    assert.equal(restored._runtime.scope.get('deviceOrderData').at(-1).status,'已取消')
  }finally{restored._runtime.dispose()}
})

test('new workstation request is recorded once, highlights its date, filters and survives recreation',()=>{
  storage.clear()
  const page=boot(),r=page._runtime,d=r.document
  const call=(name,...args)=>r.scope.get(name)(...args)
  const day=new Date(Date.now()+10*864e5),date=call('formatDateDisplay',day)
  call('show','reserveStep1');d.getElementById('reserveDate').value=date;call('onDateChange')
  d.getElementById('startTime').value='08:00';call('onStartTimeChange')
  d.getElementById('endTime').value='10:00';call('onEndTimeChange');call('onNextToLabs')
  call('onSelectLab',r.scope.get('availableLabs')[0].name)
  call('onSelectStation',r.scope.get('availableStations')[0].id)
  r.scope.set('purpose','订单与日期筛选验证');call('onSubmitReserve')
  const request=r.scope.get('pendingReserveApprovals').at(-1)
  assert.equal(call('getReservationOrders').filter(x=>x.orderNo===request.orderNo).length,1)
  call('show','orderRecords');d.getElementById('orderDate').value=date;call('renderOrderList')
  assert.ok(d.getElementById('orderListWrap').textContent.includes(request.orderNo))
  call('toggleOrderCalendar')
  const dayCell=[...d.getElementById('orderCalendarGrid').children].find(x=>x.textContent===String(day.getDate()))
  assert.equal(dayCell.style.background,'#4f46e5')
  // 清除选中日期后重新打开该月，再验证未选中但有记录的浅紫色高亮。
  d.getElementById('orderDate').value='';
  const close=()=>call('toggleOrderCalendar');close();call('toggleOrderCalendar')
  // 初次打开默认当月；跨月时利用真实日历按钮切换。
  if(day.getMonth()!==new Date().getMonth())d.getElementById('orderNextMonth').click()
  const marked=[...d.getElementById('orderCalendarGrid').children].find(x=>x.textContent===String(day.getDate()))
  assert.equal(marked.style.background,'#e0e7ff')
  page.saveState();r.dispose()
  const restored=boot()
  try{
    const rows=orders(restored._runtime).filter(x=>x.textContent.includes(request.orderNo))
    assert.equal(rows.length,1)
    restored._runtime.scope.get('cancelReserveApproval')(request.orderNo)
    assert.equal(restored._runtime.scope.get('getReservationOrders')().find(x=>x.orderNo===request.orderNo).status,'已取消')
  }finally{restored._runtime.dispose()}
})

test('fault records preserve description, image and video attachments after page recreation',()=>{
  storage.clear()
  const page=boot(),r=page._runtime,d=r.document
  r.scope.get('show')('faultNew')
  d.getElementById('faultDesc').value='屏幕损坏\n无法显示波形'
  r.scope.set('uploadFiles',[
    {name:'photo.jpg',src:'wxfile://saved/photo.jpg',type:'image/jpeg'},
    {name:'video.mp4',src:'wxfile://saved/video.mp4',type:'video/mp4'}
  ])
  r.scope.get('submitFault')()
  const record=r.scope.get('faultList').at(-1)
  assert.equal(record.description,'屏幕损坏\n无法显示波形')
  assert.equal(record.attachments.length,2)
  assert.equal(r.scope.get('uploadFiles').length,0)
  page.saveState();r.dispose()
  const restored=boot()
  try{
    restored._runtime.scope.get('show')('faultList')
    const list=restored._runtime.document.getElementById('faultListWrap')
    assert.ok(list.textContent.includes(record.description))
    assert.equal(list.querySelector('img').getAttribute('src'),'wxfile://saved/photo.jpg')
    assert.equal(list.querySelector('video').getAttribute('src'),'wxfile://saved/video.mp4')
  }finally{restored._runtime.dispose()}
})

test('media files use saved paths and failed saves are not reported as success',async()=>{
  const previous=globalThis.wx
  try{
    globalThis.wx={getFileSystemManager:()=>({saveFile:({tempFilePath,success})=>success({savedFilePath:tempFilePath.replace('/tmp/','/saved/')})})}
    const files=await persistSelectedMedia([{tempFilePath:'/tmp/a.jpg',fileType:'image'},{tempFilePath:'/tmp/b.mp4',fileType:'video'}])
    assert.equal(files[0].path,'/saved/a.jpg');assert.equal(files[1].type,'video/mp4')
    globalThis.wx={getFileSystemManager:()=>({saveFile:({fail})=>fail()})}
    await assert.rejects(persistSelectedMedia([{tempFilePath:'/tmp/a.jpg'}]),/附件保存失败/)
  }finally{if(previous===undefined)delete globalThis.wx;else globalThis.wx=previous}
})
