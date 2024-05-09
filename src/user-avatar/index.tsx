import type { AvatarProps, TooltipProps } from 'antd';
import { Avatar, Tooltip } from 'antd';
import randomColor from 'randomcolor';
import React, { useMemo } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';

interface UserAvatarProps extends AvatarProps {
  user: { realName?: string; userName?: string } | null | undefined;
  tooltipProps?: TooltipProps;
}

const UserAvatar = ({
  user,
  tooltipProps,
  style,
  ...props
}: UserAvatarProps) => {
  const name =
    [user?.realName, user?.userName].filter(Boolean).join(' | ') || 'Unknown';

  const background = useMemo(
    () => randomColor({ luminosity: 'bright', seed: name, format: 'rgb' }),
    [name],
  );

  return (
    <ConfigProviderWrapper>
      <Tooltip title={user?.realName || 'Unknown'} {...tooltipProps}>
        <Avatar
          data-testid="userAvatar"
          style={{ background, ...style }}
          {...props}
        >
          {name[0].toUpperCase()}
        </Avatar>
      </Tooltip>
    </ConfigProviderWrapper>
  );
};

export default UserAvatar;
