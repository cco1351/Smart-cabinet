import { reactive } from 'vue'
import { config } from '../config.js'
const KEY = 'cabinet.session.v1'
const DB = 'cabinet.demo.accounts.v1'
let navigationBusy = false
const demoResetCodes = new Map()
const DEMO_RESET_CODE = '123456'
const DEMO_PHONES = { 'demo-student':'13800000001', 'demo-teacher':'13800000002', 'demo-approver':'13800000003' }
const SHORT_DEMO_ACCOUNTS = ['000001', '000002', '000003', '00003']
export function safeReLaunch(url) {
  if (navigationBusy) return false
  navigationBusy = true
  uni.reLaunch({ url, complete: () => setTimeout(() => { navigationBusy = false }, 350) })
  return true
}
export const session = reactive({ token: '', user: null, currentRole: 'student', ...uni.getStorageSync(KEY) })
function persist() { uni.setStorageSync(KEY, { token: session.token, user: session.user, currentRole: session.currentRole }) }
export function hasRole(role) { return !!session.user?.roles?.includes(role) }
export function destination(role = session.currentRole) { return `/packages/${role}/index` }
export function request(path, data, method = 'GET') {
  return new Promise((resolve, reject) => uni.request({ url: config.apiBase + path, method, data, timeout: config.requestTimeout,
    header: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' },
    success: r => { if (r.statusCode === 401) clearSession(); r.statusCode >= 200 && r.statusCode < 300 ? resolve(r.data) : reject(new Error(r.data?.message || '请求失败')) }, fail: () => reject(new Error('无法连接服务，请检查服务地址与网络')) }))
}
function demoAccounts() {
  const existing = uni.getStorageSync(DB)
  if (Array.isArray(existing)) {
    let changed = false
    for (const account of existing) {
      if (!account.personType) {
        account.personType = account.id === 'demo-teacher' ? 'teacher' : 'student'
        changed = true
      }
      const demoPhone = DEMO_PHONES[account.id]
      if (demoPhone && account.credentialVersion !== 2) {
        if (SHORT_DEMO_ACCOUNTS.includes(account.phone)) account.phone = demoPhone
        if (account.password === 'Demo12345' || String(account.password || '').length < 8) account.password = '12345678'
        delete account.aliases
        delete account.legacyPhone
        account.credentialVersion = 2
        changed = true
      }
    }
    if (changed) uni.setStorageSync(DB, existing)
    return existing
  }
  const records = [{ id:'demo-student', phone:'13800000001', password:'12345678', credentialVersion:2, name:'张三', personType:'student', roles:['student'] },
    { id:'demo-teacher', phone:'13800000002', password:'12345678', credentialVersion:2, name:'王明', personType:'teacher', roles:['student','teacher'], teacherPermission:'admin' },
    { id:'demo-approver', phone:'13800000003', password:'12345678', credentialVersion:2, name:'陈思远', personType:'student', roles:['student','teacher'], teacherPermission:'approver' }]
  uni.setStorageSync(DB, records); return records
}
function publicUser(u) { const { password, ...user } = u; return user }
export async function login(phone, password, register = false, name = '') {
  const accountId = String(phone || '').trim()
  if (!/^1\d{10}$/.test(accountId)) throw new Error('请输入11位手机号')
  if (typeof password !== 'string' || password.length < 8 || password.length > 64) throw new Error('密码须为8至64位')
  let result
  if (config.mode === 'api') result = await request(register ? '/auth/register' : '/auth/login', { phone: accountId, password, name }, 'POST')
  else {
    const accounts = demoAccounts()
    let user = accounts.find(a => a.phone === accountId)
    if (register) { if (user) throw new Error('该手机号已注册'); user = { id:'user-'+Date.now(), phone:accountId, password, name:name || '新用户', personType:'student', roles:['student'] }; accounts.push(user); uni.setStorageSync(DB, accounts) }
    if (!user || user.password !== password) throw new Error('手机号或密码错误')
    result = { token:'demo:'+user.id, user:publicUser(user) }
  }
  const previousRole = session.user?.id === result.user.id ? session.currentRole : 'student'
  Object.assign(session, result, { currentRole:result.user.roles.includes(previousRole) ? previousRole : 'student' }); persist()
  return result.user
}
export async function refresh() {
  if (!session.token) return false
  try {
    let user
    if (config.mode === 'api') user = await request('/auth/me')
    else { const u = demoAccounts().find(a => a.id === session.token.slice(5)); if (!u) { clearSession(); return false }; user = publicUser(u) }
    session.user = user
    if (!hasRole(session.currentRole)) session.currentRole = 'student'
    persist(); return true
  } catch (e) { throw e }
}
export async function guard(role) {
  try {
    if (!await refresh()) { safeReLaunch('/pages/login/index'); return false }
    if (!hasRole(role) || session.currentRole !== role) { safeReLaunch(destination()); return false }
    return true
  } catch (e) { uni.showToast({ title:e.message, icon:'none' }); return false }
}
export async function switchRole(role) {
  await refresh()
  if (!hasRole(role)) throw new Error('当前账号没有该身份权限')
  session.currentRole = role; persist(); safeReLaunch(destination(role))
}
export function clearSession() { session.token=''; session.user=null; session.currentRole='student'; uni.removeStorageSync(KEY) }
export async function logout() { if(config.mode === 'api' && session.token) await request('/auth/logout',{},'POST').catch(()=>{}); clearSession(); safeReLaunch('/pages/login/index') }

function validateNewPassword(password) {
  if (typeof password !== 'string' || password.length < 8 || password.length > 64) throw new Error('新密码须为8至64位')
}
export async function changePassword(oldPassword, password, confirm) {
  if (!session.user) throw new Error('请先登录')
  if (!oldPassword) throw new Error('请输入原密码')
  validateNewPassword(password)
  if (password !== confirm) throw new Error('两次输入的新密码不一致')
  if (password === oldPassword) throw new Error('新密码不能与原密码相同')
  if (config.mode === 'api') await request('/auth/password', { oldPassword, password }, 'POST')
  else {
    const accounts = demoAccounts()
    const account = accounts.find(item => item.id === session.user.id)
    if (!account || account.password !== oldPassword) throw new Error('原密码错误')
    account.password = password
    uni.setStorageSync(DB, accounts)
  }
  clearSession()
}
export async function requestPasswordResetCode(phone) {
  if (!/^1\d{10}$/.test(phone)) throw new Error('请输入11位手机号')
  if (config.mode === 'api') return request('/auth/password-reset/request', { phone }, 'POST')
  const now = Date.now()
  const previous = demoResetCodes.get(phone)
  if (previous && now - previous.sentAt < 60000) throw new Error('请稍后再获取验证码')
  demoResetCodes.set(phone, { code: DEMO_RESET_CODE, sentAt: now, attempts: 0 })
  return { demoCode: DEMO_RESET_CODE }
}
export async function resetPassword(phone, code, password, confirm) {
  if (!/^1\d{10}$/.test(phone)) throw new Error('请输入11位手机号')
  validateNewPassword(password)
  if (password !== confirm) throw new Error('两次输入的新密码不一致')
  if (config.mode === 'api') await request('/auth/password-reset/confirm', { phone, code, password }, 'POST')
  else {
    const challenge = demoResetCodes.get(phone)
    if (!challenge || Date.now() - challenge.sentAt > 5 * 60000 || challenge.attempts >= 5) throw new Error('验证码已失效，请重新获取')
    challenge.attempts++
    if (code !== challenge.code) throw new Error('验证码错误')
    const accounts = demoAccounts()
    const account = accounts.find(item => item.phone === phone)
    if (!account) throw new Error('演示账号不存在')
    account.password = password
    uni.setStorageSync(DB, accounts)
    demoResetCodes.delete(phone)
  }
  clearSession()
}

