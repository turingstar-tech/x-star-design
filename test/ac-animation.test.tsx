import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { fireEvent, render } from '@testing-library/react';
import 'jest-canvas-mock'; // 导入jest-canvas-mock库
import React from 'react';
import AcAnimation from '../src/ac-animation';

jest.useFakeTimers();

describe('ac animation', () => {
  test('renders the title and image', () => {
    const testTitle = 'Test Title';
    const testImage = 'test-image.png';
    const onFinish = jest.fn();
    const { container } = render(
      <AcAnimation
        title={testTitle}
        titleStyle={{
          fontSize: 45,
          color: '#FFAD10',
          offsetY: -200,
          offsetX: 100,
        }}
        imgUrl={testImage}
        imgSizeAndPosition={{ scale: 2, offsetY: 200, offsetX: 200 }}
        onFinish={onFinish}
      />,
    );

    // 获取canvas元素和上下文
    const canvas = container.querySelector('canvas')!;
    const ctx = canvas.getContext('2d')!;

    // 绘制title
    expect(ctx.fillText).toHaveBeenCalledWith(
      testTitle,
      canvas.width / 2 + 100,
      canvas.height / 2 - 200,
    );

    // 绘制image
    const image = new Image();
    image.src = testImage;
    expect(ctx.drawImage).toHaveBeenCalledWith(image, 200, 200, 0, 0);

    const setFont = jest.spyOn(ctx, 'font', 'set');
    const setFillStyle = jest.spyOn(ctx, 'fillStyle', 'set');

    // 渲染至结束
    jest.runAllTimers();
    expect(setFont).toHaveBeenCalledWith('bold 45px Arial');
    expect(setFillStyle).toHaveBeenCalledWith('#FFAD10');
    expect(onFinish).toHaveBeenCalled();
  });

  test('calls onFinish when the canvas is clicked', () => {
    const onFinish = jest.fn();
    const { getByTestId } = render(
      <AcAnimation
        title="Test Title"
        imgUrl="test-image.png"
        imgSizeAndPosition={{}}
        onFinish={onFinish}
      />,
    );

    // 模拟动画关闭事件
    fireEvent.click(getByTestId('ac-canvas'));
    expect(onFinish).toHaveBeenCalled();
  });

  test('calls resizeCanvas on resize event', () => {
    const { container } = render(<AcAnimation />);
    const canvas = container.querySelector('canvas')!;
    window.innerWidth = 4096;
    window.innerHeight = 4096;
    // 触发resize事件
    window.dispatchEvent(new Event('resize'));
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  });
});
