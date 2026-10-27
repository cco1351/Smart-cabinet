import {chromium} from '@playwright/test'
import assert from 'node:assert/strict'
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'})
try{
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true})
 const errors=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto('http://127.0.0.1:5181/#/pages/login/index')
 await page.locator('input').first().fill('13800000001')
 await page.locator('input').nth(1).fill('12345678')
 await page.getByText('登录',{exact:true}).last().tap()
 await page.getByText('设备预约',{exact:true}).waitFor()
 const readPanel=()=>page.evaluate(()=>{
  for(const el of document.querySelectorAll('*')){
   for(let c=el.__vueParentComponent;c;c=c.parent){
    const r=c.proxy?._runtime
    if(r?.document?.getElementById('homeContentBox'))return {
     type:r.scope.get('currentActivePanel'),
     open:r.document.getElementById('homeContentBox').classList.contains('open')
    }
   }
  }
  throw new Error('Student page runtime not found')
 })
 for(const [label,type] of [['待领取','pickup'],['待归还','return'],['待审批','approval'],['工位预约','reserve']]){
  const entry=page.getByText(new RegExp('^'+label+'\\s*[▾⌄▼]?')).first()
  await entry.tap();await page.waitForTimeout(4000)
  assert.deepEqual(await readPanel(),{type,open:true},label+' remains open after touchend, tap and carousel refresh')
  await page.screenshot({path:'docs/screenshots/home-panel-'+type+'.png',fullPage:true})
  await entry.tap();await page.waitForTimeout(150)
  assert.deepEqual(await readPanel(),{type:'',open:false})
 }
 assert.deepEqual(errors,[])
 console.log('All four home panels passed real touch open, delayed refresh and second-tap close.')
}finally{await browser.close()}
