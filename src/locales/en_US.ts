export default {
  VisualDataConfig: {
    Time_MS: 'Time Limit(MS)',
    Space_MS: 'Memory Limit(KB)',
    Individual_Assessment: 'Score of Each Case/Subtask',
    Individual_Assessment_Tip:
      'Default score, can be overridden by each case/subtask',
    SPJ_EXE_FILE: 'Special Judge(SPJ) Executable Filename',
    SPJ_EXE_FILE_TIP: 'Leave blank for no SPJ',
    Input_Format: 'Input Filename Format',
    Output_Format: 'Output Filename Format',
    Input_Output_Format_Tip:
      'For example: data#.in (data1.in), #.in (1.in); data#.out (data1.out), #.out (1.out)',
    File_Input_Format: 'File I/O Input File',
    File_Output_Format: 'File I/O Output File',
    File_Input_Output_Format_Tip: 'Leave blank for no File I/O',
    Interactive_Library: 'Interactive Function Library Filename',
    Interactive_Library_Tip:
      'Fill in the compiled file name (without .cpp). Leave blank for no function library',
    Evaluation_Method: 'Evaluation Method',
    Single_Point_Data_Testing: 'Single point data test',
    SubTask: 'SubTask',
    Confirm_Import: 'Confirm and import',
    Test_Point: 'Test Point',
    ID: 'Id',
    Space: 'Space',
    Add_New_Test_Point: 'Add a new test point',
    Test_Data: 'Test Data',
    Data_Dependency_Subtask: 'Data dependency - subtask',
    Add_New_SubTask: 'Add new subtask ',
    Add_New_SubTask_Tip:
      'When the evaluation machine is uoj, setting time and space limits separately does not take effect. You need to switch the tester to xjoj for this to work.',
    Generate_Config_Success:
      'The configuration is generated successfully. Please go back to the data configuration to check',
    Multi_Cases_Tip:
      'You can enter an interval or a number, separated by commas, for example :[1-5],7',
    TIME: 'Time',
    SCORE: 'Score',
    BATCH_ADD: 'Batch Add',
  },
  TranslateButton: {
    CURRENT_LANG: 'Current Language:',
  },
  CodeDetailModal: {
    Problem: 'Problem',
    Language: 'Language',
    Status: 'Status',
    Score: 'Score',
    Memory: 'Memory',
    Code: 'Code',
    Show: 'Show',
    Hide: 'Hide',
    Submission_Time: 'Submission Time',
    Code_Detail: 'Code Detail',
    Download_File: 'Download File',
    File: 'File',
  },
  ContactButton: {
    CONTACT_TELEPHONE: 'Telephone: +1-510-760-1098',
    CONTACT_TIP: 'Please Scan The QR Code',
    CONTACT_US: 'Contact Us',
  },
  ErrorPage: {
    RELOAD_HINT: 'Page update detected, reloading the page...',
    ERROR: '💔 Error',
    ERROR_BOUNDARY_TIP_1:
      'Sorry, the code accidentally got caught in a black hole and the page crashed.',
    ERROR_BOUNDARY_TIP_2:
      'You can try accessing the page again, or you can visit another page first.',
    RETURN_TO_HOME: 'Return to home',
    RETRY: 'Retry',
    TECHNICAL_DEPARTMENT_CONTACT_EMAIL: 'Technical department contact email: ',
    ERROR_MESSAGE: 'Error message: ',
  },
  Feedback: {
    FEEDBACK_RESPONSE:
      'Thank you for your valuable comments, we will continue to improve~',
    FEEDBACK_TYPE: 'Feedback Type',
    SUBMIT: 'Submit',
    FEEDBACK_ON_THE_PROBLEM: 'Your feedback on this problem',
    ACCLAIM: 'Like',
    BAD_REVIEW: 'Dislike',
    PLEASE_SELECT_FEEDBACK_TYPE: 'Please fill in the feedback review',
    FEEDBACK_TEXTAREA_PLACEHOLDER:
      'Please describe your feedback in detail and we will deal with it as soon as possible',
    FEEDBACK_MESSAGE_1: 'Please fill in the satisfaction',
    FEEDBACK_MESSAGE_2: 'Please check the feedback type',
    FEEDBACK_MESSAGE_3: 'Please fill in the feedback content',
  },
  MicroApp: {
    Loading: 'Loading',
  },
  ContestTimeInput: {
    Hour: 'H',
    Minute: 'M',
  },
  AcConfig: {
    ExamTime: 'Exam Time',
    HomeworkTime: 'Homework Time',
    Contest_Time_Tip:
      'Please note that all users will be forced to hand in their papers after the contest time. Please do not adjust the time at will',
    Illegal_Duration: 'Illegal Duration',
    UnrestrictedDuration:
      'Unrestricted duration (teacher manually forces submission)',
    SCORE_RELEASE: 'Score Release',
    RELEASE_AFTER_THE_EXAM: 'Release after the exam',
    RELEASE_AFTER_TEACHER_CONFIRMATION: 'Release after teacher confirmation',
    SCHEDULED_RELEASE: 'Scheduled release',
    SCORE_DISPLAY_TIME: 'Score Display Time',
    LEADERBOARD_VISIBLE: 'Ranklist Visible',
    LEADERBOARD_VISIBLE_TIME: 'Ranklist Visible Time',
    VISIBLE_AFTER_GRADE_RELEASE: 'Visible after grade release',
    VISIBLE_AFTER_TEACHER_CONFIRMATION: 'Visible after teacher confirmation',
    VISIBLE_AFTER_THE_EXAM: 'Visible after the exam',
    TIMED_VISIBILITY: 'Timed visibility',
    Always_Visible: 'Always',
    TEST_PAPER_VISIBLE: 'After-contest paper visibility',
    TEST_PAPER_VISIBLE_TIME: 'After-contest paper visibility time',
    ANSWER_DISPLAY: 'Answer/Solution Display',
    ANSWER_DISPLAY_TIME: 'Answer/Solution Display Time',
    DISPLAY_AFTER_TEACHER_CONFIRMATION_01: 'Display after the exam ends',
    DISPLAY_AFTER_TEACHER_CONFIRMATION_02: 'Display after grade release',
    DISPLAY_AFTER_TEACHER_CONFIRMATION: 'Display after teacher confirmation',
    TIMED_DISPLAY: 'Timed display',
    RanklistShowRealName: 'Student Ranklist displays real names',
    ALLOW: 'Allow',
    PROHIBIT: 'Prohibit',
    RankShowUserLabel: 'Student Ranklist displays user labels',
    HAND_IN_THE_PAPER_IN_ADVANCE: 'Hand in the paper in advance',
    ALLOW_SETTIMEOUT_SUBMI: 'Timed advance submission',
    AFTER_CONTEST_START: 'After contest start',
    TimedSubmissionError:
      'The scheduled time cannot exceed the homework/exam duration',
    ALLOW_SUBMIT: 'allow submission',
    PartOrder: 'Part Order',
    RandomOrder: 'Random Order',
    ProgrammingOrder: 'Programming Question Order',
    ObjectiveOrder: 'Objective Question Order',
    CompositeInternalOrder: 'Composite Question Internal Order',
    SingleChoiceOrder: 'Single Choice Option Order',
    MultipleChoiceOrder: 'Multiple Choice Option Order',
    ProgrammingLanguage: 'Programming language',
    personalScoreVisibility: 'Personal Score Visibility',
    always: 'Always',
    never: 'Never',
    afterExam: 'After the exam',
    TIPS_DISPLAY: 'Tips Display',
    TIPS_DISPLAY_TIME: 'Tips Display Time',
    RankingValue: 'Problem Submission Result',
    LatestSubmit: 'Latest Submission Score',
    maxScore: 'Highest Submission Score',
    rankingMethod: 'Ranking Rules',
    Sort_By_Score: 'Sort by score',
    Sort_By_AC_Count: 'Sort by acCount',
    highScoreProgramVisibility: 'High Score Program Visibility',
    downloadDataEnable: 'Download error data (XJOI)',
    NumberDownloadsAllowed: 'Number of downloads allowed',
    General_Configuration: 'General Configuration',
    Programming_Problem_Configuration: 'Programming ProblemConfiguration',
    practice_end_restore_order:
      'Automatically restore order after the practice ends',
    No_limit: 'No Restrictions',
    RestrictionsDuringHomeworkExam: 'Restrictions During Homework/Exam',
    ResourceRestriction: 'Resource Restriction',
    ResourceRestrictionDesc:
      'Access to other course materials, Learning spaces, Premium Problem Bank, and forums is restricted.',
  },
} as const;
