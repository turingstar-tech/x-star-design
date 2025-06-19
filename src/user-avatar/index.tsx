import type { AvatarProps, TooltipProps } from 'antd';
import { Avatar, Tooltip } from 'antd';
import randomColor from 'randomcolor';
import React, { useMemo } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';

export interface UserAvatarProps extends AvatarProps {
  user:
    | { realName?: string; userName?: string; avatar?: string }
    | null
    | undefined;
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

  const background = useMemo(() => {
    if (user?.avatar) {
      return undefined;
    }
    return randomColor({
      luminosity: 'bright',
      seed: name,
      format: 'rgb',
    });
  }, [name, user]);

  return (
    <ConfigProviderWrapper>
      <Tooltip title={user?.realName || 'Unknown'} {...tooltipProps}>
        <Avatar
          data-testid="userAvatar"
          src={user?.avatar || undefined}
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
