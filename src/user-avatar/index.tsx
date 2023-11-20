import { Avatar, Tooltip } from 'antd';
import { AvatarProps } from 'antd/es/avatar';
import randomColor from 'randomcolor';
import React, { useMemo } from 'react';
import ConfigProviderWrapper from '../config-provider-wrapper';

type UserAvatarProps = AvatarProps & {
  user: { realName?: string; userName?: string } | null | undefined;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user, style, ...props }) => {
  const name =
    [user?.realName, user?.userName]?.filter(Boolean)?.join(' | ') || 'Unknown';
  const background = useMemo(
    () =>
      randomColor({
        luminosity: 'bright',
        seed: name,
        format: 'rgb',
      }),
    [name],
  );

  return (
    <ConfigProviderWrapper>
      <Tooltip title={name}>
        <Avatar
          style={{ background, ...style }}
          {...props}
          data-testid={'userAvatar'}
        >
          {name[0].toUpperCase()}
        </Avatar>
      </Tooltip>
    </ConfigProviderWrapper>
  );
};

export default UserAvatar;
