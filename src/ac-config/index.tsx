import { Divider, Form, FormInstance, FormProps, Space } from 'antd';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { forwardRef, useImperativeHandle } from 'react';
import { getDescription } from 'x-star-utils';
import ConfigProviderWrapper from '../config-provider-wrapper';
import { useLocale } from '../locales';
import { prefix } from '../utils/global';
import GeneralConfigItem from './GeneralConfigItem';
import ProgramConfigItem from './ProgramConfigItem';
import {
  Configuration,
  ContestExamType,
  DisorderConfigStatus,
  GenerateConfigReturn,
  RawConfig,
  ReleaseType,
} from './define';

export interface AcConfigProps extends Omit<FormProps, 'children'> {
  type?: 'simple' | 'advanced';
  contestType?: ContestExamType;
  initialValues?: Configuration;
}

export interface AcConfigHandle {
  form: FormInstance<any>;
  getConfigData: (initData: RawConfig) => Configuration;
}

const AcConfig = forwardRef<AcConfigHandle, AcConfigProps>(
  ({ type = 'advanced', contestType, initialValues, ...props }, ref) => {
    const [form] = Form.useForm();
    const { format: t, locale } = useLocale('AcConfig');
    const language = {
      zh_CN: 'zh',
      en_US: 'en',
    }[locale] as 'zh' | 'en';

    const { noLimit, limitTime } = initialValues?.homework || {
      limitTime: 0,
      noLimit: false,
    };
    const {
      gradeRelease,
      rankListRelease,
      paperRelease,
      answerRelease,
      submission,
      tipRelease,
      disorder,
    } = initialValues?.general || {};
    const {
      personalScoreVisibility,
      rankingMethod,
      highScoreProgramVisibility,
      downloadDataEnable,
      downloadDataCount,
      scoreTypeInMatch,
      lang,
    } = initialValues?.program || {};

    const { rankListShowRealName, rankShowUserLabel } =
      initialValues?.rank || {};
    const formInitialValues = {
      contestTime:
        contestType === 'contest'
          ? [initialValues?.contest?.startTime, initialValues?.contest?.endTime]
              .filter((i) => i !== undefined)
              .map((item) => dayjs(item * 1000))
          : noLimit
          ? 'noLimit'
          : 'limitTime',
      limitTime: {
        limitHour: noLimit ? 0 : Math.floor((limitTime || 0) / 3600),
        limitMinute: Math.floor(((limitTime || 0) % 3600) / 60),
      },
      gradeRelease: gradeRelease?.type,
      gradeTime: dayjs.unix(
        gradeRelease?.scheduled?.releaseTime || dayjs().valueOf() / 1000,
      ),
      disorder: Object.keys(disorder || {}).filter(
        (key) => disorder?.[key as keyof typeof disorder] === true,
      ),
      rankListRelease: rankListRelease?.type,
      rankListTime: dayjs.unix(
        rankListRelease?.scheduled?.releaseTime || dayjs().valueOf() / 1000,
      ),
      paperRelease: paperRelease?.type,
      paperTime: dayjs.unix(
        paperRelease?.scheduled?.releaseTime || dayjs().valueOf() / 1000,
      ),
      answerRelease: answerRelease?.type,
      answerTime: dayjs.unix(
        answerRelease?.scheduled?.releaseTime || dayjs().valueOf() / 1000,
      ),
      rankListShowRealName,
      rankShowUserLabel,
      submission: submission?.type,
      submissionLimitTime: {
        limitHour: Math.floor((submission?.submissionTimed || 0) / 60),
        limitMinute: (submission?.submissionTimed || 0) % 60,
      },
      lang,
      personalScoreVisibility,
      tipRelease: tipRelease?.type,
      tipTime: dayjs.unix(
        tipRelease?.scheduled?.releaseTime || dayjs().valueOf() / 1000,
      ),
      scoreTypeInMatch,
      rankingMethod,
      highScoreProgramVisibility,
      downloadDataEnable,
      downloadDataCount,
    };

    useImperativeHandle(ref, () => ({
      form,
      getConfigData: (data?: RawConfig) => {
        const rawData = data ?? (form.getFieldsValue() as RawConfig);
        // 生成一些通用的 config
        const generateConfig = <T extends ReleaseType>(
          release: T,
          status: RawConfig[T],
          timeType: keyof RawConfig,
        ) => {
          return {
            [release]: {
              type: status,
              scheduled: {
                releaseTime:
                  status === 'scheduled'
                    ? (rawData[timeType] as Dayjs).second(0).unix().valueOf()
                    : undefined,
              },
            },
          } as GenerateConfigReturn<T>;
        };
        const getFormatDisorder = () => {
          const disorderMap: Record<keyof DisorderConfigStatus, boolean> = {
            part: false,
            program: false,
            objective: false,
            combinationInternal: false,
            singleOption: false,
            multipleOption: false,
          };
          rawData.disorder.forEach((item) => {
            disorderMap[item] = true;
          });
          return disorderMap;
        };
        const updateConfig: Configuration = {
          general: {
            ...generateConfig(
              'gradeRelease',
              rawData.gradeRelease,
              'gradeTime',
            ),
            ...generateConfig(
              'paperRelease',
              rawData.paperRelease,
              'paperTime',
            ),
            ...generateConfig(
              'rankListRelease',
              rawData.rankListRelease,
              'rankListTime',
            ),
            ...generateConfig('tipRelease', rawData.tipRelease, 'tipTime'),
            ...generateConfig(
              'answerRelease',
              rawData.answerRelease,
              'answerTime',
            ),
            submission: {
              type: rawData.submission,
              scheduled: {},
              submissionTimed:
                (rawData?.submissionLimitTime?.limitHour || 0) * 60 +
                (rawData?.submissionLimitTime?.limitMinute || 0),
            },
            disorder: getFormatDisorder(),
          },
          rank: {
            rankListShowRealName: rawData.rankListShowRealName,
            rankShowUserLabel: rawData.rankShowUserLabel,
          },
          program: {
            personalScoreVisibility: rawData.personalScoreVisibility,
            rankingMethod: rawData.rankingMethod,
            highScoreProgramVisibility: rawData.highScoreProgramVisibility,
            downloadDataEnable: rawData.downloadDataEnable,
            downloadDataCount: rawData.downloadDataCount,
            scoreTypeInMatch: rawData.scoreTypeInMatch,
            lang: rawData.lang,
          },
        };
        if (contestType === ContestExamType.Exam) {
          updateConfig['contest'] = {
            startTime: (rawData?.contestTime as [Dayjs, Dayjs])?.[0]
              ?.second(0)
              .unix()
              .valueOf(),
            endTime: (rawData?.contestTime as [Dayjs, Dayjs])?.[1]
              ?.second(0)
              .unix()
              .valueOf(),
          };
        }
        if (contestType === ContestExamType.Homework) {
          updateConfig['homework'] = {
            limitTime:
              rawData.contestTime === 'noLimit'
                ? undefined
                : (rawData?.limitTime?.limitHour * 3600 || 0) +
                  (rawData?.limitTime?.limitMinute * 60 || 0),
            noLimit: rawData.contestTime === 'noLimit',
          };
        }
        return updateConfig;
      },
    }));

    return (
      <ConfigProviderWrapper>
        <Form
          form={form}
          labelAlign="right"
          onFinish={props?.onFinish}
          initialValues={formInitialValues}
        >
          {type === 'advanced' ? (
            <Space
              direction="horizontal"
              size={30}
              className={classNames(`${prefix}-ac-config-space`)}
              split={<Divider type="vertical" style={{ fontSize: 400 }} />}
            >
              <div>
                <h3>{getDescription(language, t('General_Configuration'))}</h3>
                <GeneralConfigItem
                  type={type}
                  contestType={contestType}
                  form={form}
                />
              </div>
              <div>
                <h3>
                  {getDescription(
                    language,
                    t('Programming_Problem_Configuration'),
                  )}
                </h3>
                <ProgramConfigItem type={type} />
              </div>
            </Space>
          ) : (
            <>
              <GeneralConfigItem
                type={type}
                contestType={contestType}
                form={form}
              />
              <ProgramConfigItem type={type} />
            </>
          )}
        </Form>
      </ConfigProviderWrapper>
    );
  },
);

export default AcConfig;
