import classNames from 'classnames';
import React from 'react';
import { useDelayedMount } from 'x-star-utils';
import { prefix } from '../utils/global';

export interface LoadingMaskProps {
  loading: boolean;
}

/**
 * 加载蒙层
 */
const LoadingMask = ({ loading }: LoadingMaskProps) => {
  const [mount, visible] = useDelayedMount(loading, 300);
  // // console.log('isXCamp', tenant, isXCamp);
  const isXCamp = location.hostname.includes('x-camp');
  // console.log('isXCamp', location.pathname, isXCamp);
  return (
    <>
      {mount && (
        <div
          data-testid={'loadingMask'}
          className={classNames(`${prefix}-loadingMask`, {
            [`${prefix}-loadingHide`]: !visible,
            [`${prefix}-xcLoadingMask`]: isXCamp,
          })}
        >
          {isXCamp ? (
            <div className={`${prefix}-xcLoadingLoader`} />
          ) : (
            <div className={`${prefix}-loadingLoader`}>
              <div className={`${prefix}-loadingSquare`} />
              <div className={`${prefix}-loadingSquare`} />
              <div className={`${prefix}-loadingSquare`} />
              <div className={`${prefix}-loadingSquare`} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LoadingMask;
