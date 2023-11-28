import classNames from 'classnames';
import React from 'react';
import rightSvg from '../assets/title-with-icon/right.svg';
import { prefix } from '../utils/global';
type TitleWithIconProps = {
  title: string | React.ReactNode;
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
  <div
    data-testid="wrapper"
    className={classNames(className, `${prefix}titleSection`)}
    id={id}
  >
    <img src={rightSvg} alt="" />
    <span data-testid="title" className={`${prefix}title`}>
      {title}
    </span>
    <span data-testid="description" className={`${prefix}description`}>
      {description}
    </span>
  </div>
);

export default TitleWithIcon;
