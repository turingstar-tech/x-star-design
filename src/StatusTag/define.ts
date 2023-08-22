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
  shape: StatusTagShape;
  status: StatusTagType;
  children?: React.ReactNode;
  required?: boolean;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
