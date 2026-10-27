const pad=n=>String(n).padStart(2,'0')
const date=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
const stamp=d=>`${date(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`
// Add once per ID; keep existing records and already-demonstrated approval results.
export function addPowerDemoRecords(runtime,now=new Date()){
 const tomorrow=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1)
 const merge=(field,rows)=>{const list=runtime.scope.get(field);if(Array.isArray(list))for(const row of rows)if(!list.some(x=>x.id===row.id))list.push(row)}
 merge('RS',[
  {id:'power-demo-res-01',studentName:'陈同学',studentId:'20230401',stationName:'工位 B-03',location:'302 实验室',purpose:'【演示】传感器电路调试',date:date(tomorrow),timeSlot:'08:30-10:00',status:'pending_review',statusText:'审核中'},
  {id:'power-demo-res-02',studentName:'周同学',studentId:'20230402',stationName:'工位 B-06',location:'302 实验室',purpose:'【演示】单片机课程设计',date:date(tomorrow),timeSlot:'14:00-15:30',status:'pending_review',statusText:'审核中'},
  {id:'power-demo-res-03',studentName:'林同学',studentId:'20230403',stationName:'工位 B-08',location:'302 实验室',purpose:'【演示】数字电路实验',date:date(tomorrow),timeSlot:'10:00-11:30',status:'approved',statusText:'已通过',auditorName:'演示管理员',auditTime:stamp(now)},
  {id:'power-demo-res-04',studentName:'吴同学',studentId:'20230404',stationName:'工位 B-10',location:'302 实验室',purpose:'【演示】课程实验补做',date:date(tomorrow),timeSlot:'15:30-17:00',status:'rejected',statusText:'已驳回',rejectReason:'演示：该工位安排检修，请改选其他工位',auditorName:'演示管理员',auditTime:stamp(now)}
 ])
 merge(runtime.scope.get('ALARMS')?'ALARMS':'alarms',[
  {id:'power-demo-alarm-01',stationName:'工位 B-03',lab:'302 实验室',level:1,message:'【演示】温度超过保护阈值，请检查负载及散热',status:'unread',time:stamp(new Date(now-5*60000)),actualValue:'82°C',threshold:'80°C'},
  {id:'power-demo-alarm-02',stationName:'工位 B-06',lab:'302 实验室',level:2,message:'【演示】电流持续偏高，请检查接入设备',status:'unread',time:stamp(new Date(now-20*60000)),actualValue:'13.6A',threshold:'12.8A'},
  {id:'power-demo-alarm-03',stationName:'工位 B-12',lab:'302 实验室',level:3,message:'【演示】设备离线，请检查电源与网络连接',status:'read',time:stamp(new Date(now-40*60000)),actualValue:'离线5分钟',threshold:'3分钟'}
 ])
 merge(runtime.scope.get('LOGS')?'LOGS':'logs',[
  {id:'power-demo-log-01',time:stamp(now),stationName:'工位 B-08',lab:'302 实验室',action:'【演示】远程通电',actionType:'remote_on',source:'管理员',operator:'演示管理员',result:'成功'},
  {id:'power-demo-log-02',time:stamp(new Date(now-10*60000)),stationName:'工位 B-12',lab:'302 实验室',action:'【演示】远程断电（设备离线）',actionType:'remote_off',source:'管理员',operator:'演示管理员',result:'失败'}
 ])
 const d=runtime.document,banner=d.querySelector('.banner,.role-banner')
 if(banner&&!d.getElementById('power-demo-label')){const label=d.createElement('span');label.id='power-demo-label';label.className='power-demo-label';label.textContent='演示数据';banner.append(label)}
}
