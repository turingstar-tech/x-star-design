import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { prefix } from '../utils/global';

export interface DraggableLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  dividerClassName?: string;
  dividerWidth?: string;
  dividerChildren?: React.ReactNode;
  defaultWidth?: string;
  minWidth?: [string, string];
  collapsible?: [boolean, boolean];
  left: React.ReactNode;
  right: React.ReactNode;
}

/**
 * 可拖拽布局
 */
const DraggableLayout = ({
  className,
  style,
  dividerClassName,
  dividerWidth = '0%',
  dividerChildren,
  defaultWidth = '50%',
  minWidth = ['25%', '25%'],
  collapsible = [true, true],
  left,
  right,
}: DraggableLayoutProps) => {
  const [dragging, setDragging] = useState(false);

  const transition = useRef(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const enableTransition = useMemoizedFn(() => {
    dividerRef.current!.style.transition =
      'color 0.3s, background 0.3s, border 0.3s, left 0.3s';
    leftRef.current!.style.transition = 'left 0.3s, right 0.3s';
    rightRef.current!.style.transition = 'left 0.3s, right 0.3s';
  });

  const disableTransition = useMemoizedFn(() => {
    dividerRef.current!.style.transition =
      'color 0.3s, background 0.3s, border 0.3s';
    leftRef.current!.style.transition = '';
    rightRef.current!.style.transition = '';
  });

  const dragHandler = useMemoizedFn((e: MouseEvent) => {
    if (transition.current) {
      return;
    }

    const wrapper = wrapperRef.current!;
    const divider = dividerRef.current!;
    const left = leftRef.current!;
    const right = rightRef.current!;

    const offsetX = e.clientX - wrapper.getBoundingClientRect().left;

    if (collapsible[0] && offsetX < left.offsetWidth / 2) {
      if (left.style.right !== '100%') {
        // 左侧收起
        enableTransition();
        transition.current = true;
        setTimeout(() => (transition.current = false), 300);
        divider.classList.add(`${prefix}-draggable-divider-active`);
        divider.style.left = '0';
        left.style.left = `-${minWidth[0]}`;
        left.style.right = '100%';
        right.style.left = dividerWidth;
        right.style.right = '0';
      }
    } else if (
      collapsible[1] &&
      offsetX > wrapper.offsetWidth - right.offsetWidth / 2
    ) {
      if (right.style.left !== '100%') {
        // 右侧收起
        enableTransition();
        transition.current = true;
        setTimeout(() => (transition.current = false), 300);
        divider.classList.add(`${prefix}-draggable-divider-active`);
        divider.style.left = `calc(100% - ${dividerWidth})`;
        left.style.left = '0';
        left.style.right = dividerWidth;
        right.style.left = '100%';
        right.style.right = `-${minWidth[1]}`;
      }
    } else {
      // 同时展示
      if (left.style.right === '100%' || right.style.left === '100%') {
        transition.current = true;
        setTimeout(() => {
          transition.current = false;
          disableTransition();
        }, 300);
      }
      const width = `min(max(${offsetX}px, calc(${minWidth[0]} + ${dividerWidth} / 2)), calc(100% - ${minWidth[1]} - ${dividerWidth} / 2))`;
      divider.classList.remove(`${prefix}-draggable-divider-active`);
      divider.style.left = `calc(${width} - ${dividerWidth} / 2)`;
      left.style.left = '0';
      left.style.right = `calc(100% - ${width} + ${dividerWidth} / 2)`;
      right.style.left = `calc(${width} + ${dividerWidth} / 2)`;
      right.style.right = '0';
    }
  });

  const dragStart = useMemoizedFn(() => {
    const wrapper = wrapperRef.current!;

    setDragging(true);
    wrapper.style.cursor = 'col-resize';
    wrapper.addEventListener('mousemove', dragHandler, { capture: true });
    document.addEventListener(
      'mouseup',
      () => {
        setDragging(false);
        wrapper.style.cursor = 'unset';
        wrapper.removeEventListener('mousemove', dragHandler, {
          capture: true,
        });
      },
      { capture: true, once: true },
    );
  });

  return (
    <div
      data-testid="wrapper"
      ref={wrapperRef}
      className={classNames(`${prefix}-draggable-layout`, className)}
      style={style}
    >
      <div
        data-testid="divider"
        ref={dividerRef}
        className={dividerClassName ?? `${prefix}-draggable-divider`}
        style={{ left: `calc(${defaultWidth} - ${dividerWidth} / 2)` }}
        onMouseDown={dragStart}
      >
        {dividerChildren}
      </div>
      {dragging && (
        <div data-testid="mask" className={`${prefix}-draggable-mask`} />
      )}
      <div
        data-testid="left"
        ref={leftRef}
        className={`${prefix}-draggable-children`}
        style={{
          left: 0,
          right: `calc(100% - ${defaultWidth} + ${dividerWidth} / 2)`,
        }}
      >
        {left}
      </div>
      <div
        data-testid="right"
        ref={rightRef}
        className={`${prefix}-draggable-children`}
        style={{
          left: `calc(${defaultWidth} + ${dividerWidth} / 2)`,
          right: 0,
        }}
      >
        {right}
      </div>
    </div>
  );
};

export default DraggableLayout;
