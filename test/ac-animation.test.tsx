import { describe, expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { fireEvent, render } from '@testing-library/react';
import 'jest-canvas-mock'; // 导入jest-canvas-mock库
import React from 'react';
import { AcAnimation } from '../src';
describe('ac animation', () => {
  test('renders the title and image', () => {
    jest.useFakeTimers();
    const testTitle = 'Test Title';
    const testImage = 'test-image.png';
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
      />,
    );

    // 获取canvas元素和上下文
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
    jest.runAllTimers();
    //绘制title
    expect(ctx?.fillText).toBeCalledWith(
      testTitle,
      canvas.width / 2 + 100,
      canvas.height / 2 - 200,
    );
    // const mockFontSet = jest.spyOn(ctx, 'font', 'set').mockImplementation((arg) => arg);
    // expect(mockFontSet).toBeCalledWith(`bold 45px Arial`);
    // expect(ctx?.fillStyle).toBe('#FFAD10');

    expect(ctx?.fillText).toHaveBeenCalled();

    //绘制image
    const image = new Image();
    image.src = testImage;
    expect(ctx?.drawImage).toBeCalledWith(image, 200, 200, 0, 0);
    expect(ctx?.drawImage).toHaveBeenCalled();
  });

  test('calls onFinish when the canvas is clicked', () => {
    const onFinish = jest.fn();
    const { getByTestId } = render(
      <AcAnimation title="Test Title" onFinish={onFinish} />,
    );
    //模拟动画关闭事件
    fireEvent.click(getByTestId('ac-canvas'));
    expect(onFinish).toHaveBeenCalled();
  });

  test('calls resizeCanvas on resize event', () => {
    const { container } = render(<AcAnimation />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    // 触发resize事件
    window.dispatchEvent(new Event('resize'));
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  });
});
