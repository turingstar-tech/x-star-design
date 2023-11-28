import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
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
}) as (query: string) => MediaQueryList;
jest.useFakeTimers();
describe('renders visual data config', () => {
  test('renders visual data config width single data', async () => {
    const onConfirmMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <VisualDataConfig onConfirm={onConfirmMock} />,
    );

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

    //single data
    fireEvent.change(getByLabelText('Id'), {
      target: { value: '1' },
    });
    fireEvent.change(getByLabelText('Time'), {
      target: { value: 1000 },
    });
    fireEvent.change(getByLabelText('Space'), {
      target: { value: 1024 },
    });
    fireEvent.change(getByLabelText('Score'), {
      target: { value: 10 },
    });
    fireEvent.click(getByText('Confirm and import'));
    // Assert that onConfirm is called with the correct value
    await waitFor(() => {
      expect(onConfirmMock).toHaveBeenCalledWith(
        JSON.stringify({
          timeLimit: 2000,
          memoryLimit: 524288,
          subtasks: [
            {
              timeLimit: 1000,
              memoryLimit: 1024,
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
});
