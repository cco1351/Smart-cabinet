import {chromium} from '@playwright/test'
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'})
const page=await browser.newPage({viewport:{width:390,height:844}})
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
async function login(phone){await page.goto('http://127.0.0.1:5173/#/pages/login/index');await page.locator('input').first().fill(phone);await page.locator('input').nth(1).fill('Demo12345');await page.getByText('登录',{exact:true}).last().click();await page.getByText('设备预约',{exact:true}).waitFor()}
async function teacher(){await page.getByText('我的',{exact:true}).click();await page.getByText('切换为教师',{exact:true}).click();await page.getByText('管理首页',{exact:true}).waitFor()}
try{
 await login('13800000001');await page.getByText('我的',{exact:true}).click();if(await page.getByText('切换为教师',{exact:true}).count())throw Error('学生不应出现教师切换入口')
 await page.goto('http://127.0.0.1:5173/#/packages/teacher/index');await page.getByText('设备预约',{exact:true}).waitFor();if(page.url().includes('packages/teacher'))throw Error('教师路由未拦截')
 await page.getByText('我的',{exact:true}).click();await page.getByText('退出登录',{exact:true}).click();await page.getByText('确定',{exact:true}).click();await page.locator('input').first().waitFor()
 await login('13800000002');await teacher();await page.getByText('借用审核',{exact:true}).click();await page.getByText('导出记录',{exact:true}).waitFor();await page.screenshot({path:'docs/screenshots/teacher-approvals.png',fullPage:true})
 await page.goto('http://127.0.0.1:5173/#/packages/teacher/index');await page.getByText('电源管理',{exact:true}).click();await page.getByText('工位',{exact:true}).last().waitFor();await page.screenshot({path:'docs/screenshots/power-admin.png',fullPage:true})
 await page.goto('http://127.0.0.1:5173/#/pages/login/index');await login('13800000003');await teacher();await page.goto('http://127.0.0.1:5173/#/packages/teacher/power-admin');await page.waitForURL(/power-approver/);await page.screenshot({path:'docs/screenshots/power-approver.png',fullPage:true})
 console.log(JSON.stringify({errors,result:'student route denial, teacher approvals, power navigation, approver isolation passed'},null,2));if(errors.length)process.exitCode=1
}catch(e){console.error(e.message);console.error(errors);await page.screenshot({path:'docs/screenshots/access-failure.png',fullPage:true});process.exitCode=1}finally{await browser.close()}
