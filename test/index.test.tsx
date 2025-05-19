import { jest, test } from '@jest/globals';
// 统计覆盖率时导入所有组件
import {} from '../src';
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
test('index', () => {});
