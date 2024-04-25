import classNames from 'classnames';
import React from 'react';
import { useDelayedMount } from 'x-star-utils';
import { prefix } from '../utils/global';

interface LoadingMaskProps {
  loading: boolean;
}

/**
 * 加载蒙层
 */
const LoadingMask = ({ loading }: LoadingMaskProps) => {
  const [mount, visible] = useDelayedMount(loading, 300);

  return (
    <>
      {mount && (
        <div
          data-testid={'loadingMask'}
          className={classNames(`${prefix}-loadingMask`, {
            [`${prefix}-loadingHide`]: !visible,
          })}
        >
          <div className={`${prefix}-loadingLoader`}>
            <div className={`${prefix}-loadingSquare`} />
            <div className={`${prefix}-loadingSquare`} />
            <div className={`${prefix}-loadingSquare`} />
            <div className={`${prefix}-loadingSquare`} />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingMask;
