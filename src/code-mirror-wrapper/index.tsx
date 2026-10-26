import { CompletionContext, autocompletion } from '@codemirror/autocomplete';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { indentUnit, syntaxTree } from '@codemirror/language';
import { Diagnostic, linter } from '@codemirror/lint';
import {
  EditorSelection,
  Extension,
  Prec,
  StateCommand,
} from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
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
  HTML = 'html',
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
    token?: string;
  };
  editorConfig?: {
    lineWrapping?: boolean;
  };
}

export const insertNewlineByBrace: StateCommand = ({ state, dispatch }) => {
  const transaction = state.changeByRange((range) => {
    const line = state.doc.lineAt(range.from);
    const currentIndent = line.text.match(/^\s*/)?.[0] ?? '';
    const beforeCursor = state.doc.sliceString(line.from, range.from);
    const afterCursor = state.doc.sliceString(range.to, line.to);
    const afterOpeningBrace = beforeCursor.trimEnd().endsWith('{');
    const beforeClosingBrace =
      afterOpeningBrace && afterCursor.trimStart().startsWith('}');
    const nextIndent = afterOpeningBrace
      ? currentIndent + state.facet(indentUnit)
      : currentIndent;
    const insert = beforeClosingBrace
      ? `\n${nextIndent}\n${currentIndent}`
      : `\n${nextIndent}`;

    return {
      changes: {
        from: range.from,
        insert,
        to: range.to,
      },
      range: EditorSelection.cursor(range.from + nextIndent.length + 1),
    };
  });

  dispatch(
    state.update(transaction, {
      scrollIntoView: true,
      userEvent: 'input',
    }),
  );
  return true;
};

const braceNewlineKeymap = Prec.high(
  keymap.of([{ key: 'Enter', run: insertNewlineByBrace }]),
);

const CodeMirrorWrapper = ({
  className,
  value,
  theme = Theme.LIGHT,
  onChange,
  editorConfig,
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
    // 确保不影响其他类型的提示，如错误提示
    '.cm-tooltip-lint': {
      display: 'block',
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
        if (lang !== LangId.FPC) {
          extensions.push(braceNewlineKeymap);
        }
        if (lspServerUrl?.cpp) {
          const serverUrl = lspConfig?.token
            ? `${lspServerUrl.cpp}${
                lspServerUrl.cpp.includes('?') ? '&' : '?'
              }token=${lspConfig.token}`
            : lspServerUrl.cpp;
          extensions.push(
            languageServer({
              serverUri: serverUrl as `ws://${string}` | `wss://${string}`,
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
          const serverUrl = lspConfig?.token
            ? `${lspServerUrl.py}${
                lspServerUrl.py.includes('?') ? '&' : '?'
              }token=${lspConfig.token}`
            : lspServerUrl.py;
          extensions.push(
            languageServer({
              serverUri: serverUrl as `ws://${string}` | `wss://${string}`,
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
            regexpLinter(),
          );
        }
        return extensions;
      case LangId.JAVA:
        return [
          java(),
          braceNewlineKeymap,
          autocompletion({
            override: [(context) => langCompletions(context, Language.JAVA)],
          }),
          regexpLinter(),
        ];
      case LangId.HTML:
        return [html(), regexpLinter()];
      default:
        return [];
    }
  }, [lang]);

  const propsExtensions = useMemo(() => {
    const extensions: Extension[] = [];
    if (editorConfig?.lineWrapping) {
      extensions.push(EditorView.lineWrapping);
    }
    return extensions;
  }, [editorConfig]);

  return (
    <CodeMirror
      className={classNames(className, `${prefix}-codeMirror`)}
      value={value}
      extensions={[hideTooltip, ...langConfigMap, ...propsExtensions]}
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
