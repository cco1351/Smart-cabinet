import {createEnvironment} from '../../runtime/environment.js';
export function createPrototype(host){const env=createEnvironment("<!doctype html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>小程序管理端页面原型线框图</title>\n  <link rel=\"stylesheet\" href=\"./css/小程序管理员端页面线框图.css\">\n</head>\n<body>\n  <div class=\"workspace\">\n    <div class=\"toolbar\">\n      <div class=\"toolbar-title\">\n        <strong>小程序管理端页面线框图</strong>\n        <span>同一小程序按登录角色展示不同功能入口。</span>\n      </div>\n      <div id=\"roleSwitch\" class=\"role-strip\"></div>\n    </div>\n    <main class=\"prototype-main\">\n      <div id=\"roleSummary\" class=\"role-summary\"></div>\n      <div id=\"pageTabs\" class=\"page-strip\"></div>\n      <div id=\"appFrame\"></div>\n    </main>\n  </div>\n  \n  \n  \n</body>\n</html>\n",host);const {document,window,location,URL,URLSearchParams,localStorage,sessionStorage,setTimeout,setInterval,clearTimeout,clearInterval,alert,confirm,FileReader,Blob}=env.globals;const history=env.globals.history;
const navs = [
      ["首页", "H"], ["待办", "T"], ["设备", "D"], ["柜机", "C"], ["个人", "P"]
    ];

    const minimumCategories = [
      {
        icon: "示", name: "示波器", parent: "电子测量仪器", count: 8, available: 6,
        flowRule: { maximum: 168, borrowApproval: true, renewalAllowed: false, maxRenewals: 0, returnApproval: false, returnMode: "人工审核", studyRequired: true, studyMaterial: "示波器安全操作资料", examRequired: true, examPaper: "示波器上机考核", noReturn: false },
        devices: [
          { title: "数字示波器 DS1054Z", code: "OSC-001", identifyType: "标签扫码", location: "C 柜 · 03 门", badge: "借用中", badgeClass: "warn", stateFields: [["借用人", "张三"], ["预计归还", "今天 18:00"]], meta: ["OSC-001 | 标签扫码 | C 柜 03 门", "借用人：张三 | 预计今天 18:00 归还"], target: "09-device-detail" },
          { title: "数字示波器 DS1104Z", code: "OSC-004", identifyType: "标签扫码", location: "C 柜 · 06 门", badge: "可借", badgeClass: "ok", meta: ["OSC-004 | 标签扫码 | C 柜 06 门", "当前在柜，可提交借用申请"], target: "09-device-detail" }
        ]
      },
      {
        icon: "表", name: "万用表", parent: "电子测量仪器", count: 5, available: 4,
        flowRule: { maximum: 168, borrowApproval: false, renewalAllowed: false, maxRenewals: 0, returnApproval: false, returnMode: "人工审核", studyRequired: false, studyMaterial: "", examRequired: false, examPaper: "", noReturn: false },
        devices: [
          { title: "数字万用表 UT61E+", code: "MET-016", identifyType: "标签扫码", location: "C 柜 · 05 门", badge: "可借", badgeClass: "ok", meta: ["MET-016 | 标签扫码 | C 柜 05 门", "资格校验通过后可直接借用"], target: "09c-label-direct-device-detail" }
        ]
      },
      {
        icon: "感", name: "传感器实验套件", parent: "传感器与采集设备", count: 3, available: 1,
        flowRule: { maximum: 168, borrowApproval: true, renewalAllowed: false, maxRenewals: 0, returnApproval: false, returnMode: "人工审核", studyRequired: true, studyMaterial: "传感器实验准备资料", examRequired: false, examPaper: "", noReturn: false },
        devices: [
          { title: "传感器实验套件 V2", code: "SEN-011", identifyType: "标签扫码", location: "B 柜 · 02 门", handlingStatus: "待维修", badge: "异常", badgeClass: "bad", stateFields: [["异常类型", "配件缺失"], ["处理状态", "待维修"]], meta: ["SEN-011 | 标签扫码 | B 柜 02 门", "配件缺失，当前不可借"], target: "09e-abnormal-device-detail" }
        ]
      },
      {
        icon: "源", name: "直流稳压电源", parent: "电源设备", count: 6, available: 4,
        flowRule: { maximum: 168, borrowApproval: true, renewalAllowed: false, maxRenewals: 0, returnApproval: false, returnMode: "人工审核", studyRequired: true, studyMaterial: "电源设备安全操作资料", examRequired: true, examPaper: "电源设备安全考核", noReturn: false },
        devices: [
          { title: "直流稳压电源 DP832A", code: "PWR-003", identifyType: "标签扫码", location: "C 柜 · 08 门", badge: "可借", badgeClass: "ok", meta: ["PWR-003 | 标签扫码 | C 柜 08 门", "当前在柜，可提交借用申请"], target: "09-device-detail" },
          { title: "可编程直流电源 DP832A", code: "PWR-012", identifyType: "RFID", location: "A 柜 · 09 门", badge: "借用中", badgeClass: "warn", stateFields: [["借用人", "李四"]], meta: ["PWR-012 | RFID | A 柜 09 门", "固定不审批 | 借用人：李四"], target: "09g-cabinet-device-detail", deviceDetailData: { name: "可编程直流电源", code: "PWR-012", state: "借出", num: "09", cabinet: "A 柜", version: "RFID版" } }
        ]
      },
      {
        icon: "信", name: "信号发生器", parent: "电子测量仪器", count: 4, available: 3,
        flowRule: { maximum: 168, borrowApproval: false, renewalAllowed: false, maxRenewals: 0, returnApproval: false, returnMode: "终端确认", studyRequired: true, studyMaterial: "信号发生器安全操作资料", examRequired: false, examPaper: "", noReturn: false },
        devices: [
          { title: "函数信号发生器 DG1022Z", code: "GEN-011", identifyType: "RFID", location: "A 柜 · 11 门", badge: "可借", badgeClass: "ok", meta: ["GEN-011 | RFID | A 柜 11 门", "固定不审批 | 当前在柜"], target: "09g-cabinet-device-detail", deviceDetailData: { name: "函数信号发生器", code: "GEN-011", state: "在柜", num: "11", cabinet: "A 柜", version: "RFID版" } },
          { title: "任意波形发生器 DG4162", code: "GEN-014", identifyType: "RFID", location: "A 柜 · 14 门", badge: "可借", badgeClass: "ok", meta: ["GEN-014 | RFID | A 柜 14 门", "固定不审批 | 当前在柜"], target: "09g-cabinet-device-detail", deviceDetailData: { name: "任意波形发生器", code: "GEN-014", state: "在柜", num: "14", cabinet: "A 柜", version: "RFID版" } }
        ]
      },
      {
        icon: "采", name: "数据采集模块", parent: "传感器与采集设备", count: 3, available: 3,
        flowRule: { maximum: 120, borrowApproval: false, renewalAllowed: false, maxRenewals: 0, returnApproval: false, returnMode: "终端确认", studyRequired: false, studyMaterial: "", examRequired: false, examPaper: "", noReturn: false },
        devices: [
          { title: "数据采集模块 USB-6211", code: "DAQ-006", identifyType: "RFID", location: "A 柜 · 12 门", badge: "可借", badgeClass: "ok", meta: ["DAQ-006 | RFID | A 柜 12 门", "固定不审批 | 当前在柜"], target: "09g-cabinet-device-detail", deviceDetailData: { name: "数据采集模块", code: "DAQ-006", state: "在柜", num: "12", cabinet: "A 柜", version: "RFID版" } }
        ]
      },
      {
        icon: "耗", name: "电子元器件耗材", parent: "工具与耗材", count: 126, available: 126,
        flowRule: { maximum: 0, borrowApproval: false, renewalAllowed: false, maxRenewals: 0, returnApproval: false, returnMode: "人工审核", studyRequired: false, studyMaterial: "", examRequired: false, examPaper: "", noReturn: true },
        devices: [
          { title: "基础电阻电容包", code: "CON-021", identifyType: "标签扫码", location: "耗材柜 · 01 门", badge: "可领用", badgeClass: "ok", meta: ["CON-021 | 标签扫码 | 耗材柜 01 门", "无需归还，按实际数量领用"], target: "09c-label-direct-device-detail" }
        ]
      }
    ];

    const deviceBorrowHistoryRecords = [
      { id: "ORD-20260724-018", deviceCode: "OSC-001", borrower: "张三", status: "借用中", date: "2026-07-24", daysAgo: 0, borrowedAt: "2026-07-24 14:02", returnAt: "预计 2026-07-24 18:00", location: "C 柜 · 03 门", mode: "标签扫码 · 审批后领取" },
      { id: "ORD-20260718-031", deviceCode: "OSC-001", borrower: "王五", status: "已归还", date: "2026-07-18", daysAgo: 6, borrowedAt: "2026-07-18 09:20", returnAt: "2026-07-18 16:35", location: "C 柜 · 03 门", mode: "标签扫码 · 按时归还" },
      { id: "ORD-20260629-012", deviceCode: "OSC-001", borrower: "赵倩", status: "已归还", date: "2026-06-29", daysAgo: 25, borrowedAt: "2026-06-29 10:16", returnAt: "2026-06-29 17:42", location: "C 柜 · 03 门", mode: "标签扫码 · 按时归还" },
      { id: "ORD-20260719-026", deviceCode: "GEN-011", borrower: "陈阳", status: "已归还", date: "2026-07-19", daysAgo: 5, borrowedAt: "2026-07-19 09:06", returnAt: "2026-07-19 17:18", location: "A 柜 · 11 门", mode: "RFID · 终端自动识别" },
      { id: "ORD-20260717-009", deviceCode: "GEN-011", borrower: "李四", status: "已归还", date: "2026-07-17", daysAgo: 7, borrowedAt: "2026-07-17 09:10", returnAt: "2026-07-17 16:48", location: "A 柜 · 11 门", mode: "RFID · 终端授权登录" },
      { id: "ORD-20260722-015", deviceCode: "GEN-014", borrower: "孙悦", status: "已归还", date: "2026-07-22", daysAgo: 2, borrowedAt: "2026-07-22 08:55", returnAt: "2026-07-22 18:06", location: "A 柜 · 14 门", mode: "RFID · 终端自动识别" },
      { id: "ORD-20260714-028", deviceCode: "GEN-014", borrower: "周航", status: "已归还", date: "2026-07-14", daysAgo: 10, borrowedAt: "2026-07-14 13:12", returnAt: "2026-07-14 17:30", location: "A 柜 · 14 门", mode: "RFID · 终端自动识别" },
      { id: "ORD-20260721-021", deviceCode: "DAQ-006", borrower: "顾思远", status: "已归还", date: "2026-07-21", daysAgo: 3, borrowedAt: "2026-07-21 10:05", returnAt: "2026-07-21 16:24", location: "A 柜 · 12 门", mode: "RFID · 终端自动识别" },
      { id: "ORD-20260708-014", deviceCode: "DAQ-006", borrower: "林晓月", status: "已归还", date: "2026-07-08", daysAgo: 16, borrowedAt: "2026-07-08 09:42", returnAt: "2026-07-08 15:51", location: "A 柜 · 12 门", mode: "RFID · 终端自动识别" },
      { id: "ORD-20260724-011", deviceCode: "PWR-012", borrower: "李四", status: "借用中", date: "2026-07-24", daysAgo: 0, borrowedAt: "2026-07-24 08:48", returnAt: "预计 2026-07-25 18:00", location: "A 柜 · 09 门", mode: "RFID · 终端授权登录" },
      { id: "ORD-20260703-037", deviceCode: "PWR-012", borrower: "吴晨", status: "已归还", date: "2026-07-03", daysAgo: 21, borrowedAt: "2026-07-03 09:15", returnAt: "2026-07-03 17:02", location: "A 柜 · 09 门", mode: "RFID · 终端自动识别" },
      { id: "ORD-20260720-033", deviceCode: "MET-016", borrower: "王五", status: "已归还", date: "2026-07-20", daysAgo: 4, borrowedAt: "2026-07-20 13:42", returnAt: "2026-07-20 17:31", location: "C 柜 · 05 门", mode: "标签扫码 · 免审批借用" }
    ];

    const abnormalDevices = minimumCategories.flatMap(category => category.devices
      .filter(device => device.badge === "异常")
      .map(device => ({
        ...device,
        meta: [`${category.parent} · ${category.name}`, ...device.meta]
      })));

    const adminHomeDashboard = {
      overview: { pendingApprovalCount: 1, approvedCount: 12, inStockDeviceCount: 21, borrowedDeviceCount: 5 },
      borrowApproval: { pendingCount: 1, latestApplicant: "张三", latestDeviceName: "数字示波器" },
      organizationReview: { pendingCount: 3, organization: "信息工程学院", latestApplicant: "林晓月", latestAt: "今天 14:26" },
      exceptions: { pendingCount: 2, deviceCount: 2, cabinetCount: 2 },
      abnormalDevice: { count: abnormalDevices.length, latest: abnormalDevices[0] || null }
    };

    const organizationApplications = [
      {
        id: "ORG-20260724-006",
        userId: "USR-STU-0318",
        status: "待审核",
        personType: "学生",
        name: "林晓月",
        gender: "女",
        studentNo: "2024210318",
        phone: "138****6721",
        college: "信息工程学院",
        major: "人工智能",
        className: "人工智能2401班",
        grade: "2024级",
        organization: "信息工程学院",
        reason: "需要使用学院开放实验室完成智能感知课程项目。",
        appliedAt: "今天 14:26"
      },
      {
        id: "ORG-20260724-005",
        userId: "USR-STU-0416",
        status: "待审核",
        personType: "学生",
        name: "周航",
        gender: "男",
        studentNo: "2023220416",
        phone: "156****3049",
        college: "信息工程学院",
        major: "电子信息工程",
        className: "电子信息2302班",
        grade: "2023级",
        organization: "信息工程学院",
        reason: "参与学院电子设计竞赛集训，需要预约相关实验设备。",
        appliedAt: "今天 11:08"
      },
      {
        id: "ORG-20260723-019",
        userId: "USR-STU-0527",
        status: "待审核",
        personType: "学生",
        name: "顾思远",
        gender: "男",
        studentNo: "2024210527",
        phone: "187****1185",
        college: "信息工程学院",
        major: "计算机科学与技术",
        className: "计算机2403班",
        grade: "2024级",
        organization: "信息工程学院",
        reason: "加入学院科创小组，申请使用公共实验空间。",
        appliedAt: "昨天 16:42"
      },
      {
        id: "ORG-20260722-013",
        userId: "USR-STU-0321",
        status: "已通过",
        personType: "学生",
        name: "唐可欣",
        gender: "女",
        studentNo: "2023220321",
        phone: "139****8402",
        college: "信息工程学院",
        major: "通信工程",
        className: "通信工程2301班",
        grade: "2023级",
        organization: "信息工程学院",
        reason: "参加通信系统综合实验课程。",
        appliedAt: "07-22 09:17",
        reviewedAt: "07-22 10:04"
      },
      {
        id: "ORG-20260721-008",
        userId: "USR-STU-0712",
        status: "已拒绝",
        personType: "学生",
        name: "孟雨泽",
        gender: "男",
        studentNo: "2024100712",
        phone: "151****9236",
        college: "机械工程学院",
        major: "机械电子工程",
        className: "机械电子2402班",
        grade: "2024级",
        organization: "信息工程学院",
        reason: "希望临时借用信息工程学院实验设备。",
        appliedAt: "07-21 15:33",
        reviewedAt: "07-21 16:10",
        reviewNote: "请补充指导教师信息后重新申请。"
      }
    ];

    const organizationMembers = [
      {
        id: "MEM-0001",
        userId: "USR-TEA-1086",
        personType: "教师",
        name: "王明",
        gender: "男",
        employeeNo: "T2021086",
        phone: "136****0927",
        department: "信息工程学院实验中心",
        organization: "信息工程学院",
        organizationRole: "管理员",
        joinedAt: "2025-09-01 08:30",
        removable: false
      },
      {
        id: "MEM-0042",
        userId: "USR-TEA-1128",
        personType: "教师",
        name: "陈思远",
        gender: "男",
        employeeNo: "T2021128",
        phone: "137****1580",
        department: "信息工程学院电子信息系",
        organization: "信息工程学院",
        organizationRole: "审批人",
        approvalCategories: ["示波器", "传感器实验套件"],
        joinedAt: "2026-04-08 10:16",
        removable: false
      },
      {
        id: "MEM-0043",
        userId: "USR-TEA-2046",
        personType: "教师",
        name: "许文博",
        gender: "男",
        employeeNo: "T2022046",
        phone: "159****7314",
        department: "工程训练中心",
        organization: "信息工程学院",
        organizationRole: "审批人",
        approvalCategories: ["万用表", "直流稳压电源"],
        joinedAt: "2026-05-12 14:40",
        removable: false
      },
      {
        id: "MEM-0038",
        userId: "USR-STU-0321",
        personType: "学生",
        name: "唐可欣",
        gender: "女",
        studentNo: "2023220321",
        phone: "139****8402",
        college: "信息工程学院",
        major: "通信工程",
        className: "通信工程2301班",
        grade: "2023级",
        organization: "信息工程学院",
        organizationRole: "普通成员",
        joinedAt: "2026-07-22 10:04",
        removable: true
      },
      {
        id: "MEM-0032",
        userId: "USR-STU-0412",
        personType: "学生",
        name: "庄园",
        gender: "女",
        studentNo: "2024210412",
        phone: "152****0868",
        college: "信息工程学院",
        major: "电子信息工程",
        className: "电子信息2402班",
        grade: "2024级",
        organization: "信息工程学院",
        organizationRole: "普通成员",
        joinedAt: "2026-06-18 14:22",
        removable: true
      },
      {
        id: "MEM-0029",
        userId: "USR-STU-0519",
        personType: "学生",
        name: "刘宝花",
        gender: "女",
        studentNo: "2023220519",
        phone: "185****2896",
        college: "信息工程学院",
        major: "人工智能",
        className: "人工智能2301班",
        grade: "2023级",
        organization: "信息工程学院",
        organizationRole: "普通成员",
        joinedAt: "2026-05-27 09:46",
        removable: true
      },
      {
        id: "MEM-0021",
        userId: "USR-STU-0617",
        personType: "学生",
        name: "李立杰",
        gender: "男",
        studentNo: "2022220617",
        phone: "186****4180",
        college: "信息工程学院",
        major: "计算机科学与技术",
        className: "计算机2203班",
        grade: "2022级",
        organization: "信息工程学院",
        organizationRole: "普通成员",
        joinedAt: "2026-03-12 16:05",
        removable: true
      },
      {
        id: "MEM-0041",
        userId: "USR-EXT-0026",
        personType: "其他人员",
        name: "赵启明",
        gender: "男",
        phone: "158****6026",
        unit: "校企联合创新中心",
        identityNo: "",
        usageNote: "参与学院联合实验项目。",
        organization: "信息工程学院",
        organizationRole: "普通成员",
        joinedAt: "2026-07-10 09:20",
        removable: true
      }
    ];

    const organizationUserDirectory = [
      { userId: "USR-TEA-1086", personType: "教师", name: "王明", gender: "男", employeeNo: "T2021086", phone: "136****0927", department: "信息工程学院实验中心" },
      { userId: "USR-STU-0321", personType: "学生", name: "唐可欣", gender: "女", studentNo: "2023220321", phone: "139****8402", college: "信息工程学院", major: "通信工程", className: "通信工程2301班", grade: "2023级" },
      { userId: "USR-STU-0318", personType: "学生", name: "林晓月", gender: "女", studentNo: "2024210318", phone: "138****6721", college: "信息工程学院", major: "人工智能", className: "人工智能2401班", grade: "2024级" },
      { userId: "USR-TEA-1128", personType: "教师", name: "陈思远", gender: "男", employeeNo: "T2021128", phone: "137****1580", department: "信息工程学院电子信息系" },
      { userId: "USR-TEA-2046", personType: "教师", name: "许文博", gender: "男", employeeNo: "T2022046", phone: "159****7314", department: "工程训练中心" },
      { userId: "USR-STU-0638", personType: "学生", name: "苏雨", gender: "女", studentNo: "2024220638", phone: "188****5042", college: "信息工程学院", major: "计算机科学与技术", className: "计算机2404班", grade: "2024级" },
      { userId: "USR-EXT-0089", personType: "其他人员", name: "周启航", gender: "男", phone: "133****6189", unit: "智能制造联合实验室", identityNo: "EXT-2026-0089", usageNote: "参与跨学院设备联合测试。" }
    ];

    const borrowApprovalRecords = [
      {
        id: "BR-20260724-018",
        date: "2026-07-24",
        category: "待审批",
        applicant: "张三",
        applicantRole: "学生",
        device: "数字示波器",
        code: "OSC-001",
        location: "实验楼 302 · C 柜 03 门",
        borrowedAt: "2026-07-24 14:00",
        returnAt: "2026-07-25 14:00",
        submittedAt: "今天 13:42",
        target: "04-borrow-approval-detail"
      },
      {
        id: "BR-20260724-017",
        date: "2026-07-24",
        category: "待审批",
        applicant: "周雨",
        applicantRole: "学生",
        device: "信号发生器",
        code: "SIG-008",
        location: "实验楼 302 · C 柜 08 门",
        borrowedAt: "2026-07-24 16:00",
        returnAt: "2026-07-26 16:00",
        submittedAt: "今天 12:18",
        target: "04-borrow-approval-detail"
      },
      {
        id: "BR-20260724-012",
        date: "2026-07-24",
        category: "待领取",
        applicant: "王五",
        applicantRole: "学生",
        device: "焊接工具套装",
        code: "TOOL-021",
        location: "实验楼 302 · B 柜 12 门",
        borrowedAt: "2026-07-24 15:30",
        returnAt: "2026-07-25 15:30",
        submittedAt: "今天 10:48",
        approvedAt: "今天 11:06",
        pickupDeadline: "今天 16:00"
      },
      {
        id: "BR-20260723-031",
        date: "2026-07-23",
        category: "待归还",
        applicant: "赵六",
        applicantRole: "研究生",
        device: "万用表套件",
        code: "MET-016",
        location: "实验楼 302 · C 柜 16 门",
        borrowedAt: "2026-07-23 09:00",
        returnAt: "2026-07-24 18:00",
        submittedAt: "昨天 08:36",
        pickedUpAt: "昨天 09:08",
        remaining: "剩余 3 小时"
      },
      {
        id: "BR-20260721-009",
        date: "2026-07-21",
        category: "逾期",
        applicant: "陈思",
        applicantRole: "学生",
        device: "温度传感器",
        code: "TEMP-004",
        location: "实验楼 302 · B 柜 04 门",
        borrowedAt: "2026-07-21 10:00",
        returnAt: "2026-07-22 10:00",
        submittedAt: "07-21 09:12",
        pickedUpAt: "07-21 10:06",
        overdue: "已逾期 2 天"
      },
      {
        id: "BR-20260723-026",
        date: "2026-07-23",
        category: "拒绝",
        applicant: "李四",
        applicantRole: "学生",
        device: "热像仪",
        code: "TH-003",
        location: "实验楼 302 · C 柜 21 门",
        borrowedAt: "2026-07-24 09:00",
        returnAt: "2026-07-24 17:00",
        submittedAt: "昨天 15:54",
        rejectedAt: "昨天 16:20"
      }
    ];

    function currentApproverCategories() {
      if (env.host.user?.teacherPermission !== "approver") return null;
      const user = env.host.user || {};
      const member = organizationMembers.find(item => item.userId === user.id || item.name === user.name);
      return member?.approvalCategories || [];
    }
    function inApproverCategory(item) {
      const categories = currentApproverCategories();
      if (!categories) return true;
      const name = item.device || item.entity || "";
      if (item.category === "柜机") return false;
      const category = inferDeviceCategory(name);
      return categories.includes(category) || categories.some(value => name.includes(value) || category.includes(value));
    }

    const createBorrowApprovalList = () => ({
      type: "borrowApprovalList",
      activeStatus: "待审批",
      statusFilters: ["待审批", "待领取", "待归还", "逾期", "拒绝"],
      exportStartDate: "2026-07-01",
      exportEndDate: "2026-07-24",
      searchPlaceholder: "搜索设备名、设备编号或借用人",
      items: borrowApprovalRecords.filter(item => item.category !== "待审批" || inApproverCategory(item)).map(item => ({ ...item }))
    });

    const exceptionManagementRecords = [
      {
        id: "EX-20260724-021",
        date: "2026-07-24",
        status: "待通过",
        category: "设备",
        entity: "数字示波器",
        code: "OSC-001",
        identifyType: "标签扫码",
        exceptionType: "设备损坏",
        location: "实验楼 302 · C 柜 03 门",
        reportSource: "张三",
        reportedAt: "今天 14:05",
        description: "设备开机后无波形输出，更换测试线后仍无法正常使用。"
      },
      {
        id: "EX-20260724-020",
        date: "2026-07-24",
        status: "待通过",
        category: "柜机",
        entity: "A 柜 03 门",
        code: "CAB-A-03",
        exceptionType: "柜门异常",
        location: "实验楼 302",
        reportSource: "系统",
        reportedAt: "今天 14:12",
        description: "柜门关闭后门磁持续显示未关闭，终端重复校验仍未恢复。"
      },
      {
        id: "EX-20260724-016",
        date: "2026-07-24",
        status: "待处理",
        category: "设备",
        entity: "传感器实验套件",
        code: "SEN-011",
        identifyType: "标签扫码",
        exceptionType: "设备缺失",
        location: "实验楼 305 · B 柜 02 门",
        reportSource: "陈老师",
        reportedAt: "今天 10:32",
        description: "套件中连接线缺失 1 根，异常已确认，等待补齐配件。"
      },
      {
        id: "EX-20260723-038",
        date: "2026-07-23",
        status: "待处理",
        category: "柜机",
        entity: "B 柜",
        code: "CAB-B01",
        exceptionType: "柜机离线",
        location: "实验楼 305",
        reportSource: "系统",
        reportedAt: "昨天 17:26",
        description: "柜机连续离线超过 10 分钟，等待现场检查网络和供电。"
      },
      {
        id: "EX-20260722-029",
        date: "2026-07-22",
        status: "已恢复",
        category: "设备",
        entity: "温度传感器",
        code: "TEMP-004",
        identifyType: "标签扫码",
        exceptionType: "放错柜位",
        location: "实验楼 302 · B 柜 04 门",
        reportSource: "系统",
        reportedAt: "07-22 15:42",
        description: "设备已重新放回绑定格口，柜机复核识别正常。"
      },
      {
        id: "EX-20260721-024",
        date: "2026-07-21",
        status: "已恢复",
        category: "柜机",
        entity: "A 柜 08 门",
        code: "CAB-A-08",
        exceptionType: "柜门异常",
        location: "实验楼 302",
        reportSource: "系统",
        reportedAt: "07-21 11:06",
        description: "门磁连接线重新固定后状态恢复，开关门测试通过。"
      },
      {
        id: "EX-20260723-033",
        date: "2026-07-23",
        status: "已驳回",
        category: "设备",
        entity: "信号发生器",
        code: "SIG-008",
        identifyType: "标签扫码",
        exceptionType: "设备损坏",
        location: "实验楼 302 · C 柜 08 门",
        reportSource: "王五",
        reportedAt: "昨天 15:31",
        description: "复核后设备工作正常，原异常由输出参数设置错误引起。"
      },
      {
        id: "EX-20260723-026",
        date: "2026-07-23",
        status: "已驳回",
        category: "柜机",
        entity: "B 柜 07 门",
        code: "CAB-B-07",
        exceptionType: "扫码异常",
        location: "实验楼 301",
        reportSource: "系统",
        reportedAt: "昨天 15:52",
        description: "重新扫码后识别正常，本次异常未复现。"
      }
    ];

    const createExceptionManagementList = () => ({
      type: "exceptionManagementList",
      activeStatus: "待通过",
      activeCategory: "设备",
      statusFilters: ["待通过", "待处理", "已恢复", "已驳回"],
      categoryFilters: ["设备", "柜机"],
      startDate: "2026-07-01",
      endDate: "2026-07-24",
      items: exceptionManagementRecords.filter(item => inApproverCategory(item))
    });

    const pages = [
      {
        id: "01-home", title: "首页", nav: "首页", noBack: true, actions: ["搜索", { label: "消息", target: "02-messages" }],
        blocks: [
          { type: "selector", text: "学校：智慧实验室示范校" },
          { type: "panel", className: "admin-home-overview", title: "今日运行概览", badge: "实时", meta: [
            { label: "待审批数", value: "1" },
            { label: "已审批数", value: "12" },
            { label: "在库设备数", value: "21" },
            { label: "已借出设备数量", value: "5" }
          ] },
          { type: "panel", title: "柜机状态摘要", meta: ["在线 / 离线 / 故障状态概览", "今日借出、归还数量摘要"], target: "10-cabinet-list" },
          { type: "list", title: "待处理任务", items: [
            { title: "借用审批", badge: "1 项待处理", badgeClass: "warn", meta: ["仅统计配置为需要审批的标签扫码设备", "RFID 和免审批标签设备不进入待办"], target: "03-admin-borrow-return", buttons: [{ label: "查看详情", target: "03-admin-borrow-return" }] },
            { title: "异常处理", badge: "2 项待处理", badgeClass: "bad", meta: ["设备异常 1 项", "柜机异常 1 项"], target: "17-admin-exception-process", buttons: [{ label: "查看详情", target: "17-admin-exception-process" }] }
          ]},
          { type: "panel", title: "重点提醒", meta: ["借用审核和异常处理从首页任务卡片进入", "归还结果由柜机终端同步；分类开启归还审核时进入审核队列"], target: "03-admin-borrow-return" }
        ]
      },
      {
        id: "02-messages", title: "我的消息",
        blocks: [
          { type: "panel", title: "消息内容", meta: ["暂未开放消息内容", "当前页面保留为空白占位"] }
        ]
      },
      {
        id: "03-admin-borrow-return", title: "借用审核",
        blocks: [
          createBorrowApprovalList()
        ]
      },
      {
        id: "03-todo", title: "待办列表", nav: "待办", noBack: true,
        blocks: [
          { type: "tabs", active: "待审批", items: ["待审批", "已通过", "已拒绝", "异常"] },
          { type: "list", items: [
            { title: "标签版借用审批", badge: "待处理", badgeClass: "warn", meta: ["只处理配置为需要审批的标签扫码设备"], target: "04-borrow-approval-detail", buttons: [{ label: "进入", target: "04-borrow-approval-detail" }] },
            { title: "异常待办", badge: "待通过", badgeClass: "bad", meta: ["归还识别失败、设备或柜机异常统一进入异常处理"], target: "17-admin-exception-process", buttons: [{ label: "异常处理", target: "17-admin-exception-process" }] }
          ]}
        ]
      },
      {
        id: "04-borrow-approval-detail", title: "借用审批详情", approvalUi: true, actionsBottom: [
          { label: "拒绝申请", confirmTitle: "处理完成", confirmText: "已拒绝该借用申请，并通知申请人查看结果。" },
          { label: "通过申请", confirmTitle: "处理完成", confirmText: "已通过该标签版借用申请，订单已进入待取用，可生成取出码或登录终端领取。" }
        ],
        blocks: [
          {
            type: "approvalSummary",
            status: "待审批",
            requestNo: "BR-20260721-018",
            submittedAt: "今天 13:42",
            applicant: "张三",
            applicantRole: "学生",
            applicantOrg: "电子创新实验室",
            device: "数字示波器",
            code: "OSC-001",
            deviceType: "电子测量仪器",
            identifyType: "标签扫码",
            quantity: "1 台",
            location: "C 柜 · 03 门",
            borrowAt: "今天 14:00",
            returnAt: "今天 18:00",
            duration: "4 小时"
          },
          { type: "approvalComment", title: "审批意见", placeholder: "填写审批意见（选填）", maxLength: 200 }
        ]
      },
      {
        id: "05-return-review-detail", title: "归还审核详情", actionsBottom: [
          { label: "驳回归还", confirmTitle: "处理完成", confirmText: "已驳回本次归还，请借用人按审核意见重新处理。" },
          { label: "通过归还", confirmTitle: "处理完成", confirmText: "已通过本次归还审核，订单状态更新为已完成。" }
        ],
        blocks: [
          { type: "panel", title: "归还信息", meta: ["归还设备：数字示波器 OSC-001", "设备识别方式：标签扫码", "归还时间：今天 17:42", "柜位：C 柜 03 门"] },
          { type: "panel", title: "分类规则", badge: "人工审核", badgeClass: "warn", meta: ["最小分类：示波器", "归还审核：开启 | 审核人：陈老师"] },
          { type: "list", title: "终端同步结果", items: [
            { title: "门磁：已关闭", badge: "正常", badgeClass: "ok" },
            { title: "标签识别：OSC-001", badge: "匹配", badgeClass: "ok" },
            { title: "归还结果：等待审核", badge: "待审核", badgeClass: "warn" }
          ]},
          { type: "textarea", text: "审核意见（选填）：填写通过或驳回说明" },
          { type: "panel", title: "异常信息", meta: ["当前无异常", "设备损坏、设备缺失（含配件缺失）或放错柜位时进入异常处理"], target: "17-admin-exception-process" }
        ]
      },
      {
        id: "07-order-detail", title: "订单详情",
        blocks: [
          { type: "panel", title: "订单 ORD-20260608-001", meta: ["状态：借用中", "借用人：张三", "设备：数字示波器 x1", "识别方式：标签扫码 | 需要审批", "柜位：C 柜 03 门"] },
          { type: "timeline", title: "流程节点", steps: ["提交标签版借用申请", "审批人审批通过", "订单进入待取用并生成取出码", "柜机终端扫码、识别设备并同步借用结果"] },
          { type: "panel", title: "备注与异常", meta: ["审批备注展示区", "异常记录为空时只显示占位状态"] },
          { type: "btnline", buttons: [{ label: "添加备注" }, { label: "手动关闭订单" }] }
        ]
      },
      {
        id: "08-device-list", title: "设备列表", nav: "设备", noBack: true, actions: [{ label: "添加设备", target: "08a-add-device" }],
        blocks: [
          { type: "search", text: "搜索最小分类" },
          { type: "minimumCategoryList", items: minimumCategories }
        ]
      },
      {
        id: "08a-add-device", title: "设备管理", actionsBottom: [{ label: "添加设备信息", target: "08h-add-device-info" }],
        blocks: [
          { type: "deviceManageTabs", active: "设备信息" },
          { type: "search", text: "搜索设备名称 / 规格型号" },
          { type: "deviceInfoCatalog", items: [
            { icon: "示", name: "数字示波器", category: "示波器", model: "DS1054Z / DS1104Z", identifyType: "标签扫码", source: "采购", purchaseDate: "2025-09-01", manual: "DS1054Z 使用说明书", imageIcon: "", deviceValue: "3999.00", measurementUnit: "台", stock: 6, bound: 3, pending: 3, target: "08i-edit-device-info" },
            { icon: "表", name: "数字万用表", category: "万用表", model: "UT61E+", identifyType: "标签扫码", source: "采购", purchaseDate: "2025-10-12", manual: "UT61E+ 使用说明书", imageIcon: "", deviceValue: "599.00", measurementUnit: "台", stock: 4, bound: 2, pending: 2, target: "08i-edit-device-info" },
            { icon: "感", name: "传感器实验套件", category: "传感器实验套件", model: "SENSOR-KIT-V2", identifyType: "标签扫码", source: "采购", purchaseDate: "2026-03-06", manual: "传感器实验套件指导书", imageIcon: "", deviceValue: "", measurementUnit: "套", stock: 3, bound: 2, pending: 1, target: "08i-edit-device-info" },
            { icon: "源", name: "直流稳压电源", category: "直流稳压电源", model: "DP832A", identifyType: "RFID", source: "采购", purchaseDate: "2025-08-20", manual: "DP832A 使用说明书", imageIcon: "", deviceValue: "4580.00", measurementUnit: "台", stock: 5, bound: 4, pending: 1, target: "08i-edit-device-info" }
          ]}
        ]
      },
      {
        id: "08f-device-stock", title: "设备管理",
        blocks: [
          { type: "deviceManageTabs", active: "设备库存" },
          { type: "search", text: "搜索设备名称" },
          { type: "deviceInventoryList", items: [
            { icon: "示", name: "数字示波器", model: "DS1054Z / DS1104Z", prefix: "OSC", total: 8, inStock: 6, bound: 3, pending: 3, outbound: 2, availableCodes: ["OSC-0004", "OSC-0005", "OSC-0006"], inTarget: "08j-device-stock-in", outTarget: "08l-device-stock-out" },
            { icon: "表", name: "数字万用表", model: "UT61E+", prefix: "MET", total: 5, inStock: 4, bound: 2, pending: 2, outbound: 1, availableCodes: ["MET-0003", "MET-0004"], inTarget: "08j-device-stock-in", outTarget: "08l-device-stock-out" },
            { icon: "感", name: "传感器实验套件", model: "SENSOR-KIT-V2", prefix: "SEN", total: 3, inStock: 3, bound: 2, pending: 1, outbound: 0, availableCodes: ["SEN-0003"], inTarget: "08j-device-stock-in", outTarget: "08l-device-stock-out" }
          ]}
        ]
      },
      {
        id: "08g-device-binding", title: "设备管理",
        blocks: [
          { type: "deviceManageTabs", active: "信息绑定" },
          { type: "deviceBindingList", active: "待绑定", items: [
            { code: "OSC-0004", name: "数字示波器", model: "DS1054Z", state: "待绑定", target: "08m-device-binding-detail" },
            { code: "OSC-0005", name: "数字示波器", model: "DS1054Z", state: "待绑定", target: "08m-device-binding-detail" },
            { code: "MET-0003", name: "数字万用表", model: "UT61E+", state: "待绑定", target: "08m-device-binding-detail" },
            { code: "SEN-0003", name: "传感器实验套件", model: "SENSOR-KIT-V2", state: "待绑定", target: "08m-device-binding-detail" },
            { code: "OSC-0001", name: "数字示波器", model: "DS1054Z", state: "已绑定", identifyType: "标签扫码", serial: "SN-DS1054Z-001", cabinet: "C 柜（标签版）", slot: "03 门", target: "08m-device-binding-detail" },
            { code: "GEN-0011", name: "函数信号发生器", model: "DG1022Z", state: "已绑定", identifyType: "RFID", serial: "SN-DG1022Z-011", cabinet: "A 柜（RFID版）", slot: "11 门", rfidTag: "EPC-GEN-011", target: "08m-device-binding-detail" }
          ]}
        ]
      },
      {
        id: "08h-add-device-info", title: "添加设备信息", actionsBottom: ["取消", { label: "保存设备信息", confirmTitle: "保存确认", confirmText: "确认添加该设备信息？借用审核和前置条件将继承所选最小分类。" }],
        blocks: [
          { type: "panel", title: "字段说明", meta: ["设备分类必须选择最小分类，借用审核和前置条件自动继承分类规则", "续借与归还审核暂未开放；设备图片、设备价值和计量单位均可不填"] },
          { type: "deviceInfoForm", mode: "add", categories: minimumCategories.map(item => item.name) }
        ]
      },
      {
        id: "08i-edit-device-info", title: "编辑设备信息", actionsBottom: ["取消", { label: "保存修改", confirmTitle: "保存确认", confirmText: "确认更新设备主数据信息？不会修改已生成的设备标签码。" }],
        blocks: [
          { type: "deviceInfoForm", mode: "edit", name: "数字示波器", category: "示波器", model: "DS1054Z / DS1104Z", identifyType: "标签扫码", source: "采购", purchaseDate: "2025-09-01", manual: "DS1054Z 使用说明书", imageIcon: "", deviceValue: "3999.00", measurementUnit: "台", categories: minimumCategories.map(item => item.name) },
          { type: "panel", title: "库存关联", meta: ["设备标签码共 8 个，其中在库 6 个、已出库 2 个", "修改设备信息不会改变最小分类规则和历史编码"] }
        ]
      },
      {
        id: "08j-device-stock-in", title: "设备入库", actionsBottom: ["取消", { label: "确认入库", target: "08k-device-stock-in-result" }],
        blocks: [
          { type: "inventoryInForm", device: "数字示波器", model: "DS1054Z", prefix: "OSC", currentTotal: 8, currentStock: 6, nextCode: "OSC-0009", quantity: 1 }
        ]
      },
      {
        id: "08k-device-stock-in-result", title: "入库完成", actionsBottom: [{ label: "返回设备库存", target: "08f-device-stock" }],
        blocks: [
          { type: "panel", title: "数字示波器入库成功", badge: "3 台", badgeClass: "ok", meta: ["库存状态：在库", "绑定状态：待绑定", "标签码永久唯一，不循环使用"] },
          { type: "generatedCodeList", title: "本次生成标签码", items: ["OSC-0009", "OSC-0010", "OSC-0011"] },
          { type: "panel", title: "下一步", meta: ["前往“信息绑定”搜索设备名称", "确认系统生成的唯一设备编码并绑定存放位置"] }
        ]
      },
      {
        id: "08l-device-stock-out", title: "设备出库", actionsBottom: ["取消", { label: "确认出库", confirmTitle: "出库确认", confirmText: "确认将已勾选的未绑定设备出库？出库后保留历史记录。" }],
        blocks: [
          { type: "panel", title: "数字示波器", badge: "3 台可出库", badgeClass: "info", meta: ["只显示在库且未绑定的设备", "已绑定、借用中和异常设备不能直接出库"] },
          { type: "inventoryOutSelect", items: [
            { code: "OSC-0004", createdAt: "2026-07-21 14:20" },
            { code: "OSC-0005", createdAt: "2026-07-21 14:20" },
            { code: "OSC-0006", createdAt: "2026-07-18 09:35" }
          ]}
        ]
      },
      {
        id: "08m-device-binding-detail", title: "信息绑定", blocks: []
      },
      {
        id: "08b-device-category-measure", title: "电子测量仪器",
        blocks: [
          { type: "search", text: "按设备名称搜索" },
          { type: "list", items: [
            { title: "数字示波器", badge: "借用中", badgeClass: "warn", meta: ["OSC-001 | 标签扫码 | 需要审批", "C 柜 03 门 | 借用人：张三"], target: "09-device-detail" },
            { title: "函数信号发生器", badge: "可借", badgeClass: "ok", meta: ["GEN-011 | RFID | 固定不审批", "A 柜 11 门 | 终端登录后取用"], target: "09b-rfid-device-detail" },
            { title: "数字万用表", badge: "可借", badgeClass: "ok", meta: ["MET-016 | 标签扫码 | 不需要审批", "C 柜 05 门 | 可直接获得取用权限"], target: "09c-label-direct-device-detail" }
          ]}
        ]
      },
      {
        id: "08c-device-category-sensor", title: "传感器套件",
        blocks: [
          { type: "search", text: "按设备名称搜索" },
          { type: "list", items: [
            { title: "传感器实验套件", badge: "异常", badgeClass: "bad", meta: ["SEN-011 | 标签扫码 | 需要审批", "待维修 | 当前不可借"], target: "09e-abnormal-device-detail" },
            { title: "数据采集模块", badge: "可借", badgeClass: "ok", meta: ["DAQ-006 | RFID | 固定不审批", "A 柜 12 门 | 当前在柜"], target: "09b-rfid-device-detail" }
          ]}
        ]
      },
      {
        id: "08d-device-category-power", title: "电源设备",
        blocks: [
          { type: "search", text: "按设备名称搜索" },
          { type: "list", items: [
            { title: "直流稳压电源", badge: "可借", badgeClass: "ok", meta: ["PWR-003 | 标签扫码 | 需要审批", "C 柜 08 门 | 当前在柜"], target: "09-device-detail" },
            { title: "可编程直流电源", badge: "借用中", badgeClass: "warn", meta: ["PWR-012 | RFID | 固定不审批", "A 柜 09 门 | 借用人：李四"], target: "09b-rfid-device-detail" }
          ]}
        ]
      },
      {
        id: "08e-device-category-tool", title: "工具器材",
        blocks: [
          { type: "search", text: "按设备名称搜索" },
          { type: "list", items: [
            { title: "焊接工具套装", badge: "可借", badgeClass: "ok", meta: ["TOOL-021 | 标签扫码 | 需要审批", "C 柜 01 门 | 配件清单随归还核对"], target: "09-device-detail" }
          ]}
        ]
      },
      {
        id: "09-device-detail", title: "设备详情", detailUi: true, actionsBottom: [{ label: "编辑设备", target: "09a-edit-device" }, { label: "标记异常", target: "18-device-exception-report", className: "danger" }, { label: "取出/归还码", target: "12-device-qr" }],
        blocks: [
          { type: "deviceHero", icon: "示", eyebrow: "电子测量仪器", title: "数字示波器", code: "OSC-001", state: "借用中", stateClass: "warn", tags: ["标签扫码", "C 柜 · 03 门"], metrics: [{ value: "168 小时", label: "最长时长" }, { value: "需要审批", label: "当前规则" }, { value: "张三", label: "借用人" }] },
          { type: "deviceInfo", icon: "档", title: "设备档案", rows: [["规格型号", "DS1054Z"], ["设备序列号", "SN-DS1054Z-001"], ["设备来源", "采购"], ["购入日期", "2025-09-01"]] },
          { type: "deviceInfo", icon: "柜", title: "识别与存放", target: "11c-label-cabinet-detail", rows: [["识别方式", "标签扫码"], ["设备标签码", "OSC-001"], ["存放柜机", "C 柜（标签版）"], ["所在格口", "03 门"]] },
          { type: "deviceInfo", icon: "资", title: "资料与备注", rows: [["关联说明书", "DS1054Z 使用说明书"], ["设备配件", "探头 2 根 · 电源线 1 根"], ["使用备注", "使用后整理探头并放回原位"]] },
          { type: "deviceInfo", icon: "借", title: "当前借用", rows: [["审批规则", "当前需要审批"], ["最长借用允许时长", "168 小时"], ["当前借用人", "张三"], ["取还方式", "取还码或终端登录"]] },
          { type: "deviceRecords", icon: "记", title: "最近借还", target: "06-device-borrow-history", items: [{ title: "张三领取设备", meta: "今天 14:02 · 预计今天 18:00 归还", status: "借用中" }, { title: "王五完成归还", meta: "2026-07-18 16:35 · 按时归还", status: "已完成" }] }
        ]
      },
      {
        id: "09b-rfid-device-detail", title: "设备详情", detailUi: true, actionsBottom: [{ label: "编辑设备", target: "09d-edit-rfid-device" }, { label: "标记异常", target: "18-device-exception-report", className: "danger" }],
        blocks: [
          { type: "deviceHero", icon: "RF", eyebrow: "电子测量仪器", title: "函数信号发生器", code: "GEN-011", state: "可借", tags: ["RFID", "A 柜 · 11 门"], metrics: [{ value: "168 小时", label: "最长时长" }, { value: "免审批", label: "借用审批" }, { value: "在柜", label: "识别状态" }] },
          { type: "deviceInfo", icon: "档", title: "设备档案", rows: [["规格型号", "DG1022Z"], ["设备序列号", "SN-DG1022Z-011"], ["设备来源", "采购"], ["购入日期", "2025-08-18"]] },
          { type: "deviceInfo", icon: "柜", title: "识别与存放", target: "11-cabinet-detail", rows: [["识别方式", "RFID"], ["RFID 标签", "EPC-GEN-011"], ["存放柜机", "A 柜（RFID版）"], ["所在格口", "11 门"]] },
          { type: "deviceInfo", icon: "资", title: "资料与备注", rows: [["关联说明书", "DG1022Z 使用说明书"], ["设备配件", "电源线 1 根 · 测试线 2 根"], ["使用备注", "连接测试线前确认输出关闭"]] },
          { type: "deviceInfo", icon: "取", title: "终端取还", rows: [["借用审批", "RFID 固定不审批"], ["最长借用允许时长", "168 小时"], ["取还入口", "扫码授权或终端本地登录"], ["状态确认", "关门后 RFID 自动识别"]] },
          { type: "deviceRecords", icon: "记", title: "最近借还", target: "06-device-borrow-history", items: [{ title: "设备归还入柜", meta: "2026-07-19 17:18 · RFID 识别一致", status: "已完成" }, { title: "李四领取设备", meta: "2026-07-17 09:10 · 终端授权登录", status: "已完成" }] }
        ]
      },
      {
        id: "09c-label-direct-device-detail", title: "设备详情", detailUi: true, actionsBottom: [{ label: "编辑设备", target: "09a-edit-device" }, { label: "标记异常", target: "18-device-exception-report", className: "danger" }, { label: "取出/归还码", target: "12-device-qr-direct" }],
        blocks: [
          { type: "deviceHero", icon: "表", eyebrow: "电子测量仪器", title: "数字万用表", code: "MET-016", state: "可借", tags: ["标签扫码", "C 柜 · 05 门"], metrics: [{ value: "168 小时", label: "最长时长" }, { value: "免审批", label: "当前规则" }, { value: "在柜", label: "设备状态" }] },
          { type: "deviceInfo", icon: "档", title: "设备档案", rows: [["规格型号", "UT61E+"], ["设备序列号", "SN-UT61E-016"], ["设备来源", "采购"], ["购入日期", "2025-09-03"]] },
          { type: "deviceInfo", icon: "柜", title: "识别与存放", target: "11c-label-cabinet-detail", rows: [["识别方式", "标签扫码"], ["设备标签码", "MET-016"], ["存放柜机", "C 柜（标签版）"], ["所在格口", "05 门"]] },
          { type: "deviceInfo", icon: "资", title: "资料与备注", rows: [["关联说明书", "UT61E+ 使用说明书"], ["设备配件", "表笔 2 根"], ["使用备注", "使用后放回格口收纳位"]] },
          { type: "deviceInfo", icon: "借", title: "借用规则", rows: [["借用审批", "当前不需要审批"], ["最长借用允许时长", "168 小时"], ["当前借用人", "无"], ["取用条件", "资格校验通过后直接取用"]] },
          { type: "deviceRecords", icon: "记", title: "最近借还", target: "06-device-borrow-history", items: [{ title: "设备完成归还", meta: "2026-07-20 17:31 · 标签识别一致", status: "已完成" }, { title: "王五领取设备", meta: "2026-07-20 13:42 · 无需人工审批", status: "已完成" }] }
        ]
      },
      {
        id: "09a-edit-device", title: "编辑信息绑定", actionsBottom: ["取消", { label: "保存修改", confirmTitle: "保存确认", confirmText: "确认更新该设备的序列号和存放位置？" }],
        blocks: [
          { type: "panel", title: "当前设备正在借用", badge: "不可解除绑定", badgeClass: "warn", meta: ["本页只编辑单台设备绑定信息", "设备名称、规格、图片等主数据请到“设备信息”中编辑"] },
          { type: "deviceBindingForm", code: "OSC-0001", name: "数字示波器", model: "DS1054Z", state: "已绑定", serial: "SN-DS1054Z-001", identifyType: "标签扫码", cabinet: "C 柜（标签版）", slot: "03 门" }
        ]
      },
      {
        id: "09d-edit-rfid-device", title: "编辑信息绑定", actionsBottom: [
          { label: "解除绑定", className: "danger", confirmTitle: "解除绑定确认", confirmText: "确认解除该设备与 RFID 标签、柜机格口的绑定？解除后设备恢复为待绑定并可出库。" },
          { label: "保存修改", confirmTitle: "保存确认", confirmText: "确认更新该设备的序列号、RFID 标签和存放位置？" }
        ],
        blocks: [
          { type: "panel", title: "单台设备绑定", badge: "RFID", badgeClass: "info", meta: ["设备名称、规格、图片等主数据请到“设备信息”中编辑", "设备标签码永久唯一，解除绑定后仍保留"] },
          { type: "deviceBindingForm", code: "GEN-0011", name: "函数信号发生器", model: "DG1022Z", state: "已绑定", serial: "SN-DG1022Z-011", identifyType: "RFID", cabinet: "A 柜（RFID版）", slot: "11 门", rfidTag: "EPC-GEN-011" }
        ]
      },
      {
        id: "09e-abnormal-device-detail", title: "设备详情", detailUi: true, abnormalUi: true, actions: [{ label: "编辑", target: "09a-edit-device" }], actionsBottom: [
          { label: "处理异常", exceptionRecordId: "EX-20260724-016" }
        ],
        blocks: [
          { type: "deviceHero", icon: "感", eyebrow: "传感器与采集设备", title: "传感器实验套件", code: "SEN-011", state: "异常", stateClass: "bad", tags: ["标签扫码", "B 柜 · 02 门"], metrics: [{ value: "设备缺失", label: "异常类型" }, { value: "待维修", label: "处理状态" }, { value: "不可借", label: "借用状态" }] },
          { type: "deviceAlert", title: "设备已暂停借用", badge: "待处理", text: "检测到配件缺失，设备已从可借清单中停用。补齐配件并完成现场核验后，才能恢复正常借用。", meta: [["异常编号", "EX-20260724-016"], ["确认时间", "今天 10:32"]] },
          { type: "deviceInfo", icon: "异", title: "当前异常", rows: [["异常类型", "设备缺失（配件缺失）"], ["异常说明", "连接线少 1 根"], ["确认人员", "陈老师"], ["确认时间", "今天 10:32"], ["处理意见", "缺少连接线 1 根，异常成立"], ["现场资料", "已上传 2 张照片"]] },
          { type: "deviceInfo", icon: "柜", title: "识别与存放", target: "11c-label-cabinet-detail", rows: [["识别方式", "标签扫码"], ["设备标签码", "SEN-011"], ["存放柜机", "B 柜（标签版）"], ["所在格口", "02 门"]] },
          { type: "deviceInfo", icon: "档", title: "设备档案", rows: [["规格型号", "SENSOR-KIT-V2"], ["设备来源", "采购"], ["购入日期", "2025-09-10"], ["关联说明书", "传感器实验套件操作手册"]] },
          { type: "deviceRecords", icon: "记", title: "最近处理记录", items: [{ title: "确认异常成立", meta: "陈老师 · 今天 10:32 · 配件缺失", status: "已确认" }, { title: "设备借用状态停用", meta: "系统自动更新设备履历并暂停取还权限", status: "已执行" }] }
        ]
      },
      {
        id: "10-cabinet-list", title: "柜机列表", nav: "柜机", noBack: true, actions: [{ label: "添加柜机", target: "10a-add-cabinet" }],
        blocks: [
          { type: "search", text: "搜索柜机名称 / 位置" },
          { type: "list", items: [
            { title: "A 柜", badges: [{ label: "在线", badgeClass: "ok" }, { label: "RFID版", badgeClass: "info" }], meta: ["实验楼 302", "柜门 32 | 设备 21 | 空闲 10 | 故障 1"], target: "11-cabinet-detail" },
            { title: "B 柜", badges: [{ label: "离线", badgeClass: "bad" }, { label: "标签版", badgeClass: "warn" }], meta: ["实验楼 305", "最后在线：13:20"], target: "11b-label-cabinet-detail" },
            { title: "C 柜", badges: [{ label: "在线", badgeClass: "ok" }, { label: "标签版", badgeClass: "warn" }], meta: ["实训中心 1F", "柜门 24 | 设备 12 | 空闲 12 | 故障 0"], target: "11c-label-cabinet-detail" }
          ]}
        ]
      },
      {
        id: "10a-add-cabinet", title: "添加柜机", actionsBottom: [
          "取消",
          { label: "扫描柜机激活码", target: "10b-bind-cabinet" }
        ],
        blocks: [
          { type: "panel", title: "第 1 步：实体柜机联网", badge: "柜机端完成", badgeClass: "info", meta: ["给柜机通电，在柜机安装调试页配置有线网络、Wi-Fi 或 4G", "柜机使用出厂设备身份主动连接服务器", "联网成功后，柜机屏幕显示激活二维码或激活码"] },
          { type: "panel", title: "第 2 步：扫描并绑定", badge: "小程序完成", badgeClass: "warn", meta: ["扫描柜机屏幕上的激活二维码", "系统自动读取柜机编号、版本、柜门数量和模块状态", "管理员只填写柜机名称、安装位置和所属实验室"] },
          { type: "panel", title: "安全边界", meta: ["小程序不填写柜机 IP、通信协议或锁控板地址", "锁控板地址属于柜机内部安装调试配置", "小程序不直接连接锁控板，也不提供远程开柜"] }
        ]
      },
      {
        id: "10b-bind-cabinet", title: "确认绑定柜机", actionsBottom: [
          "取消",
          { label: "绑定柜机", target: "10c-cabinet-online" }
        ],
        blocks: [
          { type: "panel", title: "激活码识别成功", badge: "已联网", badgeClass: "ok", meta: ["柜机已通过设备身份认证连接服务器", "本次激活码有效，可以绑定到当前管理范围"] },
          { type: "form", title: "系统自动读取", rows: [["柜机设备编号", "CAB-A01（只读）"], ["柜机版本", "RFID版（只读）"], ["柜门数量", "32 门（只读）"], ["固件版本", "Terminal 1.0.0（只读）"]] },
          { type: "panel", title: "联网与模块自检", meta: ["云端连接：在线", "设备身份认证：通过", "锁控板：正常，32 门已识别", "RFID 读写器：正常", "门磁状态：31 正常，1 待检查"] },
          { type: "form", title: "管理员填写", rows: [["柜机名称 *", "A 柜"], ["安装位置 *", "实验楼 302"], ["所属实验室 *", "电子创新实验室"], ["启用状态", "绑定后启用"]] },
          { type: "textarea", text: "安装备注（选填）：填写施工、网络或柜门检查说明" },
          { type: "panel", title: "绑定后控制方式", meta: ["业务请求先由服务器校验，再发送给柜机终端", "柜机终端通过内部总线控制锁控板并回传执行结果", "当前小程序只管理授权、状态和记录，不直接下发开柜指令"] }
        ]
      },
      {
        id: "10c-cabinet-online", title: "柜机绑定完成", actionsBottom: [
          { label: "查看柜机", target: "11-cabinet-detail" },
          { label: "返回柜机列表", target: "10-cabinet-list" }
        ],
        blocks: [
          { type: "panel", title: "A 柜已添加", badge: "在线", badgeClass: "ok", meta: ["柜机设备编号：CAB-A01", "柜机版本：RFID版", "安装位置：实验楼 302", "所属实验室：电子创新实验室"] },
          { type: "timeline", title: "接入结果", steps: ["实体柜机完成联网", "设备身份认证通过", "管理员扫描激活码", "柜机绑定到实验室", "心跳和模块状态开始同步"] },
          { type: "panel", title: "下一步", meta: ["检查异常门位并完成现场验收", "在设备管理中将 RFID 设备绑定到该柜机空闲格口", "柜机离线时停止下发新的现场操作任务"] }
        ]
      },
      {
        id: "11-cabinet-detail", title: "柜机详情：A 柜", actionsBottom: [{ label: "标记异常", target: "18-cabinet-exception-report", className: "danger" }],
        blocks: [
          {
            type: "cabinetStatus",
            name: "A 柜",
            code: "CAB-A01",
            location: "实验楼 302",
            version: "RFID版",
            status: "在线",
            tone: "online",
            metrics: [["柜门总数", "32"], ["当前设备", "21"], ["空闲格口", "10"], ["异常门", "1", "danger"]],
            activityLabel: "最近操作",
            activity: "今天 14:12"
          },
          { type: "slotDevices", title: "格口与设备", cabinet: "A 柜", version: "RFID版", slots: [
            { num: "01", name: "数字示波器", code: "OSC-101", state: "在柜", cls: "used" },
            { num: "02", name: "函数信号发生器", code: "GEN-102", state: "在柜", cls: "used" },
            { num: "03", name: "设备识别异常", code: "RFID 标签未识别", state: "故障", cls: "bad" },
            { num: "04", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "05", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "06", name: "数字万用表", code: "MET-106", state: "借出", cls: "out" },
            { num: "07", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "08", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "09", name: "逻辑分析仪", code: "LOG-109", state: "在柜", cls: "used" },
            { num: "10", name: "频谱分析仪", code: "SPA-110", state: "在柜", cls: "used" },
            { num: "11", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "12", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "13", name: "LCR 测试仪", code: "LCR-113", state: "在柜", cls: "used" },
            { num: "14", name: "电子负载", code: "LOAD-114", state: "在柜", cls: "used" },
            { num: "15", name: "数字示波器", code: "OSC-115", state: "在柜", cls: "used" },
            { num: "16", name: "信号发生器", code: "GEN-116", state: "在柜", cls: "used" },
            { num: "17", name: "数字万用表", code: "MET-117", state: "在柜", cls: "used" },
            { num: "18", name: "可编程直流电源", code: "PWR-118", state: "在柜", cls: "used" },
            { num: "19", name: "数据采集模块", code: "DAQ-119", state: "在柜", cls: "used" },
            { num: "20", name: "温度传感器套件", code: "SEN-120", state: "在柜", cls: "used" },
            { num: "21", name: "电流探头", code: "PROBE-121", state: "在柜", cls: "used" },
            { num: "22", name: "功率分析仪", code: "PWRM-122", state: "在柜", cls: "used" },
            { num: "23", name: "绝缘电阻测试仪", code: "INS-123", state: "在柜", cls: "used" },
            { num: "24", name: "接地电阻测试仪", code: "GND-124", state: "在柜", cls: "used" },
            { num: "25", name: "电能质量分析仪", code: "PQA-125", state: "在柜", cls: "used" },
            { num: "26", name: "数字电桥", code: "BRG-126", state: "在柜", cls: "used" },
            { num: "27", name: "频率计", code: "FREQ-127", state: "在柜", cls: "used" },
            { num: "28", name: "校准信号源", code: "CAL-128", state: "在柜", cls: "used" },
            { num: "29", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "30", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "31", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "32", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" }
          ] }
        ]
      },
      {
        id: "11b-label-cabinet-detail", title: "柜机详情：B 柜", actionsBottom: [{ label: "处理异常", exceptionRecordId: "EX-20260723-038" }],
        blocks: [
          {
            type: "cabinetStatus",
            name: "B 柜",
            code: "CAB-B01",
            location: "实验楼 305",
            version: "标签版",
            status: "离线",
            tone: "offline",
            metrics: [["柜门总数", "16"], ["当前设备", "9"], ["空闲格口", "6"], ["异常门", "1", "danger"]],
            activityLabel: "最后在线",
            activity: "今天 13:20"
          },
          { type: "slotDevices", title: "格口与设备", cabinet: "B 柜", version: "标签版", slots: [
            { num: "01", name: "数字示波器", code: "OSC-201", state: "在柜", cls: "used" },
            { num: "02", name: "传感器实验套件", code: "SEN-011", state: "异常", cls: "bad" },
            { num: "03", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "04", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "05", name: "数字万用表", code: "MET-205", state: "在柜", cls: "used" },
            { num: "06", name: "柜门通信异常", code: "当前格口暂停使用", state: "故障", cls: "bad" },
            { num: "07", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "08", name: "直流稳压电源", code: "PWR-208", state: "在柜", cls: "used" },
            { num: "09", name: "传感器实验套件", code: "SEN-209", state: "在柜", cls: "used" },
            { num: "10", name: "数据采集模块", code: "DAQ-210", state: "在柜", cls: "used" },
            { num: "11", name: "焊接工具套装", code: "TOOL-211", state: "在柜", cls: "used" },
            { num: "12", name: "逻辑分析仪", code: "LOG-212", state: "在柜", cls: "used" },
            { num: "13", name: "可编程电源", code: "PWR-213", state: "借出", cls: "out" },
            { num: "14", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "15", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "16", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" }
          ] }
        ]
      },
      {
        id: "11c-label-cabinet-detail", title: "柜机详情：C 柜", actionsBottom: [{ label: "标记异常", target: "18-cabinet-exception-report", className: "danger" }],
        blocks: [
          {
            type: "cabinetStatus",
            name: "C 柜",
            code: "CAB-C01",
            location: "实训中心 1F",
            version: "标签版",
            status: "在线",
            tone: "online",
            metrics: [["柜门总数", "24"], ["当前设备", "12"], ["空闲格口", "12"], ["异常门", "0"]],
            activityLabel: "最近操作",
            activity: "今天 14:05"
          },
          { type: "slotDevices", title: "格口与设备", cabinet: "C 柜", version: "标签版", slots: [
            { num: "01", name: "数字示波器", code: "OSC-001", state: "在柜", cls: "used" },
            { num: "02", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "03", name: "函数信号发生器", code: "GEN-011", state: "在柜", cls: "used" },
            { num: "04", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "05", name: "数字万用表", code: "MET-016", state: "在柜", cls: "used" },
            { num: "06", name: "直流稳压电源", code: "PWR-003", state: "借出", cls: "out" },
            { num: "07", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "08", name: "数据采集终端", code: "DAT-008", state: "在柜", cls: "used" },
            { num: "09", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "10", name: "数据采集模块", code: "DAQ-006", state: "在柜", cls: "used" },
            { num: "11", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "12", name: "焊接工具套装", code: "TOOL-021", state: "在柜", cls: "used" },
            { num: "13", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "14", name: "逻辑分析仪", code: "LOG-014", state: "在柜", cls: "used" },
            { num: "15", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "16", name: "可编程直流电源", code: "PWR-012", state: "在柜", cls: "used" },
            { num: "17", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "18", name: "电子负载", code: "LOAD-018", state: "在柜", cls: "used" },
            { num: "19", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "20", name: "频率计", code: "FREQ-020", state: "在柜", cls: "used" },
            { num: "21", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "22", name: "功率分析仪", code: "PWRM-022", state: "在柜", cls: "used" },
            { num: "23", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" },
            { num: "24", name: "暂无设备", code: "未绑定设备", state: "空闲", cls: "empty" }
          ] }
        ]
      },
      {
        id: "12-device-qr", title: "标签版取还码", actionsBottom: ["取消", "生成二维码"],
        blocks: [
          { type: "panel", title: "设备授权", meta: ["设备：数字示波器 OSC-001", "设备识别方式：标签扫码", "借用规则：需要审批 | 当前审批：已通过", "柜机/格位：C 柜 03 门", "授权类型：取出码 / 归还码", "有效时间：15 分钟"] },
          { type: "form", rows: [["二维码类型", "取出码 / 归还码"], ["使用方式", "到柜机终端扫码"], ["开柜执行端", "柜机终端"], ["小程序权限", "只生成授权码，不直接开柜"]] },
          { type: "qrcode", title: "标签版设备取出 / 归还二维码", text: "终端扫码校验授权后进入对应设备的现场取还流程。" },
          { type: "panel", title: "操作说明", meta: ["需要审批的标签设备仅在审批通过后生成取用码", "不需要审批的标签设备在资格校验通过后直接生成取用码", "RFID 设备不显示本页面", "柜机终端完成扫码、开柜、标签识别、关门确认和状态同步"] }
        ]
      },
      {
        id: "12-device-qr-direct", title: "标签版取还码", actionsBottom: ["取消", "生成二维码"],
        blocks: [
          { type: "panel", title: "设备授权", meta: ["设备：数字万用表 MET-016", "设备识别方式：标签扫码", "借用规则：不需要审批 | 资格校验：已通过", "柜机/格位：C 柜 05 门", "授权类型：取出码 / 归还码", "有效时间：15 分钟"] },
          { type: "form", rows: [["二维码类型", "取出码 / 归还码"], ["使用方式", "到柜机终端扫码"], ["审批任务", "不生成"], ["小程序权限", "只生成授权码，不直接开柜"]] },
          { type: "qrcode", title: "标签版设备取出 / 归还二维码", text: "资格校验通过后直接生成，终端扫码后进入现场取还流程。" },
          { type: "panel", title: "操作说明", meta: ["该设备配置为不需要借用审核", "资格校验通过后直接进入待取用并允许生成取用码", "归还结果按最小分类的归还审核规则执行"] }
        ]
      },
      {
        id: "17-admin-exception-process", title: "异常处理",
        blocks: [
          createExceptionManagementList()
        ]
      },
      {
        id: "18-device-exception-report", title: "标记设备异常", actionsBottom: [
          "取消",
          { label: "提交异常", className: "danger", confirmTitle: "提交确认", confirmText: "确认提交该设备异常？提交后设备将暂停正常借用并进入异常处理。" }
        ],
        blocks: [
          { type: "panel", title: "设备信息", meta: ["设备：数字示波器 OSC-001", "所在柜位：C 柜 03 门", "当前状态：借用中"] },
          { type: "choiceList", title: "异常类型 *", active: "设备损坏", items: [
            { title: "设备损坏", description: "无法正常使用，或外观、功能发生损坏" },
            { title: "设备缺失", description: "设备、配件或附件未找到，包括配件缺失" },
            { title: "放错柜位", description: "实际所在柜机或格口与系统记录不一致" }
          ]},
          { type: "textarea", text: "异常说明（必填）：描述损坏情况、缺失内容或实际柜位" },
          { type: "upload", text: "上传现场图片或视频（选填）" },
          { type: "panel", title: "提交影响", meta: ["提交后设备暂停正常借用", "异常记录进入管理员或审批人确认队列", "处理完成后可恢复设备正常状态"] },
          { type: "modal", title: "提交确认", text: "确认提交该设备异常？提交后设备将暂停正常借用并进入异常处理。" }
        ]
      },
      {
        id: "18-exception-detail", title: "设备异常详情", exceptionReviewUi: true, actionsBottom: [
          { label: "驳回异常", className: "exception-reject", confirmTitle: "处理完成", confirmText: "已驳回该设备异常记录，并保留处理意见。" },
          { label: "确认异常", className: "exception-confirm", confirmTitle: "处理完成", confirmText: "已确认该设备异常，设备状态和履历已同步更新。" }
        ],
        blocks: [
          {
            type: "exceptionReviewSummary",
            layout: "device",
            status: "待确认",
            category: "设备异常",
            icon: "示",
            exceptionType: "设备损坏",
            entity: "数字示波器",
            code: "OSC-001",
            deviceType: "电子测量仪器",
            identifyType: "标签扫码",
            location: "C 柜 · 03 门",
            reportSource: "张三",
            reportedAt: "今天 14:05",
            description: "设备开机后无波形输出，更换测试线后现象仍然存在，暂时无法正常使用。"
          },
          {
            type: "exceptionEvidence",
            title: "现场资料",
            badge: "2 项",
            items: [{ kind: "图片", title: "设备正面与接口", meta: "JPG · 1.8 MB" }, { kind: "视频", title: "开机故障现象", meta: "MP4 · 12 秒" }]
          },
          { type: "exceptionReviewComment", title: "处理意见", placeholder: "填写确认或驳回说明（选填）" }
        ]
      },
      {
        id: "18-cabinet-exception-report", title: "标记柜机异常", actionsBottom: [
          "取消",
          { label: "提交异常", className: "danger", confirmTitle: "提交确认", confirmText: "确认提交该柜机异常？提交后异常记录将进入确认队列。" }
        ],
        blocks: [
          { type: "panel", title: "柜机信息", meta: ["柜机：A 柜", "柜机版本：RFID版", "安装位置：实验楼 302", "当前状态：在线"] },
          { type: "choiceList", title: "异常类型 *", active: "柜门异常", items: [
            { title: "柜机离线", description: "柜机无法连接服务器" },
            { title: "柜门异常", description: "无法开门、无法关门或门磁状态异常" },
            { title: "扫码异常", description: "RFID 或设备标签码无法识别" }
          ]},
          { type: "form", rows: [["相关柜门（选填）", "柜门或扫码异常时选择具体门号"]] },
          { type: "textarea", text: "异常说明（必填）：描述离线情况、柜门问题或扫码现象" },
          { type: "upload", text: "上传现场图片、视频或终端截图（选填）" },
          { type: "panel", title: "提交影响", meta: ["异常记录进入管理员或审批人确认队列", "确认异常后暂停受影响柜机或柜门的正常取还", "处理完成后恢复柜机或柜门正常状态"] },
          { type: "modal", title: "提交确认", text: "确认提交该柜机异常？提交后异常记录将进入确认队列。" }
        ]
      },
      {
        id: "18a-cabinet-exception-detail", title: "柜门异常详情", exceptionReviewUi: true, actionsBottom: [
          { label: "驳回异常", className: "exception-reject", confirmTitle: "处理完成", confirmText: "已驳回该柜机异常记录，并保留处理意见。" },
          { label: "确认异常", className: "exception-confirm", confirmTitle: "处理完成", confirmText: "已确认该柜机异常，相关柜门状态已更新。" }
        ],
        blocks: [
          {
            type: "exceptionReviewSummary",
            layout: "cabinet",
            status: "待确认",
            category: "柜机异常",
            icon: "门",
            exceptionType: "柜门异常",
            entity: "A 柜",
            code: "CAB-A-03",
            cabinetVersion: "RFID版",
            location: "实验楼 302",
            door: "03 门",
            reportSource: "系统",
            reportedAt: "今天 14:12",
            description: "03 门关闭后门磁状态持续显示未关闭，终端重试校验后仍未恢复。"
          },
          {
            type: "exceptionEvidence",
            title: "终端上报资料",
            badge: "2 项",
            items: [{ kind: "截图", title: "柜门状态截图", meta: "PNG · 今天 14:12" }, { kind: "日志", title: "门磁校验日志", meta: "LOG · 3 次失败" }]
          },
          { type: "exceptionReviewComment", title: "处理意见", placeholder: "填写确认或驳回说明（选填）" }
        ]
      },
      {
        id: "18c-cabinet-exception-result", title: "柜机异常处理结果",
        blocks: [
          { type: "panel", title: "异常信息", meta: ["类型：扫码异常", "柜机：B 柜", "柜门：07 门", "上报来源：系统", "发生时间：昨天 15:52"] },
          { type: "panel", title: "处理结果", badge: "已驳回", meta: ["处理人：陈老师", "处理时间：昨天 16:08", "处理意见：重新扫码后识别正常，本次异常不成立"] },
          { type: "panel", title: "当前状态", meta: ["柜门状态：正常", "柜门继续参与正常取还流程", "本记录已处理，不再显示确认或驳回按钮"] }
        ]
      },
      {
        id: "19-notice-list", title: "公告管理", actions: [{ label: "发布公告", target: "20-new-notice" }],
        blocks: [
          { type: "filterList", active: "全部", filters: ["全部", "已发布", "草稿"], emptyText: "当前状态下暂无公告", items: [
            { category: "已发布", title: "实验室设备维护安排", badge: "已发布", badgeClass: "ok", meta: ["发布时间：今天 09:30 | 发布人：王明"] },
            { category: "草稿", title: "暑期开放时间调整", badge: "草稿", meta: ["最后保存：昨天 17:20"], target: "20-new-notice", buttons: [{ label: "编辑", target: "20-new-notice" }] }
          ]}
        ]
      },
      {
        id: "20-new-notice", title: "发布公告", actionsBottom: [
          { label: "保存草稿", confirmTitle: "草稿已保存", confirmText: "公告已保存到草稿，可稍后继续编辑和发布。" },
          { label: "立即发布", confirmTitle: "发布确认", confirmText: "确认发布公告？发布后将在小程序公告中展示。" }
        ],
        blocks: [
          { type: "form", rows: [["公告标题", "请输入标题"], ["是否置顶", "否"]] },
          { type: "textarea", text: "公告正文" },
          { type: "upload", text: "附件/图片（可选）" },
          { type: "modal", title: "发布确认", text: "确认发布公告？发布后将在小程序公告中展示。" }
        ]
      },
      {
        id: "22-profile", title: "个人", nav: "个人", noBack: true,
        blocks: [
          { type: "profile", name: "王明", role: "管理员" },
          { type: "organizationIdentity", organization: "信息工程学院", typeLabel: "学院组织", memberCount: organizationMembers.length },
          { type: "menu", items: [{ label: "账号与安全", value: "登录密码与账号安全", target: "22a-account-security" }, { label: "组织人员", value: `${organizationMembers.length} 名成员 · 设置审批人`, target: "23-organization-members" }, { label: "公告管理", value: "查看草稿和发布公告", target: "19-notice-list" }, { label: "帮助与反馈", value: "问题反馈与使用帮助" }, { label: "退出登录", value: "" }] }
        ]
      },
      {
        id: "22a-account-security", title: "账号与安全",
        blocks: [
          { type: "accountSecurity", phone: "138****3900" },
          { type: "menu", items: [{ label: "修改密码", value: "通过原密码修改，或用手机号找回", target: "22b-change-password" }] },
          { type: "panel", title: "密码使用说明", meta: ["本页将进入统一账号密码页面", "忘记原密码时请使用绑定手机号找回；终端密码同步方式待确认"] }
        ]
      },
      {
        id: "22b-change-password", title: "修改密码", actionsBottom: ["返回"],
        blocks: [
          { type: "panel", title: "统一密码页面", meta: ["请从账号与安全进入共用的修改密码页面。"] }
        ]
      }
    ];

    const pageRemarks = {
      "01-home": "页面说明：首页顶部只读展示待审批数、已审批数、在库设备数和已借出设备数量，并展示柜机状态与待处理任务；借用与归还是否审核由最小分类规则决定。",
      "02-messages": "页面说明：我的消息页，当前保留为空白占位页，不展示任务内容。",
      "03-admin-borrow-return": "页面说明：借用审核记录页按待审批、待领取、待归还、逾期和拒绝分类，可按设备名、设备编号或借用人搜索；列表不显示日期选择，点击“导出记录”后在弹窗中选择起止日期并按当前状态和搜索条件导出；待审批卡片默认支持单条通过、驳回，点击“批量管理”后才显示勾选框和底部批量操作栏，卡片点击改为选择或取消选择；其他状态由卡片直接完整展示且不显示处理意见或拒绝原因。",
      "03-todo": "页面说明：待办列表处理借用审核、归还审核和异常；是否进入审核队列由最小分类规则决定。",
      "04-borrow-approval-detail": "页面说明：标签版借用审批详情，按借用人、设备与位置、借用时间拆分为大字号信息卡，底部可填写选填的审批意见，并完成通过或拒绝。",
      "05-return-review-detail": "页面说明：归还记录详情展示柜机终端同步结果；分类开启归还审核时补充审核模式、审核人与处理结果。",
      "06-device-borrow-history": "页面说明：从设备详情进入，只展示当前设备的借还历史，并支持按日期范围筛选。",
      "07-order-detail": "页面说明：订单详情，查看流程节点、评论备注和异常记录。",
      "08-device-list": "页面说明：设备列表展示最小分类及设备数量；点击分类后，设备卡片突出名称、唯一编号、存放位置、识别方式和当前状态，不显示规则解释或借用引导文案。",
      "08a-add-device": "页面说明：设备管理默认进入设备信息，设备信息选择最小分类并继承该分类规则。",
      "08f-device-stock": "页面说明：设备库存按设备名称汇总累计入库、在库、已绑定、待绑定和已出库数量，并进入入库或按标签码出库。",
      "08g-device-binding": "页面说明：信息绑定默认只显示待绑定标签码，可切换全部并按设备名称搜索，点击标签码进入绑定或编辑。",
      "08h-add-device-info": "页面说明：添加设备信息，设备名称、最小分类、规格型号和识别方式必填；设备图片、设备价值、计量单位、来源、购入日期和关联说明书可选填。",
      "08i-edit-device-info": "页面说明：编辑设备名称、最小分类、规格型号和识别方式；设备图片、设备价值、计量单位、来源、购入日期和关联说明书可选填。",
      "08j-device-stock-in": "页面说明：选择入库数量后批量创建单台设备，按设备前缀和四位递增序号生成永久唯一标签码。",
      "08k-device-stock-in-result": "页面说明：展示本次入库生成的全部标签码；新设备状态为在库、待绑定。",
      "08l-device-stock-out": "页面说明：出库必须多选具体标签码，只展示在库、待绑定且未出库设备，出库后保留设备及审计历史。",
      "08m-device-binding-detail": "页面说明：展示系统生成的唯一设备编码和设备名称，可填写设备序列号，并维护实验室、柜机、格口等存放位置信息。",
      "08b-device-category-measure": "页面说明：电子测量仪器列表，展示该分类下全部设备，点击设备进入设备详情。",
      "08c-device-category-sensor": "页面说明：传感器套件列表，展示该分类下全部设备，点击设备进入设备详情。",
      "08d-device-category-power": "页面说明：电源设备列表，展示该分类下全部设备，点击设备进入设备详情。",
      "08e-device-category-tool": "页面说明：工具器材列表，展示该分类下全部设备，点击设备进入设备详情。",
      "09-device-detail": "页面说明：正式投用版设备详情。顶部集中呈现设备身份、状态、柜位与规则摘要，下方按档案、识别存放、资料、当前借用和最近记录分组展示；点击借还记录只查看当前设备历史。",
      "09b-rfid-device-detail": "页面说明：正式投用版 RFID 设备详情。顶部突出在柜状态和 RFID 识别信息，下方展示档案、柜机格口、资料与当前设备借还记录，不提供取还码入口。",
      "09c-label-direct-device-detail": "页面说明：正式投用版标签设备详情。顶部突出设备状态、柜位和免审批规则，下方展示档案、标签信息、资料与当前设备借还记录。",
      "09a-edit-device": "页面说明：从设备详情进入单台标签设备绑定编辑，仅修改序列号、识别方式和柜机格口；借用中的设备不能解除绑定。",
      "09d-edit-rfid-device": "页面说明：从设备详情进入单台 RFID 设备绑定编辑，可修改序列号、RFID 标签和 RFID版柜机格口，并在设备空闲正常时解除绑定。",
      "09e-abnormal-device-detail": "页面说明：异常设备详情统一展示异常结论、确认人员、处理意见、柜位档案和最近记录；底部“处理异常”进入统一异常详情完成恢复。",
      "10-cabinet-list": "页面说明：柜机列表只展示在线状态、柜机版本和基础统计；点击卡片进入详情，右上角可添加柜机。",
      "10a-add-cabinet": "页面说明：添加柜机前先在实体柜机完成联网，再扫描柜机屏幕上的激活码进入绑定流程。",
      "10b-bind-cabinet": "页面说明：扫描激活码后自动读取柜机编号、版本、柜门数量、固件和模块状态，管理员只填写名称、位置和所属实验室。",
      "10c-cabinet-online": "页面说明：柜机绑定完成，展示设备身份认证、实验室绑定和在线同步结果。",
      "11-cabinet-detail": "页面说明：A 柜 RFID版详情，顶部横向展示每 10 个格口分组，点击分组后在下方显示对应设备列表。",
      "11b-label-cabinet-detail": "页面说明：B 柜标签版异常详情，顶部横向展示每 10 个格口分组，点击分组后在下方显示对应设备列表；底部“处理异常”进入统一异常详情完成恢复。",
      "11c-label-cabinet-detail": "页面说明：C 柜标签版详情，顶部横向展示每 10 个格口分组，点击分组后在下方显示对应设备列表。",
      "12-device-qr": "页面说明：标签版取还码页，需要审批的设备通过后才能生成取用码，不需要审批的设备通过资格校验后可直接生成；RFID 不显示本页。",
      "12-device-qr-direct": "页面说明：免借用审核标签设备取还码页，资格校验通过后直接生成取用码；归还按最小分类规则执行。",
      "16a-edit-approver": "页面说明：从组织成员详情设置审批人或修改审批范围；借用、归还和异常审批权限自动拥有，页面只选择负责的最小分类；未选择时按钮显示全选，选择任意分类后切换为取消选择。",
      "17-admin-exception-process": "页面说明：异常处理与当前异常对象合并展示，支持日期范围、待通过、待处理、已恢复、已驳回状态及设备、柜机分类；待通过卡片默认支持单条通过、驳回，点击“批量管理”后才显示勾选框和底部批量操作栏，卡片点击改为选择或取消选择。",
      "18-device-exception-report": "页面说明：从设备详情标记异常，先选择设备损坏、设备缺失或放错柜位，再填写说明并提交异常记录。",
      "18-exception-detail": "页面说明：设备异常详情按异常状态、异常设备、上报信息、异常说明、现场资料和处理意见分组展示，并完成确认或驳回。",
      "18-cabinet-exception-report": "页面说明：从柜机详情标记异常，先选择柜机离线、柜门异常或扫码异常，再填写说明并提交异常记录。",
      "18a-cabinet-exception-detail": "页面说明：柜门异常详情按异常状态、异常柜门、上报信息、异常说明、终端上报资料和处理意见分组展示，并完成确认或驳回。",
      "18c-cabinet-exception-result": "页面说明：已驳回柜机异常的只读结果页，展示处理人、驳回原因和当前柜门状态，不显示处理按钮。",
      "19-notice-list": "页面说明：公告管理，查看已发布公告和草稿，右上角进入发布公告页面。",
      "20-new-notice": "页面说明：发布公告，填写标题、正文和附件，并设置是否置顶；可保存草稿或立即发布。",
      "22-profile": "页面说明：个人页展示当前登录人的账号信息、所属学院组织，并提供账号与安全、组织人员和公告管理入口；审批人设置合并到组织人员详情，借用流程统一从设备最小分类进入配置。",
      "22a-account-security": "页面说明：从个人页进入，查看登录账号与密码状态，并进入修改密码。修改后的密码同时用于小程序和智能柜终端本地登录。",
      "22b-change-password": "页面说明：小程序运行时从账号与安全进入共用密码页面；记得原密码时使用原密码修改，忘记原密码时通过绑定手机号验证后重置。",
      "23-organization-members": "页面说明：组织人员页按人员类型和组织角色筛选当前学院组织成员，可搜索姓名、学号、工号或专业；点击成员查看只读详情，管理员可添加或移除普通成员，并在成员详情设置多个审批人。",
      "23a-organization-member-detail": "页面说明：组织成员详情按人员类型展示身份信息、所属学院组织、成员角色和加入时间；教师不展示专业、年级和班级，其他人员不展示学生学籍字段；管理员可将普通成员设为审批人、修改审批范围或取消审批人。",
      "23b-add-organization-member": "页面说明：通过姓名、学号或教职工编号搜索尚未加入当前组织的平台用户；已在组织名册中的人员不显示，点击可查看只读详情，左滑可添加人员直接以普通成员加入当前组织。",
      "23c-organization-candidate-detail": "页面说明：只读展示待添加人员的共同字段和人员类型对应资料，不在详情页编辑信息或执行加入操作。",
      "24-organization-review": "页面说明：组织审核页按待审核、已通过、已拒绝筛选加入学院组织的申请；通过后自动加入名册，单条或批量拒绝时可填写选填备注。",
      "24a-organization-application-detail": "页面说明：组织加入申请详情展示学生身份、学籍、申请组织、申请时间和申请说明；拒绝时可选填备注，通过时无需填写。"
    };

    const enrichedPages = pages.map(page => ({
      ...page,
      code: page.id.split("-")[0],
      note: pageRemarks[page.id] || `页面说明：${page.title}`
    }));

    let currentRole = "admin";

    const roleConfigs = {
      admin: {
        label: "管理员",
        summary: "管理员：设备及最小分类流程配置、柜机管理、组织人员与审批人设置、公告发布、借用审批、异常处理和首页数据预览。",
        homeId: "role-admin-home",
        pageIds: ["role-admin-home", "08-device-list", "10-cabinet-list", "22-profile"],
        childPageIds: ["03-admin-borrow-return", "04-borrow-approval-detail", "05-return-review-detail", "16a-edit-approver", "17-admin-exception-process", "18d-exception-management-detail", "08a-add-device", "08f-device-stock", "08g-device-binding", "08h-add-device-info", "08i-edit-device-info", "08j-device-stock-in", "08k-device-stock-in-result", "08l-device-stock-out", "08m-device-binding-detail", "08n-device-flow-setting", "08p-minimum-category-devices", "09-device-detail", "09b-rfid-device-detail", "09c-label-direct-device-detail", "09a-edit-device", "09d-edit-rfid-device", "09e-abnormal-device-detail", "09g-cabinet-device-detail", "10a-add-cabinet", "10b-bind-cabinet", "10c-cabinet-online", "11-cabinet-detail", "11b-label-cabinet-detail", "11c-label-cabinet-detail", "12-device-qr", "12-device-qr-direct", "18-device-exception-report", "18-cabinet-exception-report", "18-exception-detail", "18a-cabinet-exception-detail", "18c-cabinet-exception-result", "19-notice-list", "20-new-notice", "22a-account-security", "22b-change-password", "23-organization-members", "23a-organization-member-detail", "23b-add-organization-member", "23c-organization-candidate-detail", "24-organization-review", "24a-organization-application-detail", "06-device-borrow-history"],
        navs: [["首页", "H", "role-admin-home"], ["设备", "D", "08-device-list"], ["柜机", "C", "10-cabinet-list"], ["个人", "P", "22-profile"]],
        powerModule: { level: "一级管理员", scope: "全部实验室", target: "../admin-demo.html" },
        homePage: {
          id: "role-admin-home", title: "管理首页", nav: "首页", noBack: true,
          actions: [{ label: "电源管理", powerManagement: true }],
          blocks: [
            { type: "panel", className: "admin-home-overview", title: "今日运行概览", badge: "实时", meta: [
              { label: "待审批数", value: adminHomeDashboard.overview.pendingApprovalCount },
              { label: "已审批数", value: adminHomeDashboard.overview.approvedCount },
              { label: "在库设备数", value: adminHomeDashboard.overview.inStockDeviceCount },
              { label: "已借出设备数量", value: adminHomeDashboard.overview.borrowedDeviceCount }
            ] },
            { type: "list", className: "admin-home-tasks", title: "待处理任务", items: [
              { title: "借用审核", badge: `待处理 ${adminHomeDashboard.borrowApproval.pendingCount}`, badgeClass: "warn", meta: [{ label: "最新申请", value: `${adminHomeDashboard.borrowApproval.latestApplicant} · ${adminHomeDashboard.borrowApproval.latestDeviceName}` }], target: "03-admin-borrow-return" },
              { title: "人员审核", organizationReviewTask: true, badgeClass: "warn", target: "24-organization-review" },
              { title: "异常处理", badge: `待通过 ${adminHomeDashboard.exceptions.pendingCount}`, badgeClass: "bad", meta: [
                { label: "当前异常", value: `设备 ${adminHomeDashboard.exceptions.deviceCount} · 柜机 ${adminHomeDashboard.exceptions.cabinetCount}` },
                { label: "处理队列", value: "待通过 2 · 待处理 2" }
              ], target: "17-admin-exception-process" }
            ]}
          ]
        }
      },
      approver: {
        label: "审批人",
        summary: "审批人与管理员共用同一套管理页面；默认拥有负责分类内的借用、归还和异常审批权限，但无权管理组织成员、添加设备或设置设备分类规则。",
        homeId: "role-admin-home",
        pageIds: [],
        childPageIds: [],
        navs: [],
        powerModule: { level: "二级管理员", scope: "302 实验室", target: "../manager-demo-v2.html" },
        homePage: null,
        deniedActions: {
          "08a-add-device": "当前账号为审批人，不能添加设备或进入设备建档、库存及信息绑定流程。",
          "08f-device-stock": "当前账号为审批人，不能管理设备库存。",
          "08g-device-binding": "当前账号为审批人，不能管理设备标签绑定。",
          "08h-add-device-info": "当前账号为审批人，不能新增设备信息。",
          "08i-edit-device-info": "当前账号为审批人，不能编辑设备信息。",
          "08j-device-stock-in": "当前账号为审批人，不能办理设备入库。",
          "08k-device-stock-in-result": "当前账号为审批人，不能查看或修改入库结果。",
          "08l-device-stock-out": "当前账号为审批人，不能办理设备出库。",
          "08m-device-binding-detail": "当前账号为审批人，不能编辑设备绑定信息。",
          "08n-device-flow-setting": "当前账号为审批人，不能修改设备最小分类的借用、归还及前置条件规则。",
          "08p-minimum-category-devices": "当前账号为审批人，不能管理最小分类设备。",
          "09a-edit-device": "当前账号为审批人，不能编辑设备。",
          "09d-edit-rfid-device": "当前账号为审批人，不能编辑 RFID 设备。",
          "10a-add-cabinet": "当前账号为审批人，不能添加柜机。",
          "10b-bind-cabinet": "当前账号为审批人，不能绑定柜机。",
          "10c-cabinet-online": "当前账号为审批人，不能管理柜机上线状态。",
          "16a-edit-approver": "当前账号为审批人，不能设置或修改组织审批人。",
          "19-notice-list": "当前账号为审批人，不能管理系统公告。",
          "20-new-notice": "当前账号为审批人，不能发布系统公告。",
          "23-organization-members": "当前账号为审批人，不能管理组织人员。",
          "23a-organization-member-detail": "当前账号为审批人，不能修改组织成员。",
          "23b-add-organization-member": "当前账号为审批人，不能向组织添加人员。",
          "23c-organization-candidate-detail": "当前账号为审批人，不能管理组织候选人员。",
          "24-organization-review": "当前账号为审批人，不能审核组织加入申请。",
          "24a-organization-application-detail": "当前账号为审批人，不能处理组织加入申请。"
        }
      }
    };

    roleConfigs.approver.pageIds = roleConfigs.admin.pageIds;
    roleConfigs.approver.childPageIds = roleConfigs.admin.childPageIds;
    roleConfigs.approver.navs = roleConfigs.admin.navs;
    roleConfigs.approver.homePage = roleConfigs.admin.homePage;

    function inferDeviceCategory(name) {
      if (/传感器|数据采集/.test(name)) return "传感器实验套件";
      if (/电源|电能/.test(name)) return "直流稳压电源";
      if (/万用表/.test(name)) return "万用表";
      if (/示波器/.test(name)) return "示波器";
      if (/信号发生器/.test(name)) return "信号发生器";
      if (/工具/.test(name)) return "工具器材";
      return "其他设备";
    }

    function organizationPersonIdentifier(person) {
      if (person.personType === "教师") return person.employeeNo || "未填写工号";
      if (person.personType === "其他人员") return person.identityNo || "未填写身份编号";
      return person.studentNo || "未填写学号";
    }

    function organizationPersonAffiliation(person) {
      if (person.personType === "教师") return person.department || "未填写所属学院或部门";
      if (person.personType === "其他人员") return person.unit || "未填写所属单位";
      return person.major || person.college || "未填写专业";
    }

    function isSameOrganizationPerson(left, right) {
      if (left.userId && right.userId) return left.userId === right.userId;
      if (left.studentNo && right.studentNo) return left.studentNo === right.studentNo;
      if (left.employeeNo && right.employeeNo) return left.employeeNo === right.employeeNo;
      return false;
    }

    function findOrganizationMember(person) {
      return organizationMembers.find(member => isSameOrganizationPerson(member, person));
    }

    function findPendingOrganizationApplication(person) {
      return organizationApplications.find(application => application.status === "待审核" && isSameOrganizationPerson(application, person));
    }

    function organizationCandidateStatus(person) {
      if (findOrganizationMember(person)) return "已在组织";
      if (findPendingOrganizationApplication(person)) return "待审核";
      return "可添加";
    }

    function organizationPersonProfile(person) {
      const profile = {
        userId: person.userId,
        personType: person.personType,
        name: person.name,
        gender: person.gender,
        phone: person.phone
      };
      if (person.personType === "学生") {
        return { ...profile, studentNo: person.studentNo, college: person.college, major: person.major, grade: person.grade, className: person.className };
      }
      if (person.personType === "教师") {
        return { ...profile, employeeNo: person.employeeNo, department: person.department };
      }
      return { ...profile, unit: person.unit, identityNo: person.identityNo || "", usageNote: person.usageNote || "" };
    }

    function addOrganizationMember(person, organization = "信息工程学院") {
      if (findOrganizationMember(person)) return null;
      const nextNumber = organizationMembers.reduce((maximum, member) => {
        const matched = String(member.id || "").match(/(\d+)$/);
        return Math.max(maximum, matched ? Number(matched[1]) : 0);
      }, 0) + 1;
      const member = {
        ...organizationPersonProfile(person),
        id: `MEM-${String(nextNumber).padStart(4, "0")}`,
        organization,
        organizationRole: "普通成员",
        joinedAt: "刚刚",
        removable: true
      };
      organizationMembers.push(member);
      return member;
    }

    function buildCabinetDeviceDetailPage() {
      const device = uiState.selectedCabinetDevice || {
        name: "数字示波器",
        code: "OSC-001",
        state: "在柜",
        num: "01",
        cabinet: "A 柜",
        version: "RFID版"
      };
      const isRfid = device.version === "RFID版";
      const isAbnormal = device.state === "异常";
      const editTarget = isRfid ? "09d-edit-rfid-device" : "09a-edit-device";
      const actionsBottom = isAbnormal
        ? [{ label: "处理异常", exceptionRecordCode: device.code }]
        : [{ label: "编辑设备", target: editTarget }, { label: "标记异常", target: "18-device-exception-report", className: "danger" }];
      const blocks = [
        { type: "deviceHero", icon: isRfid ? "RF" : device.name.slice(0, 1), eyebrow: inferDeviceCategory(device.name), title: device.name, code: device.code, state: device.state, stateClass: isAbnormal ? "bad" : device.state === "借出" ? "warn" : "", tags: [isRfid ? "RFID" : "标签扫码", `${device.cabinet} · ${device.num} 门`], metrics: [
          { value: isRfid ? "免审批" : "按规则", label: "借用审批" },
          { value: device.state === "借出" ? "不在柜" : "在柜", label: "柜内状态" },
          { value: device.version, label: "柜机版本" }
        ] },
        { type: "deviceInfo", icon: "档", title: "设备档案", rows: [["设备分类", inferDeviceCategory(device.name)], ["设备标签码", device.code], ["当前状态", device.state], ["档案来源", "柜机格口绑定信息"]] },
        { type: "deviceInfo", icon: "柜", title: "识别与存放", rows: [["识别方式", isRfid ? "RFID" : "标签扫码"], [isRfid ? "RFID 标签" : "设备标签码", isRfid ? `EPC-${device.code}` : device.code], ["存放柜机", `${device.cabinet}（${device.version}）`], ["所在格口", `${device.num} 门`]] },
        { type: "deviceInfo", icon: "借", title: "借用方式", rows: isRfid
          ? [["借用审批", "RFID 固定不审批"], ["取还入口", "扫码授权或终端本地登录"], ["状态确认", "关门后 RFID 自动识别"]]
          : [["借用审批", "按当前设备审批规则执行"], ["取还入口", "取还码或终端登录"], ["状态确认", "标签识别并关门后同步"]] },
        { type: "deviceRecords", icon: "记", title: "最近借还", target: "06-device-borrow-history", historyDevice: { name: device.name, code: device.code, identifyType: isRfid ? "RFID" : "标签扫码", location: `${device.cabinet} · ${device.num} 门` }, items: [{ title: "最近一次状态同步", meta: `来自${device.cabinet}${device.num}门 · 柜机终端上报`, status: device.state }, { title: "查看完整借还记录", meta: "只显示当前设备的历史记录", status: "更多" }] }
      ];
      if (isAbnormal) {
        blocks.splice(1, 0, { type: "deviceAlert", title: "设备已暂停借用", badge: "待处理", text: "异常设备暂不参与借用，也不能生成取还码。完成维修或归位后，请点击底部“处理异常”继续处理。", meta: [["当前柜位", `${device.cabinet} · ${device.num} 门`], ["处理状态", "等待处理"]] });
        blocks.splice(2, 0, { type: "deviceInfo", icon: "异", title: "当前异常", rows: [["借用状态", "已暂停正常借用"], ["处理方式", "完成维修或归位"], ["恢复条件", "现场核验无误后恢复正常"]] });
      }
      return {
        id: "09g-cabinet-device-detail",
        title: "设备详情",
        detailUi: true,
        abnormalUi: isAbnormal,
        actionsBottom,
        blocks,
        note: `页面说明：从${device.cabinet}${device.num}门进入${device.name}的设备详情。`
      };
    }

    function buildDeviceBorrowHistoryPage() {
      const device = uiState.selectedBorrowHistoryDevice || {
        name: "数字示波器",
        code: "OSC-001",
        identifyType: "标签扫码",
        location: "C 柜 · 03 门"
      };
      let records = deviceBorrowHistoryRecords.filter(item => item.deviceCode === device.code);
      if (!records.length) {
        records = [
          { id: `ORD-${device.code}-002`, deviceCode: device.code, borrower: "王五", status: "已归还", date: "2026-07-18", daysAgo: 6, borrowedAt: "2026-07-18 09:20", returnAt: "2026-07-18 16:35", location: device.location, mode: `${device.identifyType} · 正常完成归还` },
          { id: `ORD-${device.code}-001`, deviceCode: device.code, borrower: "张三", status: "已归还", date: "2026-07-02", daysAgo: 22, borrowedAt: "2026-07-02 10:08", returnAt: "2026-07-02 17:12", location: device.location, mode: `${device.identifyType} · 正常完成归还` }
        ];
      }
      return {
        id: "06-device-borrow-history",
        title: "设备借还记录",
        blocks: [{
          type: "deviceBorrowHistory",
          device,
          activeRange: "近30天",
          items: records
        }],
        note: `页面说明：仅展示“${device.name}（${device.code}）”的借还历史，可按日期范围筛选。`
      };
    }

    function buildStockInResultPage() {
      const device = uiState.selectedInventoryDevice || {
        name: "数字示波器",
        prefix: "OSC",
        total: 8
      };
      const quantity = Math.max(1, uiState.inventoryInQuantity || 1);
      const start = (device.total || 0) + 1;
      const codes = Array.from({ length: quantity }, (_, index) => `${device.prefix}-${String(start + index).padStart(4, "0")}`);
      return {
        id: "08k-device-stock-in-result",
        title: "入库完成",
        actionsBottom: [{ label: "返回设备库存", target: "08f-device-stock" }],
        blocks: [
          { type: "panel", title: `${device.name}入库成功`, badge: `${quantity} 台`, badgeClass: "ok", meta: ["库存状态：在库", "绑定状态：待绑定", "标签码永久唯一，不循环使用"] },
          { type: "generatedCodeList", title: "本次生成标签码", items: codes },
          { type: "panel", title: "下一步", meta: ["前往“信息绑定”搜索设备名称", "确认系统生成的唯一设备编码并绑定存放位置"] }
        ],
        note: `页面说明：本次入库生成 ${quantity} 个永久唯一设备标签码。`
      };
    }

    function buildDeviceInfoEditPage() {
      const device = uiState.selectedDeviceInfo || {
        icon: "示",
        name: "数字示波器",
        category: "示波器",
        model: "DS1054Z / DS1104Z",
        identifyType: "标签扫码",
        source: "采购",
        purchaseDate: "2025-09-01",
        manual: "DS1054Z 使用说明书",
        imageIcon: "",
        deviceValue: "3999.00",
        measurementUnit: "台",
        stock: 6,
        bound: 3,
        pending: 3
      };
      return {
        id: "08i-edit-device-info",
        title: "编辑设备信息",
        actionsBottom: ["取消", { label: "保存修改", confirmTitle: "保存确认", confirmText: "确认更新设备主数据信息？不会修改已生成的设备标签码。" }],
        blocks: [
          { type: "deviceInfoForm", mode: "edit", name: device.name, category: device.category, model: device.model, identifyType: device.identifyType, source: device.source, purchaseDate: device.purchaseDate, manual: device.manual, imageIcon: device.imageIcon, deviceValue: device.deviceValue, measurementUnit: device.measurementUnit, categories: minimumCategories.map(item => item.name) },
          { type: "panel", title: "规则继承", badge: device.category, badgeClass: "info", meta: ["借用审核和前置条件继承所选最小分类", "续借与归还审核暂未开放，后续开发"] },
          { type: "panel", title: "库存关联", meta: [`当前在库 ${device.stock} 个，其中已绑定 ${device.bound} 个、待绑定 ${device.pending} 个`, "设备名称修改后，历史标签码保持不变"] }
        ],
        note: `页面说明：编辑“${device.name}”的设备名称、最小分类和规格型号；设备图片、设备价值、计量单位、来源、购入日期及关联说明书均可选填。`
      };
    }

    function buildMinimumCategoryDevicesPage() {
      const category = uiState.selectedMinimumCategory || minimumCategories[0];
      const statusFilterMap = {
        "可借": "可借用",
        "可领用": "可借用",
        "借用中": "已借出",
        "异常": "异常"
      };
      const devices = category.devices.map(device => ({
        ...device,
        category: statusFilterMap[device.badge] || "可借用"
      }));
      return {
        id: "08p-minimum-category-devices",
        title: category.name,
        blocks: [
          { type: "minimumCategoryHeader", category },
          { type: "search", text: `搜索${category.name}设备` },
          { type: "filterList", title: "分类设备", cardMode: "minimumCategoryDevice", active: "全部", filters: ["全部", "可借用", "已借出", "异常"], emptyText: "当前状态下暂无设备", items: devices }
        ],
        note: `页面说明：展示最小分类“${category.name}”下的设备，卡片突出设备名称、唯一编号、存放位置、识别方式和当前状态，不展示规则解释或借用引导文案。`
      };
    }

    function buildDeviceFlowPage() {
      const category = uiState.selectedMinimumCategory || minimumCategories[0];
      if (!uiState.deviceFlowDraft || uiState.flowDraftCategoryName !== category.name) {
        uiState.deviceFlowDraft = { ...category.flowRule };
        uiState.flowDraftCategoryName = category.name;
      }
      return {
        id: "08n-device-flow-setting",
        title: "分类规则设置",
        actionsBottom: ["取消", { label: "保存配置", saveFlowConfig: true }],
        blocks: [{ type: "deviceFlowConfig", category, rule: uiState.deviceFlowDraft }],
        note: `页面说明：按最小分类配置“${category.name}”的最长借用允许时长、借用审核、前置条件和无需归还属性；时长统一按小时填写，续借与归还审核暂未开放。规则作用于该分类下全部设备。`
      };
    }

    function buildStockInPage() {
      const device = uiState.selectedInventoryDevice || {
        name: "数字示波器",
        model: "DS1054Z / DS1104Z",
        prefix: "OSC",
        total: 8,
        inStock: 6
      };
      return {
        id: "08j-device-stock-in",
        title: "设备入库",
        actionsBottom: ["取消", { label: "确认入库", target: "08k-device-stock-in-result" }],
        blocks: [{
          type: "inventoryInForm",
          device: device.name,
          model: device.model,
          prefix: device.prefix,
          currentTotal: device.total,
          currentStock: device.inStock,
          nextCode: `${device.prefix}-${String((device.total || 0) + 1).padStart(4, "0")}`,
          quantity: 1
        }],
        note: `页面说明：为“${device.name}”选择入库数量并批量生成永久唯一标签码。`
      };
    }

    function buildStockOutPage() {
      const device = uiState.selectedInventoryDevice || {
        name: "数字示波器",
        availableCodes: ["OSC-0004", "OSC-0005", "OSC-0006"]
      };
      const codes = device.availableCodes || [];
      return {
        id: "08l-device-stock-out",
        title: "设备出库",
        actionsBottom: ["取消", { label: "确认出库", confirmTitle: "出库确认", confirmText: "确认将已勾选的未绑定设备出库？出库后保留历史记录。" }],
        blocks: [
          { type: "panel", title: device.name, badge: `${codes.length} 台可出库`, badgeClass: "info", meta: ["只显示在库且未绑定的设备", "已绑定、借用中和异常设备不能直接出库"] },
          { type: "inventoryOutSelect", items: codes.map((code, index) => ({ code, createdAt: index < 2 ? "2026-07-21 14:20" : "2026-07-18 09:35" })) }
        ],
        note: `页面说明：勾选“${device.name}”具体标签码后出库，不删除设备及历史记录。`
      };
    }

    function buildDeviceBindingDetailPage() {
      const unit = uiState.selectedBindingUnit || {
        code: "OSC-0004",
        name: "数字示波器",
        model: "DS1054Z",
        state: "待绑定"
      };
      const isBound = unit.state === "已绑定";
      return {
        id: "08m-device-binding-detail",
        title: isBound ? "编辑信息绑定" : "信息绑定",
        actionsBottom: isBound
          ? [
              { label: "解除绑定", className: "danger", confirmTitle: "解除绑定确认", confirmText: "仅非借用中、非异常设备允许解除。解除后设备恢复为待绑定并可出库。" },
              { label: "保存修改", confirmTitle: "保存确认", confirmText: "确认更新该设备的序列号和存放位置信息？" }
            ]
          : ["取消", { label: "保存绑定", confirmTitle: "保存确认", confirmText: "确认保存序列号与存放位置并完成信息绑定？保存后状态更新为已绑定。" }],
        blocks: [{
          type: "deviceBindingForm",
          code: unit.code,
          name: unit.name,
          model: unit.model,
          state: unit.state,
          serial: unit.serial || "",
          area: unit.area || "电子创新实验室",
          cabinet: unit.cabinet,
          slot: unit.slot
        }],
        note: "页面说明：信息绑定只读展示系统生成的唯一设备编码和设备名称，可填写设备序列号，并维护实验室、柜机与格口等存放位置信息。"
      };
    }

    function buildExceptionManagementDetailPage() {
      const record = uiState.selectedExceptionRecord || exceptionManagementRecords[0];
      const isPending = record.status === "待通过";
      const isHandling = record.status === "待处理";
      const isCabinet = record.category === "柜机";
      const actionsBottom = isPending
        ? [
            { label: "驳回异常", className: "exception-reject", exceptionNextStatus: "已驳回", confirmTitle: "驳回异常确认", confirmText: `确认驳回“${record.entity}”的异常记录？` },
            { label: "通过异常", className: "exception-confirm", exceptionNextStatus: "待处理", confirmTitle: "通过异常确认", confirmText: `确认该异常成立并将“${record.entity}”转入待处理？` }
          ]
        : isHandling
          ? [{ label: "恢复正常", className: "exception-confirm", exceptionNextStatus: "已恢复", confirmTitle: "恢复确认", confirmText: `确认“${record.entity}”已完成处理并恢复正常？` }]
          : undefined;
      const progressText = {
        "待通过": "等待管理员或审批人确认异常是否成立",
        "待处理": "异常已经通过，当前等待维修、补齐、找回或现场处理",
        "已恢复": "异常对象已恢复正常，处理记录已保留",
        "已驳回": "异常未通过确认，对象保持原有状态"
      }[record.status];
      const recoveryChecks = isCabinet
        ? [
            "确认柜机已重新连接服务器并持续上报心跳",
            "确认锁控板、柜门和识别模块自检通过",
            "确认异常柜门已完成现场开关门测试"
          ]
        : [
            "确认设备、配件和附件已核对完成",
            "确认维修、补齐、找回或归位处理已完成",
            "确认设备已放回绑定柜位且识别状态正常"
          ];
      const recoveryBlocks = isHandling
        ? [
            { type: "exceptionReviewChecklist", title: "恢复条件", items: recoveryChecks },
            { type: "exceptionReviewComment", title: "恢复说明", required: true, placeholder: isCabinet ? "填写故障原因、处理方式和现场验证结果" : "填写维修、补齐或归位结果及现场核对情况" },
            { type: "upload", text: isCabinet ? "上传处理后的现场图片、视频或终端截图（选填）" : "上传维修或核对照片（选填）" },
            {
              type: "exceptionReviewImpact",
              title: "恢复后影响",
              rows: isCabinet
                ? [
                    { label: "柜机状态", text: "恢复为在线状态", tone: "positive" },
                    { label: "取还流程", text: "自检正常的柜门重新参与正常取还", tone: "positive" },
                    { label: "处理记录", text: "保留本次异常与恢复结果", tone: "neutral" }
                  ]
                : [
                    { label: "设备状态", text: "恢复为可借状态", tone: "positive" },
                    { label: "借用流程", text: "重新按设备所属最小分类规则参与借用", tone: "positive" },
                    { label: "设备履历", text: "保留本次异常与恢复结果", tone: "neutral" }
                  ]
            }
          ]
        : [];
      return {
        id: "18d-exception-management-detail",
        title: `${record.category}异常详情`,
        exceptionReviewUi: true,
        actionsBottom,
        blocks: [
          {
            type: "exceptionReviewSummary",
            layout: isCabinet ? "cabinet" : "device",
            status: record.status,
            category: `${record.category}异常`,
            icon: isCabinet ? "柜" : record.entity.slice(0, 1),
            exceptionType: record.exceptionType,
            entity: record.entity,
            code: record.code,
            deviceType: isCabinet ? undefined : "实验设备",
            identifyType: isCabinet ? undefined : (record.identifyType || "标签扫码"),
            cabinetVersion: isCabinet ? "按柜机档案" : undefined,
            door: isCabinet ? (record.entity.match(/\d+ 门/)?.[0] || "整柜") : undefined,
            location: record.location,
            reportSource: record.reportSource,
            reportedAt: record.reportedAt,
            description: record.description
          },
          {
            type: "panel",
            title: "处理进度",
            badge: record.status,
            badgeClass: record.status === "已恢复" ? "ok" : record.status === "已驳回" ? "" : record.status === "待处理" ? "info" : "warn",
            meta: [progressText, `异常记录编号：${record.id}`]
          },
          ...(isPending ? [{ type: "exceptionReviewComment", title: "处理意见", placeholder: "填写通过或驳回说明" }] : []),
          ...recoveryBlocks
        ],
        note: "页面说明：从首页异常处理、设备详情或柜机详情进入同一异常记录；待处理状态按异常对象显示恢复条件、恢复说明和恢复影响。"
      };
    }

    function buildOrganizationReviewPage() {
      return {
        id: "24-organization-review",
        title: "组织审核",
        blocks: [{
          type: "organizationApplicationList",
          organization: "信息工程学院",
          activeStatus: "待审核",
          statusFilters: ["待审核", "已通过", "已拒绝"],
          items: organizationApplications
        }],
        note: pageRemarks["24-organization-review"]
      };
    }

    function buildOrganizationApplicationDetailPage() {
      const application = uiState.selectedOrganizationApplication || organizationApplications.find(item => item.status === "待审核") || organizationApplications[0];
      const actionsBottom = application.status === "待审核"
        ? [
            { label: "拒绝加入", className: "danger", organizationDecision: "已拒绝" },
            { label: "通过申请", className: "primary", organizationDecision: "已通过" }
          ]
        : undefined;
      return {
        id: "24a-organization-application-detail",
        title: "申请人详情",
        organizationUi: true,
        actionsBottom,
        blocks: [{
          type: "organizationPersonDetail",
          mode: "application",
          person: application
        }],
        note: pageRemarks["24a-organization-application-detail"]
      };
    }

    function buildOrganizationMembersPage() {
      const canManage = currentRole === "admin";
      return {
        id: "23-organization-members",
        title: "组织人员",
        actions: canManage ? [{ label: "添加人员", target: "23b-add-organization-member" }] : undefined,
        blocks: [{
          type: "organizationMemberList",
          organization: "信息工程学院",
          items: organizationMembers,
          canManage
        }],
        note: pageRemarks["23-organization-members"]
      };
    }

    function buildAddOrganizationMemberPage() {
      return {
        id: "23b-add-organization-member",
        title: "添加人员",
        blocks: [{
          type: "organizationCandidateList",
          organization: "信息工程学院",
          items: organizationUserDirectory
        }],
        note: pageRemarks["23b-add-organization-member"]
      };
    }

    function buildOrganizationCandidateDetailPage() {
      const person = uiState.selectedOrganizationCandidate || organizationUserDirectory[0];
      return {
        id: "23c-organization-candidate-detail",
        title: "人员详情",
        organizationUi: true,
        blocks: [{
          type: "organizationPersonDetail",
          mode: "candidate",
          person,
          targetOrganization: "信息工程学院",
          status: organizationCandidateStatus(person)
        }],
        note: pageRemarks["23c-organization-candidate-detail"]
      };
    }

    function buildOrganizationMemberDetailPage() {
      const member = uiState.selectedOrganizationMember || organizationMembers[0];
      let actionsBottom;
      if (currentRole === "admin" && member.organizationRole === "普通成员") {
        actionsBottom = [
          { label: "移出组织", className: "danger", removeOrganizationMember: true },
          { label: "设为审批人", className: "primary", target: "16a-edit-approver" }
        ];
      } else if (currentRole === "admin" && member.organizationRole === "审批人") {
        actionsBottom = [
          { label: "取消审批人", className: "danger", cancelApproverRole: true },
          { label: "修改审批范围", className: "primary", target: "16a-edit-approver" }
        ];
      }
      return {
        id: "23a-organization-member-detail",
        title: "成员详情",
        organizationUi: true,
        actionsBottom,
        blocks: [{
          type: "organizationPersonDetail",
          mode: "member",
          person: member
        }],
        note: pageRemarks["23a-organization-member-detail"]
      };
    }

    function buildApproverScopePage() {
      const member = uiState.selectedOrganizationMember || organizationMembers.find(item => item.organizationRole === "普通成员") || organizationMembers[0];
      uiState.selectedOrganizationMember = member;
      if (uiState.approverDraftMemberId !== member.id || !(uiState.approverCategoryDraft instanceof Set)) {
        uiState.approverDraftMemberId = member.id;
        uiState.approverCategoryDraft = new Set(member.approvalCategories || []);
      }
      const editing = member.organizationRole === "审批人";
      return {
        id: "16a-edit-approver",
        title: editing ? "修改审批范围" : "设为审批人",
        organizationUi: true,
        actionsBottom: ["取消", { label: editing ? "保存修改" : "确认设置", className: "primary", saveApproverScope: true }],
        blocks: [
          {
            type: "approverScopeSummary",
            person: member,
            editing
          },
          {
            type: "minimumCategoryMultiSelect",
            title: "负责的最小分类",
            selectedNames: uiState.approverCategoryDraft,
            items: minimumCategories.map(category => ({
              ...category,
              selected: uiState.approverCategoryDraft.has(category.name)
            }))
          }
        ],
        note: pageRemarks["16a-edit-approver"]
      };
    }

    function rolePageById(pageId) {
      const config = roleConfigs[currentRole];
      if (pageId === "09g-cabinet-device-detail") return buildCabinetDeviceDetailPage();
      if (pageId === "06-device-borrow-history") return buildDeviceBorrowHistoryPage();
      if (pageId === "08i-edit-device-info") return buildDeviceInfoEditPage();
      if (pageId === "08p-minimum-category-devices") return buildMinimumCategoryDevicesPage();
      if (pageId === "08n-device-flow-setting") return buildDeviceFlowPage();
      if (pageId === "08j-device-stock-in") return buildStockInPage();
      if (pageId === "08k-device-stock-in-result") return buildStockInResultPage();
      if (pageId === "08l-device-stock-out") return buildStockOutPage();
      if (pageId === "08m-device-binding-detail") return buildDeviceBindingDetailPage();
      if (pageId === "18d-exception-management-detail") return buildExceptionManagementDetailPage();
      if (pageId === "24-organization-review") return buildOrganizationReviewPage();
      if (pageId === "24a-organization-application-detail") return buildOrganizationApplicationDetailPage();
      if (pageId === "23-organization-members") return buildOrganizationMembersPage();
      if (pageId === "23a-organization-member-detail") return buildOrganizationMemberDetailPage();
      if (pageId === "23b-add-organization-member") return buildAddOrganizationMemberPage();
      if (pageId === "23c-organization-candidate-detail") return buildOrganizationCandidateDetailPage();
      if (pageId === "16a-edit-approver") return buildApproverScopePage();
      if (pageId === config.homeId) return config.homePage;
      if (config.overrides && config.overrides[pageId]) return config.overrides[pageId];
      const page = enrichedPages.find(item => item.id === pageId);
      if (pageId === "22-profile" && page) {
        return {
          ...page,
          blocks: page.blocks.map(block => {
            if (block.type === "profile") {
              const personType = { student: "学生", teacher: "教师", other: "其他人员" }[env.host.user.personType] || "待确认";
              return { ...block, name: env.host.user.name || block.name, role: roleConfigs[currentRole].label, meta: `人员类型：${personType}` };
            }
            return block;
          })
        };
      }
      if (pageId === "22a-account-security" && page) {
        const phone = String(env.host.user.phone || "");
        return { ...page, blocks: page.blocks.map(block => block.type === "accountSecurity"
          ? { ...block, phone: /^1\d{10}$/.test(phone) ? phone.slice(0, 3) + "****" + phone.slice(-4) : "未绑定手机号" }
          : block) };
      }
      return page || config.homePage;
    }

    function roleCanOpen(pageId) {
      const config = roleConfigs[currentRole];
      return pageId === config.homeId || config.pageIds.includes(pageId) || (config.childPageIds || []).includes(pageId);
    }

    function roleDeniedAction(pageId) {
      return roleConfigs[currentRole]?.deniedActions?.[pageId] || "";
    }

    function rolePages() {
      return roleConfigs[currentRole].pageIds.map(rolePageById);
    }

    function el(tag, className, html) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (html !== undefined) node.innerHTML = html;
      return node;
    }

    const uiState = {
      mode: "overview",
      currentPageId: null,
      history: [],
      selectedCabinetDevice: null,
      selectedBorrowHistoryDevice: null,
      selectedDeviceInfo: null,
      selectedMinimumCategory: null,
      deviceFlowDraft: null,
      flowDraftCategoryName: null,
      selectedInventoryDevice: null,
      selectedBindingUnit: null,
      selectedExceptionRecord: null,
      selectedOrganizationApplication: null,
      selectedOrganizationMember: null,
      selectedOrganizationCandidate: null,
      approverDraftMemberId: null,
      approverCategoryDraft: null,
      passwordChangedAt: "",
      passwordVerificationCode: "",
      passwordVerificationSentAt: 0,
      inventoryInQuantity: 1,
      inventoryOutCodes: [],
      bindingIdentifyType: "标签扫码"
    };

    let openPage = function() {};
    let goBack = function() {};

    function normalizeItem(item, keys) {
      if (!Array.isArray(item)) return item;
      const data = {};
      keys.forEach((key, index) => {
        data[key] = item[index];
      });
      return data;
    }

    function makeClickable(node, target, options = {}) {
      if (!target) return node;
      node.classList.add("clickable");
      node.addEventListener("click", (event) => {
        if (options.stop !== false) event.stopPropagation();
        openPage(target, { pushHistory: options.pushHistory !== false });
      });
      return node;
    }

    function openPowerManagement() {
      const powerModule = roleConfigs[currentRole].powerModule;
      if (!powerModule) return;
      window.location.href = `${powerModule.target}?from=miniapp&role=${encodeURIComponent(currentRole)}`;
    }

    function buildMeta(items = []) {
      const meta = el("div", "meta");
      items.forEach(item => {
        if (typeof item === "string") {
          meta.appendChild(el("div", "", item));
          return;
        }
        const row = el("div", "meta-pair");
        row.appendChild(el("span", "meta-label", item.label));
        row.appendChild(el("strong", "meta-value", item.value));
        meta.appendChild(row);
      });
      return meta;
    }

    function buildListCard(item) {
      if (item.organizationReviewTask) {
        const pendingApplications = organizationApplications.filter(application => application.status === "待审核");
        const latestApplication = pendingApplications[0];
        item.badge = `待处理 ${pendingApplications.length}`;
        item.meta = [
          { label: "当前组织", value: adminHomeDashboard.organizationReview.organization },
          { label: "最新申请", value: latestApplication ? `${latestApplication.name} · ${latestApplication.appliedAt}` : "暂无待审核申请" }
        ];
      }
      const card = el("div", "card");
      if (item.deviceDetailData) {
        card.classList.add("clickable");
        card.addEventListener("click", event => {
          event.stopPropagation();
          uiState.selectedCabinetDevice = { ...item.deviceDetailData };
          openPage(item.target || "09g-cabinet-device-detail");
        });
      } else {
        makeClickable(card, item.target);
      }
      const head = el("div", "row between");
      head.appendChild(el("div", "card-title", item.title));
      const badges = item.badges || (item.badge ? [{ label: item.badge, badgeClass: item.badgeClass }] : []);
      if (badges.length) {
        const badgeGroup = el("div", "badge-group");
        badges.forEach(badge => badgeGroup.appendChild(el("span", "badge " + (badge.badgeClass || ""), badge.label)));
        head.appendChild(badgeGroup);
      }
      card.appendChild(head);
      if (item.meta) {
        card.appendChild(buildMeta(item.meta));
      }
      if (item.buttons) {
        const btns = el("div", "btns");
        item.buttons.forEach((button, i) => {
          const data = typeof button === "string" ? { label: button } : button;
          const btnTone = data.className || (data.label.includes("删除") ? "danger" : (i === item.buttons.length - 1 ? "primary" : ""));
          const btn = el("div", "btn " + btnTone, data.label);
          makeClickable(btn, data.target);
          btns.appendChild(btn);
        });
        card.appendChild(btns);
      }
      return card;
    }

    function buildMinimumCategoryDeviceCard(item) {
      const card = el("article", "minimum-category-device-card " + (item.badgeClass || ""));
      if (item.deviceDetailData) {
        card.classList.add("clickable");
        card.addEventListener("click", event => {
          event.stopPropagation();
          uiState.selectedCabinetDevice = { ...item.deviceDetailData };
          openPage(item.target || "09g-cabinet-device-detail");
        });
      } else {
        makeClickable(card, item.target);
      }
      const head = el("div", "minimum-category-device-head");
      const mark = el("span", "minimum-category-device-mark " + (item.identifyType === "RFID" ? "rfid" : ""), item.identifyType === "RFID" ? "RF" : item.title.slice(0, 1));
      const identity = el("div", "minimum-category-device-identity", `<strong>${item.title}</strong><span><small>设备编号</small><b>${item.code}</b></span>`);
      const status = el("span", "minimum-category-device-status " + (item.badgeClass || ""), item.badge);
      head.appendChild(mark);
      head.appendChild(identity);
      head.appendChild(status);
      const facts = el("div", "minimum-category-device-facts");
      facts.appendChild(el("span", "wide", `<small>存放位置</small><strong>${item.location}</strong>`));
      facts.appendChild(el("span", "", `<small>识别方式</small><strong>${item.identifyType}</strong>`));
      facts.appendChild(el("i", "", "›"));
      card.appendChild(head);
      card.appendChild(facts);
      if (item.stateFields?.length) {
        const stateGrid = el("div", "minimum-category-device-state-grid" + (item.stateFields.length === 1 ? " single" : ""));
        item.stateFields.forEach(field => {
          const data = normalizeItem(field, ["label", "value"]);
          stateGrid.appendChild(el("span", "", `<small>${data.label}</small><strong>${data.value}</strong>`));
        });
        card.appendChild(stateGrid);
      }
      return card;
    }

    function buildDeviceCategoryList(groups) {
      const list = el("div", "category-list");
      groups.forEach(group => {
        const category = el("div", "category-card");
        makeClickable(category, group.target);
        const head = el("div", "category-head");
        head.appendChild(el("div", "", `<div class="category-title">${group.title}</div><div class="category-sub">${group.summary}</div>`));
        if (group.badge) head.appendChild(el("span", "badge", group.badge));
        category.appendChild(head);

        if (group.items) {
          const devices = el("div", "device-items");
          group.items.forEach(item => {
            const card = el("div", "device-row");
            makeClickable(card, item.target);
            const cardHead = el("div", "row between");
            cardHead.appendChild(el("div", "card-title", item.title));
            if (item.badge) cardHead.appendChild(el("span", "badge " + (item.badgeClass || ""), item.badge));
            card.appendChild(cardHead);
            if (item.meta) {
              const meta = el("div", "meta");
              item.meta.forEach(text => meta.appendChild(el("div", "", text)));
              card.appendChild(meta);
            }
            devices.appendChild(card);
          });
          category.appendChild(devices);
        }
        list.appendChild(category);
      });
      return list;
    }

    function renderBlock(block, page) {
      const wrap = el("div", "section" + (block.className ? ` ${block.className}` : ""));
      if (block.title && !["panel", "list", "quick", "doors", "timeline", "slotDevices", "deviceHero", "deviceInfo", "deviceRecords", "deviceBorrowHistory", "deviceAlert", "approvalSummary", "approvalQualification", "approvalChecks", "approvalNotice", "approvalComment", "exceptionReviewSummary", "exceptionEvidence", "exceptionReviewImpact", "exceptionReviewChecklist", "exceptionReviewComment", "cabinetStatus", "minimumCategoryList", "minimumCategoryHeader", "minimumCategoryMultiSelect", "approverScopeSummary", "deviceManageTabs", "deviceInfoCatalog", "deviceInfoForm", "deviceInventoryList", "deviceImageUpload", "inventoryInForm", "generatedCodeList", "inventoryOutSelect", "deviceBindingList", "deviceBindingForm", "deviceFlowConfig"].includes(block.type)) {
        wrap.appendChild(el("div", "caption", block.title));
      }
      if (block.type === "selector") {
        const selectorText = block.dynamicRole ? `当前角色：${roleConfigs[currentRole].label}` : block.text;
        wrap.appendChild(el("div", "search", selectorText));
      }
      if (block.type === "search") {
        wrap.appendChild(el("div", "search", "🔎 " + block.text));
      }
      if (block.type === "tabs") {
        const tabs = el("div", "tabs");
        block.items.forEach(item => {
          const tab = el("div", "tab" + (item === block.active ? " active" : ""), item);
          tab.addEventListener("click", event => {
            event.stopPropagation();
            tabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
          });
          tabs.appendChild(tab);
        });
        wrap.appendChild(tabs);
      }
      if (block.type === "borrowUnitChoice") {
        const tabs = el("div", "tabs");
        tabs.style.display = "grid";
        tabs.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
        block.items.forEach(item => {
          const tab = el("div", "tab" + (item === block.active ? " active" : ""), item);
          tab.style.width = "100%";
          tab.addEventListener("click", event => {
            event.stopPropagation();
            block.active = item;
            tabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
          });
          tabs.appendChild(tab);
        });
        wrap.appendChild(tabs);
      }
      if (block.type === "approvalScope") {
        const picker = el("div", "scope-picker");
        const tabs = el("div", "tabs");
        const content = el("div", "scope-content");
        const renderScope = option => {
          content.innerHTML = "";
          const panel = el("div", "panel");
          if (option.label === "指定设备") {
            panel.appendChild(el("div", "card-title row between", `<span>${option.title}</span><span class="badge ${option.badgeClass || ""}">${option.badge}</span>`));
            const meta = el("div", "meta");
            option.meta.forEach(text => meta.appendChild(el("div", "", text)));
            panel.appendChild(meta);
            makeClickable(panel, option.target);
          } else {
            panel.appendChild(el("div", "form-row", `<span>${option.fieldLabel}</span><span class="muted">${option.value} ›</span>`));
            panel.classList.add("clickable");
          }
          content.appendChild(panel);
          const pageModal = page.blocks.find(item => item.type === "modal");
          if (pageModal && option.confirmText) pageModal.text = option.confirmText;
        };
        block.options.forEach(option => {
          const tab = el("div", "tab" + (option.label === block.active ? " active" : ""), option.label);
          tab.addEventListener("click", event => {
            event.stopPropagation();
            tabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
            renderScope(option);
          });
          tabs.appendChild(tab);
        });
        picker.appendChild(tabs);
        picker.appendChild(content);
        wrap.appendChild(picker);
        renderScope(block.options.find(option => option.label === block.active) || block.options[0]);
      }
      if (block.type === "borrowDurationRule") {
        const picker = el("div", "scope-picker duration-picker");
        const tabs = el("div", "tabs");
        tabs.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
        const content = el("div", "scope-content");
        const renderDuration = option => {
          content.innerHTML = "";
          const panel = el("div", "panel");
          const maximum = el("div", "form-row clickable", `<span>最长借用时间 *</span><span class="muted">${option.maximum} ${option.unit} ›</span>`);
          const step = el("div", "form-row", `<span>时间步长</span><span class="muted">${option.step}（自动）</span>`);
          panel.appendChild(maximum);
          panel.appendChild(step);
          content.appendChild(panel);
        };
        block.options.forEach(option => {
          const tab = el("div", "tab" + (option.label === block.active ? " active" : ""), option.label);
          tab.addEventListener("click", event => {
            event.stopPropagation();
            tabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
            renderDuration(option);
          });
          tabs.appendChild(tab);
        });
        picker.appendChild(tabs);
        picker.appendChild(content);
        wrap.appendChild(picker);
        renderDuration(block.options.find(option => option.label === block.active) || block.options[0]);
      }
      if (block.type === "statusSwitch") {
        const panel = el("div", "panel");
        const row = el("div", "status-switch-row");
        const stateLabel = el("div", "status-switch-label");
        const toggle = el("button", "switch-control", `<span class="switch-thumb"></span>`);
        toggle.type = "button";
        toggle.setAttribute("role", "switch");
        const updateStatus = enabled => {
          block.enabled = enabled;
          toggle.classList.toggle("active", enabled);
          toggle.setAttribute("aria-checked", String(enabled));
          toggle.setAttribute("aria-label", enabled ? "当前启用，点击停用" : "当前停用，点击启用");
          stateLabel.textContent = enabled ? "启用" : "停用";
          const pageModal = page.blocks.find(item => item.type === "modal");
          if (pageModal) pageModal.text = enabled ? "确认保存并启用该借用规则？" : "确认保存为停用状态？停用规则不参与借用时间计算。";
        };
        toggle.addEventListener("click", event => {
          event.stopPropagation();
          updateStatus(!block.enabled);
        });
        row.appendChild(stateLabel);
        row.appendChild(toggle);
        panel.appendChild(row);
        wrap.appendChild(panel);
        updateStatus(block.enabled !== false);
      }
      if (block.type === "choiceList") {
        const choices = el("div", "exception-choices");
        block.items.forEach(item => {
          const choice = el("div", "exception-choice" + (item.title === block.active ? " active" : ""), `<span class="choice-mark"></span><div><strong>${item.title}</strong><div class="small muted">${item.description}</div></div>`);
          choice.addEventListener("click", event => {
            event.stopPropagation();
            choices.querySelectorAll(".exception-choice").forEach(node => node.classList.remove("active"));
            choice.classList.add("active");
          });
          choices.appendChild(choice);
        });
        wrap.appendChild(choices);
      }
      if (block.type === "deviceMultiSelect") {
        const picker = el("div", "");
        const summary = el("div", "device-pick-summary");
        const countText = el("strong", "", "已选择 0 台");
        const selectAll = el("div", "select-all", "全选当前结果");
        summary.appendChild(countText);
        summary.appendChild(selectAll);
        const list = el("div", "device-pick-list");
        const updateSelection = () => {
          const rows = [...list.querySelectorAll(".device-pick-item")];
          const selectedCount = rows.filter(row => row.classList.contains("selected")).length;
          countText.textContent = `已选择 ${selectedCount} 台`;
          selectAll.textContent = selectedCount === rows.length ? "取消全选" : "全选当前结果";
        };
        block.items.forEach(item => {
          const row = el("div", "device-pick-item" + (item.selected ? " selected" : ""));
          row.appendChild(el("span", "device-pick-check", "✓"));
          row.appendChild(el("div", "", `<div class="device-pick-name">${item.title}</div><div class="small muted">${item.meta}</div>`));
          if (item.badge) row.appendChild(el("span", "badge " + (item.badgeClass || ""), item.badge));
          row.addEventListener("click", event => {
            event.stopPropagation();
            row.classList.toggle("selected");
            updateSelection();
          });
          list.appendChild(row);
        });
        selectAll.addEventListener("click", event => {
          event.stopPropagation();
          const rows = [...list.querySelectorAll(".device-pick-item")];
          const shouldSelect = rows.some(row => !row.classList.contains("selected"));
          rows.forEach(row => row.classList.toggle("selected", shouldSelect));
          updateSelection();
        });
        picker.appendChild(summary);
        picker.appendChild(list);
        wrap.appendChild(picker);
        updateSelection();
      }
      if (block.type === "minimumCategoryMultiSelect") {
        const picker = el("div", "minimum-category-picker");
        const selectedNames = block.selectedNames instanceof Set
          ? block.selectedNames
          : new Set(block.items.filter(item => item.selected).map(item => item.name));
        const head = el("button", "minimum-category-picker-head");
        head.type = "button";
        const countText = el("strong", "", "");
        const arrow = el("i", "", "⌄");
        const headStatus = el("span", "minimum-category-picker-status");
        headStatus.appendChild(countText);
        headStatus.appendChild(arrow);
        const hint = el("span", "", "保存前至少选择 1 个最小分类");
        head.appendChild(el("div", "", `<small>${block.title || "适用设备"}</small><b>选择最小分类</b>`));
        head.appendChild(headStatus);
        const preview = el("div", "minimum-category-selected-preview");
        const selectionTools = el("div", "minimum-category-picker-tools");
        const selectAll = el("button", "minimum-category-picker-tool primary", "全选");
        selectAll.type = "button";
        selectionTools.appendChild(selectAll);
        const list = el("div", "minimum-category-pick-list");
        const setExpanded = expanded => {
          picker.classList.toggle("expanded", expanded);
          head.setAttribute("aria-expanded", String(expanded));
          arrow.textContent = expanded ? "⌃" : "⌄";
        };
        const updateSelection = () => {
          countText.textContent = `已选择 ${selectedNames.size} 个`;
          preview.innerHTML = "";
          if (selectedNames.size) {
            selectedNames.forEach(name => preview.appendChild(el("span", "", name)));
          } else {
            preview.appendChild(el("small", "minimum-category-empty-selection", "暂未选择分类"));
          }
          block.items.forEach(item => {
            item.selected = selectedNames.has(item.name);
          });
          list.querySelectorAll(".minimum-category-pick-item").forEach(row => {
            const selected = selectedNames.has(row.dataset.name);
            row.classList.toggle("selected", selected);
            row.setAttribute("aria-pressed", String(selected));
          });
          const hasSelection = selectedNames.size > 0;
          selectAll.textContent = hasSelection ? "取消选择" : "全选";
          selectAll.classList.toggle("active", hasSelection);
          hint.classList.toggle("visible", selectedNames.size === 0);
        };
        head.addEventListener("click", event => {
          event.stopPropagation();
          setExpanded(!picker.classList.contains("expanded"));
        });
        block.items.forEach(item => {
          const row = el("button", "minimum-category-pick-item", `<span class="minimum-category-pick-icon">${item.icon || item.name.slice(0, 1)}</span><span class="minimum-category-pick-main"><small>${item.parent} · 最小分类</small><strong>${item.name}</strong><em>${item.count} 台设备</em></span><span class="minimum-category-pick-check">✓</span>`);
          row.type = "button";
          row.dataset.name = item.name;
          row.addEventListener("click", event => {
            event.stopPropagation();
            if (selectedNames.has(item.name)) selectedNames.delete(item.name);
            else selectedNames.add(item.name);
            updateSelection();
          });
          list.appendChild(row);
        });
        selectAll.addEventListener("click", event => {
          event.stopPropagation();
          if (selectedNames.size) selectedNames.clear();
          else block.items.forEach(item => selectedNames.add(item.name));
          updateSelection();
        });
        picker.appendChild(head);
        picker.appendChild(preview);
        picker.appendChild(selectionTools);
        picker.appendChild(list);
        picker.appendChild(hint);
        wrap.appendChild(picker);
        setExpanded(false);
        updateSelection();
      }
      if (block.type === "filterList") {
        const tabs = el("div", "tabs record-filters");
        const list = el("div", "menu");
        const renderItems = filter => {
          list.innerHTML = "";
          const visibleItems = block.items.filter(item => filter === "全部" || item.category === filter);
          visibleItems.forEach(item => {
            list.appendChild(block.cardMode === "minimumCategoryDevice"
              ? buildMinimumCategoryDeviceCard(item)
              : buildListCard(item));
          });
          if (!visibleItems.length) {
            list.appendChild(el("div", "panel muted small", block.emptyText || "当前筛选下暂无记录"));
          }
        };
        block.filters.forEach(filter => {
          const tab = el("div", "tab" + (filter === block.active ? " active" : ""), filter);
          tab.addEventListener("click", event => {
            event.stopPropagation();
            tabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
            renderItems(filter);
          });
          tabs.appendChild(tab);
        });
        wrap.appendChild(tabs);
        wrap.appendChild(list);
        renderItems(block.active);
      }
      if (block.type === "borrowApprovalList") {
        const filters = el("div", "borrow-approval-filters");
        const statusLabel = el("div", "borrow-approval-filter-label borrow-approval-status-label", "借用状态");
        const statusTabs = el("div", "borrow-approval-status-tabs");
        const tools = el("div", "borrow-approval-tools");
        const searchBox = el("label", "borrow-approval-search");
        const searchInput = el("input");
        const exportButton = el("button", "borrow-approval-export", "导出记录");
        const resultHead = el("div", "borrow-approval-result-head");
        const batchBar = el("div", "borrow-approval-batch-bar");
        const list = el("div", "borrow-approval-list");
        const selected = new Set();
        let activeStatus = block.activeStatus || block.statusFilters[0];
        let searchText = "";
        let batchMode = false;

        exportButton.type = "button";
        searchInput.type = "search";
        searchInput.placeholder = block.searchPlaceholder || "搜索设备名、设备编号或借用人";
        searchBox.appendChild(el("span", "", "⌕"));
        searchBox.appendChild(searchInput);
        tools.appendChild(searchBox);
        tools.appendChild(exportButton);
        filters.appendChild(statusLabel);
        filters.appendChild(statusTabs);
        filters.appendChild(tools);

        const matchesSearch = item => {
          if (!searchText) return true;
          return [item.device, item.code, item.applicant]
            .some(value => String(value || "").toLowerCase().includes(searchText));
        };
        const filteredItems = (status = activeStatus) => block.items.filter(item => (
          item.category === status && matchesSearch(item)
        ));
        const statusTone = status => ({
          "待审批": "warn",
          "待领取": "info",
          "待归还": "ok",
          "逾期": "bad",
          "拒绝": "muted-status"
        }[status] || "");
        const updateStatusTabs = () => {
          statusTabs.querySelectorAll(".borrow-approval-status-tab").forEach(tab => {
            const status = tab.dataset.status;
            tab.classList.toggle("active", status === activeStatus);
            const count = block.items.filter(item => item.category === status && matchesSearch(item)).length;
            tab.querySelector("em").textContent = count;
          });
        };
        const openExportDialog = () => {
          const phone = wrap.closest(".phone");
          if (!phone) return;
          phone.querySelectorAll(".scrim, .modal").forEach(node => node.remove());
          const scrim = el("div", "scrim");
          const box = el("div", "modal borrow-export-modal");
          const head = el("div", "borrow-export-head", `<span>导</span><div><strong>导出借用记录</strong><small>选择需要导出的日期范围</small></div>`);
          const form = el("div", "borrow-export-form");
          const startField = el("label", "borrow-export-field");
          const endField = el("label", "borrow-export-field");
          const exportStart = el("input", "borrow-export-date-input");
          const exportEnd = el("input", "borrow-export-date-input");
          const summary = el("div", "borrow-export-summary");
          const error = el("div", "borrow-export-error");
          const actions = el("div", "borrow-export-actions");
          const cancel = el("button", "borrow-export-cancel", "取消");
          const confirm = el("button", "borrow-export-confirm", "开始导出");
          exportStart.type = exportEnd.type = "date";
          exportStart.value = block.exportStartDate || "";
          exportEnd.value = block.exportEndDate || "";
          cancel.type = confirm.type = "button";
          startField.appendChild(el("span", "", "开始日期"));
          startField.appendChild(exportStart);
          endField.appendChild(el("span", "", "结束日期"));
          endField.appendChild(exportEnd);
          form.appendChild(startField);
          form.appendChild(el("span", "borrow-export-separator", "至"));
          form.appendChild(endField);
          const exportItems = () => block.items.filter(item => (
            item.category === activeStatus
            && matchesSearch(item)
            && (!exportStart.value || item.date >= exportStart.value)
            && (!exportEnd.value || item.date <= exportEnd.value)
          ));
          const updateSummary = () => {
            const count = exportItems().length;
            summary.innerHTML = `<span>当前筛选</span><strong>${activeStatus} · ${count} 条记录</strong><small>同时保留当前搜索条件</small>`;
            error.textContent = "";
          };
          const dismiss = event => {
            event?.stopPropagation();
            scrim.remove();
            box.remove();
          };
          [exportStart, exportEnd].forEach(input => input.addEventListener("input", updateSummary));
          cancel.addEventListener("click", dismiss);
          scrim.addEventListener("click", dismiss);
          confirm.addEventListener("click", event => {
            event.stopPropagation();
            if (!exportStart.value || !exportEnd.value) {
              error.textContent = "请选择完整的开始日期和结束日期";
              return;
            }
            if (exportStart.value > exportEnd.value) {
              error.textContent = "开始日期不能晚于结束日期";
              return;
            }
            const count = exportItems().length;
            block.exportStartDate = exportStart.value;
            block.exportEndDate = exportEnd.value;
            box.innerHTML = "";
            box.classList.add("completed");
            box.appendChild(el("div", "borrow-export-complete", `<span>✓</span><strong>导出任务已创建</strong><small>${exportStart.value} 至 ${exportEnd.value}<br>${activeStatus}记录共 ${count} 条</small>`));
            const done = el("button", "borrow-export-confirm wide", "完成");
            done.type = "button";
            done.addEventListener("click", dismiss);
            box.appendChild(done);
          });
          actions.appendChild(cancel);
          actions.appendChild(confirm);
          box.appendChild(head);
          box.appendChild(form);
          box.appendChild(summary);
          box.appendChild(error);
          box.appendChild(actions);
          phone.appendChild(scrim);
          phone.appendChild(box);
          updateSummary();
        };
        const updateBatchBar = visibleItems => {
          batchBar.innerHTML = "";
          const isVisible = batchMode && activeStatus === "待审批";
          batchBar.classList.toggle("visible", isVisible);
          if (!isVisible) return;
          const visibleIds = visibleItems.map(item => item.id);
          const allSelected = visibleIds.length > 0 && visibleIds.every(id => selected.has(id));
          const selectAll = el("button", "borrow-approval-select-all" + (allSelected ? " active" : ""), `${allSelected ? "✓ " : ""}全选`);
          const selectedText = el("span", "borrow-approval-selected-count", `已选 ${selected.size} 项`);
          const actions = el("div", "borrow-approval-batch-actions");
          const reject = el("button", "borrow-approval-batch-reject" + (selected.size ? "" : " disabled"), "批量驳回");
          const approve = el("button", "borrow-approval-batch-approve" + (selected.size ? "" : " disabled"), "批量通过");
          selectAll.type = reject.type = approve.type = "button";
          selectAll.addEventListener("click", event => {
            event.stopPropagation();
            if (allSelected) visibleIds.forEach(id => selected.delete(id));
            else visibleIds.forEach(id => selected.add(id));
            renderAll();
          });
          const batchProcess = nextStatus => {
            if (!selected.size) {
              showConfirm(wrap.closest(".phone"), page, {
                label: "批量处理",
                confirmTitle: "请先选择申请",
                confirmText: "请勾选至少一条待审批借用申请后再进行批量处理。"
              });
              return;
            }
            const actionLabel = nextStatus === "待领取" ? "批量通过" : "批量驳回";
            showConfirm(wrap.closest(".phone"), page, {
              label: actionLabel,
              confirmTitle: `${actionLabel}确认`,
              confirmText: `确认将已勾选的 ${selected.size} 条借用申请${nextStatus === "待领取" ? "通过并转入待领取" : "驳回"}？`,
              onConfirm: () => {
                block.items.forEach(item => {
                  if (!selected.has(item.id)) return;
                  item.category = nextStatus;
                  if (nextStatus === "待领取") {
                    item.approvedAt = "刚刚";
                    item.pickupDeadline = item.borrowedAt;
                  } else {
                    item.rejectedAt = "刚刚";
                  }
                  delete item.target;
                });
                selected.clear();
                batchMode = false;
                renderAll();
              }
            });
          };
          reject.addEventListener("click", event => {
            event.stopPropagation();
            batchProcess("拒绝");
          });
          approve.addEventListener("click", event => {
            event.stopPropagation();
            batchProcess("待领取");
          });
          actions.appendChild(reject);
          actions.appendChild(approve);
          batchBar.appendChild(selectAll);
          batchBar.appendChild(selectedText);
          batchBar.appendChild(actions);
        };
        const processItem = (item, nextStatus) => {
          const actionLabel = nextStatus === "待领取" ? "通过申请" : "驳回申请";
          showConfirm(wrap.closest(".phone"), page, {
            label: actionLabel,
            confirmTitle: `${actionLabel}确认`,
            confirmText: `确认${nextStatus === "待领取" ? "通过" : "驳回"}${item.applicant}对${item.device}的借用申请？`,
            onConfirm: () => {
              item.category = nextStatus;
              if (nextStatus === "待领取") {
                item.approvedAt = "刚刚";
                item.pickupDeadline = item.borrowedAt;
              } else {
                item.rejectedAt = "刚刚";
              }
              delete item.target;
              selected.delete(item.id);
              renderAll();
            }
          });
        };
        const buildApprovalCard = item => {
          const isPending = item.category === "待审批";
          const isSelecting = isPending && batchMode;
          const card = el(
            "article",
            "borrow-approval-card"
              + (isPending && !batchMode ? " actionable" : " read-only")
              + (isSelecting ? " batch-selecting" : "")
              + (isSelecting && selected.has(item.id) ? " selected" : "")
          );
          const head = el("div", "borrow-approval-card-head");
          const identity = el("div", "borrow-approval-identity");
          const statement = el("div", "borrow-approval-statement", `<strong>${item.applicant}</strong><span>借用</span><b>${item.device}</b>`);
          const subline = el("div", "borrow-approval-subline", `${item.applicantRole} · 提交于 ${item.submittedAt}`);
          const badge = el("span", `badge ${statusTone(item.category)}`, item.category);
          const device = el("div", "borrow-approval-device-row", `<span>${item.code}</span><strong>${item.location}</strong>`);
          const timeGrid = el("div", "borrow-approval-time-grid");
          identity.appendChild(statement);
          identity.appendChild(subline);
          if (isSelecting) {
            const check = el("button", "borrow-approval-check" + (selected.has(item.id) ? " selected" : ""), selected.has(item.id) ? "✓" : "");
            check.type = "button";
            check.setAttribute("aria-label", selected.has(item.id) ? "取消选择" : "选择申请");
            check.addEventListener("click", event => {
              event.stopPropagation();
              if (selected.has(item.id)) selected.delete(item.id);
              else selected.add(item.id);
              renderAll();
            });
            head.appendChild(check);
          }
          head.appendChild(identity);
          head.appendChild(badge);
          timeGrid.appendChild(el("div", "", `<small>计划借用</small><strong>${item.borrowedAt}</strong>`));
          timeGrid.appendChild(el("div", "", `<small>预计归还</small><strong>${item.returnAt}</strong>`));
          card.appendChild(head);
          card.appendChild(device);
          card.appendChild(timeGrid);
          if (!isPending) {
            const statusDetails = {
              "待领取": [["审批通过", item.approvedAt || "刚刚"], ["领取截止", item.pickupDeadline || item.borrowedAt]],
              "待归还": [["实际领取", item.pickedUpAt || item.borrowedAt], ["剩余时间", item.remaining || "等待归还"]],
              "逾期": [["实际领取", item.pickedUpAt || item.borrowedAt], ["逾期状态", item.overdue || "已逾期"]],
              "拒绝": [["提交时间", item.submittedAt], ["拒绝时间", item.rejectedAt || "刚刚"]]
            }[item.category] || [];
            const statusGrid = el("div", "borrow-approval-status-details");
            statusDetails.forEach(([label, value]) => statusGrid.appendChild(el("div", "", `<small>${label}</small><strong>${value}</strong>`)));
            card.appendChild(statusGrid);
          }
          if (isPending && !batchMode) {
            const footer = el("div", "borrow-approval-card-footer");
            const actions = el("div", "borrow-approval-card-actions");
            const reject = el("button", "borrow-approval-reject", "驳回");
            const approve = el("button", "borrow-approval-approve", "通过");
            reject.type = approve.type = "button";
            reject.addEventListener("click", event => {
              event.stopPropagation();
              processItem(item, "拒绝");
            });
            approve.addEventListener("click", event => {
              event.stopPropagation();
              processItem(item, "待领取");
            });
            actions.appendChild(reject);
            actions.appendChild(approve);
            footer.appendChild(actions);
            card.appendChild(footer);
            makeClickable(card, item.target);
          } else if (isSelecting) {
            card.addEventListener("click", event => {
              event.stopPropagation();
              if (selected.has(item.id)) selected.delete(item.id);
              else selected.add(item.id);
              renderAll();
            });
          }
          return card;
        };
        const renderAll = () => {
          const visibleItems = filteredItems();
          list.innerHTML = "";
          resultHead.innerHTML = "";
          resultHead.appendChild(el("span", "", `${activeStatus}记录`));
          const resultActions = el("div", "record-result-actions");
          resultActions.appendChild(el("strong", "", `${visibleItems.length} 条`));
          if (activeStatus === "待审批") {
            const batchToggle = el("button", "batch-manage-toggle" + (batchMode ? " active" : ""), batchMode ? "取消批量" : "批量管理");
            batchToggle.type = "button";
            batchToggle.addEventListener("click", event => {
              event.stopPropagation();
              batchMode = !batchMode;
              selected.clear();
              renderAll();
            });
            resultActions.appendChild(batchToggle);
          }
          resultHead.appendChild(resultActions);
          visibleItems.forEach(item => list.appendChild(buildApprovalCard(item)));
          if (!visibleItems.length) list.appendChild(el("div", "panel muted small", "当前状态和搜索条件下暂无记录"));
          updateBatchBar(visibleItems);
          updateStatusTabs();
        };

        block.statusFilters.forEach(status => {
          const tab = el("button", "borrow-approval-status-tab" + (status === activeStatus ? " active" : ""), `<span>${status}</span><em>0</em>`);
          tab.type = "button";
          tab.dataset.status = status;
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeStatus = status;
            selected.clear();
            batchMode = false;
            renderAll();
          });
          statusTabs.appendChild(tab);
        });
        searchInput.addEventListener("input", () => {
          searchText = searchInput.value.trim().toLowerCase();
          selected.clear();
          batchMode = false;
          renderAll();
        });
        exportButton.addEventListener("click", event => {
          event.stopPropagation();
          openExportDialog();
        });

        wrap.appendChild(filters);
        wrap.appendChild(resultHead);
        wrap.appendChild(list);
        wrap.appendChild(batchBar);
        renderAll();
      }
      if (block.type === "exceptionManagementList") {
        const filters = el("div", "borrow-approval-filters exception-management-filters");
        const dateRange = el("div", "borrow-approval-date-range");
        const startInput = el("input", "borrow-approval-date-input");
        const endInput = el("input", "borrow-approval-date-input");
        const dateApply = el("button", "borrow-approval-date-apply", "查询");
        const statusTabs = el("div", "exception-management-status-tabs");
        const categoryTabs = el("div", "exception-management-category-tabs");
        const resultHead = el("div", "borrow-approval-result-head");
        const batchBar = el("div", "borrow-approval-batch-bar exception-management-batch-bar");
        const list = el("div", "exception-management-list");
        const selected = new Set();
        let activeStatus = block.activeStatus || block.statusFilters[0];
        let activeCategory = block.activeCategory || block.categoryFilters[0];
        let batchMode = false;

        startInput.type = endInput.type = "date";
        startInput.value = block.startDate || "";
        endInput.value = block.endDate || "";
        dateApply.type = "button";
        dateRange.appendChild(startInput);
        dateRange.appendChild(el("span", "borrow-approval-date-separator", "至"));
        dateRange.appendChild(endInput);
        dateRange.appendChild(dateApply);
        filters.appendChild(el("div", "borrow-approval-filter-label", "日期范围"));
        filters.appendChild(dateRange);
        filters.appendChild(el("div", "borrow-approval-filter-label borrow-approval-status-label", "处理状态"));
        filters.appendChild(statusTabs);
        filters.appendChild(el("div", "borrow-approval-filter-label exception-management-category-label", "异常对象"));
        filters.appendChild(categoryTabs);

        const matchesDate = item => (
          (!startInput.value || item.date >= startInput.value)
          && (!endInput.value || item.date <= endInput.value)
        );
        const visibleItems = () => block.items.filter(item => (
          item.status === activeStatus && item.category === activeCategory && matchesDate(item)
        ));
        const statusTone = status => ({
          "待通过": "warn",
          "待处理": "bad",
          "已恢复": "ok",
          "已驳回": "muted-status"
        }[status] || "");
        const updateFilterCounts = () => {
          statusTabs.querySelectorAll(".exception-management-status-tab").forEach(tab => {
            const status = tab.dataset.status;
            const count = block.items.filter(item => item.status === status && item.category === activeCategory && matchesDate(item)).length;
            tab.classList.toggle("active", status === activeStatus);
            tab.querySelector("em").textContent = count;
          });
          categoryTabs.querySelectorAll(".exception-management-category-tab").forEach(tab => {
            const category = tab.dataset.category;
            const count = block.items.filter(item => item.category === category && item.status === activeStatus && matchesDate(item)).length;
            tab.classList.toggle("active", category === activeCategory);
            tab.querySelector("em").textContent = count;
          });
        };
        const processRecords = (ids, nextStatus) => {
          block.items.forEach(item => {
            if (ids.has(item.id)) item.status = nextStatus;
          });
          selected.clear();
          batchMode = false;
          renderAll();
        };
        const confirmProcess = (ids, nextStatus, entityLabel = "") => {
          if (!ids.size) {
            showConfirm(wrap.closest(".phone"), page, {
              label: "批量处理",
              confirmTitle: "请先选择异常",
              confirmText: "请勾选至少一条待通过异常记录后再进行批量处理。"
            });
            return;
          }
          const isApprove = nextStatus === "待处理";
          showConfirm(wrap.closest(".phone"), page, {
            label: isApprove ? "通过异常" : "驳回异常",
            confirmTitle: `${isApprove ? "通过" : "驳回"}异常确认`,
            confirmText: entityLabel
              ? `确认${isApprove ? "通过" : "驳回"}“${entityLabel}”的异常记录？`
              : `确认批量${isApprove ? "通过" : "驳回"}已勾选的 ${ids.size} 条异常记录？`,
            onConfirm: () => processRecords(ids, nextStatus)
          });
        };
        const updateBatchBar = items => {
          batchBar.innerHTML = "";
          const isVisible = batchMode && activeStatus === "待通过";
          batchBar.classList.toggle("visible", isVisible);
          if (!isVisible) return;
          const ids = items.map(item => item.id);
          const allSelected = ids.length > 0 && ids.every(id => selected.has(id));
          const selectAll = el("button", "borrow-approval-select-all" + (allSelected ? " active" : ""), `${allSelected ? "✓ " : ""}全选`);
          const selectedText = el("span", "borrow-approval-selected-count", `已选 ${selected.size} 项`);
          const actions = el("div", "borrow-approval-batch-actions");
          const reject = el("button", "borrow-approval-batch-reject" + (selected.size ? "" : " disabled"), "批量驳回");
          const approve = el("button", "borrow-approval-batch-approve" + (selected.size ? "" : " disabled"), "批量通过");
          selectAll.type = reject.type = approve.type = "button";
          selectAll.addEventListener("click", event => {
            event.stopPropagation();
            if (allSelected) ids.forEach(id => selected.delete(id));
            else ids.forEach(id => selected.add(id));
            renderAll();
          });
          reject.addEventListener("click", event => {
            event.stopPropagation();
            confirmProcess(new Set(selected), "已驳回");
          });
          approve.addEventListener("click", event => {
            event.stopPropagation();
            confirmProcess(new Set(selected), "待处理");
          });
          actions.appendChild(reject);
          actions.appendChild(approve);
          batchBar.appendChild(selectAll);
          batchBar.appendChild(selectedText);
          batchBar.appendChild(actions);
        };
        const buildExceptionCard = item => {
          const isPending = item.status === "待通过";
          const isSelecting = isPending && batchMode;
          const card = el(
            "article",
            `exception-management-card ${item.category === "柜机" ? "cabinet" : "device"}`
              + (isSelecting ? " batch-selecting" : "")
              + (isSelecting && selected.has(item.id) ? " selected" : "")
          );
          const head = el("div", "exception-management-card-head");
          if (isSelecting) {
            const check = el("button", "borrow-approval-check" + (selected.has(item.id) ? " selected" : ""), selected.has(item.id) ? "✓" : "");
            check.type = "button";
            check.setAttribute("aria-label", selected.has(item.id) ? "取消选择" : "选择异常");
            check.addEventListener("click", event => {
              event.stopPropagation();
              if (selected.has(item.id)) selected.delete(item.id);
              else selected.add(item.id);
              renderAll();
            });
            head.appendChild(check);
          }
          head.appendChild(el("span", "exception-management-icon", item.category === "柜机" ? "柜" : "设"));
          head.appendChild(el("div", "exception-management-identity", `<small>${item.exceptionType}</small><strong>${item.entity}</strong><em>${item.code}</em>`));
          head.appendChild(el("span", `badge ${statusTone(item.status)}`, item.status));
          const details = el("div", "exception-management-details");
          details.appendChild(el("div", "", `<small>${item.category === "柜机" ? "安装位置" : "存放位置"}</small><strong>${item.location}</strong>`));
          details.appendChild(el("div", "", `<small>上报来源</small><strong>${item.reportSource}</strong>`));
          details.appendChild(el("div", "", `<small>上报时间</small><strong>${item.reportedAt}</strong>`));
          const description = el("p", "exception-management-description", item.description);
          const footer = el("div", "exception-management-card-footer");
          if (!batchMode) footer.appendChild(el("span", "", "点击卡片查看异常详情"));
          if (isPending && !batchMode) {
            const actions = el("div", "exception-management-card-actions");
            const reject = el("button", "borrow-approval-reject", "驳回");
            const approve = el("button", "borrow-approval-approve", "通过");
            reject.type = approve.type = "button";
            reject.addEventListener("click", event => {
              event.stopPropagation();
              confirmProcess(new Set([item.id]), "已驳回", item.entity);
            });
            approve.addEventListener("click", event => {
              event.stopPropagation();
              confirmProcess(new Set([item.id]), "待处理", item.entity);
            });
            actions.appendChild(reject);
            actions.appendChild(approve);
            footer.appendChild(actions);
          }
          card.appendChild(head);
          card.appendChild(details);
          card.appendChild(description);
          if (footer.childNodes.length) card.appendChild(footer);
          if (isSelecting) {
            card.addEventListener("click", event => {
              event.stopPropagation();
              if (selected.has(item.id)) selected.delete(item.id);
              else selected.add(item.id);
              renderAll();
            });
          } else {
            card.addEventListener("click", event => {
              event.stopPropagation();
              uiState.selectedExceptionRecord = item;
              openPage("18d-exception-management-detail");
            });
          }
          return card;
        };
        const renderAll = () => {
          const items = visibleItems();
          list.innerHTML = "";
          resultHead.innerHTML = "";
          resultHead.appendChild(el("span", "", `${activeCategory} · ${activeStatus}`));
          const resultActions = el("div", "record-result-actions");
          resultActions.appendChild(el("strong", "", `${items.length} 条`));
          if (activeStatus === "待通过") {
            const batchToggle = el("button", "batch-manage-toggle" + (batchMode ? " active" : ""), batchMode ? "取消批量" : "批量管理");
            batchToggle.type = "button";
            batchToggle.addEventListener("click", event => {
              event.stopPropagation();
              batchMode = !batchMode;
              selected.clear();
              renderAll();
            });
            resultActions.appendChild(batchToggle);
          }
          resultHead.appendChild(resultActions);
          items.forEach(item => list.appendChild(buildExceptionCard(item)));
          if (!items.length) list.appendChild(el("div", "panel muted small", "当前日期、状态和异常对象下暂无记录"));
          updateBatchBar(items);
          updateFilterCounts();
        };

        block.statusFilters.forEach(status => {
          const tab = el("button", "exception-management-status-tab" + (status === activeStatus ? " active" : ""), `<span>${status}</span><em>0</em>`);
          tab.type = "button";
          tab.dataset.status = status;
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeStatus = status;
            selected.clear();
            batchMode = false;
            renderAll();
          });
          statusTabs.appendChild(tab);
        });
        block.categoryFilters.forEach(category => {
          const tab = el("button", "exception-management-category-tab" + (category === activeCategory ? " active" : ""), `<span>${category}</span><em>0</em>`);
          tab.type = "button";
          tab.dataset.category = category;
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeCategory = category;
            selected.clear();
            batchMode = false;
            renderAll();
          });
          categoryTabs.appendChild(tab);
        });
        dateApply.addEventListener("click", event => {
          event.stopPropagation();
          selected.clear();
          batchMode = false;
          renderAll();
        });

        wrap.appendChild(filters);
        wrap.appendChild(resultHead);
        wrap.appendChild(list);
        wrap.appendChild(batchBar);
        renderAll();
      }
      if (block.type === "historyRecordList") {
        const dateTabs = el("div", "tabs record-filters history-date-filters");
        const customRange = el("div", "history-custom-range");
        const startInput = el("input", "history-date-input");
        const endInput = el("input", "history-date-input");
        const applyButton = el("button", "history-date-apply", "查询");
        const typeTabs = el("div", "tabs record-filters history-type-filters");
        const resultHead = el("div", "history-result-head");
        const list = el("div", "menu history-record-results");
        let activeDate = block.activeDate || "今日";
        let activeType = block.activeType || "全部";
        startInput.type = endInput.type = "date";
        startInput.value = block.customStart || "";
        endInput.value = block.customEnd || "";
        applyButton.type = "button";
        customRange.appendChild(startInput);
        customRange.appendChild(el("span", "history-date-separator", "至"));
        customRange.appendChild(endInput);
        customRange.appendChild(applyButton);
        const matchesDate = item => {
          if (activeDate === "今日") return item.daysAgo === 0;
          if (activeDate === "近7天") return item.daysAgo < 7;
          if (activeDate === "近30天") return item.daysAgo < 30;
          return (!startInput.value || item.date >= startInput.value) && (!endInput.value || item.date <= endInput.value);
        };
        const renderItems = () => {
          list.innerHTML = "";
          const visibleItems = block.items.filter(item => matchesDate(item) && (activeType === "全部" || item.category === activeType));
          resultHead.innerHTML = `<span>筛选结果</span><strong>${visibleItems.length} 条</strong>`;
          visibleItems.forEach(item => list.appendChild(buildListCard(item)));
          if (!visibleItems.length) list.appendChild(el("div", "panel muted small", "当前日期和类型下暂无操作记录"));
        };
        block.dateFilters.forEach(filter => {
          const tab = el("div", "tab" + (filter === activeDate ? " active" : ""), filter);
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeDate = filter;
            dateTabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
            customRange.classList.toggle("visible", filter === "自定义");
            renderItems();
          });
          dateTabs.appendChild(tab);
        });
        block.typeFilters.forEach(filter => {
          const tab = el("div", "tab" + (filter === activeType ? " active" : ""), filter);
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeType = filter;
            typeTabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
            renderItems();
          });
          typeTabs.appendChild(tab);
        });
        applyButton.addEventListener("click", event => {
          event.stopPropagation();
          renderItems();
        });
        wrap.appendChild(el("div", "history-filter-label", "日期范围"));
        wrap.appendChild(dateTabs);
        wrap.appendChild(customRange);
        wrap.appendChild(el("div", "history-filter-label history-type-label", "操作类型"));
        wrap.appendChild(typeTabs);
        wrap.appendChild(resultHead);
        wrap.appendChild(list);
        customRange.classList.toggle("visible", activeDate === "自定义");
        renderItems();
      }
      if (block.type === "deviceBorrowHistory") {
        const shell = el("div", "device-history-shell");
        const device = block.device;
        const completedCount = block.items.filter(item => item.status === "已归还").length;
        const identity = el("div", "device-history-identity");
        identity.appendChild(el("div", "device-history-mark", device.identifyType === "RFID" ? "RF" : device.name.slice(0, 1)));
        identity.appendChild(el("div", "device-history-copy", `<small>当前设备借还档案</small><strong>${device.name}</strong><em>${device.code} · ${device.identifyType}</em><span>${device.location}</span>`));
        identity.appendChild(el("div", "device-history-total", `<strong>${block.items.length}</strong><small>累计记录</small>`));
        const metrics = el("div", "device-history-metrics", `<span><strong>${completedCount}</strong><small>已归还</small></span><span><strong>${block.items.length - completedCount}</strong><small>借用中</small></span><span><strong>${device.identifyType}</strong><small>识别方式</small></span>`);
        const filters = el("div", "device-history-filters");
        const rangeTabs = el("div", "device-history-range-tabs");
        const dateRange = el("div", "device-history-date-range");
        const startInput = el("input", "device-history-date-input");
        const endInput = el("input", "device-history-date-input");
        const applyButton = el("button", "device-history-date-apply", "查询");
        const resultHead = el("div", "device-history-result-head");
        const list = el("div", "device-history-list");
        let activeRange = block.activeRange || "近30天";
        startInput.type = endInput.type = "date";
        startInput.value = block.startDate || "";
        endInput.value = block.endDate || "";
        applyButton.type = "button";
        dateRange.appendChild(startInput);
        dateRange.appendChild(el("span", "", "至"));
        dateRange.appendChild(endInput);
        dateRange.appendChild(applyButton);
        filters.appendChild(el("div", "device-history-filter-label", "日期范围"));
        filters.appendChild(rangeTabs);
        filters.appendChild(dateRange);

        const matchesRange = item => {
          if (activeRange === "全部") return true;
          if (activeRange === "近7天") return item.daysAgo < 7;
          if (activeRange === "近30天") return item.daysAgo < 30;
          return (!startInput.value || item.date >= startInput.value)
            && (!endInput.value || item.date <= endInput.value);
        };
        const setActiveRange = range => {
          activeRange = range;
          rangeTabs.querySelectorAll(".device-history-range-tab").forEach(tab => {
            tab.classList.toggle("active", tab.dataset.range === activeRange);
          });
        };
        const renderRecords = () => {
          const items = block.items.filter(matchesRange);
          list.innerHTML = "";
          resultHead.innerHTML = `<span>${activeRange === "自定义" ? "自定义日期" : activeRange}记录</span><strong>${items.length} 条</strong>`;
          items.forEach(item => {
            const active = item.status === "借用中";
            const card = el("article", "device-history-card" + (active ? " active" : ""));
            card.appendChild(el("div", "device-history-card-head", `<span><small>借用人</small><strong>${item.borrower}</strong></span><span class="device-history-status ${active ? "active" : ""}">${item.status}</span>`));
            card.appendChild(el("div", "device-history-time-flow", `<span><i>借</i><small>借用时间</small><strong>${item.borrowedAt}</strong></span><b>→</b><span><i>还</i><small>${active ? "预计归还" : "归还时间"}</small><strong>${item.returnAt}</strong></span>`));
            card.appendChild(el("div", "device-history-card-meta", `<span><small>记录编号</small><strong>${item.id}</strong></span><span><small>存放位置</small><strong>${item.location}</strong></span>`));
            list.appendChild(card);
          });
          if (!items.length) {
            list.appendChild(el("div", "device-history-empty", `<span>记</span><strong>当前日期范围内没有借还记录</strong><small>可调整日期范围后重新查询</small>`));
          }
        };
        ["全部", "近7天", "近30天", "自定义"].forEach(range => {
          const tab = el("button", "device-history-range-tab" + (range === activeRange ? " active" : ""), range);
          tab.type = "button";
          tab.dataset.range = range;
          tab.addEventListener("click", event => {
            event.stopPropagation();
            setActiveRange(range);
            renderRecords();
          });
          rangeTabs.appendChild(tab);
        });
        [startInput, endInput].forEach(input => input.addEventListener("input", () => {
          setActiveRange("自定义");
        }));
        applyButton.addEventListener("click", event => {
          event.stopPropagation();
          setActiveRange("自定义");
          renderRecords();
        });
        shell.appendChild(identity);
        shell.appendChild(metrics);
        shell.appendChild(filters);
        shell.appendChild(resultHead);
        shell.appendChild(list);
        wrap.appendChild(shell);
        renderRecords();
      }
      if (block.type === "multiFilterList") {
        const statusTabs = el("div", "tabs record-filters");
        const categoryChips = el("div", "chips");
        const list = el("div", "menu");
        let activeStatus = block.activeStatus || "全部";
        let activeCategory = block.activeCategory || "全部";
        const renderItems = () => {
          list.innerHTML = "";
          const visibleItems = block.items.filter(item => {
            const statusMatch = activeStatus === "全部" || item.status === activeStatus;
            const categoryMatch = activeCategory === "全部" || item.category === activeCategory;
            return statusMatch && categoryMatch;
          });
          visibleItems.forEach(item => list.appendChild(buildListCard(item)));
          if (!visibleItems.length) {
            list.appendChild(el("div", "panel muted small", "当前筛选条件下暂无异常记录"));
          }
        };
        block.statusFilters.forEach(status => {
          const tab = el("div", "tab" + (status === activeStatus ? " active" : ""), status);
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeStatus = status;
            statusTabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
            renderItems();
          });
          statusTabs.appendChild(tab);
        });
        block.categoryFilters.forEach(category => {
          const chip = el("div", "chip" + (category === activeCategory ? " active" : ""), category);
          chip.addEventListener("click", event => {
            event.stopPropagation();
            activeCategory = category;
            categoryChips.querySelectorAll(".chip").forEach(node => node.classList.remove("active"));
            chip.classList.add("active");
            renderItems();
          });
          categoryChips.appendChild(chip);
        });
        wrap.appendChild(statusTabs);
        wrap.appendChild(categoryChips);
        wrap.appendChild(list);
        renderItems();
      }
      if (block.type === "chips") {
        const chips = el("div", "chips");
        block.items.forEach((item, idx) => {
          const chip = el("div", "chip" + (idx === 0 ? " active" : ""), item);
          chip.addEventListener("click", event => {
            event.stopPropagation();
            chips.querySelectorAll(".chip").forEach(node => node.classList.remove("active"));
            chip.classList.add("active");
          });
          chips.appendChild(chip);
        });
        wrap.appendChild(chips);
      }
      if (block.type === "stats") {
        const grid = el("div", "grid4");
        block.items.forEach((item) => {
          const data = normalizeItem(item, ["num", "label"]);
          const stat = el("div", "stat", `<div class="num">${data.num}</div><div class="label">${data.label}</div>`);
          makeClickable(stat, data.target);
          grid.appendChild(stat);
        });
        wrap.appendChild(grid);
      }
      if (block.type === "quick") {
        wrap.appendChild(el("div", "caption", block.title));
        const grid = el("div", "grid3");
        block.items.forEach((item) => {
          const data = normalizeItem(item, ["symbol", "label"]);
          const quick = el("div", "quick", `<div class="symbol">${data.symbol}</div><div>${data.label}</div>`);
          makeClickable(quick, data.target);
          grid.appendChild(quick);
        });
        wrap.appendChild(grid);
      }
      if (block.type === "minimumCategoryList") {
        const list = el("div", "minimum-category-list");
        block.items.forEach(category => {
          const card = el("div", "minimum-category-card");
          const head = el("div", "minimum-category-card-head");
          head.appendChild(el("span", "minimum-category-icon", category.icon || category.name.slice(0, 1)));
          head.appendChild(el("span", "minimum-category-name", `<small>${category.parent} · 最小分类</small><strong>${category.name}</strong><em>${category.count} 台设备 · ${category.available} 台可用</em>`));
          head.appendChild(el("span", "minimum-category-arrow", "›"));
          card.addEventListener("click", () => {
            uiState.selectedMinimumCategory = category;
            openPage("08p-minimum-category-devices");
          });
          card.appendChild(head);
          list.appendChild(card);
        });
        wrap.appendChild(list);
      }
      if (block.type === "minimumCategoryHeader") {
        const category = block.category;
        const rule = category.flowRule;
        const header = el("div", "minimum-category-detail-head");
        header.appendChild(el("div", "minimum-category-detail-identity", `<span class="minimum-category-icon">${category.icon}</span><span><small>${category.parent} → ${category.name}</small><strong>${category.name}</strong><em>${category.count} 台设备 · ${category.available} 台可用</em></span>`));
        header.appendChild(el("div", "minimum-category-detail-rule", `<span><small>最长借用允许时长</small><strong>${rule.maximum === 0 ? "不限时" : `${rule.maximum} 小时`}</strong></span><span><small>当前规则</small><strong>${rule.borrowApproval ? "借用需审核" : "借用免审核"}${rule.noReturn ? " · 无需归还" : ""}</strong></span>`));
        const button = el("button", "minimum-category-config-button", "设置分类规则");
        button.type = "button";
        button.addEventListener("click", event => { event.stopPropagation(); uiState.selectedMinimumCategory = category; uiState.deviceFlowDraft = null; uiState.flowDraftCategoryName = null; openPage("08n-device-flow-setting"); });
        header.appendChild(button);
        wrap.appendChild(header);
      }
      if (block.type === "deviceManageTabs") {
        const tabs = el("div", "device-manage-tabs");
        [
          ["设备信息", "08a-add-device"],
          ["设备库存", "08f-device-stock"],
          ["信息绑定", "08g-device-binding"]
        ].forEach(([label, target]) => {
          const tab = el("button", "device-manage-tab" + (label === block.active ? " active" : ""), label);
          tab.type = "button";
          if (label !== block.active) {
            tab.addEventListener("click", event => {
              event.stopPropagation();
              openPage(target, { pushHistory: false });
            });
          }
          tabs.appendChild(tab);
        });
        wrap.appendChild(tabs);
      }
      if (block.type === "deviceInfoForm") {
        const form = el("div", "device-info-form-card");
        const imageRow = el("div", "device-info-image-row");
        const imagePreview = el("div", "device-info-image-preview" + (block.imageIcon ? " has-image" : ""), block.imageIcon || "＋");
        const imageCopy = el("div", "device-info-image-copy", `<strong>设备图片 <em>选填</em></strong><small>支持上传一张设备封面图</small><span>${block.imageIcon ? "已上传" : "未填写"}</span>`);
        const imageActions = el("div", "device-info-image-actions");
        const imageUpload = el("button", "device-info-image-button primary", block.imageIcon ? "替换" : "上传");
        const imageRemove = el("button", "device-info-image-button", "删除");
        imageUpload.type = imageRemove.type = "button";
        imageUpload.addEventListener("click", event => {
          event.stopPropagation();
          imagePreview.classList.add("has-image");
          imagePreview.textContent = block.imageIcon || "图";
          imageCopy.querySelector("span").textContent = "已选择设备封面图";
          imageUpload.textContent = "替换";
        });
        imageRemove.addEventListener("click", event => {
          event.stopPropagation();
          imagePreview.classList.remove("has-image");
          imagePreview.textContent = "＋";
          imageCopy.querySelector("span").textContent = "未填写";
          imageUpload.textContent = "上传";
        });
        imageActions.appendChild(imageUpload);
        imageActions.appendChild(imageRemove);
        imageRow.appendChild(imagePreview);
        imageRow.appendChild(imageCopy);
        imageRow.appendChild(imageActions);
        form.appendChild(imageRow);
        const addField = (label, controlHtml, hint = "") => {
          const row = el("label", "device-info-form-row", `<span>${label}</span>${controlHtml}${hint ? `<small>${hint}</small>` : ""}`);
          form.appendChild(row);
        };
        addField("设备名称 *", `<input type="text" value="${block.name || ""}" placeholder="请输入设备名称">`);
        addField("设备分类（最小分类）*", `<select><option value="">请选择最小分类</option>${block.categories.map(name => `<option value="${name}"${name === block.category ? " selected" : ""}>${name}</option>`).join("")}</select>`, "借用审核和前置条件自动继承分类；续借与归还审核暂未开放");
        addField("规格型号 *", `<input type="text" value="${block.model || ""}" placeholder="请输入规格型号">`);
        addField("识别方式 *", `<select><option${block.identifyType === "标签扫码" ? " selected" : ""}>标签扫码</option><option${block.identifyType === "RFID" ? " selected" : ""}>RFID</option></select>`);
        addField("设备价值（选填）", `<div class="device-info-money-input"><input type="number" min="0" step="0.01" value="${block.deviceValue || ""}" placeholder="暂不填写"><em>元</em></div>`, "用于设备资产信息展示，不填写不影响建档");
        addField("计量单位（选填）", `<select><option value="">暂不填写</option>${["台", "套", "件", "个", "组", "盒", "支"].map(unit => `<option value="${unit}"${unit === block.measurementUnit ? " selected" : ""}>${unit}</option>`).join("")}</select>`);
        addField("设备来源（选填）", `<select><option value="">暂不填写</option><option${block.source === "采购" ? " selected" : ""}>采购</option><option${block.source === "捐赠" ? " selected" : ""}>捐赠</option><option${block.source === "借入" ? " selected" : ""}>借入</option><option>其他</option></select>`);
        addField("购入日期（选填）", `<input type="text" value="${block.purchaseDate || ""}" placeholder="暂不填写">`);
        addField("关联说明书（选填）", `<select><option value="">暂不填写</option><option${block.manual ? " selected" : ""}>${block.manual || "DS1054Z 使用说明书"}</option><option>实验设备通用安全手册</option></select>`, "说明书从资源中心选择，可在设备详情中查看");
        wrap.appendChild(form);
      }
      if (block.type === "deviceInfoCatalog") {
        const list = el("div", "device-master-list");
        block.items.forEach(item => {
          const card = el("div", "device-master-card");
          const head = el("div", "device-master-head");
          head.appendChild(el("div", "device-master-image", item.icon || item.name.slice(0, 1)));
          head.appendChild(el("div", "device-master-main", `<div class="device-master-category">最小分类 · ${item.category}</div><strong>${item.name}</strong><small>规格型号 ${item.model || "未填写"}</small><div class="device-master-counts"><span>${item.identifyType}</span><span>${item.source}</span><span>购入 ${item.purchaseDate}</span></div>`));
          card.appendChild(head);
          const actions = el("div", "device-master-card-actions single");
          const edit = el("button", "device-master-action flow", "编辑设备信息");
          edit.type = "button";
          edit.addEventListener("click", event => {
            event.stopPropagation();
            uiState.selectedDeviceInfo = item;
            openPage(item.target || "08i-edit-device-info");
          });
          actions.appendChild(edit);
          card.appendChild(actions);
          list.appendChild(card);
        });
        wrap.appendChild(list);
      }
      if (block.type === "deviceFlowConfig") {
        const category = block.category;
        const rule = block.rule;
        const shell = el("div", "flow-config-shell");
        shell.appendChild(el("div", "flow-config-identity", `<span class="flow-config-icon">${category.icon || category.name.slice(0, 1)}</span><span><small>规则对象 · 设备最小分类</small><strong>${category.name}</strong><em>${category.parent} → ${category.name}</em></span>`));
        shell.appendChild(el("div", "flow-config-scope", `<span>适用范围</span><strong>该最小分类下全部设备</strong><small>历史订单保留提交时的规则，新配置仅影响后续申请</small>`));

        const makeSwitch = (enabled, label, onChange, disabled = false) => {
          const button = el("button", "switch-control" + (enabled ? " active" : "") + (disabled ? " disabled" : ""), `<span class="switch-thumb"></span>`);
          button.type = "button";
          button.setAttribute("role", "switch");
          button.setAttribute("aria-checked", String(enabled));
          button.setAttribute("aria-label", label);
          button.disabled = disabled;
          if (disabled) button.setAttribute("aria-disabled", "true");
          button.addEventListener("click", event => {
            event.stopPropagation();
            if (disabled) return;
            onChange(!button.classList.contains("active"));
          });
          return button;
        };

        const borrow = el("section", "flow-config-card borrow");
        borrow.appendChild(el("div", "flow-config-card-head", `<span class="flow-config-card-icon">借</span><span><strong>借用流程配置</strong><small>最长借用允许时长与借用审核</small></span><em>借用</em>`));
        const borrowGrid = el("div", "flow-config-grid single");
        const maxField = el("label", "flow-config-field", `<span>最长借用允许时长 *</span><div class="flow-number-input"><input type="number" min="0" max="8760" value="${rule.maximum}"><em>小时</em></div>`);
        const maximumInput = maxField.querySelector("input");
        maximumInput.addEventListener("input", () => { rule.maximum = Number(maximumInput.value); });
        borrowGrid.appendChild(maxField);
        borrow.appendChild(borrowGrid);
        borrow.appendChild(el("div", "flow-config-tip", "统一按小时设置；填写 0 表示不限制借用时长"));

        const approvalSwitchRow = el("div", "flow-config-switch-row divided");
        const approvalText = el("span", "", `<strong>借用审核</strong><small>${rule.borrowApproval ? "已开启审核" : "无需审核"}</small>`);
        const updateApproval = enabled => {
          rule.borrowApproval = enabled;
          approvalToggle.classList.toggle("active", enabled);
          approvalToggle.setAttribute("aria-checked", String(enabled));
          approvalText.querySelector("small").textContent = enabled ? "已开启审核" : "无需审核";
        };
        const approvalToggle = makeSwitch(rule.borrowApproval, "切换借用审核", updateApproval);
        approvalSwitchRow.appendChild(approvalText);
        approvalSwitchRow.appendChild(approvalToggle);
        borrow.appendChild(approvalSwitchRow);
        borrow.appendChild(el("div", "flow-config-fixed-note", `<strong>审批人员</strong><span>由审批规则匹配</span><em>审批规则按适用最小分类选择一个或多个分类</em>`));
        updateApproval(rule.borrowApproval);

        rule.renewalAllowed = false;
        rule.maxRenewals = 0;
        const renewalSwitchRow = el("div", "flow-config-switch-row divided feature-disabled");
        const renewalText = el("span", "", `<strong>允许续借</strong><small>暂未开放，后续开发</small>`);
        const renewalToggle = makeSwitch(false, "续借暂未开放", () => {}, true);
        renewalSwitchRow.appendChild(renewalText);
        renewalSwitchRow.appendChild(renewalToggle);
        borrow.appendChild(renewalSwitchRow);
        shell.appendChild(borrow);

        rule.returnApproval = false;
        const returnCard = el("section", "flow-config-card return disabled");
        returnCard.appendChild(el("div", "flow-config-card-head", `<span class="flow-config-card-icon">归</span><span><strong>归还审核</strong><small>暂未开放，后续开发</small></span><em>待开发</em>`));
        const returnSwitchRow = el("div", "flow-config-switch-row");
        const returnText = el("span", "", `<strong>归还审核</strong><small>当前不可配置</small>`);
        const returnToggle = makeSwitch(false, "归还审核暂未开放", () => {}, true);
        returnSwitchRow.appendChild(returnText);
        returnSwitchRow.appendChild(returnToggle);
        returnCard.appendChild(returnSwitchRow);
        shell.appendChild(returnCard);

        const prerequisite = el("section", "flow-config-card prerequisite");
        prerequisite.appendChild(el("div", "flow-config-card-head", `<span class="flow-config-card-icon">前</span><span><strong>借用前置条件（可选）</strong><small>仅在高价值或易损设备需要时启用</small></span><em>可选</em>`));
        prerequisite.appendChild(el("div", "flow-config-tip optional", "⚙️ 以下条件为可选配置，仅当需要时才启用"));
        const studyRow = el("div", "flow-config-switch-row divided");
        const studyText = el("span", "", `<strong>强制学习资料</strong><small>${rule.studyRequired ? "借用前必须完成学习" : "未启用"}</small>`);
        const studyFields = el("div", "flow-config-conditional divided");
        const materialField = el("label", "flow-config-field wide", `<span>关联学习资料 *</span><select><option value="">-- 请选择资料 --</option><option>示波器安全操作资料</option><option>电源设备安全操作资料</option><option>传感器实验准备资料</option></select>`);
        materialField.querySelector("select").value = rule.studyMaterial || "";
        materialField.querySelector("select").addEventListener("change", event => { rule.studyMaterial = event.target.value; });
        studyFields.appendChild(materialField);
        const updateStudy = enabled => {
          rule.studyRequired = enabled;
          studyToggle.classList.toggle("active", enabled);
          studyToggle.setAttribute("aria-checked", String(enabled));
          studyFields.hidden = !enabled;
          studyText.querySelector("small").textContent = enabled ? "借用前必须完成学习" : "未启用";
        };
        const studyToggle = makeSwitch(rule.studyRequired, "切换强制学习", updateStudy);
        studyRow.appendChild(studyText);
        studyRow.appendChild(studyToggle);
        prerequisite.appendChild(studyRow);
        prerequisite.appendChild(studyFields);
        updateStudy(rule.studyRequired);

        const examRow = el("div", "flow-config-switch-row divided");
        const examText = el("span", "", `<strong>强制考核</strong><small>${rule.examRequired ? "通过考核后方可借用" : "未启用"}</small>`);
        const examFields = el("div", "flow-config-conditional divided");
        const paperField = el("label", "flow-config-field wide", `<span>关联考核试卷 *</span><select><option value="">-- 请选择试卷 --</option><option>示波器上机考核</option><option>电源设备安全考核</option></select>`);
        paperField.querySelector("select").value = rule.examPaper || "";
        paperField.querySelector("select").addEventListener("change", event => { rule.examPaper = event.target.value; });
        examFields.appendChild(paperField);
        const updateExam = enabled => {
          rule.examRequired = enabled;
          examToggle.classList.toggle("active", enabled);
          examToggle.setAttribute("aria-checked", String(enabled));
          examFields.hidden = !enabled;
          examText.querySelector("small").textContent = enabled ? "通过考核后方可借用" : "未启用";
        };
        const examToggle = makeSwitch(rule.examRequired, "切换强制考核", updateExam);
        examRow.appendChild(examText);
        examRow.appendChild(examToggle);
        prerequisite.appendChild(examRow);
        prerequisite.appendChild(examFields);
        updateExam(rule.examRequired);
        shell.appendChild(prerequisite);

        const property = el("section", "flow-config-card property");
        property.appendChild(el("div", "flow-config-card-head", `<span class="flow-config-card-icon">属</span><span><strong>设备属性</strong><small>设置分类级特殊属性</small></span><em>属性</em>`));
        const noReturn = el("button", "flow-property-choice" + (rule.noReturn ? " active" : ""), `<span class="flow-property-check">${rule.noReturn ? "✓" : ""}</span><span><strong>无需归还（适用于耗材）</strong><small>适用于低值易耗品，如焊锡丝、电阻电容等</small></span>`);
        noReturn.type = "button";
        noReturn.addEventListener("click", event => {
          event.stopPropagation();
          rule.noReturn = !rule.noReturn;
          noReturn.classList.toggle("active", rule.noReturn);
          noReturn.querySelector(".flow-property-check").textContent = rule.noReturn ? "✓" : "";
        });
        property.appendChild(noReturn);
        shell.appendChild(property);
        wrap.appendChild(shell);
      }
      if (block.type === "deviceInventoryList") {
        const list = el("div", "inventory-master-list");
        block.items.forEach(item => {
          const card = el("div", "inventory-master-card");
          card.appendChild(el("div", "inventory-master-head", `<span class="inventory-master-icon">${item.icon || item.name.slice(0, 1)}</span><span><strong>${item.name}</strong><small>${item.model || "未填写型号"}</small></span><em>库存 ${item.inStock}</em>`));
          card.appendChild(el("div", "inventory-metrics", `<span><strong>${item.total}</strong><small>累计入库</small></span><span><strong>${item.bound}</strong><small>已绑定</small></span><span><strong>${item.pending}</strong><small>待绑定</small></span><span><strong>${item.outbound}</strong><small>已出库</small></span>`));
          const actions = el("div", "inventory-actions");
          const inButton = el("button", "inventory-action in", "入库");
          const outButton = el("button", "inventory-action out", "出库");
          inButton.type = outButton.type = "button";
          inButton.addEventListener("click", event => {
            event.stopPropagation();
            uiState.selectedInventoryDevice = { ...item };
            uiState.inventoryInQuantity = 1;
            openPage(item.inTarget || "08j-device-stock-in");
          });
          outButton.addEventListener("click", event => {
            event.stopPropagation();
            uiState.selectedInventoryDevice = { ...item };
            uiState.inventoryOutCodes = [];
            openPage(item.outTarget || "08l-device-stock-out");
          });
          actions.appendChild(inButton);
          actions.appendChild(outButton);
          card.appendChild(actions);
          list.appendChild(card);
        });
        wrap.appendChild(list);
      }
      if (block.type === "deviceImageUpload") {
        const card = el("div", "device-image-upload");
        const preview = el("div", "device-image-preview" + (block.icon ? " has-image" : ""), block.icon || "＋");
        const main = el("div", "device-image-main", `<strong>${block.title}</strong><small>${block.text}</small><em>${block.state}</em>`);
        const actions = el("div", "device-image-actions");
        const upload = el("button", "device-image-button primary", block.icon ? "替换" : "上传");
        const remove = el("button", "device-image-button", "删除");
        upload.type = remove.type = "button";
        upload.addEventListener("click", event => {
          event.stopPropagation();
          preview.classList.add("has-image");
          preview.textContent = block.icon || "图";
          main.querySelector("em").textContent = "已选择设备封面图";
          upload.textContent = "替换";
        });
        remove.addEventListener("click", event => {
          event.stopPropagation();
          preview.classList.remove("has-image");
          preview.textContent = "＋";
          main.querySelector("em").textContent = "未上传";
          upload.textContent = "上传";
        });
        actions.appendChild(upload);
        actions.appendChild(remove);
        card.appendChild(preview);
        card.appendChild(main);
        card.appendChild(actions);
        wrap.appendChild(card);
      }
      if (block.type === "inventoryInForm") {
        let quantity = Math.max(1, block.quantity || 1);
        uiState.inventoryInQuantity = quantity;
        const card = el("div", "inventory-in-card");
        card.appendChild(el("div", "inventory-in-device", `<span class="inventory-master-icon">入</span><span><small>入库设备</small><strong>${block.device}</strong><em>${block.model}</em></span>`));
        card.appendChild(el("div", "inventory-in-current", `<span><small>当前累计</small><strong>${block.currentTotal} 台</strong></span><span><small>当前在库</small><strong>${block.currentStock} 台</strong></span><span><small>编码前缀</small><strong>${block.prefix}</strong></span>`));
        const quantityBox = el("div", "inventory-quantity");
        quantityBox.appendChild(el("div", "inventory-quantity-label", `<strong>入库数量</strong><small>最少入库 1 台</small>`));
        const stepper = el("div", "inventory-stepper");
        const minus = el("button", "inventory-step-button", "−");
        const value = el("strong", "inventory-step-value", quantity);
        const plus = el("button", "inventory-step-button plus", "+");
        minus.type = plus.type = "button";
        stepper.appendChild(minus);
        stepper.appendChild(value);
        stepper.appendChild(plus);
        quantityBox.appendChild(stepper);
        card.appendChild(quantityBox);
        const preview = el("div", "inventory-code-preview");
        const updatePreview = () => {
          uiState.inventoryInQuantity = quantity;
          value.textContent = quantity;
          const startMatch = block.nextCode.match(/^(.*?)(\d+)$/);
          const prefix = startMatch?.[1] || `${block.prefix}-`;
          const start = Number.parseInt(startMatch?.[2] || "1", 10);
          const width = startMatch?.[2]?.length || 4;
          const endCode = `${prefix}${String(start + quantity - 1).padStart(width, "0")}`;
          preview.innerHTML = `<small>系统将生成 ${quantity} 个永久唯一标签码</small><strong>${block.nextCode}${quantity > 1 ? ` 至 ${endCode}` : ""}</strong><span>状态：在库 · 待绑定</span>`;
          minus.disabled = quantity <= 1;
        };
        minus.addEventListener("click", event => { event.stopPropagation(); quantity = Math.max(1, quantity - 1); updatePreview(); });
        plus.addEventListener("click", event => { event.stopPropagation(); quantity += 1; updatePreview(); });
        card.appendChild(preview);
        updatePreview();
        wrap.appendChild(card);
      }
      if (block.type === "generatedCodeList") {
        const card = el("div", "generated-code-card");
        card.appendChild(el("div", "generated-code-head", `<strong>${block.title}</strong><span>${block.items.length} 个</span>`));
        const list = el("div", "generated-code-list");
        block.items.forEach((code, index) => list.appendChild(el("div", "generated-code-item", `<span>${String(index + 1).padStart(2, "0")}</span><strong>${code}</strong><em>待绑定</em>`)));
        card.appendChild(list);
        wrap.appendChild(card);
      }
      if (block.type === "inventoryOutSelect") {
        const card = el("div", "inventory-out-card");
        const head = el("div", "inventory-out-head", `<span><strong>选择具体标签码</strong><small>只显示在库且未绑定设备</small></span><em>已选 0 台</em>`);
        card.appendChild(head);
        const selected = new Set(uiState.inventoryOutCodes || []);
        block.items.forEach(item => {
          const row = el("button", "inventory-out-item" + (selected.has(item.code) ? " selected" : ""), `<span class="inventory-out-check">✓</span><span><strong>${item.code}</strong><small>入库时间 ${item.createdAt}</small></span><em>待绑定</em>`);
          row.type = "button";
          row.addEventListener("click", event => {
            event.stopPropagation();
            if (selected.has(item.code)) selected.delete(item.code); else selected.add(item.code);
            row.classList.toggle("selected", selected.has(item.code));
            uiState.inventoryOutCodes = Array.from(selected);
            head.querySelector("em").textContent = `已选 ${selected.size} 台`;
          });
          card.appendChild(row);
        });
        head.querySelector("em").textContent = `已选 ${selected.size} 台`;
        wrap.appendChild(card);
      }
      if (block.type === "deviceBindingList") {
        const card = el("div", "binding-list-shell");
        const search = el("input", "binding-search-input");
        search.type = "search";
        search.placeholder = "搜索设备名称";
        const filters = el("div", "binding-filters");
        const results = el("div", "binding-results");
        let active = block.active || "待绑定";
        const renderItems = () => {
          const keyword = search.value.trim().toLowerCase();
          results.innerHTML = "";
          const visible = block.items.filter(item => (active === "全部" || item.state === active) && (!keyword || item.name.toLowerCase().includes(keyword)));
          visible.forEach(item => {
            const row = el("button", "binding-result-item", `<span class="binding-code-icon">码</span><span class="binding-result-main"><strong>${item.code}</strong><small>${item.name} · ${item.model}</small></span><span class="binding-result-state ${item.state === "已绑定" ? "bound" : ""}">${item.state}</span><i>›</i>`);
            row.type = "button";
            row.addEventListener("click", event => {
              event.stopPropagation();
              uiState.selectedBindingUnit = { ...item };
              uiState.bindingIdentifyType = item.identifyType || "标签扫码";
              openPage(item.target || "08m-device-binding-detail");
            });
            results.appendChild(row);
          });
          if (!visible.length) results.appendChild(el("div", "binding-empty", "当前筛选下暂无设备标签码"));
        };
        ["待绑定", "全部"].forEach(label => {
          const button = el("button", "binding-filter" + (label === active ? " active" : ""), label);
          button.type = "button";
          button.addEventListener("click", event => {
            event.stopPropagation();
            active = label;
            filters.querySelectorAll(".binding-filter").forEach(node => node.classList.remove("active"));
            button.classList.add("active");
            renderItems();
          });
          filters.appendChild(button);
        });
        search.addEventListener("input", renderItems);
        card.appendChild(search);
        card.appendChild(filters);
        card.appendChild(results);
        renderItems();
        wrap.appendChild(card);
      }
      if (block.type === "deviceBindingForm") {
        const shell = el("div", "binding-form-shell");
        shell.appendChild(el("div", "binding-unit-identity", `<span class="binding-code-icon">码</span><span><small>系统默认生成的唯一设备编码</small><strong>${block.code}</strong><em>${block.name} · ${block.model}</em></span><b>${block.state}</b>`));
        const form = el("div", "binding-form-card");
        form.appendChild(el("div", "binding-form-row", `<label>唯一设备编码</label><div class="binding-readonly"><strong>${block.code}</strong><span>只读</span></div><small>由系统自动生成，不可修改</small>`));
        form.appendChild(el("div", "binding-form-row", `<label>设备名称</label><div class="binding-readonly"><strong>${block.name}</strong><span>只读</span></div>`));
        form.appendChild(el("div", "binding-form-row", `<label>设备序列号</label><input type="text" value="${block.serial || ""}" placeholder="请输入设备序列号"><small>可填写设备铭牌或机身序列号</small>`));
        form.appendChild(el("div", "binding-location-title", `<span class="binding-code-icon small">位</span><span><strong>存放位置信息</strong><small>绑定设备实际所在的实验室、柜机和格口</small></span>`));
        form.appendChild(el("div", "binding-form-row", `<label>存放区域 *</label><select><option>${block.area || "电子创新实验室"}</option><option>基础实验室</option><option>实验楼 302</option></select>`));
        form.appendChild(el("div", "binding-form-row", `<label>存放柜机 *</label><select><option>${block.cabinet || "C 柜"}</option><option>A 柜</option><option>B 柜</option></select><small>显示当前区域内可用柜机</small>`));
        form.appendChild(el("div", "binding-form-row", `<label>空闲格口 *</label><select><option>${block.slot || "05 门"}</option><option>07 门</option><option>12 门</option></select><small>已占用格口不可选择</small>`));
        shell.appendChild(form);
        shell.appendChild(el("div", "binding-validation-note", `<strong>保存校验</strong><span>唯一设备编码和设备名称只读 · 序列号可填写 · 存放位置必填</span>`));
        wrap.appendChild(shell);
      }
      if (block.type === "deviceHero") {
        const hero = el("div", "device-hero");
        const main = el("div", "device-hero-main");
        main.appendChild(el("div", "device-hero-icon", block.icon || "仪"));
        main.appendChild(el("div", "", `<div class="device-hero-eyebrow">${block.eyebrow || "设备档案"}</div><div class="device-hero-name">${block.title}</div><div class="device-hero-code">设备标签码 ${block.code}</div>`));
        main.appendChild(el("span", "device-state-pill " + (block.stateClass || ""), block.state));
        hero.appendChild(main);
        if (block.tags?.length) {
          const tags = el("div", "device-hero-tags");
          block.tags.forEach(tag => tags.appendChild(el("span", "device-hero-tag", tag)));
          hero.appendChild(tags);
        }
        if (block.metrics?.length) {
          const metrics = el("div", "device-hero-metrics");
          block.metrics.forEach(metric => metrics.appendChild(el("div", "device-hero-metric", `<strong>${metric.value}</strong><span>${metric.label}</span>`)));
          hero.appendChild(metrics);
        }
        wrap.appendChild(hero);
      }
      if (block.type === "deviceInfo") {
        const section = el("div", "device-info-section");
        const head = el("div", "device-info-head");
        head.appendChild(el("div", "device-info-title", `<span class="device-info-icon">${block.icon || "详"}</span><span>${block.title}</span>`));
        if (block.target) head.appendChild(el("span", "device-info-link", "查看 ›"));
        section.appendChild(head);
        block.rows.forEach(row => {
          const data = normalizeItem(row, ["label", "value"]);
          section.appendChild(el("div", "device-info-row", `<span class="device-info-label">${data.label}</span><span class="device-info-value">${data.value}</span>`));
        });
        makeClickable(section, block.target);
        wrap.appendChild(section);
      }
      if (block.type === "deviceRecords") {
        const section = el("div", "device-info-section");
        const head = el("div", "device-info-head");
        head.appendChild(el("div", "device-info-title", `<span class="device-info-icon">${block.icon || "记"}</span><span>${block.title}</span>`));
        if (block.target) head.appendChild(el("span", "device-info-link", "全部记录 ›"));
        section.appendChild(head);
        const list = el("div", "device-record-list");
        block.items.forEach(item => list.appendChild(el("div", "device-record-item", `<span class="device-record-dot"></span><div><div class="device-record-title">${item.title}</div><div class="device-record-meta">${item.meta}</div></div><span class="device-record-status">${item.status || ""}</span>`)));
        section.appendChild(list);
        if (block.target === "06-device-borrow-history") {
          const hero = page.blocks.find(item => item.type === "deviceHero");
          const historyDevice = block.historyDevice || (hero ? {
            name: hero.title,
            code: hero.code,
            identifyType: hero.tags?.[0] || "标签扫码",
            location: hero.tags?.[1] || "位置未记录"
          } : null);
          if (historyDevice) {
            section.classList.add("clickable");
            section.addEventListener("click", event => {
              event.stopPropagation();
              uiState.selectedBorrowHistoryDevice = { ...historyDevice };
              openPage(block.target);
            });
          }
        } else {
          makeClickable(section, block.target);
        }
        wrap.appendChild(section);
      }
      if (block.type === "deviceAlert") {
        const alert = el("div", "device-alert");
        const head = el("div", "device-alert-head");
        head.appendChild(el("div", "device-alert-title", `<span class="device-alert-symbol">!</span><span>${block.title}</span>`));
        head.appendChild(el("span", "device-alert-badge", block.badge || "请处理"));
        alert.appendChild(head);
        alert.appendChild(el("div", "device-alert-text", block.text));
        if (block.meta?.length) {
          const meta = el("div", "device-alert-meta");
          block.meta.forEach(item => {
            const data = normalizeItem(item, ["label", "value"]);
            meta.appendChild(el("div", "", `<span>${data.label}</span><strong>${data.value}</strong>`));
          });
          alert.appendChild(meta);
        }
        wrap.appendChild(alert);
      }
      if (block.type === "approvalSummary") {
        const stack = el("div", "approval-summary");
        stack.appendChild(el("div", "approval-summary-head", `<span><small>申请编号</small><strong>${block.requestNo}</strong></span><span class="approval-status">${block.status}</span>`));

        const applicant = el("div", "approval-detail-card approval-person-card");
        applicant.appendChild(el("div", "approval-detail-card-head", `<span class="approval-detail-icon">人</span><strong>借用人</strong>`));
        applicant.appendChild(el("div", "approval-person-main", `<span class="approval-avatar">${block.applicant.slice(0, 1)}</span><span><strong>${block.applicant}</strong><small>${block.applicantRole}</small></span>`));
        applicant.appendChild(el("div", "approval-field-list", `<div><small>所属场地</small><strong>${block.applicantOrg}</strong></div><div><small>申请时间</small><strong>${block.submittedAt}</strong></div>`));
        stack.appendChild(applicant);

        const device = el("div", "approval-detail-card approval-device-card");
        device.appendChild(el("div", "approval-detail-card-head", `<span class="approval-detail-icon">设</span><strong>设备与位置</strong>`));
        device.appendChild(el("div", "approval-device-main", `<span><small>设备名称</small><strong>${block.device}</strong></span><em>${block.code}</em>`));
        device.appendChild(el("div", "approval-field-grid", `<div><small>设备类型</small><strong>${block.deviceType}</strong></div><div><small>识别方式</small><strong>${block.identifyType}</strong></div><div><small>借用数量</small><strong>${block.quantity}</strong></div><div><small>存放位置</small><strong>${block.location}</strong></div>`));
        stack.appendChild(device);

        const schedule = el("div", "approval-detail-card approval-schedule-card");
        schedule.appendChild(el("div", "approval-detail-card-head", `<span class="approval-detail-icon">时</span><strong>借用时间</strong>`));
        schedule.appendChild(el("div", "approval-time-grid", `<span><small>开始时间</small><strong>${block.borrowAt}</strong></span><span><small>预计归还</small><strong>${block.returnAt}</strong></span>`));
        schedule.appendChild(el("div", "approval-duration", `<small>借用时长</small><strong>${block.duration}</strong>`));
        stack.appendChild(schedule);

        wrap.appendChild(stack);
      }
      if (block.type === "approvalQualification") {
        const card = el("div", "approval-card approval-qualification");
        card.appendChild(el("div", "approval-card-head", `<strong>${block.title}</strong><span>系统资料</span>`));
        block.rows.forEach(row => card.appendChild(el("div", "approval-qualification-row", `<span><small>${row.label}</small><strong>${row.value}</strong></span><em class="${row.tone || "neutral"}">${row.status}</em>`)));
        wrap.appendChild(card);
      }
      if (block.type === "approvalChecks") {
        const card = el("div", "approval-card approval-checks");
        card.appendChild(el("div", "approval-card-head", `<strong>${block.title}</strong><span>自动完成</span>`));
        const grid = el("div", "approval-check-grid");
        block.items.forEach(item => grid.appendChild(el("div", "approval-check-item", `<span class="approval-check-mark">✓</span><small>${item.label}</small><strong>${item.value}</strong>`)));
        card.appendChild(grid);
        wrap.appendChild(card);
      }
      if (block.type === "approvalNotice") {
        const card = el("div", "approval-card approval-notice");
        card.appendChild(el("div", "approval-card-head", `<strong>${block.title}</strong>`));
        card.appendChild(el("div", "approval-notice-row approve", `<span>通过</span><p>${block.approveText}</p>`));
        card.appendChild(el("div", "approval-notice-row reject", `<span>拒绝</span><p>${block.rejectText}</p>`));
        wrap.appendChild(card);
      }
      if (block.type === "approvalComment") {
        const card = el("div", "approval-comment");
        const input = el("textarea", "approval-comment-box");
        const counter = el("div", "approval-comment-counter", `0 / ${block.maxLength || 200}`);
        input.placeholder = block.placeholder;
        input.maxLength = block.maxLength || 200;
        input.setAttribute("aria-label", block.title);
        input.addEventListener("input", () => {
          counter.textContent = `${input.value.length} / ${input.maxLength}`;
        });
        card.appendChild(el("div", "approval-comment-head", `<strong>${block.title}</strong><span>选填</span>`));
        card.appendChild(input);
        card.appendChild(counter);
        wrap.appendChild(card);
      }
      if (block.type === "exceptionReviewSummary") {
        if (["device", "cabinet"].includes(block.layout)) {
          const isCabinet = block.layout === "cabinet";
          const stack = el("div", "device-exception-summary" + (isCabinet ? " cabinet-exception-summary" : ""));
          stack.appendChild(el("div", "exception-review-head device-exception-head", `<span><small>${block.category}</small><strong>${block.exceptionType}</strong></span><span class="exception-review-status">${block.status}</span>`));

          const device = el("div", "device-exception-card");
          device.appendChild(el("div", "device-exception-card-head", `<span class="device-exception-card-icon">${isCabinet ? "门" : "设"}</span><strong>${isCabinet ? "异常柜门" : "异常设备"}</strong>`));
          device.appendChild(el("div", "device-exception-entity", `<span class="exception-review-icon">${block.icon || "异"}</span><span><small>${isCabinet ? "柜机名称" : "设备名称"}</small><strong>${block.entity}</strong><em class="device-exception-code"><small>${isCabinet ? "柜机编号" : "设备编号"}</small><b>${block.code}</b></em></span>`));
          device.appendChild(el("div", "device-exception-field-grid", isCabinet
            ? `<div><small>柜机版本</small><strong>${block.cabinetVersion}</strong></div><div><small>异常柜门</small><strong>${block.door}</strong></div><div class="wide"><small>安装位置</small><strong>${block.location}</strong></div>`
            : `<div><small>设备类型</small><strong>${block.deviceType}</strong></div><div><small>识别方式</small><strong>${block.identifyType}</strong></div><div class="wide"><small>存放位置</small><strong>${block.location}</strong></div>`));
          stack.appendChild(device);

          const report = el("div", "device-exception-card");
          report.appendChild(el("div", "device-exception-card-head", `<span class="device-exception-card-icon">报</span><strong>上报信息</strong>`));
          report.appendChild(el("div", "device-exception-report-grid", `<div><small>上报来源</small><strong>${block.reportSource || block.reporter}</strong></div><div><small>${isCabinet ? "发生时间" : "上报时间"}</small><strong>${block.reportedAt}</strong></div>`));
          stack.appendChild(report);

          const description = el("div", "device-exception-card device-exception-description");
          description.appendChild(el("div", "device-exception-card-head", `<span class="device-exception-card-icon">述</span><strong>异常说明</strong>`));
          description.appendChild(el("p", "", block.description));
          stack.appendChild(description);
          wrap.appendChild(stack);
        } else {
          const card = el("div", "exception-review-summary");
          card.appendChild(el("div", "exception-review-head", `<span><small>${block.category}</small><strong>${block.exceptionType}</strong></span><span class="exception-review-status">${block.status}</span>`));
          card.appendChild(el("div", "exception-review-entity", `<span class="exception-review-icon">${block.icon || "异"}</span><span><strong>${block.entity}</strong><small>${block.code}</small></span>`));
          const details = el("div", "exception-review-details");
          block.details.forEach(item => details.appendChild(el("span", "", `<small>${item[0]}</small><strong>${item[1]}</strong>`)));
          card.appendChild(details);
          card.appendChild(el("div", "exception-review-description", `<small>异常说明</small><p>${block.description}</p>`));
          wrap.appendChild(card);
        }
      }
      if (block.type === "exceptionEvidence") {
        const card = el("div", "exception-review-card exception-evidence");
        card.appendChild(el("div", "exception-review-card-head", `<strong>${block.title}</strong><span>${block.badge}</span>`));
        const list = el("div", "exception-evidence-list");
        block.items.forEach(item => list.appendChild(el("div", "exception-evidence-item", `<span class="exception-evidence-kind">${item.kind}</span><span><strong>${item.title}</strong><small>${item.meta}</small></span><em>查看</em>`)));
        card.appendChild(list);
        wrap.appendChild(card);
      }
      if (block.type === "exceptionReviewImpact") {
        const card = el("div", "exception-review-card exception-review-impact");
        card.appendChild(el("div", "exception-review-card-head", `<strong>${block.title}</strong>`));
        block.rows.forEach(row => card.appendChild(el("div", "exception-impact-row " + (row.tone || "neutral"), `<span>${row.label}</span><p>${row.text}</p>`)));
        wrap.appendChild(card);
      }
      if (block.type === "exceptionReviewChecklist") {
        const card = el("div", "exception-review-card exception-review-checklist");
        card.appendChild(el("div", "exception-review-card-head", `<strong>${block.title}</strong><span>处理前核对</span>`));
        const list = el("div", "exception-checklist-list");
        block.items.forEach(item => list.appendChild(el("div", "exception-checklist-item", `<span>✓</span><strong>${item}</strong>`)));
        card.appendChild(list);
        wrap.appendChild(card);
      }
      if (block.type === "exceptionReviewComment") {
        const card = el("div", "exception-review-comment");
        card.appendChild(el("div", "exception-review-comment-head", `<strong>${block.title}</strong><span>${block.required ? "必填" : "选填"}</span>`));
        card.appendChild(el("div", "exception-review-comment-box", block.placeholder));
        wrap.appendChild(card);
      }
      if (block.type === "cabinetStatus") {
        const card = el("div", "cabinet-status-card " + (block.tone || "online"));
        card.appendChild(el("div", "cabinet-status-head", `<span class="cabinet-status-icon">柜</span><span class="cabinet-status-identity"><strong>${block.name}</strong><small>柜机编号 ${block.code}</small></span><span class="cabinet-status-pill"><i></i>${block.status}</span>`));
        card.appendChild(el("div", "cabinet-status-meta", `<span>${block.location}</span><span>${block.version}</span>`));
        const metrics = el("div", "cabinet-status-metrics");
        block.metrics.forEach(metric => {
          const data = normalizeItem(metric, ["label", "value", "tone"]);
          metrics.appendChild(el("div", "cabinet-status-metric " + (data.tone || ""), `<strong>${data.value}</strong><small>${data.label}</small>`));
        });
        card.appendChild(metrics);
        card.appendChild(el("div", "cabinet-status-activity", `<span><i></i>${block.activityLabel}</span><strong>${block.activity}</strong>`));
        wrap.appendChild(card);
      }
      if (block.type === "organizationIdentity") {
        const card = el("div", "organization-identity");
        card.appendChild(el("span", "organization-identity-mark", "院"));
        card.appendChild(el("span", "organization-identity-copy", `<small>${block.typeLabel}</small><strong>${block.organization}</strong><em>${organizationMembers.length} 名成员</em>`));
        card.appendChild(el("span", "organization-identity-state", "当前组织"));
        wrap.appendChild(card);
      }
      if (block.type === "organizationApplicationList") {
        const shell = el("div", "organization-list-shell");
        const intro = el("div", "organization-list-intro", `<span><small>当前审核组织</small><strong>${block.organization}</strong></span><span class="organization-list-intro-mark">院</span>`);
        const tabs = el("div", "organization-status-tabs");
        const toolbar = el("div", "organization-application-toolbar");
        const result = el("div", "organization-application-results");
        const batchBar = el("div", "organization-application-batch-bar");
        const selectedApplications = new Set();
        let activeStatus = block.activeStatus || block.statusFilters[0];
        let batchMode = false;

        const statusTone = status => status === "待审核" ? "pending" : status === "已通过" ? "approved" : "rejected";
        const updateStatusCounts = () => {
          tabs.querySelectorAll(".organization-status-tab").forEach(tab => {
            const status = tab.dataset.status;
            tab.querySelector("em").textContent = block.items.filter(item => item.status === status).length;
          });
        };
        const applyApplicationDecision = (item, nextStatus, reviewNote = "") => {
          const approved = nextStatus === "已通过";
          item.status = nextStatus;
          item.reviewedAt = "刚刚";
          item.reviewNote = approved ? "" : String(reviewNote || "").trim();
          if (approved) addOrganizationMember(item, item.organization);
        };
        const processApplication = (item, nextStatus) => {
          const approved = nextStatus === "已通过";
          showConfirm(wrap.closest(".phone"), page, {
            label: approved ? "通过" : "驳回",
            confirmTitle: approved ? "通过组织申请" : "驳回组织申请",
            confirmText: approved
              ? `确认允许${item.name}加入${item.organization}？通过后将自动加入组织人员名册。`
              : `确认驳回${item.name}加入${item.organization}的申请？`,
            optionalNote: approved ? undefined : {
              label: "拒绝备注",
              placeholder: "可不填写，直接确认即可"
            },
            onConfirm: reviewNote => {
              applyApplicationDecision(item, nextStatus, reviewNote);
              renderApplications();
              updateStatusCounts();
            }
          });
        };
        const processSelectedApplications = nextStatus => {
          if (!selectedApplications.size) {
            showConfirm(wrap.closest(".phone"), page, {
              label: "批量处理",
              confirmTitle: "请先选择申请",
              confirmText: "请至少选择一条待审核组织申请后再进行批量处理。"
            });
            return;
          }
          const approved = nextStatus === "已通过";
          showConfirm(wrap.closest(".phone"), page, {
            label: approved ? "批量通过" : "批量驳回",
            confirmTitle: approved ? "批量通过组织申请" : "批量驳回组织申请",
            confirmText: approved
              ? `确认通过已选择的 ${selectedApplications.size} 条组织申请？通过后申请人将自动加入组织人员名册。`
              : `确认驳回已选择的 ${selectedApplications.size} 条组织申请？`,
            optionalNote: approved ? undefined : {
              label: "批量拒绝备注",
              placeholder: "选填，将应用到本次选中的申请"
            },
            onConfirm: reviewNote => {
              block.items.forEach(item => {
                if (selectedApplications.has(item.id) && item.status === "待审核") {
                  applyApplicationDecision(item, nextStatus, reviewNote);
                }
              });
              selectedApplications.clear();
              batchMode = false;
              renderApplications();
              updateStatusCounts();
            }
          });
        };
        const updateToolbar = count => {
          toolbar.innerHTML = "";
          toolbar.appendChild(el("span", "", `${activeStatus}申请`));
          const side = el("div", "organization-application-toolbar-actions");
          side.appendChild(el("strong", "", `${count} 条`));
          if (activeStatus === "待审核") {
            const manage = el("button", "organization-application-manage" + (batchMode ? " active" : ""), batchMode ? "取消批量" : "批量管理");
            manage.type = "button";
            manage.addEventListener("click", event => {
              event.stopPropagation();
              batchMode = !batchMode;
              selectedApplications.clear();
              renderApplications();
            });
            side.appendChild(manage);
          }
          toolbar.appendChild(side);
        };
        const updateBatchBar = items => {
          batchBar.innerHTML = "";
          const isVisible = activeStatus === "待审核" && batchMode;
          batchBar.classList.toggle("visible", isVisible);
          if (!isVisible) return;
          const ids = items.map(item => item.id);
          const allSelected = ids.length > 0 && ids.every(id => selectedApplications.has(id));
          const selectAll = el("button", "organization-application-select-all" + (allSelected ? " active" : ""), `${allSelected ? "✓ " : ""}全选`);
          const selectedCount = el("span", "organization-application-selected-count", `已选 ${selectedApplications.size} 项`);
          const actions = el("div", "organization-application-batch-actions");
          const reject = el("button", "organization-application-batch-reject" + (selectedApplications.size ? "" : " disabled"), "批量驳回");
          const approve = el("button", "organization-application-batch-approve" + (selectedApplications.size ? "" : " disabled"), "批量通过");
          selectAll.type = reject.type = approve.type = "button";
          selectAll.addEventListener("click", event => {
            event.stopPropagation();
            if (allSelected) ids.forEach(id => selectedApplications.delete(id));
            else ids.forEach(id => selectedApplications.add(id));
            renderApplications();
          });
          reject.addEventListener("click", event => {
            event.stopPropagation();
            processSelectedApplications("已拒绝");
          });
          approve.addEventListener("click", event => {
            event.stopPropagation();
            processSelectedApplications("已通过");
          });
          actions.appendChild(reject);
          actions.appendChild(approve);
          batchBar.appendChild(selectAll);
          batchBar.appendChild(selectedCount);
          batchBar.appendChild(actions);
        };
        const renderApplications = () => {
          result.innerHTML = "";
          const items = block.items.filter(item => item.status === activeStatus);
          updateToolbar(items.length);
          updateBatchBar(items);
          if (!items.length) {
            result.appendChild(el("div", "organization-empty", `<span>✓</span><strong>当前没有${activeStatus}申请</strong><small>新的组织加入申请会显示在这里</small>`));
            return;
          }
          items.forEach(item => {
            const isSelecting = item.status === "待审核" && batchMode;
            const card = el(
              "article",
              `organization-application-card ${statusTone(item.status)}`
                + (isSelecting ? " batch-selecting" : "")
                + (isSelecting && selectedApplications.has(item.id) ? " selected" : "")
            );
            const reviewedLabel = item.status === "已通过" ? "通过时间" : "拒绝时间";
            const reviewedTime = item.status !== "待审核" && item.reviewedAt
              ? `<span><small>${reviewedLabel}</small><strong>${item.reviewedAt}</strong></span>`
              : "";
            const head = el("div", "organization-application-head" + (isSelecting ? " selecting" : ""), `<strong class="organization-application-person-name">${item.name}</strong><span class="organization-application-academic"><small>${item.studentNo} · ${item.major}</small><em>${item.className} · ${item.grade}</em></span><span class="organization-status-pill ${statusTone(item.status)}">${item.status}</span>`);
            if (isSelecting) {
              const check = el("button", "organization-application-check" + (selectedApplications.has(item.id) ? " selected" : ""), selectedApplications.has(item.id) ? "✓" : "");
              check.type = "button";
              check.setAttribute("aria-label", selectedApplications.has(item.id) ? "取消选择" : "选择申请");
              check.addEventListener("click", event => {
                event.stopPropagation();
                if (selectedApplications.has(item.id)) selectedApplications.delete(item.id);
                else selectedApplications.add(item.id);
                renderApplications();
              });
              head.insertBefore(check, head.firstChild);
            }
            card.appendChild(head);
            card.appendChild(el("div", `organization-application-times${reviewedTime ? "" : " single"}`, `<span><small>申请时间</small><strong>${item.appliedAt}</strong></span>${reviewedTime}`));
            if (item.status === "待审核" && !batchMode) {
              const actions = el("div", "organization-application-actions");
              const reject = el("button", "organization-application-reject", "驳回");
              const approve = el("button", "organization-application-approve", "通过");
              reject.type = approve.type = "button";
              reject.addEventListener("click", event => {
                event.stopPropagation();
                processApplication(item, "已拒绝");
              });
              approve.addEventListener("click", event => {
                event.stopPropagation();
                processApplication(item, "已通过");
              });
              actions.appendChild(reject);
              actions.appendChild(approve);
              card.appendChild(actions);
            }
            if (isSelecting) {
              card.addEventListener("click", event => {
                event.stopPropagation();
                if (selectedApplications.has(item.id)) selectedApplications.delete(item.id);
                else selectedApplications.add(item.id);
                renderApplications();
              });
            } else {
              card.classList.add("clickable");
              card.addEventListener("click", event => {
                event.stopPropagation();
                uiState.selectedOrganizationApplication = item;
                openPage("24a-organization-application-detail");
              });
            }
            result.appendChild(card);
          });
        };
        block.statusFilters.forEach(status => {
          const count = block.items.filter(item => item.status === status).length;
          const tab = el("button", "organization-status-tab" + (status === activeStatus ? " active" : ""), `<span>${status}</span><em>${count}</em>`);
          tab.type = "button";
          tab.dataset.status = status;
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeStatus = status;
            batchMode = false;
            selectedApplications.clear();
            tabs.querySelectorAll(".organization-status-tab").forEach(node => node.classList.toggle("active", node.dataset.status === activeStatus));
            renderApplications();
          });
          tabs.appendChild(tab);
        });
        shell.appendChild(intro);
        shell.appendChild(tabs);
        shell.appendChild(toolbar);
        shell.appendChild(result);
        shell.appendChild(batchBar);
        wrap.appendChild(shell);
        renderApplications();
      }
      if (block.type === "organizationMemberList") {
        const shell = el("div", "organization-member-shell");
        const summary = el("div", "organization-member-summary", `<span class="organization-member-summary-mark">院</span><span><small>组织人员名册</small><strong>${block.organization}</strong><em><b class="organization-member-count">${block.items.length}</b> 名成员</em></span>`);
        const search = el("label", "organization-member-search");
        const searchInput = el("input");
        const filters = el("div", "organization-member-filters");
        const roleFilters = el("div", "organization-member-role-filters");
        const toolsRow = el("div", "organization-member-tools");
        const manageButton = el("button", "organization-member-manage", "批量管理");
        const batchBar = el("div", "organization-member-batch-bar");
        const result = el("div", "organization-member-results");
        let activeType = "全部";
        let activeRole = "全部角色";
        let query = "";
        let batchMode = false;
        let openSwipeCard = null;
        const selectedMembers = new Set();
        searchInput.type = "search";
        searchInput.placeholder = "搜索姓名、学号、工号或专业";
        manageButton.type = "button";
        search.appendChild(el("span", "", "⌕"));
        search.appendChild(searchInput);

        const visibleMembers = () => block.items.filter(item => {
          const matchesType = activeType === "全部" || item.personType === activeType;
          const matchesRole = activeRole === "全部角色" || item.organizationRole === activeRole;
          const keyword = query.trim().toLowerCase();
          const matchesQuery = !keyword || [item.name, item.studentNo, item.employeeNo, item.major].some(value => String(value || "").toLowerCase().includes(keyword));
          return matchesType && matchesRole && matchesQuery;
        });
        const removeMembers = ids => {
          for (let index = organizationMembers.length - 1; index >= 0; index -= 1) {
            const member = organizationMembers[index];
            if (member.removable && ids.has(member.id)) organizationMembers.splice(index, 1);
          }
          ids.forEach(id => selectedMembers.delete(id));
        };
        const confirmRemove = (members, done) => {
          if (!members.length) return;
          const names = members.length === 1 ? members[0].name : `${members.length} 名成员`;
          showConfirm(wrap.closest(".phone"), page, {
            label: members.length === 1 ? "移出组织" : "批量移出",
            confirmTitle: members.length === 1 ? "确认移出成员" : "确认批量移出",
            confirmText: `确认将${names}移出${block.organization}？该操作不会删除人员账号和历史记录，之后仍可重新申请或添加。`,
            onConfirm: () => {
              removeMembers(new Set(members.map(member => member.id)));
              if (typeof done === "function") done();
              renderMembers();
            }
          });
        };
        const renderBatchBar = members => {
          batchBar.innerHTML = "";
          batchBar.classList.toggle("visible", batchMode);
          if (!batchMode) return;
          const eligible = members.filter(member => block.canManage && member.removable);
          const allSelected = eligible.length > 0 && eligible.every(member => selectedMembers.has(member.id));
          const selectAll = el("button", "organization-member-select-all" + (allSelected ? " active" : ""), allSelected ? "取消全选" : "全选当前");
          const count = el("span", "organization-member-selected-count", `已选 ${selectedMembers.size} 人`);
          const remove = el("button", "organization-member-batch-remove" + (selectedMembers.size ? "" : " disabled"), "批量删除");
          selectAll.type = remove.type = "button";
          selectAll.addEventListener("click", event => {
            event.stopPropagation();
            if (allSelected) eligible.forEach(member => selectedMembers.delete(member.id));
            else eligible.forEach(member => selectedMembers.add(member.id));
            renderMembers();
          });
          remove.addEventListener("click", event => {
            event.stopPropagation();
            const membersToRemove = organizationMembers.filter(member => selectedMembers.has(member.id) && member.removable);
            if (!membersToRemove.length) return;
            confirmRemove(membersToRemove, () => {
              batchMode = false;
              selectedMembers.clear();
            });
          });
          batchBar.appendChild(selectAll);
          batchBar.appendChild(count);
          batchBar.appendChild(remove);
        };
        const renderMembers = () => {
          result.innerHTML = "";
          openSwipeCard = null;
          summary.querySelector(".organization-member-count").textContent = block.items.length;
          manageButton.textContent = batchMode ? "完成" : "批量管理";
          manageButton.classList.toggle("active", batchMode);
          const members = visibleMembers();
          if (!members.length) {
            result.appendChild(el("div", "organization-empty", `<span>⌕</span><strong>没有匹配的成员</strong><small>请尝试其他姓名、学号、工号或专业</small>`));
            renderBatchBar(members);
            return;
          }
          members.forEach(member => {
            const canRemove = Boolean(block.canManage && member.removable);
            const swipe = el("div", `organization-member-swipe${batchMode ? " batch-selecting" : ""}${canRemove ? "" : " protected"}`);
            if (canRemove) {
              const swipeRemove = el("button", "organization-member-swipe-remove", "删除");
              swipeRemove.type = "button";
              swipeRemove.addEventListener("click", event => {
                event.stopPropagation();
                confirmRemove([member]);
              });
              swipe.appendChild(swipeRemove);
            }
            const card = el("article", "organization-member-card" + (batchMode ? " batch-selecting" : ""));
            if (batchMode) {
              const check = el("button", "organization-member-check" + (selectedMembers.has(member.id) ? " selected" : "") + (canRemove ? "" : " locked"), canRemove ? (selectedMembers.has(member.id) ? "✓" : "") : "—");
              check.type = "button";
              check.disabled = !canRemove;
              check.setAttribute("aria-label", canRemove ? `${selectedMembers.has(member.id) ? "取消选择" : "选择"}${member.name}` : `${member.name}不可删除`);
              check.addEventListener("click", event => {
                event.stopPropagation();
                if (!canRemove) return;
                if (selectedMembers.has(member.id)) selectedMembers.delete(member.id);
                else selectedMembers.add(member.id);
                renderMembers();
              });
              card.appendChild(check);
            }
            const memberContext = member.organizationRole === "审批人"
              ? `负责分类：${(member.approvalCategories || []).join("、") || "未设置"}`
              : member.personType === "学生"
                ? `${member.grade || "未填写年级"} · ${member.className || "未填写班级"}`
                : organizationPersonAffiliation(member);
            card.appendChild(el("span", "organization-member-main", `<span><strong>${member.name}</strong><em>${member.personType}</em><em class="role">${member.organizationRole}</em></span><small>${organizationPersonIdentifier(member)} · ${organizationPersonAffiliation(member)}</small><b>${memberContext}</b>`));
            const side = el("span", "organization-member-side");
            side.appendChild(el("b", "", batchMode ? (member.removable ? "" : "不可删除") : "›"));
            card.appendChild(side);
            card.classList.add("clickable");
            let pointerStartX = null;
            let initialOffset = 0;
            let swipeOffset = 0;
            let didSwipe = false;
            const setSwipeOffset = (offset, animate = true) => {
              swipeOffset = Math.max(-72, Math.min(0, offset));
              card.classList.toggle("dragging", !animate);
              card.style.transform = `translateX(${swipeOffset}px)`;
            };
            if (canRemove) {
              card.addEventListener("pointerdown", event => {
                if (batchMode) return;
                if (event.pointerType === "mouse" && event.button !== 0) return;
                event.preventDefault();
                if (openSwipeCard && openSwipeCard !== card) {
                  openSwipeCard.style.transform = "translateX(0)";
                  openSwipeCard = null;
                }
                pointerStartX = event.clientX;
                initialOffset = swipeOffset;
                didSwipe = false;
                if (typeof card.setPointerCapture === "function") card.setPointerCapture(event.pointerId);
              });
              card.addEventListener("pointermove", event => {
                if (batchMode || pointerStartX === null) return;
                if (event.pointerType === "mouse" && event.buttons !== 1) return;
                event.preventDefault();
                const delta = event.clientX - pointerStartX;
                if (Math.abs(delta) > 2) didSwipe = true;
                if (didSwipe) setSwipeOffset(initialOffset + delta, false);
              });
              const finishSwipe = event => {
                if (pointerStartX === null) return;
                const endX = Number.isFinite(event.clientX) ? event.clientX : pointerStartX;
                const delta = endX - pointerStartX;
                const reveal = didSwipe && (delta < -12 || swipeOffset < -18);
                setSwipeOffset(reveal ? -72 : 0);
                openSwipeCard = reveal ? card : null;
                if (typeof card.hasPointerCapture === "function" && card.hasPointerCapture(event.pointerId)) {
                  card.releasePointerCapture(event.pointerId);
                }
                pointerStartX = null;
                window.setTimeout(() => { didSwipe = false; }, 0);
              };
              card.addEventListener("pointerup", finishSwipe);
              card.addEventListener("pointercancel", finishSwipe);
              card.addEventListener("dragstart", event => event.preventDefault());
            }
            card.addEventListener("click", event => {
              event.stopPropagation();
              if (didSwipe) return;
              if (batchMode) {
                if (!canRemove) return;
                if (selectedMembers.has(member.id)) selectedMembers.delete(member.id);
                else selectedMembers.add(member.id);
                renderMembers();
                return;
              }
              if (swipeOffset < 0) {
                setSwipeOffset(0);
                openSwipeCard = null;
                return;
              }
              uiState.selectedOrganizationMember = member;
              openPage("23a-organization-member-detail");
            });
            swipe.appendChild(card);
            result.appendChild(swipe);
          });
          renderBatchBar(members);
        };
        ["全部", "学生", "教师", "其他人员"].forEach(personType => {
          const tab = el("button", "organization-member-filter" + (personType === activeType ? " active" : ""), personType);
          tab.type = "button";
          tab.dataset.personType = personType;
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeType = personType;
            filters.querySelectorAll(".organization-member-filter").forEach(node => node.classList.toggle("active", node.dataset.personType === activeType));
            renderMembers();
          });
          filters.appendChild(tab);
        });
        ["全部角色", "管理员", "审批人", "普通成员"].forEach(role => {
          const tab = el("button", "organization-member-role-filter" + (role === activeRole ? " active" : ""), role);
          tab.type = "button";
          tab.dataset.organizationRole = role;
          tab.addEventListener("click", event => {
            event.stopPropagation();
            activeRole = role;
            roleFilters.querySelectorAll(".organization-member-role-filter").forEach(node => node.classList.toggle("active", node.dataset.organizationRole === activeRole));
            renderMembers();
          });
          roleFilters.appendChild(tab);
        });
        searchInput.addEventListener("input", () => {
          query = searchInput.value;
          renderMembers();
        });
        if (block.canManage) {
          manageButton.addEventListener("click", event => {
            event.stopPropagation();
            batchMode = !batchMode;
            selectedMembers.clear();
            renderMembers();
          });
        }
        toolsRow.appendChild(filters);
        if (block.canManage) toolsRow.appendChild(manageButton);
        shell.appendChild(summary);
        shell.appendChild(search);
        shell.appendChild(toolsRow);
        shell.appendChild(roleFilters);
        shell.appendChild(batchBar);
        shell.appendChild(result);
        wrap.appendChild(shell);
        renderMembers();
      }
      if (block.type === "organizationCandidateList") {
        const shell = el("div", "organization-candidate-shell");
        const intro = el("div", "organization-candidate-intro", `<span><small>添加到当前组织</small><strong>${block.organization}</strong><em>仅显示尚未加入当前组织的平台用户</em></span><b>＋</b>`);
        const search = el("label", "organization-candidate-search");
        const searchInput = el("input");
        const result = el("div", "organization-candidate-results");
        let query = "";
        let openSwipeCard = null;
        searchInput.type = "search";
        searchInput.placeholder = "搜索姓名、学号或教职工编号";
        search.appendChild(el("span", "", "⌕"));
        search.appendChild(searchInput);

        const visibleCandidates = () => {
          const keyword = query.trim().toLowerCase();
          if (!keyword) return [];
          return block.items.filter(person => !findOrganizationMember(person))
            .filter(person => [person.name, person.studentNo, person.employeeNo]
              .some(value => String(value || "").toLowerCase().includes(keyword)));
        };

        const renderCandidates = () => {
          result.innerHTML = "";
          openSwipeCard = null;
          const keyword = query.trim();
          if (!keyword) {
            result.appendChild(el("div", "organization-empty organization-candidate-empty", `<span>⌕</span><strong>搜索已有人员</strong><small>输入姓名、学号或教职工编号查看人员列表</small>`));
            return;
          }
          const candidates = visibleCandidates();
          if (!candidates.length) {
            result.appendChild(el("div", "organization-empty organization-candidate-empty", `<span>∅</span><strong>没有找到可添加人员</strong><small>已加入当前组织的人员不会显示，请检查搜索信息</small>`));
            return;
          }
          candidates.forEach(person => {
            const status = organizationCandidateStatus(person);
            const canAdd = status === "可添加";
            const statusTone = status === "待审核" ? "pending" : status === "已在组织" ? "joined" : "available";
            const swipe = el("div", `organization-candidate-swipe${canAdd ? "" : " disabled"}`);
            if (canAdd) {
              const addButton = el("button", "organization-candidate-swipe-add", "加入组织");
              addButton.type = "button";
              addButton.addEventListener("click", event => {
                event.stopPropagation();
                const member = addOrganizationMember(person, block.organization);
                if (member) showToast(wrap.closest(".phone"), `${person.name}已加入${block.organization}`);
                renderCandidates();
              });
              swipe.appendChild(addButton);
            }

            const card = el("article", "organization-candidate-card clickable");
            card.appendChild(el("span", "organization-candidate-main", `<span><strong>${person.name}</strong><em>${person.personType}</em></span><small>${organizationPersonIdentifier(person)}</small><b>${organizationPersonAffiliation(person)}</b>`));
            card.appendChild(el("span", `organization-candidate-status ${statusTone}`, `${status}<i>›</i>`));

            let pointerStartX = null;
            let initialOffset = 0;
            let swipeOffset = 0;
            let didSwipe = false;
            const setSwipeOffset = (offset, animate = true) => {
              swipeOffset = Math.max(-78, Math.min(0, offset));
              card.classList.toggle("dragging", !animate);
              card.style.transform = `translateX(${swipeOffset}px)`;
            };
            if (canAdd) {
              card.addEventListener("pointerdown", event => {
                if (event.pointerType === "mouse" && event.button !== 0) return;
                event.preventDefault();
                if (openSwipeCard && openSwipeCard !== card) {
                  openSwipeCard.style.transform = "translateX(0)";
                  openSwipeCard = null;
                }
                pointerStartX = event.clientX;
                initialOffset = swipeOffset;
                didSwipe = false;
                if (typeof card.setPointerCapture === "function") card.setPointerCapture(event.pointerId);
              });
              card.addEventListener("pointermove", event => {
                if (pointerStartX === null) return;
                if (event.pointerType === "mouse" && event.buttons !== 1) return;
                event.preventDefault();
                const delta = event.clientX - pointerStartX;
                if (Math.abs(delta) > 2) didSwipe = true;
                if (didSwipe) setSwipeOffset(initialOffset + delta, false);
              });
              const finishSwipe = event => {
                if (pointerStartX === null) return;
                const endX = Number.isFinite(event.clientX) ? event.clientX : pointerStartX;
                const delta = endX - pointerStartX;
                const reveal = didSwipe && (delta < -12 || swipeOffset < -20);
                setSwipeOffset(reveal ? -78 : 0);
                openSwipeCard = reveal ? card : null;
                if (typeof card.hasPointerCapture === "function" && card.hasPointerCapture(event.pointerId)) {
                  card.releasePointerCapture(event.pointerId);
                }
                pointerStartX = null;
                window.setTimeout(() => { didSwipe = false; }, 0);
              };
              card.addEventListener("pointerup", finishSwipe);
              card.addEventListener("pointercancel", finishSwipe);
              card.addEventListener("dragstart", event => event.preventDefault());
            }
            card.addEventListener("click", event => {
              event.stopPropagation();
              if (didSwipe) return;
              if (swipeOffset < 0) {
                setSwipeOffset(0);
                openSwipeCard = null;
                return;
              }
              uiState.selectedOrganizationCandidate = person;
              openPage("23c-organization-candidate-detail");
            });
            swipe.appendChild(card);
            result.appendChild(swipe);
          });
        };

        searchInput.addEventListener("input", () => {
          query = searchInput.value;
          renderCandidates();
        });
        shell.appendChild(intro);
        shell.appendChild(search);
        shell.appendChild(el("div", "organization-candidate-help", `<span>操作提示</span><strong>点击查看详情，向左滑动可加入组织</strong>`));
        shell.appendChild(result);
        wrap.appendChild(shell);
        renderCandidates();
      }
      if (block.type === "organizationPersonDetail") {
        const person = block.person;
        const isApplication = block.mode === "application";
        const isCandidate = block.mode === "candidate";
        const status = isApplication ? person.status : isCandidate ? block.status : person.organizationRole;
        const tone = isApplication
          ? (status === "待审核" ? "pending" : status === "已通过" ? "approved" : "rejected")
          : isCandidate
            ? (status === "待审核" ? "pending" : status === "已在组织" ? "approved" : "member")
            : "member";
        const detailType = isApplication ? "组织加入申请" : isCandidate ? "平台人员档案" : "学院组织成员";
        const organizationName = isCandidate ? block.targetOrganization : person.organization;
        const stack = el("div", "organization-person-detail");
        const hero = el("section", `organization-person-hero ${tone}`);
        hero.appendChild(el("div", "organization-person-hero-top", `<span class="organization-person-title"><small>${detailType}</small><strong>${person.name}</strong><em>${organizationPersonIdentifier(person)}</em></span><span class="organization-status-pill ${tone}">${status}</span>`));
        hero.appendChild(el("div", "organization-person-org-band", `<span>${isCandidate ? "目标组织" : "所属组织"}</span><strong>${organizationName}</strong><em>${person.personType.slice(0, 1)}</em>`));
        stack.appendChild(hero);

        const identity = el("section", "organization-detail-card");
        identity.appendChild(el("div", "organization-detail-card-title", `<span>01</span><strong>基本信息</strong>`));
        identity.appendChild(el("div", "organization-detail-grid", `<div><small>姓名</small><strong>${person.name}</strong></div><div><small>性别</small><strong>${person.gender}</strong></div><div><small>人员类型</small><strong>${person.personType}</strong></div><div><small>手机号</small><strong>${person.phone}</strong></div>`));
        stack.appendChild(identity);

        const profile = el("section", "organization-detail-card");
        profile.appendChild(el("div", "organization-detail-card-title", `<span>02</span><strong>${person.personType === "学生" ? "学生信息" : person.personType === "教师" ? "教师信息" : "其他人员信息"}</strong>`));
        if (person.personType === "学生") {
          profile.appendChild(el("div", "organization-detail-grid", `<div class="wide"><small>学号</small><strong>${person.studentNo}</strong></div><div class="wide"><small>学院</small><strong>${person.college}</strong></div><div><small>专业</small><strong>${person.major}</strong></div><div><small>年级</small><strong>${person.grade}</strong></div><div class="wide"><small>班级</small><strong>${person.className || "未填写"}</strong></div>`));
        } else if (person.personType === "教师") {
          profile.appendChild(el("div", "organization-detail-grid", `<div class="wide"><small>工号</small><strong>${person.employeeNo}</strong></div><div class="wide"><small>所属学院或部门</small><strong>${person.department}</strong></div>`));
        } else {
          profile.appendChild(el("div", "organization-detail-grid", `<div class="wide"><small>所属单位</small><strong>${person.unit}</strong></div><div class="wide"><small>身份编号</small><strong>${person.identityNo || "未填写"}</strong></div>${person.usageNote ? `<div class="wide"><small>使用说明或备注</small><strong>${person.usageNote}</strong></div>` : ""}`));
        }
        stack.appendChild(profile);

        const organization = el("section", "organization-detail-card");
        organization.appendChild(el("div", "organization-detail-card-title", `<span>03</span><strong>${isApplication ? "申请信息" : "组织信息"}</strong>`));
        if (isApplication) {
          organization.appendChild(el("div", "organization-detail-grid", `<div class="wide"><small>申请组织</small><strong>${person.organization}</strong></div><div><small>申请时间</small><strong>${person.appliedAt}</strong></div><div><small>当前状态</small><strong>${person.status}</strong></div>${person.reviewedAt ? `<div class="wide"><small>审核时间</small><strong>${person.reviewedAt}</strong></div>` : ""}`));
          organization.appendChild(el("div", "organization-application-reason", `<small>申请说明</small><p>${person.reason}</p>`));
          if (person.status === "已拒绝" && person.reviewNote) {
            organization.appendChild(el("div", "organization-review-note", `<small>拒绝备注</small><p>${person.reviewNote}</p>`));
          }
        } else if (isCandidate) {
          organization.appendChild(el("div", "organization-detail-grid", `<div class="wide"><small>目标组织</small><strong>${block.targetOrganization}</strong></div><div><small>加入后角色</small><strong>普通成员</strong></div><div><small>当前状态</small><strong>${block.status}</strong></div>`));
          organization.appendChild(el("div", "organization-protected-note", `<span>i</span><p>人员资料只读。如需加入组织，请返回搜索结果并向左滑动对应人员卡片。</p>`));
        } else {
          const approvalScope = person.organizationRole === "审批人"
            ? `<div class="wide"><small>负责分类</small><strong>${(person.approvalCategories || []).join("、") || "未设置"}</strong></div>`
            : "";
          organization.appendChild(el("div", "organization-detail-grid", `<div class="wide"><small>组织名称</small><strong>${person.organization}</strong></div><div><small>成员角色</small><strong>${person.organizationRole}</strong></div><div><small>加入时间</small><strong>${person.joinedAt}</strong></div>${approvalScope}`));
          if (person.organizationRole === "管理员") {
            organization.appendChild(el("div", "organization-protected-note", `<span>i</span><p>当前组织默认仅有一名管理员，不能从成员列表移除。</p>`));
          } else if (person.organizationRole === "审批人") {
            organization.appendChild(el("div", "organization-protected-note", `<span>i</span><p>审批人自动拥有借用、归还和异常审批权限；取消审批人后恢复为普通成员。</p>`));
          }
        }
        stack.appendChild(organization);
        wrap.appendChild(stack);
      }
      if (block.type === "approverScopeSummary") {
        const person = block.person;
        const shell = el("div", "approver-scope-shell");
        const identity = el("section", "approver-scope-identity");
        identity.appendChild(el("span", "approver-scope-mark", "审"));
        identity.appendChild(el("span", "approver-scope-person", `<small>${block.editing ? "当前审批人" : "待设置成员"}</small><strong>${person.name}</strong><em>${person.personType} · ${organizationPersonIdentifier(person)} · ${person.organizationRole}</em>`));
        identity.appendChild(el("b", "", "只读成员"));
        shell.appendChild(identity);
        wrap.appendChild(shell);
      }
      if (block.type === "panel") {
        const panel = el("div", "panel");
        panel.appendChild(el("div", "card-title row between", `<span>${block.title}</span>${block.badge ? `<span class="badge ${block.badgeClass || ""}">${block.badge}</span>` : ""}`));
        panel.appendChild(buildMeta(block.meta));
        makeClickable(panel, block.target);
        wrap.appendChild(panel);
      }
      if (block.type === "list") {
        if (block.title) wrap.appendChild(el("div", "caption", block.title));
        const list = el("div", "menu");
        block.items.forEach(item => list.appendChild(buildListCard(item)));
        wrap.appendChild(list);
      }
      if (block.type === "deviceCategories") {
        wrap.appendChild(buildDeviceCategoryList(block.groups));
      }
      if (block.type === "deviceStatusView") {
        const tabs = el("div", "tabs record-filters");
        const results = el("div", "device-status-results");
        const renderDevices = status => {
          results.innerHTML = "";
          if (status === "全部") {
            results.appendChild(buildDeviceCategoryList(block.groups));
            return;
          }
          const list = el("div", "menu");
          const visibleItems = block.items.filter(item => item.status === status);
          visibleItems.forEach(item => list.appendChild(buildListCard(item)));
          if (!visibleItems.length) list.appendChild(el("div", "panel muted small", "当前状态下暂无设备"));
          results.appendChild(list);
        };
        block.filters.forEach(filter => {
          const tab = el("div", "tab" + (filter === block.active ? " active" : ""), filter);
          tab.addEventListener("click", event => {
            event.stopPropagation();
            tabs.querySelectorAll(".tab").forEach(node => node.classList.remove("active"));
            tab.classList.add("active");
            renderDevices(filter);
          });
          tabs.appendChild(tab);
        });
        wrap.appendChild(tabs);
        wrap.appendChild(results);
        renderDevices(block.active);
      }
      if (block.type === "doors") {
        wrap.appendChild(el("div", "caption", block.title));
        const grid = el("div", "door-grid");
        block.doors.forEach((door) => {
          const data = normalizeItem(door, ["num", "state", "cls"]);
          const tile = el("div", "door " + data.cls, `${data.num}<br>${data.state}`);
          makeClickable(tile, data.target);
          grid.appendChild(tile);
        });
        wrap.appendChild(grid);
      }
      if (block.type === "slotDevices") {
        wrap.appendChild(el("div", "caption", block.title));
        const renderSlotCard = slot => {
          const card = el("div", "slot-device-card " + (slot.cls || ""));
          const hasDevice = slot.cls !== "empty" && !["设备识别异常", "柜门通信异常"].includes(slot.name);
          card.appendChild(el("div", "slot-number", slot.num + " 门"));
          card.appendChild(el("div", "slot-device-main", `<div class="slot-device-name">${slot.name}</div><div class="slot-device-code">设备编号：${slot.code}</div>`));
          const action = el("div", "slot-device-action");
          action.appendChild(el("span", "badge " + (slot.cls === "used" ? "info" : slot.cls === "out" ? "warn" : slot.cls === "bad" ? "bad" : ""), slot.state));
          if (hasDevice) action.appendChild(el("span", "slot-device-arrow", "›"));
          card.appendChild(action);
          if (hasDevice) {
            card.classList.add("clickable");
            card.addEventListener("click", event => {
              event.stopPropagation();
              uiState.selectedCabinetDevice = { ...slot, cabinet: block.cabinet, version: block.version };
              openPage("09g-cabinet-device-detail");
            });
          }
          return card;
        };
        const groups = [];
        const maxSlot = Math.max(...block.slots.map(slot => Number.parseInt(slot.num, 10) || 0));
        for (let start = 1; start <= maxSlot; start += 10) {
          const end = Math.min(start + 9, maxSlot);
          const groupSlots = block.slots.filter(slot => {
            const num = Number.parseInt(slot.num, 10) || 0;
            return num >= start && num <= end;
          });
          if (!groupSlots.length) continue;
          const deviceCount = groupSlots.filter(slot => slot.cls !== "empty" && !["设备识别异常", "柜门通信异常"].includes(slot.name)).length;
          const abnormalCount = groupSlots.filter(slot => slot.cls === "bad").length;
          groups.push({ start, end, slots: groupSlots, deviceCount, abnormalCount });
        }
        const tabs = el("div", "slot-group-tabs");
        const panel = el("div", "slot-group-panel");
        const tabButtons = [];
        const renderGroup = (group, activeIndex) => {
          tabButtons.forEach((button, index) => button.classList.toggle("active", index === activeIndex));
          panel.innerHTML = "";
          const range = `${String(group.start).padStart(2, "0")}–${String(group.end).padStart(2, "0")}`;
          const summary = group.abnormalCount ? `${group.slots.length} 个格口 · ${group.deviceCount} 台设备 · ${group.abnormalCount} 个异常` : `${group.slots.length} 个格口 · ${group.deviceCount} 台设备`;
          panel.appendChild(el("div", "slot-group-panel-head", `<span><strong>格口 ${range}</strong><small>${summary}</small></span>${group.abnormalCount ? `<em>${group.abnormalCount} 异常</em>` : ""}`));
          const list = el("div", "slot-group-panel-list slot-device-list");
          group.slots.forEach(slot => list.appendChild(renderSlotCard(slot)));
          panel.appendChild(list);
        };
        groups.forEach((group, index) => {
          const range = `${String(group.start).padStart(2, "0")}–${String(group.end).padStart(2, "0")}`;
          const tab = el("button", "slot-group-tab" + (index === 0 ? " active" : ""), `<strong>${range}</strong><small>${group.deviceCount} 台</small>${group.abnormalCount ? `<i></i>` : ""}`);
          tab.type = "button";
          tab.addEventListener("click", event => {
            event.stopPropagation();
            renderGroup(group, index);
          });
          tabButtons.push(tab);
          tabs.appendChild(tab);
        });
        wrap.appendChild(tabs);
        wrap.appendChild(panel);
        if (groups.length) renderGroup(groups[0], 0);
      }
      if (block.type === "timeline") {
        wrap.appendChild(el("div", "caption", block.title));
        const timeline = el("div", "panel timeline");
        block.steps.forEach(step => timeline.appendChild(el("div", "step", `<div class="dot"></div><div>${step}</div>`)));
        wrap.appendChild(timeline);
      }
      if (block.type === "accountSecurity") {
        const card = el("section", "account-security-card");
        const icon = el("div", "account-security-icon", "盾");
        const info = el("div", "account-security-info");
        info.appendChild(el("span", "account-security-kicker", "当前登录账号"));
        info.appendChild(el("strong", "account-security-phone", block.phone || "未绑定手机号"));
        info.appendChild(el("span", "account-security-status", uiState.passwordChangedAt ? `密码已更新 · ${uiState.passwordChangedAt}` : "密码已设置"));
        card.appendChild(icon);
        card.appendChild(info);
        wrap.appendChild(card);
      }
      if (block.type === "passwordChangeForm") {
        const form = el("section", "password-change-form");
        form.appendChild(el("div", "password-change-intro", `<strong>更新登录密码</strong><span>修改后，小程序和智能柜终端本地登录均需使用新密码。</span>`));
        const formMessage = el("div", "password-form-message");
        formMessage.hidden = true;
        form.appendChild(formMessage);

        const verificationField = el("div", "password-field verification-field");
        verificationField.appendChild(el("span", "password-field-label", "短信验证码"));
        verificationField.appendChild(el("div", "verification-meta", `<span>验证码将发送至绑定手机号</span><strong>138****3900</strong>`));
        const verificationControl = el("div", "verification-control");
        const verificationInput = el("input", "verification-code-input");
        verificationInput.type = "text";
        verificationInput.inputMode = "numeric";
        verificationInput.autocomplete = "one-time-code";
        verificationInput.maxLength = 6;
        verificationInput.placeholder = "请输入 6 位验证码";
        verificationInput.dataset.passwordField = "verification";
        verificationInput.setAttribute("aria-label", "短信验证码");
        const sendCode = el("button", "verification-send", "获取验证码");
        sendCode.type = "button";
        sendCode.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          if (sendCode.disabled) return;
          uiState.passwordVerificationCode = "123456";
          uiState.passwordVerificationSentAt = Date.now();
          showToast(form.closest(".phone"), "验证码已发送至 138****3900");
          let remaining = 60;
          sendCode.disabled = true;
          sendCode.classList.add("counting");
          sendCode.textContent = `${remaining} 秒后重发`;
          const timer = window.setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
              window.clearInterval(timer);
              sendCode.disabled = false;
              sendCode.classList.remove("counting");
              sendCode.textContent = "重新获取";
              return;
            }
            sendCode.textContent = `${remaining} 秒后重发`;
          }, 1000);
        });
        const verificationError = el("span", "password-field-error");
        verificationError.dataset.passwordError = "verification";
        verificationError.hidden = true;
        verificationInput.addEventListener("input", () => {
          verificationInput.value = verificationInput.value.replace(/\D/g, "").slice(0, 6);
          verificationInput.classList.remove("is-invalid");
          verificationError.hidden = true;
          formMessage.hidden = true;
        });
        verificationControl.appendChild(verificationInput);
        verificationControl.appendChild(sendCode);
        verificationField.appendChild(verificationControl);
        verificationField.appendChild(verificationError);
        form.appendChild(verificationField);

        const addPasswordField = (name, label, placeholder, autocomplete) => {
          const field = el("label", "password-field");
          field.appendChild(el("span", "password-field-label", label));
          const control = el("div", "password-field-control");
          const input = el("input");
          input.type = "password";
          input.placeholder = placeholder;
          input.autocomplete = autocomplete;
          input.maxLength = 20;
          input.dataset.passwordField = name;
          input.setAttribute("aria-label", label);
          const toggle = el("button", "password-visibility", "显示");
          toggle.type = "button";
          toggle.setAttribute("aria-label", `显示${label}`);
          toggle.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            const visible = input.type === "text";
            input.type = visible ? "password" : "text";
            toggle.textContent = visible ? "显示" : "隐藏";
            toggle.setAttribute("aria-label", `${visible ? "显示" : "隐藏"}${label}`);
          });
          const error = el("span", "password-field-error");
          error.dataset.passwordError = name;
          error.hidden = true;
          input.addEventListener("input", () => {
            input.classList.remove("is-invalid");
            error.hidden = true;
            formMessage.hidden = true;
          });
          control.appendChild(input);
          control.appendChild(toggle);
          field.appendChild(control);
          field.appendChild(error);
          form.appendChild(field);
        };

        addPasswordField("current", "当前密码", "请输入当前登录密码", "current-password");
        addPasswordField("next", "新密码", "请输入 8 至 20 位新密码", "new-password");
        addPasswordField("confirm", "确认新密码", "请再次输入新密码", "new-password");
        form.appendChild(el("div", "password-rule", `<strong>密码要求</strong><span>8 至 20 位，同时包含字母和数字；新密码不能与当前密码相同。</span>`));
        wrap.appendChild(form);
      }
      if (block.type === "form") {
        const panel = el("div", "panel");
        block.rows.forEach(([left, right]) => panel.appendChild(el("div", "form-row", `<span>${left}</span><span class="muted">${right}</span>`)));
        wrap.appendChild(panel);
      }
      if (block.type === "textarea") {
        wrap.appendChild(el("div", "textarea", block.text));
      }
      if (block.type === "upload") {
        wrap.appendChild(el("div", "upload", block.text));
      }
      if (block.type === "qrcode") {
        const qr = el("div", "qr-preview");
        const grid = el("div", "qr-grid");
        for (let i = 0; i < 49; i += 1) grid.appendChild(el("span"));
        qr.appendChild(grid);
        qr.appendChild(el("strong", "", block.title || "设备取出/归还二维码"));
        qr.appendChild(el("div", "small muted", block.text || "柜机终端扫码后完成开柜操作"));
        wrap.appendChild(qr);
      }
      if (block.type === "btnline") {
        const btns = el("div", "btns");
        block.buttons.forEach((button, i) => {
          const data = typeof button === "string" ? { label: button } : button;
          const btn = el("div", "btn " + (i === 0 ? "ghost" : "primary"), data.label);
          makeClickable(btn, data.target);
          btns.appendChild(btn);
        });
        wrap.appendChild(btns);
      }
      if (block.type === "menu") {
        const menu = el("div", "menu");
        block.items.forEach((item) => {
          const data = Array.isArray(item) ? { label: item[0], value: item[1] } : item;
          const menuValue = data.target === "23-organization-members" ? `${organizationMembers.length} 名成员` : (data.value || "");
          const menuItem = el("div", "menu-item", `<span>${data.label}</span><span class="muted small">${menuValue} ${data.target ? "›" : ""}</span>`);
          makeClickable(menuItem, data.target);
          menu.appendChild(menuItem);
        });
        wrap.appendChild(menu);
      }
      if (block.type === "profile") {
        wrap.appendChild(el("div", "profile", `<div class="avatar">${block.name.slice(0,1)}</div><div><div class="card-title">${block.name}</div><div class="muted small">${block.role}</div>${block.meta ? `<div class="small" style="margin-top:6px">${block.meta}</div>` : ""}</div>`));
      }
      if (block.type === "modal") {
        return wrap;
      }
      return wrap;
    }

    function showConfirm(phone, page, action) {
      phone.querySelectorAll(".scrim, .modal").forEach(node => node.remove());
      const pageModal = page.blocks.find(block => block.type === "modal") || {};
      const modalData = {
        title: action.confirmTitle || pageModal.title || action.label + "确认",
        text: action.confirmText || pageModal.text || "确认执行该操作？"
      };
      const scrim = el("div", "scrim");
      const box = el("div", "modal", `<div class="card-title">${modalData.title}</div><div class="small muted">${modalData.text}</div>`);
      let noteInput = null;
      if (action.optionalNote) {
        const noteField = el("label", "modal-optional-note");
        noteField.appendChild(el("span", "", `${action.optionalNote.label || "备注"} <em>选填</em>`));
        noteInput = el("textarea");
        noteInput.rows = 3;
        noteInput.maxLength = 120;
        noteInput.placeholder = action.optionalNote.placeholder || "可不填写";
        noteField.appendChild(noteInput);
        box.appendChild(noteField);
      }
      const btns = el("div", "btns");
      const cancel = el("div", "btn", "取消");
      const confirm = el("div", "btn primary", "确认");
      cancel.addEventListener("click", event => {
        event.stopPropagation();
        scrim.remove();
        box.remove();
      });
      confirm.addEventListener("click", event => {
        event.stopPropagation();
        scrim.remove();
        box.remove();
        if (typeof action.onConfirm === "function") action.onConfirm(noteInput ? noteInput.value.trim() : undefined);
      });
      btns.appendChild(cancel);
      btns.appendChild(confirm);
      box.appendChild(btns);
      phone.appendChild(scrim);
      phone.appendChild(box);
    }

    function showToast(phone, message) {
      if (!phone) return;
      phone.querySelectorAll(".prototype-toast").forEach(node => node.remove());
      const toast = el("div", "prototype-toast", `<span>✓</span><strong>${message}</strong>`);
      phone.appendChild(toast);
      window.setTimeout(() => toast.remove(), 1800);
    }

    function showPermissionDenied(phone, message) {
      if (!phone) return;
      phone.querySelectorAll(".scrim, .modal").forEach(node => node.remove());
      const scrim = el("div", "scrim");
      const box = el("div", "modal permission-denied-modal", `<div class="permission-denied-icon">!</div><div class="card-title">无权限</div><div class="small muted">${message || "当前账号没有执行此操作的权限。"}</div>`);
      const close = el("div", "btn primary", "我知道了");
      const dismiss = event => {
        event.stopPropagation();
        scrim.remove();
        box.remove();
      };
      close.addEventListener("click", dismiss);
      scrim.addEventListener("click", dismiss);
      box.appendChild(close);
      phone.appendChild(scrim);
      phone.appendChild(box);
    }

    function renderPage(page) {
      const phone = el("div", "phone" + (page.actionsBottom ? " has-actions" : "") + (page.detailUi ? " device-detail-page" : "") + (page.abnormalUi ? " abnormal-detail-page" : "") + (page.approvalUi ? " approval-detail-page" : "") + (page.exceptionReviewUi ? " exception-review-page" : "") + (page.organizationUi ? " organization-detail-page" : ""));
      phone.dataset.id = page.id;
      phone.appendChild(el("div", "status", "<span>9:41</span><span>5G  100%</span>"));
      const top = el("div", "top");
      if (!page.noBack) {
        const back = el("div", "back clickable", "‹");
        back.addEventListener("click", (event) => {
          event.stopPropagation();
          goBack();
        });
        top.appendChild(back);
      }
      top.appendChild(el("div", "title", page.title));
      if (page.actions) page.actions.forEach(action => {
        const data = typeof action === "string" ? { label: action } : action;
        const tiny = el(data.powerManagement ? "button" : "div", "tiny" + (data.powerManagement ? " power-management-switch" : ""), data.powerManagement ? `<span aria-hidden="true">电</span><strong>${data.label}</strong>` : data.label);
        if (data.powerManagement) {
          tiny.type = "button";
          tiny.setAttribute("aria-label", `进入${roleConfigs[currentRole].powerModule.level}电源管理`);
          tiny.addEventListener("click", event => {
            event.stopPropagation();
            openPowerManagement();
          });
        } else {
          makeClickable(tiny, data.target);
        }
        top.appendChild(tiny);
      });
      phone.appendChild(top);
      const content = el("div", "content" + (page.nav ? "" : " no-tab"));
      page.blocks.filter(block => block.type !== "modal").forEach(block => content.appendChild(renderBlock(block, page)));
      phone.appendChild(content);
      if (page.nav) {
        const bottom = el("div", "bottom");
        const activeNavs = roleConfigs[currentRole]?.navs || navs;
        bottom.style.setProperty("--nav-count", activeNavs.length);
        activeNavs.forEach(([name, icon, targetId]) => {
          const pageTarget = targetId ? rolePageById(targetId) : rolePages().find(item => item.nav === name);
          const nav = el("div", "nav" + (name === page.nav ? " active" : ""), `<div class="nicon">${icon}</div><div>${name}</div>`);
          if (pageTarget && pageTarget.id !== page.id) makeClickable(nav, pageTarget.id);
          bottom.appendChild(nav);
        });
        phone.appendChild(bottom);
      }
      if (page.actionsBottom) {
        const actions = el("div", "fixed-actions");
        page.actionsBottom.forEach((action, i) => {
          const data = typeof action === "string" ? { label: action } : action;
          const cls = data.className || ((data.label.includes("拒绝") || data.label.includes("驳回")) ? "danger" : (page.actionsBottom.length === 1 || i > 0 ? "primary" : ""));
          const btn = el("div", "btn " + cls, data.label);
          btn.addEventListener("click", event => {
            event.stopPropagation();
            if (data.label === "取消") {
              if (page.id === "16a-edit-approver") {
                uiState.approverDraftMemberId = null;
                uiState.approverCategoryDraft = null;
              }
              goBack();
              return;
            }
            if (data.exceptionRecordId || data.exceptionRecordCode) {
              const records = exceptionManagementRecords.filter(record => data.exceptionRecordId
                ? record.id === data.exceptionRecordId
                : record.code === data.exceptionRecordCode);
              const record = records.find(item => item.status === "待处理")
                || records.find(item => item.status === "待通过")
                || records[0];
              if (record) {
                uiState.selectedExceptionRecord = record;
                openPage("18d-exception-management-detail");
              } else {
                openPage("17-admin-exception-process");
              }
              return;
            }
            if (data.target) {
              openPage(data.target);
              return;
            }
            if (data.savePassword) {
              const form = phone.querySelector(".password-change-form");
              if (!form) return;
              const values = {};
              form.querySelectorAll("[data-password-field]").forEach(input => { values[input.dataset.passwordField] = input.value; });
              form.querySelectorAll(".password-field-error").forEach(error => { error.hidden = true; error.textContent = ""; });
              form.querySelectorAll("[data-password-field]").forEach(input => input.classList.remove("is-invalid"));
              const summary = form.querySelector(".password-form-message");
              const errors = [];
              const setError = (name, message) => {
                const input = form.querySelector(`[data-password-field="${name}"]`);
                const error = form.querySelector(`[data-password-error="${name}"]`);
                if (input) input.classList.add("is-invalid");
                if (error) {
                  error.textContent = message;
                  error.hidden = false;
                }
                errors.push({ input, message });
              };
              const verificationAge = Date.now() - Number(uiState.passwordVerificationSentAt || 0);
              if (!uiState.passwordVerificationCode || !uiState.passwordVerificationSentAt) {
                setError("verification", "请先获取短信验证码");
              } else if (!/^\d{6}$/.test(values.verification || "")) {
                setError("verification", "请输入 6 位短信验证码");
              } else if (verificationAge > 5 * 60 * 1000) {
                setError("verification", "验证码已失效，请重新获取");
              } else if (values.verification !== uiState.passwordVerificationCode) {
                setError("verification", "验证码错误，请重新输入");
              }
              if (!values.current) setError("current", "请输入当前密码");
              if (!values.next) {
                setError("next", "请输入新密码");
              } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,20}$/.test(values.next)) {
                setError("next", "新密码需为 8 至 20 位，并同时包含字母和数字");
              } else if (values.next === values.current) {
                setError("next", "新密码不能与当前密码相同");
              }
              if (!values.confirm) {
                setError("confirm", "请再次输入新密码");
              } else if (values.confirm !== values.next) {
                setError("confirm", "两次输入的新密码不一致");
              }
              if (errors.length) {
                if (summary) {
                  summary.textContent = "请检查填写内容后再提交";
                  summary.hidden = false;
                }
                errors[0].input?.focus();
                return;
              }
              showConfirm(phone, page, {
                label: data.label,
                confirmTitle: "确认修改密码",
                confirmText: "修改后，小程序和智能柜终端本地登录均需使用新密码。",
                onConfirm: () => {
                  uiState.passwordChangedAt = "刚刚";
                  uiState.passwordVerificationCode = "";
                  uiState.passwordVerificationSentAt = 0;
                  goBack();
                  window.setTimeout(() => showToast(document.querySelector("#appFrame .phone"), "密码修改成功"), 0);
                }
              });
              return;
            }
            if (data.exceptionNextStatus && uiState.selectedExceptionRecord) {
              showConfirm(phone, page, {
                ...data,
                onConfirm: () => {
                  uiState.selectedExceptionRecord.status = data.exceptionNextStatus;
                  openPage("17-admin-exception-process", { pushHistory: false });
                }
              });
              return;
            }
            if (data.organizationDecision && uiState.selectedOrganizationApplication) {
              const application = uiState.selectedOrganizationApplication;
              const approved = data.organizationDecision === "已通过";
              showConfirm(phone, page, {
                label: data.label,
                confirmTitle: approved ? "通过组织申请" : "拒绝组织申请",
                confirmText: approved
                  ? `确认允许${application.name}加入${application.organization}？通过后将自动加入组织人员名册。`
                  : `确认拒绝${application.name}加入${application.organization}的申请？`,
                optionalNote: approved ? undefined : {
                  label: "拒绝备注",
                  placeholder: "可不填写，直接确认即可"
                },
                onConfirm: reviewNote => {
                  application.status = data.organizationDecision;
                  application.reviewedAt = "刚刚";
                  application.reviewNote = approved ? "" : String(reviewNote || "").trim();
                  if (approved) addOrganizationMember(application, application.organization);
                  openPage("24-organization-review", { pushHistory: false });
                }
              });
              return;
            }
            if (data.saveApproverScope && uiState.selectedOrganizationMember) {
              const member = uiState.selectedOrganizationMember;
              const categories = [...(uiState.approverCategoryDraft || [])];
              if (!categories.length) {
                showConfirm(phone, page, {
                  label: data.label,
                  confirmTitle: "请选择审批分类",
                  confirmText: "审批人至少需要负责一个最小分类，可返回列表选择，或使用“全选”快速勾选。"
                });
                return;
              }
              showConfirm(phone, page, {
                label: data.label,
                confirmTitle: member.organizationRole === "审批人" ? "保存审批范围" : "设置为审批人",
                confirmText: `确认将${member.name}设为审批人，并负责${categories.join("、")}？借用、归还和异常审批权限将自动生效。`,
                onConfirm: () => {
                  member.organizationRole = "审批人";
                  member.approvalCategories = categories;
                  member.removable = false;
                  uiState.approverDraftMemberId = null;
                  uiState.approverCategoryDraft = null;
                  openPage("23a-organization-member-detail", { pushHistory: false });
                }
              });
              return;
            }
            if (data.cancelApproverRole && uiState.selectedOrganizationMember) {
              const member = uiState.selectedOrganizationMember;
              showConfirm(phone, page, {
                label: data.label,
                confirmTitle: "取消审批人",
                confirmText: `确认取消${member.name}的审批人角色？其借用、归还和异常审批权限及分类范围将同时失效，并恢复为普通成员。`,
                onConfirm: () => {
                  member.organizationRole = "普通成员";
                  member.approvalCategories = [];
                  member.removable = true;
                  uiState.approverDraftMemberId = null;
                  uiState.approverCategoryDraft = null;
                  openPage("23a-organization-member-detail", { pushHistory: false });
                }
              });
              return;
            }
            if (data.removeOrganizationMember && uiState.selectedOrganizationMember) {
              const member = uiState.selectedOrganizationMember;
              showConfirm(phone, page, {
                label: data.label,
                confirmTitle: "确认移出成员",
                confirmText: `确认将${member.name}移出${member.organization}？该操作不会删除人员账号和历史记录，之后仍可重新申请或添加。`,
                onConfirm: () => {
                  const index = organizationMembers.findIndex(item => item.id === member.id);
                  if (index >= 0) organizationMembers.splice(index, 1);
                  uiState.selectedOrganizationMember = null;
                  openPage("23-organization-members", { pushHistory: false });
                }
              });
              return;
            }
            if (data.saveFlowConfig) {
              const draft = uiState.deviceFlowDraft || {};
              if (!Number.isFinite(draft.maximum) || draft.maximum < 0) {
                showConfirm(phone, page, { label: data.label, confirmTitle: "请完善借用规则", confirmText: "最长借用允许时长不能小于 0；填写 0 表示不限时。" });
                return;
              }
              if (draft.studyRequired && !draft.studyMaterial) {
                showConfirm(phone, page, { label: data.label, confirmTitle: "请关联学习资料", confirmText: "启用强制学习后必须选择关联学习资料。" });
                return;
              }
              if (draft.examRequired && !draft.examPaper) {
                showConfirm(phone, page, { label: data.label, confirmTitle: "请完善考核条件", confirmText: "启用强制考核后必须选择关联试卷。" });
                return;
              }
              const selected = uiState.selectedMinimumCategory;
              showConfirm(phone, page, {
                label: data.label,
                confirmTitle: "保存分类规则",
                confirmText: `确认保存“${selected?.name || "当前分类"}”规则？${draft.maximum === 0 ? "借用不限时" : `最长借用允许时长 ${draft.maximum} 小时`}${draft.borrowApproval ? "，需要借用审核" : "，无需借用审核"}${draft.noReturn ? "，并标记为无需归还" : ""}。`,
                onConfirm: () => {
                  if (selected) selected.flowRule = { ...draft };
                  uiState.deviceFlowDraft = null;
                  uiState.flowDraftCategoryName = null;
                  openPage("08p-minimum-category-devices", { pushHistory: false });
                }
              });
              return;
            }
            if (page.id === "08l-device-stock-out" && data.label.includes("出库") && !(uiState.inventoryOutCodes || []).length) {
              showConfirm(phone, page, { label: data.label, confirmTitle: "请先选择设备", confirmText: "出库必须至少勾选一个具体设备标签码。" });
              return;
            }
            if (data.confirmTitle || data.label.includes("保存") || data.label.includes("生成") || data.label.includes("发送") || data.label.includes("发布") || data.label.includes("确认") || data.label.includes("提交") || data.label.includes("拒绝") || data.label.includes("驳回") || data.label.includes("解除")) {
              showConfirm(phone, page, data);
            }
          });
          actions.appendChild(btn);
        });
        phone.appendChild(actions);
      }
      return phone;
    }

    function renderCapture(pageId) {
      const page = rolePageById(roleCanOpen(pageId) ? pageId : roleConfigs[currentRole].homeId);
      document.body.innerHTML = "";
      const stage = el("div", "stage");
      document.body.appendChild(stage);
      stage.style.display = "block";
      stage.style.padding = "0";
      document.body.style.background = "#ffffff";
      const phone = renderPage(page);
      phone.style.margin = "0";
      phone.style.borderRadius = "0";
      phone.style.boxShadow = "none";
      phone.style.border = "0";
      stage.appendChild(phone);
    }

function renderRoleSwitch() {
      const roleSwitch = document.getElementById("roleSwitch");
      roleSwitch.innerHTML = "";
      Object.entries(roleConfigs).forEach(([roleKey, config]) => {
        const btn = el("button", "mode-btn" + (roleKey === currentRole ? " active" : ""), config.label);
        btn.type = "button";
        btn.addEventListener("click", () => {
          currentRole = roleKey;
          uiState.history = [];
          renderRolePrototypePage(roleConfigs[currentRole].homeId, { pushHistory: false });
        });
        roleSwitch.appendChild(btn);
      });
    }

    function renderPageTabs(selectedId) {
      const tabs = document.getElementById("pageTabs");
      tabs.innerHTML = "";
      rolePages().forEach(page => {
        const btn = el("button", "page-tab" + (page.id === selectedId ? " active" : ""), page.title);
        btn.type = "button";
        btn.addEventListener("click", () => openPage(page.id));
        tabs.appendChild(btn);
      });
    }

    function renderRolePrototypePage(pageId, options = {}) {
      const safePageId = roleCanOpen(pageId) && !roleDeniedAction(pageId) ? pageId : roleConfigs[currentRole].homeId;
      const page = rolePageById(safePageId);
      const appFrame = document.getElementById("appFrame");
      uiState.currentPageId = page.id;

      renderRoleSwitch();
      renderPageTabs(page.id);
      document.getElementById("roleSummary").textContent = roleConfigs[currentRole].summary;

      appFrame.innerHTML = "";
      appFrame.appendChild(renderPage(page));

      const url = new URL(location.href);
      url.searchParams.set("role", currentRole);
      url.searchParams.set("page", page.id);
      history.replaceState({}, "", url);
    }

    openPage = function(pageId, options = {}) {
      if (!pageId) return;
      if (pageId === "22b-change-password" && env.host.passwordPage) {
        env.host.passwordPage('change');
        return;
      }
      const deniedMessage = roleDeniedAction(pageId);
      if (deniedMessage) {
        showPermissionDenied(document.querySelector("#appFrame .phone"), deniedMessage);
        return;
      }
      const safePageId = roleCanOpen(pageId) ? pageId : roleConfigs[currentRole].homeId;
      const target = rolePageById(safePageId);
      if (!target) return;
      if (options.pushHistory !== false && uiState.currentPageId && uiState.currentPageId !== target.id) {
        uiState.history.push(uiState.currentPageId);
      }
      renderRolePrototypePage(target.id, options);
    };

    goBack = function() {
      const previous = uiState.history.pop();
      if (previous) {
        renderRolePrototypePage(previous, { pushHistory: false });
        return;
      }
      renderRolePrototypePage(roleConfigs[currentRole].homeId, { pushHistory: false });
    };

    function bootRolePrototype() {
      const params = new URLSearchParams(location.search);
      const role = params.get("role");
      if (roleConfigs[role]) currentRole = role;
      const selectedId = params.get("page") || roleConfigs[currentRole].homeId;
      const capture = params.get("capture");

      if (capture) {
        const page = rolePageById(selectedId);
        renderCapture(page.id);
        window.__wireframePages = rolePages().map(p => ({ id: p.id, title: p.title }));
        return;
      }

      renderRolePrototypePage(selectedId, { pushHistory: false });
      window.__wireframePages = rolePages().map(p => ({ id: p.id, title: p.title }));
    }
    bootRolePrototype();


 currentRole=env.host.user.teacherPermission==='approver'?'approver':'admin';
 const rawOpen=openPage;openPage=function(id,options){rawOpen(id,options);env.host.page(uiState.currentPageId)};
 openPowerManagement=()=>env.host.power(currentRole);
 openPage(roleConfigs[currentRole].homeId,{pushHistory:false});
 
const scope={get(name){switch(name){case "navs":return navs;case "minimumCategories":return minimumCategories;case "deviceBorrowHistoryRecords":return deviceBorrowHistoryRecords;case "abnormalDevices":return abnormalDevices;case "adminHomeDashboard":return adminHomeDashboard;case "organizationApplications":return organizationApplications;case "organizationMembers":return organizationMembers;case "organizationUserDirectory":return organizationUserDirectory;case "borrowApprovalRecords":return borrowApprovalRecords;case "createBorrowApprovalList":return createBorrowApprovalList;case "exceptionManagementRecords":return exceptionManagementRecords;case "createExceptionManagementList":return createExceptionManagementList;case "pages":return pages;case "pageRemarks":return pageRemarks;case "enrichedPages":return enrichedPages;case "currentRole":return currentRole;case "roleConfigs":return roleConfigs;case "inferDeviceCategory":return inferDeviceCategory;case "organizationPersonIdentifier":return organizationPersonIdentifier;case "organizationPersonAffiliation":return organizationPersonAffiliation;case "isSameOrganizationPerson":return isSameOrganizationPerson;case "findOrganizationMember":return findOrganizationMember;case "findPendingOrganizationApplication":return findPendingOrganizationApplication;case "organizationCandidateStatus":return organizationCandidateStatus;case "organizationPersonProfile":return organizationPersonProfile;case "addOrganizationMember":return addOrganizationMember;case "buildCabinetDeviceDetailPage":return buildCabinetDeviceDetailPage;case "buildDeviceBorrowHistoryPage":return buildDeviceBorrowHistoryPage;case "buildStockInResultPage":return buildStockInResultPage;case "buildDeviceInfoEditPage":return buildDeviceInfoEditPage;case "buildMinimumCategoryDevicesPage":return buildMinimumCategoryDevicesPage;case "buildDeviceFlowPage":return buildDeviceFlowPage;case "buildStockInPage":return buildStockInPage;case "buildStockOutPage":return buildStockOutPage;case "buildDeviceBindingDetailPage":return buildDeviceBindingDetailPage;case "buildExceptionManagementDetailPage":return buildExceptionManagementDetailPage;case "buildOrganizationReviewPage":return buildOrganizationReviewPage;case "buildOrganizationApplicationDetailPage":return buildOrganizationApplicationDetailPage;case "buildOrganizationMembersPage":return buildOrganizationMembersPage;case "buildAddOrganizationMemberPage":return buildAddOrganizationMemberPage;case "buildOrganizationCandidateDetailPage":return buildOrganizationCandidateDetailPage;case "buildOrganizationMemberDetailPage":return buildOrganizationMemberDetailPage;case "buildApproverScopePage":return buildApproverScopePage;case "rolePageById":return rolePageById;case "roleCanOpen":return roleCanOpen;case "roleDeniedAction":return roleDeniedAction;case "rolePages":return rolePages;case "el":return el;case "uiState":return uiState;case "openPage":return openPage;case "goBack":return goBack;case "normalizeItem":return normalizeItem;case "makeClickable":return makeClickable;case "openPowerManagement":return openPowerManagement;case "buildMeta":return buildMeta;case "buildListCard":return buildListCard;case "buildMinimumCategoryDeviceCard":return buildMinimumCategoryDeviceCard;case "buildDeviceCategoryList":return buildDeviceCategoryList;case "renderBlock":return renderBlock;case "showConfirm":return showConfirm;case "showToast":return showToast;case "showPermissionDenied":return showPermissionDenied;case "renderPage":return renderPage;case "renderCapture":return renderCapture;case "renderRoleSwitch":return renderRoleSwitch;case "renderPageTabs":return renderPageTabs;case "renderRolePrototypePage":return renderRolePrototypePage;case "bootRolePrototype":return bootRolePrototype;default:return env.globals[name]??document.getElementById(name)}},set(name,value){switch(name){case "currentRole":currentRole=value;return value;case "inferDeviceCategory":inferDeviceCategory=value;return value;case "organizationPersonIdentifier":organizationPersonIdentifier=value;return value;case "organizationPersonAffiliation":organizationPersonAffiliation=value;return value;case "isSameOrganizationPerson":isSameOrganizationPerson=value;return value;case "findOrganizationMember":findOrganizationMember=value;return value;case "findPendingOrganizationApplication":findPendingOrganizationApplication=value;return value;case "organizationCandidateStatus":organizationCandidateStatus=value;return value;case "organizationPersonProfile":organizationPersonProfile=value;return value;case "addOrganizationMember":addOrganizationMember=value;return value;case "buildCabinetDeviceDetailPage":buildCabinetDeviceDetailPage=value;return value;case "buildDeviceBorrowHistoryPage":buildDeviceBorrowHistoryPage=value;return value;case "buildStockInResultPage":buildStockInResultPage=value;return value;case "buildDeviceInfoEditPage":buildDeviceInfoEditPage=value;return value;case "buildMinimumCategoryDevicesPage":buildMinimumCategoryDevicesPage=value;return value;case "buildDeviceFlowPage":buildDeviceFlowPage=value;return value;case "buildStockInPage":buildStockInPage=value;return value;case "buildStockOutPage":buildStockOutPage=value;return value;case "buildDeviceBindingDetailPage":buildDeviceBindingDetailPage=value;return value;case "buildExceptionManagementDetailPage":buildExceptionManagementDetailPage=value;return value;case "buildOrganizationReviewPage":buildOrganizationReviewPage=value;return value;case "buildOrganizationApplicationDetailPage":buildOrganizationApplicationDetailPage=value;return value;case "buildOrganizationMembersPage":buildOrganizationMembersPage=value;return value;case "buildAddOrganizationMemberPage":buildAddOrganizationMemberPage=value;return value;case "buildOrganizationCandidateDetailPage":buildOrganizationCandidateDetailPage=value;return value;case "buildOrganizationMemberDetailPage":buildOrganizationMemberDetailPage=value;return value;case "buildApproverScopePage":buildApproverScopePage=value;return value;case "rolePageById":rolePageById=value;return value;case "roleCanOpen":roleCanOpen=value;return value;case "roleDeniedAction":roleDeniedAction=value;return value;case "rolePages":rolePages=value;return value;case "el":el=value;return value;case "openPage":openPage=value;return value;case "goBack":goBack=value;return value;case "normalizeItem":normalizeItem=value;return value;case "makeClickable":makeClickable=value;return value;case "openPowerManagement":openPowerManagement=value;return value;case "buildMeta":buildMeta=value;return value;case "buildListCard":buildListCard=value;return value;case "buildMinimumCategoryDeviceCard":buildMinimumCategoryDeviceCard=value;return value;case "buildDeviceCategoryList":buildDeviceCategoryList=value;return value;case "renderBlock":renderBlock=value;return value;case "showConfirm":showConfirm=value;return value;case "showToast":showToast=value;return value;case "showPermissionDenied":showPermissionDenied=value;return value;case "renderPage":renderPage=value;return value;case "renderCapture":renderCapture=value;return value;case "renderRoleSwitch":renderRoleSwitch=value;return value;case "renderPageTabs":renderPageTabs=value;return value;case "renderRolePrototypePage":renderRolePrototypePage=value;return value;case "bootRolePrototype":bootRolePrototype=value;return value;default:throw Error('不可写变量 '+name)}}};
return env.finish(scope,()=>(uiState.currentPageId));}
