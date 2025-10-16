---
title: "Fiber Architecture and Rendering Mechanism Explained"
date: "2025-10-19"
tags: ["React", "Fiber", "Architecture", "Performance"]
category: "Technical Tutorial"
author: "Author"
excerpt: "Deep dive into React Fiber architecture, from problem background to core mechanisms, explaining interruptible rendering, priority scheduling, two-phase rendering, with interview questions and practical exercises."
---

# 🧩 Chapter 2: Fiber Architecture and Rendering Mechanism (In-depth + Illustrated)

## 1. Why Introduce Fiber Architecture?

### ✅ Background Problem
React 15 and earlier used "Stack Reconciler" (recursive updates):

```js
renderComponent(App);
// Internally recursively executes all child component renders
```

The problem is:
> JavaScript is single-threaded. If the component tree is large, long recursive updates block browser rendering and user interaction.

Manifested as:
- Page stuttering
- Input delays
- Animation frame drops

---

### 🚀 Solution
React 16 introduced **Fiber Architecture**, with goals to:
- **Interruptible Rendering**: Rendering can be paused, resumed, or canceled
- **Chunked Updates**: Break tasks into small pieces
- **Priority Scheduling**: High-priority tasks can interrupt low-priority rendering
- **Time Slicing**: Use browser idle time to continue remaining tasks

---

## 2. What is Fiber?

**Fiber is a data structure used internally by React to represent components.**
It's essentially a linked-list work unit that records state information for each component node.

### 🧩 Information contained in a Fiber node:

```js
{
  type,             // Component type, e.g., div / App
  key,              // key property (for diff)
  stateNode,        // Corresponding DOM node or component instance
  child,            // First child Fiber
  sibling,          // Next sibling Fiber
  return,           // Parent Fiber
  pendingProps,     // New props
  memoizedProps,    // Previous props
  memoizedState,    // Previous state
  flags,            // Side effect flags (needs update, deletion, etc.)
  lanes             // Priority (introduced in React 18)
}
```

Each Fiber corresponds to a node in the component tree.
Its structure design allows React to "resume from current position after interruption".

---

## 3. Fiber's Core Mechanism: Interruptible Rendering

Traditional recursive approach:
```text
App
 ├─ Header
 ├─ Content
 │   ├─ List
 │   └─ Item
 └─ Footer
```
If the browser needs to paint the screen mid-render, React can't interrupt and will freeze.

Fiber mechanism uses "linked-list traversal + staged execution":

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

Each time processing one Fiber, React checks:
> "Is there remaining time in the current frame?"
> "Is there a higher priority task?"

- If no time: pause
- If higher priority task: interrupt current task
- When done, continue from previous Fiber position

---

## 4. Fiber's Two Phases

React's rendering process is split into two major phases:

| Phase | Name | Interruptible | Main Task |
|-------|------|---------------|-----------|
| 1️⃣ Render Phase | Reconciliation | ✅ Yes | Generate new Fiber tree, calculate differences |
| 2️⃣ Commit Phase | Commit | ❌ No | Actually update changes to DOM |

### 🔄 Render Phase Flow
1. Compare old and new Virtual DOM
2. Generate new Fiber tree
3. Mark nodes that need updates (flags)

### 🔒 Commit Phase Flow
1. React commits all changes
2. Execute DOM updates
3. Call lifecycle methods (componentDidMount / useEffect)

---

## 5. Example Comparison: Fiber Makes Rendering Smoother

### Traditional Recursive Approach (React 15):
```js
for (let i = 0; i < 10000; i++) {
  renderHeavyComponent(i);
}
```
➡ Browser main thread occupied for long time, UI freezes.

### Fiber Chunked Rendering (React 16+):
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
➡ React continues execution during browser idle time, user interaction remains smooth.

---

## 6. Fiber and Priority Scheduling (Scheduler)

React has an internal scheduling system to manage task priorities.
In React 18, this is called the **Lane Model**.

| Priority | Example Scenarios |
|----------|-------------------|
| High Priority | User input, click events |
| Medium Priority | Animations, transitions |
| Low Priority | Post-network-request rendering, background updates |

React decides whether to interrupt current rendering based on priority.
For example:
When user types in an input field, React pauses background rendering to prioritize input updates.

---

## 7. Diagram: Fiber Workflow (Description)

```
User Triggers Update (setState)
        ↓
React Generates Update Task
        ↓
Enter Render Phase (Fiber Building)
        ↓
If Higher Priority Task → Interrupt
        ↓
Continue Remaining Fiber
        ↓
Render Phase Complete → Commit Phase
        ↓
Update Real DOM + Execute Side Effects
```

---

## 8. Common Interview Questions and Answer Strategies

### ❓1. What is Fiber?
**Answer Strategy:**
> Fiber is a data structure and reconciliation mechanism introduced in React 16 to enable interruptible, resumable, priority-scheduled rendering. Each component corresponds to a Fiber node, forming a linked-list Fiber tree.

### ❓2. Why Did React Introduce Fiber?
**Answer Strategy:**
> Because old React's recursive updates were synchronous and couldn't be interrupted once started, blocking the main thread.
> Fiber achieves smooth asynchronous rendering through task chunking, priority scheduling, and interrupt-resume mechanisms.

### ❓3. What Are Fiber's Two Phases? What's the Difference?
**Answer Strategy:**
| Phase | Interruptible | Purpose |
|-------|---------------|---------|
| Render Phase | ✅ Yes | Build Fiber tree, calculate differences |
| Commit Phase | ❌ No | Update real DOM, execute side effects |

### ❓4. How Does Fiber Implement Interrupt-Resume?
**Answer Strategy:**
> React converts the component tree into a Fiber linked list, processing only one Fiber unit at a time.
> Each Fiber saves a return pointer, allowing resumption from the last position after interruption.

---

## 9. Hands-on Practice

**Exercise 1:**
Write a list component with 10,000 nodes, compare input responsiveness between React 15 and React 18.

**Exercise 2:**
Open Chrome DevTools → Performance → Observe Fiber's segmented execution time (React 18 will show idle slices).

---

## 🔚 Summary

| Key Point | Understanding Focus |
|-----------|---------------------|
| Fiber is React's execution unit | Each component corresponds to a Fiber node |
| Render phase is interruptible | Commit phase must execute completely |
| Supports priority scheduling | High-priority tasks can interrupt low-priority rendering |
| Solves React 15 stuttering | Achieves async resumable rendering |
