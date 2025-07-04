# CodeMirrorWrapper

这是代码编辑器 CodeMirror 的封装

```jsx
import { Select } from 'antd';
import { useState } from 'react';
import { CodeMirrorWrapper, LangId, Theme } from 'x-star-design';
enum LangId {
  CPP = 'g++',
  CPP11 = 'g++11',
  CPP14 = 'g++14',
  CPP17 = 'g++17',
  GCC = 'gcc',
  FPC = 'fpc',
  PY2 = 'python2.7',
  PY3 = 'python3.8',
  JAVA = 'java8',
  PLAIN = 'plain',
  HTML = 'html'
}
export default () => {
  const [submitLang, setSubmitLang] = useState(LangId.CPP14);
  return (
    <>
      <Select
        value={submitLang}
        onChange={(value) => {
          setSubmitLang?.(value);
        }}
        options={[
          {
            value: LangId.PY3,
            label: 'Python3.8',
          },
          {
            value: LangId.CPP14,
            label: 'C++14',
          },
          {
            value: LangId.HTML,
            label: 'HTML',
          },
        ]}
      />
      <CodeMirrorWrapper
        lang={submitLang}
        theme={Theme.VSCODE}
        style={{ height: 500 }}
        lspServerUrl={{
          cpp:'wss://lsp.test.turingstar.com.cn/clangd',
          py:'wss://lsp.test.turingstar.com.cn/pyright'
        }}
        lspConfig={{
          token:'VCUo6QvgupKatCSGH9mRtcfFceilTgO8-95741'
        }}
      />
    </>
  );
};
```

## API

<API id="CodeMirrorWrapper"></API>
