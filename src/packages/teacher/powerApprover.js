import {createEnvironment} from '../../runtime/environment.js';
export function createPrototype(host){const env=createEnvironment("<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n<title>智慧插座 - 竞赛管理者端演示</title>\n\n</head>\n<body>\n\n<div class=\"power-phone\">\n<div class=\"module-status\"><span>9:41</span><span>5G&nbsp;&nbsp;100%</span></div>\n<div class=\"module-header\">\n  <div class=\"module-level\">二级管理员</div>\n  <div class=\"module-title\">电源安全管理</div>\n  <button class=\"module-switch\" type=\"button\" aria-label=\"返回智能柜端\" onclick=\"returnToMiniApp()\">智能柜端</button>\n</div>\n\n<div class=\"role-banner\">\n  <span>🔑</span><span>竞赛管理者 · 刘队长</span><span class=\"role-badge\">管理：302 实验室</span>\n  <span style=\"margin-left:auto;font-size:11px;color:#94a3b8\">仅对本实验室有操作权限</span>\n</div>\n\n<!-- ==================== PAGE 0: 工位（设备查看）==================== -->\n<div class=\"page active\" id=\"page-stations\">\n  <!-- 全部房间Tab切换 -->\n  <div class=\"room-tabs\" id=\"roomTabs\"></div>\n  <div id=\"roomStats\" class=\"stat-row\"></div>\n  <div class=\"batch-bar\" id=\"batchBar\" style=\"display:none\">\n    <div class=\"batch-left\"><span class=\"batch-select\" id=\"selectAllBtn\" onclick=\"mgrSelectAll()\">全选</span><span class=\"batch-count\" id=\"selectCount\"></span></div>\n    <div class=\"batch-right\"><button class=\"batch-btn on\" id=\"batchOn\" style=\"display:none\" onclick=\"mgrBatchOn()\">通电(N)</button><button class=\"batch-btn off\" id=\"batchOff\" style=\"display:none\" onclick=\"mgrBatchOff()\">断电(N)</button></div>\n  </div>\n  <div class=\"content\" id=\"roomDeviceList\"></div>\n</div>\n\n<!-- ==================== PAGE 1: 审批 ==================== -->\n<div class=\"page\" id=\"page-approval\">\n  <div class=\"header\"><div class=\"header-title\">预约审批</div></div>\n  <div class=\"tabs-bar\">\n    <div class=\"tab-item active\" onclick=\"approvalTab('pending')\">待审批<span class=\"tab-badge\" id=\"approvalBadge\" style=\"display:none\">0</span></div>\n    <div class=\"tab-item\" onclick=\"approvalTab('done')\">已审批</div>\n  </div>\n  <div class=\"content\" id=\"approvalContent\"></div>\n</div>\n\n<!-- ==================== PAGE 2: 管理（管理中心）==================== -->\n<div class=\"page\" id=\"page-manage\">\n  <div class=\"header\"><div class=\"header-title\">管理中心</div></div>\n  <div class=\"tabs-bar\">\n    <div class=\"tab-item active\" onclick=\"manageTab('managers')\">管理者</div>\n    <div class=\"tab-item\" onclick=\"manageTab('courses')\">课表管理</div>\n  </div>\n  <div class=\"content\" id=\"manageContent\"></div>\n</div>\n\n<!-- ==================== PAGE 3: 我的 ==================== -->\n<div class=\"page\" id=\"page-my\">\n  <div id=\"my-home\" class=\"sub-page active\">\n    <div class=\"user-header\">\n      <div class=\"user-avatar\">刘</div>\n      <div><div class=\"user-name\">刘队长</div><div class=\"user-role\">竞赛管理者</div></div>\n    </div>\n    <div class=\"menu-list\">\n      <div class=\"menu-item\" onclick=\"openSub('alarms')\"><div class=\"menu-icon-wrap\" style=\"background:#fff1f1\">📋</div><span class=\"menu-label\">告警记录</span><span class=\"menu-arrow\">→</span></div>\n      <div class=\"menu-item\" onclick=\"openSub('logs')\"><div class=\"menu-icon-wrap\" style=\"background:#f0f4f6\">📄</div><span class=\"menu-label\">操作日志</span><span class=\"menu-arrow\">→</span></div>\n      <div class=\"menu-item\" onclick=\"openSub('profile')\"><div class=\"menu-icon-wrap\" style=\"background:#edf8f3\">👤</div><span class=\"menu-label\">个人资料</span><span class=\"menu-arrow\">→</span></div>\n    </div>\n    <div class=\"logout-btn\">退出登录</div>\n  </div>\n  <!-- Alarms -->\n  <div id=\"sub-alarms\" class=\"sub-page\">\n    <div class=\"sub-header\" onclick=\"closeSub()\"><span class=\"sub-back\">←</span><span class=\"header-title\">告警记录</span></div>\n    <div class=\"content\" id=\"alarmList\"></div>\n<!-- Alarms range & export injected by renderAlarms -->\n<div id=\"alarmExtra\" style=\"display:none\"></div>\n  </div>\n  <!-- Logs -->\n  <div id=\"sub-logs\" class=\"sub-page\">\n    <div class=\"sub-header\" onclick=\"closeSub()\"><span class=\"sub-back\">←</span><span class=\"header-title\">操作日志</span></div>\n    <div class=\"content\" id=\"logList\"></div>\n  </div>\n  <!-- Profile -->\n  <div id=\"sub-profile\" class=\"sub-page\">\n    <div class=\"sub-header\" onclick=\"closeSub()\"><span class=\"sub-back\">←</span><span class=\"header-title\">个人资料</span></div>\n    <div class=\"content\">\n      <div class=\"card\"><div class=\"user-header\" style=\"background:transparent;padding:0\"><div class=\"user-avatar\">刘</div><div><div class=\"user-name\" style=\"color:#17202a;font-size:18px\">刘队长</div><div class=\"user-role\" style=\"background:#fff8eb;color:#b7791f\">竞赛管理者</div></div></div></div>\n      <div class=\"card\"><div style=\"display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f4f6\"><span style=\"color:#697783;font-size:13px\">学号</span><span style=\"font-weight:600\">20230201</span></div><div style=\"display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f4f6\"><span style=\"color:#697783;font-size:13px\">手机</span><span style=\"font-weight:600\">138****7777</span></div><div style=\"display:flex;justify-content:space-between;padding:10px 0\"><span style=\"color:#697783;font-size:13px\">管理实验室</span><span style=\"font-weight:600;color:#16826c\">302 实验室</span></div></div>\n      <div class=\"logout-btn\">退出登录</div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal -->\n<div class=\"modal-overlay\" id=\"modal\">\n  <div class=\"modal-box\"><div class=\"modal-title\" id=\"modalTitle\"></div><div class=\"modal-msg\" id=\"modalMsg\"></div>\n    <div class=\"modal-btns\"><button class=\"modal-btn cancel\" onclick=\"closeModal(false)\">取消</button><button class=\"modal-btn danger\" id=\"modalConfirmBtn\" onclick=\"closeModal(true)\">确认</button></div>\n  </div>\n</div>\n<div class=\"toast\" id=\"toast\"></div>\n<div class=\"reject-modal\" id=\"rejectModal\">\n  <div class=\"reject-box\"><div class=\"reject-title\">驳回原因</div><div class=\"reject-info\" id=\"rejectInfo\"></div><textarea class=\"reject-input\" id=\"rejectInput\" placeholder=\"请输入驳回原因（必填）\" maxlength=\"200\"></textarea>\n    <div class=\"reject-btns\"><button class=\"modal-btn cancel\" onclick=\"closeReject()\">取消</button><button class=\"modal-btn danger\" onclick=\"confirmReject()\">确认驳回</button></div>\n  </div>\n</div>\n\n<!-- Tab bar -->\n<div class=\"tab-bar\">\n  <div class=\"tab-item active\" onclick=\"switchTab(0)\" id=\"tab0\"><span class=\"tab-icon\">🔌</span><span class=\"tab-text\">工位</span></div>\n  <div class=\"tab-item\" onclick=\"switchTab(1)\" id=\"tab1\"><div class=\"tab-icon-wrap\"><span class=\"tab-icon\">📋</span><div class=\"tab-badge\" id=\"tabBadge\" style=\"display:none\">0</div></div><span class=\"tab-text\">审批</span></div>\n  <div class=\"tab-item\" onclick=\"switchTab(2)\" id=\"tab2\"><span class=\"tab-icon\">⚙️</span><span class=\"tab-text\">管理</span></div>\n  <div class=\"tab-item\" onclick=\"switchTab(3)\" id=\"tab3\"><span class=\"tab-icon\">👤</span><span class=\"tab-text\">我的</span></div>\n</div>\n</div>\n\n\n</body>\n</html>\n",host);const {document,window,location,URL,URLSearchParams,localStorage,sessionStorage,setTimeout,setInterval,clearTimeout,clearInterval,alert,confirm,FileReader,Blob}=env.globals;

var pad=function(n){return String(n).padStart(2,'0')};var t2m=function(t){var p=t.split(':');return parseInt(p[0])*60+parseInt(p[1])}

// ---- DATA ----
var ALL_ROOMS=['301 实验室','302 实验室','303 实验室','401 实验室','402 实验室','501 机房']
var MANAGER_ROOMS=['302 实验室'];var MANAGER_NAME='刘队长';var MANAGER_ID='20230201'
var ROOMS=[{name:'301 实验室',prefix:'A',count:24},{name:'302 实验室',prefix:'B',count:24},{name:'303 实验室',prefix:'C',count:20},{name:'401 实验室',prefix:'D',count:20},{name:'402 实验室',prefix:'E',count:20},{name:'501 机房',prefix:'F',count:24}]
var STATIONS=[];(function(){var id=1;ROOMS.forEach(function(r){for(var i=1;i<=r.count;i++){var sts=['on','off','off','on','off','off','on','off','off','on','off','offline'];var s=sts[(id-1)%sts.length];var volt=s==='on'?219+Math.floor(Math.random()*12):0;var cur=s==='on'?+(Math.random()*7+1).toFixed(1):0;STATIONS.push({id:'s'+String(id).padStart(3,'0'),name:'工位 '+r.prefix+'-'+String(i).padStart(2,'0'),location:r.name,status:s,voltage:volt,current:cur,power:Math.round(volt*cur)});id++}})})()
var td=(new Date().getDay()||7)
var COURSES=[{id:'c001',name:'嵌入式系统实验',teacher:'张老师',rooms:['301 实验室'],dayOfWeek:1,startTime:'08:30',endTime:'12:00',semesterStart:'2026-09-01',weekStart:1,weekEnd:16},{id:'c002',name:'数字电路实验',teacher:'李老师',rooms:['302 实验室'],dayOfWeek:3,startTime:'14:00',endTime:'17:00',semesterStart:'2026-09-01',weekStart:1,weekEnd:16},{id:'c003',name:'单片机原理',teacher:'王老师',rooms:['301 实验室'],dayOfWeek:1,startTime:'09:00',endTime:'12:00',semesterStart:'2026-09-01',weekStart:1,weekEnd:16},{id:'c004',name:'PCB设计实训',teacher:'赵老师',rooms:['301 实验室','302 实验室'],dayOfWeek:2,startTime:'14:00',endTime:'17:30',semesterStart:'2026-09-01',weekStart:1,weekEnd:16}]
var MANAGERS=[{studentId:'t001',name:'张老师',rooms:'301 实验室、302 实验室'},{studentId:'20230201',name:'刘队长',rooms:'302 实验室'}]

function genRes(){
  var now=new Date();var today=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());var nM=now.getHours()*60+now.getMinutes()
  var rM=nM+120,rS=pad(Math.floor(rM/60)%24)+':'+pad(rM%60),rE=pad(Math.floor((rM+90)/60)%24)+':'+pad((rM+90)%60)
  return[
    {id:'r001',studentName:'李同学',studentId:'20230101',stationName:'工位 B-05',location:'301 实验室',purpose:'电路调试',date:today,timeSlot:rS+'-'+rE,status:'pending_review',statusText:'审核中'},
    {id:'r007',studentName:'王同学',studentId:'20230102',stationName:'工位 A-01',location:'301 实验室',purpose:'Python课程设计',date:today,timeSlot:rS+'-'+rE,status:'pending_review',statusText:'审核中'},
    {id:'r008',studentName:'赵同学',studentId:'20230103',stationName:'工位 C-04',location:'302 实验室',purpose:'单片机课程实验',date:today,timeSlot:rS+'-'+rE,status:'pending_review',statusText:'审核中'},
    {id:'r004',studentName:'李同学',studentId:'20230101',stationName:'工位 C-02',location:'302 实验室',purpose:'FPGA验证实验',date:today,timeSlot:'10:00-12:00',status:'rejected',statusText:'已驳回',rejectReason:'该时段已被课表占用',auditorName:'王管理员',auditTime:today+' 08:00'},
    {id:'r006',studentName:'李同学',studentId:'20230101',stationName:'工位 D-01',location:'302 实验室',purpose:'数字电路实验',date:today,timeSlot:'14:00-16:00',status:'approved',statusText:'已通过',auditorName:'王管理员',auditTime:today+' 08:15'}
  ]
}
var RS=genRes() //审批持久存储

var alarms=(function(){
  var now=new Date();var today=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());var h=now.getHours(),m=now.getMinutes()
  function t(off){var mins=h*60+m-off,hh=Math.floor(mins/60)%24,mm=mins%60;return today+' '+String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')}
  return[
    {id:'a001',stationName:'工位 B-01',level:2,message:'工位 B-01 电流偏高 — 当前电流 13.5A（告警阈值 12.8A）',status:'unread',time:t(20),actualValue:'13.5A',threshold:'12.8A'},
    {id:'a002',stationName:'工位 D-05',level:3,message:'工位 D-05 设备离线，无心跳数据上报',status:'unread',time:t(90),actualValue:'—',threshold:'—'},
    {id:'a003',stationName:'工位 C-04',level:2,message:'工位 C-04 电压偏低 — 当前电压 198V',status:'read',time:t(45),actualValue:'198V',threshold:'210V'}
  ]
})()

var logs=(function(){
  var now=new Date();var td=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());var h=now.getHours(),m=now.getMinutes()
  function t(off){var mins=h*60+m-off,hh=Math.floor(mins/60)%24,mm=mins%60;return td+' '+String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')}
  return[
    {id:'l001',time:t(0),stationName:'工位 B-02',action:'远程通电',actionType:'remote_on',source:'管理者',operator:'刘队长',result:'成功'},
    {id:'l002',time:t(15),stationName:'工位 B-03',action:'远程断电',actionType:'remote_off',source:'管理者',operator:'刘队长',result:'成功'},
    {id:'l003',time:t(30),stationName:'工位 B-01',action:'定时通电',actionType:'schedule_on',source:'自动计划',operator:'系统',result:'成功'}
  ]
})()

var curTab=0,curRoom=ALL_ROOMS[0],mgrSel=[],mgrAllChk=false,modalCb=null,rejectTarget=null
var apprTab='pending'

// ---- HELPERS ----
function toast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},1500)}
function showModal(ttl,msg,btn,cls,cb){document.getElementById('modalTitle').textContent=ttl;document.getElementById('modalMsg').textContent=msg;var b=document.getElementById('modalConfirmBtn');b.textContent=btn||'确认';b.className='modal-btn '+(cls||'danger');document.getElementById('modal').classList.add('show');modalCb=function(ok){document.getElementById('modal').classList.remove('show');modalCb=null;if(cb)cb(ok)}}
function closeModal(ok){if(modalCb)modalCb(ok)}
function returnToMiniApp(){var sourceRole=new URLSearchParams(window.location.search).get('role');if(sourceRole!=='approver')sourceRole='admin';window.location.href='./小程序/小程序管理员端页面线框图.html?role='+sourceRole+'&page=role-admin-home'}
function openSub(id){document.querySelectorAll('#page-my .sub-page').forEach(function(e){e.classList.remove('active')});document.getElementById('sub-'+id).classList.add('active');if(id==='alarms')renderAlarms();if(id==='logs')renderLogs()}
function closeSub(){document.querySelectorAll('#page-my .sub-page').forEach(function(e){e.classList.remove('active')});document.getElementById('my-home').classList.add('active')}

// ---- TAB SWITCH ----
function switchTab(idx){
  curTab=idx
  document.getElementById('page-stations').classList.toggle('active',idx===0)
  document.getElementById('page-approval').classList.toggle('active',idx===1)
  document.getElementById('page-manage').classList.toggle('active',idx===2)
  document.getElementById('page-my').classList.toggle('active',idx===3)
  for(var i=0;i<4;i++)document.getElementById('tab'+i).classList.toggle('active',i===idx)
  if(idx===0){curRoom=ALL_ROOMS[0];renderRoomTabs();selectRoom(curRoom)}
  if(idx===1)approvalTab('pending')
  if(idx===2)manageTab('managers')
}

// ---- STATIONS PAGE ----
function renderRoomTabs(){
  var h='';ALL_ROOMS.forEach(function(r){
    var isMine=MANAGER_ROOMS.indexOf(r)>=0
    h+='<div class="room-tab'+(r===curRoom?' active':'')+(isMine?'':' locked')+'" onclick="selectRoom(\''+r+'\')">'+(isMine?'🔑 ':'🔒 ')+r+'</div>'
  });document.getElementById('roomTabs').innerHTML=h
}
function selectRoom(r){curRoom=r;mgrSel=[];mgrAllChk=false;renderRoomTabs();renderRoomDevices(r)}
function renderRoomDevices(r){
  var isMine=MANAGER_ROOMS.indexOf(r)>=0
  // mgrSel / mgrAllChk 不清空 — 由 selectRoom 管理
  var sts=STATIONS.filter(function(s){return s.location===r})
  var sc={t:0,f:0,o:0,x:0};sts.forEach(function(s){sc.t++;if(s.status==='on')sc.o++;else if(s.status==='off')sc.f++;else sc.x++})
  document.getElementById('roomStats').innerHTML='<div class="stat-item"><div class="stat-num">'+sc.t+'</div><div class="stat-label">总数</div></div><div class="stat-item free"><div class="stat-num">'+sc.f+'</div><div class="stat-label">空闲</div></div><div class="stat-item on"><div class="stat-num">'+sc.o+'</div><div class="stat-label">通电</div></div><div class="stat-item fault"><div class="stat-num">'+sc.x+'</div><div class="stat-label">故障</div></div>'
  document.getElementById('batchBar').style.display=isMine?'flex':'none'
  var h='';sts.forEach(function(s){
    var canAct=isMine&&(s.status==='on'||s.status==='off');var sel=mgrSel.indexOf(s.id)>=0
    h+='<div class="device-item status-'+(s.status==='fault'||s.status==='offline'?'fault':'')+(sel?' checked':'')+'">'
    if(canAct)h+='<div class="dev-item-check" onclick="mgrToggle(\''+s.id+'\')"><div class="check-box'+(sel?' checked':'')+'">'+(sel?'✓':'')+'</div></div>'
    h+='<div class="dev-left"><div class="dev-name">'+s.name+'</div><div class="dev-info"><span class="dev-status-tag '+(s.status==='on'?'on':'free')+'">'+(s.status==='on'?'通电':s.status==='fault'||s.status==='offline'?'故障':'空闲')+'</span></div>'
    if(s.status==='on')h+='<div class="dev-params">'+s.voltage+'V · '+s.current+'A · '+s.power+'W</div>'
    h+='</div>'
    if(canAct)h+='<button class="dev-action '+(s.status==='on'?'off':'on')+'" onclick="mgrPower(\''+s.id+'\')">'+(s.status==='on'?'断电':'通电')+'</button>'
    if(!canAct&&(s.status==='on'||s.status==='off'))h+='<button class="dev-action" style="background:#d1d5db;color:#9ca3af;cursor:default">无权限</button>'
    h+='</div>'
  })
  document.getElementById('roomDeviceList').innerHTML=h||'<div class="empty">暂无设备</div>'
  updateBatchBar()
}
function mgrToggle(id){var i=mgrSel.indexOf(id);if(i>=0)mgrSel.splice(i,1);else mgrSel.push(id);renderRoomDevices(curRoom)}
function mgrSelectAll(){if(mgrAllChk){mgrSel=[]}else{STATIONS.filter(function(s){return s.location===curRoom&&(s.status==='on'||s.status==='off')}).forEach(function(s){mgrSel.push(s.id)})};mgrAllChk=!mgrAllChk;renderRoomDevices(curRoom)}
function updateBatchBar(){
  var c=mgrSel.length;document.getElementById('selectCount').textContent=c>0?'已选 '+c+' 个':''
  document.getElementById('batchOn').style.display=c>0?'inline-block':'none';document.getElementById('batchOff').style.display=c>0?'inline-block':'none'
  document.getElementById('batchOn').textContent='通电('+c+')';document.getElementById('batchOff').textContent='断电('+c+')'
  document.getElementById('selectAllBtn').textContent=mgrAllChk?'取消全选':'全选'
}
function mgrPower(id){
  var s=STATIONS.find(function(x){return x.id===id});if(!s)return
  if(s.status==='off')showModal('确认通电','确定对【'+s.name+'】通电？','确认通电','confirm',function(ok){if(ok){s.status='on';s.voltage=219+Math.floor(Math.random()*12);s.current=+(Math.random()*7+1).toFixed(1);s.power=Math.round(s.voltage*s.current);logAction(s.name,'远程通电','remote_on');renderRoomDevices(curRoom);toast('已通电')}})
  else showModal('确认断电','确定对【'+s.name+'】断电？','确认断电','danger',function(ok){if(ok){s.status='off';s.voltage=0;s.current=0;s.power=0;logAction(s.name,'远程断电','remote_off');renderRoomDevices(curRoom);toast('已断电')}})
}
function mgrBatchOn(){if(!mgrSel.length){toast('请先勾选设备');return}showModal('批量通电','确定对 '+mgrSel.length+' 个设备通电？','确认通电','confirm',function(ok){if(ok){mgrSel.forEach(function(id){var s=STATIONS.find(function(x){return x.id===id});if(s){s.status='on';s.voltage=219+Math.floor(Math.random()*12);s.current=+(Math.random()*7+1).toFixed(1);s.power=Math.round(s.voltage*s.current);logAction(s.name,'远程通电','remote_on')}});renderRoomDevices(curRoom);toast('已通电 '+mgrSel.length+' 个')}})}
function mgrBatchOff(){if(!mgrSel.length){toast('请先勾选设备');return}showModal('批量断电','确定对 '+mgrSel.length+' 个设备断电？','确认断电','danger',function(ok){if(ok){mgrSel.forEach(function(id){var s=STATIONS.find(function(x){return x.id===id});if(s){s.status='off';s.voltage=0;s.current=0;s.power=0;logAction(s.name,'远程断电','remote_off')}});renderRoomDevices(curRoom);toast('已断电 '+mgrSel.length+' 个')}})}
function logAction(name,action,type){var now=new Date();logs.unshift({id:'l'+Date.now(),time:now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate())+' '+pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds()),stationName:name,action:action,actionType:type,source:'管理者',operator:'刘队长',result:'成功'})}

// ---- APPROVAL PAGE ----
function approvalTab(tab){
  apprTab=tab;document.querySelectorAll('#page-approval .tab-item').forEach(function(e,i){e.classList.toggle('active',i===(tab==='pending'?0:1))})
  var managed=RS.filter(function(r){return MANAGER_ROOMS.indexOf(r.location)>=0})
  var pending=managed.filter(function(r){return r.status==='pending_review'})
  var done=managed.filter(function(r){return r.status!=='pending_review'})
  var b=document.getElementById('approvalBadge');b.style.display=pending.length?'inline-block':'none';b.textContent=pending.length
  document.getElementById('tabBadge').style.display=pending.length?'block':'none';document.getElementById('tabBadge').textContent=pending.length
  var list=tab==='pending'?pending:done;var h=''
  if(tab==='pending'){
    list.forEach(function(r){h+='<div class="approval-card"><div class="ac-header"><div class="ac-user"><div class="ac-avatar">'+r.studentName[0]+'</div><div><div class="ac-name">'+r.studentName+'</div><div class="ac-id">'+r.studentId+'</div></div></div></div><div class="ac-body"><div class="ac-row">📍 '+r.stationName+'（'+r.location+'）</div><div class="ac-row">📅 '+r.date+' '+r.timeSlot+'</div><div class="ac-row">📝 '+r.purpose+'</div></div><div class="ac-actions"><button class="ac-btn reject" onclick="openReject(\''+r.id+'\')">驳回</button><button class="ac-btn approve" onclick="approveOne(\''+r.id+'\')">通过</button></div></div>'})
  }else{
    list.forEach(function(r){h+='<div class="approval-card"><div class="ac-header"><div class="ac-user"><div class="ac-avatar">'+r.studentName[0]+'</div><div><div class="ac-name">'+r.studentName+'</div><div class="ac-id">'+r.studentId+'</div></div></div><div class="ac-status-tag '+(r.status==='approved'?'ok':'fail')+'">'+r.statusText+'</div></div><div class="ac-body"><div class="ac-row">📍 '+r.stationName+'（'+r.location+'）</div><div class="ac-row">📅 '+r.date+' '+r.timeSlot+'</div><div class="ac-row">📝 '+r.purpose+'</div>'+(r.rejectReason?'<div class="ac-row reject-reason">❌ 驳回原因：'+r.rejectReason+'</div>':'')+(r.auditorName?'<div class="ac-row auditor">👤 审批人：'+r.auditorName+' · '+r.auditTime+'</div>':'')+'</div></div>'})
  }
  if(!list.length)h='<div class="empty">暂无记录</div>'
  document.getElementById('approvalContent').innerHTML=h
}
function approveOne(id){var r=RS.find(function(x){return x.id===id});if(!r)return;showModal('确认通过','通过「'+r.studentName+'」的预约申请？\n工位：'+r.stationName+'\n时段：'+r.timeSlot,'确认通过','confirm',function(ok){if(ok){r.status='approved';r.statusText='已通过';r.auditorName='刘队长';r.auditTime=new Date().toISOString().replace('T',' ').slice(0,19);approvalTab(apprTab);toast('已通过')}})}
function openReject(id){rejectTarget=RS.find(function(x){return x.id===id});if(!rejectTarget)return;document.getElementById('rejectInfo').textContent=rejectTarget.studentName+' · '+rejectTarget.stationName+'\n'+rejectTarget.date+' '+rejectTarget.timeSlot;document.getElementById('rejectInput').value='';document.getElementById('rejectModal').classList.add('show')}
function closeReject(){document.getElementById('rejectModal').classList.remove('show');rejectTarget=null}
function confirmReject(){var reason=document.getElementById('rejectInput').value.trim();if(!reason){toast('请输入驳回原因');return};rejectTarget.status='rejected';rejectTarget.statusText='已驳回';rejectTarget.rejectReason=reason;rejectTarget.auditorName='刘队长';rejectTarget.auditTime=new Date().toISOString().replace('T',' ').slice(0,19);closeReject();approvalTab(apprTab);toast('已驳回')}

// ---- MANAGE PAGE ----
function manageTab(tab){
  document.querySelectorAll('#page-manage .tab-item').forEach(function(e,i){e.classList.toggle('active',i===(tab==='managers'?0:1))})
  var h='';var dispName='刘队长'
  if(tab==='managers'){
    h+='<div class="card" style="margin-bottom:8px"><div class="card-row"><div class="card-left"><span class="card-name">刘队长</span><span class="card-meta">学号: 20230201 | 手机: 138****7777</span><span class="card-room">🔑 302 实验室</span></div></div></div>'
    h+='<div class="card"><div class="card-row"><div class="card-left"><span class="card-name">张老师</span><span class="card-meta">学号: t001 | 手机: 138****6666</span><span class="card-room">🔑 301 实验室、302 实验室</span></div></div></div>'
    h+='<div class="add-btn">+ 添加管理者（仅管理员可操作）</div>'
    if(!MANAGERS.length)h+='<div class="empty">暂无管理者</div>'
  }else{
    COURSES.forEach(function(c){var roomsT=(c.rooms||[c.room]||[]).join('、');h+='<div class="card"><div class="card-row"><div class="card-left"><span class="course-name">'+c.name+'</span><span class="course-teacher">👨‍🏫 '+c.teacher+'</span><div class="course-info"><span class="info-tag">'+(['一','二','三','四','五','六','日'][(c.dayOfWeek||1)-1])+' '+(c.startTime||'')+'-'+(c.endTime||'')+'</span><span class="info-tag room">📍 '+roomsT+'</span><span class="info-tag weeks">📅 第'+(c.weekStart||1)+'-'+(c.weekEnd||16)+'周</span></div></div></div></div>'})
    h+='<div class="add-btn">+ 添加课表（仅管理员可操作）</div>'
  }
  if(!h||h==='<div class="add-btn">+ 添加管理者（仅管理员可操作）</div>')h='<div class="empty">暂无数据</div>'
  document.getElementById('manageContent').innerHTML=h
}

// ---- ALARMS & LOGS ----
var alarmRng=0,logRng=0,logFltr='all'
function FMT(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function getToday(){var n=new Date();return n.getFullYear()+'-'+pad(n.getMonth()+1)+'-'+pad(n.getDate())}
function renderAlarms(){
  var lv={1:'安全类',2:'异常类',3:'离线类'};var now=new Date();var td2=getToday();var ds='',de=''
  if(alarmRng===0){var s=new Date(now.getTime()-7*864e5);ds=FMT(s);de=td2}else if(alarmRng===1){var s=new Date(now.getTime()-15*864e5);ds=FMT(s);de=td2}else if(alarmRng===2){var s=new Date(now.getTime()-30*864e5);ds=FMT(s);de=td2}
  var list=alarms;if(ds&&de)list=list.filter(function(a){var ad=(a.time||'').split(' ')[0];return ad>=ds&&ad<=de})
  var h='';h+='<div class="range-bar"><select class="range-select" onchange="alarmRng=parseInt(this.value);renderAlarms()"><option value="0"'+(alarmRng===0?' selected':'')+'>最近7天</option><option value="1"'+(alarmRng===1?' selected':'')+'>最近15天</option><option value="2"'+(alarmRng===2?' selected':'')+'>最近30天</option></select><span class="export-btn" style="margin-left:auto;cursor:pointer" onclick="exportAlarmCSV()">📤 导出</span><span class="range-count">'+list.length+' 条</span></div><div class="content">'
  list.forEach(function(a){h+='<div class="alarm-card"><div class="alarm-row-top"><div class="alarm-left"><div class="alarm-dot lv'+a.level+'"></div><span class="alarm-station">302 实验室 · '+a.stationName+'</span></div><span class="alarm-time">'+a.time+'</span></div><div class="alarm-msg">'+a.message+'</div><div class="alarm-tags"><span class="alarm-tag lv'+a.level+'">'+lv[a.level]+'</span><span class="alarm-tag status-tag">'+(a.status==='read'?'已读':'未读')+'</span></div>'+(a.actualValue&&a.threshold?'<div class="alarm-data-row">实测：<strong>'+a.actualValue+'</strong> | 阈值：<strong>'+a.threshold+'</strong></div>':'')+'</div>'})
  if(!list.length)h+='<div class="empty">暂无告警</div>'
  h+='</div>';document.getElementById('alarmList').innerHTML=h
}
function renderLogs(){
  var now=new Date();var td2=getToday();var ds2='',de2=''
  if(logRng===0){var s=new Date(now.getTime()-7*864e5);ds2=FMT(s);de2=td2}else if(logRng===1){var s=new Date(now.getTime()-15*864e5);ds2=FMT(s);de2=td2}else if(logRng===2){var s=new Date(now.getTime()-30*864e5);ds2=FMT(s);de2=td2}
  var list=logs;if(ds2&&de2)list=list.filter(function(l){var ld=(l.time||'').split(' ')[0];return ld>=ds2&&ld<=de2});if(logFltr!=='all')list=list.filter(function(l){return l.actionType===logFltr})
  var colors={schedule_on:'#16a34a',remote_on:'#16a34a',schedule_off:'#64748b',remote_off:'#64748b'};var h=''
  h+='<div class="range-bar"><select class="range-select" onchange="logRng=parseInt(this.value);renderLogs()"><option value="0"'+(logRng===0?' selected':'')+'>最近7天</option><option value="1"'+(logRng===1?' selected':'')+'>最近15天</option><option value="2"'+(logRng===2?' selected':'')+'>最近30天</option></select><span class="export-btn" style="margin-left:auto;cursor:pointer" onclick="exportLogCSV()">📤 导出</span><span class="range-count">'+list.length+' 条</span></div><div class="filter-row"><div class="filter-chip'+(logFltr==='all'?' active':'')+'" onclick="logFltr=\'all\';renderLogs()">全部</div><div class="filter-chip'+(logFltr==='remote_on'?' active':'')+'" onclick="logFltr=\'remote_on\';renderLogs()">远程通电</div><div class="filter-chip'+(logFltr==='remote_off'?' active':'')+'" onclick="logFltr=\'remote_off\';renderLogs()">远程断电</div><div class="filter-chip'+(logFltr==='schedule_on'?' active':'')+'" onclick="logFltr=\'schedule_on\';renderLogs()">定时通电</div><div class="filter-chip'+(logFltr==='schedule_off'?' active':'')+'" onclick="logFltr=\'schedule_off\';renderLogs()">定时断电</div></div><div class="content">'
  list.forEach(function(l){h+='<div class="log-card"><div class="log-row-top"><span class="log-action" style="color:'+(colors[l.actionType]||'#334155')+'">'+l.action+'</span><span class="log-result '+(l.result==='成功'?'ok':'fail')+'">'+l.result+'</span></div><div class="log-row-sub"><span>302 实验室 · '+l.stationName+'</span><span class="log-time">'+l.time+'</span></div><div class="log-row-sub"><span>'+l.source+'</span><span>'+l.operator+'</span></div></div>'})
  if(!list.length)h+='<div class="empty">暂无日志</div>'
  h+='</div>';document.getElementById('logList').innerHTML=h
}

// CSV Export
function exportAlarmCSV(){
  var lv={1:'安全类',2:'异常类',3:'离线类'};var now=new Date();var td2=getToday();var ds='',de=''
  if(alarmRng===0){var s=new Date(now.getTime()-7*864e5);ds=FMT(s);de=td2}else if(alarmRng===1){var s=new Date(now.getTime()-15*864e5);ds=FMT(s);de=td2}else if(alarmRng===2){var s=new Date(now.getTime()-30*864e5);ds=FMT(s);de=td2}
  var list=alarms;if(ds&&de)list=list.filter(function(a){var ad=(a.time||'').split(' ')[0];return ad>=ds&&ad<=de})
  var csv='时间,工位,告警类型,级别,实测值,阈值,状态,详情\n'
  list.forEach(function(a){csv+=[a.time,a.stationName,lv[a.level]||'',a.level,a.actualValue||'',a.threshold||'',a.status==='read'?'已读':'未读','"'+a.message.replace(/"/g,'""')+'"'].join(',')+'\n'})
  downloadCSV(csv,'告警记录_'+getToday()+'.csv')
}
function exportLogCSV(){
  var now=new Date();var td2=getToday();var ds2='',de2=''
  if(logRng===0){var s=new Date(now.getTime()-7*864e5);ds2=FMT(s);de2=td2}else if(logRng===1){var s=new Date(now.getTime()-15*864e5);ds2=FMT(s);de2=td2}else if(logRng===2){var s=new Date(now.getTime()-30*864e5);ds2=FMT(s);de2=td2}
  var list=logs;if(ds2&&de2)list=list.filter(function(l){var ld=(l.time||'').split(' ')[0];return ld>=ds2&&ld<=de2});if(logFltr!=='all')list=list.filter(function(l){return l.actionType===logFltr})
  var csv='时间,工位,操作,操作类型,来源,操作人,结果\n'
  list.forEach(function(l){csv+=[l.time,l.stationName,l.action,l.actionType,l.source,l.operator,l.result].join(',')+'\n'})
  downloadCSV(csv,'操作日志_'+getToday()+'.csv')
}
function downloadCSV(csv,fn){
  var BOM='﻿',blob=new Blob([BOM+csv],{type:'text/csv;charset=utf-8'})
  var url=URL.createObjectURL(blob),a=document.createElement('a')
  a.href=url;a.download=fn;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url)
}

// ---- INIT ----
renderRoomTabs();selectRoom(curRoom)
;(function updateBadge(){
  var pending=RS.filter(function(r){return MANAGER_ROOMS.indexOf(r.location)>=0&&r.status==='pending_review'})
  document.getElementById('tabBadge').style.display=pending.length?'block':'none';document.getElementById('tabBadge').textContent=pending.length
  setTimeout(updateBadge,10000)
})()

returnToMiniApp=()=>env.host.backToTeacher();if(window.onload)window.onload();
const scope={get(name){switch(name){case "pad":return pad;case "t2m":return t2m;case "ALL_ROOMS":return ALL_ROOMS;case "MANAGER_ROOMS":return MANAGER_ROOMS;case "MANAGER_NAME":return MANAGER_NAME;case "MANAGER_ID":return MANAGER_ID;case "ROOMS":return ROOMS;case "STATIONS":return STATIONS;case "td":return td;case "COURSES":return COURSES;case "MANAGERS":return MANAGERS;case "genRes":return genRes;case "RS":return RS;case "alarms":return alarms;case "logs":return logs;case "curTab":return curTab;case "curRoom":return curRoom;case "mgrSel":return mgrSel;case "mgrAllChk":return mgrAllChk;case "modalCb":return modalCb;case "rejectTarget":return rejectTarget;case "apprTab":return apprTab;case "toast":return toast;case "showModal":return showModal;case "closeModal":return closeModal;case "returnToMiniApp":return returnToMiniApp;case "openSub":return openSub;case "closeSub":return closeSub;case "switchTab":return switchTab;case "renderRoomTabs":return renderRoomTabs;case "selectRoom":return selectRoom;case "renderRoomDevices":return renderRoomDevices;case "mgrToggle":return mgrToggle;case "mgrSelectAll":return mgrSelectAll;case "updateBatchBar":return updateBatchBar;case "mgrPower":return mgrPower;case "mgrBatchOn":return mgrBatchOn;case "mgrBatchOff":return mgrBatchOff;case "logAction":return logAction;case "approvalTab":return approvalTab;case "approveOne":return approveOne;case "openReject":return openReject;case "closeReject":return closeReject;case "confirmReject":return confirmReject;case "manageTab":return manageTab;case "alarmRng":return alarmRng;case "logRng":return logRng;case "logFltr":return logFltr;case "FMT":return FMT;case "getToday":return getToday;case "renderAlarms":return renderAlarms;case "renderLogs":return renderLogs;case "exportAlarmCSV":return exportAlarmCSV;case "exportLogCSV":return exportLogCSV;case "downloadCSV":return downloadCSV;default:return env.globals[name]??document.getElementById(name)}},set(name,value){switch(name){case "pad":pad=value;return value;case "t2m":t2m=value;return value;case "ALL_ROOMS":ALL_ROOMS=value;return value;case "MANAGER_ROOMS":MANAGER_ROOMS=value;return value;case "MANAGER_NAME":MANAGER_NAME=value;return value;case "MANAGER_ID":MANAGER_ID=value;return value;case "ROOMS":ROOMS=value;return value;case "STATIONS":STATIONS=value;return value;case "td":td=value;return value;case "COURSES":COURSES=value;return value;case "MANAGERS":MANAGERS=value;return value;case "genRes":genRes=value;return value;case "RS":RS=value;return value;case "alarms":alarms=value;return value;case "logs":logs=value;return value;case "curTab":curTab=value;return value;case "curRoom":curRoom=value;return value;case "mgrSel":mgrSel=value;return value;case "mgrAllChk":mgrAllChk=value;return value;case "modalCb":modalCb=value;return value;case "rejectTarget":rejectTarget=value;return value;case "apprTab":apprTab=value;return value;case "toast":toast=value;return value;case "showModal":showModal=value;return value;case "closeModal":closeModal=value;return value;case "returnToMiniApp":returnToMiniApp=value;return value;case "openSub":openSub=value;return value;case "closeSub":closeSub=value;return value;case "switchTab":switchTab=value;return value;case "renderRoomTabs":renderRoomTabs=value;return value;case "selectRoom":selectRoom=value;return value;case "renderRoomDevices":renderRoomDevices=value;return value;case "mgrToggle":mgrToggle=value;return value;case "mgrSelectAll":mgrSelectAll=value;return value;case "updateBatchBar":updateBatchBar=value;return value;case "mgrPower":mgrPower=value;return value;case "mgrBatchOn":mgrBatchOn=value;return value;case "mgrBatchOff":mgrBatchOff=value;return value;case "logAction":logAction=value;return value;case "approvalTab":approvalTab=value;return value;case "approveOne":approveOne=value;return value;case "openReject":openReject=value;return value;case "closeReject":closeReject=value;return value;case "confirmReject":confirmReject=value;return value;case "manageTab":manageTab=value;return value;case "alarmRng":alarmRng=value;return value;case "logRng":logRng=value;return value;case "logFltr":logFltr=value;return value;case "FMT":FMT=value;return value;case "getToday":getToday=value;return value;case "renderAlarms":renderAlarms=value;return value;case "renderLogs":renderLogs=value;return value;case "exportAlarmCSV":exportAlarmCSV=value;return value;case "exportLogCSV":exportLogCSV=value;return value;case "downloadCSV":downloadCSV=value;return value;default:throw Error('不可写变量 '+name)}}};
return env.finish(scope,()=>("power"));}
