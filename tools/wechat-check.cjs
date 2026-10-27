const automator=require('miniprogram-automator')
;(async()=>{const mini=await automator.connect({wsEndpoint:'ws://127.0.0.1:9420'});const errors=[];mini.on('console',e=>{if(e.type==='error'&&e.args?.length){const text=e.args.map(x=>typeof x==='string'?x:'').join(' ');if(text&&!/routeDone with a webviewId/.test(text)){errors.push(e);console.log('ERROR',JSON.stringify(e))}}});mini.on('exception',e=>{errors.push(e);console.log('EXCEPTION',JSON.stringify(e))});try{
 await mini.evaluate(()=>{const raw=console.error;console.error=(...args)=>raw(...args.map(x=>x&&typeof x==='object'?(x.stack||x.message||JSON.stringify(x)):x))})
 await mini.reLaunch('/pages/login/index');await new Promise(r=>setTimeout(r,1500));const loginPage=await mini.currentPage();const inputs=await loginPage.$$('input');await inputs[0].input('13800000002');await inputs[1].input('12345678');await (await loginPage.$('button.submit')).tap();await new Promise(r=>setTimeout(r,3500));
 if((await mini.currentPage()).path==='packages/teacher/index'){await mini.evaluate(()=>{const vm=getCurrentPages().slice(-1)[0].$vm;vm._runtime.scope.get('openPage')('22-profile');vm.paint();vm._runtime.document.getElementById('identity-switch').querySelector('button').click()});await new Promise(r=>setTimeout(r,3500))}
 const result=await mini.evaluate(async()=>{const vm=getCurrentPages().slice(-1)[0].$vm;vm._runtime.scope.get('show')('profile');vm.paint();const button=vm._runtime.document.getElementById('identity-switch')?.querySelector('button');if(!button)return {switch:false};button.click();return {switch:true}});console.log('SWITCH',result)
 await new Promise(r=>setTimeout(r,3500));console.log('PAGE',(await mini.currentPage()).path)
 console.log('STATE',await mini.evaluate(()=>{const vm=getCurrentPages().slice(-1)[0].$vm;return{failed:vm.failed,current:vm._runtime?.current()}}))
 console.log('TEXT',(await (await (await mini.currentPage()).$('view')).text()).slice(0,500))
 for(const id of ['03-admin-borrow-return','08-device-list','10-cabinet-list','22-profile']){
  console.log('OPEN',id,await mini.evaluate(id=>{const vm=getCurrentPages().slice(-1)[0].$vm;vm._runtime.scope.get('openPage')(id);vm.paint();return{failed:vm.failed,current:vm._runtime.current()}},id));await new Promise(r=>setTimeout(r,500))
 }
 await mini.evaluate(()=>{const vm=getCurrentPages().slice(-1)[0].$vm;vm._runtime.document.getElementById('identity-switch').querySelector('button').click()});await new Promise(r=>setTimeout(r,3000));console.log('RETURN',(await mini.currentPage()).path);console.log('ERROR_COUNT',errors.length);if(errors.length)process.exitCode=1
}finally{mini.disconnect()}})().catch(e=>{console.error(e);process.exitCode=1})
