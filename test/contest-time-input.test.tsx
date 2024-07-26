import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ContestTimeInput from '../src/contest-time-input';

describe('contest-time-input.test', () => {
  test('renders input time with correct initial values', () => {
    const { getByTestId } = render(
      <ContestTimeInput value={{ limitHour: 10, limitMinute: 20 }} />,
    );
    const hourInput = getByTestId('hour-input') as HTMLInputElement;
    const minuteInput = getByTestId('minute-input') as HTMLInputElement;
    expect(hourInput.value).toBe('10');
    expect(minuteInput.value).toBe('20');
  });

  test('calls onChange with updated values when input changes', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <ContestTimeInput onChange={handleChange} />,
    );
    const hourInput = getByTestId('hour-input');
    const minuteInput = getByTestId('minute-input');

    // 更改 start
    fireEvent.change(hourInput, { target: { value: 10 } });
    expect(handleChange).toHaveBeenCalledWith({
      limitHour: 10,
      limitMinute: undefined,
    });
    // 更改 end
    fireEvent.change(minuteInput, { target: { value: 20 } });
    expect(handleChange).toHaveBeenCalledWith({
      limitHour: 10,
      limitMinute: 20,
    });
  });

  test('handles undefined hour correctly', () => {
    const { getByTestId } = render(
      <ContestTimeInput value={{ limitMinute: 20 }} />,
    );
    const hourInput = getByTestId('hour-input') as HTMLInputElement;
    const minuteInput = getByTestId('minute-input') as HTMLInputElement;
    expect(hourInput.value).toBe('0');
    expect(minuteInput.value).toBe('20');
  });

  test('handles undefined minute correctly', () => {
    const { getByTestId } = render(
      <ContestTimeInput value={{ limitHour: 10 }} />,
    );
    const hourInput = getByTestId('hour-input') as HTMLInputElement;
    const minuteInput = getByTestId('minute-input') as HTMLInputElement;

    expect(hourInput.value).toBe('10');
    expect(minuteInput.value).toBe('0');
  });

  test('should not allow invalid hour and minute values', () => {
    const { getByTestId } = render(
      <ContestTimeInput
        value={{ limitHour: undefined, limitMinute: undefined }}
      />,
    );

    const hourInput = getByTestId('hour-input');
    const minuteInput = getByTestId('minute-input');

    fireEvent.change(hourInput, { target: { value: undefined } });
    expect(hourInput).toHaveValue('0');

    fireEvent.change(minuteInput, { target: { value: undefined } });
    expect(minuteInput).toHaveValue('0');
  });
});
