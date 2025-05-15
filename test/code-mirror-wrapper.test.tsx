import { describe, expect, jest, test } from '@jest/globals';
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

// 在测试前模拟 WebSocket 和 languageServer
jest.mock('codemirror-languageserver', () => ({
  languageServer: jest.fn(() => {
    // 返回一个空扩展，不执行实际的 WebSocket 连接
    return { extension: [] };
  }),
}));

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
  test('lsp server url test', () => {
    const lspServerUrl = {
      cpp: 'ws://localhost:3000',
      py: 'ws://localhost:3001',
    } as const;

    // 测试C++的LSP服务器配置
    const { unmount: unmountCpp } = render(
      <CodeMirrorWrapper lspServerUrl={lspServerUrl} />,
    );
    unmountCpp(); // 立即卸载以避免连接保持打开状态

    // 测试Python的LSP服务器配置
    const { unmount: unmountPy } = render(
      <CodeMirrorWrapper lang={LangId.PY3} lspServerUrl={lspServerUrl} />,
    );
    unmountPy(); // 立即卸载以避免连接保持打开状态

    // 这里我们分别渲染并测试，以确保每个组件都能正确处理
    const { unmount: unmountFinal } = render(<CodeMirrorWrapper />);
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    unmountFinal();
  });
});
