---
title: "React 18 Concurrent Features and Scheduler System"
date: "2025-10-23"
tags: ["React", "Concurrent Mode", "Scheduler", "React 18"]
category: "Technical Tutorial"
author: "Author"
excerpt: "In-depth explanation of React 18 concurrent rendering principles, Scheduler system, Lane priority model, time slicing mechanism, and usage scenarios for startTransition and useDeferredValue with high-frequency interview questions."
---

# 🧩 Chapter 6: React 18 Concurrent Features and Scheduler System (Concurrent Mode + Scheduler)

## 1. Why Do We Need Concurrent Rendering?

### ✅ Background

React 15 / 16 rendering was synchronous:
> Once an update starts, it must complete in one go.

If rendering takes too long, it causes:
- Main thread blocking
- Page stuttering
- User input delays

---

### 💡 Example (Traditional Mode)

```jsx
function HeavyComponent() {
  const items = Array(10000).fill(0);
  return <ul>{items.map((_, i) => <li key={i}>Item {i}</li>)}</ul>;
}
```

When clicking a button to render this component, the browser may be unresponsive for hundreds of milliseconds.
👉 Because JavaScript blocks rendering.

---

## 2. React 18's Solution: Concurrent Rendering

React 18 introduces "concurrent features",
with the core goal of making rendering tasks interruptible, resumable, and prioritizable.

---

### 🧠 Principle
React splits the rendering process into small tasks (Fiber nodes),
then uses the **Scheduler** and **time slicing mechanism** to decide:
> "Which task should be rendered now?"

---

### 🧩 Working Mechanism Diagram (Description)

```
[User Action] → [React Creates Update Task]
                 ↓
      [Scheduler System Assigns Priority]
                 ↓
       [Fiber Executes Render: Process Small Chunks]
                 ↓
     [If Higher Priority Task → Pause Current Task]
                 ↓
       [Resume Unfinished Rendering After Completion]
                 ↓
          [Unified Commit to DOM]
```

---

## 3. React Scheduler System

React introduced a lightweight scheduler internally,
to decide which task executes first and which can be deferred.

### ⚙️ Task Priority (Lanes Model)

| Priority | Scenario | Delay Tolerance |
|----------|----------|-----------------|
| ImmediateLane | User interaction (click) | 0ms |
| TransitionLane | Page transitions, async data | 100~200ms |
| DefaultLane | Normal rendering | 250ms |
| IdleLane | Background tasks | Unlimited |

---

### 💡 Simplified Understanding

React automatically assigns priority based on "task type".
For example:
```jsx
startTransition(() => {
  setPage("Profile");
});
```
`startTransition` tells React:
> "This update isn't urgent, can be deferred."

---

## 4. Time Slicing

React uses browser mechanisms like `requestIdleCallback` / `MessageChannel`
to implement "time slicing":
> Continue rendering next Fiber during browser idle time.

### ⏱️ Example (Pseudocode)

```js
while (deadline.timeRemaining() > 0 && nextUnitOfWork) {
  nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
}
```

- `deadline.timeRemaining()`: Current frame remaining time
- Pause task if insufficient time
- Resume during next idle period

React maintains smooth interactions this way.

---

## 5. Two Key Hooks in React 18

### 1️⃣ startTransition — Mark Low Priority Updates

```jsx
import { startTransition } from "react";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      // Simulate slow rendering task
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

**Explanation:**
- `setQuery` is urgent task (user input)
- `setResult` is low priority task
- User input won't stutter

---

### 2️⃣ useDeferredValue — Defer Computed Results

```jsx
const deferredValue = useDeferredValue(query);
const filtered = useMemo(() => filterList(deferredValue), [deferredValue]);
```

**Principle:**
React defers updating low-priority values, prioritizing smooth interaction.

---

## 6. Advantages of Concurrent Mode

| Advantage | Description |
|-----------|-------------|
| Smooth Interaction | User input not blocked |
| Controllable Priority | Important tasks execute first |
| Automatic Scheduling | Tasks interruptible, resumable |
| Natural UI Transitions | Supports partial rendering, async loading |

---

## 7. Common Interview Questions and Answer Strategies

### ❓1. What Problem Does React 18's Concurrent Rendering Solve?
**Answer Strategy:**
> Solves synchronous rendering blocking main thread;
> Achieves interruptible, resumable async rendering via Fiber + Scheduler;
> Improves page smoothness.

---

### ❓2. Difference Between startTransition and useDeferredValue?
| API | Purpose | Scenario |
|-----|---------|----------|
| startTransition | Wrap update tasks | Mark low-priority state updates |
| useDeferredValue | Defer computed values | Optimize UI dependent on expensive calculations |

---

### ❓3. How Does React Implement Task Interruption and Resumption?
**Answer Strategy:**
> Fiber architecture converts component tree to linked list;
> Processes only one small unit (Work Unit) at a time;
> Resumes unfinished tasks during idle time.

---

### ❓4. Why Can Fiber Support Time Slicing?
**Answer Strategy:**
> Because Fiber is an interruptible work unit;
> Each Fiber saves return pointer;
> Can resume from interruption point.

---

### ❓5. Biggest Difference Between Concurrent and Traditional Mode?
| Comparison | Traditional Mode | Concurrent Mode |
|------------|------------------|-----------------|
| Render Method | Sync, all at once | Interruptible, async |
| Performance | Prone to stuttering | Smoother |
| Scheduling System | None | Scheduler |
| Code Changes | No modification needed | Can explicitly mark task priority |

---

## 8. Hands-on Practice

1️⃣ Use `startTransition` to wrap large state update tasks, observe performance changes.
2️⃣ Compare `useDeferredValue` vs normal `useEffect` update delay behavior.
3️⃣ Open Chrome Performance to view task slicing execution.

---

## 🔚 Summary

| Core Mechanism | Function | Interview Keywords |
|----------------|----------|-------------------|
| Fiber | Chunked render units | Interruptible, resumable |
| Scheduler | Task scheduler | Priority scheduling |
| Time Slicing | Idle execution mechanism | requestIdleCallback |
| startTransition | Mark low-priority tasks | Concurrent updates |
| useDeferredValue | Defer value updates | Smooth interaction |
| Lane Model | Multi-priority control | Render scheduling system |
