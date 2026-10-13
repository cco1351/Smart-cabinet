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
  const approver = await auth.login('000003','123456')
  assert.equal(approver.personType,'teacher')
  assert.deepEqual(approver.roles,['student','teacher'])
  await auth.switchRole('teacher')
  assert.equal(auth.session.currentRole,'teacher')
  await auth.logout()

  const admin = await auth.login('000002','123456')
  assert.equal(admin.personType,'teacher')
  assert.deepEqual(admin.roles,['student','teacher'])
  await auth.switchRole('teacher')
  assert.equal(auth.session.currentRole,'teacher')
  await assert.rejects(auth.changePassword('incorrect','Changed12345','Changed12345'),/原密码错误/)
  await auth.changePassword('123456','Changed12345','Changed12345')
  assert.equal(auth.session.user,null)
  await assert.rejects(auth.login('000002','123456'),/手机号或密码错误/)
  await auth.login('000002','Changed12345')
  assert.equal(auth.session.currentRole,'student')

  const challenge = await auth.requestPasswordResetCode('000002')
  assert.equal(challenge.demoCode,'123456')
  await assert.rejects(auth.resetPassword('000002','000000','Reset12345','Reset12345'),/验证码错误/)
  await auth.resetPassword('000002',challenge.demoCode,'Reset12345','Reset12345')
  assert.equal(auth.session.user,null)
  await assert.rejects(auth.login('000002','Changed12345'),/手机号或密码错误/)
  assert.equal((await auth.login('000002','Reset12345')).personType,'teacher')
})
