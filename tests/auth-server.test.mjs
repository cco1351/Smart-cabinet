import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
const directory=fs.mkdtempSync(path.join(os.tmpdir(),'cabinet-test-'))
process.env.CABINET_DB=path.join(directory,'users.json')
const {createServer}=await import('../server/index.mjs')
const {setTeacher,setPersonType,readDB}=await import('../server/store.mjs')
test('registration cannot escalate; grant/revoke and permission boundaries are authoritative',async()=>{
 let sentCode=''
 const server=createServer({sendResetCode:async({code})=>{sentCode=code}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port
 const call=async(p,body,token)=>{const r=await fetch(base+p,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',Authorization:'Bearer '+(token||'')},...(body?{body:JSON.stringify(body)}:{})});return{status:r.status,data:await r.json()}}
 try{
  const signup=await call('/auth/register',{phone:'13900000123',password:'Password123',name:'测试',roles:['teacher'],teacherPermission:'admin',personType:'teacher'});assert.equal(signup.status,200);assert.deepEqual(signup.data.user.roles,['student']);assert.equal(signup.data.user.personType,'student');assert.equal(signup.data.user.hash,undefined)
  const token=signup.data.token;assert.equal((await call('/teacher/access-check',null,token)).status,403)
  setTeacher('13900000123','approver');assert.equal((await call('/teacher/access-check',null,token)).status,200);assert.equal((await call('/teacher/admin-check',null,token)).status,403);assert.equal((await call('/auth/me',null,token)).data.personType,'student')
  setPersonType('13900000123','teacher');assert.equal((await call('/auth/me',null,token)).data.personType,'teacher');assert.equal((await call('/teacher/access-check',null,token)).status,200)
  setTeacher('13900000123','admin');assert.equal((await call('/teacher/admin-check',null,token)).status,200);assert.deepEqual((await call('/auth/me',null,token)).data.roles,['student','teacher'])
  setTeacher('13900000123','revoke');assert.equal((await call('/teacher/access-check',null,token)).status,403)
  assert.equal((await call('/auth/me',null,'forged')).status,401)
  assert.equal((await call('/auth/password',{oldPassword:'wrong',password:'NewPassword123'},token)).status,400)
  assert.equal((await call('/auth/password',{oldPassword:'Password123',password:'NewPassword123'},token)).status,200)
  assert.equal((await call('/auth/me',null,token)).status,401)
  const nextLogin=await call('/auth/login',{phone:'13900000123',password:'NewPassword123'});assert.equal(nextLogin.status,200)
  const nextToken=nextLogin.data.token
  assert.equal((await call('/auth/password-reset/request',{phone:'13900000123'})).status,200);assert.match(sentCode,/^\d{6}$/)
  assert.equal((await call('/auth/password-reset/confirm',{phone:'13900000123',code:sentCode==='000000'?'000001':'000000',password:'ResetPassword123'})).status,400)
  assert.equal((await call('/auth/password-reset/confirm',{phone:'13900000123',code:sentCode,password:'ResetPassword123'})).status,200)
  assert.equal((await call('/auth/me',null,nextToken)).status,401)
  assert.equal((await call('/auth/password-reset/confirm',{phone:'13900000123',code:sentCode,password:'AgainPassword123'})).status,400)
  assert.equal((await call('/auth/login',{phone:'13900000123',password:'NewPassword123'})).status,401)
  assert.equal((await call('/auth/login',{phone:'13900000123',password:'ResetPassword123'})).status,200)
  assert.deepEqual(readDB().audit.filter(item=>item.operation.startsWith('password')).map(item=>item.operation),['password-change','password-reset'])
 }finally{await new Promise(r=>server.close(r));fs.rmSync(directory,{recursive:true,force:true})}
})
