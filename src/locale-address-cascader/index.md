# LocaleAddressCascader

地区选择组件，根据传入的 tenant 值渲染对应的地区选项（xyd 渲染中国地区，xcamp 渲染美国地区，美国地区为邮编查询地址）

- 适配了比赛系统的三级相同港澳台结构的值

```jsx
import { LocaleAddressCascader } from 'x-star-design';
import { useState } from 'react';
import { Form, Button } from 'antd';
import { useLocale } from '../locales';

export default () => {
  const [tenant, setTenant] = useState('xyd');
  const { format: t } = useLocale('ZipCodeSearchInput');

  return (
    <Form layout="inline" onFinish={(values) => console.log(values, 'values')}>
      <Form.Item name={'city'} label={t('area')} labelCol={{ span: 6 }}>
        <LocaleAddressCascader
          style={{ width: 200 }}
          tenant={tenant}
          zipCodeSearchInputProps={{ style: { width: 200 } }}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <button onClick={() => setTenant(tenant === 'xyd' ? 'xcamp' : 'xyd')}>
        {'切换tenant'}
      </button>
    </Form>
  );
};
```

## API

<API id="MicroApp"></API>
