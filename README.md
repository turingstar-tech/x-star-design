# x-star-design

[![NPM version](https://img.shields.io/npm/v/x-star-design.svg?style=flat)](https://npmjs.org/package/x-star-design)
[![NPM downloads](http://img.shields.io/npm/dm/x-star-design.svg?style=flat)](https://npmjs.org/package/x-star-design)

A react component library developed by turingstar

## Usage

### 基本信息

- github 地址：https://github.com/turingstar-tech/x-star-design
- npm 地址：https://www.npmjs.com/package/x-star-design
- 文档地址：https://turingstar-tech.github.io/x-star-design/components/title-with-icon

### 基本开发流程

假设现在要开发一个名为 StatusTag 的组件

1. 首先在 src 文件目录下建立一个名为 status-tag 的组件文件夹
2. 在该文件夹中建立组件相关文件

```tsx
index.tsx, //组件
  index.md, //组件使用文档
  _index.scss, //组件样式
  define.ts; //组件相关类型定义（类型简短可直接定义在index.tsx中）
```

3. 编写组件样式时需注类样式的前缀引入，保证组件样式不和项目样式重叠，**同时由于没有引入 module，各个组件间样式也需命名不同,建议每个组件样式前加上该组件的特定标识，如 statusTagContent 而不是 content**

```tsx
// index.tsx
import { prefix } from '../utils/global';
<img
  src={diamondSVG}
  className={classNames(`${prefix}required`, {
    [`${prefix}circleRequired`]: shape === 'circle',
    [`${prefix}rectRequired`]: shape !== 'circle',
  })}
/>
// _index.scss
.#{$prefix}required {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
 }

.#{$prefix}circleRequired {
    top: -3px;
    right: -3px;
 }

.#{$prefix}rectRequired {
    top: -5px;
    right: -5px;
}
```

4. 组件编写后需导出样式、组件及其相关类型

- 在 styles 中的 index.scss

```tsx
// src/styles/index.scss
@import '../StatusTag';
```

- 在 src 中的 index.ts

```tsx
// src/index.ts
export { default as StatusTag } from './StatusTag';
export type {
  StatusTagProps,
  StatusTagShape,
  StatusTagStyle,
  StatusTagType,
} from './StatusTag/define';
```

- 最后编写组件相关使用文档

````tsx
// define.ts
export interface StatusTagProps {
    /**

   * @description 标签形状
   */
    shape: StatusTagShape;
    status: StatusTagType;
    children?: React.ReactNode;
    /**
   * @description 是否为必做题
   * @default false
   */
    required?: boolean;
    hover?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

// index.md
# StatusTag

这是题目状态组件

```jsx
import { StatusTag } from 'x-star-design';

export default () => (
  <div className="x-star-design-statusTagTest">
    <StatusTag shape={'rect'} status={'unfilled'} />
    <StatusTag shape={'circle'} hover status={'wrong'} required>
      <span>{'1'}</span>
    </StatusTag>
  </div>
);
```

## API

<API id="StatusTag"></API>
```
````

## 写给内部开发人员

在编写组件示例时，建议将额外的样式写成内联样式，方便用户直接复制。如果样式过于复杂，或必须写成类的形式（如伪类或伪元素），建议新建一个\_example.scss 文件，用于编写示例的样式，并在.dumi/global.scss 中引入该文件，这样示例样式不会打包进发布的 npm 包。

- 组件库内置翻译
  - 使用 useLocale 函数
  - 分别在 zh_CN 和 en_US 中加入翻译
- 组件库如果使用以 antd 为基础的二次封装组件，请在外面套上 ConfigProviderWrapper，以保证组件样式的隔离以及颜色的正确性；同时，如果需要修改 antd 组件的默认样式，需要写两套，一套以.ant 开头适配比赛系统，一套以.x-star-design 开头以适配另外两个系统。具体组件可以参考 XTabs

### 发包流程

- 手动发包
  - 手动发包需要本地登录 npm 且必须邀请进 npm 组织，建议使用自动发包
  - 使用 `npm version` 命令更新版本号，例如：

```C++
发布一个 patch 版本
$ npm version patch -m "build: release %s"
$ npm publish
```

- 自动发包

  - 在 main 分支上执行该命令，会自动修改 package.json 版本号并自动打 tag，并且会自动 commit，不需要手动写 message 来 commit
  - ```Bash
    npm version patch -m "build: release %s"
    ```

  - 执行该命令，将版本和 tag 推到 github 上
  - ```Bash
    git push && git push --tag
    ```

## Development

```bash
# install dependencies
$ yarn install

# develop library by docs demo
$ yarn start

# build library source code
$ yarn run build

# build library source code in watch mode
$ yarn run build:watch

# build docs
$ yarn run docs:build

# check your project for potential problems
$ yarn run doctor
```

## LICENSE

MIT
