import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import InputNumbers from '../src/input-numbers';

describe('input-numbers', () => {
  test('renders input numbers with correct initial values', () => {
    const { getByTestId } = render(
      <InputNumbers value={{ start: 10, end: 20 }} />,
    );
    const startInput = getByTestId('start-input') as HTMLInputElement;
    const endInput = getByTestId('end-input') as HTMLInputElement;
    expect(startInput.value).toBe('10');
    expect(endInput.value).toBe('20');
  });

  test('calls onChange with updated values when input changes', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<InputNumbers onChange={handleChange} />);
    const startInput = getByTestId('start-input');
    const endInput = getByTestId('end-input');

    // 更改 start
    fireEvent.change(startInput, { target: { value: 10 } });
    expect(handleChange).toHaveBeenCalledWith({ start: 10, end: undefined });
    // 更改 end
    fireEvent.change(endInput, { target: { value: 20 } });
    expect(handleChange).toHaveBeenCalledWith({ start: 10, end: 20 });
  });

  test('handles non-numeric input correctly', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<InputNumbers onChange={handleChange} />);
    const startInput = getByTestId('start-input');
    const endInput = getByTestId('end-input');

    fireEvent.change(startInput, { target: { value: null } });
    expect(handleChange).not.toHaveBeenCalled();
    fireEvent.change(endInput, { target: { value: null } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('handles value changes between non-undefined and undefined correctly', () => {
    const { getByTestId, rerender } = render(
      <InputNumbers value={{ start: 10, end: 20 }} />,
    );
    const startInput = getByTestId('start-input') as HTMLInputElement;
    const endInput = getByTestId('end-input') as HTMLInputElement;
    expect(startInput.value).toBe('10');
    expect(endInput.value).toBe('20');

    rerender(<InputNumbers />);
    expect(startInput.value).toBe('');
    expect(endInput.value).toBe('');

    rerender(<InputNumbers value={{ start: 20, end: 10 }} />);
    expect(startInput.value).toBe('20');
    expect(endInput.value).toBe('10');
  });

  test('handles undefined start or end correctly', () => {
    const { getByTestId, rerender } = render(
      <InputNumbers value={{ end: 20 }} />,
    );
    const startInput = getByTestId('start-input') as HTMLInputElement;
    const endInput = getByTestId('end-input') as HTMLInputElement;
    expect(startInput.value).toBe('');
    expect(endInput.value).toBe('20');

    rerender(<InputNumbers value={{ start: 10 }} />);
    expect(startInput.value).toBe('10');
    expect(endInput.value).toBe('');
  });
});
