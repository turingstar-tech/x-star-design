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
jest.mock(
  '@marimo-team/codemirror-languageserver',
  () => ({
    languageServer: jest.fn(() => {
      // 返回一个空扩展，不执行实际的 WebSocket 连接
      return { extension: [] };
    }),
  }),
  { virtual: true },
);

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

    // HTML 识别
    rerender(<CodeMirrorWrapper lang={LangId.HTML} />);
    expect(editor.dataset.language).toBe('html');
  });
  test('lsp server url test', () => {
    const lspServerUrl = {
      cpp: 'ws://localhost:3000',
      py: 'ws://localhost:3001',
    } as const;

    // 测试C++的LSP服务器配置
    const { unmount: unmountCpp } = render(
      <CodeMirrorWrapper
        lspServerUrl={lspServerUrl}
        lang={LangId.CPP11}
        lspConfig={{ token: '123123' }}
      />,
    );
    unmountCpp(); // 立即卸载以避免连接保持打开状态

    // 测试Python的LSP服务器配置
    const { unmount: unmountPy } = render(
      <CodeMirrorWrapper
        lang={LangId.PY3}
        lspServerUrl={lspServerUrl}
        lspConfig={{ token: '123' }}
      />,
    );
    unmountPy(); // 立即卸载以避免连接保持打开状态

    // 测试URL中已包含问号的情况 - C++
    const lspServerUrlWithQueryCpp = {
      cpp: 'ws://localhost:3000?debug=true',
      py: 'ws://localhost:3001',
    } as const;

    const { unmount: unmountCppWithQuery } = render(
      <CodeMirrorWrapper
        lspServerUrl={lspServerUrlWithQueryCpp}
        lang={LangId.CPP11}
        lspConfig={{ token: '123123' }}
      />,
    );
    unmountCppWithQuery();

    // 测试URL中已包含问号的情况 - Python
    const lspServerUrlWithQueryPy = {
      cpp: 'ws://localhost:3000',
      py: 'ws://localhost:3001?debug=true',
    } as const;

    const { unmount: unmountPyWithQuery } = render(
      <CodeMirrorWrapper
        lang={LangId.PY3}
        lspServerUrl={lspServerUrlWithQueryPy}
        lspConfig={{ token: '123' }}
      />,
    );
    unmountPyWithQuery();

    // 测试不提供token的情况 - C++
    const { unmount: unmountCppNoToken } = render(
      <CodeMirrorWrapper
        lspServerUrl={lspServerUrl}
        lang={LangId.CPP11}
        lspConfig={{ rootUri: 'file:///test' }}
      />,
    );
    unmountCppNoToken();

    // 测试不提供token的情况 - Python
    const { unmount: unmountPyNoToken } = render(
      <CodeMirrorWrapper
        lang={LangId.PY3}
        lspServerUrl={lspServerUrl}
        lspConfig={{ rootUri: 'file:///test' }}
      />,
    );
    unmountPyNoToken();

    // 这里我们分别渲染并测试，以确保每个组件都能正确处理
    const { unmount: unmountFinal } = render(<CodeMirrorWrapper />);
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    unmountFinal();
  });

  test('editorConfig lineWrapping test', () => {
    // 测试不传 editorConfig 的情况（默认行为）
    const { rerender } = render(<CodeMirrorWrapper value="test code" />);
    let editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();

    // 测试传入 editorConfig 但 lineWrapping 为 false
    rerender(
      <CodeMirrorWrapper
        value="test code"
        editorConfig={{ lineWrapping: false }}
      />,
    );
    editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();

    // 测试传入 editorConfig 且 lineWrapping 为 true
    rerender(
      <CodeMirrorWrapper
        value="This is a very long line that should wrap when lineWrapping is enabled"
        editorConfig={{ lineWrapping: true }}
      />,
    );
    editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();

    // 验证内容是否正确渲染
    expect(editor.textContent).toContain(
      'This is a very long line that should wrap when lineWrapping is enabled',
    );

    // 测试从 lineWrapping: true 切换回 lineWrapping: false
    rerender(
      <CodeMirrorWrapper
        value="test code after toggle"
        editorConfig={{ lineWrapping: false }}
      />,
    );
    editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    expect(editor.textContent).toContain('test code after toggle');

    // 测试传入空的 editorConfig 对象
    rerender(<CodeMirrorWrapper value="test" editorConfig={{}} />);
    editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
  });
});
