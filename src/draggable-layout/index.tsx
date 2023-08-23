import { useMemoizedFn, useMouse, useSize } from 'ahooks';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useDelayedMount } from 'x-star-utils';
import { prefix } from '../utils/global';
interface DraggableLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  dividerClassName?: string;
  minWidth: [number, number];
  defaultWidth: number;
  left: React.ReactNode;
  right: React.ReactNode;
  barWidth: number;
}

/**
 * 可拖拽布局
 */
const DraggableLayout: React.FC<DraggableLayoutProps> = ({
  className = '',
  style,
  dividerClassName,
  minWidth,
  defaultWidth,
  left,
  right,
  barWidth,
}) => {
  const [width, setWidth] = useState(300);
  const [dragging, setDragging] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const { elementX } = useMouse(wrapper);
  const size = useSize(wrapper);

  useEffect(() => {
    if (size) {
      setWidth((defaultWidth / 100) * size.width);
    }
  }, [defaultWidth, size]);

  useEffect(() => {
    if (dragging && size) {
      if (elementX < ((minWidth[0] / 100) * size.width) / 2) {
        setWidth(0);
      } else if (elementX < (minWidth[0] / 100) * size.width) {
        setWidth((minWidth[0] / 100) * size.width);
      } else if (elementX < size.width - (minWidth[1] / 100) * size.width) {
        setWidth(elementX);
      } else if (
        elementX <
        size.width - ((minWidth[1] / 100) * size.width) / 2
      ) {
        setWidth(size.width - (minWidth[1] / 100) * size.width);
      } else {
        setWidth(size.width);
      }
    }
  }, [dragging, size, elementX, minWidth]);
  const dragEnd = useMemoizedFn(() => {
    setDragging(false);
    if (wrapper.current) {
      wrapper.current.style.cursor = 'unset';
      wrapper.current.removeEventListener('mouseup', dragEnd);
    }
  });
  const dragStart = useMemoizedFn(() => {
    setDragging(true);
    if (wrapper.current) {
      wrapper.current.style.cursor = 'col-resize';
      wrapper.current.addEventListener('mouseup', dragEnd);
    }
  });

  const leftHide = width === 0;
  const rightHide = width === size?.width;
  const [transition] = useDelayedMount(leftHide || rightHide, 300);

  return (
    <div
      ref={wrapper}
      className={classNames(`${prefix}layout`, className)}
      style={style}
    >
      {size && (
        <>
          <div
            className={
              dividerClassName ||
              classNames(
                `${prefix}divider`,
                `${leftHide || rightHide ? `${prefix}dividerActive` : ''}`,
              )
            }
            style={{
              left: leftHide
                ? width
                : rightHide
                ? width - barWidth
                : width - barWidth / 2,
              transition: transition
                ? 'all 0.3s'
                : 'color 0.3s, background-color 0.3s',
            }}
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={dragStart}
          >
            ⋮
          </div>
          {dragging && <div className={`${prefix}mask`} />}
          <div
            className={`${prefix}children`}
            style={{
              right: rightHide
                ? barWidth
                : `calc(100% - ${width - barWidth / 2}px)`,
              left: leftHide ? `calc(-${minWidth[0]} / 100 * 100%)` : 0,
              transition: transition ? 'all 0.3s' : '',
            }}
          >
            {left}
          </div>
          <div
            className={`${prefix}children`}
            style={{
              left: leftHide ? barWidth : width + barWidth / 2,
              right: rightHide ? `calc(-${minWidth[1]} / 100 * 100%)` : 0,
              transition: transition ? 'all 0.3s' : '',
            }}
          >
            {right}
          </div>
        </>
      )}
    </div>
  );
};

export default DraggableLayout;
