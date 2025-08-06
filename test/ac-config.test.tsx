import { describe, expect, jest, test } from '@jest/globals';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React, { createRef } from 'react';
import type { AcConfigHandle } from '../src/ac-config';
import AcConfig, { getConfigData } from '../src/ac-config';
import { ContestExamType } from '../src/ac-config/define';

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
}) as typeof window.matchMedia;

jest.useFakeTimers();

describe('ac config', () => {
  test('render contest AcConfig', async () => {
    const ref = createRef<AcConfigHandle>();
    const { getByText, getByLabelText, getByTestId, getAllByTestId } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Exam}
        initialValues={
          {
            program: {
              lang: ['g++', 'gcc'],
            },
            general: {
              gradeRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              paperRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              disorder: {
                part: false,
                program: false,
                objective: false,
                combinationInternal: false,
                singleOption: false,
                multipleOption: false,
              },
            },
            contest: {
              startTime: 1721870123,
              endTime: 1842649520,
            },
            type: 'contest',
          } as any
        }
      />,
    );

    // Score Release
    fireEvent.click(getByText('Release after the exam'));
    await act(async () => {
      fireEvent.click(getByTestId('gradeRelease-scheduled'));
    });
    await waitFor(() => {
      expect(getByText('Score Display Time')).toBeInTheDocument();
    });
    // fireEvent.change(getByLabelText('Score Display Time'),
    //   { value: 1721870628 },
    // );
    // Ranklist Visible
    fireEvent.click(getByTestId('rankListRelease-afterGradeRelease'));
    //After-contest paper visibility
    await act(async () => {
      fireEvent.click(getByTestId('paperRelease-scheduled'));
    });
    await waitFor(() => {
      expect(
        getByLabelText('After-contest paper visibility time'),
      ).toBeInTheDocument();
    });
    // fireEvent.change(getByLabelText('After-contest paper visibility time'),
    //   { value: 1721870628 },
    // );
    // Answer/Solution Display
    fireEvent.click(getByTestId('answerRelease-afterExam'));
    // Student Ranklist displays real names
    fireEvent.click(getByTestId('rankListShowRealName-allow'));
    // Student Ranklist displays user labels
    fireEvent.click(getByTestId('rankShowUserLabel-prohibit'));
    // Hand in the paper in advance
    await act(async () => {
      fireEvent.click(getByTestId('submission-timedSubmission'));
    });
    expect(getByText('After contest start')).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(getAllByTestId('hour-input')[1], {
        target: { value: 1 },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('minute-input')[1], {
        target: { value: 20 },
      });
    });
    // disorder
    // fireEvent.change(getByTestId('disorder'), {
    //   value: ['part', 'program', 'objective', 'combinationInternal', 'singleOption', 'multipleOption']
    // })
    fireEvent.click(getByText('Part Order'));
    fireEvent.click(getByText('Programming Question Order'));

    // Programing Language
    // fireEvent.click(getByTestId('lang-select'))

    // Personal Score Visibility
    fireEvent.click(getByTestId('personalScoreVisibility-always'));

    // TIPS Display
    fireEvent.click(getByTestId('tipRelease-afterExam'));

    // Problem Submission Result
    fireEvent.click(getByTestId('scoreTypeInMatch-latestSubmit'));

    // Ranking Rules
    fireEvent.click(getByTestId('rankingMethod-score'));

    // High Score Program Visibility
    fireEvent.click(getByTestId('highScoreProgramVisibility-always'));
    // Dual Track Judgement
    fireEvent.click(getByTestId('dualEvaluation-true'));

    // Download error data (XJOI)
    fireEvent.click(getByTestId('downloadDataEnable-false'));
    expect(getByTestId('downloadDataCount-input')).toBeDisabled();
    fireEvent.click(getByTestId('downloadDataEnable-true'));
    expect(getByTestId('downloadDataCount-input')).not.toBeDisabled();

    fireEvent.change(getByTestId('downloadDataCount-input'), {
      target: {
        value: 10,
      },
    });
    await act(async () => {
      fireEvent.click(getByTestId('showTopNSubmission-true'));
    });
    await waitFor(() => {
      expect(getByLabelText('Top N')).toBeInTheDocument();
    });
    fireEvent.change(getByTestId('showTopNSubmission-input'), {
      target: {
        value: 10,
      },
    });
    expect(
      JSON.stringify(
        getConfigData({
          rawData: ref?.current?.form.getFieldsValue(),
          contestType: ContestExamType.Exam,
        }),
      ),
    ).toBe(
      JSON.stringify({
        general: {
          gradeRelease: {
            type: 'scheduled',
            scheduled: {
              releaseTime: 1721899920,
            },
          },
          paperRelease: {
            type: 'scheduled',
            scheduled: {
              releaseTime: 1721899920,
            },
          },
          rankListRelease: {
            type: 'afterGradeRelease',
            scheduled: {
              releaseTime: undefined,
            },
          },
          tipRelease: {
            type: 'afterExam',
            scheduled: {
              releaseTime: undefined,
            },
          },
          answerRelease: {
            type: 'afterExam',
            scheduled: {
              releaseTime: undefined,
            },
          },
          submission: {
            type: 'timedSubmission',
            scheduled: {},
            submissionTimed: 80,
          },
          disorder: {
            part: true,
            program: true,
            objective: false,
            combinationInternal: false,
            singleOption: false,
            multipleOption: false,
          },
          restriction: {},
        },
        rank: { rankListShowRealName: true, rankShowUserLabel: false },
        program: {
          personalScoreVisibility: 'always',
          rankingMethod: 'score',
          highScoreProgramVisibility: 'always',
          downloadDataEnable: true,
          downloadDataCount: 10,
          scoreTypeInMatch: 'latestSubmit',
          lang: ['g++', 'gcc'],
          showTopNSubmission: true,
          showTopNSubmissionCount: 10,
          dualEvaluation: true,
        },
        contest: {
          startTime: 1721870100,
          endTime: 1842649500,
        },
      }),
    );
  });

  test('render homework AcConfig', async () => {
    const ref = createRef<AcConfigHandle>();
    const { getByText, getByLabelText, getByTestId } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Homework}
        initialValues={
          {
            program: {
              lang: ['g++', 'gcc'],
            },
            general: {
              gradeRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              paperRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              disorder: {
                part: false,
                program: false,
                objective: false,
                combinationInternal: false,
                singleOption: false,
                multipleOption: false,
              },
            },
            homework: {
              limitTime: undefined,
              noLimit: true,
            },
            type: 'homework',
          } as any
        }
      />,
    );

    // Score Release
    fireEvent.click(getByText('Release after the exam'));
    await act(async () => {
      fireEvent.click(getByTestId('gradeRelease-scheduled'));
    });
    await waitFor(() => {
      expect(getByText('Score Display Time')).toBeInTheDocument();
    });

    // Ranklist Visible
    fireEvent.click(getByTestId('rankListRelease-afterGradeRelease'));
    //After-contest paper visibility
    await act(async () => {
      fireEvent.click(getByTestId('paperRelease-scheduled'));
    });
    await waitFor(() => {
      expect(
        getByLabelText('After-contest paper visibility time'),
      ).toBeInTheDocument();
    });

    // Answer/Solution Display
    fireEvent.click(getByTestId('answerRelease-afterExam'));
    // Student Ranklist displays real names
    fireEvent.click(getByTestId('rankListShowRealName-allow'));
    // Student Ranklist displays user labels
    fireEvent.click(getByTestId('rankShowUserLabel-prohibit'));

    // Hand in the paper in advance
    // await act(async () => {
    //   fireEvent.click(getByTestId('submission-timedSubmission'));
    // })
    // expect(getByText('After contest start')).toBeInTheDocument();
    // await act(async () => {
    //   fireEvent.change(getByTestId('hour-input'), { target: { value: 1 } });
    // });
    // await act(async () => {
    //   fireEvent.change(getByTestId('minute-input'), { target: { value: 20 } });
    // });

    // disorder
    fireEvent.click(getByText('Part Order'));
    fireEvent.click(getByText('Programming Question Order'));

    // Programing Language
    // fireEvent.click(getByTestId('lang-select'))

    // Personal Score Visibility
    fireEvent.click(getByTestId('personalScoreVisibility-always'));

    // TIPS Display
    fireEvent.click(getByTestId('tipRelease-afterExam'));

    // Problem Submission Result
    fireEvent.click(getByTestId('scoreTypeInMatch-latestSubmit'));

    // Ranking Rules
    fireEvent.click(getByTestId('rankingMethod-score'));

    // High Score Program Visibility
    fireEvent.click(getByTestId('highScoreProgramVisibility-always'));

    // Download error data (XJOI)
    fireEvent.click(getByTestId('downloadDataEnable-false'));
    expect(getByTestId('downloadDataCount-input')).toBeDisabled();
    fireEvent.click(getByTestId('downloadDataEnable-true'));
    expect(getByTestId('downloadDataCount-input')).not.toBeDisabled();

    // restriction
    fireEvent.click(getByText('No Restrictions'));

    fireEvent.change(getByTestId('downloadDataCount-input'), {
      target: {
        value: 10,
      },
    });
    expect(
      JSON.stringify(
        getConfigData({
          rawData: ref?.current?.form.getFieldsValue(),
          contestType: ContestExamType.Homework,
        }),
      ),
    ).toBe(
      JSON.stringify({
        general: {
          gradeRelease: {
            type: 'scheduled',
            scheduled: {
              releaseTime: 1721899920,
            },
          },
          paperRelease: {
            type: 'scheduled',
            scheduled: {
              releaseTime: 1721899920,
            },
          },
          rankListRelease: {
            type: 'afterGradeRelease',
            scheduled: {
              releaseTime: undefined,
            },
          },
          tipRelease: {
            type: 'afterExam',
            scheduled: {
              releaseTime: undefined,
            },
          },
          answerRelease: {
            type: 'afterExam',
            scheduled: {
              releaseTime: undefined,
            },
          },
          submission: {
            type: undefined,
            scheduled: {},
            submissionTimed: 0,
          },
          disorder: {
            part: true,
            program: true,
            objective: false,
            combinationInternal: false,
            singleOption: false,
            multipleOption: false,
          },
          restriction: { type: 'never' },
        },
        rank: { rankListShowRealName: true, rankShowUserLabel: false },
        program: {
          personalScoreVisibility: 'always',
          rankingMethod: 'score',
          highScoreProgramVisibility: 'always',
          downloadDataEnable: true,
          downloadDataCount: 10,
          scoreTypeInMatch: 'latestSubmit',
          lang: ['g++', 'gcc'],
        },
        homework: {
          limitTime: undefined,
          noLimit: true,
        },
      }),
    );
  });

  test('invalid config with validate 1', async () => {
    const ref = createRef<AcConfigHandle>();
    const { getByText, getByTestId, getAllByTestId } = render(
      <AcConfig ref={ref} contestType={ContestExamType.Homework} />,
    );
    await act(async () => {
      fireEvent.click(getByTestId('contestTime-limitTime'));
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('hour-input')[0], {
        target: { value: 1 },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('minute-input')[0], {
        target: { value: 20 },
      });
    });
    await act(async () => {
      fireEvent.click(getByText('Timed advance submission'));
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('hour-input')[1], {
        target: { value: 1 },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('minute-input')[1], {
        target: { value: 30 },
      });
    });
    await act(async () => {
      ref.current?.form.submit();
    });
    expect(ref.current?.form.getFieldError('lang')[0]).toBe(
      'Please enter Programming language',
    );
    expect(ref.current?.form.getFieldError('submissionLimitTime')[0]).toBe(
      'The scheduled time cannot exceed the homework/exam duration',
    );
  });
  test('invalid config with validate 1 in Contest', async () => {
    const ref = createRef<AcConfigHandle>();
    const { getByText, getByTestId, getAllByTestId } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Exam}
        initialValues={
          {
            type: 'advanced',
            program: {
              lang: ['g++', 'gcc'],
            },
            general: {
              gradeRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              paperRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              disorder: {
                part: false,
                program: false,
                objective: false,
                combinationInternal: false,
                singleOption: false,
                multipleOption: false,
              },
            },
            contest: {
              startTime: 1915070600,
              endTime: 1915070660,
            },
          } as any
        }
      />,
    );
    const swapBtn = getByTestId('contest-config-time-swap');
    const startInput = getByTestId('duration-start-time');

    expect(startInput).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(swapBtn);
    });
    await act(async () => {
      fireEvent.click(getByText('Timed advance submission'));
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('hour-input')[0], {
        target: { value: 1 },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('minute-input')[0], {
        target: { value: 30 },
      });
    });
    await act(async () => {
      ref.current?.form.submit();
    });
    expect(ref.current?.form.getFieldError('submissionLimitTime')[0]).toBe(
      'The scheduled time cannot exceed the homework/exam duration',
    );
  });
  test('invalid config with validate 2', async () => {
    const ref = createRef<AcConfigHandle>();
    const { getByTestId, getAllByTestId } = render(
      <AcConfig ref={ref} contestType={ContestExamType.Homework} />,
    );
    await act(async () => {
      fireEvent.click(getByTestId('contestTime-limitTime'));
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('hour-input')[0], {
        target: { value: 0 },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('minute-input')[0], {
        target: { value: 0 },
      });
    });
    await act(async () => {
      ref.current?.form.submit();
    });
    expect(ref.current?.form.getFieldError('limitTime')[0]).toBe(
      'Illegal Duration',
    );
    await act(async () => {
      fireEvent.change(getAllByTestId('hour-input')[0], {
        target: { value: 1 },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('minute-input')[0], {
        target: { value: 20 },
      });
    });
    await act(async () => {
      ref.current?.form.submit();
    });
    expect(
      getConfigData({
        rawData: ref?.current?.form.getFieldsValue(),
        contestType: ContestExamType.Homework,
      }).homework?.limitTime,
    ).toBe(4800);
  });

  test('homework limitTime', async () => {
    const ref = createRef<AcConfigHandle>();
    const { getAllByTestId } = render(
      <AcConfig ref={ref} contestType={ContestExamType.Homework} />,
    );
    await act(async () => {
      fireEvent.change(getAllByTestId('hour-input')[0], {
        target: { value: undefined },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('minute-input')[0], {
        target: { value: undefined },
      });
    });
    await act(async () => {
      ref.current?.form.submit();
    });
    expect(
      getConfigData({
        rawData: ref?.current?.form.getFieldsValue(),
        contestType: ContestExamType.Homework,
      }).homework?.limitTime,
    ).toBe(0);
  });

  test('simple type AcConfig', async () => {
    const ref = createRef<AcConfigHandle>();
    const { getAllByText } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Homework}
        type="simple"
      />,
    );
    expect(getAllByText('Visible after grade release')[0]).not.toBeVisible();
  });

  test('onFinish Called', async () => {
    const ref = createRef<AcConfigHandle>();
    const onChange = jest.fn();
    render(
      <AcConfig
        ref={ref}
        type="simple"
        onFinish={onChange}
        initialValues={
          {
            program: {
              lang: ['g++', 'gcc'],
            },
            general: {
              gradeRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              paperRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              disorder: {
                part: false,
                program: false,
                objective: false,
                combinationInternal: false,
                singleOption: false,
                multipleOption: false,
              },
            },
            homework: {
              limitTime: undefined,
              noLimit: true,
            },
            type: 'homework',
          } as any
        }
      />,
    );
    await act(async () => {
      ref.current?.form.submit();
    });
    expect(onChange).toBeCalled();
  });

  test('exam time mode exchange', async () => {
    const ref = createRef<AcConfigHandle>();
    const onFinish = jest.fn();
    const { getAllByTestId, getByTestId } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Exam}
        onFinish={onFinish}
      />,
    );
    const swapBtn = getByTestId('contest-config-time-swap');
    await act(async () => {
      fireEvent.click(swapBtn);
    });
    expect(getAllByTestId('contest-config-time-input')[0]).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(swapBtn);
    });
    expect(getByTestId('duration-start-time')).toBeInTheDocument();
  });
  test('exam time mode exchange with initial value', async () => {
    const ref = createRef<AcConfigHandle>();
    const onFinish = jest.fn();
    const { getByTestId, getByText, getAllByTestId } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Exam}
        onFinish={onFinish}
        initialValues={
          {
            type: 'advanced',
            program: {
              lang: ['g++', 'gcc'],
            },
            general: {
              gradeRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              paperRelease: {
                type: 'scheduled',
                scheduled: {
                  releaseTime: 1721899977,
                },
              },
              disorder: {
                part: false,
                program: false,
                objective: false,
                combinationInternal: false,
                singleOption: false,
                multipleOption: false,
              },
            },
            contest: {
              startTime: 1715070600,
              endTime: 1842649520,
            },
          } as any
        }
      />,
    );
    const swapBtn = getByTestId('contest-config-time-swap');
    const startInput = getByTestId('duration-start-time');

    expect(startInput).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(swapBtn);
    });
    expect(startInput).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(swapBtn);
    });
    expect(getByTestId('duration-start-time')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(getByTestId('duration-start-time'), {
        target: { value: 'abcd' },
      });
    });
    await act(async () => {
      fireEvent.click(swapBtn);
    });
    expect(getByText('Please Enter Correct Time Format')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(getByTestId('duration-start-time'), {
        target: { value: '2025-01-01 11:00' },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('hour-input')[0], {
        target: { value: '0' },
      });
    });
    await act(async () => {
      fireEvent.change(getAllByTestId('minute-input')[0], {
        target: { value: '0' },
      });
    });
    await act(async () => {
      ref.current?.form.submit();
    });
    expect(onFinish).not.toBeCalled();
  });

  test('answer/hint release after contest started n mins', async () => {
    const ref = createRef<AcConfigHandle>();
    const onFinish = jest.fn();
    const { getAllByTestId } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Exam}
        onFinish={onFinish}
        initialValues={
          {
            type: 'advanced',
            contest: {
              startTime: 1721870100,
              endTime: 1842649500,
            },
            program: {
              lang: ['g++', 'gcc'],
            },
            general: {
              answerRelease: {
                type: 'started',
                scheduled: {
                  releaseTime: 0,
                },
              },
              tipRelease: {
                type: 'started',
                scheduled: {
                  releaseTime: 0,
                },
              },
            },
          } as any
        }
      />,
    );
    expect(getAllByTestId('hour-input')[1]).toHaveValue('0');
    expect(getAllByTestId('minute-input')[1]).toHaveValue('0');
    expect(getAllByTestId('hour-input')[2]).toHaveValue('0');
    expect(getAllByTestId('minute-input')[2]).toHaveValue('0');

    fireEvent.change(getAllByTestId('hour-input')[1], {
      target: { value: 2 },
    });
    fireEvent.change(getAllByTestId('minute-input')[1], {
      target: { value: 5 },
    });
    fireEvent.change(getAllByTestId('hour-input')[2], {
      target: { value: 2 },
    });
    fireEvent.change(getAllByTestId('minute-input')[2], {
      target: { value: 20 },
    });

    await act(async () => {
      ref.current?.form.submit();
    });

    expect(onFinish).toHaveBeenCalledWith({
      contest: {
        startTime: 1721870100,
        endTime: 1842649500,
      },
      general: {
        disorder: {
          combinationInternal: false,
          multipleOption: false,
          objective: false,
          part: false,
          program: false,
          singleOption: false,
        },
        gradeRelease: {
          scheduled: {
            releaseTime: undefined,
          },
          type: undefined,
        },
        paperRelease: {
          scheduled: {
            releaseTime: undefined,
          },
          type: undefined,
        },
        rankListRelease: {
          scheduled: {
            releaseTime: undefined,
          },
          type: undefined,
        },
        restriction: {
          type: undefined,
        },
        submission: {
          scheduled: {},
          submissionTimed: 0,
          type: undefined,
        },
        answerRelease: {
          scheduled: {
            releaseTime: 7500,
          },
          type: 'started',
        },
        tipRelease: {
          scheduled: {
            releaseTime: 8400,
          },
          type: 'started',
        },
      },
      program: {
        downloadDataCount: undefined,
        downloadDataEnable: undefined,
        highScoreProgramVisibility: undefined,
        lang: ['g++', 'gcc'],
        personalScoreVisibility: undefined,
        rankingMethod: undefined,
        scoreTypeInMatch: undefined,
        showTopNSubmission: undefined,
        showTopNSubmissionCount: undefined,
      },
      rank: {
        rankListShowRealName: undefined,
        rankShowUserLabel: undefined,
      },
    });

    fireEvent.change(getAllByTestId('hour-input')[1], {
      target: { value: 0 },
    });
    fireEvent.change(getAllByTestId('minute-input')[1], {
      target: { value: 0 },
    });
    fireEvent.change(getAllByTestId('hour-input')[2], {
      target: { value: 0 },
    });
    fireEvent.change(getAllByTestId('minute-input')[2], {
      target: { value: 0 },
    });
    await act(async () => {
      ref.current?.form.submit();
    });

    expect(onFinish).toHaveBeenCalledWith({
      contest: {
        startTime: 1721870100,
        endTime: 1842649500,
      },
      general: {
        disorder: {
          combinationInternal: false,
          multipleOption: false,
          objective: false,
          part: false,
          program: false,
          singleOption: false,
        },
        gradeRelease: {
          scheduled: {
            releaseTime: undefined,
          },
          type: undefined,
        },
        paperRelease: {
          scheduled: {
            releaseTime: undefined,
          },
          type: undefined,
        },
        rankListRelease: {
          scheduled: {
            releaseTime: undefined,
          },
          type: undefined,
        },
        restriction: {
          type: undefined,
        },
        submission: {
          scheduled: {},
          submissionTimed: 0,
          type: undefined,
        },
        answerRelease: {
          scheduled: {
            releaseTime: 0,
          },
          type: 'started',
        },
        tipRelease: {
          scheduled: {
            releaseTime: 0,
          },
          type: 'started',
        },
      },
      program: {
        downloadDataCount: undefined,
        downloadDataEnable: undefined,
        highScoreProgramVisibility: undefined,
        lang: ['g++', 'gcc'],
        personalScoreVisibility: undefined,
        rankingMethod: undefined,
        scoreTypeInMatch: undefined,
        showTopNSubmission: undefined,
        showTopNSubmissionCount: undefined,
      },
      rank: {
        rankListShowRealName: undefined,
        rankShowUserLabel: undefined,
      },
    });
  });

  test('AcConfig isRevise=true 时渲染修订相关内容', async () => {
    const ref = createRef<AcConfigHandle>();
    const { getByText } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Homework}
        isRevise={true}
        initialValues={
          {
            program: {
              lang: ['g++', 'gcc'],
              showTopNSubmissionCount: 10,
              showTopNSubmission: true,
            },
            general: {
              gradeRelease: {
                type: 'scheduled',
                scheduled: { releaseTime: 1721899977 },
              },
              paperRelease: {
                type: 'scheduled',
                scheduled: { releaseTime: 1721899977 },
              },
              disorder: {
                part: false,
                program: false,
                objective: false,
                combinationInternal: false,
                singleOption: false,
                multipleOption: false,
              },
              tipRelease: {
                type: 'scheduled',
                scheduled: { releaseTime: 1721899977 },
              },
            },
            homework: { limitTime: undefined, noLimit: true },
            type: 'homework',
          } as any
        }
      />,
    );
    // 假设修订模式下会出现“修订次数”字样
    expect(getByText('Revise Count')).toBeInTheDocument();
    // 你也可以断言某些按钮是否可用/不可用
    // expect(getByTestId('revise-button')).not.toBeDisabled();
  });

  test('AcConfig isRevise=false 时渲染修订相关内容', async () => {
    const ref = createRef<AcConfigHandle>();
    const { queryByText } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Homework}
        isRevise={false}
        initialValues={
          {
            program: {
              lang: ['g++', 'gcc'],
              showTopNSubmissionCount: 10,
              showTopNSubmission: true,
            },
            general: {
              gradeRelease: {
                type: 'scheduled',
                scheduled: { releaseTime: 1721899977 },
              },
              paperRelease: {
                type: 'scheduled',
                scheduled: { releaseTime: 1721899977 },
              },
              disorder: {
                part: false,
                program: false,
                objective: false,
                combinationInternal: false,
                singleOption: false,
                multipleOption: false,
              },
              tipRelease: {
                type: 'scheduled',
                scheduled: { releaseTime: 1721899977 },
              },
            },
            homework: { limitTime: undefined, noLimit: true },
            type: 'homework',
          } as any
        }
      />,
    );
    // 假设修订模式下会出现“修订次数”字样
    expect(queryByText('Revise Count')).toBeNull();
    // 你也可以断言某些按钮是否可用/不可用
    // expect(getByTestId('revise-button')).not.toBeDisabled();
  });
});
