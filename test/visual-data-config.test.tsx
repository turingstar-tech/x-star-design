import { describe, expect, jest, test } from '@jest/globals';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import VisualDataConfig from '../src/visual-data-config';

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

const initialConfig = {
  timeLimit: 1000,
  memoryLimit: 262144,
  points: 10,
  subtasks: [
    {
      timeLimit: 1000,
      memoryLimit: 262144,
      points: 10,
      cases: ['1'],
      dependences: [],
    },
  ],
  aliases: [
    { from: 'data#.in', to: 'in' },
    { from: 'data#.out', to: 'ans' },
  ],
  build: {
    input: ['interactive.lib'],
  },
};
jest.useFakeTimers();

describe('visual data config', () => {
  test('renders width single data', async () => {
    const onConfirmMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <VisualDataConfig
        onConfirm={onConfirmMock}
        initialConfig={initialConfig}
      />,
    );

    //通用的数据配置
    fireEvent.change(getByLabelText('Time Limit(MS)'), {
      target: { value: 2000 },
    });
    fireEvent.change(getByLabelText('Memory Limit(KB)'), {
      target: { value: 524288 },
    });
    fireEvent.change(getByLabelText('Score of Each Case/Subtask'), {
      target: { value: 20 },
    });
    fireEvent.change(getByLabelText('Special Judge(SPJ) Executable Filename'), {
      target: { value: 'spj.exe' },
    });
    fireEvent.change(getByLabelText('Input Filename Format'), {
      target: { value: 'data#.in' },
    });
    fireEvent.change(getByLabelText('Output Filename Format'), {
      target: { value: 'data#.out' },
    });
    fireEvent.change(getByLabelText('File I/O Input File'), {
      target: { value: 'input#.txt' },
    });
    fireEvent.change(getByLabelText('File I/O Output File'), {
      target: { value: 'output#.txt' },
    });
    fireEvent.change(getByLabelText('Interactive Function Library Filename'), {
      target: { value: 'interactive.lib' },
    });

    //单个数据点配置
    fireEvent.change(getByLabelText('Id'), {
      target: { value: '1' },
    });
    fireEvent.change(getByLabelText('Time'), {
      target: { value: 1000 },
    });
    fireEvent.change(getByLabelText('Space'), {
      target: { value: 1024000 },
    });
    fireEvent.change(getByLabelText('Score'), {
      target: { value: 10 },
    });

    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });

    await waitFor(() => {
      expect(onConfirmMock).toHaveBeenCalledWith(
        JSON.stringify({
          timeLimit: 2000,
          memoryLimit: 524288,
          subtasks: [
            {
              timeLimit: 1000,
              memoryLimit: 1024000,
              points: 10,
              cases: ['1'],
            },
          ],
          aliases: [
            { from: 'data#.in', to: 'in' },
            { from: 'data#.out', to: 'ans' },
          ],
          check: {
            target: 'spj.exe',
            input: 'input#.txt',
            output: 'output#.txt',
          },
          run: {
            readable: 'input#.txt',
            writable: 'output#.txt',
          },
          build: {
            input: ['interactive.lib'],
          },
        }),
      );
    });
  });

  test('renders width single data and test add&remove', async () => {
    const { getByText, getAllByLabelText, getAllByTestId, getByTestId } =
      render(
        <VisualDataConfig onConfirm={() => {}} initialConfig={initialConfig} />,
      );
    //新增一个测试点
    const addBtn = getByText('Add a new test point');
    fireEvent.click(addBtn);
    expect(getAllByLabelText('Id').length).toBe(2);
    //删除一个测试点
    const deleteBtn = getAllByTestId('deleteSingleBtn')[1];
    fireEvent.click(deleteBtn);
    expect(getAllByLabelText('Id').length).toBe(1);
    //新增N个测试点
    const inputNumber = getByTestId('batchAddInput');
    const batchAddBtn = getByText('Batch Add');
    fireEvent.change(inputNumber, { target: { value: 5 } });
    fireEvent.click(batchAddBtn);
    expect(getAllByLabelText('Id').length).toBe(6);
    //测试极端情况value为null
    fireEvent.change(inputNumber, { target: { value: null } });
    fireEvent.click(batchAddBtn);
    expect(getAllByLabelText('Id').length).toBe(6);
  });

  test('renders width subtask data', async () => {
    const onConfirmMock = jest.fn();
    const {
      getByText,
      getByLabelText,
      getAllByLabelText,
      getAllByTestId,
      getByTestId,
    } = render(
      <VisualDataConfig
        onConfirm={onConfirmMock}
        initialConfig={initialConfig}
      />,
    );
    //通用的数据配置
    fireEvent.change(getByLabelText('Time Limit(MS)'), {
      target: { value: 2000 },
    });
    fireEvent.change(getByLabelText('Memory Limit(KB)'), {
      target: { value: 524288 },
    });
    fireEvent.change(getByLabelText('Score of Each Case/Subtask'), {
      target: { value: 20 },
    });
    fireEvent.change(getByLabelText('Special Judge(SPJ) Executable Filename'), {
      target: { value: 'spj.exe' },
    });
    fireEvent.change(getByLabelText('Input Filename Format'), {
      target: { value: 'data#.in' },
    });
    fireEvent.change(getByLabelText('Output Filename Format'), {
      target: { value: 'data#.out' },
    });
    fireEvent.change(getByLabelText('File I/O Input File'), {
      target: { value: 'input#.txt' },
    });
    fireEvent.change(getByLabelText('File I/O Output File'), {
      target: { value: 'output#.txt' },
    });
    fireEvent.change(getByLabelText('Interactive Function Library Filename'), {
      target: { value: 'interactive.lib' },
    });
    await act(async () => {
      // 模拟更改表单项的值
      fireEvent.click(getByText('SubTask'));
    });
    //渲染subtask
    expect(getByText('Add new subtask')).toBeInTheDocument();
    //子任务数据点配置
    //新增一个子任务
    const addBtn = getByText('Add new subtask');
    fireEvent.click(addBtn);
    expect(getAllByLabelText('Time').length).toBe(1);
    //修改第一个子任务数据
    fireEvent.change(getByLabelText('Time'), {
      target: { value: 1000 },
    });
    fireEvent.change(getByLabelText('Space'), {
      target: { value: 1024000 },
    });
    fireEvent.change(getByLabelText('Score'), {
      target: { value: 10 },
    });
    fireEvent.change(getByLabelText('Test Data'), {
      target: { value: ['1-5'] },
    });
    fireEvent.change(getByLabelText('Data dependency - subtask'), {
      target: { value: 1 },
    });
    //验证结果
    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });
    expect(onConfirmMock).toHaveBeenCalledWith(
      JSON.stringify({
        timeLimit: 2000,
        memoryLimit: 524288,
        subtasks: [
          {
            timeLimit: 1000,
            memoryLimit: 1024000,
            points: 10,
            dependences: ['1'],
            cases: ['1-5'],
          },
        ],
        aliases: [
          { from: 'data#.in', to: 'in' },
          { from: 'data#.out', to: 'ans' },
        ],
        check: {
          target: 'spj.exe',
          input: 'input#.txt',
          output: 'output#.txt',
        },
        run: {
          readable: 'input#.txt',
          writable: 'output#.txt',
        },
        build: {
          input: ['interactive.lib'],
        },
      }),
    );
    //新增N个子任务
    const inputNumber = getByTestId('batchAddInput');
    const batchAddBtn = getByText('Batch Add');
    fireEvent.change(inputNumber, { target: { value: 5 } });
    fireEvent.click(batchAddBtn);
    expect(getAllByLabelText('Time').length).toBe(6);
    //删除一个子任务
    const deleteBtn = getAllByTestId('deleteSubtaskBtn')[0];
    fireEvent.click(deleteBtn);
    expect(getAllByLabelText('Time').length).toBe(5);

    //测试极端情况value为null
    fireEvent.change(inputNumber, { target: { value: null } });
    fireEvent.click(batchAddBtn);
    expect(getAllByLabelText('Time').length).toBe(5);
  });

  test('renders with extremely situation', async () => {
    const onConfirmMock = jest.fn();
    const { getByText, getByLabelText, getAllByText } = render(
      <VisualDataConfig
        onConfirm={onConfirmMock}
        initialConfig={initialConfig}
      />,
    );
    fireEvent.change(getByLabelText('Time Limit(MS)'), {
      target: { value: 2000 },
    });
    fireEvent.change(getByLabelText('Memory Limit(KB)'), {
      target: { value: 524288 },
    });
    fireEvent.change(getByLabelText('Input Filename Format'), {
      target: { value: 'data#.in' },
    });
    fireEvent.change(getByLabelText('Output Filename Format'), {
      target: { value: 'data#.out' },
    });
    fireEvent.change(getByLabelText('Score of Each Case/Subtask'), {
      target: { value: 20 },
    });
    //测试子任务的分数被总的分数覆盖情况
    fireEvent.change(getByLabelText('Score'), {
      target: { value: 0 },
    });
    await act(async () => {
      fireEvent.click(getAllByText('Confirm and import')[0]);
    });
    expect(onConfirmMock).toHaveBeenCalledWith(
      JSON.stringify({
        timeLimit: 2000,
        memoryLimit: 524288,
        subtasks: [
          {
            timeLimit: 1000,
            memoryLimit: 262144,
            points: 20,
            cases: ['1'],
          },
        ],
        aliases: [
          { from: 'data#.in', to: 'in' },
          { from: 'data#.out', to: 'ans' },
        ],
        build: {
          input: ['interactive.lib'],
        },
      }),
    );
    //测试子任务的分数和总分数都没有的情况
    fireEvent.change(getByLabelText('Score of Each Case/Subtask'), {
      target: { value: 0 },
    });
    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });

    expect(onConfirmMock).toHaveBeenCalledWith(
      JSON.stringify({
        timeLimit: 2000,
        memoryLimit: 524288,
        subtasks: [
          {
            timeLimit: 1000,
            memoryLimit: 262144,
            points: 20,
            cases: ['1'],
          },
        ],
        aliases: [
          { from: 'data#.in', to: 'in' },
          { from: 'data#.out', to: 'ans' },
        ],
        build: {
          input: ['interactive.lib'],
        },
      }),
    );
  });

  test('renders with no initialConfig', async () => {
    const onConfirmMock = jest.fn();
    const { getByText } = render(
      <VisualDataConfig onConfirm={onConfirmMock} />,
    );
    //验证结果
    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });
    expect(onConfirmMock).not.toHaveBeenCalled();
  });

  test('renders with empty object initialConfig', async () => {
    const onConfirmMock = jest.fn();
    const { getByText, rerender } = render(
      <VisualDataConfig onConfirm={onConfirmMock} initialConfig={{}} />,
    );
    //验证结果
    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });
    expect(onConfirmMock).not.toHaveBeenCalled();

    rerender(
      <VisualDataConfig
        onConfirm={onConfirmMock}
        initialConfig={{
          timeLimit: 1000,
          memoryLimit: 262144,
          points: 10,
          subtasks: [
            {
              timeLimit: 1000,
              memoryLimit: 262144,
              points: 10,
              cases: ['1'],
              dependences: [],
            },
            {
              timeLimit: 1000,
              memoryLimit: 262144,
              points: 10,
              cases: '2',
              dependences: '1',
            },
          ],
          aliases: [
            { from: 'data#.in', to: 'in' },
            { from: 'data#.out', to: 'ans' },
          ],
          build: {
            input: 'interactive.lib',
          },
        }}
      />,
    );

    //验证结果
    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });
    expect(onConfirmMock).toHaveBeenCalledWith(
      JSON.stringify({
        timeLimit: 1000,
        memoryLimit: 262144,
        subtasks: [
          {
            timeLimit: 1000,
            memoryLimit: 262144,
            points: 10,
            cases: ['1'],
          },
          {
            timeLimit: 1000,
            memoryLimit: 262144,
            points: 10,
            dependences: ['1'],
            cases: ['2'],
          },
        ],
        aliases: [
          {
            from: 'data#.in',
            to: 'in',
          },
          {
            from: 'data#.out',
            to: 'ans',
          },
        ],
        build: {
          input: ['interactive.lib'],
        },
      }),
    );
  });

  test('renders with isSubtask', async () => {
    const onConfirmMock = jest.fn();
    const { getByText } = render(
      <VisualDataConfig
        onConfirm={onConfirmMock}
        isSubtask={true}
        initialConfig={{
          timeLimit: 0,
          memoryLimit: 0,
          points: 10,
          subtasks: [
            {
              timeLimit: 0,
              memoryLimit: 0,
              points: 0,
            },
          ],
          aliases: [
            { from: 'data#.in', to: 'in' },
            { from: 'data#.out', to: 'ans' },
          ],
        }}
      />,
    );
    //验证结果
    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });

    expect(onConfirmMock).not.toHaveBeenCalled();
  });
  test('renders with time limit and memory limit', async () => {
    const onConfirmMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <VisualDataConfig
        onConfirm={onConfirmMock}
        initialConfig={initialConfig}
      />,
    );
    fireEvent.change(getByLabelText('Time Limit(MS)'), {
      target: { value: 499 },
    });
    fireEvent.change(getByLabelText('Memory Limit(KB)'), {
      target: { value: 130999 },
    });
    fireEvent.change(getByLabelText('Time'), {
      target: { value: 499 },
    });
    fireEvent.change(getByLabelText('Space'), {
      target: { value: 130999 },
    });
    //验证结果
    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });
    expect(onConfirmMock).not.toHaveBeenCalled();

    await act(async () => {
      // 模拟更改表单项的值
      fireEvent.click(getByText('SubTask'));
    });
    const addBtn = getByText('Add new subtask');
    fireEvent.click(addBtn);
    fireEvent.change(getByLabelText('Time'), {
      target: { value: 499 },
    });
    fireEvent.change(getByLabelText('Space'), {
      target: { value: 130999 },
    });
    await act(async () => {
      fireEvent.click(getByText('Confirm and import'));
    });
    expect(onConfirmMock).not.toHaveBeenCalled();
  });
});
