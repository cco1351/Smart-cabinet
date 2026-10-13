import {markRaw} from 'vue'
import NativeNode from '../components/NativeNode.vue'
import {guard,session,hasRole,switchRole,logout,changePassword,safeReLaunch} from '../services/auth.js'
export function nativePage(factory,rules,role,kind=role){
 return {components:{NativeNode},data:()=>({tree:null,failed:'',loading:true,safeTop:0}),
  onLoad(query){this._query=query||{};this.safeTop=((typeof uni.getWindowInfo==='function'?uni.getWindowInfo():uni.getSystemInfoSync()).statusBarHeight||0)+44},
  async onShow(){this.loading=true;if(!await guard(role)){this.tree=null;this.loading=false;return}if(kind==='powerAdmin'&&session.user.teacherPermission!=='admin'){uni.redirectTo({url:'/packages/teacher/power-approver'});return}try{if(this._permission&&this._permission!==session.user.teacherPermission){this._runtime?.dispose();this._runtime=null}this._permission=session.user.teacherPermission;if(!this._runtime)this.boot();this.paint()}catch(e){this.fail(e)}finally{this.loading=false}},
  onHide(){this.saveState()},onUnload(){this.saveState();this._runtime?.dispose();this._runtime=null},
  onBackPress(){if(!this._runtime)return false;const fn=this._runtime.scope.get(role==='student'?'back':'goBack');if(typeof fn==='function'){fn();this.paint();return true}return false},
  methods:{
   fail(e){console.error(e?.stack||e?.message||String(e));this.failed=e.message||'页面加载失败';uni.showToast({title:this.failed,icon:'none'})},
   boot(){
    const host={user:session.user,changed:()=>this.paint(),page:()=>{},error:e=>this.fail(e),
     alert:message=>uni.showModal({title:'提示',content:String(message),showCancel:false}),
     logout:()=>uni.showModal({title:'退出登录',content:'确定退出当前账号吗？',success:r=>{if(r.confirm)logout()}}),
     authPage:()=>uni.navigateTo({url:'/pages/login/index'}),
     passwordPage:(mode='change')=>uni.navigateTo({url:'/pages/password/index?mode='+encodeURIComponent(mode)}),
     power:permission=>uni.navigateTo({url:permission==='approver'?'/packages/teacher/power-approver':'/packages/teacher/power-admin'}),
     backToTeacher:()=>uni.navigateBack({fail:()=>uni.reLaunch({url:'/packages/teacher/index'})}),
     password:async(oldPassword,password,confirm)=>{try{await changePassword(oldPassword,password,confirm);safeReLaunch('/pages/login/index')}catch(e){host.alert(e.message)}},
     storage:{get:k=>uni.getStorageSync(`prototype:${session.user.id}:${kind}:${k}`),set:(k,v)=>uni.setStorageSync(`prototype:${session.user.id}:${kind}:${k}`,v),remove:k=>uni.removeStorageSync(`prototype:${session.user.id}:${kind}:${k}`)},
     chooseFiles:()=>new Promise(resolve=>uni.chooseMedia({count:6,mediaType:['image','video'],success:r=>resolve(r.tempFiles.map(f=>({...f,path:f.tempFilePath,name:f.tempFilePath.split('/').pop(),type:f.fileType==='video'?'video/mp4':'image/jpeg'}))),fail:()=>resolve([])})),
     datePicker:el=>{uni.showModal({title:'选择日期',editable:true,placeholderText:'YYYY-MM-DD',success:r=>{if(r.confirm&&/^\d{4}-\d{2}-\d{2}$/.test(r.content)){el.value=r.content;const fn=this._runtime.scope.get('renderOrderList');if(typeof fn==='function')fn();this.paint()}}})},
     openLink:(url,name)=>{if(url?.parts){this.exportFile(name||'记录.csv',url.parts.join(''));return}if(!url||url==='#'||String(url).endsWith('/#'))return host.alert('原演示尚未配置资源文件，请在接入真实资源后使用。');if(/^https:\/\//.test(url))uni.downloadFile({url,success:r=>uni.openDocument({filePath:r.tempFilePath,showMenu:true}),fail:()=>host.alert('资源下载失败')})}
    }
    this._host=host;this._runtime=markRaw(factory(host));this.restoreState()
    if(this._query.page){const fn=this._runtime.scope.get(role==='student'?'show':'openPage');if(typeof fn==='function')fn(this._query.page)}
   },
   decorate(){const d=this._runtime.document,profile=role==='student'?d.querySelector('#profile'):d.querySelector('.phone[data-id="22-profile"] .content');if(!profile)return
    if(!d.getElementById('identity-switch')){const box=d.createElement('div');box.id='identity-switch';box.setAttribute('style','padding:13px;margin-bottom:10px;background:#fff;border:1px solid #e7eaf2;border-radius:13px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap');const label=d.createElement('span');const personType={student:'学生',teacher:'教师',other:'其他人员'}[session.user.personType]||'待确认';label.textContent='人员类型：'+personType+' · 当前工作区：'+(role==='teacher'?'管理工作台':'我的借还');box.append(label);if(hasRole('student')&&hasRole('teacher')){const button=d.createElement('button');button.textContent='前往'+(role==='teacher'?'我的借还':'管理工作台');button.setAttribute('style','background:#eef2ff;color:#4f46e5;border:0;border-radius:8px;padding:8px 12px;font-size:12px');button.addEventListener('click',async()=>{this.saveState();try{await switchRole(role==='teacher'?'student':'teacher')}catch(e){this.fail(e)}});box.append(button)}profile.prepend(box)}
    if(role==='teacher'){for(const node of d.querySelectorAll('.menu-item,.menu-row'))if(node.textContent.includes('退出登录')&&!node._logoutBound){node._logoutBound=true;node.addEventListener('click',()=>this._host.logout())}}
   },
   paint(){if(!this._runtime)return;try{this.decorate();this.tree=this._runtime.snapshot(rules);const fix=n=>{if(n.style)n.style=n.style.replace(/100vh/g,`calc(100vh - ${this.safeTop}px)`);n.children?.forEach(fix)};fix(this.tree)}catch(e){this.fail(e)}},
   async action(e){if(!this._runtime)return;await this._runtime.dispatch(e);this.paint();this.saveState()},
   saveState(){if(!this._runtime||!session.user)return;const fields=kind==='student'?['pickupDevices','pendingApprovals','pendingReserveApprovals','faultList','messages','examAttemptsMap','safetyExamStatusMap','rfidExamStatusMap','systemDone']:kind==='teacher'?['organizationMembers','organizationApplications','minimumCategories','exceptionManagementRecords']:['RS','MGS','CS'];const state={};for(const k of fields){const v=this._runtime.scope.get(k);if(v!==undefined)try{state[k]=JSON.parse(JSON.stringify(v))}catch{}}uni.setStorageSync(`state:${session.user.id}:${kind}`,state)},
   restoreState(){const state=uni.getStorageSync(`state:${session.user.id}:${kind}`)||{};for(const [k,v]of Object.entries(state)){const original=this._runtime.scope.get(k);if(Array.isArray(original)&&Array.isArray(v))original.splice(0,original.length,...v);else if(original&&typeof original==='object')Object.assign(original,v);else try{this._runtime.scope.set(k,v)}catch{}}const fn=this._runtime.scope.get(role==='student'?'show':kind==='teacher'?'openPage':'goTab');if(typeof fn==='function')fn(role==='student'?'home':kind==='teacher'?'role-admin-home':0)},
   exportFile(name,text){
    // #ifdef MP-WEIXIN
    const filePath=wx.env.USER_DATA_PATH+'/'+name;wx.getFileSystemManager().writeFile({filePath,data:text,encoding:'utf8',success:()=>wx.shareFileMessage({filePath,fileName:name}),fail:e=>this.fail(e)});
    // #endif
    // #ifdef H5
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'}));a.download=name;a.click();URL.revokeObjectURL(a.href);
    // #endif
   }
  }
 }
}
