---
title: "Complete Guide to React Hooks"
date: "2024-01-10"
tags: ["React", "Hooks", "Frontend"]
category: "Tutorial"
author: "Author"
excerpt: "Deep dive into React Hooks, including usage methods and best practices for core Hooks like useState, useEffect, and useContext."
---

# Complete Guide to React Hooks

React Hooks were introduced in React 16.8, allowing you to use state and other React features without writing a class.

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components.

### Why Use Hooks?

1. **Code Reuse** - Easier to reuse stateful logic
2. **Simplified Components** - Avoid complex class components
3. **Logic Separation** - Related logic can be kept together

## Common Hooks

### 1. useState

`useState` is the most basic Hook for adding state to function components.

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

`useEffect` is used for performing side effects in function components.

\`\`\`javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array means execute only on mount

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
\`\`\`

### 3. useContext

`useContext` lets you subscribe to React Context.

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

`useReducer` is an alternative to `useState` for complex state logic.

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

## Custom Hooks

You can create your own Hooks to reuse component logic.

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

// Using custom Hook
function MyComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
\`\`\`

## Rules of Hooks

1. **Only Call Hooks at the Top Level** - Don't call Hooks inside loops, conditions, or nested functions
2. **Only Call Hooks from React Functions** - Don't call Hooks from regular JavaScript functions

## Best Practices

### 1. Split useEffect Appropriately

Separate unrelated logic into different `useEffect` calls:

\`\`\`javascript
// ❌ Not recommended
useEffect(() => {
  // Data fetching
  fetchData();
  // Event listener
  window.addEventListener('resize', handleResize);
}, []);

// ✅ Recommended
useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
\`\`\`

### 2. Set Dependencies Correctly

Ensure `useEffect` dependency array includes all external variables used:

\`\`\`javascript
function Example({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Depends on userId

  return <div>{user?.name}</div>;
}
\`\`\`

### 3. Use useCallback and useMemo for Performance

\`\`\`javascript
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data, onUpdate }) {
  // Cache computed result
  const processedData = useMemo(() => {
    return data.map(item => /* complex calculation */ item);
  }, [data]);

  // Cache callback function
  const handleClick = useCallback(() => {
    onUpdate(processedData);
  }, [processedData, onUpdate]);

  return <button onClick={handleClick}>Update</button>;
}
\`\`\`

## Conclusion

React Hooks make function components more powerful and flexible. By using Hooks properly, we can:

- Write more concise code
- Better reuse logic
- Easier to understand and maintain

Mastering Hooks is essential for becoming a React developer!
