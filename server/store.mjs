import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {randomBytes,scryptSync,timingSafeEqual,randomUUID} from 'node:crypto'
export const dataFile=process.env.CABINET_DB||path.join(path.dirname(fileURLToPath(import.meta.url)),'data/accounts.json')
export function readDB(){return fs.existsSync(dataFile)?JSON.parse(fs.readFileSync(dataFile,'utf8')):{users:[],audit:[]}}
export function writeDB(db){fs.mkdirSync(path.dirname(dataFile),{recursive:true});const temp=dataFile+'.tmp';fs.writeFileSync(temp,JSON.stringify(db,null,2));fs.renameSync(temp,dataFile)}
export function hash(password,salt=randomBytes(16).toString('hex')){return {salt,hash:scryptSync(password,salt,64).toString('hex')}}
export function verify(user,password){const candidate=hash(password,user.salt).hash;return timingSafeEqual(Buffer.from(user.hash,'hex'),Buffer.from(candidate,'hex'))}
export function publicUser(u){const {hash,salt,...safe}=u;return {...safe,personType:u.personType||'student'}}
export function createUser({phone,password,name}){if(!/^1\d{10}$/.test(phone)||typeof password!=='string'||password.length<8||password.length>64)throw Error('手机号无效或密码长度不在8至64位之间');const db=readDB();if(db.users.some(u=>u.phone===phone))throw Error('手机号已注册');const user={id:randomUUID(),phone,name:String(name||'新用户').slice(0,30),personType:'student',roles:['student'],createdAt:new Date().toISOString(),...hash(password)};db.users.push(user);writeDB(db);return user}
export function setTeacher(phone,permission){const db=readDB(),u=db.users.find(x=>x.phone===phone);if(!u)throw Error('账号不存在，请先注册');if(!['admin','approver','revoke'].includes(permission))throw Error('权限须为 admin / approver / revoke');u.roles=permission==='revoke'?['student']:['student','teacher'];if(permission==='revoke')delete u.teacherPermission;else u.teacherPermission=permission;db.audit.push({at:new Date().toISOString(),phone,operation:permission,source:'server-cli'});writeDB(db);return publicUser(u)}
export function setPersonType(phone,personType){if(!['student','teacher','other'].includes(personType))throw Error('人员类型须为 student / teacher / other');const db=readDB(),u=db.users.find(x=>x.phone===phone);if(!u)throw Error('账号不存在，请先注册');u.personType=personType;db.audit.push({at:new Date().toISOString(),userId:u.id,operation:'person-type',value:personType,source:'server-cli'});writeDB(db);return publicUser(u)}
