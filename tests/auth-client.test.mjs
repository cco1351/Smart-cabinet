import test from 'node:test'
import assert from 'node:assert/strict'

const storage = new Map()
globalThis.uni = {
  getStorageSync:key=>storage.get(key),
  setStorageSync:(key,value)=>storage.set(key,value),
  removeStorageSync:key=>storage.delete(key),
  reLaunch:({complete})=>complete?.()
}
const auth = await import('../src/services/auth.js')

test('person type stays separate from workspace; change and reset update the same demo credential', async()=>{
  const approver = await auth.login('13800000003','12345678')
  assert.equal(approver.personType,'student')
  assert.deepEqual(approver.roles,['student','teacher'])
  await auth.switchRole('teacher')
  assert.equal(auth.session.currentRole,'teacher')
  await auth.logout()

  const admin = await auth.login('13800000002','12345678')
  assert.equal(admin.personType,'teacher')
  assert.deepEqual(admin.roles,['student','teacher'])
  await auth.switchRole('teacher')
  assert.equal(auth.session.currentRole,'teacher')
  await assert.rejects(auth.changePassword('incorrect','Changed12345','Changed12345'),/原密码错误/)
  await auth.changePassword('12345678','Changed12345','Changed12345')
  assert.equal(auth.session.user,null)
  await assert.rejects(auth.login('13800000002','Demo12345'),/手机号或密码错误/)
  await auth.login('13800000002','Changed12345')
  assert.equal(auth.session.currentRole,'student')
  await assert.rejects(auth.changePassword('Demo12345','Bypass12345','Bypass12345'),/原密码错误/)
  await assert.rejects(auth.changePassword('12345678','Bypass12345','Bypass12345'),/原密码错误/)

  const challenge = await auth.requestPasswordResetCode('13800000002')
  assert.equal(challenge.demoCode,'123456')
  await assert.rejects(auth.resetPassword('13800000002','000000','Reset12345','Reset12345'),/验证码错误/)
  await auth.resetPassword('13800000002',challenge.demoCode,'Reset12345','Reset12345')
  assert.equal(auth.session.user,null)
  await assert.rejects(auth.login('13800000002','Changed12345'),/手机号或密码错误/)
  assert.equal((await auth.login('13800000002','Reset12345')).personType,'teacher')
})

test('new phone registration needs no name and can log in again after logout', async()=>{
  const user=await auth.login('13912345678','12345678',true)
  assert.equal(user.name,'新用户')
  assert.deepEqual(user.roles,['student'])
  await auth.logout()
  assert.equal((await auth.login('13912345678','12345678')).id,user.id)
  await assert.rejects(auth.login('000001','12345678'),/11位手机号/)
  await assert.rejects(auth.login('13912345678','123456'),/8至64位/)
})

test('short demo accounts migrate once and preserve user-changed passwords', async()=>{
  auth.clearSession()
  storage.set('cabinet.demo.accounts.v1',[
    {id:'demo-student',phone:'000001',password:'123456',name:'张三',roles:['student'],legacyPhone:'13800000001'},
    {id:'demo-teacher',phone:'000002',password:'Personal123',name:'王明',roles:['student','teacher'],teacherPermission:'admin'},
    {id:'demo-approver',phone:'000003',password:'Demo12345',name:'陈思远',roles:['student','teacher'],teacherPermission:'approver',aliases:['00003']}
  ])
  assert.equal((await auth.login('13800000001','12345678')).id,'demo-student')
  assert.equal((await auth.login('13800000002','Personal123')).id,'demo-teacher')
  assert.equal((await auth.login('13800000003','12345678')).id,'demo-approver')
  await assert.rejects(auth.login('13800000003','Demo12345'),/手机号或密码错误/)
  await auth.changePassword('12345678','Updated123','Updated123')
  await auth.login('13800000003','Updated123')
  await assert.rejects(auth.changePassword('Demo12345','Again1234','Again1234'),/原密码错误/)
})
