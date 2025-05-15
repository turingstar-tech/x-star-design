import { describe, expect, jest, test } from '@jest/globals';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import ConfigTemplate from '../src/config-template';
import { CONTEST_TEMPLATES, ContestType } from '../src/config-template/define';
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
describe('ConfigTemplate', () => {
  test('show all templates cards correctly', () => {
    const { getAllByText, getByText } = render(<ConfigTemplate />);

    // 验证是否包含所有类型的卡片
    expect(getAllByText('OI').length).toBeGreaterThan(0);
    expect(getAllByText('XCPC').length).toBeGreaterThan(0);
    expect(getAllByText('IOI').length).toBeGreaterThan(0);
    expect(getByText('Homework Mode 1')).toBeInTheDocument();
    expect(getByText('Homework Mode 2')).toBeInTheDocument();
  });

  test('confirm template selection should call onSelect callback', async () => {
    const onSelectMock = jest.fn();
    const { getAllByTestId, getByText } = render(
      <ConfigTemplate onSelect={onSelectMock} />,
    );

    // 1. 先点击卡片来显示Popconfirm
    const cards = getAllByTestId('templateCard');
    act(() => {
      fireEvent.click(cards[0]); // 点击第一个卡片(OI)
    });

    // 2. 然后找到并点击Popconfirm中的确认按钮
    const okButton = getByText(
      'Current operation will cover the original configuration, are you sure?',
    )
      .closest('.ant-popconfirm')
      ?.querySelector('.ant-btn-primary') as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(okButton);
      // 给异步操作一些时间完成
      await waitFor(() => expect(onSelectMock).toHaveBeenCalled());
    });

    // 验证onSelect被调用，并且传入了正确的参数
    expect(onSelectMock).toHaveBeenCalledWith(
      CONTEST_TEMPLATES.OI,
      'OI' as ContestType,
    );
  });
});
