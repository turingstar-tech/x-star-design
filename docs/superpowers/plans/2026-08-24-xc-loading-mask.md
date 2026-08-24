# XCLoadingMask Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让现有 `LoadingMask` 根据 `TenantProvider` 自动渲染 XYD 四方块动画或 XCAMP 双圆点动画。

**Architecture:** 保留单一 `LoadingMask` 公共组件和统一的延迟挂载逻辑，通过 `useTenant()` 选择蒙层修饰类和 loader 节点。样式在现有 loading-mask SCSS 中隔离，避免改变 XYD 行为。

**Tech Stack:** React 18、TypeScript、SCSS、Jest、Testing Library、x-star-utils `useDelayedMount`

## Global Constraints

- `LoadingMask` 与 `LoadingMaskProps` 的公共导出保持不变。
- xyd 保持 `position: absolute` 和现有四方块动画。
- xcamp 使用 `position: absolute` 和参考组件的橙黄双圆点动画。
- 不增加新的必填属性或依赖。
- 不创建 git commit，除非用户明确要求。

---

### Task 1: 租户渲染行为测试

**Files:**

- Modify: `test/loading-mask.test.tsx`

**Interfaces:**

- Consumes: `LoadingMask({ loading: boolean })`、`TenantProvider`
- Produces: xyd 与 xcamp loader 分支的回归测试

- [ ] **Step 1: 写入失败测试**

增加默认租户下对 `${prefix}-loadingLoader` 和四个 `${prefix}-loadingSquare` 的断言；增加 xcamp hostname 与 `TenantProvider` 包装下对 `${prefix}-xcLoadingMask`、`${prefix}-xcLoadingLoader` 的断言，并确认不存在 XYD loader。

- [ ] **Step 2: 运行测试确认失败**

Run: `npm test -- --runInBand test/loading-mask.test.tsx`

Expected: xcamp 用例因找不到 `${prefix}-xcLoadingMask` 或 `${prefix}-xcLoadingLoader` 失败。

### Task 2: 实现租户自动适配

**Files:**

- Modify: `src/loading-mask/index.tsx`
- Modify: `src/loading-mask/_index.scss`

**Interfaces:**

- Consumes: `useTenant(): { tenant: Tenant; theme: TenantTheme }`
- Produces: 保持原签名的 `LoadingMask({ loading }: LoadingMaskProps)`

- [ ] **Step 1: 写入最小组件实现**

在 `LoadingMask` 中调用 `useTenant()`；当租户为 `xcamp` 时添加 `${prefix}-xcLoadingMask` 并渲染 `${prefix}-xcLoadingLoader`，否则渲染现有四个方块。

- [ ] **Step 2: 写入 XCAMP 样式**

新增绝对定位蒙层修饰类、双圆点伪元素及带前缀的两组 keyframes。颜色、尺寸、间距和 0.8 秒动画参数与参考组件一致。

- [ ] **Step 3: 运行测试确认通过**

Run: `npm test -- --runInBand test/loading-mask.test.tsx`

Expected: loading-mask 测试全部 PASS。

### Task 3: 静态检查与回归验证

**Files:**

- Verify: `src/loading-mask/index.tsx`
- Verify: `src/loading-mask/_index.scss`
- Verify: `test/loading-mask.test.tsx`

**Interfaces:**

- Consumes: Task 1、Task 2 的实现
- Produces: 可交付的验证结果

- [ ] **Step 1: 运行 ESLint**

Run: `npx eslint src/loading-mask/index.tsx test/loading-mask.test.tsx`

Expected: 无错误。

- [ ] **Step 2: 运行 Stylelint**

Run: `npx stylelint "src/loading-mask/_index.scss"`

Expected: 无错误。

- [ ] **Step 3: 再次运行专项测试**

Run: `npm test -- --runInBand test/loading-mask.test.tsx`

Expected: 全部 PASS。
