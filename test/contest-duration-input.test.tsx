import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import ContestDurationInput from '../src/contest-duration-input';
import { LocaleProvider } from '../src/locales';

describe('ContestDurationInput', () => {
  test('should render with initial values and onChange', () => {
    const onChange = jest.fn();
    const startTime = dayjs('2025-01-01 10:00');
    const endTime = dayjs('2025-01-01 12:00');

    render(
      <LocaleProvider locale={'zh_CN'}>
        <ContestDurationInput
          value={[startTime, endTime]}
          onChange={onChange}
        />
      </LocaleProvider>,
    );
    expect(screen.getByText('开始时间：')).toBeInTheDocument();

    const startInput = screen.getByTestId('duration-start-time');
    expect(startInput).toHaveValue('2025-01-01 10:00');
    expect(screen.getByTestId('hour-input')).toHaveValue('2');
    expect(screen.getByTestId('minute-input')).toHaveValue('0');

    fireEvent.change(startInput, { target: { value: '2025-01-01 11:00' } });
    fireEvent.change(screen.getByTestId('hour-input'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByTestId('minute-input'), {
      target: { value: '30' },
    });
    expect(onChange).toHaveBeenCalledWith([
      dayjs('2025-01-01T03:00:00.000Z'),
      dayjs('2025-01-01T06:30:00.000Z'),
    ]);
  });
  test('render illegal time', () => {
    const endTime = dayjs('2025-01-01 12:00');
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ContestDurationInput value={['123', endTime]} onChange={onChange} />,
    );
    const startInput = getByTestId('duration-start-time');
    fireEvent.change(startInput, { target: { value: '1234' } });
    fireEvent.change(getByTestId('hour-input'), { target: { value: '5' } });

    expect(onChange).toHaveBeenCalledWith([
      '1234',
      dayjs('1233-12-31T15:54:17.000Z'),
    ]);
  });

  test('render no initial value', () => {
    const onChange = jest.fn();
    const { getByTestId, rerender } = render(
      <ContestDurationInput onChange={onChange} />,
    );
    const startInput = getByTestId('duration-start-time');
    expect(startInput).toHaveValue('');
    expect(getByTestId('hour-input')).toHaveValue('0');
    expect(getByTestId('minute-input')).toHaveValue('0');

    rerender(<ContestDurationInput value={[null, null]} onChange={onChange} />);
    //时分不存在时
    fireEvent.change(startInput, {
      target: { value: '2025-01-01 11:00' },
    });
    expect(onChange).toHaveBeenCalledWith([
      dayjs('2025-01-01 11:00'),
      dayjs('2025-01-01 11:00'),
    ]);
    expect(getByTestId('hour-input')).toHaveValue('0');
    expect(getByTestId('minute-input')).toHaveValue('0');
    //时不存在 分进行改变
    rerender(
      <ContestDurationInput
        value={[dayjs('2025-01-01 10:00'), null]}
        onChange={onChange}
      />,
    );
    fireEvent.change(getByTestId('minute-input'), {
      target: { value: '30' },
    });

    expect(onChange).toHaveBeenCalledWith([
      dayjs('2025-01-01 10:00'),
      dayjs('2025-01-01 10:30'),
    ]);
  });
});
