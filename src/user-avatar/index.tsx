import { Avatar, Tooltip } from 'antd';
import { AvatarProps } from 'antd/es/avatar';
import randomColor from 'randomcolor';
import React, { useMemo } from 'react';

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
    <Tooltip title={name}>
      <Avatar style={{ background, ...style }} {...props}>
        {name[0].toUpperCase()}
      </Avatar>
    </Tooltip>
  );
};

export default UserAvatar;
