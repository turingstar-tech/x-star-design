import { CompletionContext, snippetCompletion } from '@codemirror/autocomplete';
import { syntaxTree } from '@codemirror/language';
import { Language, langCompleteOptionsMap } from './define';

//自动提示增加自定义变量提示
export const langCompletions = (context: CompletionContext, lang: Language) => {
  // 匹配当前输入前面的所有非空字符
  const word = context.matchBefore(/\S*/);

  const hintPaths = [...langCompleteOptionsMap[lang]];

  syntaxTree(context.state)
    .cursor()
    .iterate((node) => {
      if (node.name === 'Identifier') {
        hintPaths.push({
          label: context.state.doc.sliceString(node.from, node.to),
          type: 'variable',
        });
      }
    });

  // 判断如果为空，则返回null
  if (!word || (word.from === word.to && !context.explicit)) return null;

  // 获取最后一个字符
  const latestChar = word.text[word.text.length - 1];

  // 获取当前输入行所有文本
  const curLineText = context.state.doc.lineAt(context.pos).text;

  let path: string = '';

  // 从当前字符往前遍历，直到遇到空格或前面没有字符了，把遍历的字符串存起来
  for (let i = word.to; i >= 0; i -= 1) {
    if (i === 0) {
      path = curLineText.slice(i, word.to);
      break;
    }
    if (curLineText[i] === ' ') {
      // 这里加1，是为了把前面的空格去掉
      path = curLineText.slice(i + 1, word.to);
      break;
    }
  }

  if (!path) return null;

  if (!path.includes('.') && latestChar !== '.') {
    return {
      from: word.from,
      options:
        hintPaths?.map?.((item: any) =>
          snippetCompletion(`${item.label}`, {
            label: `${item.label}`,
            detail: item.detail,
            type: item.type,
          }),
        ) || [],
    };
  } else if (path.includes('.') && latestChar !== '.') {
    const paths = path.split('.').filter((o) => o);
    const cur = paths.pop() || '';

    let temp: any = hintPaths;
    paths.forEach((p) => {
      temp = temp.find((o: any) => o.label === p)?.children || [];
    });

    return {
      from: word.to - cur.length,
      to: word.to,
      options:
        temp?.map?.((item: any) =>
          snippetCompletion(`${item.label}`, {
            label: `${item.label}`,
            detail: item.detail,
            type: item.type,
          }),
        ) || [],
    };
  } else if (latestChar === '.') {
    const paths = path.split('.').filter((o) => o);
    if (!paths.length) return null;

    let temp: any = hintPaths;
    paths.forEach((p) => {
      temp = temp.find((o: any) => o.label === p)?.children || [];
    });

    return {
      from: word.to - 1,
      to: word.to,
      options:
        temp?.map?.((item: any) =>
          snippetCompletion(`.${item.label}`, {
            label: `.${item.label}`,
            detail: item.detail,
            type: item.type,
          }),
        ) || [],
    };
  }
  return null;
};
