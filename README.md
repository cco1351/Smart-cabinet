# 实验室智能柜 · 借还与管理统一小程序

这是可由 **HBuilderX 打开、可编译到微信小程序** 的 uni-app Vue 3 项目。保留两套原型的业务内容、页面结构、配色、导航与模拟交互，增加主包统一登录、角色权限、两个普通业务分包和个人中心工作区切换。

**默认是本地演示模式。它是可运行的前端演示迁移项目，附账号鉴权服务；不是已经接入真实柜机的生产系统。** 原始文件没有修改，逐字副本及 SHA-256 清单在 `reference/`。

## 快速运行

### HBuilderX

1. 文件 → 导入 → 从本地目录导入，选择本项目根目录（包含 `package.json` 的 `smart-cabinet-uniapp`）。这是 CLI 结构的 uni-app 项目，源码位于 `src/`。
2. 首次解压项目后，在项目终端运行 `npm install`。当前工作目录中的版本已安装依赖；交付压缩包不包含 `node_modules`。
3. 浏览器预览：运行 `npm run dev:h5`，打开终端显示的本机地址。
4. 微信编译：运行 `npm run build:mp-weixin`。
5. 微信开发者工具 → 导入项目，选择 **`dist/build/mp-weixin`**，不是源码根目录。

也可以使用 HBuilderX 的“运行 → 运行到小程序模拟器 → 微信开发者工具”，并按 HBuilderX 提示配置开发者工具路径及服务端口。若内置编译器版本不同，优先使用上面的 npm 命令，项目已锁定依赖版本。

### 直接查看已编译小程序

交付中包含已编译的 `dist/build/mp-weixin/`，可直接导入微信开发者工具。当前已配置用户提供的微信小程序 AppID；如需更换，请配置在 **`src/manifest.json` 的 `mp-weixin.appid`**，然后重新编译。游客模式受开发者工具支持情况限制，真机预览及发布需使用自己的 AppID。

环境：Node.js 18.18 或更高兼容版本、npm、HBuilderX、微信开发者工具。此项目已用 Node.js 18.18 及锁定的 uni-app 编译器构建。

## 演示账号

| 账号 | 手机号 | 密码 |
| --- | --- | --- |
| 学生 | 13800000001 | Demo12345 |
| 教师管理员 | 13800000002 | Demo12345 |
| 学生审批人 | 13800000003 | Demo12345 |

首次登录都先进入“我的借还”。有管理权限的账号可从个人页进入“管理工作台”，再返回“我的借还”。工作区与人员类型独立：演示管理员的人员类型是教师，演示审批人的人员类型是学生；两者均可进入借还工作区。新注册账号的人员类型默认为学生，管理权限只能由系统操作人员授予。

这三个账号是仅存在于本地演示数据中的预置测试账号，**不会由后端自动创建**。演示账号和业务状态使用本机 storage，不能用于真实授权，也不会在不同设备间同步。

## 页面与角色

| 位置 | 作用 |
| --- | --- |
| `src/pages/entry/` | 主包启动、恢复会话、刷新服务端身份、分流 |
| `src/pages/login/` | 主包统一登录与注册 |
| `src/services/auth.js` | 会话、人员类型、工作区权限、密码修改与演示找回 |
| `src/pages/password/` | 两个工作区共用的修改密码与忘记密码页面 |
| `src/packages/student/` | 《演示9.9》学生端页面与业务 |
| `src/packages/teacher/` | 教师管理页面、管理员 / 审批人、电源管理 |
| `src/runtime/` | 原型逻辑到原生组件的适配层 |
| `src/components/NativeNode.vue` | 原生 view / text / input / picker 等组件渲染 |
| `src/pages.json` | 主包和两个普通分包注册，没有 independent:true |
| `server/` | 手机号密码登录鉴权示例、系统授权 CLI |
| `docs/page-inventory.json` | 原型页面定义清单 |
| `docs/screenshots/` | 实际浏览器验证截图 |
| `reference/` | 未修改的原型副本与来源校验清单 |

学生导航：**首页、设备预约、工位预约、我的**。

教师导航按实际原型：**首页、设备、柜机、个人**；借用审核、人员审核和异常处理通过教师首页进入。教师首页的电源管理包含原型关联的两套页面。

`personType` 表示学生、教师或其他人员；`teacherPermission` 表示管理员或审批人权限。现有代码为兼容分包路径仍用 `roles: ['student','teacher']` 表示“我的借还／管理工作台”的可用入口，`currentRole` 只表示当前工作区，不能据此判断人员类型。切换工作区不修改账号、人员类型或管理权限。管理员和审批人仍有不同的操作范围。

页面首次加载及重新显示时校验权限；分享或手动进入分包页也会校验。切换使用 `reLaunch` 清空页面栈。管理员电源页额外校验管理员权限。管理权限被服务端撤销后，刷新身份会回到“我的借还”。原型业务仍使用本机数据，自借自审的服务端限制待正式借用审批接口设计时落实。

## 接入账号鉴权服务

1. 在 `src/config.js` 将 `mode` 从 `'demo'` 改成 `'api'`。
2. 启动服务：`npm run server`，默认监听 `http://127.0.0.1:8787`。
3. 在小程序中注册账号。服务端固定分配 `roles: ['student']`，忽略客户端传来的角色字段。
4. 由系统操作人员在项目根目录执行：

```powershell
# 查看账号
npm run account -- list

# 授予管理员权限（不改变人员类型）
npm run account -- grant 13912345678 admin

# 或授予审批人权限（学生也可以担任）
npm run account -- grant 13912345678 approver

# 撤销管理权限，借还工作区保留
npm run account -- revoke 13912345678

# 由系统操作人员维护人员类型（与管理员/审批人权限独立）
npm run account -- person-type 13912345678 teacher
```

5. 用户重新显示页面或登录后刷新权限，在个人中心看到身份切换入口。

账号数据仅保存在 `server/data/accounts.json`，不编译进小程序。密码使用随机盐和 scrypt 哈希，令牌保存在服务端内存；服务重启后需重新登录。服务端每次请求重新读取用户权限，撤销管理权限立即影响后续管理接口请求。修改或重置密码会作废该用户全部服务端会话。当前密码规则统一为 8 至 64 位；更严格的正式规则待确认。

API 示例：`POST /auth/register`、`POST /auth/login`、`GET /auth/me`、`POST /auth/logout`、`POST /auth/password`、`POST /auth/password-reset/request`、`POST /auth/password-reset/confirm`、`GET /teacher/access-check`、`GET /teacher/admin-check`。没有向客户端开放自助升级接口。

已登录且记得原密码时，两种工作区都进入共用“修改密码”页，原密码由账号服务核对。忘记原密码时，从登录页或该页面进入“忘记密码”，使用绑定手机号验证码重置，不要求原密码。本地演示模式明确显示固定演示码 `123456`，仅修改本机演示账号；不会发送短信。API 模式的重置接口仅在服务端接入 `createServer({sendResetCode})` 的真实发送实现后可用；当前直接运行 `npm run server` 会返回“短信服务尚未配置”，不会伪称短信发送成功。验证码在服务端限时、限次、一次使用；服务端不把验证码返回给客户端。真实短信供应商和终端密码同步方式待确认。

本地服务仅监听 127.0.0.1。真机无法使用电脑的 127.0.0.1；正式接入需部署 HTTPS 服务，配置 `apiBase` 和微信 request 合法域名。H5 如使用其他源，可通过 `ALLOWED_ORIGIN` 环境变量配置允许的源。

## 保留方式与可编辑性

原型包含大量 DOM 动态拼接与事件闭包。为保留现有页面和模块，本项目采用**实例隔离的原型逻辑 + JS 内存节点树 + 原生组件渲染**：

- 没有使用 web-view / iframe，也没有运行时 eval / new Function。
- 两端业务代码分别在其业务分包内；共享适配层在主包。
- 原型的内部页面继续使用原有页面 ID 切换；不会为每个内部页面人为重写一个功能不完整的 Vue 页面。
- 表单映射为原生 input、textarea、picker；文件选择映射为小程序媒体选择；滑动操作映射为触摸事件。
- 去掉的仅是电脑演示外框、手机模型边框和原型预览工具条；统一登录和个人中心角色切换是新增的公共能力。
- 状态按账号隔离，主要业务演示状态在本机保存。这里不构成真实跨用户业务数据库。

直接维护 `src/packages/*/*.js` 和对应样式数据即可。原型来源再发生变化时，可修改 `tools/migrate.mjs` 中的来源路径并重新运行，但它会覆盖生成的业务 JS / 样式数据，请先保存自己的后续改动。

## 已验证与接入边界

已验证：微信小程序和 H5 构建；两个普通分包及原生组件输出；学生页面和配置的管理页面渲染；人员类型与管理权限独立；演示账号修改、重置及服务端密码失效处理。原有浏览器登录和工作区切换验证属于此前版本，本次修改尚未重新进行浏览器或微信模拟器交互检查；详见 `docs/VALIDATION.md`。

本机通过浏览器进行了视觉和交互验证，**未在真实微信设备中完成验收**。微信开发者工具及真机应继续检查滚动、输入键盘、安全区、文件选择和长列表性能。

以下能力仍按原始原型的演示语义保留，不应误认为已实现真实后台：微信授权和短信、设备开门和电源控制、真实 RFID / 标签识别、真实取还码、设备库存并发、跨账号申请与审批同步、考试题库后台、资料下载地址和上传服务。账号鉴权服务只处理账号与权限，业务页面目前仍使用演示数据；切换为 api 模式也不会自动把这些模拟业务变成真实业务接口。

原演示中仅显示提示或示例结果的功能，迁移后仍保持该行为。学生端资源链接原本为 `#`，本项目明确提示尚未配置资源。教师端“导出任务已创建”仍是原型演示；电源模块的 CSV 导出已适配为文件导出。

## 检查命令

```powershell
npm test
npm run build:mp-weixin
node tools/verify-build.mjs
npm run build:h5
```

浏览器脚本 `tools/visual-check.mjs` 和 `tools/access-check.mjs` 需要先启动 H5 服务，并按本机安装情况修改 Chrome 可执行文件路径。

## 参考

- [uni-app 快速上手](https://uniapp.dcloud.net.cn/quickstart)
- [pages.json 与普通分包](https://uniapp.dcloud.net.cn/collocation/pages.html)
- [技术意义上的独立分包](https://uniapp.dcloud.net.cn/tutorial/independent-subpackage.html)（本项目未使用）

第三方适配库 LinkeDOM 的许可位于 `src/runtime/vendor/LICENSE-linkedom`；其他依赖许可随 npm 依赖提供。

## GitHub 自动同步

项目已配置 GitHub 远程仓库：`https://github.com/cco1351/Smart-cabinet.git`。HBuilderX 本身没有可靠的“每次保存自动 push”开关，因此项目提供了文件轮询同步脚本：

```powershell
# 在项目根目录运行，持续监视保存的文件并自动提交、推送
npm run sync:github

# 或双击 tools/start-github-sync.cmd
```

脚本会忽略 `.gitignore` 中的 `node_modules`、`dist`、`.npm-cache`、`server/data` 和 `.env`，每次检测到源码变化后自动生成提交并推送到 `origin/main`。首次运行需要 GitHub 凭据已经在 Git Credential Manager 中登录。建议在 HBuilderX 打开项目后，将同步脚本保持在一个终端窗口中运行。
