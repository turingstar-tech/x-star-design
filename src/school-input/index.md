# SchoolInput

学校组件

```jsx
import { SchoolInput } from 'x-star-design';

const schoolData = {
  primarySchools: [
    {
      name: '淳安县姜家镇中心小学',
      type: 'PRIMARY_SCHOOL',
      location: '118.662421,29.474646',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '郁川街83号',
    },
    {
      name: '宋村乡中心小学',
      type: 'PRIMARY_SCHOOL',
      location: '118.858221,29.685493',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '千威线圣雄希望小学附近',
    },
    {
      name: '左口乡天一希望小学',
      type: 'PRIMARY_SCHOOL',
      location: '119.074726,29.700495',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '环左线附近',
    },
    {
      name: '枫树岭镇白马小学',
      type: 'PRIMARY_SCHOOL',
      location: '118.720394,29.233864',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '枫毛线附近',
    },
    {
      name: '文昌镇潭头完全小学',
      type: 'PRIMARY_SCHOOL',
      location: '119.203790,29.778379',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '文昌镇潭头村',
    },
  ],
  middleSchools: [
    {
      name: '分水初中教育集团玉华校区',
      type: 'MIDDLE_SCHOOL',
      location: '119.437176,29.921569',
      province: '浙江省',
      city: '杭州市',
      area: '桐庐县',
      address: '分水镇院士路557号',
    },
    {
      name: '浙江省淳安中学',
      type: 'MIDDLE_SCHOOL',
      location: '119.054126,29.587047',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '千岛湖镇开发路299号',
    },
    {
      name: '千岛湖初级中学',
      type: 'MIDDLE_SCHOOL',
      location: '119.062146,29.613168',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '千岛湖镇新安东路567号',
    },
    {
      name: '淳安县千岛湖镇南山学校',
      type: 'MIDDLE_SCHOOL',
      location: '119.055828,29.591596',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '千岛湖镇南山开发区',
    },
    {
      name: '杭州千岛湖建兰中学',
      type: 'MIDDLE_SCHOOL',
      location: '119.136068,29.611651',
      province: '浙江省',
      city: '杭州市',
      area: '淳安县',
      address: '睦州大道998号',
    },
  ],
};

const getSchoolList = async (params) => {
  return Promise.resolve(schoolData);
};

export default () => {
  const lang = 'zh';
  const tenant = 'xyd';

  return (
    <SchoolInput
      tenant={tenant}
      style={{ width: 500 }}
      value={'国际中学'}
      lang={lang}
      onSearch={async (value) => {
        await getSchoolList({ name: value, limit: 50000 });
      }}
    />
  );
};
```

## API

<API id="SchoolInput"></API>
