import {chromium} from '@playwright/test'
import fs from 'node:fs'
fs.mkdirSync('docs/screenshots',{recursive:true})
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'})
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1})
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
try{
 await page.goto('http://127.0.0.1:5173/');await page.locator('input').first().waitFor()
 await page.screenshot({path:'docs/screenshots/login.png',fullPage:true})
 await page.locator('input').nth(0).fill('13800000002');await page.locator('input').nth(1).fill('Demo12345');await page.getByText('登录',{exact:true}).last().click()
 await page.getByText('设备预约',{exact:true}).waitFor({timeout:30000});await page.screenshot({path:'docs/screenshots/student-home.png',fullPage:true})
 await page.getByText('设备预约',{exact:true}).click();await page.locator('input').first().waitFor();await page.screenshot({path:'docs/screenshots/student-devices.png',fullPage:true})
 await page.getByText('我的',{exact:true}).click();await page.getByText('切换为教师',{exact:true}).waitFor();await page.screenshot({path:'docs/screenshots/student-profile.png',fullPage:true})
 await page.getByText('切换为教师',{exact:true}).click();await page.getByText('管理首页',{exact:true}).waitFor({timeout:30000});await page.screenshot({path:'docs/screenshots/teacher-home.png',fullPage:true})
 await page.getByText('个人',{exact:true}).last().click();await page.getByText('切换为学生',{exact:true}).waitFor();await page.screenshot({path:'docs/screenshots/teacher-profile.png',fullPage:true})
 await page.getByText('切换为学生',{exact:true}).click();await page.getByText('设备预约',{exact:true}).waitFor();
 console.log(JSON.stringify({errors,result:'login, student navigation, teacher switch and return passed'},null,2));if(errors.length)process.exitCode=1
}catch(e){await page.screenshot({path:'docs/screenshots/failure.png',fullPage:true});console.error(e.message);console.error(JSON.stringify(errors));process.exitCode=1}finally{await browser.close()}
