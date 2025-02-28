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
  MicroApp: {
    Loading: '加载中',
  },
  ContestTimeInput: {
    Hour: '时',
    Minute: '分钟',
  },
  AcConfig: {
    ExamTime: '考试时间',
    HomeworkTime: '作业时长',
    Contest_Time_Tip:
      '请注意，比赛时间结束后，所有用户都会强制交卷，请不要随意调整时间',
    Illegal_Duration: '作业时长不合法',
    UnrestrictedDuration: '不限制时长(老师手动强制交卷)',
    SCORE_RELEASE: '成绩发布',
    RELEASE_AFTER_THE_EXAM: '考试结束后发布',
    RELEASE_AFTER_TEACHER_CONFIRMATION: '老师确认后发布',
    SCHEDULED_RELEASE: '定时发布',
    SCORE_DISPLAY_TIME: '成绩显示时间',
    LEADERBOARD_VISIBLE: '排行榜可见',
    VISIBLE_AFTER_GRADE_RELEASE: '成绩发布后可见',
    VISIBLE_AFTER_TEACHER_CONFIRMATION: '老师确认后可见',
    VISIBLE_AFTER_THE_EXAM: '考试结束后可见',
    TIMED_VISIBILITY: '定时可见',
    Always_Visible: '一直可见',
    LEADERBOARD_VISIBLE_TIME: '排行榜可见时间',
    TEST_PAPER_VISIBLE: '赛后试卷可见度',
    TEST_PAPER_VISIBLE_TIME: '赛后试卷可见度时间',
    ANSWER_DISPLAY: '答案/题解显示',
    ANSWER_DISPLAY_TIME: '答案/题解显示时间',
    DISPLAY_AFTER_TEACHER_CONFIRMATION_01: '考试结束后显示',
    DISPLAY_AFTER_TEACHER_CONFIRMATION_02: '成绩发布后显示',
    DISPLAY_AFTER_TEACHER_CONFIRMATION: '老师确认后显示',
    TIMED_DISPLAY: '定时显示',
    RanklistShowRealName: '学生排行榜显示真实姓名',
    ALLOW: '允许',
    PROHIBIT: '禁止',
    RankShowUserLabel: '学生排行榜显示用户标签',
    HAND_IN_THE_PAPER_IN_ADVANCE: '提前交卷',
    ALLOW_SETTIMEOUT_SUBMI: '定时允许提前交卷',
    AFTER_CONTEST_START: '比赛开始后',
    TimedSubmissionError: '定时时间不能超过作业/考试时长',
    ALLOW_SUBMIT: '允许交卷',
    PartOrder: '模块顺序',
    RandomOrder: '乱序',
    ProgrammingOrder: '编程题顺序',
    ObjectiveOrder: '客观题顺序',
    CompositeInternalOrder: '组合题内部顺序',
    SingleChoiceOrder: '单选题选项顺序',
    MultipleChoiceOrder: '多选题选项顺序',
    ProgrammingLanguage: '编程语言',
    personalScoreVisibility: '个人分数可见性',
    always: '总是',
    never: '从不',
    afterExam: '考试结束后',
    TIPS_DISPLAY: '提示显示',
    TIPS_DISPLAY_TIME: '提示显示时间',
    RankingValue: '题目提交结果',
    LatestSubmit: '按照最新提交取分',
    maxScore: '按照最高的一次提交取分',
    rankingMethod: '排名规则',
    Sort_By_Score: '按照分数排序',
    Sort_By_AC_Count: '按照AC数排序',
    highScoreProgramVisibility: '高分代码可见度',
    downloadDataEnable: '下载错误数据(XJOI)',
    NumberDownloadsAllowed: '允许下载次数',
    General_Configuration: '通用配置',
    Programming_Problem_Configuration: '编程题配置',
    practice_end_restore_order: '练习结束后自动恢复顺序',
    No_limit: '不限制',
    RestrictionsDuringHomeworkExam: '作业/考试结束前限制',
    ResourceRestriction: '限制资源访问',
    ResourceRestrictionDesc: '限制访问其他课件、学习空间、精品题库、论坛',
    Config_Affects_Submission_Visibility:
      '该配置同时影响学生学习空间相关题目的提交可见性',
  },
  ScoreReport: {
    In_Game_Total_Score: '赛中总分',
    ScoreReport: '成绩单',
    Score: '成绩：',
    ScoreReportTitle: '成绩报告单',
    ScoreCopylink: '复制链接',
    DownloadDom: '下载成绩报告单',
    ScoreReportButtonTip: '作业/考试结束后可见',
    clipboardSuccessTip: '已将链接复制到剪贴板',
    CopyFail: '复制失败，没有写入剪贴板的权限，拒绝写入剪切板，请更换浏览器。',
    Example_RANK: '名次',
    Example_In_Game_Total_Score: '赛中总分',
    Example_PROGRAMMING_QUESTIONS: '编程题',
    Example_Objective_Question: '客观题',
    Example_Problem_Type: '必做题',
    Example_Option_Problem: '选做题',
    Example_USER: '用户',
    Example_Class: '班级',
    Example_Paper: '试卷',
    Example_Time: '时间',
  },
  SchoolInput: {
    MiddleSchool: '中学',
    PrimarySchool: '小学',
    DropRenderText: '统计数据截至于2020年12月',
  },
  ZipCodeSearchInput: {
    placeholder: '请输入邮政编码',
    area: '所选地区',
  },
} as const;
