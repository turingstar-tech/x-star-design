export default {
  VisualDataConfig: {
    Time_MS: '时间限制（MS）',
    Space_MS: '空间限制（KB）',
    Individual_Assessment: '单个测试点/子任务分数',
    Individual_Assessment_Tip: '默认分数，各个测试点/子任务可以覆盖',
    SPJ_EXE_FILE: 'Special Judge(SPJ)可执行文件名',
    SPJ_EXE_FILE_TIP: '不填表示不需要SPJ',
    Input_Format: '输入文件名格式',
    Output_Format: '输出文件名格式',
    Input_Output_Format_Tip:
      '例如：data#.in（表示data1.in）, #.in（表示1.in）；data#.out（表示data1.out）, #.out（表示1.out）',
    File_Input_Format: '文件读写输入文件',
    File_Output_Format: '文件读写输出文件',
    File_Input_Output_Format_Tip: '不填表示不需要文件读写',
    Interactive_Library: '交互题函数库文件名',
    Interactive_Library_Tip:
      '填写编译后的文件名(不要带.cpp)，不填表示不使用函数库',
    Evaluation_Method: '测评方式',
    Single_Point_Data_Testing: '单点数据测试',
    SubTask: '子任务',
    Confirm_Import: '确定并导入',
    Test_Point: '测试点',
    ID: '编号',
    Space: '空间',
    Add_New_Test_Point: '添加新测试点',
    Test_Data: '测试数据',
    Data_Dependency_Subtask: '数据依赖-子任务',
    Add_New_SubTask: '添加新子任务',
    Add_New_SubTask_Tip:
      '评测机为 uoj 的时候，单独设置时间和空间限制是不生效的。需要把评测机切换为xjoj才生效。',
    Generate_Config_Success: '配置生成成功，请回到数据配置里进行检查',
    Multi_Cases_Tip: '可以填入区间，也可以填入一个数字，逗号分割,例如:[1-5],7',
    TIME: '时间',
    SCORE: '得分',
    BATCH_ADD: '批量添加',
  },
  TranslateButton: {
    CURRENT_LANG: '当前语言：',
  },
  CodeDetailModal: {
    Problem: '题目',
    Language: '语言',
    Status: '状态',
    Score: '得分',
    Memory: '大小',
    Code: '代码',
    Show: '显示',
    Hide: '隐藏',
    Submission_Time: '提交时间',
    Code_Detail: '代码详情',
    Download_File: '下载文件',
    File: '文件',
  },
  ContactButton: {
    CONTACT_TELEPHONE: '电话：17367064678',
    CONTACT_TIP: '微信扫码，直接咨询',
    CONTACT_US: '联系我们',
  },
  ErrorPage: {
    RELOAD_HINT: '监测到页面更新，正在刷新页面...',
    ERROR: '💔 出错啦',
    ERROR_BOUNDARY_TIP_1: '不好意思，代码意外卷入了黑洞，页面发生了崩溃。',
    ERROR_BOUNDARY_TIP_2: '您可以重试访问该页面，或可以先访问其他页面。',
    RETURN_TO_HOME: '回到首页',
    RETRY: '重试',
    TECHNICAL_DEPARTMENT_CONTACT_EMAIL: '技术部联系邮箱：',
    ERROR_MESSAGE: '错误信息：',
  },
  Feedback: {
    FEEDBACK_RESPONSE: '感谢您宝贵的意见，我们会持续改进~',
    FEEDBACK_TYPE: '反馈类型',
    SUBMIT: '提交',
    FEEDBACK_ON_THE_PROBLEM: '您对本题目的反馈',
    ACCLAIM: '满意',
    BAD_REVIEW: '不满意',
    PLEASE_SELECT_FEEDBACK_TYPE: '请填写反馈评价',
    FEEDBACK_TEXTAREA_PLACEHOLDER: '请详细描述你的反馈，我们会尽快处理',
    FEEDBACK_MESSAGE_1: '请填写满意度',
    FEEDBACK_MESSAGE_2: '请勾选反馈类型',
    FEEDBACK_MESSAGE_3: '请填写反馈内容',
  },
} as const;
