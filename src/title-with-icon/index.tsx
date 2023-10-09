import classNames from 'classnames';
import React from 'react';
import rightSvg from '../assets/title-with-icon/right.svg';
import { prefix } from '../utils/global';
type TitleWithIconProps = {
  title: string;
  className?: string;
  description?: string;
  id?: string;
};

const TitleWithIcon = ({
  className,
  title,
  description,
  id,
}: TitleWithIconProps) => (
  <div className={classNames(className, `${prefix}titleSection`)} id={id}>
    <img src={rightSvg} alt="" />
    <span className={`${prefix}title`}>{title}</span>
    <span className={`${prefix}description`}>{description}</span>
  </div>
);

export default TitleWithIcon;
