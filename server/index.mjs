import http from 'node:http'
import {createHash,randomBytes,randomInt,timingSafeEqual} from 'node:crypto'
import {fileURLToPath} from 'node:url'
import {readDB,writeDB,hash,verify,createUser,publicUser} from './store.mjs'
const tokens=new Map(),attempts=new Map()
const resetChallenges=new Map(),resetRequests=new Map()
const hashResetCode=(salt,code)=>createHash('sha256').update(salt+':'+code).digest()
export function createServer({sendResetCode}={}){return http.createServer(async(req,res)=>{
 const origin=process.env.ALLOWED_ORIGIN||'http://localhost:5173'
 res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Content-Type','application/json; charset=utf-8')
 if(req.method==='OPTIONS'){res.writeHead(204);res.end();return}
 const send=(status,value)=>{res.writeHead(status);res.end(JSON.stringify(value))}
 try{
  let body={};if(req.method==='POST'){let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>16384){send(413,{message:'请求过大'});return}}try{body=raw?JSON.parse(raw):{}}catch{send(400,{message:'JSON 格式错误'});return}}
  if(['/auth/login','/auth/register'].includes(req.url)&&req.method==='POST'){
   const key=req.socket.remoteAddress+':'+String(body.phone),now=Date.now();let rate=attempts.get(key)||{since:now,count:0};if(now-rate.since>60000)rate={since:now,count:0};rate.count++;attempts.set(key,rate);if(rate.count>15){send(429,{message:'请求过于频繁，请稍后再试'});return}
   let user;if(req.url==='/auth/register')user=createUser(body);else{user=readDB().users.find(u=>u.phone===body.phone);if(!user||typeof body.password!=='string'||body.password.length>64||!verify(user,body.password)){send(401,{message:'手机号或密码错误'});return}}
   const token=randomBytes(32).toString('hex');tokens.set(token,{userId:user.id,expires:Date.now()+7*86400000});send(200,{token,user:publicUser(user)});return
  }
  if(req.url==='/auth/password-reset/request'&&req.method==='POST'){
   if(!/^1\d{10}$/.test(body.phone)){send(400,{message:'请输入11位手机号'});return}
   if(typeof sendResetCode!=='function'){send(503,{message:'短信服务尚未配置，暂不能找回密码'});return}
   const now=Date.now(),key=req.socket.remoteAddress+':'+body.phone
   if(now-(resetRequests.get(key)||0)<60000){send(429,{message:'请稍后再获取验证码'});return}
   resetRequests.set(key,now)
   const user=readDB().users.find(u=>u.phone===body.phone)
   if(user){
    const code=String(randomInt(0,1000000)).padStart(6,'0'),salt=randomBytes(16).toString('hex')
    try{await sendResetCode({phone:body.phone,code})}catch{send(503,{message:'验证码发送失败，请稍后重试'});return}
    resetChallenges.set(body.phone,{salt,digest:hashResetCode(salt,code),expires:now+5*60000,attempts:0})
   }
   send(200,{ok:true,message:'如果账号已注册，验证码将发送至绑定手机号'});return
  }
  if(req.url==='/auth/password-reset/confirm'&&req.method==='POST'){
   const {phone,code,password}=body
   if(!/^1\d{10}$/.test(phone)||typeof code!=='string'||!/^\d{6}$/.test(code)||typeof password!=='string'||password.length<8||password.length>64){send(400,{message:'手机号、验证码或新密码格式错误'});return}
   const challenge=resetChallenges.get(phone)
   if(!challenge||challenge.expires<Date.now()||challenge.attempts>=5){resetChallenges.delete(phone);send(400,{message:'验证码错误或已失效'});return}
   challenge.attempts++
   if(!timingSafeEqual(challenge.digest,hashResetCode(challenge.salt,code))){send(400,{message:'验证码错误或已失效'});return}
   const db=readDB(),user=db.users.find(u=>u.phone===phone)
   if(!user){resetChallenges.delete(phone);send(400,{message:'验证码错误或已失效'});return}
   if(verify(user,password)){send(400,{message:'新密码不能与原密码相同'});return}
   Object.assign(user,hash(password));db.audit.push({at:new Date().toISOString(),userId:user.id,operation:'password-reset'});writeDB(db)
   resetChallenges.delete(phone);for(const [key,s]of tokens)if(s.userId===user.id)tokens.delete(key)
   send(200,{ok:true});return
  }
  const token=String(req.headers.authorization||'').replace(/^Bearer /,''),session=tokens.get(token),user=session&&readDB().users.find(u=>u.id===session.userId)
  if(!session||session.expires<Date.now()||!user){tokens.delete(token);send(401,{message:'登录已失效'});return}
  if(req.url==='/auth/me'&&req.method==='GET'){send(200,publicUser(user));return}
  if(req.url==='/auth/logout'&&req.method==='POST'){tokens.delete(token);send(200,{ok:true});return}
  if(req.url==='/auth/password'&&req.method==='POST'){
   if(typeof body.oldPassword!=='string'||body.oldPassword.length>64||!verify(user,body.oldPassword)||typeof body.password!=='string'||body.password.length<8||body.password.length>64){send(400,{message:'原密码错误或新密码不符合要求'});return}
   if(body.password===body.oldPassword){send(400,{message:'新密码不能与原密码相同'});return}
   const db=readDB();Object.assign(db.users.find(u=>u.id===user.id),hash(body.password));db.audit.push({at:new Date().toISOString(),userId:user.id,operation:'password-change'});writeDB(db);for(const [key,s]of tokens)if(s.userId===user.id)tokens.delete(key);send(200,{ok:true});return
  }
  if(req.url?.startsWith('/teacher/')){
   if(!user.roles.includes('teacher')){send(403,{message:'需要教师权限'});return}
   if(req.url==='/teacher/admin-check'&&user.teacherPermission!=='admin'){send(403,{message:'需要管理员权限'});return}
   if(['/teacher/access-check','/teacher/admin-check'].includes(req.url)){send(200,{allowed:true,permission:user.teacherPermission});return}
  }
  send(404,{message:'接口不存在'})
 }catch(e){send(400,{message:e.message})}
})}
if(process.argv[1]===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||8787);createServer().listen(port,'127.0.0.1',()=>console.log(`鉴权服务：http://127.0.0.1:${port}；注册账号始终为学生；教师授权使用 server/accounts.mjs`))}
