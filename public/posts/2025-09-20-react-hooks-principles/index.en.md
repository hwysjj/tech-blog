---
title: "React Hooks Principles and Mechanisms Explained"
date: "2025-09-20"
tags: ["React", "Hooks", "Principles", "Interview"]
category: "Technical Tutorial"
author: "Author"
excerpt: "In-depth explanation of React Hooks design philosophy, linked-list storage mechanism, useState/useEffect principles, execution timing, performance optimization Hooks, common interview questions, and custom Hooks practice."
---

# 🧩 Chapter 3: Hook Principles and Mechanisms (Practical + Interview Edition)

## 1. Why Were Hooks Introduced?

### ✅ Background Problems

Before React 16.8, there were two types of components:
- **Class Components**: Could use state and lifecycle methods
- **Functional Components**: Only received props, no state

This led to two problems:

1. **Difficult Logic Reuse**
   - Sharing stateful logic required HOCs or Render Props
   - Led to "wrapper hell"

2. **Class Components Too Complex**
   - `this` binding prone to errors
   - Lifecycle methods hard to maintain

---

### 🚀 The Emergence of Hooks
Hooks' design goal:
> "Enable state, lifecycle, and side-effect logic in functional components."

React provides built-in Hooks such as:
- `useState` — State management
- `useEffect` — Side effects
- `useMemo` / `useCallback` — Performance optimization
- `useRef` — DOM references or mutable values
- `useContext` / `useReducer` — State management

---

## 2. Core Design Philosophy of Hooks

Hooks are essentially a "state memory mechanism".
React maintains a **Hook linked list** internally for each component.

> Each time a component executes, React retrieves previously saved state in order of Hook calls.

---

### 🧩 Pseudocode Example

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

🔍 Key observations:
- Each `useState` call creates a node in the Hook linked list
- State is identified by "call order"
- `setState` updates state and triggers component re-render

---

## 3. Hook Linked List Structure (Diagram Description)

```
FiberNode(App)
   └── memoizedState → Hook1(useState)
                         ↓
                         Hook2(useEffect)
                         ↓
                         Hook3(useMemo)
```

Each time a function component executes:
1. React traverses the Hook linked list from the beginning
2. Calls each Hook in the same order
3. If Hook order differs (e.g., placed inside `if`), state gets misaligned

---

## 4. useState Principle Explained

### ✅ Purpose
Declare a reactive state variable in function components.

```jsx
const [count, setCount] = useState(0);
```

### 🔍 Principle
React saves each Hook's state in fiber.memoizedState.
- `count` stores current state
- `setCount` triggers update
- Each render retrieves value by call order

### ⚠️ Important Notes
- `setCount` is asynchronously batched
- No re-render if new state equals old state
- Functional update `setCount(c => c + 1)` ensures latest value

---

### 💡 Example: Multiple setState Calls Render Once
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

Result:
- Console logs once
- Final count = 3
- React batches all updates within the same event

---

## 5. useEffect Principle and Execution Timing

### ✅ Basic Purpose
Execute side-effect logic (DOM operations, data fetching, subscriptions, etc.) in function components.

```jsx
useEffect(() => {
  console.log("Component rendered or dependency changed");
  return () => console.log("Before unmount or dependency update");
}, [count]);
```

---

### 🧩 Execution Timing (Very Important)

| Hook | Execution Timing | Blocks Rendering | Typical Use |
|------|------------------|------------------|-------------|
| `useEffect` | After browser paint (async) | ❌ No | Network requests, event binding |
| `useLayoutEffect` | After DOM update, before paint (sync) | ✅ Yes | Layout calculations, animations |

---

### 🔍 React Internal Processing Flow

```js
const effect = {
  create,          // Side effect function
  deps,            // Dependency array
  destroy,         // Cleanup function
  next             // Pointer to next effect
};
fiber.updateQueue.lastEffect.next = effect;
```

After rendering completes, React executes all `useEffect` in the **commit phase**.

---

### ⚠️ Common Pitfalls

1️⃣ Forgetting dependency array (infinite render loop)
```js
useEffect(() => {
  setCount(count + 1);
});
```

2️⃣ Wrong dependencies (unstable functions)
```js
useEffect(() => { ... }, [props.onChange]);
```
Solution: Use `useCallback` to stabilize function references.

---

## 6. useMemo and useCallback Principles

### ✅ useMemo
Cache computation results to avoid repeated expensive calculations.
```jsx
const value = useMemo(() => expensiveCalculation(a, b), [a, b]);
```
Principle: React records previous dependency array `[a, b]`, reuses old value if unchanged.

---

### ✅ useCallback
Cache function references to prevent unnecessary child component re-renders.
```jsx
const handleClick = useCallback(() => doSomething(id), [id]);
```
Equivalent to:
```js
useMemo(() => () => doSomething(id), [id]);
```

---

## 7. Hook Calling Rules (Must Remember)

1️⃣ Only call in function components or custom Hooks
2️⃣ Don't place in if, for, or nested functions
3️⃣ Call order must be consistent across renders

---

## 8. Custom Hooks (Logic Reuse)

### ✅ Definition
A custom Hook is a function starting with `use` that can call other Hooks internally.

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

### ✅ Usage
```jsx
function App() {
  const { w, h } = useWindowSize();
  return <p>Window size: {w} × {h}</p>;
}
```

---

## 9. Common Interview Questions and Answer Strategies

### ❓1. Why Can't Hooks Be Placed in Conditional Statements?
**Answer Strategy:**
> React matches state by Hook call order.
> If order changes (e.g., skipping useState in some renders), React retrieves wrong state.

### ❓2. Is setState Synchronous or Asynchronous?
**Answer Strategy:**
> Before React 18: Async in events, sync in Promises.
> After React 18: All contexts default to async batching.

### ❓3. Difference Between useEffect and useLayoutEffect?
**Answer Strategy:**
> useEffect executes asynchronously after render, doesn't block UI.
> useLayoutEffect executes synchronously after render, used for reading/modifying DOM.

### ❓4. Difference Between useMemo and useCallback?
**Answer Strategy:**
| Hook | Caches | Purpose |
|------|--------|---------|
| useMemo | Computation result | Avoid repeated calculations |
| useCallback | Function reference | Avoid child re-renders |

---

## 🔚 Summary

| Hook | Core Principle | Interview Keywords |
|------|----------------|-------------------|
| useState | Hook linked list stores state | Call order |
| useEffect | Side effects execute async | Commit phase |
| useMemo | Cache results | Performance optimization |
| useCallback | Cache functions | Child optimization |
| Custom Hooks | Encapsulate reusable logic | Maintainability |
