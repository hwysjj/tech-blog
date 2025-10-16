---
title: "渲染与更新机制详解"
date: "2025-10-21"
tags: ["React", "渲染机制", "setState", "批处理"]
category: "技术教程"
author: "博主"
excerpt: "深入讲解 React 从 setState 到页面更新的完整流程，包括两阶段渲染、Diff 算法、批处理机制、生命周期与 useEffect 的关系，以及性能优化策略和面试高频问题。"
---

# 🧩 第 4 章：渲染与更新机制（setState、Diff、批处理、生命周期）

## 一、从 setState 到页面更新的完整流程

### ✅ 背景
调用 setState 并不会立即更新 DOM，React 内部经历了一个完整的异步调度过程。

---

### 🔍 流程概览

```
用户交互（onClick）
       ↓
调用 setState()
       ↓
React 调度更新任务（scheduleUpdate）
       ↓
Render 阶段：计算新 Fiber 树（Diff）
       ↓
Commit 阶段：更新真实 DOM
       ↓
浏览器绘制（repaint）
```

---

### 💡 代码示例

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  console.log("render", count);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}
```

打印结果：
```
render 0
render 1
```
即使调用了三次 `setCount`，也只触发一次渲染。

---

## 二、React 的两大阶段

| 阶段 | 名称 | 可中断 | 主要任务 |
|------|------|--------|-----------|
| Render 阶段 | 协调（Reconciliation） | ✅ 可中断 | 比较新旧 Fiber 树，计算需要更新的节点 |
| Commit 阶段 | 提交（Commit） | ❌ 不可中断 | 执行真实 DOM 更新和副作用 |

### 🧩 Render 阶段
1. 执行组件函数（生成新 Virtual DOM）；
2. Diff 新旧 Fiber 树；
3. 标记需要更新的节点（flags：Placement、Update、Deletion）。

### 🔒 Commit 阶段
1. 执行真实 DOM 更新；
2. 调用生命周期（componentDidMount / useEffect）；
3. 执行浏览器渲染。

---

## 三、Diff 算法与 Fiber 更新

React 在 Render 阶段会对新旧 Fiber 树进行比较（Reconciliation）。

### 示例
```jsx
<div>
  <h2>Title</h2>
  <p>{count}</p>
</div>
```

更新为：
```jsx
<div>
  <h2>Title</h2>
  <p>{count + 1}</p>
</div>
```

React 发现：
- `<h2>` 没变；
- `<p>` 文本变化；
➡ 只更新 `<p>`。

---

## 四、批处理机制（Batching）

### ✅ 概念
React 会将同一事件中多次 setState 合并为一次渲染，以提高性能。

### 💡 示例

```jsx
const handleClick = () => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
};
```
只渲染一次，最终 count = 3。

---

### ⚙️ 批处理规则

| React 版本 | 异步策略 | 说明 |
|-------------|-----------|------|
| React 17 及以前 | 事件中异步，Promise 中同步 | `setTimeout` 内不会合并 |
| React 18+ | 自动异步批处理 | 所有上下文合并渲染 |

---

### ✅ React 18 新特性
在异步场景中也自动批处理：

```js
setTimeout(() => {
  setCount(c => c + 1);
  setName('William');
});
```
React 18 只触发一次渲染 ✅。

---

## 五、setState 的异步原理

### 🧩 内部机制

`setState()` 不会立刻更新 state，而是放入更新队列（updateQueue）：

```js
fiber.updateQueue.push({
  payload: newState,
  lane: currentPriority,
});
```

React 在空闲时统一执行这些更新，确保一帧内只渲染一次。

### ⚠️ 常见误区
- 误以为 setState 是立即更新；
- 直接读取 state 得到旧值；
- 认为 React 总是异步（React17 以前部分同步）。

---

## 六、生命周期与 useEffect 的关系

| Class 组件 | Hook 组件 |
|-------------|------------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect` 返回清理函数 |

### 示例
```jsx
useEffect(() => {
  console.log('组件挂载');
  return () => console.log('组件卸载');
}, []);
```

---

## 七、性能优化策略

### 1️⃣ React.memo
避免子组件不必要的重新渲染。
```jsx
const Child = React.memo(({ value }) => <p>{value}</p>);
```

### 2️⃣ useMemo / useCallback
缓存计算值与函数引用。
```jsx
const data = useMemo(() => heavyCompute(), []);
const fn = useCallback(() => doSomething(), []);
```

### 3️⃣ Key 的使用
保证 Diff 正确匹配节点，避免重复构建。

### 4️⃣ 批处理更新
利用 React18 自动批处理减少渲染次数。

---

## 八、常见面试题与答题示例

### ❓1. React 的更新过程分哪两个阶段？
**答题思路：**
Render 阶段（计算变化，可中断） + Commit 阶段（真实更新，不可中断）。

### ❓2. setState 是同步还是异步？
**答题思路：**
React17：事件中异步，Promise 中同步；React18：统一异步批处理。

### ❓3. 为什么多次 setState 只触发一次渲染？
**答题思路：**
React 会合并同一事件中的多次更新，统一渲染。

### ❓4. useEffect 在哪一阶段执行？
**答题思路：**
Commit 阶段执行，异步副作用，不阻塞渲染。

### ❓5. 为什么 key 不能用 index？
**答题思路：**
key 标识节点身份，index 会导致 Diff 错误复用，状态错乱。

---

## 九、动手练习

**练习 1：**
创建组件，连续三次 setState，观察批处理行为。

**练习 2：**
使用 React DevTools Performance 分析 Render 和 Commit 时间。

---

## 🔚 小结

| 核心机制 | 关键点 | 面试关键词 |
|-----------|---------|-------------|
| setState 更新 | 异步 + 批处理 | 更新队列 |
| Render 阶段 | 可中断 | Reconciliation |
| Commit 阶段 | 不可中断 | DOM 更新 |
| Diff 算法 | 局部更新 | key 匹配 |
| 批处理机制 | 合并更新 | React18 自动化 |
| 性能优化 | 缓存 + 记忆化 | memo / useMemo / useCallback |
