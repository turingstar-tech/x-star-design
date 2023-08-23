import classNames from 'classnames';
import React from 'react';
import rightSvg from '../assets/title-with-icon/right.svg';
import { prefix } from '../utils/global';
type TitleWithIconProps = {
  title: string;
  className?: string;
};

const TitleWithIcon = ({ className, title }: TitleWithIconProps) => (
  <div className={classNames(className, `${prefix}titleSection`)}>
    <img src={rightSvg} alt="" />
    <div className={`${prefix}title`}>{title}</div>
  </div>
);

export default TitleWithIcon;
