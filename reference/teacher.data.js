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

    const createBorrowApprovalList = () => ({
      type: "borrowApprovalList",
      activeStatus: "待审批",
      statusFilters: ["待审批", "待领取", "待归还", "逾期", "拒绝"],
      exportStartDate: "2026-07-01",
      exportEndDate: "2026-07-24",
      searchPlaceholder: "搜索设备名、设备编号或借用人",
      items: borrowApprovalRecords.map(item => ({ ...item }))
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
      items: exceptionManagementRecords
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
          { type: "menu", items: [{ label: "修改密码", value: "更新小程序与终端登录密码", target: "22b-change-password" }] },
          { type: "panel", title: "密码使用说明", meta: ["修改后的密码同时用于小程序账号和智能柜终端本地登录", "终端不提供找回或修改密码功能，忘记密码时请在本页面完成修改"] }
        ]
      },
      {
        id: "22b-change-password", title: "修改密码", actionsBottom: ["取消", { label: "确认修改", savePassword: true }],
        blocks: [
          { type: "passwordChangeForm" }
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
      "22b-change-password": "页面说明：先通过绑定手机号短信验证码校验，再输入当前密码、新密码和确认密码后修改登录密码；新密码需为 8 至 20 位且同时包含字母和数字。",
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
          "08n-device-flow-setting": "当前账号为审批人，不能修改设备最小分类的借用、归还及前置条件规则。",
          "16a-edit-approver": "当前账号为审批人，不能设置或修改组织审批人。",
          "23b-add-organization-member": "当前账号为审批人，不能向组织添加人员。"
        }
      }
    };

    roleConfigs.approver.pageIds = roleConfigs.admin.pageIds;
    roleConfigs.approver.childPageIds = roleConfigs.admin.childPageIds;
    roleConfigs.approver.navs = roleConfigs.admin.navs;
    roleConfigs.approver.homePage = roleConfigs.admin.homePage;
