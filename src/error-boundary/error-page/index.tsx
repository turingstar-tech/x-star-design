import classNames from 'classnames';
import React from 'react';
import { useLocale } from '../../locales';
import { prefix } from '../../utils/global';

interface Props {
  onReset?: () => void;
  homeLink?: string;
}

const ErrorPage = ({ onReset, homeLink }: Props) => {
  const { format: t } = useLocale('ErrorPage');

  return (
    <div className={classNames(`${prefix}errorPage`)}>
      <div className={classNames(`hello`)} />
      <div className={classNames(`ip`)} />
      <div className={classNames(`planets`)} />
      <div className={classNames(`content`)}>
        <div className={classNames(`alert`)}>
          <div className={classNames(`alertContent`)}>
            <h2 style={{ fontWeight: 'bold' }}>{t('ERROR')}</h2>
            <div className={classNames(`description`)}>
              <div>{t('ERROR_BOUNDARY_TIP_1')}</div>
              <div>{t('ERROR_BOUNDARY_TIP_2')}</div>
              <div className={classNames(`actions`)}>
                <a href={homeLink || '/'}>{`>> ${t('RETURN_TO_HOME')}`}</a>
                <a onClick={onReset}>{`>> ${t('RETRY')}`}</a>
              </div>
              <div>
                {t('TECHNICAL_DEPARTMENT_CONTACT_EMAIL')}
                <a href="mailto:tech@xinyoudui.com">{'tech@xinyoudui.com'}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
