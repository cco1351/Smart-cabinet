import {nativePage} from '../../runtime/page.js'
import {config} from '../../config.js'
import {powerRules,installPowerStations} from './power-layout.js'
import {addPowerDemoRecords} from './power-demo.js'
export function powerPage(factory,rules,kind){
 const base=nativePage(factory,rules,'teacher',kind)
 return {...base,data(){return {...base.data(),safeBottom:0}},
 onLoad(query){base.onLoad.call(this,query);const info=typeof uni.getWindowInfo==='function'?uni.getWindowInfo():uni.getSystemInfoSync();this.safeBottom=info.safeAreaInsets?.bottom??Math.max(0,(info.screenHeight||0)-(info.safeArea?.bottom||info.screenHeight||0));
 // #ifdef H5
 this.safeTop=0
 // #endif
 },
 methods:{...base.methods,
 boot(){base.methods.boot.call(this);if(config.mode==='demo')addPowerDemoRecords(this._runtime);const s=this._runtime.scope;if(kind==='powerAdmin'){s.get('_renderApr')();s.get('goTab')(0)}else{s.get('approvalTab')('pending');s.get('switchTab')(0)}this._stations=installPowerStations(this._runtime,{admin:kind==='powerAdmin',user:this._host.user,demo:config.mode==='demo',confirm:content=>new Promise(resolve=>uni.showModal({title:'确认电源操作',content,success:r=>resolve(r.confirm),fail:()=>resolve(false)})),message:title=>uni.showToast({title,icon:'none'})});this.paint()},
 paint(){if(!this._runtime)return;try{this.tree=this._runtime.snapshot(powerRules(rules,this.safeBottom));const fix=n=>{if(n.style)n.style=n.style.replace(/100vh/g,'calc(100vh - '+this.safeTop+'px)');n.children?.forEach(fix)};fix(this.tree)}catch(e){this.fail(e)}}
 }}
}
