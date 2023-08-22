import React from 'react';

//题目类型即形状
export type StatusTagShape = 'circle' | 'rect';
//题目状态
export type StatusTagType =
  | 'unfilled'
  | 'filled'
  | 'correct'
  | 'wrong'
  | 'halfCorrect'
  | 'pending'
  | 'deleted';
export type StatusTagStyle = {
  color: string;
  borderColor: string;
  backgroundColor: string;
  icon?: React.ReactNode;
  textDecoration?: string;
};
export interface StatusTagProps {
  /**
   * @description 标签形状
   */
  shape: StatusTagShape;
  status: StatusTagType;
  children?: React.ReactNode;
  /**
   * @description 是否为必做题
   * @default false
   */
  required?: boolean;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
