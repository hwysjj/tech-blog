---
title: "Hook 原理与机制详解"
date: "2025-09-20"
tags: ["React", "Hooks", "原理", "面试"]
category: "技术教程"
author: "博主"
excerpt: "深入讲解 React Hooks 的设计思想、链表存储机制、useState/useEffect 原理、执行时机、性能优化 Hook，以及常见面试问题和自定义 Hook 实战。"
---

# 🧩 第 3 章：Hook 原理与机制（实战 + 面试版）

## 一、为什么会出现 Hook？

### ✅ 背景问题

React 16.8 以前，组件分两种：
- **类组件（Class Component）**：可以使用 state 和生命周期；
- **函数组件（Functional Component）**：只能接收 props，没有状态。

这导致两个问题：

1. **逻辑复用困难**
   - 不同组件想复用状态逻辑，只能用 HOC 或 Render Props；
   - 导致"嵌套地狱"。

2. **类组件太复杂**
   - this 指向容易出错；
   - 生命周期难以维护。

---

### 🚀 Hook 的出现
Hook 的设计目标是：
> "在函数组件中使用状态、生命周期和副作用逻辑。"

因此 React 提供了一系列内置 Hook，比如：
- `useState` —— 管理状态；
- `useEffect` —— 副作用；
- `useMemo` / `useCallback` —— 性能优化；
- `useRef` —— 引用 DOM 或保存可变值；
- `useContext` / `useReducer` —— 状态管理。

---

## 二、Hook 的核心设计思想

Hook 的本质是一个"状态记忆机制"。
React 内部会为每个组件维护一条 **Hook 链表（Linked List）**。

> 每次组件执行时，React 按照 Hook 调用的顺序，依次取出上一次保存的状态。

---

### 🧩 伪代码示例

```js
let workInProgressHook = fiber.memoizedState;

function useState(initialState) {
  const hook = workInProgressHook || { memoizedState: initialState };
  const setState = newState => {
    hook.memoizedState = newState;
    scheduleUpdateOnFiber(fiber);
  };
  workInProgressHook = hook.next;
  return [hook.memoizedState, setState];
}
```

🔍 可以看出：
- 每调用一次 `useState`，React 就在 Hook 链表上创建一个节点；
- 通过「调用顺序」识别每个 Hook 对应的状态；
- `setState` 更新状态并触发组件重新渲染。

---

## 三、Hook 链表结构（图解描述）

```
FiberNode(App)
   └── memoizedState → Hook1(useState)
                         ↓
                         Hook2(useEffect)
                         ↓
                         Hook3(useMemo)
```

每次函数组件执行时：
1. React 会从头遍历 Hook 链表；
2. 按相同顺序调用每个 Hook；
3. 如果 Hook 顺序不同（例如放在 if 里），状态会错位。

---

## 四、useState 原理详解

### ✅ 作用
在函数组件中声明一个响应式状态变量。

```jsx
const [count, setCount] = useState(0);
```

### 🔍 原理
React 在 fiber.memoizedState 中保存每个 Hook 的状态。
- `count` 保存当前状态；
- `setCount` 触发更新；
- 每次 render 时按调用顺序取值。

### ⚠️ 注意事项
- `setCount` 是异步批处理；
- 新旧 state 相同时不会触发渲染；
- 函数式更新 `setCount(c => c + 1)` 可以保证拿到最新值。

---

### 💡 示例：多次 setState 只渲染一次
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  };

  console.log("render:", count);
  return <button onClick={handleClick}>{count}</button>;
}
```

结果：
- 控制台打印一次；
- 最终 count = 3；
- 因为 React 会批量处理同一事件内的所有更新。

---

## 五、useEffect 原理与执行时机

### ✅ 基本作用
在函数组件中执行副作用逻辑（如 DOM 操作、数据请求、订阅等）。

```jsx
useEffect(() => {
  console.log("组件渲染或依赖变化");
  return () => console.log("组件卸载或依赖更新前");
}, [count]);
```

---

### 🧩 执行时机（非常重要）

| Hook | 执行时机 | 是否阻塞渲染 | 典型用途 |
|------|------------|----------------|------------|
| `useEffect` | 浏览器绘制后执行（异步） | ❌ 否 | 网络请求、事件绑定 |
| `useLayoutEffect` | DOM 更新后、绘制前执行（同步） | ✅ 是 | 计算布局、动画 |

---

### 🔍 React 内部处理流程

```js
const effect = {
  create,          // 副作用函数
  deps,            // 依赖数组
  destroy,         // 清理函数
  next             // 指向下一个 effect
};
fiber.updateQueue.lastEffect.next = effect;
```

渲染结束后，React 会在 **commit 阶段** 执行所有 `useEffect`。

---

### ⚠️ 常见陷阱

1️⃣ 忘记加依赖数组（死循环渲染）
```js
useEffect(() => {
  setCount(count + 1);
});
```

2️⃣ 加了错误的依赖（不稳定函数）
```js
useEffect(() => { ... }, [props.onChange]);
```
解决：用 `useCallback` 稳定函数引用。

---

## 六、useMemo 与 useCallback 原理

### ✅ useMemo
缓存计算结果，避免重复执行高开销逻辑。
```jsx
const value = useMemo(() => expensiveCalculation(a, b), [a, b]);
```
原理：React 记录上一次依赖数组 `[a, b]`，若没变化则复用旧值。

---

### ✅ useCallback
缓存函数引用，防止子组件不必要重渲染。
```jsx
const handleClick = useCallback(() => doSomething(id), [id]);
```
相当于：
```js
useMemo(() => () => doSomething(id), [id]);
```

---

## 七、Hook 的调用规则（必须记住）

1️⃣ 只能在函数组件或自定义 Hook 中调用；
2️⃣ 不能放在 if、for、或嵌套函数中；
3️⃣ 调用顺序在每次渲染中必须一致。

---

## 八、自定义 Hook（逻辑复用）

### ✅ 定义
自定义 Hook 是一个以 `use` 开头的函数，内部可以调用其他 Hook。

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}
```

### ✅ 使用
```jsx
function App() {
  const { w, h } = useWindowSize();
  return <p>窗口尺寸：{w} × {h}</p>;
}
```

---

## 九、常见面试题与答题思路

### ❓1. 为什么 Hook 不能放在条件语句中？
**答题思路：**
> React 是通过 Hook 调用顺序来匹配状态的。
> 如果顺序变化（例如某次跳过 useState），React 会取错状态。

### ❓2. setState 是同步还是异步的？
**答题思路：**
> React 18 之前：事件内是异步，Promise 中是同步。
> React 18 之后：所有上下文默认异步批处理。

### ❓3. useEffect 和 useLayoutEffect 的区别？
**答题思路：**
> useEffect 在渲染后异步执行，不阻塞 UI；
> useLayoutEffect 在渲染后同步执行，用于读取或修改 DOM。

### ❓4. useMemo 和 useCallback 的区别？
**答题思路：**
| Hook | 缓存内容 | 目的 |
|------|-----------|------|
| useMemo | 缓存计算结果 | 避免重复计算 |
| useCallback | 缓存函数引用 | 避免子组件重复渲染 |

---

## 🔚 小结

| Hook | 核心原理 | 面试关键词 |
|------|-----------|-------------|
| useState | Hook 链表存状态 | 调用顺序 |
| useEffect | 副作用异步执行 | Commit 阶段 |
| useMemo | 缓存结果 | 性能优化 |
| useCallback | 缓存函数 | 子组件优化 |
| 自定义 Hook | 封装复用逻辑 | 可维护性 |
