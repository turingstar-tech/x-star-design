# DomObserver

该组件可用于监听 DOM 树的变化。Demo 展示了防止用户篡改页面的功能，当表格的 Dom 发生变化时，会强制重新渲染组件，从而达到防篡改的效果。

```jsx
import { useMemo, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { DomObserver } from 'x-star-design';
import { SortTable } from 'x-star-design';
import { Space, Table, Tag } from 'antd';

import dayjs from 'dayjs';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default () => {
  const [elementKey, setElementKey] = useState(dayjs().unix());
  // 配置观察选项，默认为此config
  const config = {
    attributes: true, // 监听属性变化
    childList: true, // 监听子节点变化
    subtree: true, // 监听整个子树
    characterData: true, // 监听文本内容变化
  };
  // 配置监听的回调
  const observedCallback = (mutationsList) => {
    mutationsList?.forEach((mutation) => {
      switch (mutation.type) {
        // case 'childList':
        //   /* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
        //      mutation.removedNodes */
        //   break;
        // case 'attributes':
        //   /* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中，
        //      该属性之前的值为 mutation.oldValue */
        //   break;
        default:
          setElementKey(dayjs().unix()); // 更新key值，强制渲染组件
      }
    });
  };

  return (
    <DomObserver
      key={elementKey}
      observedId={'observedDom'}
      config={config}
      observedCallback={observedCallback}
    >
      <Table
        id={'observedDom'}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowHoverable={false}
      />
    </DomObserver>
  );
};
```

## API

<API id="DomObserver"></API>
