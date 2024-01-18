import { RightSquareFilled } from '@ant-design/icons';
import { ConfigContext } from 'antd/es/config-provider';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { prefix } from '../utils/global';
type TitleWithIconProps = {
  title: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  id?: string;
};

const TitleWithIcon = ({
  className,
  title,
  description,
  id,
}: TitleWithIconProps) => {
  const { theme } = useContext(ConfigContext);
  const { colorPrimary } = theme?.token || {};
  console.log(colorPrimary);
  return (
    <div
      data-testid="wrapper"
      className={classNames(className, `${prefix}-titleSection`)}
      id={id}
    >
      <RightSquareFilled style={{ color: colorPrimary || '#1990fe' }} />
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
