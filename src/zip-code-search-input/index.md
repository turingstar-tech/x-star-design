# ZipCodeSearchInput

美国地区组件

```jsx
import { ZipCodeSearchInput } from 'x-star-design';
import { Form, Button } from 'antd';
import { useLocale } from '../locales';

export default () => {
  const { format: t } = useLocale('ZipCodeSearchInput');
  return (
    <Form layout="inline" onFinish={(values) => console.log(values, 'values')}>
      <Form.Item name={'city'} label={t('area')}>
        <ZipCodeSearchInput style={{ width: 200 }} />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

## API

<API id="ZipCodeSearchInput"></API>
