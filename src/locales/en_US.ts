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
    ERROR: '☹ Error',
    ERROR_BOUNDARY_TIP_1:
      'Sorry, the code accidentally got caught in a black hole and the page crashed.',
    ERROR_BOUNDARY_TIP_2:
      'You can try accessing the page again, or you can visit another page first.',
    RETURN_TO_HOME: 'Return to home',
    RETRY: 'Retry',
    TECHNICAL_DEPARTMENT_CONTACT_EMAIL: 'Technical department contact email: ',
  },
  Feedback: {
    FEEDBACK_RESPONSE:
      'Thank you for your valuable comments, we will continue to improve~',
    FEEDBACK_TYPE: 'Feedback Type',
    SUBMIT: 'Submit',
    FEEDBACK_ON_THE_PROBLEM: 'Your feedback on this problem',
    ACCLAIM: 'Acclaim',
    BAD_REVIEW: 'Bad Review',
    PLEASE_SELECT_FEEDBACK_TYPE: 'Please fill in the feedback review',
    FEEDBACK_TEXTAREA_PLACEHOLDER:
      'Please describe your feedback in detail and we will deal with it as soon as possible',
  },
} as const;
