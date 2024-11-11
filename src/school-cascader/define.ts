export const DropRenderText_Zh = '统计数据截至于2020年12月';
export const DropRenderText_En = 'Statistical data as of December 2020';

export interface SchoolItem {
  address: string;
  area: string;
  city: string;
  location: string;
  name: string;
  province: string;
  type: string;
}

export interface ISchoolData {
  middleSchools: SchoolItem[];
  primarySchools: SchoolItem[];
}

export interface SchoolCascaderProps {
  tenant?: 'xyd' | 'xcamp';
  loading: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => Promise<void>;
  lang?: 'zh' | 'en';
  schoolData?: ISchoolData;
}
