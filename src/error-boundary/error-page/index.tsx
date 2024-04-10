import classNames from 'classnames';
import React from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { useLocale } from '../../locales';
import { prefix } from '../../utils/global';

const isFetchError = (error: any) =>
  error.message?.includes('Failed to fetch dynamically imported module:');

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { format: t } = useLocale('ErrorPage');

  if (isFetchError(error)) {
    location.reload();
  }

  return (
    <div className={classNames(`${prefix}-errorPage`)}>
      <div className={classNames('hello')} />
      <div className={classNames('ip')} />
      <div className={classNames('planets')} />
      <div className={classNames('content')}>
        {isFetchError(error) ? (
          <div data-testid="hint" className={classNames('hint')}>
            <div className={classNames('description')}>
              <div>{t('RELOAD_HINT')}</div>
            </div>
          </div>
        ) : (
          <div data-testid="alert" className={classNames('alert')}>
            <h2 style={{ fontWeight: 'bold' }}>{t('ERROR')}</h2>
            <div className={classNames('description')}>
              <div>{t('ERROR_BOUNDARY_TIP_1')}</div>
              <div>{t('ERROR_BOUNDARY_TIP_2')}</div>
              <div className={classNames('actions')}>
                <a href="/">{`>> ${t('RETURN_TO_HOME')}`}</a>
                <a onClick={resetErrorBoundary}>{`>> ${t('RETRY')}`}</a>
              </div>
              <div>
                {t('TECHNICAL_DEPARTMENT_CONTACT_EMAIL')}
                <a href="mailto:tech@xinyoudui.com">tech@xinyoudui.com</a>
              </div>
              <div style={{ color: 'red' }}>
                {t('ERROR_MESSAGE')}
                {error.message}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
