import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { prefix } from '../utils/global';

interface DraggableLayoutProps {
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
const DraggableLayout: React.FC<DraggableLayoutProps> = ({
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
}) => {
  const [dragging, setDragging] = useState(false);

  const transition = useRef(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const enableTransition = useMemoizedFn(() => {
    if (dividerRef.current && leftRef.current && rightRef.current) {
      dividerRef.current.style.transition =
        'color 0.3s, background 0.3s, border 0.3s, left 0.3s';
      leftRef.current.style.transition = 'left 0.3s, right 0.3s';
      rightRef.current.style.transition = 'left 0.3s, right 0.3s';
    }
  });

  const disableTransition = useMemoizedFn(() => {
    if (dividerRef.current && leftRef.current && rightRef.current) {
      dividerRef.current.style.transition =
        'color 0.3s, background 0.3s, border 0.3s';
      leftRef.current.style.transition = '';
      rightRef.current.style.transition = '';
    }
  });

  const dragHandler = useMemoizedFn((e: MouseEvent) => {
    if (
      !transition.current &&
      wrapperRef.current &&
      dividerRef.current &&
      leftRef.current &&
      rightRef.current
    ) {
      const offsetX =
        e.clientX - wrapperRef.current.getBoundingClientRect().left;
      if (collapsible[0] && offsetX < leftRef.current.offsetWidth / 2) {
        if (leftRef.current.style.right !== '100%') {
          // 左侧收起
          enableTransition();
          transition.current = true;
          setTimeout(() => (transition.current = false), 300);
          dividerRef.current.classList.add(`${prefix}draggable-divider-active`);
          dividerRef.current.style.left = '0';
          leftRef.current.style.left = `-${minWidth[0]}`;
          leftRef.current.style.right = '100%';
          rightRef.current.style.left = dividerWidth;
          rightRef.current.style.right = '0';
        }
      } else if (
        collapsible[1] &&
        offsetX >
          wrapperRef.current.offsetWidth - rightRef.current.offsetWidth / 2
      ) {
        if (rightRef.current.style.left !== '100%') {
          // 右侧收起
          enableTransition();
          transition.current = true;
          setTimeout(() => (transition.current = false), 300);
          dividerRef.current.classList.add(`${prefix}draggable-divider-active`);
          dividerRef.current.style.left = `calc(100% - ${dividerWidth})`;
          leftRef.current.style.left = '0';
          leftRef.current.style.right = dividerWidth;
          rightRef.current.style.left = '100%';
          rightRef.current.style.right = `-${minWidth[1]}`;
        }
      } else {
        // 同时展示
        if (
          leftRef.current.style.right === '100%' ||
          rightRef.current.style.left === '100%'
        ) {
          transition.current = true;
          setTimeout(() => {
            transition.current = false;
            disableTransition();
          }, 300);
        }
        const width = `min(max(${offsetX}px, calc(${minWidth[0]} + ${dividerWidth} / 2)), calc(100% - ${minWidth[1]} - ${dividerWidth} / 2))`;
        dividerRef.current.classList.remove(
          `${prefix}draggable-divider-active`,
        );
        dividerRef.current.style.left = `calc(${width} - ${dividerWidth} / 2)`;
        leftRef.current.style.left = '0';
        leftRef.current.style.right = `calc(100% - ${width} + ${dividerWidth} / 2)`;
        rightRef.current.style.left = `calc(${width} + ${dividerWidth} / 2)`;
        rightRef.current.style.right = '0';
      }
    }
  });

  const dragStart = useMemoizedFn(() => {
    setDragging(true);
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = 'col-resize';
      wrapperRef.current.addEventListener('mousemove', dragHandler, {
        capture: true,
      });
      document.addEventListener(
        'mouseup',
        () => {
          setDragging(false);
          if (wrapperRef.current) {
            wrapperRef.current.style.cursor = 'unset';
            wrapperRef.current.removeEventListener('mousemove', dragHandler, {
              capture: true,
            });
          }
        },
        { capture: true, once: true },
      );
    }
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames(`${prefix}draggable-layout`, className)}
      style={style}
    >
      <div
        ref={dividerRef}
        className={dividerClassName ?? classNames(`${prefix}draggable-divider`)}
        style={{ left: `calc(${defaultWidth} - ${dividerWidth} / 2)` }}
        onMouseDown={dragStart}
      >
        {dividerChildren}
      </div>
      {dragging && <div className={`${prefix}draggable-mask`} />}
      <div
        ref={leftRef}
        className={`${prefix}draggable-children`}
        style={{
          left: 0,
          right: `calc(100% - ${defaultWidth} + ${dividerWidth} / 2)`,
        }}
      >
        {left}
      </div>
      <div
        ref={rightRef}
        className={`${prefix}draggable-children`}
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
