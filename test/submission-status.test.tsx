import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SubmissionStatus } from '../src';
jest.useFakeTimers();
jest.mock('../src/locales', () => ({
  useLocale: () => ({
    locale: 'zh_CN',
  }),
}));
describe('submission status', () => {
  test('render with correct CSS class and style', () => {
    render(
      <SubmissionStatus
        status="Accepted"
        className="testClassName"
        style={{ color: 'red' }}
      />,
    );
    const submissionStatus = screen.getByTestId('submissionStatus');
    // 内容和样式被渲染
    expect(submissionStatus).toHaveTextContent('Accepted');
    expect(submissionStatus).toHaveClass('testClassName');
    expect(submissionStatus).toHaveStyle({ color: 'red' });
  });

  test('render with click event', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClick = jest.fn();
    render(<SubmissionStatus status="Accepted" onClick={onClick} />);

    const submissionStatus = screen.getByTestId('submissionStatus');
    //鼠标点击
    await user.click(submissionStatus);
    expect(onClick).toHaveBeenCalled();
  });
});
