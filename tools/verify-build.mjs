import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
const root='dist/build/mp-weixin'
const json=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'))
const app=json('app.json');assert.equal(app.subPackages.length,2);assert.ok(app.subPackages.every(p=>!p.independent));assert.ok(!app.tabBar)
assert.equal(app.usingComponents['native-node'],'/components/NativeNode')
for(const p of ['components/NativeNode.js','components/NativeNode.json','components/NativeNode.wxml','packages/student/index.js','packages/teacher/index.js'])assert.ok(fs.existsSync(path.join(root,p)),p)
const sizes={main:0,student:0,teacher:0};function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())scan(p);else{const rel=path.relative(root,p).replaceAll('\\','/');const group=rel.startsWith('packages/student/')?'student':rel.startsWith('packages/teacher/')?'teacher':'main';sizes[group]+=fs.statSync(p).size}}}scan(root)
for(const [name,size]of Object.entries(sizes))assert.ok(size<2*1024*1024,name+' exceeds 2 MiB')
console.log(JSON.stringify({ordinarySubpackages:true,nativeRenderer:true,bytes:sizes},null,2))
