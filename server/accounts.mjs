import {setTeacher,setPersonType,readDB,publicUser} from './store.mjs'
const [command,phone,permission]=process.argv.slice(2)
try{
 if(command==='list')console.log(JSON.stringify(readDB().users.map(publicUser),null,2))
 else if(command==='grant')console.log(JSON.stringify(setTeacher(phone,permission||'admin'),null,2))
 else if(command==='revoke')console.log(JSON.stringify(setTeacher(phone,'revoke'),null,2))
 else if(command==='person-type')console.log(JSON.stringify(setPersonType(phone,permission),null,2))
 else{console.log('用法：node server/accounts.mjs list | grant 手机号 admin/approver | revoke 手机号 | person-type 手机号 student/teacher/other');process.exitCode=1}
}catch(e){console.error(e.message);process.exitCode=1}
