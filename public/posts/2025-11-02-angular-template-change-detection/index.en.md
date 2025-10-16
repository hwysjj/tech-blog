---
title: "Template Syntax and Change Detection Mechanism"
date: "2025-11-02"
tags: ["Angular", "Template Syntax", "Change Detection", "Zone.js", "ChangeDetectionStrategy", "OnPush"]
category: "Technical Tutorial"
author: "Author"
excerpt: "Deep dive into Angular template syntax and change detection core mechanisms, including interpolation binding, property binding, event binding, two-way binding, Zone.js async task interception, Ivy incremental detection, ChangeDetectionStrategy optimization strategies, ChangeDetectorRef manual control, and performance optimization techniques."
---

# 🧩 Chapter 2: Template Syntax and Change Detection Mechanism

## 1. Template Syntax Overview

Angular's template syntax is the core of **declarative UI**.
It allows developers to control data and DOM binding through HTML + special markers.

---

## 2. Template Binding Types

| Type | Syntax | Function | Example |
|------|--------|----------|---------|
| Interpolation Binding | `{{ value }}` | One-way data display | `<h1>{{ title }}</h1>` |
| Property Binding | `[property]="value"` | Set DOM properties | `<img [src]="imageUrl">` |
| Event Binding | `(event)="handler()"` | Bind event response | `<button (click)="onClick()">Click</button>` |
| Two-way Binding | `[(ngModel)]="value"` | Data bidirectional sync | `<input [(ngModel)]="username">` |

---

## 3. Angular Data Flow Mechanism

Component data flow in Angular is **unidirectional (parent → child)**,
but through two-way binding (`[(ngModel)]`), "syntactic sugar synchronization" can be achieved at the template layer.

```ts
@Component({
  selector: 'app-input-demo',
  template: `
    <input [(ngModel)]="name">
    <p>Hello {{ name }}</p>
  `
})
export class InputDemoComponent {
  name = 'William';
}
```

Template changes → Update component properties → Trigger change detection → Re-render view.

---

## 4. Change Detection Mechanism

### 1️⃣ Background

Angular's Change Detection is the core mechanism responsible for **data-to-view synchronization**.
When data state changes, Angular automatically detects and updates the DOM.

---

### 2️⃣ Basic Principles

When Angular application starts, it creates a **Change Detection Tree**,
where each node in the tree corresponds to a component instance.

Whenever data changes, Angular will:

1. Recursively check starting from the root component;
2. Compare whether template-bound values have changed;
3. If there are changes, update the corresponding DOM nodes.

---

### 3️⃣ Zone.js and Change Triggering

Angular uses **Zone.js** to intercept asynchronous tasks (such as `setTimeout`, `Promise`, `XHR`),
and automatically triggers change detection when tasks complete.

```ts
setTimeout(() => {
  this.count++; // Zone.js captures async task and notifies Angular
}, 1000);
```

The flow is as follows:

```
setTimeout() executes → Zone.js captures → Task completes → Call ApplicationRef.tick()
→ Call ChangeDetectorRef.detectChanges() → Update DOM
```

---

## 5. Incremental Detection Mechanism Under Ivy Engine

In the Ivy rendering engine, change detection is more efficient, using **Incremental DOM**.
It only updates nodes that actually changed, not the entire component tree.

### Example:

```ts
@Component({
  selector: 'app-counter',
  template: `<h3>{{ count }}</h3><button (click)="inc()">+</button>`
})
export class CounterComponent {
  count = 0;
  inc() { this.count++; }
}
```

After compilation, it generates directive functions similar to:

```ts
function CounterComponent_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, 'h3');
    ɵɵtext(1);
    ɵɵelementEnd();
    ɵɵelementStart(2, 'button');
    ɵɵlistener('click', function() { return ctx.inc(); });
    ɵɵtext(3, '+');
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵtextInterpolate(ctx.count);
  }
}
```

Only when `ctx.count` changes, Angular re-renders `<h3>`.

---

## 6. Change Detection Strategy (ChangeDetectionStrategy)

Angular provides two change detection strategies:

| Strategy | Name | Characteristics |
|----------|------|-----------------|
| Default | Default mode | All parent component changes trigger child component detection |
| OnPush | On-demand detection | Only triggers when input properties (@Input) change or explicitly called |

### ✅ Example

```ts
@Component({
  selector: 'user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h4>{{ user.name }}</h4>`
})
export class UserCardComponent {
  @Input() user!: { name: string };
}
```

If parent component passes the same `user` reference, object content changes but reference doesn't change, OnPush mode won't re-render.

---

## 7. Manual Control of Change Detection

Angular allows developers to manually control detection flow through `ChangeDetectorRef`.

### Example: `detectChanges()` and `markForCheck()`

```ts
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-manual-detect',
  template: `<p>{{ time }}</p><button (click)="refresh()">Refresh</button>`
})
export class ManualDetectComponent {
  time = new Date().toLocaleTimeString();

  constructor(private cdr: ChangeDetectorRef) {}

  refresh() {
    this.time = new Date().toLocaleTimeString();
    this.cdr.detectChanges(); // Manually trigger view update
  }
}
```

### Common APIs

| Method | Description |
|--------|-------------|
| `detectChanges()` | Immediately detect current component and child components |
| `markForCheck()` | Mark component as "to be checked", update on next automatic detection |
| `detach()` | Pause current component detection |
| `reattach()` | Resume detection |

---

## 8. Performance Optimization Techniques

1️⃣ **Use OnPush Strategy**
Reduce unnecessary detection.

2️⃣ **Use trackBy to Optimize *ngFor**
```html
<li *ngFor="let user of users; trackBy: trackById">{{ user.name }}</li>
```
```ts
trackById(index, user) { return user.id; }
```

3️⃣ **Use async pipe for Automatic Subscribe and Destroy**
```html
<div *ngIf="user$ | async as user">{{ user.name }}</div>
```

4️⃣ **Avoid Unnecessary Object Reference Changes**
Pass Immutable objects or use RxJS pipe operators.

5️⃣ **Avoid Global Async Operations Polluting Zone**
For high-frequency events, use `NgZone.runOutsideAngular()`:
```ts
this.zone.runOutsideAngular(() => {
  window.addEventListener('scroll', this.handler);
});
```

---

## 9. Zone.js Role Summary

| Function | Description |
|----------|-------------|
| Intercept async tasks | Capture Promise, XHR, setTimeout events |
| Manage task context | Maintain current executing zone stack |
| Notify Angular to update | Call `tick()` to trigger detection after task completion |

Angular implements "almost imperceptible automatic refresh mechanism" through Zone.js.
But in high-performance scenarios (such as game rendering, real-time chart updates), you can also choose to **disable Zone** and manually control updates.

---

## 10. Summary

- Angular template syntax essence is "data binding declaration + compilation to rendering functions".
- Change Detection is the bridge from data changes to UI updates.
- Zone.js is responsible for intercepting async tasks and triggering detection.
- Ivy engine implements more efficient incremental detection mechanism.
- Performance optimization core: `OnPush`, `trackBy`, `async pipe`, `NgZone.runOutsideAngular()`.

> Understanding change detection mechanism is key to understanding Angular performance,
> In the next chapter we will dive into Angular's **Dependency Injection mechanism**,
> which is also the foundation that distinguishes Angular from other frameworks.
