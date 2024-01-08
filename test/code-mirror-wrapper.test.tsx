import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import CodeMirrorWrapper from '../src/code-mirror-wrapper';
import { LangId } from '../src/code-mirror-wrapper/define';

jest.useFakeTimers();

Range.prototype.getClientRects = () => ({
  item: () => null,
  length: 0,
  [Symbol.iterator]: jest.fn<() => IterableIterator<DOMRect>>(),
});

describe('code mirror wrapper', () => {
  test('renders editor and changes value', () => {
    const onChange = jest.fn();
    render(<CodeMirrorWrapper onChange={onChange} />);
    const editor = screen.getByRole('textbox');

    // 修改文本触发 onChange 事件
    editor.textContent = 'abc';
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, 'abc', expect.anything());
  });

  test('renders editor and changes language', () => {
    const { rerender } = render(<CodeMirrorWrapper />);
    const editor = screen.getByRole('textbox');
    expect(editor.dataset.language).toBe('cpp');

    // C++ 识别 #include 关键字
    editor.textContent = '#include <cstdio>';
    jest.runAllTimers();
    expect(screen.getByText('#include')).toBeInTheDocument();

    rerender(<CodeMirrorWrapper lang={LangId.JAVA} />);
    expect(editor.dataset.language).toBe('java');

    // Java 识别 extends 关键字
    editor.textContent = 'class A extends B { }';
    jest.runAllTimers();
    expect(screen.getByText('extends')).toBeInTheDocument();

    rerender(<CodeMirrorWrapper lang={LangId.PY2} />);
    expect(editor.dataset.language).toBe('python');

    // Python 识别 not 关键字
    editor.textContent = 'if not True:\n pass';
    jest.runAllTimers();
    expect(screen.getByText('not')).toBeInTheDocument();

    rerender(<CodeMirrorWrapper lang={LangId.PLAIN} />);
    expect(editor.dataset.language).toBe(undefined);
  });
});
