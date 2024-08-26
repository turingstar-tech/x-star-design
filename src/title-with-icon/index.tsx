import { RightSquareFilled } from '@ant-design/icons';
import { ConfigContext } from 'antd/es/config-provider';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { prefix } from '../utils/global';

export interface TitleWithIconProps {
  id?: string;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const TitleWithIcon = ({
  id,
  className,
  title,
  description,
}: TitleWithIconProps) => {
  const { theme } = useContext(ConfigContext);
  const { colorPrimary = '#1990fe' } = theme?.token ?? {};

  return (
    <div
      data-testid="wrapper"
      id={id}
      className={classNames(className, `${prefix}-titleSection`)}
    >
      <RightSquareFilled style={{ color: colorPrimary }} />
      <span data-testid="title" className={`${prefix}-title`}>
        {title}
      </span>
      <span data-testid="description" className={`${prefix}-description`}>
        {description}
      </span>
    </div>
  );
};

export default TitleWithIcon;
