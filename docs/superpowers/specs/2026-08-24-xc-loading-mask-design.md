# XCLoadingMask 自动租户适配设计

## 目标

保持 `LoadingMask` 现有公共 API 不变，根据 `TenantProvider` 提供的租户自动渲染对应加载动画：

- `xyd`：保留现有四方块动画和容器内绝对定位蒙层。
- `xcamp`：迁移 `x-camp-web/src/components/common/loading` 的橙黄双圆点动画，并使用容器内绝对定位蒙层。

## 组件结构

`LoadingMask` 通过 `useTenant()` 读取 `tenant.name`，继续统一处理 `useDelayedMount(loading, 300)` 的挂载和淡出状态。

渲染分支仅负责 loader：

- xyd 渲染现有四个方块节点。
- xcamp 渲染一个节点，使用 `::before`、`::after` 绘制并驱动双圆点动画。

两种租户共用 `loading` 属性、延迟行为和 `data-testid="loadingMask"`。

## 样式

保留现有 xyd 样式类，新增 xcamp 修饰类及 loader 类：

- xcamp 蒙层使用 `position: absolute`、`inset: 0`、`z-index: 999` 和 `#f0f5ff` 背景。
- xcamp loader 复刻参考组件的橙色 `#ffad11` 与黄色 `#ffd600` 双圆点动画。
- 隐藏状态继续使用现有淡出类。
- 动画 keyframes 使用组件前缀命名，避免全局名称冲突。

## 兼容性

- `src/index.ts` 的现有 `LoadingMask` 和 `LoadingMaskProps` 导出保持不变。
- 不新增调用方必须传入的属性。
- 未使用 `TenantProvider` 时沿用 context 默认租户 `xyd`。

## 测试

- 保留现有 loading → unloading 淡出测试。
- 在默认 xyd 租户下断言四方块 loader 存在，xcamp loader 不存在。
- 使用 `TenantProvider` 和 xcamp hostname 渲染，断言 xcamp 蒙层修饰类与双圆点 loader 存在，xyd 方块 loader 不存在。
