import {parsePrototypeDate} from '../../runtime/dates.js';
import {createEnvironment} from '../../runtime/environment.js';
export function createPrototype(host){const env=createEnvironment("<!DOCTYPE html>\r\n<html lang=\"zh-CN\">\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1,max-scale=1,user-scalable=no\">\r\n    <title>实验室智能柜</title>\r\n    \r\n</head>\r\n<body>\r\n    <main class=\"shell\">\r\n        <header class=\"header\">\r\n            <button class=\"back\" onclick=\"back()\">‹</button>\r\n            <h1 id=\"title\">首页</h1>\r\n            <div class=\"header-right\" id=\"headerRight\">\r\n                <button class=\"msg-btn\" onclick=\"show('messages')\" id=\"msgBtn\">🔔<span class=\"msg-badge\" id=\"msgBadge\">0</span></button>\r\n            </div>\r\n        </header>\r\n\r\n        <!-- 首页 -->\r\n        <section class=\"page active\" id=\"home\">\r\n            <div class=\"carousel\" id=\"noticeCarousel\">\r\n                <div class=\"carousel-track\" id=\"carouselTrack\">\r\n                    <div class=\"carousel-slide\">📢 系统维护通知：本周六 22:00–次日 02:00</div>\r\n                    <div class=\"carousel-slide\">📢 新设备上线：逻辑分析仪已入库</div>\r\n                    <div class=\"carousel-slide\">📢 安全考试更新：新增RFID设备试卷</div>\r\n                </div>\r\n                <div class=\"carousel-dots\" id=\"carouselDots\"><span class=\"active\"></span><span></span><span></span></div>\r\n            </div>\r\n\r\n            <div class=\"home-stats\">\r\n                <div class=\"stat-wrap\" id=\"statPickupWrap\">\r\n                    <div class=\"stat\" onclick=\"toggleHomePanel('pickup')\">\r\n                        <b id=\"pickupCount\">2</b>\r\n                        <span class=\"label\">待领取 <i class=\"arrow\">▾</i></span>\r\n                    </div>\r\n                </div>\r\n                <div class=\"stat-wrap\" id=\"statReturnWrap\">\r\n                    <div class=\"stat\" onclick=\"toggleHomePanel('return')\">\r\n                        <b style=\"color:#16a34a\">3</b>\r\n                        <span class=\"label\">待归还 <i class=\"arrow\">▾</i></span>\r\n                    </div>\r\n                </div>\r\n                <div class=\"stat-wrap\" id=\"statApprovalWrap\">\r\n                    <div class=\"stat\" onclick=\"toggleHomePanel('approval')\">\r\n                        <b style=\"color:#f59e0b\" id=\"pendingCount\">0</b>\r\n                        <span class=\"label\">待审批 <i class=\"arrow\">▾</i></span>\r\n                    </div>\r\n                </div>\r\n                <div class=\"stat-wrap\" id=\"statReserveWrap\">\r\n                    <div class=\"stat\" onclick=\"toggleHomePanel('reserve')\">\r\n                        <b id=\"reserveCountNum\" style=\"color:var(--brand)\">0</b>\r\n                        <span class=\"label\">工位预约 <i class=\"arrow\">▾</i></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"home-content-box\" id=\"homeContentBox\"></div>\r\n\r\n            <div class=\"section-title\">常用高频设备</div>\r\n            <article class=\"card device\"><div class=\"row\"><h3>数字示波器</h3><button class=\"btn\" onclick=\"borrow('数字示波器')\">选择借用</button></div><small>型号：DS1054Z · 标签码：125896 · 设备位置：1号楼3层</small><span class=\"resource-link\" onclick=\"openResource('数字示波器')\">设备手册 / 配套资源</span></article>\r\n            <article class=\"card device\"><div class=\"row\"><h3>直流稳压电源</h3><button class=\"btn\" onclick=\"handleRFIDBorrow('直流稳压电源')\">选择借用</button></div><small>型号：DY-3005 · RFID码：714296 · 设备位置：1号楼3层</small><span class=\"resource-link\" onclick=\"openResource('直流稳压电源')\">设备手册 / 配套资源</span></article>\r\n            <article class=\"card device\"><div class=\"row\"><h3>函数信号发生器</h3><button class=\"btn\" onclick=\"borrow('函数信号发生器')\">选择借用</button></div><small>型号：FY6900 · 标签码：246813 · 设备位置：1号楼3层</small><span class=\"resource-link\" onclick=\"openResource('函数信号发生器')\">设备手册 / 配套资源</span></article>\r\n        </section>\r\n\r\n        <!-- 设备列表 -->\r\n        <section class=\"page\" id=\"devices\">\r\n            <input id=\"deviceSearchInput\" placeholder=\"搜索设备名称、型号或标签码\" oninput=\"filterDeviceList()\">\r\n            <div class=\"device-wrap-row\">\r\n                <div class=\"device-cate-left\">\r\n                    <div class=\"cate-item active\" data-cate=\"osc\">示波器</div>\r\n                    <div class=\"cate-item\" data-cate=\"meter\">万用表</div>\r\n                    <div class=\"cate-item\" data-cate=\"power\">实验电源</div>\r\n                    <div class=\"cate-item\" data-cate=\"sensor\">传感器</div>\r\n                    <div class=\"cate-item\" data-cate=\"tool\">工具器材</div>\r\n                </div>\r\n                <div class=\"device-right-content\"><div class=\"device-two-grid\" id=\"deviceListWrap\"></div></div>\r\n            </div>\r\n        </section>\r\n\r\n        <!-- 设备详情 -->\r\n        <section class=\"page\" id=\"deviceDetail\">\r\n            <div class=\"card\"><h3 id=\"detailDevName\">设备名称</h3><p id=\"detailDeviceMeta\">型号：-<br>设备位置：-</p><p id=\"detailCateText\">分类：示波器</p><span class=\"resource-link\" onclick=\"openResource(pendingDevice)\">设备手册 / 配套资源</span></div>\r\n\r\n            <!-- 时间摘要（点击右侧按钮打开底部抽屉） -->\r\n            <div class=\"time-summary-compact\" id=\"timeSummaryCompact\">\r\n                <div class=\"info\" id=\"compactSummary\">\r\n                    <span>📅 取用：</span><span class=\"placeholder\" id=\"compactStart\">选择时间</span>\r\n                    <span style=\"margin:0 4px;\">→</span>\r\n                    <span>归还：</span><span class=\"placeholder\" id=\"compactEnd\">选择时间</span>\r\n                </div>\r\n                <button class=\"btn btn-edit\" onclick=\"openTimePicker()\">修改时间</button>\r\n            </div>\r\n\r\n            <div class=\"section-title\">可用设备</div>\r\n            <div id=\"deviceDetailListWrap\"></div>\r\n        </section>\r\n\r\n        <!-- 借用申请 -->\r\n        <section class=\"page\" id=\"borrow\">\r\n            <div class=\"card\"><h3 id=\"borrowName\">设备借用申请</h3></div>\r\n            <div class=\"borrow-info-card\" id=\"borrowInfoCard\">\r\n                <div class=\"info-row\"><span class=\"label\">设备名称</span><span id=\"borrowDevName\">-</span></div>\r\n                <div class=\"info-row\"><span class=\"label\">设备型号</span><span id=\"borrowDevModel\">-</span></div>\r\n                <div class=\"info-row\"><span class=\"label\">借用时间</span><span id=\"borrowTimeDisplay\">-</span></div>\r\n                <div class=\"info-row\"><span class=\"label\">借用时长</span><span id=\"borrowDurationDisplay\">-</span></div>\r\n            </div>\r\n            <div class=\"card\">\r\n                <label>申请原因（选填）</label>\r\n                <input id=\"borrowReason\" placeholder=\"请输入借用原因，如：课程实验、项目开发等\" maxlength=\"100\">\r\n            </div>\r\n            <button class=\"btn\" style=\"width:100%\" onclick=\"submitBorrow()\">立即申请</button>\r\n        </section>\r\n\r\n        <!-- 待领取 -->\r\n        <section class=\"page\" id=\"pickup\">\r\n            <div id=\"pickupListWrap\"></div>\r\n        </section>\r\n\r\n        <!-- 待归还 -->\r\n        <section class=\"page\" id=\"returns\">\r\n            <article class=\"card\"><div class=\"row\"><h3>数字示波器</h3><span class=\"access-code\">3897</span></div><p>型号：DS1054Z<br>标签码：125896<br>设备位置：1号楼3层<br>明日 18:00 到期</p></article>\r\n            <article class=\"card\"><div class=\"row\"><h3>直流稳压电源</h3><span class=\"access-code\">6919</span></div><p>型号：DY-3005<br>RFID码：714296<br>设备位置：1号楼4层<br>借用中</p></article>\r\n            <article class=\"card\"><div class=\"row\"><h3>数字万用表</h3><span class=\"access-code\">7759</span></div><p>型号：DT9205<br>标签码：69125<br>设备位置：1号楼3层<br>已逾期 2 天</p></article>\r\n        </section>\r\n\r\n        <!-- 异常上报 -->\r\n        <section class=\"page\" id=\"faultNew\">\r\n            <div class=\"card\">\r\n                <h3>新增异常上报</h3>\r\n                <label>异常类型</label>\r\n                <div class=\"fault-type-selector\" id=\"faultTypeSelector\">\r\n                    <div class=\"choice on\" data-type=\"device\" onclick=\"switchFaultType('device')\">设备异常</div>\r\n                    <div class=\"choice\" data-type=\"cabinet\" onclick=\"switchFaultType('cabinet')\">柜机异常</div>\r\n                </div>\r\n                <div id=\"faultTargetWrap\">\r\n                    <label id=\"faultTargetLabel\">选择设备</label>\r\n                    <select id=\"faultTargetSelect\">\r\n                        <option value=\"数字示波器 · 标签码 125896\">数字示波器 · 标签码 125896</option>\r\n                        <option value=\"直流稳压电源 · RFID 714296\">直流稳压电源 · RFID 714296</option>\r\n                        <option value=\"函数信号发生器 · 标签码 246813\">函数信号发生器 · 标签码 246813</option>\r\n                        <option value=\"逻辑分析仪 · 标签码 980631\">逻辑分析仪 · 标签码 980631</option>\r\n                        <option value=\"手持示波器 · RFID 456123\">手持示波器 · RFID 456123</option>\r\n                    </select>\r\n                </div>\r\n                <div id=\"faultCabinetWrap\" style=\"display:none;\">\r\n                    <label>选择柜机</label>\r\n                    <select id=\"faultCabinetSelect\" onchange=\"onFaultCabinetChange()\">\r\n                        <option value=\"实验室 A01 智能柜\">实验室 A01 智能柜</option>\r\n                        <option value=\"实验室 A02 智能柜\">实验室 A02 智能柜</option>\r\n                        <option value=\"实验室 A03 智能柜\">实验室 A03 智能柜</option>\r\n                        <option value=\"实验室 B01 智能柜\">实验室 B01 智能柜</option>\r\n                        <option value=\"实验室 B02 智能柜\">实验室 B02 智能柜</option>\r\n                        <option value=\"实验室 C02 智能柜\">实验室 C02 智能柜</option>\r\n                    </select>\r\n                    <label style=\"margin-top:8px;\">选择格口</label>\r\n                    <select id=\"faultSlotSelect\">\r\n                        <option value=\"格口 01\">格口 01</option><option value=\"格口 02\">格口 02</option><option value=\"格口 03\">格口 03</option>\r\n                        <option value=\"格口 04\">格口 04</option><option value=\"格口 05\">格口 05</option><option value=\"格口 06\">格口 06</option>\r\n                        <option value=\"格口 07\">格口 07</option><option value=\"格口 08\">格口 08</option><option value=\"格口 09\">格口 09</option>\r\n                        <option value=\"格口 10\">格口 10</option><option value=\"格口 11\">格口 11</option><option value=\"格口 12\">格口 12</option>\r\n                    </select>\r\n                </div>\r\n                <label>异常详细分类</label>\r\n                <div class=\"fault-type-selector\" id=\"faultSubTypeSelector\"></div>\r\n                <label>异常详细描述</label><textarea id=\"faultDesc\" placeholder=\"请描述异常现象、发生时间等\"></textarea>\r\n            </div>\r\n            <div class=\"card\">\r\n                <h3>图片或视频（可选）</h3>\r\n                <input type=\"file\" id=\"faultFileInput\" accept=\"image/*,video/*\" multiple style=\"display:none\" onchange=\"handleUpload()\">\r\n                <button class=\"btn light\" onclick=\"document.getElementById('faultFileInput').click()\">选择图片 / 视频</button>\r\n                <div class=\"upload-preview-wrap\" id=\"uploadPreviewWrap\"></div>\r\n            </div>\r\n            <button class=\"btn\" style=\"width:100%\" onclick=\"submitFault()\">提交异常工单</button>\r\n        </section>\r\n\r\n        <section class=\"page\" id=\"faultDetail\"><article class=\"card\"><h3>异常工单已提交</h3><p>状态：处理中。管理员处理结果将通过消息通知。</p></article><button class=\"btn light\" style=\"width:100%\" onclick=\"show('profile')\">返回个人中心</button></section>\r\n\r\n        <!-- 消息中心 -->\r\n        <section class=\"page\" id=\"messages\">\r\n            <div class=\"section-title\" style=\"margin-top:0;\">系统公告</div>\r\n            <div id=\"noticeListWrap\"></div>\r\n            <div class=\"section-title\">我的消息</div>\r\n            <div id=\"msgListWrap\"></div>\r\n        </section>\r\n\r\n        <!-- 全部订单记录 -->\r\n        <section class=\"page\" id=\"orderRecords\">\r\n            <div class=\"order-filter-tabs\">\r\n                <div class=\"filter-tab active\" data-filter=\"all\" onclick=\"setOrderFilter('all')\">全部</div>\r\n                <div class=\"filter-tab\" data-filter=\"device\" onclick=\"setOrderFilter('device')\">设备订单</div>\r\n                <div class=\"filter-tab\" data-filter=\"reserve\" onclick=\"setOrderFilter('reserve')\">工位预约</div>\r\n            </div>\r\n            <div class=\"search-row\"><input id=\"orderKeyword\" placeholder=\"搜订单号/设备名/工位名\" oninput=\"renderOrderList()\"><button class=\"calendar-icon-btn\" onclick=\"document.getElementById('orderDate').showPicker()\">📅</button><input id=\"orderDate\" type=\"date\" onchange=\"renderOrderList()\"></div>\r\n            <div id=\"orderDateHighlights\" class=\"order-date-highlights\"></div>\r\n            <div id=\"orderListWrap\"></div>\r\n        </section>\r\n\r\n        <!-- 个人中心 -->\r\n        <section class=\"page\" id=\"profile\">\r\n            <div class=\"card\"><div class=\"row\"><h3>张三</h3></div><p>电子学院 · 学号 20260001<br>电子创新实验室<br>📚 华南理工大学</p><div style=\"display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;\"><button class=\"btn light\" onclick=\"show('reauth')\">账号认证</button><button class=\"btn light\" onclick=\"show('organization')\">切换组织</button><button class=\"btn danger\" onclick=\"logout()\">退出登录</button><button class=\"btn light\" onclick=\"show('changePassword')\">修改密码</button></div></div>\r\n            <div class=\"card\" id=\"creditCard\"><h3>信用分：<span id=\"score\">82</span> / 100</h3><div class=\"progress\"><i id=\"creditProgress\" style=\"width:82%\"></i></div><p>信用分低于 60 分将加入黑名单并限制设备借用；可联系管理员解除黑名单和刷新分数。</p><button class=\"btn light\" onclick=\"show('credit')\">信用明细与规则</button><button class=\"btn light\" onclick=\"show('creditRecords')\">查看信用分变动记录</button></div>\r\n            <div class=\"section-title\">我的服务</div>\r\n            <div class=\"profile-grid\">\r\n                <div class=\"shortcut\" onclick=\"show('resources')\"><i>📚</i>资源中心</div>\r\n                <div class=\"shortcut\" onclick=\"show('safety')\"><i>🛡️</i>安全考试</div>\r\n                <div class=\"shortcut\" onclick=\"show('profile')\"><i>❔</i>帮助中心</div>\r\n            </div>\r\n            <div class=\"section-title\">业务记录</div>\r\n            <div class=\"card\"><h3>全部订单记录</h3><p>查看设备借用、归还及工位预约记录。</p><button class=\"btn light\" onclick=\"show('orderRecords')\">查看记录</button></div>\r\n            <div class=\"card\"><div class=\"row\"><h3>新增异常上报</h3></div><p>设备故障、柜机异常等问题上报。</p><div style=\"display:flex;gap:8px;margin-top:6px;\"><button class=\"btn\" onclick=\"show('faultNew')\">去上报</button><button class=\"btn light\" onclick=\"show('faultList')\">去查看</button></div></div>\r\n        </section>\r\n\r\n        <!-- 异常列表 -->\r\n        <section class=\"page\" id=\"faultList\">\r\n            <div id=\"faultListWrap\"></div>\r\n        </section>\r\n\r\n        <section class=\"page\" id=\"organization\"><div class=\"card\"><h3>我的组织列表</h3><div class=\"org-list\" id=\"orgListWrap\"><div class=\"org-item\" data-org=\"电子创新实验室\"><div class=\"org-name\">电子创新实验室</div><button class=\"btn light\" onclick=\"selectOrg('电子创新实验室')\">切换</button></div><div class=\"org-item\" data-org=\"自动化实训中心\"><div class=\"org-name\">自动化实训中心</div><button class=\"btn light\" onclick=\"selectOrg('自动化实训中心')\">切换</button></div><div class=\"org-item\" data-org=\"通信工程创新实验室\"><div class=\"org-name\">通信工程创新实验室</div><button class=\"btn light\" onclick=\"selectOrg('通信工程创新实验室')\">切换</button></div></div></div><div class=\"card\"><h3>加入其他组织</h3><label>选择组织名称</label><select id=\"joinOrgSelect\"><option>电子创新实验室</option><option>自动化实训中心</option><option>通信工程创新实验室</option></select><button class=\"btn\" style=\"width:100%;margin-top:10px\" onclick=\"applyJoinOrg()\">加入组织</button></div></section>\r\n\r\n        <section class=\"page\" id=\"reauth\">\r\n            <div class=\"card\"><h3>账号认证</h3>\r\n                <label>姓名</label><input id=\"reauthName\" value=\"张三\">\r\n                <label>学号</label><input id=\"reauthStudentId\" value=\"20260001\">\r\n                <label>学校</label>\r\n                <select class=\"school-select\" id=\"reauthSchool\" onchange=\"updateColleges()\">\r\n                    <option value=\"华南理工大学\">华南理工大学</option>\r\n                    <option value=\"北京林业大学\">北京林业大学</option>\r\n                    <option value=\"南开大学\">南开大学</option>\r\n                    <option value=\"四川大学\">四川大学</option>\r\n                </select>\r\n                <label>学院</label>\r\n                <select class=\"college-select\" id=\"reauthCollege\">\r\n                    <option value=\"电子学院\">电子学院</option>\r\n                </select>\r\n            </div>\r\n            <button class=\"btn\" style=\"width:100%\" onclick=\"completeReauth()\">提交认证</button>\r\n        </section>\r\n\r\n        <!-- 修改密码 -->\r\n        <section class=\"page\" id=\"changePassword\">\r\n            <div class=\"card\"><h3>修改密码</h3>\r\n                <label>账号（手机号）</label><input id=\"changePwdPhone\" value=\"13800001111\" readonly style=\"background:#f5f5f5;\">\r\n                <label>原密码</label><input id=\"changePwdOld\" type=\"password\" placeholder=\"请输入原密码\">\r\n                <label>新密码</label><input id=\"changePwdNew\" type=\"password\" placeholder=\"请输入新密码（至少6位）\">\r\n                <label>确认密码</label><input id=\"changePwdConfirm\" type=\"password\" placeholder=\"请再次输入新密码\">\r\n                <button class=\"btn\" style=\"width:100%;margin-top:8px\" onclick=\"changePassword()\">确认修改</button>\r\n                <div class=\"divider\" style=\"margin:12px 0;\"><span>忘记密码？</span></div>\r\n                <button class=\"btn light\" style=\"width:100%\" onclick=\"show('forgetPassword')\">前往重置密码</button>\r\n            </div>\r\n        </section>\r\n\r\n        <!-- 忘记密码 -->\r\n        <section class=\"page\" id=\"forgetPassword\">\r\n            <div class=\"card\"><h3>重置密码</h3>\r\n                <p style=\"color:var(--muted);font-size:12px;margin-bottom:12px;\">通过手机号验证码重置密码</p>\r\n                <label>手机号码</label>\r\n                <div class=\"phone-row\"><input id=\"resetPhone\" placeholder=\"请输入手机号\" maxlength=\"11\" value=\"13800001111\"><button class=\"btn light code-btn\" id=\"resetCodeBtn\" onclick=\"getResetSms()\">获取验证码</button></div>\r\n                <label style=\"margin-top:8px;\">短信验证码</label><input id=\"resetCode\" placeholder=\"请输入6位验证码\" maxlength=\"6\">\r\n                <label style=\"margin-top:8px;\">新密码</label><input id=\"resetNewPwd\" type=\"password\" placeholder=\"请设置新密码（至少6位）\">\r\n                <button class=\"btn\" style=\"width:100%;margin-top:12px\" onclick=\"resetPasswordBySms()\">确认重置密码</button>\r\n                <button class=\"btn light\" style=\"width:100%;margin-top:8px\" onclick=\"show('changePassword')\">返回修改密码</button>\r\n            </div>\r\n        </section>\r\n\r\n        <!-- 登录 -->\r\n        <section class=\"page\" id=\"login\">\r\n            <div class=\"hero\"><h2>欢迎使用智能柜</h2><p>请按顺序完成三步登录</p></div>\r\n            <div class=\"step-indicators\" id=\"loginSteps\">\r\n                <div class=\"step-dot active\" id=\"loginStep1\" onclick=\"onLoginStepClick(1)\"><span class=\"num\">1</span>微信授权<span class=\"line\"></span></div>\r\n                <div class=\"step-dot\" id=\"loginStep2\" onclick=\"onLoginStepClick(2)\"><span class=\"num\">2</span>手机验证<span class=\"line\"></span></div>\r\n                <div class=\"step-dot\" id=\"loginStep3\" onclick=\"onLoginStepClick(3)\"><span class=\"num\">3</span>设置密码</div>\r\n            </div>\r\n\r\n            <div id=\"loginPage1\" class=\"card\" style=\"margin-bottom:10px;\">\r\n                <h3>第一步：微信授权</h3>\r\n                <p style=\"font-size:12px;color:var(--muted);margin-bottom:10px;\">点击下方按钮完成微信授权</p>\r\n                <button class=\"btn wechat-login-btn\" id=\"wechatAuthBtn\" onclick=\"wechatLogin()\">微信授权</button>\r\n                <button class=\"btn light\" style=\"width:100%;margin-top:8px;\" onclick=\"goLoginStep(2)\" id=\"loginNext1\" disabled>下一步 →</button>\r\n            </div>\r\n\r\n            <div id=\"loginPage2\" class=\"card\" style=\"display:none;margin-bottom:10px;\">\r\n                <h3>第二步：手机验证码</h3>\r\n                <p style=\"font-size:12px;color:var(--muted);margin-bottom:10px;\">输入手机号获取验证码</p>\r\n                <label>手机号码</label>\r\n                <div class=\"phone-row\"><input id=\"loginPhone\" placeholder=\"请输入手机号\" maxlength=\"11\" value=\"13800001111\"><button class=\"btn light code-btn\" id=\"getCodeBtn\" onclick=\"getSmsCode()\">获取验证码</button></div>\r\n                <label style=\"margin-top:8px;\">短信验证码</label><input id=\"loginCode\" placeholder=\"请输入6位验证码\" maxlength=\"6\">\r\n                <button class=\"btn light\" style=\"width:100%;margin-top:8px;\" onclick=\"goLoginStep(3)\" id=\"loginNext2\" disabled>下一步 →</button>\r\n                <button class=\"btn light\" style=\"width:100%;margin-top:6px;\" onclick=\"goLoginStep(1)\">← 上一步</button>\r\n            </div>\r\n\r\n            <div id=\"loginPage3\" class=\"card\" style=\"display:none;margin-bottom:10px;\">\r\n                <h3>第三步：设置密码</h3>\r\n                <p style=\"font-size:12px;color:var(--muted);margin-bottom:10px;\">设置登录密码（至少6位）</p>\r\n                <label>登录密码</label><input id=\"loginPassword\" type=\"password\" placeholder=\"请设置密码（至少6位）\">\r\n                <label>确认密码</label><input id=\"loginPasswordConfirm\" type=\"password\" placeholder=\"请再次输入密码\">\r\n                <button class=\"btn\" style=\"width:100%;margin-top:8px;\" onclick=\"phoneLogin()\">完成登录</button>\r\n                <button class=\"btn light\" style=\"width:100%;margin-top:6px;\" onclick=\"goLoginStep(2)\">← 上一步</button>\r\n            </div>\r\n        </section>\r\n\r\n        <section class=\"page\" id=\"credit\"><div class=\"card\"><h3>当前信用分：82 / 100</h3><p>低于 60 分将加入黑名单，限制设备借用。</p></div><div class=\"card\"><h3>扣分规则</h3><ul><li>设备损坏：扣 10 分</li><li>设备缺失：扣 20 分</li><li>放错柜位：扣 10 分</li><li>逾期归还：按天累计扣 5 分</li></ul></div></section>\r\n        <section class=\"page\" id=\"creditRecords\"><div class=\"card\"><h3>信用分变动记录</h3><p>当前信用分：82 / 100</p></div><article class=\"card\"><div class=\"row\"><h3>万用表逾期归还</h3><b style=\"color:#dc2626\">-10 分</b></div><p>2026-07-15 · 逾期 2 天，按天累计扣分</p></article><article class=\"card\"><div class=\"row\"><h3>数字示波器放错柜位</h3><b style=\"color:#dc2626\">-10 分</b></div><p>2026-06-28 · 已由管理员确认</p></article></section>\r\n\r\n        <!-- ===== 资源中心（复用设备借用页布局） ===== -->\r\n        <section class=\"page\" id=\"resources\">\r\n            <input id=\"resourceSearchInput\" placeholder=\"搜索设备名称、型号或标签码\" oninput=\"filterResourceList()\">\r\n            <div class=\"device-wrap-row\">\r\n                <div class=\"device-cate-left\" id=\"resourceCateLeft\">\r\n                    <div class=\"cate-item active\" data-cate=\"osc\" onclick=\"onResourceCateClick(this,'osc')\">示波器</div>\r\n                    <div class=\"cate-item\" data-cate=\"meter\" onclick=\"onResourceCateClick(this,'meter')\">万用表</div>\r\n                    <div class=\"cate-item\" data-cate=\"power\" onclick=\"onResourceCateClick(this,'power')\">实验电源</div>\r\n                    <div class=\"cate-item\" data-cate=\"sensor\" onclick=\"onResourceCateClick(this,'sensor')\">传感器</div>\r\n                    <div class=\"cate-item\" data-cate=\"tool\" onclick=\"onResourceCateClick(this,'tool')\">工具器材</div>\r\n                </div>\r\n                <div class=\"device-right-content\">\r\n                    <div class=\"device-two-grid\" id=\"resourceListWrap\"></div>\r\n                </div>\r\n            </div>\r\n        </section>\r\n\r\n        <section class=\"page\" id=\"deviceResource\"><div class=\"notice\" id=\"deviceResourceNotice\"></div><article class=\"card\"><h3 id=\"deviceResourceName\">设备资源</h3><p id=\"deviceResourceMeta\"></p></article><article class=\"card\"><h3>操作手册 PDF</h3><a class=\"btn light\" id=\"manualLink\" target=\"_blank\">查看操作手册</a></article><article class=\"card\"><h3>资源配置文档</h3><a class=\"btn light\" id=\"configLink\" target=\"_blank\">查看配套资源</a></article></section>\r\n\r\n        <section class=\"page\" id=\"safety\"><input id=\"safetyExamSearch\" placeholder=\"输入关键词搜索\" oninput=\"filterSafetyExam()\"><div id=\"safetyExamWrap\"></div></section>\r\n\r\n        <!-- 考试页面 -->\r\n        <section class=\"page\" id=\"deviceExam\"><div class=\"card\"><h3 id=\"examDevTitle\">设备安全试卷</h3>\r\n                <div class=\"exam-attempt-bar\" id=\"deviceExamAttemptBar\"></div>\r\n                <div class=\"exam-q\"><p>1. 发现设备异常时，应当如何处理？</p>\r\n                    <label class=\"check\"><input type=\"radio\" name=\"q1\" value=\"a\">继续使用</label>\r\n                    <label class=\"check\"><input type=\"radio\" name=\"q1\" value=\"b\">停止使用并上报</label>\r\n                </div>\r\n                <div class=\"exam-q\"><p>2. 归还时设备应放入哪里？（多选）</p>\r\n                    <label class=\"check\"><input type=\"checkbox\" name=\"q2\" value=\"a\">任意空柜</label>\r\n                    <label class=\"check\"><input type=\"checkbox\" name=\"q2\" value=\"b\">指定柜位</label>\r\n                    <label class=\"check\"><input type=\"checkbox\" name=\"q2\" value=\"c\">设备对应的专用柜位</label>\r\n                </div>\r\n                <div class=\"exam-q\"><p>3. 设备使用完毕后可以不关闭电源直接归还。（判断）</p>\r\n                    <label class=\"check\"><input type=\"radio\" name=\"q3\" value=\"true\">正确</label>\r\n                    <label class=\"check\"><input type=\"radio\" name=\"q3\" value=\"false\">错误</label>\r\n                </div>\r\n                <button class=\"btn\" onclick=\"finishDeviceExam()\">提交试卷</button>\r\n            </div></section>\r\n\r\n        <section class=\"page\" id=\"rfidExam\"><div class=\"card\"><h3 id=\"rfidExamTitle\">RFID设备安全试卷</h3>\r\n                <div class=\"exam-attempt-bar\" id=\"rfidExamAttemptBar\"></div>\r\n                <div class=\"exam-q\" id=\"rfidQ1\"><p>1. RFID设备归还时，以下哪种做法正确？</p>\r\n                    <label class=\"check\"><input type=\"radio\" name=\"r1\" value=\"a\">直接放回指定柜体，系统自动结单</label>\r\n                    <label class=\"check\"><input type=\"radio\" name=\"r1\" value=\"b\">需要手动在系统点击归还</label>\r\n                </div>\r\n                <div class=\"exam-q\" id=\"rfidQ2\"><p>2. RFID设备使用过程中，如遇异常应如何处理？（多选）</p>\r\n                    <label class=\"check\"><input type=\"checkbox\" name=\"r2\" value=\"a\">继续使用，稍后再说</label>\r\n                    <label class=\"check\"><input type=\"checkbox\" name=\"r2\" value=\"b\">立即停止使用并上报</label>\r\n                    <label class=\"check\"><input type=\"checkbox\" name=\"r2\" value=\"c\">通知实验室管理员</label>\r\n                </div>\r\n                <div class=\"exam-q\" id=\"rfidQ3\"><p>3. RFID设备归还时只需要放到柜体附近即可。（判断）</p>\r\n                    <label class=\"check\"><input type=\"radio\" name=\"r3\" value=\"true\">正确</label>\r\n                    <label class=\"check\"><input type=\"radio\" name=\"r3\" value=\"false\">错误</label>\r\n                </div>\r\n                <button class=\"btn\" onclick=\"finishRFIDExam()\">提交试卷</button>\r\n            </div></section>\r\n\r\n        <section class=\"page\" id=\"systemExam\"><div class=\"card\"><h3>系统使用考试</h3>\r\n                <div class=\"exam-attempt-bar\" id=\"systemExamAttemptBar\"></div>\r\n                <p>1. 借用设备成功后，下一步应进行？（单选）</p>\r\n                <label class=\"check\"><input type=\"radio\" name=\"sys\" value=\"wrong\">直接取走设备</label>\r\n                <label class=\"check\"><input type=\"radio\" name=\"sys\" value=\"right\">使用领取凭证前往对应柜体扫码</label>\r\n                <p>2. 以下哪些是借用设备前的必要步骤？（多选）</p>\r\n                <label class=\"check\"><input type=\"checkbox\" name=\"sys2\" value=\"a\">确认设备库存</label>\r\n                <label class=\"check\"><input type=\"checkbox\" name=\"sys2\" value=\"b\">阅读安全须知</label>\r\n                <label class=\"check\"><input type=\"checkbox\" name=\"sys2\" value=\"c\">完成相关考试</label>\r\n                <p>3. 设备使用完毕后可以随意放置在任何位置。（判断）</p>\r\n                <label class=\"check\"><input type=\"radio\" name=\"sys3\" value=\"true\">正确</label>\r\n                <label class=\"check\"><input type=\"radio\" name=\"sys3\" value=\"false\">错误</label>\r\n                <button class=\"btn\" onclick=\"finishSystemExam()\">提交考试</button>\r\n            </div></section>\r\n\r\n        <!-- ===== 工位预约三个独立页面 ===== -->\r\n        <!-- 页面1：工位预约 -->\r\n        <section class=\"page\" id=\"reserveStep1\">\r\n            <div class=\"card\"><h3>工位预约</h3>\r\n                <label>预约日期</label>\r\n                <input type=\"date\" id=\"reserveDate\" class=\"form-select\" onchange=\"onDateChange()\" style=\"width:100%;border:1px solid #dce1ea;border-radius:9px;padding:10px;font:inherit;font-size:12px;outline:0;background:#fff\">\r\n                <label style=\"margin-top:8px;\">借用时间段（每段2小时）</label>\r\n                <select id=\"startTime\" class=\"form-select\" onchange=\"onStartTimeChange()\" style=\"width:100%;border:1px solid #dce1ea;border-radius:9px;padding:10px;font:inherit;font-size:12px;outline:0;background:#fff\">\r\n                    <option value=\"\">请选择开始时间</option>\r\n                </select>\r\n                <label style=\"margin-top:8px;\">结束时间段</label>\r\n                <select id=\"endTime\" class=\"form-select\" onchange=\"onEndTimeChange()\" disabled style=\"width:100%;border:1px solid #dce1ea;border-radius:9px;padding:10px;font:inherit;font-size:12px;outline:0;background:#fff\">\r\n                    <option value=\"\">请先选开始时间</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"time-hint\" id=\"timeHint\" style=\"display:none;text-align:center;padding:10px;margin-top:10px;font-size:13px;font-weight:600;color:#16826c;background:#edf8f3;border-radius:6px;\"></div>\r\n            <button class=\"btn\" style=\"width:100%;margin-top:8px;\" onclick=\"onNextToLabs()\">下一步：实验室选择</button>\r\n        </section>\r\n\r\n        <!-- 页面2：实验室选择 -->\r\n        <section class=\"page\" id=\"reserveStep2\">\r\n            <div class=\"card\"><h3>实验室选择</h3>\r\n                <div class=\"back-bar\" onclick=\"show('reserveStep1')\" style=\"cursor:pointer;margin-bottom:10px;\"><span style=\"color:var(--brand);font-weight:600;\">← 返回修改时间</span></div>\r\n                <div class=\"section-label\" id=\"step2Label\" style=\"font-size:12px;color:var(--muted);margin-bottom:8px;\"></div>\r\n                <div class=\"lab-list\" id=\"labList\"></div>\r\n                <div class=\"empty-state\" id=\"labEmpty\" style=\"display:none;text-align:center;padding:20px 0;\"><div style=\"color:var(--muted);font-size:13px;\">该时段无可用工位</div></div>\r\n            </div>\r\n        </section>\r\n\r\n        <!-- 页面3：工位申请 -->\r\n        <section class=\"page\" id=\"reserveStep3\">\r\n            <div class=\"card\"><h3 id=\"step3Title\">工位选择</h3>\r\n                <div class=\"back-bar\" onclick=\"show('reserveStep2')\" style=\"cursor:pointer;margin-bottom:10px;\"><span style=\"color:var(--brand);font-weight:600;\">← 返回实验室列表</span></div>\r\n                <div class=\"section-label\" id=\"step3Label\" style=\"font-size:12px;color:var(--muted);margin-bottom:8px;\"></div>\r\n                <div class=\"station-grid\" id=\"stationGrid\" style=\"display:flex;flex-wrap:wrap;gap:8px;\"></div>\r\n                <div class=\"empty-state\" id=\"stationEmpty\" style=\"display:none;text-align:center;padding:20px 0;\"><div style=\"color:var(--muted);font-size:13px;\">该实验室无可用工位</div></div>\r\n                <div id=\"purposeSection\" style=\"display:none;margin-top:12px;\">\r\n                    <label style=\"font-size:12px;color:var(--muted);\">已选：<span id=\"selectedName\" style=\"color:var(--ink);font-weight:600;\"></span></label>\r\n                    <label style=\"margin-top:8px;display:block;font-size:12px;color:#475569;\">使用目的</label>\r\n                    <input class=\"form-input\" id=\"purposeInput\" placeholder=\"请输入使用目的\" oninput=\"purpose=this.value\" style=\"width:100%;border:1px solid #dce1ea;border-radius:9px;padding:10px;font:inherit;font-size:12px;outline:0;background:#fff\">\r\n                    <button class=\"btn\" style=\"width:100%;margin-top:10px;\" onclick=\"onSubmitReserve()\">提交预约</button>\r\n                </div>\r\n            </div>\r\n        </section>\r\n\r\n        <!-- 弹窗 -->\r\n        <div class=\"modal\" id=\"examPrompt\"><div class=\"dialog\"><h2>借用前需完成考试</h2><p id=\"examPromptText\">该设备已配置安全考试，请先完成后再提交借用。</p><button class=\"btn\" onclick=\"goPrompt()\">去完成考试</button><button class=\"btn light\" onclick=\"closeModal()\">稍后再说</button></div></div>\r\n        <div class=\"modal\" id=\"mapModal\"><div class=\"dialog\"><h2 id=\"mapTitle\">柜体位置指引</h2><div class=\"map-box\">🗺️</div><p id=\"mapMeta\"></p><button class=\"btn\" onclick=\"closeMap()\">关闭</button></div></div>\r\n        <div class=\"modal\" id=\"noticeModal\"><div class=\"dialog\"><h2 id=\"noticeTitle\">系统提示</h2><p id=\"noticeText\"></p><button class=\"btn\" onclick=\"closeNotice()\">知道了</button></div></div>\r\n        <div class=\"modal\" id=\"msgDetailModal\"><div class=\"dialog\"><h2 id=\"msgDetailTitle\">消息详情</h2><p id=\"msgDetailContent\"></p><button class=\"btn\" onclick=\"document.getElementById('msgDetailModal').classList.remove('show')\">关闭</button></div></div>\r\n\r\n        <div class=\"modal\" id=\"confirmModal\" style=\"display:none;position:absolute;inset:0;background:#17203388;z-index:50;align-items:center;justify-content:center;padding:18px;\">\r\n            <div class=\"dialog\"><h2 id=\"confirmTitle\">确认预约</h2><p id=\"confirmContent\" style=\"white-space:pre-line;\"></p>\r\n                <div style=\"display:flex;gap:10px;margin-top:12px;\">\r\n                    <button class=\"btn light\" style=\"flex:1;\" onclick=\"closeConfirmModal(false)\">取消</button>\r\n                    <button class=\"btn\" style=\"flex:1;\" id=\"confirmBtn\" onclick=\"closeConfirmModal(true)\">确认</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <!-- ===== 时间选择底部抽屉（来自 demo） ===== -->\r\n        <div class=\"modal-overlay\" id=\"timePickerModal\">\r\n            <div class=\"modal-drawer\">\r\n                <div class=\"drawer-header\">\r\n                    <h2>📅 借用时间选择</h2>\r\n                    <button class=\"drawer-close\" onclick=\"closeTimePicker()\">✕</button>\r\n                </div>\r\n                <div class=\"device-max-hint\" id=\"modalMaxHint\">⏱️ 本次设备最长可借用 <strong>--</strong> 小时</div>\r\n\r\n                <div class=\"calendar-container\">\r\n                    <div class=\"selection-tip\" id=\"selectionTip\">请选择取用日期</div>\r\n                    <div class=\"calendar-header\">\r\n                        <span id=\"modalCalendarMonth\">可选日期</span>\r\n                        <div class=\"range-note\">今天起14天</div>\r\n                    </div>\r\n                    <div class=\"calendar-weekdays\">\r\n                        <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>\r\n                    </div>\r\n                    <div class=\"calendar-grid\" id=\"modalCalendarGrid\"></div>\r\n                </div>\r\n\r\n                <div class=\"time-select-row\">\r\n                    <div class=\"time-group\">\r\n                        <label>⏰ 取用</label>\r\n                        <select id=\"modalStartHour\" onchange=\"onModalStartHourChange()\">\r\n                            <option value=\"\">请选择</option>\r\n                        </select>\r\n                    </div>\r\n                    <div class=\"time-group\">\r\n                        <label>⏰ 归还</label>\r\n                        <select id=\"modalEndHour\" onchange=\"onModalEndHourChange()\" disabled>\r\n                            <option value=\"\">请先选择取用日期</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"borrow-duration-summary\" id=\"borrowDurationSummary\">\r\n                    <div class=\"duration-line\" id=\"borrowDurationText\">请选择完整的借用时间</div>\r\n                </div>\r\n\r\n                <div class=\"validation-message\" id=\"validationMessage\" role=\"alert\" aria-live=\"polite\"></div>\r\n\r\n                <div class=\"drawer-actions\">\r\n                    <button class=\"btn light\" onclick=\"resetModalPicker()\">重新选择</button>\r\n                    <button class=\"btn\" id=\"modalConfirmBtn\" onclick=\"confirmModalPicker()\" disabled>确认</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <nav class=\"tabbar\">\r\n            <button class=\"tab\" data-page=\"home\" onclick=\"show('home')\"><span>⌂</span>首页</button>\r\n            <button class=\"tab\" data-page=\"devices\" onclick=\"show('devices')\"><span>📦</span>设备预约</button>\r\n            <button class=\"tab\" data-page=\"reserveStep1\" onclick=\"show('reserveStep1')\"><span>📅</span>工位预约</button>\r\n            <button class=\"tab\" data-page=\"profile\" onclick=\"show('profile')\"><span>👤</span>我的</button>\r\n        </nav>\r\n    </main>\r\n    \r\n</body>\r\n</html>",host);const {document,window,location,URL,URLSearchParams,localStorage,sessionStorage,setTimeout,setInterval,clearTimeout,clearInterval,alert,confirm,FileReader,Blob}=env.globals;

        // ==================== 核心数据 ====================
        let history = [],
            current = 'home',
            resourceListSourcePage = 'profile',
            resourceDetailSourcePage = 'home',
            pendingDevice = '',
            pendingRFIDInfo = null,
            systemDone = false,
            promptTarget = 'safety',
            currentOrganization = '电子创新实验室',
            currentCate = 'osc',
            currentResourceCate = 'osc', // ===== 资源中心当前分类 =====
            uploadFiles = [],
            codeCache = {},
            carouselIndex = 0,
            carouselInterval = null;
        const returnBtnState = {},
            safetyExamStatusMap = {},
            rfidExamStatusMap = {};
        let wechatAuthSuccess = false,
            isFromBorrowFlow = false,
            isFromSafetyPage = false,
            rfidPendingDevice = '',
            rfidPendingCabInfo = null,
            rfidSourcePage = 'home';
        const AUTO_APPROVAL_DEVICES = ['函数信号发生器'];
        let pickupDevices = [
            { name: "函数信号发生器", model: "FY6900", codeType: "标签码", code: "246813", cab: "实验室 A02-03", cabNo: "001203",
                pos: "1号楼3层", pickupAvailableTime: "2026-07-23 09:00 后", isRFID: false },
            { name: "逻辑分析仪", model: "LA1016", codeType: "标签码", code: "980631", cab: "实验室 B02-01", cabNo: "002301",
                pos: "1号楼3层", pickupAvailableTime: "2026-07-23 10:30 后", isRFID: false },
            { name: "手持示波器", model: "DS2102", codeType: "RFID码", code: "456123", cab: "手持示波器柜1", cabNo: "CAB100",
                pos: "1号楼3层", pickupAvailableTime: "2026-07-23 13:00 后", isRFID: true }
        ];
        let pendingApprovals = [];
        let faultList = [
            { title: "数字示波器 · 标签码125896", type: "设备损坏", status: "处理中", time: "2026-07-20 10:30" },
            { title: "实验室A01智能柜", type: "柜门异常", status: "已解决", time: "2026-07-19 16:20" }
        ];
        let messages = [
            { id: 1, type: '审批通过', title: '设备借用审批通过', content: '您借用的"函数信号发生器"已通过审批，请前往待领取页面查看。',
            time: '2026-07-22 09:30', read: false },
            { id: 2, type: '逾期提醒', title: '设备逾期提醒', content: '您借用的"数字万用表"已逾期2天，请尽快归还，逾期将每日扣除5分信用分。',
                time: '2026-07-21 18:00', read: false },
            { id: 3, type: '领取成功', title: '设备领取成功', content: '您已成功领取"逻辑分析仪"，请妥善使用，按时归还。', time: '2026-07-20 14:20',
                read: false },
            { id: 4, type: '归还成功', title: '设备归还成功', content: '您已成功归还"数字示波器"，感谢您的配合。', time: '2026-07-19 11:10',
                read: false },
            { id: 5, type: '信用变动', title: '信用分变动通知', content: '因"数字万用表"逾期归还，扣除信用分10分，当前信用分82分。',
                time: '2026-07-18 16:45', read: false },
            { id: 6, type: '新考试', title: '新考试已发布', content: '"压力传感器"RFID安全考试已发布，请前往安全考试页面完成。',
                time: '2026-07-17 08:00', read: false },
            { id: 7, type: '预约通过', title: '工位预约审批通过', content: '您的工位预约申请已通过审批，请准时前往使用。', time: '2026-07-23 10:00',
                read: false }
        ];
        let systemNotices = [
            { id: 'n001', title: '📢 系统升级通知', time: '2026-07-23 10:00',
                content: '实验室智能柜系统将于本周六（7月25日）凌晨2:00-4:00进行升级维护，期间暂停使用，请提前做好安排。' },
            { id: 'n002', title: '📢 新设备上线', time: '2026-07-22 14:30', content: '逻辑分析仪（型号：LA1016）已入库，可正常借用。' },
            { id: 'n003', title: '📢 安全考试更新', time: '2026-07-21 09:00', content: '新增RFID设备安全试卷，使用RFID设备前请先完成考试。' }
        ];

        let pendingReserveApprovals = [];

        // ==================== 考试次数限制 ====================
        const MAX_EXAM_ATTEMPTS_PER_DAY = 3;
        const EXAM_COOLDOWN_HOURS = 24;
        // examAttemptsMap[examKey] = { date: 'YYYY-MM-DD', count: N, cooldownUntil: timestamp }
        let examAttemptsMap = {};

        function getExamKey(type, devName) {
            if (type === 'system') return 'system';
            if (type === 'rfid') return 'rfid:' + (devName || '');
            return 'device:' + (devName || '');
        }

        function formatDurationFromMs(ms) {
            if (ms <= 0) return '0 分钟';
            var totalMin = Math.ceil(ms / 60000);
            var h = Math.floor(totalMin / 60);
            var m = totalMin % 60;
            if (h > 0 && m > 0) return h + ' 小时 ' + m + ' 分钟';
            if (h > 0) return h + ' 小时';
            return m + ' 分钟';
        }

        function canTakeExam(examKey) {
            var now = Date.now();
            var rec = examAttemptsMap[examKey];
            if (!rec) return { allowed: true, remaining: MAX_EXAM_ATTEMPTS_PER_DAY, count: 0 };

            if (rec.cooldownUntil && now < rec.cooldownUntil) {
                return {
                    allowed: false,
                    cooling: true,
                    message: '今日考试次数已用完，冷却中，请于 ' + formatDurationFromMs(rec.cooldownUntil - now) + ' 后再试。',
                    cooldownUntil: rec.cooldownUntil,
                    remaining: 0,
                    count: rec.count
                };
            }

            var today = formatDateDisplay(new Date());
            if (rec.date !== today) {
                examAttemptsMap[examKey] = { date: today, count: 0, cooldownUntil: null };
                return { allowed: true, remaining: MAX_EXAM_ATTEMPTS_PER_DAY, count: 0 };
            }

            return {
                allowed: true,
                remaining: Math.max(0, MAX_EXAM_ATTEMPTS_PER_DAY - rec.count),
                count: rec.count
            };
        }

        function recordExamResult(examKey, passed) {
            var today = formatDateDisplay(new Date());
            var rec = examAttemptsMap[examKey];
            if (!rec || rec.date !== today) {
                rec = { date: today, count: 0, cooldownUntil: null };
                examAttemptsMap[examKey] = rec;
            }

            if (passed) {
                rec.count = 0;
                rec.cooldownUntil = null;
                return { passed: true, count: 0, remaining: MAX_EXAM_ATTEMPTS_PER_DAY, cooldown: false };
            }

            rec.count++;
            if (rec.count >= MAX_EXAM_ATTEMPTS_PER_DAY) {
                rec.cooldownUntil = Date.now() + EXAM_COOLDOWN_HOURS * 3600000;
                return { passed: false, count: rec.count, remaining: 0, cooldown: true };
            }

            return {
                passed: false,
                count: rec.count,
                remaining: MAX_EXAM_ATTEMPTS_PER_DAY - rec.count,
                cooldown: false
            };
        }

        function refreshExamAttemptBar(barId, examKey) {
            var bar = document.getElementById(barId);
            if (!bar) return;
            var now = Date.now();
            var rec = examAttemptsMap[examKey];
            if (rec && rec.cooldownUntil && now < rec.cooldownUntil) {
                bar.className = 'exam-attempt-bar cooling';
                bar.textContent = '⛔ 今日考试次数已用完，冷却中，请于 ' + formatDurationFromMs(rec.cooldownUntil - now) + ' 后再试。';
                return;
            }
            var today = formatDateDisplay(new Date());
            if (rec && rec.date !== today) {
                delete examAttemptsMap[examKey];
                rec = null;
            }
            var used = rec ? rec.count : 0;
            var remain = MAX_EXAM_ATTEMPTS_PER_DAY - used;
            if (remain <= 0) {
                bar.className = 'exam-attempt-bar cooling';
                bar.textContent = '⛔ 今日考试次数已用完。';
                return;
            }
            bar.className = 'exam-attempt-bar';
            bar.textContent = '📋 每日最多 3 次考试机会，今日剩余 ' + remain + ' 次；连续失败 3 次将冷却 24 小时。';
        }

        // 工位预约数据
        function getReservations() {
            var now = new Date();
            var today = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
            var nMins = now.getHours() * 60 + now.getMinutes();
            var chkM = nMins - 5,
                chkH = Math.floor(chkM / 60) % 24,
                chkMm = chkM % 60;
            if (chkMm < 0) { chkMm += 60;
                chkH = (chkH - 1 + 24) % 24 }
            var chkStart = pad(chkH) + ':' + pad(chkMm);
            var chkEnd = pad(Math.floor((chkM + 120) / 60) % 24) + ':' + pad((chkM + 120) % 60);
            var useM = nMins - 30,
                useH = Math.floor(useM / 60) % 24,
                useMm = useM % 60;
            if (useMm < 0) { useMm += 60;
                useH = (useH - 1 + 24) % 24 }
            var useStart = pad(useH) + ':' + pad(useMm);
            var useEnd = pad(Math.floor((useM + 120) / 60) % 24) + ':' + pad((useM + 120) % 60);
            var waitM = nMins + 120;
            var waitStart = pad(Math.floor(waitM / 60) % 24) + ':' + pad(waitM % 60);
            var waitEnd = pad(Math.floor((waitM + 90) / 60) % 24) + ':' + pad((waitM + 90) % 60);
            var approvedM = nMins + 1;
            var approvedH = Math.floor(approvedM / 60) % 24;
            var approvedMin = approvedM % 60;
            var approvedStart = pad(approvedH) + ':' + pad(approvedMin);
            var approvedEnd = pad(Math.floor((approvedM + 120) / 60) % 24) + ':' + pad((approvedM + 120) % 60);

            var result = [
                { id: 'r001', stationId: 's006', stationName: '工位 A-06', location: '301 实验室', studentName: '李同学',
                    studentId: '20230101', phone: '13800001111', purpose: '嵌入式课程实验', date: today, timeSlot: chkStart +
                        '-' + chkEnd, status: 'pending_review', statusText: '审核中', checkinTime: null, checkoutTime: null,
                    createTime: today + ' 08:00:00' },
                { id: 'r002', stationId: 's010', stationName: '工位 B-02', location: '301 实验室', studentName: '李同学',
                    studentId: '20230101', phone: '13800001111', purpose: '单片机编程', date: today, timeSlot: approvedStart +
                        '-' + approvedEnd, status: 'approved', statusText: '已通过', checkinTime: null, checkoutTime: null,
                    createTime: today + ' 07:00:00' },
                { id: 'r003', stationId: 's013', stationName: '工位 B-05', location: '301 实验室', studentName: '李同学',
                    studentId: '20230101', phone: '13800001111', purpose: '电路调试', date: today, timeSlot: useStart +
                        '-' + useEnd, status: 'using', statusText: '使用中', checkinTime: today + ' ' + useStart.split(':')[
                            0] + ':05', checkoutTime: null, createTime: today + ' 10:00:00' },
                { id: 'r004', stationId: 's015', stationName: '工位 B-07', location: '301 实验室', studentName: '李同学',
                    studentId: '20230101', phone: '13800001111', purpose: '信号分析实验', date: '2026-07-22', timeSlot: '09:00-12:00',
                    status: 'rejected', statusText: '已驳回', checkinTime: null, checkoutTime: null,
                    createTime: '2026-07-21 14:00:00', rejectReason: '该时段已有课程安排' },
                { id: 'r005', stationId: 's018', stationName: '工位 C-03', location: '302 实验室', studentName: '李同学',
                    studentId: '20230101', phone: '13800001111', purpose: '毕业设计调试', date: '2026-07-20', timeSlot: '10:00-16:00',
                    status: 'completed', statusText: '已结束', checkinTime: '2026-07-20 10:05', checkoutTime: '2026-07-20 16:10',
                    createTime: '2026-07-19 09:00:00' },
                { id: 'r006', stationId: 's022', stationName: '工位 C-07', location: '302 实验室', studentName: '李同学',
                    studentId: '20230101', phone: '13800001111', purpose: 'FPGA开发测试', date: '2026-07-21', timeSlot: '14:00-17:00',
                    status: 'timeout', statusText: '已超时', checkinTime: null, checkoutTime: null,
                    createTime: '2026-07-20 16:00:00' }
            ];
            var merged = {};
            result.forEach(function(item) { merged[item.id] = item; });
            memoryReservations.forEach(function(item) { if (item && item.id) merged[item.id] = item; });
            return Object.keys(merged).map(function(id) { return merged[id]; });
        }
        let memoryReservations = [];

        // 设备库存
        const deviceMaxHours = {};
        const deviceNames = ["数字示波器", "手持示波器", "逻辑分析仪", "函数信号发生器", "数字万用表", "高精度台式万用表", "毫伏表", "直流稳压电源", "可调交流电源",
            "双路可编程电源", "温湿度传感器模块", "光电传感器套件", "压力传感器", "电烙铁套装", "镊子剥线钳工具组", "面包板跳线套件"
        ];
        deviceNames.forEach(function(name) { deviceMaxHours[name] = Math.floor(Math.random() * 60) + 12; });

        const deviceStock = {
            "数字示波器": { available: 4, maxHours: deviceMaxHours["数字示波器"] },
            "手持示波器": { available: 2, maxHours: deviceMaxHours["手持示波器"] },
            "逻辑分析仪": { available: 0, nextAvailable: "2026-07-20 14:30", maxHours: deviceMaxHours["逻辑分析仪"] },
            "函数信号发生器": { available: 5, maxHours: deviceMaxHours["函数信号发生器"] },
            "数字万用表": { available: 0, nextAvailable: "2026-07-21 09:00", maxHours: deviceMaxHours["数字万用表"] },
            "高精度台式万用表": { available: 3, maxHours: deviceMaxHours["高精度台式万用表"] },
            "毫伏表": { available: 2, maxHours: deviceMaxHours["毫伏表"] },
            "直流稳压电源": { available: 6, maxHours: deviceMaxHours["直流稳压电源"] },
            "可调交流电源": { available: 3, maxHours: deviceMaxHours["可调交流电源"] },
            "双路可编程电源": { available: 2, maxHours: deviceMaxHours["双路可编程电源"] },
            "温湿度传感器模块": { available: 4, maxHours: deviceMaxHours["温湿度传感器模块"] },
            "光电传感器套件": { available: 3, maxHours: deviceMaxHours["光电传感器套件"] },
            "压力传感器": { available: 2, maxHours: deviceMaxHours["压力传感器"] },
            "电烙铁套装": { available: 3, maxHours: deviceMaxHours["电烙铁套装"] },
            "镊子剥线钳工具组": { available: 2, maxHours: deviceMaxHours["镊子剥线钳工具组"] },
            "面包板跳线套件": { available: 6, maxHours: deviceMaxHours["面包板跳线套件"] }
        };

        function generateOrderNo() { const d = new Date(); return 'B' + d.getFullYear() + String(d.getMonth() + 1).padStart(2,
                '0') + String(d.getDate()).padStart(2, '0') + String(pendingApprovals.length + 1).padStart(3, '0') }

        function generateReserveOrderNo() { const d = new Date(); return 'R' + d.getFullYear() + String(d.getMonth() + 1)
                .padStart(2, '0') + String(d.getDate()).padStart(2, '0') + String(pendingReserveApprovals.length + 1)
                .padStart(3, '0') }

        const rfidExamConfig = {
            "手持示波器": { title: "手持示波器 RFID安全试卷", q1: "1. 手持示波器RFID设备归还时，以下哪种做法正确？", q1_opts: { a: "直接放回指定柜体，系统自动结单",
                    b: "需要手动在系统点击归还" }, q1_answer: "a", q2: "2. 手持示波器使用过程中，如遇异常应如何处理？（多选）", q2_opts: { a: "继续使用，稍后再说",
                    b: "立即停止使用并上报", c: "通知实验室管理员" }, q2_answer: ["b", "c"], q3: "3. 手持示波器使用完毕后可以不关闭电源。（判断）",
                q3_answer: "false" },
            "直流稳压电源": { title: "直流稳压电源 RFID安全试卷", q1: "1. 直流稳压电源RFID设备归还时，以下哪种做法正确？", q1_opts: { a: "直接放回指定柜体，系统自动结单",
                    b: "需要手动在系统点击归还" }, q1_answer: "a", q2: "2. 直流稳压电源使用过程中，如遇异常应如何处理？（多选）", q2_opts: { a: "继续使用，稍后再说",
                    b: "立即停止使用并上报", c: "通知实验室管理员" }, q2_answer: ["b", "c"], q3: "3. 直流稳压电源可以超负荷使用。（判断）",
                q3_answer: "false" },
            "高精度台式万用表": { title: "高精度台式万用表 RFID安全试卷", q1: "1. 高精度台式万用表RFID设备归还时，以下哪种做法正确？", q1_opts: { a: "直接放回指定柜体，系统自动结单",
                    b: "需要手动在系统点击归还" }, q1_answer: "a", q2: "2. 高精度台式万用表使用过程中，如遇异常应如何处理？（多选）", q2_opts: { a: "继续使用，稍后再说",
                    b: "立即停止使用并上报", c: "通知实验室管理员" }, q2_answer: ["b", "c"], q3: "3. 高精度台式万用表使用前需要校准。（判断）",
                q3_answer: "true" },
            "双路可编程电源": { title: "双路可编程电源 RFID安全试卷", q1: "1. 双路可编程电源RFID设备归还时，以下哪种做法正确？", q1_opts: { a: "直接放回指定柜体，系统自动结单",
                    b: "需要手动在系统点击归还" }, q1_answer: "a", q2: "2. 双路可编程电源使用过程中，如遇异常应如何处理？（多选）", q2_opts: { a: "继续使用，稍后再说",
                    b: "立即停止使用并上报", c: "通知实验室管理员" }, q2_answer: ["b", "c"], q3: "3. 双路可编程电源可以随意调节电压输出。（判断）",
                q3_answer: "false" },
            "压力传感器": { title: "压力传感器 RFID安全试卷", q1: "1. 压力传感器RFID设备归还时，以下哪种做法正确？", q1_opts: { a: "直接放回指定柜体，系统自动结单",
                    b: "需要手动在系统点击归还" }, q1_answer: "a", q2: "2. 压力传感器使用过程中，如遇异常应如何处理？（多选）", q2_opts: { a: "继续使用，稍后再说",
                    b: "立即停止使用并上报", c: "通知实验室管理员" }, q2_answer: ["b", "c"], q3: "3. 压力传感器使用前需要预热。（判断）",
                q3_answer: "true" },
            "镊子剥线钳工具组": { title: "镊子剥线钳工具组 RFID安全试卷", q1: "1. 镊子剥线钳工具组RFID设备归还时，以下哪种做法正确？", q1_opts: { a: "直接放回指定柜体，系统自动结单",
                    b: "需要手动在系统点击归还" }, q1_answer: "a", q2: "2. 镊子剥线钳工具组使用过程中，如遇异常应如何处理？（多选）", q2_opts: { a: "继续使用，稍后再说",
                    b: "立即停止使用并上报", c: "通知实验室管理员" }, q2_answer: ["b", "c"], q3: "3. 工具使用完毕后无需清理可直接归还。（判断）",
                q3_answer: "false" }
        };
        const titles = {
            home: '首页',
            devices: '设备借用',
            deviceDetail: '设备详情',
            borrow: '借用申请',
            pickup: '待领取',
            returns: '待归还',
            overdue: '逾期提醒',
            fault: '异常上报',
            faultNew: '新增异常上报',
            faultDetail: '异常工单详情',
            faultList: '异常工单列表',
            messages: '消息中心',
            profile: '个人中心',
            credit: '信用分规则',
            creditRecords: '信用分变动记录',
            resources: '资源中心',
            deviceResource: '设备资源详情',
            safety: '安全考试',
            deviceExam: '设备安全试卷',
            rfidExam: 'RFID设备安全试卷',
            systemExam: '系统使用考试',
            organization: '组织管理',
            reauth: '账号认证',
            orderRecords: '全部订单记录',
            login: '登录页面',
            reserveStep1: '工位预约',
            reserveStep2: '实验室选择',
            reserveStep3: '工位申请',
            changePassword: '修改密码',
            forgetPassword: '重置密码'
        };
        const cateNameMap = { osc: "示波器", meter: "万用表", power: "实验电源", sensor: "传感器", tool: "工具器材" };
        const deviceAllData = {
            osc: [{ name: "数字示波器", model: "DS1054Z", codeType: "标签码", code: "125896" }, { name: "手持示波器",
                    model: "DS2102", codeType: "RFID码", code: "456123" }, { name: "逻辑分析仪", model: "LA1016",
                    codeType: "标签码", code: "980631" }, { name: "函数信号发生器", model: "FY6900", codeType: "标签码",
                    code: "246813" }],
            meter: [{ name: "数字万用表", model: "DT9205", codeType: "标签码", code: "691250" }, { name: "高精度台式万用表",
                    model: "FLUKE87", codeType: "RFID码", code: "789456" }, { name: "毫伏表", model: "YB2172",
                    codeType: "标签码", code: "321654" }],
            power: [{ name: "直流稳压电源", model: "DY-3005", codeType: "RFID码", code: "714296" }, { name: "可调交流电源",
                    model: "AC-500W", codeType: "标签码", code: "147258" }, { name: "双路可编程电源", model: "DP832A",
                    codeType: "RFID码", code: "369258" }],
            sensor: [{ name: "温湿度传感器模块", model: "DHT11", codeType: "标签码", code: "258369" }, { name: "光电传感器套件",
                    model: "E18-D80NK", codeType: "标签码", code: "159357" }, { name: "压力传感器", model: "MPX5010",
                    codeType: "RFID码", code: "486215" }],
            tool: [{ name: "电烙铁套装", model: "936恒温", codeType: "标签码", code: "753159" }, { name: "镊子剥线钳工具组",
                    model: "TL-01", codeType: "RFID码", code: "246135" }, { name: "面包板跳线套件", model: "830孔",
                    codeType: "标签码", code: "951357" }]
        };

        function generateDeviceInstances(devName, count) { const r = []; const b = Object.values(deviceAllData).flat().find(
                d => d.name === devName); if (!b) return r; for (let i = 0; i < count; i++) { const s = String(100 + i)
                    .padStart(3, '0'); r.push({ cabName: b.name + '柜' + (i + 1), cabNo: 'CAB' + String(100 + i).padStart(3,
                        '0'), pos: '1号楼' + (3 + i % 3) + '层', ver: b.codeType, code: (b.codeType === '标签码' ? 'TAG' :
                        'RFID') + s }) } return r }
        const deviceCabinetMap = { "数字示波器": generateDeviceInstances("数字示波器", 4), "手持示波器": generateDeviceInstances(
                "手持示波器", 2), "逻辑分析仪": [{ cabName: "实验室B02柜", cabNo: "002301", pos: "1号楼4层", ver: "标签码",
                    code: "980631" }], "函数信号发生器": generateDeviceInstances("函数信号发生器", 5), "数字万用表": [{
                    cabName: "实验室A03柜", cabNo: "001204", pos: "1号楼3层", ver: "标签码", code: "691250" }],
            "高精度台式万用表": generateDeviceInstances("高精度台式万用表", 3), "毫伏表": generateDeviceInstances("毫伏表", 2),
            "直流稳压电源": generateDeviceInstances("直流稳压电源", 6), "可调交流电源": generateDeviceInstances("可调交流电源", 3),
            "双路可编程电源": generateDeviceInstances("双路可编程电源", 2), "温湿度传感器模块": generateDeviceInstances(
                "温湿度传感器模块", 4), "光电传感器套件": generateDeviceInstances("光电传感器套件", 3), "压力传感器": generateDeviceInstances(
                "压力传感器", 2), "电烙铁套装": generateDeviceInstances("电烙铁套装", 3), "镊子剥线钳工具组": generateDeviceInstances(
                "镊子剥线钳工具组", 2), "面包板跳线套件": generateDeviceInstances("面包板跳线套件", 6) };
        const resourceMap = {};
        Object.values(deviceAllData).flat().forEach(d => resourceMap[d.name] = { model: d.model, code: d.codeType + "：" + d
                .code, pos: deviceCabinetMap[d.name]?.[0]?.pos || '' });
        const safetyExamList = [{ dev: "数字万用表", page: "deviceExam" },
            { dev: "逻辑分析仪", page: "deviceExam" }, { dev: "温湿度传感器模块", page: "deviceExam" }
        ];
        const rfidDeviceList = ["手持示波器", "高精度台式万用表", "直流稳压电源", "双路可编程电源", "压力传感器", "镊子剥线钳工具组"];
        const HOTEL_TIME_SLOTS = [
            { start: '08:00', end: '10:00', label: '08:00–10:00' },
            { start: '10:00', end: '12:00', label: '10:00–12:00' },
            { start: '12:00', end: '14:00', label: '12:00–14:00' },
            { start: '14:00', end: '16:00', label: '14:00–16:00' },
            { start: '16:00', end: '18:00', label: '16:00–18:00' },
            { start: '18:00', end: '22:00', label: '18:00–22:00' }
        ];
        const SERVICE_START_HOUR = 8;
        const SERVICE_END_HOUR = 22;

        const deviceOrderData = [
            { orderNo: "B20260718001", dev: "函数信号发生器", model: "FY6900", codeType: "标签码", code: "246813",
                cab: "实验室 A02-03", status: "待领取", date: "2026-07-18 09:20", returnTime: "",
                expectedReturn: "2026-07-25-18:00", type: "device" },
            { orderNo: "B20260718002", dev: "逻辑分析仪", model: "LA1016", codeType: "标签码", code: "980631",
                cab: "实验室 B02-01", status: "待领取", date: "2026-07-18 10:15", returnTime: "",
                expectedReturn: "2026-07-24-14:30", type: "device" },
            { orderNo: "B20260716012", dev: "数字示波器", model: "DS1054Z", codeType: "标签码", code: "125896",
                cab: "实验室 A01", status: "待归还", date: "2026-07-16 14:30", returnTime: "",
                expectedReturn: "2026-07-24-18:00", type: "device" },
            { orderNo: "B20260716009", dev: "直流稳压电源", model: "DY-3005", codeType: "RFID码", code: "714296",
                cab: "实验室 B01", status: "待归还", date: "2026-07-16 15:10", returnTime: "",
                expectedReturn: "2026-07-23-16:00", type: "device" },
            { orderNo: "B20260715006", dev: "函数信号发生器", model: "FY6900", codeType: "标签码", code: "246813",
                cab: "实验室 A02", status: "已归还", date: "2026-07-15 08:45", returnTime: "2026-07-17 10:30",
                expectedReturn: "2026-07-17-10:30", actualReturn: "2026-07-17-10:30", type: "device" },
            { orderNo: "F20260718003", dev: "数字示波器", model: "DS1054Z", codeType: "标签码", code: "125896",
                cab: "实验室 A01", status: "异常", date: "2026-07-18 11:05", returnTime: "", expectedReturn: "",
                type: "device" },
            { orderNo: "B20260710005", dev: "毫伏表", model: "YB2172", codeType: "标签码", code: "321654",
                cab: "实验室 C02", status: "已归还", date: "2026-07-10 16:20", returnTime: "2026-07-12 09:10",
                expectedReturn: "2026-07-12-09:10", actualReturn: "2026-07-12-09:10", type: "device" },
            { orderNo: "B20260723001", dev: "数字示波器", model: "DS1054Z", codeType: "标签码", code: "125896",
                cab: "实验室 A01", status: "审批中", date: "2026-07-23 08:30", returnTime: "", expectedReturn: "",
                type: "device" }
        ];
        let smsCountdown = 0,
            smsTimer = null,
            resetSmsCountdown = 0,
            resetSmsTimer = null;
        let currentActivePanel = '';
        let confirmCb = null;
        let countdownTimer = null;
        let currentOrderFilter = 'all';
        let loginStep = 1;
        let loginMaxStep = 1;

        // ===== 新时间选择器状态 =====
        let pickerStartDate = null;
        let pickerEndDate = null;
        let pickerStartHour = null;
        let pickerEndHour = null;
        let pickerMaxHours = 24;
        let pickerDeviceName = '';
        let dateSelectionStage = 'start';
        let deviceStartDateTime = null;
        let deviceEndDateTime = null;
        let _fromHome = false;

        // ==================== 学校-学院映射 ====================
        const schoolCollegeMap = {
            '华南理工大学': ['电子学院', '自动化学院', '计算机学院'],
            '北京林业大学': ['林学院', '环境学院', '信息学院'],
            '南开大学': ['电子信息与光学工程学院', '计算机学院', '人工智能学院'],
            '四川大学': ['电子信息学院', '计算机学院', '电气工程学院']
        };

        function updateColleges() {
            var school = document.getElementById('reauthSchool').value;
            var collegeSelect = document.getElementById('reauthCollege');
            var colleges = schoolCollegeMap[school] || ['电子学院'];
            collegeSelect.innerHTML = '';
            colleges.forEach(function(c) {
                var opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                collegeSelect.appendChild(opt);
            });
        }

        // ==================== 登录分步导航 ====================
        function goLoginStep(step) {
            loginStep = step;
            if (step > loginMaxStep) loginMaxStep = step;
            document.getElementById('loginPage1').style.display = step === 1 ? 'block' : 'none';
            document.getElementById('loginPage2').style.display = step === 2 ? 'block' : 'none';
            document.getElementById('loginPage3').style.display = step === 3 ? 'block' : 'none';
            for (var i = 1; i <= 3; i++) {
                var dot = document.getElementById('loginStep' + i);
                dot.classList.remove('active', 'done');
                if (i < step) dot.classList.add('done');
                else if (i === step) dot.classList.add('active');
            }
            if (step === 2 && wechatAuthSuccess) {
                document.getElementById('loginNext2').disabled = false;
            }
        }

        function onLoginStepClick(targetStep) {
            if (targetStep > loginMaxStep) {
                showNotice('请先完成当前步骤', '提示');
                return;
            }
            if (targetStep === loginStep) return;
            goLoginStep(targetStep);
        }

        // ==================== 工具函数 ====================
        function pad(n) { return String(n).padStart(2, '0') }

        function timeToMinutes(t) { var p = t.split(':'); return parseInt(p[0]) * 60 + parseInt(p[1]) }

        function formatDateDisplay(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) }

        function formatHourDisplay(d) { return pad(d.getHours()) + ':00' }

        function getWeekDay(d) { return ['日', '一', '二', '三', '四', '五', '六'][d.getDay()] }

        function parseDateStr(s) { var p = s.split('-'); return new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2])) }

        function isSameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a
                .getDate() === b.getDate() }

        function addHours(d, h) { var r = new Date(d);
            r.setHours(r.getHours() + h); return r }

        function getToday() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()) }

        function getDateStr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) }

        function getMonthStr(d) { return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' }

        // ===================================================================
        // ============ 时间选择器（底部抽屉 · 来自 demo 的完整实现） ============
        // ===================================================================
        const timePickerModal = document.getElementById('timePickerModal');
        const modalCalendarGrid = document.getElementById('modalCalendarGrid');
        const modalCalendarMonthLabel = document.getElementById('modalCalendarMonth');
        const modalStartHourSelect = document.getElementById('modalStartHour');
        const modalEndHourSelect = document.getElementById('modalEndHour');
        const modalConfirmBtn = document.getElementById('modalConfirmBtn');
        const modalMaxHint = document.getElementById('modalMaxHint');
        const modalBorrowDurationText = document.getElementById('borrowDurationText');
        const compactStartEl = document.getElementById('compactStart');
        const compactEndEl = document.getElementById('compactEnd');

        function openTimePicker() {
            clearValidationMessage();
            renderModalCalendar();
            renderModalTimeOptions();
            updateModalConfirm();
            updateCompactSummary();
            updateSelectionTip();
            timePickerModal.classList.add('show');
        }

        function closeTimePicker() {
            timePickerModal.classList.remove('show');
        }

        function initTimePicker(devName) {
            pickerDeviceName = devName;
            var stock = deviceStock[devName];
            pickerMaxHours = stock ? stock.maxHours : 24;
            if (modalMaxHint) {
                modalMaxHint.innerHTML = '⏱️ 本次设备最长可借用 <strong>' + pickerMaxHours + '</strong> 小时';
            }

            pickerStartDate = null;
            pickerEndDate = null;
            pickerStartHour = null;
            pickerEndHour = null;
            dateSelectionStage = 'start';
            deviceStartDateTime = null;
            deviceEndDateTime = null;

            updateCompactSummary();
            renderModalCalendar();
            renderModalTimeOptions();
            updateModalConfirm();
            updateSelectionTip();
            updateDeviceDetailList();
        }

        function getEffectiveBorrowHours(startDt, endDt) {
            if (!startDt || !endDt || endDt <= startDt) return 0;

            var total = 0;
            var cursor = new Date(startDt.getFullYear(), startDt.getMonth(), startDt.getDate());
            var last = new Date(endDt.getFullYear(), endDt.getMonth(), endDt.getDate());

            while (cursor <= last) {
                var windowStart = new Date(cursor);
                windowStart.setHours(SERVICE_START_HOUR, 0, 0, 0);
                var windowEnd = new Date(cursor);
                windowEnd.setHours(SERVICE_END_HOUR, 0, 0, 0);

                var overlapStart = startDt > windowStart ? startDt : windowStart;
                var overlapEnd = endDt < windowEnd ? endDt : windowEnd;
                if (overlapEnd > overlapStart) {
                    total += (overlapEnd - overlapStart) / 3600000;
                }
                cursor.setDate(cursor.getDate() + 1);
            }
            return total;
        }

        function makeDateTime(date, hour) {
            var d = new Date(date);
            d.setHours(parseInt(hour, 10), 0, 0, 0);
            return d;
        }

        function hasValidEndSlotForDate(endDate, startDate, startHour) {
            if (!startDate || !startHour || endDate < startDate) return false;
            var startDt = makeDateTime(startDate, startHour);
            return HOTEL_TIME_SLOTS.some(function(slot) {
                var endDt = makeDateTime(endDate, slot.end);
                if (endDt <= startDt) return false;
                return getEffectiveBorrowHours(startDt, endDt) > 0 &&
                    getEffectiveBorrowHours(startDt, endDt) <= pickerMaxHours;
            });
        }

        function getMaxEndDateByCalendar() {
            var range = getSelectableRange();
            if (!pickerStartDate) return range.end;

            if (!pickerStartHour) {
                var candidate = new Date(pickerStartDate);
                for (var i = 0; i < 14; i++) {
                    var day = new Date(pickerStartDate);
                    day.setDate(day.getDate() + i);
                    if (day > range.end) break;
                    if (HOTEL_TIME_SLOTS.some(function(slot) {
                            return hasValidEndSlotForDate(day, pickerStartDate, slot.start);
                        }) || i === 0) candidate = day;
                }
                return candidate;
            }

            var lastValid = new Date(pickerStartDate);
            for (var j = 0; j < 14; j++) {
                var d = new Date(pickerStartDate);
                d.setDate(d.getDate() + j);
                if (d > range.end) break;
                if (hasValidEndSlotForDate(d, pickerStartDate, pickerStartHour)) {
                    lastValid = d;
                }
            }
            return lastValid;
        }

        function getSelectableRange() {
            var today = getToday();
            var rangeEnd = new Date(today);
            rangeEnd.setDate(rangeEnd.getDate() + 13);
            return { start: today, end: rangeEnd };
        }

        function isDateSelectable(date) {
            var range = getSelectableRange();
            return date >= range.start && date <= range.end;
        }

        function getMaxEndDateTime() {
            if (!pickerStartDate || !pickerStartHour) return null;
            var startDt = makeDateTime(pickerStartDate, pickerStartHour);
            return addHours(startDt, pickerMaxHours);
        }

        function renderModalCalendar() {
            var today = getToday();
            var rangeEnd = new Date(today);
            rangeEnd.setDate(rangeEnd.getDate() + 13);

            if (modalCalendarMonthLabel) {
                modalCalendarMonthLabel.textContent =
                    formatDateDisplay(today).slice(0, 7).replace('-', '年') + '月' + ' · 可选14天';
            }

            var maxEndDate = getMaxEndDateByCalendar();
            modalCalendarGrid.innerHTML = '';

            for (var i = 0; i < 14; i++) {
                var day = new Date(today);
                day.setDate(day.getDate() + i);

                var cell = document.createElement('div');
                cell.className = 'day-cell';

                var isToday = i === 0;
                var isStart = pickerStartDate && isSameDay(day, pickerStartDate);
                var isEnd = pickerEndDate && isSameDay(day, pickerEndDate);
                var isBetween = pickerStartDate && pickerEndDate && day > pickerStartDate && day < pickerEndDate;
                var exceedsMax = pickerStartDate && day > maxEndDate;
                var invalidEndDate = pickerStartDate && !pickerEndDate && !exceedsMax &&
                    pickerStartHour && !hasValidEndSlotForDate(day, pickerStartDate, pickerStartHour);
                var disabled = !!exceedsMax || !!invalidEndDate;

                var inner = document.createElement('div');
                inner.className = 'day-inner';

                var label = document.createElement('span');
                label.className = 'day-label';
                label.textContent = day.getDate();
                inner.appendChild(label);

                var sub = document.createElement('span');
                sub.className = 'day-sub';

                if (isToday) {
                    sub.textContent = '今天';
                    inner.appendChild(sub);
                    cell.classList.add('today');
                }

                if (disabled) {
                    cell.classList.add('disabled');
                } else if (isStart) {
                    cell.classList.add('is-start');
                    sub.textContent = '取用';
                    if (!inner.contains(sub)) inner.appendChild(sub);
                } else if (isEnd) {
                    cell.classList.add('is-end');
                    sub.textContent = '归还';
                    if (!inner.contains(sub)) inner.appendChild(sub);
                } else if (isBetween) {
                    cell.classList.add('in-range');
                } else if (pickerStartDate && !pickerEndDate) {
                    cell.classList.add('selectable-end');
                }

                if (!disabled) {
                    cell.style.cursor = 'pointer';
                    var clickedDay = new Date(day);
                    cell.addEventListener('click', (function(d) {
                        return function() { onModalDateClick(d); };
                    })(clickedDay));
                } else {
                    cell.style.cursor = 'not-allowed';
                }

                cell.appendChild(inner);
                modalCalendarGrid.appendChild(cell);
            }
        }

        function changeModalMonth(delta) {
            renderModalCalendar();
        }

        function clearEndSelection() {
            pickerEndDate = null;
            pickerEndHour = null;
            dateSelectionStage = 'end';
        }

        function resetDateSelectionOnly() {
            pickerStartDate = null;
            pickerEndDate = null;
            pickerStartHour = null;
            pickerEndHour = null;
            dateSelectionStage = 'start';
        }

        function updateSelectionTip() {
            var tip = document.getElementById('selectionTip');
            if (!tip) return;

            if (!pickerStartDate) {
                tip.textContent = '请选择取用日期';
            } else if (!pickerEndDate) {
                tip.textContent = '请选择归还日期';
            } else {
                tip.textContent = '已选择：' + formatDateDisplay(pickerStartDate) + ' → ' + formatDateDisplay(pickerEndDate);
            }
        }

        function onModalDateClick(date) {
            var range = getSelectableRange();
            if (date < range.start || date > range.end) return;

            clearValidationMessage();

            if (pickerStartDate && pickerEndDate) {
                resetDateSelectionOnly();
            }

            if (dateSelectionStage === 'start' || !pickerStartDate) {
                pickerStartDate = new Date(date);
                pickerEndDate = null;
                pickerStartHour = null;
                pickerEndHour = null;
                dateSelectionStage = 'end';
                modalEndHourSelect.disabled = true;
                modalEndHourSelect.innerHTML = '<option value="">请先选择归还日期</option>';
            } else {
                if (date < pickerStartDate) {
                    showValidationMessage('归还日期不能早于取用日期，请重新选择。');
                    return;
                }

                if (pickerStartHour) {
                    var maxEnd = getMaxEndDateTime();
                    var selectedDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    var maxDateOnly = new Date(maxEnd.getFullYear(), maxEnd.getMonth(), maxEnd.getDate());
                    if (selectedDateOnly > maxDateOnly) {
                        showValidationMessage('归还日期超过最长可借用范围，最晚可选 ' + formatDateDisplay(maxEnd) + '。');
                        return;
                    }
                }

                pickerEndDate = new Date(date);
                pickerEndHour = null;
                dateSelectionStage = 'start';
                modalEndHourSelect.disabled = false;
            }

            renderModalCalendar();
            renderModalTimeOptions();
            updateModalConfirm();
            updateCompactSummary();
            updateSelectionTip();
        }

        function renderModalTimeOptions() {
            var startSelect = modalStartHourSelect;
            var endSelect = modalEndHourSelect;
            var now = new Date();
            var today = getToday();

            startSelect.innerHTML = '';
            var startPlaceholder = document.createElement('option');
            startPlaceholder.value = '';
            startPlaceholder.textContent = '请选择';
            startPlaceholder.selected = !pickerStartHour;
            startSelect.appendChild(startPlaceholder);

            var isTodayStart = pickerStartDate && isSameDay(pickerStartDate, today);
            HOTEL_TIME_SLOTS.forEach(function(slot) {
                var opt = document.createElement('option');
                opt.value = slot.start;
                opt.textContent = slot.label;

                if (isTodayStart) {
                    var minH = now.getHours() + (now.getMinutes() > 0 ? 1 : 0);
                    if (parseInt(slot.start, 10) < minH) opt.disabled = true;
                }

                if (pickerEndDate && pickerStartDate) {
                    if (pickerEndDate < pickerStartDate) {
                        opt.disabled = true;
                    } else if (!hasValidEndSlotForDate(pickerEndDate, pickerStartDate, slot.start)) {
                        opt.disabled = true;
                    }
                }

                startSelect.appendChild(opt);
            });
            startSelect.value = pickerStartHour || '';

            endSelect.innerHTML = '';
            var endPlaceholder = document.createElement('option');
            endPlaceholder.value = '';
            endPlaceholder.textContent = !pickerStartDate ? '请先选择取用日期' : (!pickerEndDate ? '请先选择归还日期' : '请选择');
            endPlaceholder.selected = !pickerEndHour;
            endSelect.appendChild(endPlaceholder);

            if (!pickerStartDate || !pickerEndDate) {
                endSelect.disabled = true;
                return;
            }

            endSelect.disabled = false;
            var isTodayEnd = isSameDay(pickerEndDate, today);

            HOTEL_TIME_SLOTS.forEach(function(slot) {
                var opt = document.createElement('option');
                opt.value = slot.end;
                opt.textContent = slot.label;

                var endDt = makeDateTime(pickerEndDate, slot.end);
                var startDt = pickerStartDate && pickerStartHour ? makeDateTime(pickerStartDate, pickerStartHour) : null;

                if (startDt) {
                    if (endDt <= startDt) opt.disabled = true;

                    var effectiveHours = getEffectiveBorrowHours(startDt, endDt);
                    if (effectiveHours <= 0 || effectiveHours > pickerMaxHours) opt.disabled = true;
                }

                if (isTodayEnd) {
                    var minH = now.getHours() + (now.getMinutes() > 0 ? 1 : 0);
                    if (parseInt(slot.end, 10) < minH) opt.disabled = true;
                }

                endSelect.appendChild(opt);
            });

            if (pickerEndHour) {
                var selectedOpt = Array.from(endSelect.options).find(function(o) {
                    return o.value === pickerEndHour && !o.disabled;
                });
                if (selectedOpt) {
                    endSelect.value = pickerEndHour;
                } else {
                    pickerEndHour = null;
                    endSelect.value = '';
                }
            } else {
                endSelect.value = '';
            }
        }

        function showValidationMessage(message) {
            var el = document.getElementById('validationMessage');
            if (!el) return;
            el.textContent = '⚠️ ' + message;
            el.classList.add('show');
        }

        function clearValidationMessage(force) {
            var el = document.getElementById('validationMessage');
            if (!el) return;
            if (force === false) return;
            el.textContent = '';
            el.classList.remove('show');
        }

        function validateSelectedDuration(showAlert) {
            if (!pickerStartDate || !pickerStartHour || !pickerEndDate || !pickerEndHour) return true;

            var startDt = makeDateTime(pickerStartDate, pickerStartHour);
            var endDt = makeDateTime(pickerEndDate, pickerEndHour);

            if (endDt <= startDt) {
                showValidationMessage('归还时间必须晚于取用时间，请重新选择归还时段。');
                return false;
            }

            var effectiveHours = getEffectiveBorrowHours(startDt, endDt);
            if (effectiveHours > pickerMaxHours) {
                showValidationMessage('计入 08:00–22:00 的有效借用时间超过设备最长可借用范围，请重新选择归还时段。');
                return false;
            }
            if (effectiveHours < 0.5) {
                showValidationMessage('有效借用时间至少 30 分钟，请重新选择时间。');
                return false;
            }
            return true;
        }

        function onModalStartHourChange() {
            pickerStartHour = modalStartHourSelect.value || null;
            pickerEndHour = null;
            clearValidationMessage();

            if (pickerStartHour && pickerEndDate && !hasValidEndSlotForDate(pickerEndDate, pickerStartDate, pickerStartHour)) {
                pickerEndDate = null;
                dateSelectionStage = 'end';
                showValidationMessage('取用时间调整后，原归还日期已无法满足最长借用时间，请重新选择归还日期。');
            }

            renderModalCalendar();
            renderModalTimeOptions();
            updateModalConfirm();
            updateCompactSummary();
            updateSelectionTip();
        }

        function onModalEndHourChange() {
            pickerEndHour = modalEndHourSelect.value || null;
            clearValidationMessage();

            if (pickerEndHour && pickerStartDate && pickerStartHour && pickerEndDate) {
                if (!validateSelectedDuration(true)) {
                    pickerEndHour = null;
                    modalEndHourSelect.value = '';
                }
            }

            updateModalConfirm();
            updateCompactSummary();
        }

        function updateModalConfirm() {
            var valid = pickerStartDate && pickerStartHour && pickerEndDate && pickerEndHour;
            if (valid) {
                var startDt = makeDateTime(pickerStartDate, pickerStartHour);
                var endDt = makeDateTime(pickerEndDate, pickerEndHour);
                var effectiveHours = getEffectiveBorrowHours(startDt, endDt);
                modalConfirmBtn.disabled = !(endDt > startDt && effectiveHours >= 0.5 && effectiveHours <= pickerMaxHours);
            } else {
                modalConfirmBtn.disabled = true;
            }
        }

        function resetModalPicker() {
            clearValidationMessage();
            pickerStartDate = null;
            pickerStartHour = null;
            pickerEndDate = null;
            pickerEndHour = null;
            dateSelectionStage = 'start';
            modalEndHourSelect.disabled = true;
            modalEndHourSelect.innerHTML = '<option value="">请先选择取用日期</option>';
            renderModalCalendar();
            renderModalTimeOptions();
            updateModalConfirm();
            updateCompactSummary();
            updateSelectionTip();
            updateDeviceDetailList();
        }

        function confirmModalPicker() {
            clearValidationMessage();

            if (!pickerStartDate || !pickerStartHour || !pickerEndDate || !pickerEndHour) {
                showValidationMessage('请先完整选择取用日期、取用时间、归还日期和归还时间。');
                return;
            }

            if (!validateSelectedDuration(false)) return;

            var start = makeDateTime(pickerStartDate, pickerStartHour);
            var end = makeDateTime(pickerEndDate, pickerEndHour);
            var effectiveHours = getEffectiveBorrowHours(start, end);

            if (end <= start) {
                showValidationMessage('归还时间必须晚于取用时间，请重新选择。');
                return;
            }
            if (effectiveHours > pickerMaxHours) {
                showValidationMessage('有效借用时间超过设备最长可借用范围，请重新选择归还时段。');
                return;
            }
            if (effectiveHours < 0.5) {
                showValidationMessage('有效借用时间至少 30 分钟，请重新选择时间。');
                return;
            }

            deviceStartDateTime = new Date(start);
            deviceEndDateTime = new Date(end);

            updateCompactSummary();
            updateDeviceDetailList();
            closeTimePicker();
        }

        function updateCompactSummary() {
            if (pickerStartDate && pickerStartHour) {
                compactStartEl.textContent = formatDateDisplay(pickerStartDate) + ' ' + pickerStartHour;
                compactStartEl.className = '';
            } else {
                compactStartEl.textContent = '选择时间';
                compactStartEl.className = 'placeholder';
            }
            if (pickerEndDate && pickerEndHour) {
                compactEndEl.textContent = formatDateDisplay(pickerEndDate) + ' ' + pickerEndHour;
                compactEndEl.className = '';
            } else {
                compactEndEl.textContent = '选择时间';
                compactEndEl.className = 'placeholder';
            }

            if (modalBorrowDurationText) {
                if (pickerStartDate && pickerStartHour && pickerEndDate && pickerEndHour) {
                    var startDt = makeDateTime(pickerStartDate, pickerStartHour);
                    var endDt = makeDateTime(pickerEndDate, pickerEndHour);
                    var effectiveHours = getEffectiveBorrowHours(startDt, endDt);
                    var hoursText = Number.isInteger(effectiveHours) ? String(effectiveHours) : effectiveHours.toFixed(1)
                        .replace(/\.0$/, '');
                    modalBorrowDurationText.innerHTML = '从 ' + formatDateDisplay(startDt) + ' ' + pickerStartHour + ' 到 ' +
                        formatDateDisplay(endDt) + ' ' + pickerEndHour +
                        '，一共 <span class="duration-hours">' + hoursText + ' 小时</span>';
                } else {
                    modalBorrowDurationText.textContent = '请选择完整的借用时间';
                }
            }
        }

        function getPickerDateTime() {
            if (!pickerStartDate || !pickerStartHour || !pickerEndDate || !pickerEndHour) return null;
            var start = makeDateTime(pickerStartDate, pickerStartHour);
            var end = makeDateTime(pickerEndDate, pickerEndHour);
            if (end <= start) return null;
            var effectiveHours = getEffectiveBorrowHours(start, end);
            if (effectiveHours > pickerMaxHours || effectiveHours < 0.5) return null;
            return { start: start, end: end, hours: effectiveHours };
        }

        // ==================== 设备详情列表 ====================
        function updateDeviceDetailList() {
            var wrap = document.getElementById('deviceDetailListWrap');
            if (!wrap) return;
            var dt = getPickerDateTime();
            if (!dt) {
                wrap.innerHTML = '<div class="card"><p style="color:var(--muted);text-align:center;">请点击上方「修改时间」选择完整的借用时间</p></div>';
                return;
            }
            renderDeviceDetailList();
        }

        function renderDeviceDetailList() {
            var wrap = document.getElementById('deviceDetailListWrap');
            wrap.innerHTML = '';
            var devName = pendingDevice;
            var devInfo = Object.values(deviceAllData).flat().find(function(d) { return d.name === devName });
            if (!devInfo) { wrap.innerHTML = '<div class="card"><p style="color:var(--muted)">设备信息不存在</p></div>'; return; }
            var cabs = deviceCabinetMap[devName] || [];
            if (cabs.length === 0) { wrap.innerHTML = '<div class="card"><p style="color:var(--muted)">该设备暂无柜体信息</p></div>'; return; }
            var dt = getPickerDateTime();
            if (!dt) {
                wrap.innerHTML = '<div class="card"><p style="color:var(--muted);text-align:center;">请选择完整的日期和时间</p></div>';
                return;
            }
            var stock = deviceStock[devName];
            var avail = stock ? stock.available : 0;
            var baseDev = Object.values(deviceAllData).flat().find(function(d) { return d.name === devName });
            var isRFID = baseDev && baseDev.codeType === 'RFID码';
            var maxHours = stock ? stock.maxHours : 24;
            var durationHours = dt.hours;
            if (durationHours > maxHours) {
                wrap.innerHTML = '<div class="card"><p style="color:#dc2626;text-align:center;">⚠️ 借用时长超过最大限制（' +
                    maxHours + '小时）</p></div>';
                return;
            }
            if (durationHours < 0.5) {
                wrap.innerHTML = '<div class="card"><p style="color:#dc2626;text-align:center;">⚠️ 借用时长至少30分钟</p></div>';
                return;
            }
            if (avail > 0) {
                cabs.forEach(function(cab) {
                    var card = document.createElement('div');
                    card.className = 'detail-device-card';
                    var uniqueCode = cab.code || baseDev.code;
                    var codeType = cab.ver || baseDev.codeType;
                    var cabInfo = '<small>设备位置：' + (cab.pos || '-') + '</small>';
                    var btnAction = isRFID ? 'handleRFIDBorrowWithTime(\'' + devName + '\',\'' + cab.cabName +
                        '\',\'' + cab.cabNo + '\',\'' + cab.pos + '\')' : 'borrowWithTime(\'' + devName + '\')';
                    var btnText = '借用';
                    var btnClass = 'btn';
                    card.innerHTML = '<div class="info"><h4>' + devName + '</h4><small>型号：' + devInfo.model +
                        ' · ' + codeType + '：' + uniqueCode + '</small>' + cabInfo +
                        '<span class="resource-link" onclick="openResource(\'' + devName + '\')">设备手册 / 配套资源</span>' +
                        '</div><button class="' + btnClass + '" onclick="' + btnAction + '">' + btnText +
                        '</button>';
                    wrap.appendChild(card);
                });
            } else {
                var card = document.createElement('div');
                card.className = 'detail-device-card';
                var nextTime = stock && stock.nextAvailable ? stock.nextAvailable : '未知';
                var uniqueCode = cabs.length > 0 ? cabs[0].code || baseDev.code : baseDev.code;
                var codeType = cabs.length > 0 ? cabs[0].ver || baseDev.codeType : baseDev.codeType;
                var cabInfo = '<small>设备位置：' + (cabs[0]?.pos || '-') + '</small>';
                card.innerHTML = '<div class="info"><h4>' + devName + '</h4><small>型号：' + devInfo.model + ' · ' +
                    codeType + '：' + uniqueCode + '</small>' + cabInfo + '<span class="resource-link" onclick="openResource(\'' +
                    devName + '\')">设备手册 / 配套资源</span>' +
                    '<span class="unavailable-tag">设备已借出，预计在 ' + nextTime + ' 后归还</span></div>' +
                    '<button class="btn" style="background:var(--muted);cursor:not-allowed;" disabled>暂不可用</button>';
                wrap.appendChild(card);
            }
        }

        // ==================== 借用函数 ====================
        function borrowWithTime(devName) {
            var dt = getPickerDateTime();
            if (!dt) { showNotice('请先选择完整的借用时间', '提示'); return; }
            pendingDevice = devName;
            var durationHours = dt.hours;
            var maxHours = deviceStock[devName] ? deviceStock[devName].maxHours : 72;
            if (durationHours > maxHours) { showNotice('借用时长超过该设备最大限制（' + maxHours + '小时）', '提示'); return; }
            if (durationHours < 0.5) { showNotice('借用时长至少30分钟', '提示'); return; }
            if (!systemDone) { promptTarget = 'systemExam';
                document.getElementById('examPromptText').textContent = '首次使用本软件前，需要先完成"系统使用考试"。';
                document.getElementById('examPrompt').classList.add('show'); return; }
            var needExam = !rfidDeviceList.includes(devName) && safetyExamList.some(function(item) { return item.dev === devName });
            if (needExam && !safetyExamStatusMap[devName]) { promptTarget = 'deviceExam';
                document.getElementById('examPromptText').textContent = devName + '需先完成安全考试才可借用。';
                document.getElementById('examPrompt').classList.add('show'); return; }
            var stock = deviceStock[devName];
            if (stock && stock.available <= 0) { var nextTime = stock.nextAvailable || '未知';
                showNotice('当前' + devName + '暂无可借设备，预计' + nextTime + '后可借', '暂不可借'); return; }
            var devInfo = Object.values(deviceAllData).flat().find(function(d) { return d.name === devName });
            document.getElementById('borrowName').textContent = devName + ' · 借用申请';
            document.getElementById('borrowDevName').textContent = devName;
            document.getElementById('borrowDevModel').textContent = devInfo ? devInfo.model : '-';
            document.getElementById('borrowTimeDisplay').textContent = formatDateDisplay(dt.start) + ' ' + formatHourDisplay(
                dt.start) + ' → ' + formatDateDisplay(dt.end) + ' ' + formatHourDisplay(dt.end);
            document.getElementById('borrowDurationDisplay').textContent = Math.round(durationHours * 10) / 10 + ' 小时（最长 ' +
                maxHours + ' 小时）';
            document.getElementById('borrowReason').value = '';
            window._borrowTimeInfo = { start: new Date(dt.start), end: new Date(dt.end), duration: durationHours,
                devName: devName };
            deviceStartDateTime = dt.start;
            deviceEndDateTime = dt.end;
            show('borrow');
        }

        function handleRFIDBorrowWithTime(devName, cabName, cabNo, pos) {
            var dt = getPickerDateTime();
            if (!dt) { showNotice('请先选择完整的借用时间', '提示'); return; }
            pendingDevice = devName;
            pendingRFIDInfo = { cabName: cabName, cabNo: cabNo, pos: pos };
            rfidSourcePage = 'deviceDetail';
            rfidPendingDevice = devName;
            rfidPendingCabInfo = { cabName: cabName, cabNo: cabNo, pos: pos };
            deviceStartDateTime = dt.start;
            deviceEndDateTime = dt.end;
            if (!systemDone) { promptTarget = 'systemExam';
                document.getElementById('examPromptText').textContent = '首次使用本软件前，需要先完成"系统使用考试"。';
                document.getElementById('examPrompt').classList.add('show'); return; }
            if (!rfidExamStatusMap[devName]) { promptTarget = 'rfidExam';
                document.getElementById('examPromptText').textContent = '使用' + devName + '前，需要先完成"' + devName +
                    ' RFID安全考试"。';
                document.getElementById('examPrompt').classList.add('show'); return; }
            borrowWithTime(devName);
        }

        function openDeviceDetail(devName, fromHome) {
            if (fromHome !== undefined) _fromHome = !!fromHome;
            else _fromHome = false;
            pendingDevice = devName;
            var devInfo = Object.values(deviceAllData).flat().find(function(d) { return d.name === devName });
            var devCateKey = '';
            for (var k in deviceAllData) { if (deviceAllData[k].some(function(item) { return item.name === devName })) { devCateKey =
                        k; break } }
            document.getElementById('detailDevName').textContent = devName;
            var pos = deviceCabinetMap[devName]?.[0]?.pos || '-';
            document.getElementById('detailDeviceMeta').innerHTML = '型号：' + (devInfo?.model || '-') + '<br>' +
                (devInfo?.codeType || '设备码') + '：' + (devInfo?.code || '-') + '<br>设备位置：' + pos;
            document.getElementById('detailCateText').textContent = "分类：" + cateNameMap[devCateKey];
            initTimePicker(devName);
            show('deviceDetail');
        }

        // ==================== 工位预约模块 ====================
        function generateStations() {
            var rooms = [{ name: '301 实验室', prefix: 'A', count: 24 }, { name: '302 实验室', prefix: 'B', count: 24 },
                { name: '303 实验室', prefix: 'C', count: 20 }, { name: '401 实验室', prefix: 'D', count: 20 },
                { name: '402 实验室', prefix: 'E', count: 20 }, { name: '501 机房', prefix: 'F', count: 24 }
            ];
            var stations = [],
                id = 1;
            rooms.forEach(function(r) {
                for (var i = 1; i <= r.count; i++) {
                    var sts = ['on', 'off', 'off', 'on', 'off', 'off', 'on', 'off', 'off', 'on', 'off', 'offline'];
                    stations.push({ id: 's' + String(id).padStart(3, '0'), name: '工位 ' + r.prefix + '-' + String(i)
                            .padStart(2, '0'), location: r.name, status: sts[(id - 1) % sts.length], current: 0,
                        voltage: 0, power: 0, energy: 0, temperature: 0, leakage: 0 });
                    id++;
                }
            });
            return stations;
        }
        var STATIONS = generateStations();
        var todayDay = (new Date().getDay() || 7);
        var COURSES = [
            { id: 'c001', name: '嵌入式系统实验', teacher: '张老师', room: '301 实验室', dayOfWeek: todayDay, startTime: '08:30',
                endTime: '12:00', weeks: '1-16' },
            { id: 'c002', name: '数字电路实验', teacher: '李老师', room: '302 实验室', dayOfWeek: todayDay, startTime: '14:00',
                endTime: '17:00', weeks: '1-16' },
            { id: 'c003', name: '单片机原理', teacher: '王老师', room: '301 实验室', dayOfWeek: todayDay, startTime: '09:00',
                endTime: '12:00', weeks: '1-16' },
            { id: 'c004', name: 'PCB设计实训', teacher: '赵老师', room: '301 实验室', dayOfWeek: todayDay, startTime: '14:00',
                endTime: '17:30', weeks: '1-16' }
        ];
        var reserveStep = 1,
            selectedDate = '',
            selectedStart = '',
            selectedEnd = '';
        var availableLabs = [],
            selectedLab = '',
            availableStations = [],
            selectedStation = null;
        var purpose = '';
        var ALL_TIMES = [];
        for (var h = 8; h <= 24; h += 2) ALL_TIMES.push(pad(h) + ':00');
        function slotLabel(start, end) { return start + ' - ' + end; }

        function initReserve() {
            var now = new Date();
            var ds = formatDateDisplay(now);
            selectedDate = ds;
            document.getElementById('reserveDate').value = ds;
            document.getElementById('reserveDate').min = ds;
            updateStartTimeOptions();
        }

        function updateStartTimeOptions() {
            var so = ALL_TIMES.slice();
            var now = new Date();
            var ts = formatDateDisplay(now);
            if (selectedDate === ts) {
                var mm = now.getHours() * 60 + now.getMinutes() + 15;
                so = ALL_TIMES.filter(function(t, i) { return i < ALL_TIMES.length - 1 && timeToMinutes(t) >= Math.max(8 * 60, Math.ceil(mm / 120) * 120) });
            }
            var sel = document.getElementById('startTime');
            sel.innerHTML = '<option value="">请选择开始时间</option>';
            so.forEach(function(t, i) { sel.innerHTML += '<option value="' + t + '">' + slotLabel(t, ALL_TIMES[ALL_TIMES.indexOf(t) + 1]) + '</option>'; });
            selectedStart = '';
            selectedEnd = '';
            resetEndTime();
            document.getElementById('timeHint').style.display = 'none';
        }

        function onDateChange() {
            var val = document.getElementById('reserveDate').value;
            var now = new Date();
            var today = formatDateDisplay(now);
            if (val < today) { showNotice('不能选择今天之前的日期', '提示');
                document.getElementById('reserveDate').value = today;
                selectedDate = today; } else selectedDate = val;
            updateStartTimeOptions();
        }

        function onStartTimeChange() {
            selectedStart = document.getElementById('startTime').value;
            if (!selectedStart) { resetEndTime(); return; }
            var eo = ALL_TIMES.filter(function(t) { return timeToMinutes(t) >= timeToMinutes(selectedStart) + 120 });
            var sel = document.getElementById('endTime');
            sel.disabled = false;
            sel.innerHTML = '<option value="">请选择结束时间</option>';
            eo.forEach(function(t, i) { var endIndex = ALL_TIMES.indexOf(t); var previous = ALL_TIMES[Math.max(0, endIndex - 1)]; sel.innerHTML += '<option value="' + t + '">' + slotLabel(previous, t) + '</option>'; });
            selectedEnd = '';
            updateTimeHint();
        }

        function onEndTimeChange() {
            selectedEnd = document.getElementById('endTime').value;
            updateTimeHint();
        }

        function resetEndTime() {
            var sel = document.getElementById('endTime');
            sel.disabled = true;
            sel.innerHTML = '<option value="">请先选开始时间</option>';
            selectedEnd = '';
            document.getElementById('timeHint').style.display = 'none';
        }

        function updateTimeHint() {
            var h = document.getElementById('timeHint');
            if (selectedStart && selectedEnd) { h.style.display = 'block';
                h.textContent = '已选：' + selectedStart + ' 至 ' + selectedEnd; } else h.style.display = 'none';
        }

        function onNextToLabs() {
            if (!selectedDate) { showNotice('请选择日期', '提示'); return; }
            var now = new Date();
            var today = formatDateDisplay(now);
            if (selectedDate < today) { showNotice('不能选择今天之前的日期', '提示'); return; }
            if (!selectedStart) { showNotice('请选择开始时间', '提示'); return; }
            if (!selectedEnd) { showNotice('请选择结束时间', '提示'); return; }
            var rs = getReservations();
            var dp = selectedDate.split('-'),
                dw = new Date(parseInt(dp[0]), parseInt(dp[1]) - 1, parseInt(dp[2])).getDay() || 7;
            var rqs = timeToMinutes(selectedStart),
                rqe = timeToMinutes(selectedEnd);
            var lm = {};
            STATIONS.forEach(function(s) {
                if (s.status === 'offline' || s.status === 'fault' || s.status === 'on') return;
                if (COURSES.find(function(c) { return c.room === s.location && c.dayOfWeek === dw && rqs < timeToMinutes(
                        c.endTime) && rqe > timeToMinutes(c.startTime) })) return;
                if (rs.find(function(r) { return r.stationId === s.id && r.date === selectedDate && (r.status ===
                        'reserved' || r.status === 'using' || r.status === 'approved' || r.status ===
                        'pending_review') && rqs < timeToMinutes(r.timeSlot.split('-')[1]) && rqe > timeToMinutes(r
                        .timeSlot.split('-')[0]) })) return;
                var lb = s.location || '未分配';
                if (!lm[lb]) lm[lb] = [];
                lm[lb].push(s);
            });
            availableLabs = Object.entries(lm).map(function(e) { return { name: e[0], count: e[1].length } });
            if (!availableLabs.length) { showNotice('该时段无可用工位', '提示'); return; }
            document.getElementById('step2Label').textContent = selectedDate + ' ' + selectedStart + '-' + selectedEnd;
            var html = '';
            availableLabs.forEach(function(l) {
                html += '<div class="lab-card" onclick="onSelectLab(\'' + l.name + '\')"><div class="lab-icon">🏢</div><div class="lab-info"><div class="lab-name">' +
                    l.name + '</div><div class="lab-count">' + l.count + ' 个可用工位</div></div><div class="lab-arrow">→</div></div>';
            });
            document.getElementById('labList').innerHTML = html;
            document.getElementById('labEmpty').style.display = 'none';
            show('reserveStep2');
        }

        function onSelectLab(lab) {
            selectedLab = lab;
            selectedStation = null;
            purpose = '';
            var rs = getReservations(),
                dp = selectedDate.split('-');
            var dw = new Date(parseInt(dp[0]), parseInt(dp[1]) - 1, parseInt(dp[2])).getDay() || 7;
            var rqs = timeToMinutes(selectedStart),
                rqe = timeToMinutes(selectedEnd);
            availableStations = STATIONS.filter(function(s) {
                if (s.location !== lab || s.status === 'offline' || s.status === 'fault' || s.status === 'on')
                    return false;
                if (COURSES.find(function(c) { return c.room === s.location && c.dayOfWeek === dw && rqs < timeToMinutes(
                        c.endTime) && rqe > timeToMinutes(c.startTime) })) return false;
                return !rs.find(function(r) { return r.stationId === s.id && r.date === selectedDate && (r.status ===
                        'reserved' || r.status === 'using' || r.status === 'approved' || r.status ===
                        'pending_review') && rqs < timeToMinutes(r.timeSlot.split('-')[1]) && rqe > timeToMinutes(r
                        .timeSlot.split('-')[0]) });
            });
            document.getElementById('step3Title').textContent = selectedLab;
            document.getElementById('step3Label').textContent = selectedDate + ' ' + selectedStart + '-' + selectedEnd;
            renderStationGrid();
            document.getElementById('purposeSection').style.display = 'none';
            document.getElementById('purposeInput').value = '';
            show('reserveStep3');
        }

        function renderStationGrid() {
            var html = '';
            availableStations.forEach(function(s) {
                var sel = selectedStation && selectedStation.id === s.id;
                html += '<div class="station-cell' + (sel ? ' selected' : '') + '" onclick="onSelectStation(\'' + s
                    .id + '\')"><div class="cell-header"><div class="cell-name">' + s.name +
                    '</div>' + (sel ? '<div class="cell-check">✓</div>' : '') +
                    '</div><div class="cell-indicators"><div class="indicator"><div class="dot"></div>空闲</div></div></div>';
            });
            document.getElementById('stationGrid').innerHTML = html;
            document.getElementById('stationEmpty').style.display = availableStations.length ? 'none' : 'block';
        }

        function onSelectStation(id) {
            selectedStation = availableStations.find(function(s) { return s.id === id });
            document.getElementById('selectedName').textContent = selectedStation ? selectedStation.name : '';
            document.getElementById('purposeSection').style.display = 'block';
            renderStationGrid();
        }

        function onSubmitReserve() {
            if (!selectedStation) { showNotice('请选择工位', '提示'); return; }
            if (!purpose) { showNotice('请填写使用目的', '提示'); return; }
            var now = new Date();
            var applyTime = formatDateDisplay(now) + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
            pendingReserveApprovals.push({
                orderNo: generateReserveOrderNo(),
                stationName: selectedStation.name,
                location: selectedLab,
                date: selectedDate,
                timeSlot: selectedStart + '-' + selectedEnd,
                purpose: purpose,
                applyTime: applyTime,
                status: '待审批',
                type: 'reserve'
            });
            showNotice('工位预约申请已提交，等待管理员审批。', '提交成功');
            updateReserveCount();
            updateApprovalCount();
            selectedStation = null;
            purpose = '';
            document.getElementById('purposeInput').value = '';
            show('reserveStep1');
        }

        function closeConfirmModal(confirmed) {
            document.getElementById('confirmModal').style.display = 'none';
            if (modalCb) { modalCb(confirmed);
                modalCb = null; }
        }

        // ==================== 首页内容渲染 ====================
        function renderContentPickup() {
            var box = document.getElementById('homeContentBox');
            box.innerHTML = '';
            if (pickupDevices.length === 0) { box.innerHTML = '<div class="empty-tip">暂无待领取设备</div>';
                box.classList.add('open'); return; }
            pickupDevices.forEach(function(d) {
                var a = document.createElement('div');
                a.className = 'card';
                var pickupInfo = d.pickupAvailableTime ? '可领取时间：' + d.pickupAvailableTime : '可立即领取';
                var accessCode = generateFourDigitCode('领取', d.name, d.cabNo);
                a.innerHTML = '<div class="row"><h3>' + d.name + '</h3><span class="access-code">' + accessCode +
                    '</span></div><p>型号：' + d.model + '<br>' + d.codeType + '：' + d.code + '<br>设备位置：' + d.pos +
                    '<br>' + pickupInfo + '</p>';
                box.appendChild(a);
            });
            box.classList.add('open');
        }

        function renderContentReturn() {
            var box = document.getElementById('homeContentBox');
            box.innerHTML = '';
            var returnData = [
                { name: "数字示波器", model: "DS1054Z", codeType: "标签码", code: "125896", cab: "实验室 A01",
                    status: "明日 18:00 到期", statusCls: "orange", btn: "生成归还码", dataDev: "数字示波器",
                    dataTag: "标签码 125896", dataCab: "实验室A01柜", dataCabno: "001201", dataPos: "1号楼3层",
                    expectedReturn: "2026-07-24-18:00" },
                { name: "直流稳压电源", model: "DY-3005", codeType: "RFID码", code: "714296", cab: "实验室 B01",
                    status: "借用中", statusCls: "", btn: "生成归还码", dataDev: "直流稳压电源",
                    dataTag: "RFID码 714296", dataCab: "实验室B01柜", dataCabno: "002201", dataPos: "1号楼4层",
                    expectedReturn: "2026-07-23-16:00" },
                { name: "数字万用表", model: "DT9205", codeType: "标签码", code: "69125", cab: "实验室 A03",
                    status: "已逾期 2 天", statusCls: "red", btn: "生成归还码", dataDev: "数字万用表",
                    dataTag: "标签码 69125", dataCab: "实验室A03柜", dataCabno: "001204", dataPos: "1号楼3层",
                    expectedReturn: "2026-07-21-18:00" }
            ];
            returnData.forEach(function(item) {
                var a = document.createElement('div');
                a.className = 'card';
                var typeCls = item.statusCls ? 'type ' + item.statusCls : 'type';
                var expectedInfo = item.expectedReturn ? '预计归还：' + item.expectedReturn : '';
                var accessCode = generateFourDigitCode('归还', item.name, item.dataCabno);
                a.innerHTML = '<div class="row"><h3>' + item.name + '</h3><span class="access-code">' + accessCode +
                    '</span></div><p>型号：' + item.model + '<br>' + item.codeType + '：' + item.code +
                    '<br>设备位置：' + item.dataPos + '<br>' + expectedInfo + '</p>';
                box.appendChild(a);
            });
            box.classList.add('open');
        }

        function renderContentApproval() {
            var box = document.getElementById('homeContentBox');
            box.innerHTML = '';
            var allApprovals = [];
            pendingApprovals.forEach(function(item) { allApprovals.push({ ...item, approvalType: 'device' }); });
            pendingReserveApprovals.forEach(function(item) { allApprovals.push({ ...item, approvalType: 'reserve' }); });
            if (allApprovals.length === 0) { box.innerHTML = '<div class="empty-tip">暂无待审批订单</div>';
                box.classList.add('open'); return; }
            allApprovals.forEach(function(item, idx) {
                var a = document.createElement('div');
                a.className = 'card';
                var typeLabel = item.approvalType === 'reserve' ? '工位预约' : '设备借用';
                var typeColor = item.approvalType === 'reserve' ? '#8b5cf6' : '#f59e0b';
                var infoHtml = item.approvalType === 'reserve' ? '工位：' + item.stationName + '<br>时间：' + item
                    .date + ' ' + item.timeSlot + '<br>目的：' + item.purpose :
                    '型号：' + item.model + ' · ' + item.codeType + '：' + item.code + '<br>申请时间：' + item
                    .applyTime + (item.reason ? '<br>申请原因：' + item.reason : '');
                var btnHtml = '';
                if (item.approvalType === 'device') {
                    var deviceIdx = pendingApprovals.indexOf(pendingApprovals.find(function(p) { return p
                            .orderNo === item.orderNo }));
                    btnHtml = '<button class="btn danger" style="margin-top:8px;" onclick="cancelApproval(' +
                        deviceIdx + ')">撤销申请</button>';
                } else {
                    btnHtml = '<button class="btn danger" style="margin-top:8px;" onclick="cancelReserveApproval(\'' +
                        item.orderNo + '\')">撤销申请</button>';
                }
                a.innerHTML = '<div class="row"><h3>' + (item.approvalType === 'reserve' ? item.stationName : item
                    .devName) + '</h3><span class="type" style="color:' + typeColor + ';background:' + typeColor +
                    '22">' + typeLabel + ' · 待审批</span></div><p>' + infoHtml + '</p>' + btnHtml;
                box.appendChild(a);
            });
            box.classList.add('open');
        }

        let reserveCountdownTimer = null;

        function renderContentReserve() {
            var box = document.getElementById('homeContentBox');
            box.innerHTML = '';
            var rs = getReservations();
            var myId = '20230101';
            var myRs = rs.filter(function(r) { return r.studentId === myId });

            var now = new Date();
            var today = formatDateDisplay(now);
            var nMins = now.getHours() * 60 + now.getMinutes();

            myRs.forEach(function(r) {
                if (r.status === 'cancelled' || r.status === 'rejected' || r.status === 'completed' || r
                    .status === 'timeout') {
                    r._p = r.status;
                    return;
                }
                if (r.status === 'pending_review') {
                    r._p = 'review';
                    r.statusText = '待审核';
                    return;
                }
                var sp = r.timeSlot.split('-');
                var sM = timeToMinutes(sp[0]),
                    eM = timeToMinutes(sp[1]);
                var isT = r.date === today;

                if (r.status === 'approved') {
                    if (r.date > today) { r._p = 'approved_wait';
                        r.statusText = '已通过（待开始）'; return; }
                    if (r.date < today) { r.status = 'timeout';
                        r.statusText = '已超时';
                        r._p = 'timeout'; return; }
                    if (nMins < sM) { r._p = 'approved_wait';
                        r.statusText = '已通过（待开始）';
                        r._wm = sM - nMins; return; }
                    if (nMins >= sM && nMins < eM) { r.status = 'using';
                        r.statusText = '使用中';
                        r._p = 'using';
                        r._rm = eM - nMins; return; }
                    if (nMins >= eM) { r.status = 'completed';
                        r.statusText = '已结束';
                        r._p = 'completed'; return; }
                    r._p = 'approved';
                    r.statusText = '已通过';
                    return;
                }
                if (r.status === 'using') {
                    if (r.date > today) { r._p = 'using_wait';
                        r.statusText = '使用中（待开始）'; return; }
                    if (r.date < today) { r.status = 'completed';
                        r.statusText = '已结束';
                        r._p = 'completed'; return; }
                    var rem = eM - nMins;
                    if (rem <= 0) { r.status = 'completed';
                        r.statusText = '已结束';
                        r._p = 'completed'; } else {
                        r._p = 'using';
                        r.statusText = '使用中';
                        r._rm = rem;
                        var nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
                        var endSec = Math.floor(eM / 60) * 3600 + (eM % 60) * 60;
                        r._remSec = Math.max(0, endSec - nowSec);
                    }
                    return;
                }
                r._p = r.status;
                r.statusText = r.statusText || r.status;
            });

            var active = myRs.filter(function(r) {
                return r._p === 'approved_wait' || r._p === 'using' || r._p === 'using_wait';
            });

            active.sort(function(a, b) {
                var aStart = a.timeSlot ? a.timeSlot.split('-')[0] : '00:00';
                var bStart = b.timeSlot ? b.timeSlot.split('-')[0] : '00:00';
                return (a.date + ' ' + aStart).localeCompare(b.date + ' ' + bStart);
            });

            document.getElementById('reserveCountNum').textContent = active.length;

            if (active.length === 0) {
                box.innerHTML = '<div class="empty-tip">暂无进行中的工位预约</div>';
                box.classList.add('open');
                if (reserveCountdownTimer) { clearInterval(reserveCountdownTimer);
                    reserveCountdownTimer = null; }
                return;
            }

            active.forEach(function(r) {
                var div = document.createElement('div');
                div.className = 'reservation-card';

                var statusMap = {
                    'approved_wait': { cls: 'status-approved', label: '已通过' },
                    'using': { cls: 'status-using', label: '使用中' },
                    'using_wait': { cls: 'status-using', label: '使用中' }
                };
                var st = statusMap[r._p] || { cls: 'status-' + r.status, label: r.statusText || r.status };

                div.innerHTML = '<div class="rc-header"><div class="rc-station">' + r.stationName +
                    '</div><span class="rc-tag ' + st.cls + '">' + st.label + '</span></div>';

                var extraHtml = '';
                if (r._p === 'approved_wait') {
                    var waitMin = r._wm || 0;
                    if (waitMin > 0) {
                        extraHtml = '<div class="info-bar wait">⏳ 距开始还有 ' + waitMin + ' 分钟</div>';
                    } else {
                        extraHtml = '<div class="info-bar approved">✅ 已通过，等待开始</div>';
                    }
                } else if (r._p === 'using') {
                    var remSec = r._remSec || 0;
                    if (remSec > 0) {
                        var hrs = Math.floor(remSec / 3600);
                        var mins = Math.floor((remSec % 3600) / 60);
                        var secs = remSec % 60;
                        var timeStr = (hrs > 0 ? hrs + '时' : '') + mins + '分' + pad(secs) + '秒';
                        extraHtml = '<div class="using-bar">⏳ 剩余使用时间：<span class="remain-time" data-remain="' +
                            remSec + '">' + timeStr + '</span></div>';
                    } else {
                        extraHtml = '<div class="using-bar">⏳ 即将结束</div>';
                    }
                } else if (r._p === 'using_wait') {
                    extraHtml = '<div class="info-bar wait">⏳ 尚未开始</div>';
                }

                var bodyHtml = '<div class="rc-body">' +
                    '<div class="rc-row">📅 ' + r.date + ' ' + r.timeSlot + '</div>' +
                    '<div class="rc-row">📝 ' + r.purpose + '</div>' +
                    (r.checkinTime ? '<div class="rc-row">✅ 签到：' + r.checkinTime + '</div>' : '') +
                    '</div>';

                var actionsHtml = '';
                if (r._p === 'approved_wait' || r._p === 'using_wait') {
                    var sp2 = r.timeSlot.split('-');
                    var sM2 = timeToMinutes(sp2[0]);
                    var nowM2 = now.getHours() * 60 + now.getMinutes();
                    if (r.date === today && nowM2 >= sM2 && nowM2 < sM2 + 15) {
                        actionsHtml = '<button class="rc-btn checkin" onclick="stuCheckin(\'' + r.id +
                        '\')">签到</button>';
                    }
                    actionsHtml += ' <button class="rc-cancel" onclick="stuCancelReserve(\'' + r.id +
                        '\')">取消</button>';
                } else if (r._p === 'using') {
                    actionsHtml = '<button class="rc-btn release" onclick="stuRelease(\'' + r.id +
                        '\')">提前释放</button>';
                }

                div.innerHTML += extraHtml + bodyHtml +
                    '<div class="rc-footer"><span class="rc-location">📍 ' + r.location + '</span><div class="rc-actions">' +
                    actionsHtml + '</div></div>';
                box.appendChild(div);
            });

            box.classList.add('open');

            if (reserveCountdownTimer) { clearInterval(reserveCountdownTimer); }
            reserveCountdownTimer = setInterval(function() {
                if (currentActivePanel === 'reserve' && document.getElementById('homeContentBox').classList
                    .contains('open')) {
                    var remainEls = document.querySelectorAll('#homeContentBox .remain-time');
                    if (remainEls.length === 0) {
                        renderContentReserve();
                        return;
                    }
                    var now2 = new Date();
                    var needRefresh = false;
                    remainEls.forEach(function(el) {
                        var rem = parseInt(el.dataset.remain) || 0;
                        if (rem > 0) {
                            rem = Math.max(0, rem - 1);
                            el.dataset.remain = rem;
                            var hrs2 = Math.floor(rem / 3600);
                            var mins2 = Math.floor((rem % 3600) / 60);
                            var secs2 = rem % 60;
                            el.textContent = (hrs2 > 0 ? hrs2 + '时' : '') + mins2 + '分' + pad(secs2) +
                            '秒';
                            if (rem <= 0) { needRefresh = true; }
                        } else { needRefresh = true; }
                    });
                    if (needRefresh) { renderContentReserve(); }
                } else {
                    if (reserveCountdownTimer) { clearInterval(reserveCountdownTimer);
                        reserveCountdownTimer = null; }
                }
            }, 1000);
        }

        function stuCheckin(id) {
            var rs = getReservations();
            var r = rs.find(function(x) { return x.id === id });
            if (r) {
                r.status = 'using';
                r.statusText = '使用中';
                r.checkinTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
            }
            renderContentReserve();
            showNotice('签到成功，开始使用工位', '提示');
        }

        function stuRelease(id) {
            showModal('提前释放', '确认提前结束使用？将立即断电并释放工位。', '确认释放', 'danger', function(ok) {
                if (!ok) return;
                var rs = getReservations();
                var r = rs.find(function(x) { return x.id === id });
                if (r) {
                    r.status = 'completed';
                    r.statusText = '已结束';
                    r.checkoutTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
                    memoryReservations.push(r);
                }
                updateReserveCount();
                renderContentReserve();
                showNotice('已提前释放工位', '提示');
            });
        }

        function stuCancelReserve(id) {
            showModal('取消预约', '确认取消该预约？', '确认取消', 'danger', function(ok) {
                if (!ok) return;
                var rs = getReservations();
                var r = rs.find(function(x) { return x.id === id });
                if (r) {
                    r.status = 'cancelled';
                    r.statusText = '已取消';
                }
                var idx = pendingReserveApprovals.findIndex(function(item) {
                    return item.stationName === r.stationName && item.date === r.date && item.timeSlot === r
                        .timeSlot;
                });
                if (idx > -1) pendingReserveApprovals.splice(idx, 1);
                renderContentReserve();
                updateApprovalCount();
                showNotice('已取消预约', '提示');
            });
        }

        function updateReserveCount() {
            var rs = getReservations();
            var myId = '20230101';
            var myRs = rs.filter(function(r) { return r.studentId === myId });
            var now = new Date();
            var today = formatDateDisplay(now);
            var nMins = now.getHours() * 60 + now.getMinutes();
            var count = 0;
            myRs.forEach(function(r) {
                if (r.status === 'cancelled' || r.status === 'rejected' || r.status === 'completed' || r
                    .status === 'timeout' || r.status === 'pending_review') return;
                if (r.status === 'approved') {
                    var sp = r.timeSlot.split('-');
                    var eM = timeToMinutes(sp[1]);
                    if (r.date < today) return;
                    if (r.date === today && nMins >= eM) return;
                    count++;
                } else if (r.status === 'using') {
                    var sp2 = r.timeSlot.split('-');
                    var eM2 = timeToMinutes(sp2[1]);
                    if (r.date < today) return;
                    if (r.date === today && nMins >= eM2) return;
                    count++;
                }
            });
            document.getElementById('reserveCountNum').textContent = count;
        }

        function updateApprovalCount() {
            document.getElementById('pendingCount').textContent = pendingApprovals.length + pendingReserveApprovals.length;
        }

        function toggleHomePanel(type) {
            if (currentActivePanel === type) {
                document.getElementById('homeContentBox').classList.remove('open');
                document.querySelectorAll('.stat-wrap').forEach(function(w) { w.classList.remove('open') });
                if (reserveCountdownTimer) { clearInterval(reserveCountdownTimer);
                    reserveCountdownTimer = null; }
                currentActivePanel = '';
                return;
            }
            document.querySelectorAll('.stat-wrap').forEach(function(w) { w.classList.remove('open') });
            var wrapMap = { pickup: 'statPickupWrap', return: 'statReturnWrap', approval: 'statApprovalWrap',
                reserve: 'statReserveWrap' };
            document.getElementById(wrapMap[type]).classList.add('open');
            var renderMap = { pickup: renderContentPickup, return: renderContentReturn, approval: renderContentApproval,
                reserve: renderContentReserve };
            if (type === 'reserve') updateReserveCount();
            renderMap[type]();
            currentActivePanel = type;
        }

        function cancelApproval(index) {
            if (index >= 0 && index < pendingApprovals.length) {
                var item = pendingApprovals[index];
                pendingApprovals.splice(index, 1);
                updateApprovalCount();
                if (currentActivePanel === 'approval') renderContentApproval();
                showNotice('已撤销对"' + item.devName + '"的借用申请', '撤销成功');
            }
        }

        function cancelReserveApproval(orderNo) {
            var idx = pendingReserveApprovals.findIndex(function(item) { return item.orderNo === orderNo; });
            if (idx > -1) {
                var item = pendingReserveApprovals[idx];
                pendingReserveApprovals.splice(idx, 1);
                updateApprovalCount();
                if (currentActivePanel === 'approval') renderContentApproval();
                showNotice('已撤销对"' + item.stationName + '"的工位预约', '撤销成功');
            }
        }

        // ==================== 弹窗 ====================
        var modalCb = null;

        function showModal(title, content, btnText, cls, cb) {
            document.getElementById('confirmTitle').textContent = title;
            document.getElementById('confirmContent').textContent = content;
            var btn = document.getElementById('confirmBtn');
            btn.textContent = btnText || '确认';
            btn.className = 'btn ' + (cls || 'danger');
            document.getElementById('confirmModal').style.display = 'flex';
            modalCb = cb;
        }

        // ==================== 原有功能函数 ====================
        function renderMessages() {
            var wrap = document.getElementById('msgListWrap');
            wrap.innerHTML = '';
            if (messages.length === 0) { wrap.innerHTML = '<div class="card"><p style="color:var(--muted);text-align:center;">暂无消息</p></div>'; } else {
                var unread = messages.filter(function(m) { return !m.read }).length;
                document.getElementById('msgBadge').textContent = unread;
                messages.slice().sort(function(a, b) { return parsePrototypeDate(b.time) - parsePrototypeDate(a.time) }).forEach(function(
                    msg) {
                    var div = document.createElement('div');
                    div.className = 'msg-item' + (msg.read ? ' read' : '');
                    div.innerHTML = '<div class="msg-title">' + (msg.read ? '' : '<span class="dot"></span>') +
                        msg.title + '</div><div class="msg-preview">' + msg.content.slice(0, 30) + (msg.content
                            .length > 30 ? '...' : '') + '</div><div class="msg-time">' + msg.time + '</div>';
                    div.onclick = function() {
                        if (!msg.read) { msg.read = true;
                            renderMessages(); }
                        document.getElementById('msgDetailTitle').textContent = msg.title;
                        document.getElementById('msgDetailContent').textContent = msg.content;
                        document.getElementById('msgDetailModal').classList.add('show');
                    };
                    wrap.appendChild(div);
                });
            }
        }

        function renderNotices() {
            var wrap = document.getElementById('noticeListWrap');
            wrap.innerHTML = '';
            systemNotices.forEach(function(n) {
                var div = document.createElement('div');
                div.className = 'notice-item';
                div.innerHTML = '<div class="notice-title">' + n.title + '</div><div class="notice-time">' + n
                    .time + '</div><div class="notice-content">' + n.content + '</div>';
                wrap.appendChild(div);
            });
        }

        function startCarousel() {
            var track = document.getElementById('carouselTrack'),
                dots = document.querySelectorAll('#carouselDots span');
            if (!track) return;
            carouselInterval = setInterval(function() {
                carouselIndex = (carouselIndex + 1) % 3;
                track.style.transform = 'translateX(-' + carouselIndex * 100 + '%)';
                dots.forEach(function(d, i) { d.classList.toggle('active', i === carouselIndex) });
            }, 3500);
        }

        function renderPickupList() {
            var w = document.getElementById('pickupListWrap');
            w.innerHTML = '';
            if (pickupDevices.length === 0) { w.innerHTML = '<div class="card"><p style="color:var(--muted);text-align:center;">暂无待领取设备</p></div>'; return; }
            pickupDevices.forEach(function(d) {
                var a = document.createElement('article');
                a.className = 'card';
                var pickupInfo = d.pickupAvailableTime ? '可领取时间：' + d.pickupAvailableTime : '可立即领取';
                var accessCode = generateFourDigitCode('领取', d.name, d.cabNo);
                a.innerHTML = '<div class="row"><h3>' + d.name + '</h3><span class="access-code">' + accessCode +
                    '</span></div><p>型号：' + d.model + '<br>' + d.codeType + '：' + d.code + '<br>设备位置：' + d.pos +
                    '<br>' + pickupInfo + '</p>';
                w.appendChild(a)
            });
            document.getElementById('pickupCount').textContent = pickupDevices.length;
        }

        function renderFaultList() {
            var w = document.getElementById('faultListWrap');
            w.innerHTML = '';
            if (faultList.length === 0) { w.innerHTML = '<div class="card"><p style="color:var(--muted);text-align:center;">暂无异常工单</p></div>'; return; }
            faultList.forEach(function(item) {
                var a = document.createElement('article');
                a.className = 'card';
                var sc = item.status === '处理中' ? 'orange' : item.status === '已解决' ? 'green' : 'red';
                a.innerHTML = '<div class="row"><h3>' + item.title + '</h3><span class="type ' + sc + '">' + item
                    .status + '</span></div><p>异常类型：' + item.type + ' · 提交时间：' + item.time + '</p>';
                w.appendChild(a);
            });
        }

        function setOrderFilter(filter) {
            currentOrderFilter = filter;
            document.querySelectorAll('.order-filter-tabs .filter-tab').forEach(function(el) { el.classList.toggle(
                    'active', el.dataset.filter === filter); });
            renderOrderList();
        }

        function renderOrderDateHighlights(allOrders) {
            var wrap = document.getElementById('orderDateHighlights');
            if (!wrap) return;
            var dates = [];
            allOrders.forEach(function(item) {
                var d = String(item.date || '').slice(0, 10);
                if (/^\d{4}-\d{2}-\d{2}$/.test(d) && dates.indexOf(d) < 0) dates.push(d);
            });
            dates.sort(function(a, b) { return parsePrototypeDate(b) - parsePrototypeDate(a); });
            wrap.innerHTML = '';
            if (!dates.length) return;
            var selected = document.getElementById('orderDate').value;
            var label = document.createElement('span');
            label.className = 'order-date-label';
            label.textContent = '有记录日期';
            wrap.appendChild(label);
            dates.forEach(function(date) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'order-date-chip' + (selected === date ? ' active' : '');
                btn.textContent = date;
                btn.setAttribute('data-date', date);
                btn.onclick = function() {
                    document.getElementById('orderDate').value = date;
                    renderOrderList();
                };
                wrap.appendChild(btn);
            });
        }

        function renderOrderList() {
            var w = document.getElementById('orderListWrap');
            var kw = document.getElementById('orderKeyword').value.toLowerCase().trim();
            var dt = document.getElementById('orderDate').value;
            var allOrders = [];
            deviceOrderData.forEach(function(item) { allOrders.push({ ...item }) });
            var reserveOrders = getReservationOrders();
            reserveOrders.forEach(function(item) { allOrders.push({ ...item }) });
            renderOrderDateHighlights(allOrders);
            var list = allOrders.filter(function(item) {
                var matchFilter = currentOrderFilter === 'all' || item.type === currentOrderFilter;
                var matchKw = !kw || item.orderNo.toLowerCase().includes(kw) || item.dev.toLowerCase().includes(
                    kw) || item.model.toLowerCase().includes(kw) || item.code.toLowerCase().includes(kw);
                var matchDt = !dt || item.date.startsWith(dt);
                return matchFilter && matchKw && matchDt;
            });
            list.sort(function(a, b) { return parsePrototypeDate(b.date) - parsePrototypeDate(a.date) });
            w.innerHTML = "";
            if (list.length === 0) { w.innerHTML = '<div class="card"><p style="color:var(--muted);text-align:center;">暂无订单记录</p></div>'; return; }
            list.forEach(function(ord) {
                var c = document.createElement('div');
                c.className = 'order-card';
                var statusColorMap = { '待领取': '#4f46e5', '待归还': '#f59e0b', '已归还': '#16a34a', '已完成': '#16a34a',
                    '已释放': '#16a34a', '审批中': '#8b5cf6', '已预约': '#8b5cf6', '异常': '#dc2626', '已取消': '#dc2626',
                    '已驳回': '#dc2626', '已超时': '#94a3b8', '已通过': '#16826c', '使用中': '#16a34a', '审核中': '#2563eb',
                    '已结束': '#16a34a'
                };
                var sc = statusColorMap[ord.status] || '#4f46e5';
                var typeLabel = ord.type === 'reserve' ? '工位预约' : '设备借还';
                var extraInfo = '';
                if (ord.type === 'reserve' && ord.timeSlot) extraInfo = '<br>时段：' + ord.timeSlot;
                if (ord.type === 'reserve' && ord.checkinTime) extraInfo += ' · 签到：' + ord.checkinTime;
                var returnInfo = '';
                if (ord.status === '已归还' && ord.expectedReturn && ord.actualReturn) returnInfo =
                    '<br>预计归还：' + ord.expectedReturn + '<br>实际归还：' + ord.actualReturn;
                else if (ord.expectedReturn && ord.status !== '已归还' && ord.status !== '已驳回' && ord.status !==
                    '已超时' && ord.status !== '已结束') returnInfo = '<br>预计归还：' + ord.expectedReturn;
                if (ord.returnTime && ord.status === '已归还') returnInfo = '<br>归还/完成时间：' + ord.returnTime;
                if (ord.type === 'reserve' && ord.status === '审核中') returnInfo = '<br>等待管理员审批...';
                if (ord.type === 'reserve' && ord.status === '已驳回' && ord.rejectReason) returnInfo =
                    '<br>驳回原因：' + ord.rejectReason;
                c.innerHTML = '<div class="row"><h3>' + ord.dev + '</h3><span class="type" style="color:' + sc +
                    ';background:' + sc + '33">' + ord.status + '</span></div><p>订单号：' + ord.orderNo +
                    '<br>' + typeLabel + ' · ' + ord.model + '<br>' + ord.codeType + '：' + ord.code +
                    '<br>柜机/位置：' + ord.cab + '<br>创建时间：' + ord.date + extraInfo + returnInfo + '</p>';
                w.appendChild(c);
            });
        }

        function getReservationOrders() {
            var rs = getReservations();
            var myId = '20230101';
            return rs.filter(function(r) { return r.studentId === myId }).map(function(r) {
                var statusMap = { 'reserved': '已预约', 'pending_checkin': '已通过', 'using': '使用中',
                    'completed': '已结束', 'cancelled': '已取消', 'rejected': '已驳回', 'timeout': '已超时',
                    'pending_review': '审核中', 'approved': '已通过'
                };
                return {
                    orderNo: 'R' + r.id.replace('r', ''),
                    dev: r.stationName,
                    model: r.purpose || '工位预约',
                    codeType: '工位',
                    code: r.stationId,
                    cab: r.location,
                    status: statusMap[r.status] || r.status,
                    date: r.date,
                    returnTime: r.checkoutTime || '',
                    type: 'reserve',
                    timeSlot: r.timeSlot,
                    checkinTime: r.checkinTime || '',
                    rejectReason: r.rejectReason || ''
                };
            });
        }

        // ==================== 异常上报相关 ====================
        var faultSubTypes = { device: ['设备损坏', '设备缺失', '放错柜位'], cabinet: ['柜机离线', '柜门异常', '扫码异常'] };
        var currentFaultMainType = 'device';

        function renderFaultSubTypes() {
            var container = document.getElementById('faultSubTypeSelector');
            var types = faultSubTypes[currentFaultMainType] || [];
            container.innerHTML = '';
            types.forEach(function(t, idx) {
                var div = document.createElement('div');
                div.className = 'choice' + (idx === 0 ? ' on' : '');
                div.dataset.subtype = t;
                div.textContent = t;
                div.onclick = function() { container.querySelectorAll('.choice').forEach(function(el) { el
                        .classList.remove('on') });
                    this.classList.add('on'); };
                container.appendChild(div);
            });
        }

        function switchFaultType(type) {
            currentFaultMainType = type;
            document.querySelectorAll('#faultTypeSelector .choice').forEach(function(el) { el.classList.remove('on') });
            document.querySelector('#faultTypeSelector .choice[data-type="' + type + '"]').classList.add('on');
            if (type === 'device') { document.getElementById('faultTargetWrap').style.display = 'block';
                document.getElementById('faultCabinetWrap').style.display = 'none';
                document.getElementById('faultTargetLabel').textContent = '选择设备'; } else { document.getElementById(
                    'faultTargetWrap').style.display = 'none';
                document.getElementById('faultCabinetWrap').style.display = 'block'; }
            renderFaultSubTypes();
        }

        function onFaultCabinetChange() {}

        function handleUpload() {
            var input = document.getElementById('faultFileInput');
            var files = Array.from(input.files);
            files.forEach(function(f) {
                var r = new FileReader();
                r.onload = function(e) { uploadFiles.push({ name: f.name, src: e.target.result });
                    renderUploadPreview() };
                r.readAsDataURL(f)
            });
            input.value = "";
        }

        function renderUploadPreview() {
            var w = document.getElementById('uploadPreviewWrap');
            w.innerHTML = "";
            uploadFiles.forEach(function(item, idx) {
                var d = document.createElement('div');
                d.className = 'upload-preview-item';
                d.innerHTML = '<button class="upload-preview-del" onclick="delUpload(' + idx +
                    ')">×</button><img class="upload-preview-img" src="' + item.src +
                    '"><div class="upload-name">' + item.name + '</div>';
                w.appendChild(d)
            });
        }

        function delUpload(index) { uploadFiles.splice(index, 1);
            renderUploadPreview(); }

        function submitFault() {
            var isDevice = document.querySelector('#faultTypeSelector .choice.on').dataset.type === 'device';
            var target = isDevice ? document.getElementById('faultTargetSelect').value : document.getElementById(
                'faultCabinetSelect').value + ' - ' + document.getElementById('faultSlotSelect').value;
            var type = isDevice ? '设备异常' : '柜机异常';
            var subTypeEl = document.querySelector('#faultSubTypeSelector .choice.on');
            var subType = subTypeEl ? subTypeEl.textContent : '未分类';
            var desc = document.getElementById('faultDesc').value.trim();
            if (!desc) { showNotice('请填写异常详细描述', '提交提示'); return; }
            var now = new Date();
            var ts = formatDateDisplay(now) + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
            faultList.push({ title: target, type: type + ' - ' + subType, status: "处理中", time: ts });
            uploadFiles = [];
            renderUploadPreview();
            document.getElementById('faultDesc').value = "";
            if (currentActivePanel === 'fault') renderContentFault();
            showNotice('异常工单已提交', '提交成功');
            show('faultDetail');
        }

        // ==================== 修改密码 ====================
        function changePassword() {
            var oldPwd = document.getElementById('changePwdOld').value;
            var newPwd = document.getElementById('changePwdNew').value;
            var confirmPwd = document.getElementById('changePwdConfirm').value;
            if (!oldPwd) { showNotice('请输入原密码', '修改密码'); return; }
            if (oldPwd !== '123456') { showNotice('原密码错误，请重新输入', '修改密码'); return; }
            if (newPwd.length < 6) { showNotice('新密码长度至少6位', '修改密码'); return; }
            if (newPwd !== confirmPwd) { showNotice('两次输入的新密码不一致', '修改密码'); return; }
            showNotice('密码修改成功！', '修改成功');
            show('profile');
        }

        function getResetSms() {
            var p = document.getElementById('resetPhone').value.trim();
            if (!/^1[3-9]\d{9}$/.test(p)) { showNotice('请输入正确11位手机号', '校验失败'); return; }
            if (resetSmsCountdown > 0) return;
            showNotice('验证码已发送（演示）', '发送成功');
            resetSmsCountdown = 60;
            var btn = document.getElementById('resetCodeBtn');
            btn.disabled = true;
            resetSmsTimer = setInterval(function() {
                resetSmsCountdown--;
                btn.textContent = resetSmsCountdown + 's后重发';
                if (resetSmsCountdown <= 0) { clearInterval(resetSmsTimer);
                    btn.textContent = '获取验证码';
                    btn.disabled = false; }
            }, 1000);
        }

        function resetPasswordBySms() {
            var phone = document.getElementById('resetPhone').value.trim();
            var code = document.getElementById('resetCode').value.trim();
            var newPwd = document.getElementById('resetNewPwd').value;
            if (!/^1[3-9]\d{9}$/.test(phone)) { showNotice('请输入正确手机号', '重置密码'); return; }
            if (!/^\d{6}$/.test(code)) { showNotice('请输入6位验证码', '重置密码'); return; }
            if (newPwd.length < 6) { showNotice('新密码长度至少6位', '重置密码'); return; }
            showNotice('密码已通过验证码重置成功！', '重置成功');
            show('profile');
        }

        // ==================== 设备借用函数 ====================
        function handleRFIDBorrow(devName) { pendingDevice = devName;
            openDeviceDetail(devName, false); }

        function submitBorrow() {
            var devName = pendingDevice;
            var reason = document.getElementById('borrowReason').value.trim();
            var devInfo = Object.values(deviceAllData).flat().find(function(d) { return d.name === devName });
            if (!devInfo) { showNotice('设备信息不存在', '错误'); return; }
            var cabs = deviceCabinetMap[devName] || [];
            if (cabs.length === 0) { showNotice('该设备暂无可用柜体', '错误'); return; }
            var cab = cabs[0];
            var timeInfo = window._borrowTimeInfo || { start: new Date(), end: new Date(Date.now() + 3600000),
                duration: 1, devName: devName };
            var startDate = timeInfo.start;
            var endDate = timeInfo.end;
            var expectedStr = endDate.getFullYear() + '-' + pad(endDate.getMonth() + 1) + '-' + pad(endDate.getDate()) +
                '-' + pad(endDate.getHours()) + ':' + pad(endDate.getMinutes());
            if (deviceStock[devName]) deviceStock[devName].available -= 1;
            var orderNo = generateOrderNo();
            var now = new Date();
            var dateStr = formatDateDisplay(now) + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
            if (AUTO_APPROVAL_DEVICES.includes(devName)) {
                var isRFID = devInfo.codeType === 'RFID码';
                pickupDevices.push({ name: devName, model: devInfo.model, codeType: devInfo.codeType, code: devInfo
                        .code, cab: cab.cabName, cabNo: cab.cabNo, pos: cab.pos, pickupAvailableTime: '审批通过后可立即领取',
                    isRFID: isRFID });
                renderPickupList();
                if (currentActivePanel === 'pickup') renderContentPickup();
                messages.push({ id: Date.now(), type: '审批通过', title: '设备借用审批通过', content: '您借用的"' + devName +
                        '"已通过审批，请前往待领取页面查看。', time: new Date().toLocaleString(), read: false });
                showNotice(devName + ' 借用申请已自动审批通过，已生成取件码！', '申请成功');
                show('pickup');
            } else {
                pendingApprovals.push({ orderNo: orderNo, devName: devName, model: devInfo.model, codeType: devInfo
                        .codeType, code: devInfo.code, cab: cab.cabName, cabNo: cab.cabNo, pos: cab.pos,
                    applyTime: dateStr, status: '待审批', reason: reason, expectedReturn: expectedStr,
                    startTime: formatDateDisplay(startDate) + ' ' + formatHourDisplay(startDate),
                    endTime: formatDateDisplay(endDate) + ' ' + formatHourDisplay(endDate) });
                updateApprovalCount();
                if (currentActivePanel === 'approval') renderContentApproval();
                showNotice('借用申请已提交，等待管理员审批。', '申请提交');
                if (_fromHome) {
                    show('home');
                } else {
                    show('devices');
                }
            }
            window._borrowTimeInfo = null;
        }

        function borrow(name) {
            pendingDevice = name;
            var devInfo = Object.values(deviceAllData).flat().find(function(d) { return d.name === name });
            if (!devInfo) { showNotice('设备信息不存在', '错误'); return; }
            openDeviceDetail(name, true);
        }

        // ==================== 导航等函数 ====================
        function logout() {
            showModal('退出登录', '确定要退出当前账号吗？退出后需要重新登录。', '确认退出', 'danger', function(ok) {
                if (!ok) return;
                wechatAuthSuccess = false;
                loginStep = 1;
                loginMaxStep = 1;
                showNotice('已退出登录', '提示');
                setTimeout(function() { show('login') }, 1200);
            });
        }

        function wechatLogin() {
            showNotice('正在跳转微信授权...', '微信授权');
            setTimeout(function() {
                wechatAuthSuccess = true;
                document.getElementById('wechatAuthBtn').innerHTML = '✅ 已完成微信授权';
                document.getElementById('loginNext1').disabled = false;
                showNotice('微信授权成功，请进入下一步', '授权完成');
            }, 1200);
        }

        function getSmsCode() {
            var p = document.getElementById('loginPhone').value.trim();
            if (!/^1[3-9]\d{9}$/.test(p)) { showNotice('请输入正确11位手机号', '校验失败'); return; }
            if (smsCountdown > 0) return;
            showNotice('验证码已发送（演示）', '发送成功');
            smsCountdown = 60;
            var btn = document.getElementById('getCodeBtn');
            btn.disabled = true;
            smsTimer = setInterval(function() {
                smsCountdown--;
                btn.textContent = smsCountdown + 's后重发';
                if (smsCountdown <= 0) { clearInterval(smsTimer);
                    btn.textContent = '获取验证码';
                    btn.disabled = false; }
            }, 1000);
            setTimeout(function() { document.getElementById('loginNext2').disabled = false; }, 500);
        }

        function phoneLogin() {
            if (!wechatAuthSuccess) { showNotice('请先完成微信授权', '登录校验'); return; }
            var p = document.getElementById('loginPhone').value.trim();
            var c = document.getElementById('loginCode').value.trim();
            var pwd = document.getElementById('loginPassword').value;
            var pwdConfirm = document.getElementById('loginPasswordConfirm').value;
            if (!/^1[3-9]\d{9}$/.test(p) || !/^\d{6}$/.test(c)) { showNotice('手机号或验证码格式错误', '登录校验'); return; }
            if (pwd.length < 6) { showNotice('密码长度至少6位', '登录校验'); return; }
            if (pwd !== pwdConfirm) { showNotice('两次输入的密码不一致', '登录校验'); return; }
            showNotice('双重校验登录成功', '登录完成');
            loginStep = 1;
            loginMaxStep = 1;
            document.getElementById('loginPage1').style.display = 'block';
            document.getElementById('loginPage2').style.display = 'none';
            document.getElementById('loginPage3').style.display = 'none';
            document.querySelectorAll('#loginSteps .step-dot').forEach(function(el) { el.classList.remove('active',
                    'done') });
            document.getElementById('loginStep1').classList.add('active');
            setTimeout(function() { show('home') }, 1000);
        }

        function initCateClick() {
            document.querySelectorAll('.cate-item').forEach(function(item) {
                item.onclick = function() {
                    document.querySelectorAll('.cate-item').forEach(function(i) { i.classList.remove(
                        'active') });
                    item.classList.add('active');
                    currentCate = item.dataset.cate;
                    renderDeviceList()
                }
            })
        }

        function renderDeviceList() {
            var wrap = document.getElementById('deviceListWrap');
            wrap.innerHTML = "";
            deviceAllData[currentCate].forEach(function(dev) {
                var div = document.createElement('div');
                div.className = 'device-item-card';
                div.dataset.dev = dev.name;
                div.innerHTML = '<div class="device-item-name">' + dev.name + '</div>';
                div.onclick = function() { openDeviceDetail(dev.name, false) };
                wrap.appendChild(div)
            });
        }

        function filterDeviceList() {
            var key = document.getElementById('deviceSearchInput').value.trim().toLowerCase();
            var wrap = document.getElementById('deviceListWrap');
            if (!key) { renderDeviceList(); return; }
            var matches = [];
            Object.keys(deviceAllData).forEach(function(cate) {
                (deviceAllData[cate] || []).forEach(function(dev) {
                    var haystack = [dev.name, dev.model, dev.code].join(' ').toLowerCase();
                    if (haystack.includes(key)) matches.push(dev);
                });
            });
            wrap.innerHTML = '';
            if (!matches.length) { wrap.innerHTML = '<div class="resource-empty">未找到匹配的设备</div>'; return; }
            matches.forEach(function(dev) {
                var div = document.createElement('div');
                div.className = 'device-item-card';
                div.dataset.dev = dev.name;
                div.dataset.model = dev.model || '';
                div.dataset.code = dev.code || '';
                div.innerHTML = '<div class="device-item-name">' + dev.name + '</div>';
                div.onclick = function() { openDeviceDetail(dev.name, false); };
                wrap.appendChild(div);
            });
        }

        // ==================== 资源中心（复用设备借用页布局） ====================
        function onResourceCateClick(el, cate) {
            document.querySelectorAll('#resourceCateLeft .cate-item').forEach(function(i) { i.classList.remove(
                    'active') });
            el.classList.add('active');
            currentResourceCate = cate;
            // 清空搜索框，避免分类切换与搜索内容冲突
            document.getElementById('resourceSearchInput').value = '';
            renderResourceList();
        }

        function renderResourceList() {
            var wrap = document.getElementById('resourceListWrap');
            wrap.innerHTML = '';
            var list = deviceAllData[currentResourceCate] || [];
            if (list.length === 0) {
                wrap.innerHTML = '<div class="resource-empty">该分类暂无设备</div>';
                return;
            }
            list.forEach(function(dev) {
                var div = document.createElement('div');
                div.className = 'device-item-card';
                div.dataset.dev = dev.name;
                div.dataset.model = dev.model || '';
                div.dataset.code = dev.code || '';
                div.innerHTML = '<div class="device-item-name">' + dev.name + '</div>';
                div.onclick = function() { openResource(dev.name); };
                wrap.appendChild(div);
            });
        }

        function filterResourceList() {
            var kw = document.getElementById('resourceSearchInput').value.trim().toLowerCase();
            var wrap = document.getElementById('resourceListWrap');
            if (!kw) {
                // 无搜索词：显示当前分类
                renderResourceList();
                return;
            }
            // 有搜索词：跨分类模糊匹配（名称 / 型号 / 标签码或RFID码）
            var all = [];
            Object.values(deviceAllData).flat().forEach(function(d) {
                var nameMatch = (d.name || '').toLowerCase().includes(kw);
                var modelMatch = (d.model || '').toLowerCase().includes(kw);
                var codeMatch = (d.code || '').toLowerCase().includes(kw);
                if (nameMatch || modelMatch || codeMatch) all.push(d);
            });
            wrap.innerHTML = '';
            if (all.length === 0) {
                wrap.innerHTML = '<div class="resource-empty">未找到匹配的设备</div>';
                return;
            }
            all.forEach(function(dev) {
                var div = document.createElement('div');
                div.className = 'device-item-card';
                div.dataset.dev = dev.name;
                div.innerHTML = '<div class="device-item-name">' + dev.name + '</div>';
                div.onclick = function() { openResource(dev.name); };
                wrap.appendChild(div);
            });
        }

        function renderSafetyExamList() {
            var w = document.getElementById('safetyExamWrap');
            w.innerHTML = "";
            var sc = document.createElement('article');
            sc.className = 'card';
            sc.dataset.keyword = '系统使用考试';
            var ss = systemDone ? '已完成' : '未完成';
            sc.innerHTML = '<div class="row"><h3>系统使用考试</h3><span class="type">' + ss +
                '</span></div><p>首次使用本软件前需完成一次</p><button class="btn"' + (systemDone ? ' disabled' : '') +
                ' onclick="startSystemExam()">开始考试</button>';
            w.appendChild(sc);
            rfidDeviceList.forEach(function(dev) {
                var c = document.createElement('article');
                c.className = 'card';
                c.dataset.keyword = dev + ' RFID';
                var done = !!rfidExamStatusMap[dev];
                c.innerHTML = '<div class="row"><h3>' + dev +
                    ' RFID安全考试</h3><span class="type">' + (done ? '已完成' : '未完成') +
                    '</span></div><p>使用前需完成RFID安全考核</p><button class="btn"' + (done ? ' disabled' : '') +
                    ' onclick="openRFIDExamFromSafety(\'' + dev + '\')">开始答题</button>';
                w.appendChild(c)
            });
            safetyExamList.forEach(function(item) {
                var c = document.createElement('article');
                c.className = 'card';
                c.dataset.keyword = item.dev + ' 安全试卷';
                var done = !!safetyExamStatusMap[item.dev];
                c.innerHTML = '<div class="row"><h3>' + item.dev +
                    '安全试卷</h3><span class="type">' + (done ? '已完成' : '未完成') +
                    '</span></div><p>设备借用前需完成安全考核</p><button class="btn"' + (done ? ' disabled' : '') +
                    ' onclick="openExamPageFromSafety(\'' + item.dev + '\')">开始答题</button>';
                w.appendChild(c)
            });
        }

        function filterSafetyExam() {
            var kw = document.getElementById('safetyExamSearch').value.trim().toLowerCase();
            document.querySelectorAll('#safetyExamWrap .card').forEach(function(c) {
                var t = c.dataset.keyword ? c.dataset.keyword.toLowerCase() : c.textContent.toLowerCase();
                c.classList.toggle('hidden', !t.includes(kw))
            });
        }

        function openExamPageFromSafety(dev) { pendingDevice = dev;
            document.getElementById('examDevTitle').textContent = dev + "安全试卷";
            isFromBorrowFlow = false;
            isFromSafetyPage = true;
            refreshExamAttemptBar('deviceExamAttemptBar', getExamKey('device', dev));
            show('deviceExam'); }

        function openRFIDExamFromSafety(dev) {
            pendingDevice = dev;
            isFromBorrowFlow = false;
            isFromSafetyPage = true;
            var cfg = rfidExamConfig[dev];
            if (cfg) {
                document.getElementById('rfidExamTitle').textContent = cfg.title;
                document.getElementById('rfidQ1').innerHTML = '<p>' + cfg.q1 +
                    '</p><label class="check"><input type="radio" name="r1" value="a">' + cfg.q1_opts.a +
                    '</label><label class="check"><input type="radio" name="r1" value="b">' + cfg.q1_opts.b +
                    '</label>';
                document.getElementById('rfidQ2').innerHTML = '<p>' + cfg.q2 +
                    '</p><label class="check"><input type="checkbox" name="r2" value="a">' + cfg.q2_opts.a +
                    '</label><label class="check"><input type="checkbox" name="r2" value="b">' + cfg.q2_opts.b +
                    '</label>' + (cfg.q2_opts.c ? '<label class="check"><input type="checkbox" name="r2" value="c">' +
                        cfg.q2_opts.c + '</label>' : '') + '</div>';
                document.getElementById('rfidQ3').innerHTML = '<p>' + cfg.q3 +
                    '</p><label class="check"><input type="radio" name="r3" value="true">正确</label><label class="check"><input type="radio" name="r3" value="false">错误</label>'
            }
            refreshExamAttemptBar('rfidExamAttemptBar', getExamKey('rfid', dev));
            show('rfidExam');
        }

        function openExamPage(dev) { pendingDevice = dev;
            document.getElementById('examDevTitle').textContent = dev + "安全试卷";
            isFromBorrowFlow = true;
            isFromSafetyPage = false;
            refreshExamAttemptBar('deviceExamAttemptBar', getExamKey('device', dev));
            show('deviceExam'); }

        function openRFIDExam(dev) {
            pendingDevice = dev;
            isFromBorrowFlow = true;
            isFromSafetyPage = false;
            var cfg = rfidExamConfig[dev];
            if (cfg) {
                document.getElementById('rfidExamTitle').textContent = cfg.title;
                document.getElementById('rfidQ1').innerHTML = '<p>' + cfg.q1 +
                    '</p><label class="check"><input type="radio" name="r1" value="a">' + cfg.q1_opts.a +
                    '</label><label class="check"><input type="radio" name="r1" value="b">' + cfg.q1_opts.b +
                    '</label>';
                document.getElementById('rfidQ2').innerHTML = '<p>' + cfg.q2 +
                    '</p><label class="check"><input type="checkbox" name="r2" value="a">' + cfg.q2_opts.a +
                    '</label><label class="check"><input type="checkbox" name="r2" value="b">' + cfg.q2_opts.b +
                    '</label>' + (cfg.q2_opts.c ? '<label class="check"><input type="checkbox" name="r2" value="c">' +
                        cfg.q2_opts.c + '</label>' : '') + '</div>';
                document.getElementById('rfidQ3').innerHTML = '<p>' + cfg.q3 +
                    '</p><label class="check"><input type="radio" name="r3" value="true">正确</label><label class="check"><input type="radio" name="r3" value="false">错误</label>'
            }
            refreshExamAttemptBar('rfidExamAttemptBar', getExamKey('rfid', dev));
            show('rfidExam');
        }

        function openCabMap(cabName, cabNo, pos) {
            document.getElementById('mapTitle').textContent = cabName + " 位置指引";
            document.getElementById('mapMeta').textContent = '柜机编号：' + cabNo + '\n安装位置：' + pos;
            document.getElementById('mapModal').classList.add('show');
        }

        function closeMap() { document.getElementById('mapModal').classList.remove('show'); }

        function generateFourDigitCode(type, name, cabNo) {
            var seed = (type + name + cabNo).split('').reduce(function(total, char) { return total + char.charCodeAt(0); }, 0);
            return String(seed % 9000 + 1000);
        }

        function refreshOrgCurrentTag() {
            document.querySelectorAll('.org-item').forEach(function(item) {
                var nameWrap = item.querySelector('.org-name'),
                    orgName = item.dataset.org;
                if (orgName === currentOrganization) nameWrap.innerHTML = orgName +
                    ' <span class="org-current-tag">当前</span>';
                else nameWrap.textContent = orgName;
            });
        }

        function show(id, record) {
            if (record === undefined) record = true;
            var sourcePage = current;
            if (record && sourcePage !== id) history.push(sourcePage);
            current = id;
            document.getElementById('title').textContent = titles[id] || '实验室智能柜';
            document.querySelectorAll('.page').forEach(function(p) { p.classList.toggle('active', p.id === id) });
            var tabPages = ['home', 'devices', 'profile', 'reserveStep1'];
            document.querySelector('.header').classList.toggle('has-back', !tabPages.includes(id));
            document.querySelectorAll('.tab').forEach(function(t) { t.classList.toggle('on', t.dataset.page === id) });
            var headerRight = document.getElementById('headerRight');
            headerRight.style.display = (id === 'profile') ? 'flex' : 'none';
            if (id === 'organization') refreshOrgCurrentTag();
            if (id === 'messages') { renderMessages();
                renderNotices(); }
            if (id === 'resources') {
                resourceListSourcePage = sourcePage === 'resources' ? resourceListSourcePage : (sourcePage || 'profile');
                // 资源中心：默认回到第一个分类，清空搜索词
                document.getElementById('resourceSearchInput').value = '';
                currentResourceCate = 'osc';
                document.querySelectorAll('#resourceCateLeft .cate-item').forEach(function(el, idx) {
                    el.classList.toggle('active', idx === 0);
                });
                renderResourceList();
            }
            if (id === 'safety') { renderSafetyExamList();
                document.getElementById('safetyExamSearch').value = "";
                filterSafetyExam(); }
            if (id === 'orderRecords') { document.getElementById('orderKeyword').value = "";
                document.getElementById('orderDate').value = "";
                renderOrderList(); }
            if (id === 'pickup') renderPickupList();
            if (id === 'faultList') renderFaultList();
            if (id === 'home') {
                document.getElementById('pickupCount').textContent = pickupDevices.length;
                updateApprovalCount();
                updateReserveCount();
                if (currentActivePanel) { var renderMap = { pickup: renderContentPickup, return: renderContentReturn,
                        approval: renderContentApproval, reserve: renderContentReserve }; if (renderMap[
                        currentActivePanel]) renderMap[currentActivePanel](); }
            }
            if (id === 'reserveStep1') { initReserve(); }
            if (id === 'faultNew') { renderFaultSubTypes();
                document.getElementById('faultDesc').value = '';
                uploadFiles = [];
                renderUploadPreview(); }
            if (id === 'deviceDetail') { if (pendingDevice) { initTimePicker(pendingDevice); } }
            if (id === 'login') { goLoginStep(loginStep); }
            if (id === 'deviceExam') { refreshExamAttemptBar('deviceExamAttemptBar', getExamKey('device', pendingDevice)); }
            if (id === 'rfidExam') { refreshExamAttemptBar('rfidExamAttemptBar', getExamKey('rfid', pendingDevice || rfidPendingDevice)); }
            if (id === 'systemExam') { refreshExamAttemptBar('systemExamAttemptBar', getExamKey('system')); }
        }

        function back() {
            var prev = history.pop();
            if (!prev && current === 'resources') prev = resourceListSourcePage || 'profile';
            if (!prev && current === 'deviceResource') prev = resourceDetailSourcePage || 'home';
            prev ? show(prev, false) : show('home', false);
        }

        // ==================== 考试相关函数 ====================
        function startSystemExam() { show('systemExam'); }

        function goPrompt() {
            if (promptTarget === 'systemExam') { show('systemExam'); } else if (promptTarget === 'deviceExam') {
                isFromBorrowFlow = true;
                isFromSafetyPage = false;
                openExamPage(pendingDevice); } else if (promptTarget === 'rfidExam') { isFromBorrowFlow = true;
                isFromSafetyPage = false;
                openRFIDExam(rfidPendingDevice || pendingDevice); } else show(promptTarget);
            closeModal();
        }

        function closeModal() { document.getElementById('examPrompt').classList.remove('show'); }

        function finishDeviceExam() {
            var examKey = getExamKey('device', pendingDevice);
            var gate = canTakeExam(examKey);
            if (!gate.allowed) {
                showNotice(gate.message, '考试受限');
                refreshExamAttemptBar('deviceExamAttemptBar', examKey);
                return;
            }

            var q1 = document.querySelector('input[name=q1]:checked'),
                q2 = document.querySelectorAll('input[name=q2]:checked'),
                q3 = document.querySelector('input[name=q3]:checked');
            if (!q1 || !q3) { showNotice('请完成所有题目', '答题提示'); return; }

            var errorMsg = null;
            if (q1.value !== 'b') errorMsg = '第1题答案错误，请重新作答。';
            else if (q3.value !== 'false') errorMsg = '第3题答案错误，请重新作答。';
            else {
                var q2Checked = Array.from(q2).map(function(el) { return el.value });
                if (q2Checked.length !== 2 || !q2Checked.includes('b') || !q2Checked.includes('c')) {
                    errorMsg = '第2题答案错误（应为多选，选"指定柜位"和"设备对应的专用柜位"），请重新作答。';
                }
            }

            if (errorMsg) {
                var result = recordExamResult(examKey, false);
                if (result.cooldown) {
                    showNotice('今日考试次数已用完（3 次失败），已进入 24 小时冷却。', '考试受限');
                } else {
                    showNotice(errorMsg + '（今日剩余 ' + result.remaining + ' 次机会）', '答题提示');
                }
                refreshExamAttemptBar('deviceExamAttemptBar', examKey);
                return;
            }

            recordExamResult(examKey, true);
            safetyExamStatusMap[pendingDevice] = true;
            showNotice('安全考试通过！', '考试完成');
            if (pendingDevice && isFromBorrowFlow) {
                var devName = pendingDevice;
                var devInfo = Object.values(deviceAllData).flat().find(function(d) { return d.name === devName });
                var dt = getPickerDateTime();
                if (devInfo && dt) {
                    document.getElementById('borrowName').textContent = devName + ' · 借用申请';
                    document.getElementById('borrowDevName').textContent = devName;
                    document.getElementById('borrowDevModel').textContent = devInfo.model || '-';
                    var durationHours = dt.hours;
                    var maxHours = deviceStock[devName] ? deviceStock[devName].maxHours : 24;
                    document.getElementById('borrowTimeDisplay').textContent = formatDateDisplay(dt.start) + ' ' +
                        formatHourDisplay(dt.start) + ' → ' + formatDateDisplay(dt.end) + ' ' + formatHourDisplay(
                            dt.end);
                    document.getElementById('borrowDurationDisplay').textContent = Math.round(durationHours * 10) /
                        10 + ' 小时（最长 ' + maxHours + ' 小时）';
                    document.getElementById('borrowReason').value = '';
                    window._borrowTimeInfo = { start: new Date(dt.start), end: new Date(dt.end),
                        duration: durationHours, devName: devName };
                    deviceStartDateTime = dt.start;
                    deviceEndDateTime = dt.end;
                    show('borrow');
                    isFromBorrowFlow = false;
                    isFromSafetyPage = false;
                    return;
                }
            }
            if (isFromSafetyPage) { show('safety');
                isFromSafetyPage = false; return; }
            if (rfidPendingDevice && rfidSourcePage === 'deviceDetail') {
                var d = rfidPendingDevice;
                rfidPendingDevice = '';
                rfidSourcePage = 'home';
                if (d) { pendingDevice = d;
                    openDeviceDetail(d, _fromHome); } else show('deviceDetail');
                isFromBorrowFlow = false;
                isFromSafetyPage = false;
                return;
            }
            show('deviceDetail');
            isFromBorrowFlow = false;
            isFromSafetyPage = false;
        }

        function finishRFIDExam() {
            var devNameForExam = pendingDevice || rfidPendingDevice;
            var examKey = getExamKey('rfid', devNameForExam);
            var gate = canTakeExam(examKey);
            if (!gate.allowed) {
                showNotice(gate.message, '考试受限');
                refreshExamAttemptBar('rfidExamAttemptBar', examKey);
                return;
            }

            var q1 = document.querySelector('input[name=r1]:checked'),
                q2 = document.querySelectorAll('input[name=r2]:checked'),
                q3 = document.querySelector('input[name=r3]:checked');
            if (!q1 || !q3) { showNotice('请完成所有题目', '答题提示'); return; }

            var errorMsg = null;
            if (q1.value !== 'a') errorMsg = '第1题答案错误，请重新作答。';
            else if (q3.value !== 'false') errorMsg = '第3题答案错误，请重新作答。';
            else {
                var q2Checked = Array.from(q2).map(function(el) { return el.value });
                if (q2Checked.length !== 2 || !q2Checked.includes('b') || !q2Checked.includes('c')) {
                    errorMsg = '第2题答案错误（应选"立即停止使用并上报"和"通知实验室管理员"），请重新作答。';
                }
            }

            if (errorMsg) {
                var result = recordExamResult(examKey, false);
                if (result.cooldown) {
                    showNotice('今日考试次数已用完（3 次失败），已进入 24 小时冷却。', '考试受限');
                } else {
                    showNotice(errorMsg + '（今日剩余 ' + result.remaining + ' 次机会）', '答题提示');
                }
                refreshExamAttemptBar('rfidExamAttemptBar', examKey);
                return;
            }

            recordExamResult(examKey, true);
            var devName = pendingDevice || rfidPendingDevice;
            if (devName) rfidExamStatusMap[devName] = true;
            showNotice(devName + ' RFID安全考试通过！', '考试完成');
            if (isFromSafetyPage) { show('safety');
                isFromSafetyPage = false; return; }
            if (isFromBorrowFlow || rfidSourcePage === 'deviceDetail') {
                if (devName) {
                    var rfidCab = rfidPendingCabInfo || {};
                    isFromBorrowFlow = false;
                    rfidSourcePage = 'home';
                    handleRFIDBorrowWithTime(devName, rfidCab.cabName || '', rfidCab.cabNo || '', rfidCab.pos || '');
                    return;
                }
            }
            if (devName) { pendingDevice = devName;
                openDeviceDetail(devName, _fromHome); } else show('deviceDetail');
            isFromBorrowFlow = false;
            isFromSafetyPage = false;
            rfidPendingCabInfo = null;
        }

        function finishSystemExam() {
            var examKey = getExamKey('system');
            var gate = canTakeExam(examKey);
            if (!gate.allowed) {
                showNotice(gate.message, '考试受限');
                refreshExamAttemptBar('systemExamAttemptBar', examKey);
                return;
            }

            var q1 = document.querySelector('input[name=sys]:checked'),
                q2 = document.querySelectorAll('input[name=sys2]:checked'),
                q3 = document.querySelector('input[name=sys3]:checked');
            if (!q1 || !q3) { showNotice('请完成所有题目', '答题提示'); return; }

            var errorMsg = null;
            if (q1.value !== 'right') errorMsg = '第1题答案错误，请重新作答。';
            else if (q3.value !== 'false') errorMsg = '第3题答案错误，请重新作答。';
            else {
                var q2Checked = Array.from(q2).map(function(el) { return el.value });
                if (q2Checked.length !== 3 || !q2Checked.includes('a') || !q2Checked.includes('b') || !q2Checked.includes(
                        'c')) {
                    errorMsg = '第2题答案错误（应全选），请重新作答。';
                }
            }

            if (errorMsg) {
                var result = recordExamResult(examKey, false);
                if (result.cooldown) {
                    showNotice('今日考试次数已用完（3 次失败），已进入 24 小时冷却。', '考试受限');
                } else {
                    showNotice(errorMsg + '（今日剩余 ' + result.remaining + ' 次机会）', '答题提示');
                }
                refreshExamAttemptBar('systemExamAttemptBar', examKey);
                return;
            }

            recordExamResult(examKey, true);
            systemDone = true;
            showNotice('系统使用考试通过。', '完成');
            if (rfidPendingDevice && rfidPendingCabInfo) { isFromBorrowFlow = true;
                isFromSafetyPage = false;
                openRFIDExam(rfidPendingDevice); return; }
            if (pendingDevice) {
                var needExam = !rfidDeviceList.includes(pendingDevice) && safetyExamList.some(function(item) { return item.dev === pendingDevice });
                if (needExam && !safetyExamStatusMap[pendingDevice]) { isFromBorrowFlow = true;
                    openExamPage(pendingDevice); return; }
                var devName = pendingDevice;
                var devInfo = Object.values(deviceAllData).flat().find(function(d) { return d.name === devName });
                var dt = getPickerDateTime();
                if (devInfo && dt) {
                    document.getElementById('borrowName').textContent = devName + ' · 借用申请';
                    document.getElementById('borrowDevName').textContent = devName;
                    document.getElementById('borrowDevModel').textContent = devInfo.model || '-';
                    var durationHours = dt.hours;
                    var maxHours = deviceStock[devName] ? deviceStock[devName].maxHours : 24;
                    document.getElementById('borrowTimeDisplay').textContent = formatDateDisplay(dt.start) + ' ' +
                        formatHourDisplay(dt.start) + ' → ' + formatDateDisplay(dt.end) + ' ' + formatHourDisplay(
                            dt.end);
                    document.getElementById('borrowDurationDisplay').textContent = Math.round(durationHours * 10) /
                        10 + ' 小时（最长 ' + maxHours + ' 小时）';
                    document.getElementById('borrowReason').value = '';
                    window._borrowTimeInfo = { start: new Date(dt.start), end: new Date(dt.end),
                        duration: durationHours, devName: devName };
                    deviceStartDateTime = dt.start;
                    deviceEndDateTime = dt.end;
                    show('borrow');
                    isFromBorrowFlow = false;
                    isFromSafetyPage = false;
                    return;
                }
                show('deviceDetail');
                isFromBorrowFlow = false;
                isFromSafetyPage = false;
                return;
            }
            if (rfidPendingDevice && rfidSourcePage === 'deviceDetail') {
                var d = rfidPendingDevice;
                rfidPendingDevice = '';
                rfidSourcePage = 'home';
                if (d) { pendingDevice = d;
                    openDeviceDetail(d, _fromHome); } else show('deviceDetail');
                isFromBorrowFlow = false;
                isFromSafetyPage = false;
                return;
            }
            show('deviceDetail');
            isFromBorrowFlow = false;
            isFromSafetyPage = false;
        }

        function showNotice(text, title) { if (title === undefined) title = '系统提示';
            document.getElementById('noticeTitle').textContent = title;
            document.getElementById('noticeText').textContent = text;
            document.getElementById('noticeModal').classList.add('show'); }

        function closeNotice() { document.getElementById('noticeModal').classList.remove('show'); }
        window.alert = showNotice;

        function selectOrg(name) { currentOrganization = name;
            refreshOrgCurrentTag();
            showNotice('已切换至"' + name + '"', '组织切换成功'); }

        function applyJoinOrg() { showNotice('加入申请已提交，等待管理员审核', '申请提交'); }

        function completeReauth() { var name = document.getElementById('reauthName').value.trim(); var studentId =
                document.getElementById('reauthStudentId').value.trim(); var school = document.getElementById(
                    'reauthSchool').value; var college = document.getElementById('reauthCollege').value; if (!name || !
                studentId) { showNotice('请填写完整信息', '认证提示'); return; }
            showNotice('账号认证提交成功！\n学校：' + school + '\n学院：' + college, '认证成功');
            show('profile'); }

        function openResource(name) { resourceDetailSourcePage = current; var info = resourceMap[name]; if (!info) { showNotice('该设备暂无资源', '提示'); return; }
            document.getElementById('deviceResourceName').textContent = name + ' 资源';
            document.getElementById('deviceResourceMeta').innerHTML = '型号：' + info.model + '<br>' + info.code +
                '<br>设备位置：' + info.pos;
            document.getElementById('manualLink').href = '#';
            document.getElementById('manualLink').textContent = '📄 查看操作手册（演示）';
            document.getElementById('configLink').href = '#';
            document.getElementById('configLink').textContent = '📎 查看配套资源（演示）';
            show('deviceResource'); }

        // ==================== 启动 ====================
        window.onload = function() {
            initCateClick();
            renderDeviceList();
            // 资源中心初始化
            renderResourceList();
            renderSafetyExamList();
            renderPickupList();
            renderMessages();
            renderNotices();
            renderFaultList();
            renderFaultSubTypes();
            document.getElementById('title').textContent = titles[current];
            startCarousel();
            document.getElementById('headerRight').style.display = 'none';
            document.getElementById('pickupCount').textContent = pickupDevices.length;
            updateApprovalCount();
            updateReserveCount();
            initReserve();
            updateColleges();
            goLoginStep(1);
            if (pendingApprovals.length > 0 || pendingReserveApprovals.length > 0) {
                setTimeout(function() {
                    showNotice('有 ' + (pendingApprovals.length + pendingReserveApprovals.length) +
                        ' 个待审批订单，请耐心等待。', '待审批提醒')
                }, 500);
            }
            document.getElementById('confirmModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    document.getElementById('confirmModal').style.display = 'none';
                    if (modalCb) { modalCb(false);
                        modalCb = null; }
                }
            });
        };

        // ===== 时间选择抽屉：点击遮罩 / ESC 关闭 =====
        document.getElementById('timePickerModal').addEventListener('click', function(e) {
            // 小程序原生 picker 可能把日期选择回报为遮罩点击；关闭由明确的关闭按钮负责。
            if (false && e.target === this) closeTimePicker();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && timePickerModal.classList.contains('show')) {
                closeTimePicker();
            }
        });
    

 const prototypeShow=show; show=function(id,record){if(id==='changePassword'&&env.host.passwordPage){env.host.passwordPage('change');return}if(id==='forgetPassword'&&env.host.passwordPage){env.host.passwordPage('reset');return}if(['login','forgetPassword'].includes(id)){env.host.authPage(id);return}prototypeShow(id,record);env.host.page(id)};
 logout=()=>env.host.logout();
 const rawChangePassword=changePassword; changePassword=()=>env.host.password(document.getElementById('changePwdOld').value,document.getElementById('changePwdNew').value,document.getElementById('changePwdConfirm').value);
 window.onload(); show('home',false);
 const person=document.querySelector('#profile h3');if(person)person.textContent=env.host.user.name;
 
const scope={get(name){switch(name){case "history":return history;case "current":return current;case "pendingDevice":return pendingDevice;case "pendingRFIDInfo":return pendingRFIDInfo;case "systemDone":return systemDone;case "promptTarget":return promptTarget;case "currentOrganization":return currentOrganization;case "currentCate":return currentCate;case "currentResourceCate":return currentResourceCate;case "uploadFiles":return uploadFiles;case "codeCache":return codeCache;case "carouselIndex":return carouselIndex;case "carouselInterval":return carouselInterval;case "returnBtnState":return returnBtnState;case "safetyExamStatusMap":return safetyExamStatusMap;case "rfidExamStatusMap":return rfidExamStatusMap;case "wechatAuthSuccess":return wechatAuthSuccess;case "isFromBorrowFlow":return isFromBorrowFlow;case "isFromSafetyPage":return isFromSafetyPage;case "rfidPendingDevice":return rfidPendingDevice;case "rfidPendingCabInfo":return rfidPendingCabInfo;case "rfidSourcePage":return rfidSourcePage;case "AUTO_APPROVAL_DEVICES":return AUTO_APPROVAL_DEVICES;case "pickupDevices":return pickupDevices;case "pendingApprovals":return pendingApprovals;case "faultList":return faultList;case "messages":return messages;case "systemNotices":return systemNotices;case "pendingReserveApprovals":return pendingReserveApprovals;case "MAX_EXAM_ATTEMPTS_PER_DAY":return MAX_EXAM_ATTEMPTS_PER_DAY;case "EXAM_COOLDOWN_HOURS":return EXAM_COOLDOWN_HOURS;case "examAttemptsMap":return examAttemptsMap;case "getExamKey":return getExamKey;case "formatDurationFromMs":return formatDurationFromMs;case "canTakeExam":return canTakeExam;case "recordExamResult":return recordExamResult;case "refreshExamAttemptBar":return refreshExamAttemptBar;case "getReservations":return getReservations;case "memoryReservations":return memoryReservations;case "deviceMaxHours":return deviceMaxHours;case "deviceNames":return deviceNames;case "deviceStock":return deviceStock;case "generateOrderNo":return generateOrderNo;case "generateReserveOrderNo":return generateReserveOrderNo;case "rfidExamConfig":return rfidExamConfig;case "titles":return titles;case "cateNameMap":return cateNameMap;case "deviceAllData":return deviceAllData;case "generateDeviceInstances":return generateDeviceInstances;case "deviceCabinetMap":return deviceCabinetMap;case "resourceMap":return resourceMap;case "safetyExamList":return safetyExamList;case "rfidDeviceList":return rfidDeviceList;case "HOTEL_TIME_SLOTS":return HOTEL_TIME_SLOTS;case "SERVICE_START_HOUR":return SERVICE_START_HOUR;case "SERVICE_END_HOUR":return SERVICE_END_HOUR;case "deviceOrderData":return deviceOrderData;case "smsCountdown":return smsCountdown;case "smsTimer":return smsTimer;case "resetSmsCountdown":return resetSmsCountdown;case "resetSmsTimer":return resetSmsTimer;case "currentActivePanel":return currentActivePanel;case "confirmCb":return confirmCb;case "countdownTimer":return countdownTimer;case "currentOrderFilter":return currentOrderFilter;case "loginStep":return loginStep;case "loginMaxStep":return loginMaxStep;case "pickerStartDate":return pickerStartDate;case "pickerEndDate":return pickerEndDate;case "pickerStartHour":return pickerStartHour;case "pickerEndHour":return pickerEndHour;case "pickerMaxHours":return pickerMaxHours;case "pickerDeviceName":return pickerDeviceName;case "dateSelectionStage":return dateSelectionStage;case "deviceStartDateTime":return deviceStartDateTime;case "deviceEndDateTime":return deviceEndDateTime;case "_fromHome":return _fromHome;case "schoolCollegeMap":return schoolCollegeMap;case "updateColleges":return updateColleges;case "goLoginStep":return goLoginStep;case "onLoginStepClick":return onLoginStepClick;case "pad":return pad;case "timeToMinutes":return timeToMinutes;case "formatDateDisplay":return formatDateDisplay;case "formatHourDisplay":return formatHourDisplay;case "getWeekDay":return getWeekDay;case "parseDateStr":return parseDateStr;case "isSameDay":return isSameDay;case "addHours":return addHours;case "getToday":return getToday;case "getDateStr":return getDateStr;case "getMonthStr":return getMonthStr;case "timePickerModal":return timePickerModal;case "modalCalendarGrid":return modalCalendarGrid;case "modalCalendarMonthLabel":return modalCalendarMonthLabel;case "modalStartHourSelect":return modalStartHourSelect;case "modalEndHourSelect":return modalEndHourSelect;case "modalConfirmBtn":return modalConfirmBtn;case "modalMaxHint":return modalMaxHint;case "modalBorrowDurationText":return modalBorrowDurationText;case "compactStartEl":return compactStartEl;case "compactEndEl":return compactEndEl;case "openTimePicker":return openTimePicker;case "closeTimePicker":return closeTimePicker;case "initTimePicker":return initTimePicker;case "getEffectiveBorrowHours":return getEffectiveBorrowHours;case "makeDateTime":return makeDateTime;case "hasValidEndSlotForDate":return hasValidEndSlotForDate;case "getMaxEndDateByCalendar":return getMaxEndDateByCalendar;case "getSelectableRange":return getSelectableRange;case "isDateSelectable":return isDateSelectable;case "getMaxEndDateTime":return getMaxEndDateTime;case "renderModalCalendar":return renderModalCalendar;case "changeModalMonth":return changeModalMonth;case "clearEndSelection":return clearEndSelection;case "resetDateSelectionOnly":return resetDateSelectionOnly;case "updateSelectionTip":return updateSelectionTip;case "onModalDateClick":return onModalDateClick;case "renderModalTimeOptions":return renderModalTimeOptions;case "showValidationMessage":return showValidationMessage;case "clearValidationMessage":return clearValidationMessage;case "validateSelectedDuration":return validateSelectedDuration;case "onModalStartHourChange":return onModalStartHourChange;case "onModalEndHourChange":return onModalEndHourChange;case "updateModalConfirm":return updateModalConfirm;case "resetModalPicker":return resetModalPicker;case "confirmModalPicker":return confirmModalPicker;case "updateCompactSummary":return updateCompactSummary;case "getPickerDateTime":return getPickerDateTime;case "updateDeviceDetailList":return updateDeviceDetailList;case "renderDeviceDetailList":return renderDeviceDetailList;case "borrowWithTime":return borrowWithTime;case "handleRFIDBorrowWithTime":return handleRFIDBorrowWithTime;case "openDeviceDetail":return openDeviceDetail;case "generateStations":return generateStations;case "STATIONS":return STATIONS;case "todayDay":return todayDay;case "COURSES":return COURSES;case "reserveStep":return reserveStep;case "selectedDate":return selectedDate;case "selectedStart":return selectedStart;case "selectedEnd":return selectedEnd;case "availableLabs":return availableLabs;case "selectedLab":return selectedLab;case "availableStations":return availableStations;case "selectedStation":return selectedStation;case "purpose":return purpose;case "ALL_TIMES":return ALL_TIMES;case "initReserve":return initReserve;case "updateStartTimeOptions":return updateStartTimeOptions;case "onDateChange":return onDateChange;case "onStartTimeChange":return onStartTimeChange;case "onEndTimeChange":return onEndTimeChange;case "resetEndTime":return resetEndTime;case "updateTimeHint":return updateTimeHint;case "onNextToLabs":return onNextToLabs;case "onSelectLab":return onSelectLab;case "renderStationGrid":return renderStationGrid;case "onSelectStation":return onSelectStation;case "onSubmitReserve":return onSubmitReserve;case "closeConfirmModal":return closeConfirmModal;case "renderContentPickup":return renderContentPickup;case "renderContentReturn":return renderContentReturn;case "renderContentApproval":return renderContentApproval;case "reserveCountdownTimer":return reserveCountdownTimer;case "renderContentReserve":return renderContentReserve;case "stuCheckin":return stuCheckin;case "stuRelease":return stuRelease;case "stuCancelReserve":return stuCancelReserve;case "updateReserveCount":return updateReserveCount;case "updateApprovalCount":return updateApprovalCount;case "toggleHomePanel":return toggleHomePanel;case "cancelApproval":return cancelApproval;case "cancelReserveApproval":return cancelReserveApproval;case "modalCb":return modalCb;case "showModal":return showModal;case "renderMessages":return renderMessages;case "renderNotices":return renderNotices;case "startCarousel":return startCarousel;case "renderPickupList":return renderPickupList;case "renderFaultList":return renderFaultList;case "setOrderFilter":return setOrderFilter;case "renderOrderList":return renderOrderList;case "getReservationOrders":return getReservationOrders;case "faultSubTypes":return faultSubTypes;case "currentFaultMainType":return currentFaultMainType;case "renderFaultSubTypes":return renderFaultSubTypes;case "switchFaultType":return switchFaultType;case "onFaultCabinetChange":return onFaultCabinetChange;case "handleUpload":return handleUpload;case "renderUploadPreview":return renderUploadPreview;case "delUpload":return delUpload;case "submitFault":return submitFault;case "changePassword":return changePassword;case "getResetSms":return getResetSms;case "resetPasswordBySms":return resetPasswordBySms;case "handleRFIDBorrow":return handleRFIDBorrow;case "submitBorrow":return submitBorrow;case "borrow":return borrow;case "logout":return logout;case "wechatLogin":return wechatLogin;case "getSmsCode":return getSmsCode;case "phoneLogin":return phoneLogin;case "initCateClick":return initCateClick;case "renderDeviceList":return renderDeviceList;case "filterDeviceList":return filterDeviceList;case "onResourceCateClick":return onResourceCateClick;case "renderResourceList":return renderResourceList;case "filterResourceList":return filterResourceList;case "renderSafetyExamList":return renderSafetyExamList;case "filterSafetyExam":return filterSafetyExam;case "openExamPageFromSafety":return openExamPageFromSafety;case "openRFIDExamFromSafety":return openRFIDExamFromSafety;case "openExamPage":return openExamPage;case "openRFIDExam":return openRFIDExam;case "openCabMap":return openCabMap;case "closeMap":return closeMap;case "generateFourDigitCode":return generateFourDigitCode;case "refreshOrgCurrentTag":return refreshOrgCurrentTag;case "show":return show;case "back":return back;case "startSystemExam":return startSystemExam;case "goPrompt":return goPrompt;case "closeModal":return closeModal;case "finishDeviceExam":return finishDeviceExam;case "finishRFIDExam":return finishRFIDExam;case "finishSystemExam":return finishSystemExam;case "showNotice":return showNotice;case "closeNotice":return closeNotice;case "selectOrg":return selectOrg;case "applyJoinOrg":return applyJoinOrg;case "completeReauth":return completeReauth;case "openResource":return openResource;default:return env.globals[name]??document.getElementById(name)}},set(name,value){switch(name){case "history":history=value;return value;case "current":current=value;return value;case "pendingDevice":pendingDevice=value;return value;case "pendingRFIDInfo":pendingRFIDInfo=value;return value;case "systemDone":systemDone=value;return value;case "promptTarget":promptTarget=value;return value;case "currentOrganization":currentOrganization=value;return value;case "currentCate":currentCate=value;return value;case "currentResourceCate":currentResourceCate=value;return value;case "uploadFiles":uploadFiles=value;return value;case "codeCache":codeCache=value;return value;case "carouselIndex":carouselIndex=value;return value;case "carouselInterval":carouselInterval=value;return value;case "wechatAuthSuccess":wechatAuthSuccess=value;return value;case "isFromBorrowFlow":isFromBorrowFlow=value;return value;case "isFromSafetyPage":isFromSafetyPage=value;return value;case "rfidPendingDevice":rfidPendingDevice=value;return value;case "rfidPendingCabInfo":rfidPendingCabInfo=value;return value;case "rfidSourcePage":rfidSourcePage=value;return value;case "pickupDevices":pickupDevices=value;return value;case "pendingApprovals":pendingApprovals=value;return value;case "faultList":faultList=value;return value;case "messages":messages=value;return value;case "systemNotices":systemNotices=value;return value;case "pendingReserveApprovals":pendingReserveApprovals=value;return value;case "examAttemptsMap":examAttemptsMap=value;return value;case "getExamKey":getExamKey=value;return value;case "formatDurationFromMs":formatDurationFromMs=value;return value;case "canTakeExam":canTakeExam=value;return value;case "recordExamResult":recordExamResult=value;return value;case "refreshExamAttemptBar":refreshExamAttemptBar=value;return value;case "getReservations":getReservations=value;return value;case "memoryReservations":memoryReservations=value;return value;case "generateOrderNo":generateOrderNo=value;return value;case "generateReserveOrderNo":generateReserveOrderNo=value;return value;case "generateDeviceInstances":generateDeviceInstances=value;return value;case "smsCountdown":smsCountdown=value;return value;case "smsTimer":smsTimer=value;return value;case "resetSmsCountdown":resetSmsCountdown=value;return value;case "resetSmsTimer":resetSmsTimer=value;return value;case "currentActivePanel":currentActivePanel=value;return value;case "confirmCb":confirmCb=value;return value;case "countdownTimer":countdownTimer=value;return value;case "currentOrderFilter":currentOrderFilter=value;return value;case "loginStep":loginStep=value;return value;case "loginMaxStep":loginMaxStep=value;return value;case "pickerStartDate":pickerStartDate=value;return value;case "pickerEndDate":pickerEndDate=value;return value;case "pickerStartHour":pickerStartHour=value;return value;case "pickerEndHour":pickerEndHour=value;return value;case "pickerMaxHours":pickerMaxHours=value;return value;case "pickerDeviceName":pickerDeviceName=value;return value;case "dateSelectionStage":dateSelectionStage=value;return value;case "deviceStartDateTime":deviceStartDateTime=value;return value;case "deviceEndDateTime":deviceEndDateTime=value;return value;case "_fromHome":_fromHome=value;return value;case "updateColleges":updateColleges=value;return value;case "goLoginStep":goLoginStep=value;return value;case "onLoginStepClick":onLoginStepClick=value;return value;case "pad":pad=value;return value;case "timeToMinutes":timeToMinutes=value;return value;case "formatDateDisplay":formatDateDisplay=value;return value;case "formatHourDisplay":formatHourDisplay=value;return value;case "getWeekDay":getWeekDay=value;return value;case "parseDateStr":parseDateStr=value;return value;case "isSameDay":isSameDay=value;return value;case "addHours":addHours=value;return value;case "getToday":getToday=value;return value;case "getDateStr":getDateStr=value;return value;case "getMonthStr":getMonthStr=value;return value;case "openTimePicker":openTimePicker=value;return value;case "closeTimePicker":closeTimePicker=value;return value;case "initTimePicker":initTimePicker=value;return value;case "getEffectiveBorrowHours":getEffectiveBorrowHours=value;return value;case "makeDateTime":makeDateTime=value;return value;case "hasValidEndSlotForDate":hasValidEndSlotForDate=value;return value;case "getMaxEndDateByCalendar":getMaxEndDateByCalendar=value;return value;case "getSelectableRange":getSelectableRange=value;return value;case "isDateSelectable":isDateSelectable=value;return value;case "getMaxEndDateTime":getMaxEndDateTime=value;return value;case "renderModalCalendar":renderModalCalendar=value;return value;case "changeModalMonth":changeModalMonth=value;return value;case "clearEndSelection":clearEndSelection=value;return value;case "resetDateSelectionOnly":resetDateSelectionOnly=value;return value;case "updateSelectionTip":updateSelectionTip=value;return value;case "onModalDateClick":onModalDateClick=value;return value;case "renderModalTimeOptions":renderModalTimeOptions=value;return value;case "showValidationMessage":showValidationMessage=value;return value;case "clearValidationMessage":clearValidationMessage=value;return value;case "validateSelectedDuration":validateSelectedDuration=value;return value;case "onModalStartHourChange":onModalStartHourChange=value;return value;case "onModalEndHourChange":onModalEndHourChange=value;return value;case "updateModalConfirm":updateModalConfirm=value;return value;case "resetModalPicker":resetModalPicker=value;return value;case "confirmModalPicker":confirmModalPicker=value;return value;case "updateCompactSummary":updateCompactSummary=value;return value;case "getPickerDateTime":getPickerDateTime=value;return value;case "updateDeviceDetailList":updateDeviceDetailList=value;return value;case "renderDeviceDetailList":renderDeviceDetailList=value;return value;case "borrowWithTime":borrowWithTime=value;return value;case "handleRFIDBorrowWithTime":handleRFIDBorrowWithTime=value;return value;case "openDeviceDetail":openDeviceDetail=value;return value;case "generateStations":generateStations=value;return value;case "STATIONS":STATIONS=value;return value;case "todayDay":todayDay=value;return value;case "COURSES":COURSES=value;return value;case "reserveStep":reserveStep=value;return value;case "selectedDate":selectedDate=value;return value;case "selectedStart":selectedStart=value;return value;case "selectedEnd":selectedEnd=value;return value;case "availableLabs":availableLabs=value;return value;case "selectedLab":selectedLab=value;return value;case "availableStations":availableStations=value;return value;case "selectedStation":selectedStation=value;return value;case "purpose":purpose=value;return value;case "ALL_TIMES":ALL_TIMES=value;return value;case "initReserve":initReserve=value;return value;case "updateStartTimeOptions":updateStartTimeOptions=value;return value;case "onDateChange":onDateChange=value;return value;case "onStartTimeChange":onStartTimeChange=value;return value;case "onEndTimeChange":onEndTimeChange=value;return value;case "resetEndTime":resetEndTime=value;return value;case "updateTimeHint":updateTimeHint=value;return value;case "onNextToLabs":onNextToLabs=value;return value;case "onSelectLab":onSelectLab=value;return value;case "renderStationGrid":renderStationGrid=value;return value;case "onSelectStation":onSelectStation=value;return value;case "onSubmitReserve":onSubmitReserve=value;return value;case "closeConfirmModal":closeConfirmModal=value;return value;case "renderContentPickup":renderContentPickup=value;return value;case "renderContentReturn":renderContentReturn=value;return value;case "renderContentApproval":renderContentApproval=value;return value;case "reserveCountdownTimer":reserveCountdownTimer=value;return value;case "renderContentReserve":renderContentReserve=value;return value;case "stuCheckin":stuCheckin=value;return value;case "stuRelease":stuRelease=value;return value;case "stuCancelReserve":stuCancelReserve=value;return value;case "updateReserveCount":updateReserveCount=value;return value;case "updateApprovalCount":updateApprovalCount=value;return value;case "toggleHomePanel":toggleHomePanel=value;return value;case "cancelApproval":cancelApproval=value;return value;case "cancelReserveApproval":cancelReserveApproval=value;return value;case "modalCb":modalCb=value;return value;case "showModal":showModal=value;return value;case "renderMessages":renderMessages=value;return value;case "renderNotices":renderNotices=value;return value;case "startCarousel":startCarousel=value;return value;case "renderPickupList":renderPickupList=value;return value;case "renderFaultList":renderFaultList=value;return value;case "setOrderFilter":setOrderFilter=value;return value;case "renderOrderList":renderOrderList=value;return value;case "getReservationOrders":getReservationOrders=value;return value;case "faultSubTypes":faultSubTypes=value;return value;case "currentFaultMainType":currentFaultMainType=value;return value;case "renderFaultSubTypes":renderFaultSubTypes=value;return value;case "switchFaultType":switchFaultType=value;return value;case "onFaultCabinetChange":onFaultCabinetChange=value;return value;case "handleUpload":handleUpload=value;return value;case "renderUploadPreview":renderUploadPreview=value;return value;case "delUpload":delUpload=value;return value;case "submitFault":submitFault=value;return value;case "changePassword":changePassword=value;return value;case "getResetSms":getResetSms=value;return value;case "resetPasswordBySms":resetPasswordBySms=value;return value;case "handleRFIDBorrow":handleRFIDBorrow=value;return value;case "submitBorrow":submitBorrow=value;return value;case "borrow":borrow=value;return value;case "logout":logout=value;return value;case "wechatLogin":wechatLogin=value;return value;case "getSmsCode":getSmsCode=value;return value;case "phoneLogin":phoneLogin=value;return value;case "initCateClick":initCateClick=value;return value;case "renderDeviceList":renderDeviceList=value;return value;case "filterDeviceList":filterDeviceList=value;return value;case "onResourceCateClick":onResourceCateClick=value;return value;case "renderResourceList":renderResourceList=value;return value;case "filterResourceList":filterResourceList=value;return value;case "renderSafetyExamList":renderSafetyExamList=value;return value;case "filterSafetyExam":filterSafetyExam=value;return value;case "openExamPageFromSafety":openExamPageFromSafety=value;return value;case "openRFIDExamFromSafety":openRFIDExamFromSafety=value;return value;case "openExamPage":openExamPage=value;return value;case "openRFIDExam":openRFIDExam=value;return value;case "openCabMap":openCabMap=value;return value;case "closeMap":closeMap=value;return value;case "generateFourDigitCode":generateFourDigitCode=value;return value;case "refreshOrgCurrentTag":refreshOrgCurrentTag=value;return value;case "show":show=value;return value;case "back":back=value;return value;case "startSystemExam":startSystemExam=value;return value;case "goPrompt":goPrompt=value;return value;case "closeModal":closeModal=value;return value;case "finishDeviceExam":finishDeviceExam=value;return value;case "finishRFIDExam":finishRFIDExam=value;return value;case "finishSystemExam":finishSystemExam=value;return value;case "showNotice":showNotice=value;return value;case "closeNotice":closeNotice=value;return value;case "selectOrg":selectOrg=value;return value;case "applyJoinOrg":applyJoinOrg=value;return value;case "completeReauth":completeReauth=value;return value;case "openResource":openResource=value;return value;default:throw Error('不可写变量 '+name)}}};
return env.finish(scope,()=>(current));}
