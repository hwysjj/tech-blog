---
title: "React Hooks 完全指南"
date: "2024-01-10"
tags: ["React", "Hooks", "前端开发"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 React Hooks，包括 useState、useEffect、useContext 等核心 Hooks 的使用方法和最佳实践。"
---

# React Hooks 完全指南

React Hooks 是 React 16.8 引入的新特性，它让你可以在不编写 class 的情况下使用 state 和其他 React 特性。

## 什么是 Hooks？

Hooks 是一些可以让你在函数组件里"钩入" React state 及生命周期等特性的函数。

### 为什么使用 Hooks？

1. **代码复用** - 更容易复用状态逻辑
2. **简化组件** - 避免复杂的 class 组件
3. **逻辑分离** - 相关逻辑可以放在一起

## 常用 Hooks

### 1. useState

\`useState\` 是最基本的 Hook，用于在函数组件中添加 state。

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### 2. useEffect

\`useEffect\` 用于在函数组件中执行副作用操作。

\`\`\`javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // 空数组表示只在组件挂载时执行

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
\`\`\`

### 3. useContext

\`useContext\` 让你可以订阅 React 的 Context。

\`\`\`javascript
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background }}>
      Themed Button
    </button>
  );
}
\`\`\`

### 4. useReducer

\`useReducer\` 是 \`useState\` 的替代方案，适用于复杂的 state 逻辑。

\`\`\`javascript
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
\`\`\`

## 自定义 Hooks

你可以创建自己的 Hooks 来复用组件逻辑。

\`\`\`javascript
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 使用自定义 Hook
function MyComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
\`\`\`

## Hooks 使用规则

1. **只在最顶层使用 Hooks** - 不要在循环、条件或嵌套函数中调用
2. **只在 React 函数中调用 Hooks** - 不要在普通的 JavaScript 函数中调用

## 最佳实践

### 1. 合理拆分 useEffect

将不相关的逻辑拆分到不同的 \`useEffect\` 中：

\`\`\`javascript
// ❌ 不推荐
useEffect(() => {
  // 数据获取
  fetchData();
  // 事件监听
  window.addEventListener('resize', handleResize);
}, []);

// ✅ 推荐
useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
\`\`\`

### 2. 正确设置依赖项

确保 \`useEffect\` 的依赖数组包含所有使用的外部变量：

\`\`\`javascript
function Example({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // 依赖 userId

  return <div>{user?.name}</div>;
}
\`\`\`

### 3. 使用 useCallback 和 useMemo 优化性能

\`\`\`javascript
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data, onUpdate }) {
  // 缓存计算结果
  const processedData = useMemo(() => {
    return data.map(item => /* 复杂计算 */ item);
  }, [data]);

  // 缓存回调函数
  const handleClick = useCallback(() => {
    onUpdate(processedData);
  }, [processedData, onUpdate]);

  return <button onClick={handleClick}>Update</button>;
}
\`\`\`

## 总结

React Hooks 让函数组件变得更加强大和灵活。通过合理使用 Hooks，我们可以：

- 编写更简洁的代码
- 更好地复用逻辑
- 更容易理解和维护

掌握 Hooks 是成为 React 开发者的必经之路！
