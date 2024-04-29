import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CodeDetailModal from '../src/code-detail-modal';
import { LangId } from '../src/code-mirror-wrapper/define';

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
}) as typeof window.matchMedia;

describe('code detail modal', () => {
  test('renders code detail correctly', () => {
    const codeData = {
      problemNameZh: '打印直角三角形',
      problemNameEn: 'Print right triangles',
      detail: 'compiled successfully',
      language: LangId.PY3,
      status: 'Accepted',
      source: 'code source',
      score: 100,
      memory: 8536,
      submissionTime: 1696733459,
    };

    render(<CodeDetailModal codeData={codeData} open onCancel={() => {}} />);

    // 检查标题是否正确渲染
    expect(screen.getByText('Code Detail')).toBeInTheDocument();

    // 检查问题名称是否正确渲染
    expect(screen.getByText('Print right triangles')).toBeInTheDocument();

    // 检查语言
    expect(screen.getByText('Python3.8')).toBeInTheDocument();

    // 检查状态
    expect(screen.getByText('Accepted')).toBeInTheDocument();

    // 检查分数
    expect(screen.getByText('100')).toBeInTheDocument();

    // 检查内存
    expect(screen.getByText('8536KB')).toBeInTheDocument();

    // 检查时间
    expect(screen.getByText('Oct 08, 2023, 10:50:59 AM')).toBeInTheDocument();
    expect(screen.getByText('UTC+8')).toBeInTheDocument();

    // 检查编译结果
    expect(screen.getByText('compiled successfully')).toBeInTheDocument();

    // 模拟点击按钮来显示代码
    fireEvent.click(screen.getByText('Hide'));

    // 检查代码是否正确渲染
    expect(screen.getByText('code source')).toBeInTheDocument();

    // 模拟点击按钮来隐藏代码
    fireEvent.click(screen.getByText('Show'));

    // 检查隐藏后的内容是否正确渲染
    expect(screen.getByText('compiled successfully')).toBeInTheDocument();
  });

  test('renders code detail with plain', async () => {
    const codeData = {
      problemNameZh: '打印直角三角形',
      problemNameEn: 'Print right triangles',
      detail: 'compiled successfully',
      language: LangId.PLAIN,
      status: 'Accepted',
      source: 'https://xinyoudui.com',
      score: 100,
      memory: 8536,
      submissionTime: 1696733459,
    };

    const { rerender } = render(
      <CodeDetailModal codeData={codeData} open onCancel={() => {}} />,
    );

    // 检查标题是否正确渲染
    expect(screen.getByText('Code Detail')).toBeInTheDocument();

    // 检查问题名称是否正确渲染
    expect(screen.getByText('Print right triangles')).toBeInTheDocument();

    // 检查语言
    expect(screen.getByText('plain')).toBeInTheDocument();

    // 检查状态
    expect(screen.getByText('Accepted')).toBeInTheDocument();

    // 检查分数
    expect(screen.getByText('100')).toBeInTheDocument();

    // 检查内存
    expect(screen.getByText('8536KB')).toBeInTheDocument();

    // 检查时间
    expect(screen.getByText('Oct 08, 2023, 10:50:59 AM')).toBeInTheDocument();
    expect(screen.getByText('UTC+8')).toBeInTheDocument();

    // 检查编译结果
    expect(screen.getByText('compiled successfully')).toBeInTheDocument();

    // 测试下载
    const button = screen.getByTestId('downloadBtn');
    expect(button).toHaveAttribute('href', codeData.source);

    // 模拟关闭模态框
    rerender(
      <CodeDetailModal codeData={codeData} open={false} onCancel={() => {}} />,
    );

    expect(document.querySelector('.x-star-design-modal-wrap')).toHaveStyle({
      display: 'none',
    });
  });

  test('renders code detail with zh and extremely situation', () => {
    document.cookie = 'lang=zh';

    const codeData = {
      problemNameZh: '打印直角三角形',
      problemNameEn: 'Print right triangles',
      detail: 'compiled successfully',
      language: LangId.PY3,
      status: 'Accepted',
      source: 'code source',
      score: 0,
      memory: 8536,
      submissionTime: 0,
    };

    render(<CodeDetailModal codeData={codeData} open onCancel={() => {}} />);

    // 测试中文环境
    expect(screen.getByText('代码详情')).toBeInTheDocument();

    // 测试分数和时间
    expect(screen.getAllByRole('cell')[3]).toHaveTextContent('-');
    expect(screen.getAllByRole('cell')[6]).toHaveTextContent('-');
  });
});
