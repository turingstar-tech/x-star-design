import { describe, expect, jest, test } from '@jest/globals';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React, { createRef } from 'react';
import AcConfig, { AcConfigRef } from '../src/ac-config';
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

describe('AcConfig', () => {
  test('render contest AcConfig', async () => {
    const ref = createRef<AcConfigRef>();
    const { getByText, getByLabelText, getByTestId } = render(
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
              endTime: 1721873321,
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
    // RankList Visible
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
    //Student Ranklist displays real names
    fireEvent.click(getByTestId('rankListShowRealName-allow'));
    // Student Ranklist displays user labels
    fireEvent.click(getByTestId('rankShowUserLabel-prohibit'));
    // Hand in the paper in advance
    await act(async () => {
      fireEvent.click(getByTestId('submission-timedSubmission'));
    });
    expect(getByText('After contest start')).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(getByTestId('hour-input'), { target: { value: 1 } });
    });
    await act(async () => {
      fireEvent.change(getByTestId('minute-input'), { target: { value: 20 } });
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

    expect(JSON.stringify(ref.current?.getConfigData())).toBe(
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
        contest: {
          startTime: 1721870100,
          endTime: 1721873280,
        },
      }),
    );
  });

  test('render homework AcConfig', async () => {
    const ref = createRef<AcConfigRef>();
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

    // RankList Visible
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
    //Student Ranklist displays real names
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

    fireEvent.change(getByTestId('downloadDataCount-input'), {
      target: {
        value: 10,
      },
    });
    expect(JSON.stringify(ref.current?.getConfigData())).toBe(
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
    const ref = createRef<AcConfigRef>();
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
  test('invalid config with validate 2', async () => {
    const ref = createRef<AcConfigRef>();
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
    expect(ref.current?.getConfigData().homework?.limitTime).toBe(4800);
  });

  test('homework limitTime', async () => {
    const ref = createRef<AcConfigRef>();
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
    expect(ref.current?.getConfigData().homework?.limitTime).toBe(0);
  });

  test('simple type AcConfig', async () => {
    const ref = createRef<AcConfigRef>();
    const { getAllByText } = render(
      <AcConfig
        ref={ref}
        contestType={ContestExamType.Homework}
        type="simple"
      />,
    );
    expect(getAllByText('Visible after grade release')[0]).not.toBeVisible();
  });
});
