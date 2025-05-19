import { CompletionContext, autocompletion } from '@codemirror/autocomplete';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { syntaxTree } from '@codemirror/language';
import { Diagnostic, linter } from '@codemirror/lint';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { languageServer } from '@marimo-team/codemirror-languageserver';
import CodeMirror from '@uiw/react-codemirror';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { prefix } from '../utils/global';
import {
  LangId,
  Language,
  Theme,
  langCompleteOptionsMap,
  themeMap,
} from './define';
export interface CodeMirrorWrapperProps {
  className?: string;
  value?: string;
  /**
   * @default Theme.LIGHT
   */
  theme?: Theme;
  /**
   * @description   
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
  @default LangId.CPP
   */
  lang?: LangId;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  [key: string]: unknown;
  tabSize?: number;
  lspServerUrl?: {
    cpp?: `ws://${string}` | `wss://${string}`;
    py?: `ws://${string}` | `wss://${string}`;
  };
  lspConfig?: {
    rootUri?: string;
    workspaceFolders?: { name: string; uri: string }[];
    documentUri?: string;
  };
}

const CodeMirrorWrapper = ({
  className,
  value,
  theme = Theme.LIGHT,
  onChange,
  lang = LangId.CPP,
  readOnly = false,
  tabSize = 2,
  lspServerUrl,
  lspConfig,
  ...props
}: CodeMirrorWrapperProps) => {
  // 添加全局样式来隐藏文档提示气泡
  const hideTooltip = EditorView.baseTheme({
    '.cm-tooltip-autocomplete': {
      '& .cm-completionInfo': {
        display: 'none !important',
      },
    },
  });
  const langCompletions = (context: CompletionContext, lang: Language) => {
    const options = [...langCompleteOptionsMap[lang]];
    syntaxTree(context.state)
      .cursor()
      .iterate((node) => {
        if (node.name === 'Identifier') {
          options.push({
            label: context.state.doc.sliceString(node.from, node.to),
            type: 'variable',
          });
        }
      });
    const word = context.matchBefore(/\w*/);
    if (word?.from === word?.to && !context.explicit) return null;
    return {
      from: word?.from || 0,
      options,
    };
  };
  const regexpLinter = useCallback(
    () =>
      linter((view) => {
        const diagnostics: Diagnostic[] = [];
        syntaxTree(view.state)
          .cursor()
          .iterate((node) => {
            if (node.type.isError) {
              diagnostics.push({
                from: node.from,
                to: node.to,
                severity: 'warning',
                message: 'syntax error',
              });
            }
          });
        return diagnostics;
      }),
    [],
  );

  const langConfigMap = useMemo(() => {
    let extensions: Extension[] = [];
    switch (lang) {
      case LangId.CPP:
      case LangId.CPP11:
      case LangId.CPP14:
      case LangId.CPP17:
      case LangId.GCC:
      case LangId.FPC:
        extensions = [cpp()];
        if (lspServerUrl?.cpp) {
          extensions.push(
            languageServer({
              serverUri: lspServerUrl.cpp,
              rootUri: lspConfig?.rootUri || 'file:///virtual',
              workspaceFolders: lspConfig?.workspaceFolders || [
                { name: 'editor', uri: 'file:///virtual' },
              ],
              documentUri:
                lspConfig?.documentUri || 'file:///virtual/document.cpp',
              languageId: 'cpp',
              allowHTMLContent: true,
              hoverEnabled: false,
            }),
          );
        } else {
          extensions.push(
            autocompletion({
              override: [(context) => langCompletions(context, Language.CPP)],
            }),
            regexpLinter(),
          );
        }
        return extensions;
      case LangId.PY2:
      case LangId.PY3:
        extensions = [python()];
        if (lspServerUrl?.py) {
          extensions.push(
            languageServer({
              serverUri: lspServerUrl.py,
              rootUri: lspConfig?.rootUri || 'file:///virtual',
              workspaceFolders: lspConfig?.workspaceFolders || [
                { name: 'editor', uri: 'file:///virtual' },
              ],
              documentUri:
                lspConfig?.documentUri || 'file:///virtual/document.py',
              languageId: 'python',
              allowHTMLContent: true,
              hoverEnabled: false,
            }),
          );
        } else {
          extensions.push(
            autocompletion({
              override: [
                (context) => langCompletions(context, Language.PYTHON),
              ],
            }),
          );
        }
        return extensions;
      case LangId.JAVA:
        return [
          java(),
          autocompletion({
            override: [(context) => langCompletions(context, Language.JAVA)],
          }),
          regexpLinter(),
        ];
      default:
        return [];
    }
  }, [lang, lspServerUrl, lspConfig]);

  return (
    <CodeMirror
      className={classNames(className, `${prefix}-codeMirror`)}
      value={value}
      extensions={[hideTooltip, ...langConfigMap]}
      onChange={onChange}
      theme={themeMap[theme]}
      readOnly={readOnly}
      basicSetup={{
        tabSize,
        indentOnInput: false,
      }}
      {...props}
    />
  );
};

export default CodeMirrorWrapper;
