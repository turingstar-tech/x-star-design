import classNames from 'classnames';
import React from 'react';
import { prefix } from '../utils/global';

export interface TagProps {
  children: React.ReactNode;
}

const Tag = ({ children }: TagProps) => (
  <h4 className={classNames(`${prefix}tag`)}>{children}</h4>
);

export default Tag;
