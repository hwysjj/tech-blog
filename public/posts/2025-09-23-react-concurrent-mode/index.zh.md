---
title: "React 18 并发特性与调度系统"
date: "2025-09-23"
tags: ["React", "Concurrent Mode", "Scheduler", "React 18"]
category: "技术教程"
author: "博主"
excerpt: "深入讲解 React 18 并发渲染原理、Scheduler 调度系统、Lane 优先级模型、时间切片机制，以及 startTransition 和 useDeferredValue 的使用场景和面试高频问题。"
---

# 🧩 第 6 章：React 18 并发特性与调度系统（Concurrent Mode + Scheduler）

## 一、为什么需要并发渲染（Concurrent Rendering）

### ✅ 背景

React 15 / 16 的渲染是同步的：
> 一旦开始更新，就必须一次性完成。

如果渲染任务耗时太长，就会：
- 阻塞主线程；
- 页面卡顿；
- 用户输入延迟。

---

### 💡 示例（传统模式）

```jsx
function HeavyComponent() {
  const items = Array(10000).fill(0);
  return <ul>{items.map((_, i) => <li key={i}>Item {i}</li>)}</ul>;
}
```

点击按钮渲染该组件时，浏览器可能数百毫秒无响应。
👉 因为 JavaScript 阻塞了渲染。

---

## 二、React 18 的解决方案：并发渲染（Concurrent Rendering）

React 18 引入"并发特性"，
核心目标是让渲染任务可中断、可恢复、可调度优先级。

---

### 🧠 原理
React 将渲染过程拆分为一个个小任务（Fiber 节点），
然后配合 **Scheduler 调度器** 和 **时间切片机制** 来决定：
> "当前要渲染哪个任务？"

---

### 🧩 工作机制图（描述版）

```
[用户操作] → [React 创建更新任务]
                 ↓
      [Scheduler 调度系统分配优先级]
                 ↓
       [Fiber 执行渲染：每次处理一小块]
                 ↓
     [如果有更高优先级任务 → 暂停当前任务]
                 ↓
       [完成后继续上次未完成的渲染]
                 ↓
          [统一提交到 DOM（Commit）]
```

---

## 三、React Scheduler 调度系统

React 内部引入了一个轻量调度器（Scheduler），
用于决定哪个任务先执行、哪个任务可以延后。

### ⚙️ 任务优先级（Lanes 模型）

| 优先级 | 场景 | 延迟容忍度 |
|---------|------|-------------|
| ImmediateLane | 用户交互（点击） | 0ms |
| TransitionLane | 页面过渡、异步数据 | 100~200ms |
| DefaultLane | 普通渲染 | 250ms |
| IdleLane | 后台任务 | 无限制 |

---

### 💡 简化理解

React 会根据"任务类型"自动分配优先级。
例如：
```jsx
startTransition(() => {
  setPage("Profile");
});
```
`startTransition` 会告诉 React：
> "这次更新不紧急，可以延后执行。"

---

## 四、时间切片（Time Slicing）

React 使用浏览器的 `requestIdleCallback` / `MessageChannel` 等机制
实现"时间切片"，即：
> 在浏览器空闲时继续渲染下一个 Fiber。

### ⏱️ 示例（伪代码）

```js
while (deadline.timeRemaining() > 0 && nextUnitOfWork) {
  nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
}
```

- `deadline.timeRemaining()`：当前帧剩余时间；
- 时间不足则暂停任务；
- 下次空闲再恢复。

React 通过这种方式保持交互流畅。

---

## 五、React 18 的两个关键 Hook

### 1️⃣ startTransition —— 标记低优先级更新

```jsx
import { startTransition } from "react";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      // 模拟慢渲染任务
      setResult(filterLargeList(value));
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      <ResultList result={result} />
    </>
  );
}
```

**说明：**
- `setQuery` 是紧急任务（用户输入）；
- `setResult` 是低优先级任务；
- 用户输入时不会卡顿。

---

### 2️⃣ useDeferredValue —— 延迟计算结果

```jsx
const deferredValue = useDeferredValue(query);
const filtered = useMemo(() => filterList(deferredValue), [deferredValue]);
```

**原理：**
React 会延迟更新低优先级值，优先保证交互流畅。

---

## 六、并发模式的优点

| 优点 | 说明 |
|------|------|
| 流畅交互 | 用户输入不被阻塞 |
| 优先级可控 | 重要任务优先执行 |
| 自动调度 | 任务可中断、恢复 |
| 更自然的 UI 过渡 | 支持部分渲染、异步加载 |

---

## 七、常见面试题与答题思路

### ❓1. React 18 的并发渲染解决了什么问题？
**答题思路：**
> 解决同步渲染阻塞主线程问题；
> 通过 Fiber + Scheduler 实现可中断、可恢复的异步渲染；
> 提升页面流畅度。

---

### ❓2. startTransition 和 useDeferredValue 的区别？
| API | 用途 | 场景 |
|------|------|------|
| startTransition | 包裹更新任务 | 标记低优先级状态更新 |
| useDeferredValue | 延迟计算值 | 优化依赖昂贵计算的 UI |

---

### ❓3. React 是如何实现任务中断与恢复的？
**答题思路：**
> Fiber 架构将组件树转化为链表结构；
> 每次只处理一个小单元（Work Unit）；
> 在空闲时间恢复未完成任务。

---

### ❓4. Fiber 为什么能支持时间切片？
**答题思路：**
> 因为 Fiber 是可中断的工作单元；
> 每个 Fiber 保存 return 指针；
> 可以从中断点恢复执行。

---

### ❓5. 并发模式和传统模式最大的区别？
| 对比项 | 传统模式 | 并发模式 |
|---------|-----------|-----------|
| 渲染方式 | 同步、一次性 | 可中断、异步 |
| 性能表现 | 易卡顿 | 更流畅 |
| 调度系统 | 无 | Scheduler |
| 代码变动 | 无需修改 | 可显式标记任务优先级 |

---

## 八、动手练习

1️⃣ 使用 `startTransition` 包裹大型状态更新任务，观察性能变化。
2️⃣ 对比 `useDeferredValue` 与普通 `useEffect` 的更新延迟表现。
3️⃣ 打开 Chrome Performance 查看任务切片执行情况。

---

## 🔚 小结

| 核心机制 | 功能 | 面试关键词 |
|-----------|--------|-------------|
| Fiber | 分片渲染单元 | 可中断、可恢复 |
| Scheduler | 任务调度器 | 优先级调度 |
| Time Slicing | 空闲执行机制 | requestIdleCallback |
| startTransition | 标记低优先级任务 | 并发更新 |
| useDeferredValue | 延迟值更新 | 流畅交互 |
| Lane 模型 | 多优先级控制 | 渲染调度系统 |
