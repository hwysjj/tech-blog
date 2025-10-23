---
title: "React Rendering and Update Mechanism Explained"
date: "2025-09-21"
tags: ["React", "Rendering", "setState", "Batching"]
category: "Technical Tutorial"
author: "Author"
excerpt: "In-depth explanation of React's complete flow from setState to page update, including two-phase rendering, Diff algorithm, batching mechanism, lifecycle vs useEffect, performance optimization strategies, and high-frequency interview questions."
---

# 🧩 Chapter 4: Rendering and Update Mechanism (setState, Diff, Batching, Lifecycle)

## 1. Complete Flow from setState to Page Update

### ✅ Background
Calling setState doesn't immediately update the DOM. React goes through a complete asynchronous scheduling process internally.

---

### 🔍 Flow Overview

```
User Interaction (onClick)
       ↓
Call setState()
       ↓
React Schedules Update Task (scheduleUpdate)
       ↓
Render Phase: Calculate New Fiber Tree (Diff)
       ↓
Commit Phase: Update Real DOM
       ↓
Browser Paint (repaint)
```

---

### 💡 Code Example

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

Print result:
```
render 0
render 1
```
Even though `setCount` was called three times, only one render is triggered.

---

## 2. React's Two Major Phases

| Phase | Name | Interruptible | Main Task |
|-------|------|---------------|-----------|
| Render Phase | Reconciliation | ✅ Yes | Compare old and new Fiber trees, calculate nodes to update |
| Commit Phase | Commit | ❌ No | Execute real DOM updates and side effects |

### 🧩 Render Phase
1. Execute component function (generate new Virtual DOM)
2. Diff old and new Fiber trees
3. Mark nodes that need updates (flags: Placement, Update, Deletion)

### 🔒 Commit Phase
1. Execute real DOM updates
2. Call lifecycle methods (componentDidMount / useEffect)
3. Execute browser rendering

---

## 3. Diff Algorithm and Fiber Updates

React compares old and new Fiber trees during the Render phase (Reconciliation).

### Example
```jsx
<div>
  <h2>Title</h2>
  <p>{count}</p>
</div>
```

Updates to:
```jsx
<div>
  <h2>Title</h2>
  <p>{count + 1}</p>
</div>
```

React discovers:
- `<h2>` unchanged
- `<p>` text changed
➡ Only updates `<p>`

---

## 4. Batching Mechanism

### ✅ Concept
React merges multiple setState calls within the same event into one render for better performance.

### 💡 Example

```jsx
const handleClick = () => {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
};
```
Renders only once, final count = 3.

---

### ⚙️ Batching Rules

| React Version | Async Strategy | Notes |
|---------------|----------------|-------|
| React 17 and earlier | Async in events, sync in Promises | No batching in `setTimeout` |
| React 18+ | Automatic async batching | All contexts batch renders |

---

### ✅ React 18 New Feature
Automatic batching in async scenarios:

```js
setTimeout(() => {
  setCount(c => c + 1);
  setName('William');
});
```
React 18 triggers only one render ✅.

---

## 5. Async Principle of setState

### 🧩 Internal Mechanism

`setState()` doesn't update state immediately, but adds to update queue (updateQueue):

```js
fiber.updateQueue.push({
  payload: newState,
  lane: currentPriority,
});
```

React executes these updates during idle time, ensuring only one render per frame.

### ⚠️ Common Misconceptions
- Thinking setState updates immediately
- Reading state directly and getting old value
- Believing React is always async (React17 was partially sync)

---

## 6. Lifecycle vs useEffect Relationship

| Class Component | Hook Component |
|-----------------|----------------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect` return cleanup function |

### Example
```jsx
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);
```

---

## 7. Performance Optimization Strategies

### 1️⃣ React.memo
Prevent unnecessary child component re-renders.
```jsx
const Child = React.memo(({ value }) => <p>{value}</p>);
```

### 2️⃣ useMemo / useCallback
Cache computed values and function references.
```jsx
const data = useMemo(() => heavyCompute(), []);
const fn = useCallback(() => doSomething(), []);
```

### 3️⃣ Key Usage
Ensure Diff correctly matches nodes, avoid redundant rebuilds.

### 4️⃣ Batch Updates
Leverage React 18's automatic batching to reduce render count.

---

## 8. Common Interview Questions and Answer Examples

### ❓1. What Are React's Two Update Phases?
**Answer Strategy:**
Render phase (calculate changes, interruptible) + Commit phase (real updates, not interruptible).

### ❓2. Is setState Synchronous or Asynchronous?
**Answer Strategy:**
React17: Async in events, sync in Promises; React18: Unified async batching.

### ❓3. Why Do Multiple setState Calls Trigger Only One Render?
**Answer Strategy:**
React batches multiple updates within the same event for unified rendering.

### ❓4. In Which Phase Does useEffect Execute?
**Answer Strategy:**
Commit phase, async side effects, doesn't block rendering.

### ❓5. Why Can't We Use Index as Key?
**Answer Strategy:**
Key identifies node identity, index causes Diff to incorrectly reuse nodes, leading to state confusion.

---

## 9. Hands-on Practice

**Exercise 1:**
Create a component, call setState three times consecutively, observe batching behavior.

**Exercise 2:**
Use React DevTools Performance to analyze Render and Commit time.

---

## 🔚 Summary

| Core Mechanism | Key Point | Interview Keywords |
|----------------|-----------|-------------------|
| setState Update | Async + Batching | Update queue |
| Render Phase | Interruptible | Reconciliation |
| Commit Phase | Not interruptible | DOM updates |
| Diff Algorithm | Partial updates | Key matching |
| Batching | Merge updates | React18 automation |
| Performance Optimization | Caching + Memoization | memo / useMemo / useCallback |
