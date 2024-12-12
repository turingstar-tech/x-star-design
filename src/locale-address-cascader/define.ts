import ChinaMapData from 'province-city-china/dist/level.json';
import type { TenantName } from '../tenant-provider';
import USAMapData from './usa-map.json';

export interface LocaleAddressCascaderProps {
  tenant?: TenantName;
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  allowClear?: boolean;
}

export interface OptionType {
  code: string;
  name: string;
  children?: OptionType[];
}

const OTHER_AREA: OptionType[] = [
  {
    children: [],
    code: '其他',
    name: '其他',
  },
];

const OTHER_AREA_USA: OptionType[] = [
  {
    children: [],
    code: 'Other',
    name: 'Other',
  },
];

const otherProvinces: Record<string, string> = {
  香港: '810000',
  澳门: '820000',
  台湾: '710000',
  其他: '其他',
};

export const CHINA_MAP: OptionType[] = (ChinaMapData as OptionType[]).concat(
  OTHER_AREA,
);
export const USA_MAP: OptionType[] = (USAMapData as OptionType[]).concat(
  OTHER_AREA_USA,
);

/**
 * 将code装为label
 * @param codes
 */
export const getLabelsFromCodes = (
  codes: string[],
  tenantName?: TenantName,
) => {
  const [province, cityOrArea, area] = codes;
  const mapData = tenantName === 'xyd' ? CHINA_MAP : USA_MAP;

  const res: string[] = [];
  if (otherProvinces[province]) {
    return [otherProvinces[province]];
  }

  mapData.some((item) => {
    if (item.code === province) {
      res.push(item.name);
      return item?.children?.some((levelCity) => {
        if (area && levelCity.code === cityOrArea && levelCity?.children) {
          // 正常情况三级结构
          res.push(levelCity.name);
          return levelCity.children.some((levelArea) => {
            if (levelArea.code === area) {
              res.push(levelArea.name);
              return true;
            }
            return false;
          });
        }
        if (!area && levelCity.code === cityOrArea) {
          // 二级结构
          res.push(levelCity.name);
          return true;
        }
        return false;
      });
    }
    return false;
  });

  return res;
};

/**
 * 将label转为code
 * @param labels
 */
export const getCodesFromLabels = (
  labels: string[],
  tenantName?: TenantName,
): string[] => {
  const [province, city, area] = labels;

  const res: string[] = [];
  const mapData = tenantName === 'xyd' ? CHINA_MAP : USA_MAP;

  // 兼容香港/澳门/台湾版本
  if (otherProvinces[province]) {
    return [otherProvinces[province]];
  }

  mapData.some((item) => {
    if (item.name === province) {
      res.push(item.code);
      return item?.children?.some((levelCity) => {
        if (levelCity.name === city) {
          res.push(levelCity.code);
          if (levelCity.children) {
            // 存在第三级结构
            return levelCity.children.some((levelArea) => {
              if (levelArea.name === area) {
                res.push(levelArea.code);
                return true;
              }
              return false;
            });
          } else {
            // 适用于北京市等二级结构
            return true;
          }
        } else if (levelCity.name === area) {
          // 兼容市级为市辖区
          res.push(levelCity.code);
          return true;
        }
        return false;
      });
    }
    return false;
  });
  return res;
};
