import type { TenantName } from '../tenant-provider';

export interface SchoolItem {
  address: string;
  area: string;
  city: string;
  location: string;
  name: string;
  province: string;
  type: string;
}

export interface SchoolData {
  middleSchools: SchoolItem[];
  primarySchools: SchoolItem[];
}

export interface SchoolInputProps {
  className?: string;
  style?: React.CSSProperties;
  tenant?: TenantName;
  loading: boolean;
  placeholder?: string;
  schoolData?: SchoolData;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => Promise<void>;
}
