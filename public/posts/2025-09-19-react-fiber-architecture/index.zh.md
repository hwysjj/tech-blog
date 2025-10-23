---
title: "Fiber 架构与渲染机制详解"
date: "2025-09-19"
tags: ["React", "Fiber", "架构", "性能优化"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 React Fiber 架构，从问题背景到核心机制，详解可中断渲染、优先级调度、两阶段渲染等核心概念，附带面试题和实践练习。"
---

# 🧩 第 2 章：Fiber 架构与渲染机制（深入理解 + 图解）

## 一、为什么要引入 Fiber 架构？

### ✅ 背景问题
React 15 及以前使用的是"Stack Reconciler"（递归更新）：

```js
renderComponent(App);
// 内部会递归执行所有子组件的 render
```

问题是：
> JavaScript 是单线程的，如果组件树很大，长时间的递归更新会阻塞浏览器渲染和用户交互。

表现为：
- 页面卡顿；
- 输入延迟；
- 动画掉帧。

---

### 🚀 解决方案
React 16 引入 **Fiber 架构**，其目标是：
- **可中断渲染**：渲染可以暂停、恢复或取消；
- **分片更新**：将任务拆成小块执行；
- **优先级调度**：高优先级任务可打断低优先级渲染；
- **时间切片（Time Slicing）**：利用浏览器空闲时间继续执行剩余任务。

---

## 二、什么是 Fiber？

**Fiber 是 React 内部用来表示组件的一种数据结构。**
它本质上是一个链表结构的工作单元（Work Unit），记录每个组件节点的状态信息。

### 🧩 一个 Fiber 节点包含的信息：

```js
{
  type,             // 组件类型，如 div / App
  key,              // key 属性（用于 diff）
  stateNode,        // 对应的 DOM 节点或组件实例
  child,            // 第一个子 Fiber
  sibling,          // 下一个兄弟 Fiber
  return,           // 父 Fiber
  pendingProps,     // 新的 props
  memoizedProps,    // 上一次的 props
  memoizedState,    // 上一次的 state
  flags,            // 副作用标记（需要更新、删除等）
  lanes             // 优先级（React 18 引入）
}
```

每个 Fiber 对应组件树中的一个节点。
它的结构设计使得 React 可以"中断后从当前位置继续执行"。

---

## 三、Fiber 的核心机制：可中断渲染

传统递归方式：
```text
App
 ├─ Header
 ├─ Content
 │   ├─ List
 │   └─ Item
 └─ Footer
```
如果渲染到一半浏览器需要绘制屏幕，React 无法中断，会一直卡。

而 Fiber 机制是"链表遍历 + 分阶段执行"：

```
FiberNode(App)
   ↓
FiberNode(Header)
   ↓
FiberNode(Content)
   ↓
FiberNode(List)
   ↓
FiberNode(Item)
```

每次执行一个 Fiber，React 检查：
> "当前帧是否还有剩余时间？"
> "是否有更高优先级任务？"

- 如果没有时间：暂停；
- 如果有更高优先级任务：中断当前任务；
- 完成后继续从上次的 Fiber 位置恢复。

---

## 四、Fiber 的两个阶段

React 的渲染过程被拆分为两大阶段：

| 阶段 | 名称 | 是否可中断 | 主要任务 |
|------|------|-------------|-----------|
| 1️⃣ Render 阶段 | Reconciliation（调和） | ✅ 可中断 | 生成新的 Fiber 树，计算差异 |
| 2️⃣ Commit 阶段 | Commit | ❌ 不可中断 | 把变化真正更新到 DOM |

### 🔄 Render 阶段流程
1. 比较新旧 Virtual DOM；
2. 生成新的 Fiber 树；
3. 标记需要更新的节点（flags）。

### 🔒 Commit 阶段流程
1. React 提交所有变化；
2. 执行 DOM 更新；
3. 调用生命周期（componentDidMount / useEffect）。

---

## 五、示例对比：Fiber 让渲染更流畅

### 传统递归方式（React 15）：
```js
for (let i = 0; i < 10000; i++) {
  renderHeavyComponent(i);
}
```
➡ 浏览器主线程长时间被占用，UI 停顿。

### Fiber 分片渲染（React 16+）：
```js
requestIdleCallback(workLoop);

function workLoop(deadline) {
  while (deadline.timeRemaining() > 0 && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  }
}
```
➡ React 会在浏览器空闲时继续执行，用户交互始终流畅。

---

## 六、Fiber 与优先级调度（Scheduler）

React 内部有一个调度系统，用来管理不同任务的优先级。
在 React 18 中，这部分被称为 **Lane 模型**。

| 优先级 | 场景示例 |
|---------|-----------|
| 高优先级 | 用户输入、点击事件 |
| 中优先级 | 动画、过渡效果 |
| 低优先级 | 网络请求后渲染、后台更新 |

React 会根据优先级决定是否中断当前渲染任务。
例如：
用户在输入框中打字时，React 会暂停后台渲染，优先更新输入内容。

---

## 七、图解：Fiber 的工作流（描述版）

```
用户触发更新（setState）
        ↓
React 生成更新任务
        ↓
进入 Render 阶段（Fiber 构建）
        ↓
若有更高优先级任务 → 中断
        ↓
继续执行剩余 Fiber
        ↓
Render 阶段完成 → Commit 阶段
        ↓
更新真实 DOM + 执行副作用
```

---

## 八、常见面试题与答题思路

### ❓1. Fiber 是什么？
**答题思路：**
> Fiber 是 React 16 引入的一种数据结构和协调机制，用来实现可中断、可恢复、可优先级调度的渲染。每个组件对应一个 Fiber 节点，构成链表结构的 Fiber 树。

### ❓2. React 为什么要引入 Fiber？
**答题思路：**
> 因为旧版 React 的递归更新是同步的，任务一旦开始无法中断，会阻塞主线程。
> Fiber 通过任务切片、优先级调度和中断恢复机制，实现了流畅的异步渲染。

### ❓3. Fiber 有哪两个阶段？区别是什么？
**答题思路：**
| 阶段 | 可中断 | 作用 |
|------|----------|------|
| Render 阶段 | ✅ 可中断 | 构建 Fiber 树、计算差异 |
| Commit 阶段 | ❌ 不可中断 | 更新真实 DOM、执行副作用 |

### ❓4. Fiber 是如何实现中断恢复的？
**答题思路：**
> React 将组件树转化为 Fiber 链表，每次只处理一个 Fiber 单元。
> 每个 Fiber 保存 return 指针，可以在中断后继续从上次的位置恢复执行。

---

## 九、动手练习

**练习 1：**
写一个包含 1 万个节点的列表组件，在 React 15 与 React 18 中对比输入响应速度。

**练习 2：**
打开 Chrome DevTools → Performance → 观察 Fiber 的分段执行时间（React18 会出现空闲切片）。

---

## 🔚 小结

| 核心点 | 理解重点 |
|---------|----------|
| Fiber 是 React 的执行单元 | 每个组件对应一个 Fiber 节点 |
| Render 阶段可中断 | Commit 阶段必须完整执行 |
| 支持优先级调度 | 高优先级任务可打断低优先级渲染 |
| 解决 React15 卡顿问题 | 实现异步可恢复渲染 |
