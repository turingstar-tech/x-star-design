import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import correctSVG from '../assets/status-tag/correct.svg';
import diamondSVG from '../assets/status-tag/diamond.svg';
import filledSVG from '../assets/status-tag/filled.svg';
import halfCorrectSVG from '../assets/status-tag/half-correct.svg';
import wrongSVG from '../assets/status-tag/wrong.svg';
import { prefix } from '../utils/global';
import { StatusTagProps, StatusTagStyle, StatusTagType } from './define';

const StatusTag = ({
  shape,
  status,
  hover,
  required,
  children,
  onClick,
  ...props
}: StatusTagProps) => {
  const timeoutRef = useRef(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  /**
   * 为了防止鼠标漂移状态依旧不变的问题
   */
  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowContent(true);
    }, 100);
  };
  const handleMouseLeave = () => {
    window.clearTimeout(timeoutRef.current);
    setShowContent(false);
  };
  //CSS对应表
  const statusCSSMap: Map<StatusTagType, StatusTagStyle> = new Map([
    [
      'filled',
      {
        color: '#1677ff',
        borderColor: '#91CAFF',
        backgroundColor: '#E6F4FF',
      },
    ],
    [
      'correct',
      {
        color: '#52c41a',
        borderColor: '#b7eb8f',
        backgroundColor: '#f6ffed',
        icon: <img src={correctSVG} alt="" data-testid={'status-icon'} />,
      },
    ],
    [
      'halfCorrect',
      {
        color: '#8585FE',
        borderColor: '#D6D6FF',
        backgroundColor: '#F7F7FF',
        icon: <img src={halfCorrectSVG} alt="" />,
      },
    ],
    [
      'wrong',
      {
        color: '#FF4D4F',
        borderColor: '#FFCCC7',
        backgroundColor: '#FFF2F0',
        icon: <img src={wrongSVG} alt="" />,
      },
    ],
    [
      'pending',
      {
        color: '#FC7D33',
        borderColor: '#FFC09B',
        backgroundColor: '#FFF2EA',
        icon: <img src={filledSVG} alt="" />,
      },
    ],
    [
      'deleted',
      {
        color: '#B7B7B7',
        borderColor: '#B7B7B7',
        backgroundColor: '#EFEFEF',
        textDecoration: 'line-through',
      },
    ],
  ]);
  return (
    <div
      data-testid={'status-tag'}
      className={classNames(`${prefix}-statusTag`, props.className)}
      style={{
        ...statusCSSMap.get(status),
        borderRadius: shape === 'circle' ? '50%' : '4px',
        ...props.style,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {statusCSSMap?.get(status)?.icon
        ? hover
          ? showContent
            ? children
            : statusCSSMap?.get(status)?.icon
          : statusCSSMap?.get(status)?.icon
        : children}
      {required && (
        <img
          data-testid={'required-icon'}
          src={diamondSVG}
          className={classNames(`${prefix}-required`, {
            [`${prefix}-circleRequired`]: shape === 'circle',
            [`${prefix}-rectRequired`]: shape !== 'circle',
          })}
        />
      )}
    </div>
  );
};

export default StatusTag;
