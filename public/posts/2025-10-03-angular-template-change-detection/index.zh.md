---
title: "模板语法与变更检测机制（Change Detection）"
date: "2025-10-03"
tags: ["Angular", "模板语法", "变更检测", "Zone.js", "ChangeDetectionStrategy", "OnPush"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 Angular 模板语法与变更检测核心机制，包括插值绑定、属性绑定、事件绑定、双向绑定、Zone.js 异步任务拦截、Ivy 增量检测、ChangeDetectionStrategy 优化策略、ChangeDetectorRef 手动控制和性能优化技巧。"
---

# 🧩 第 2 章：模板语法与变更检测机制（Change Detection）

## 一、模板语法（Template Syntax）概览

Angular 的模板语法是 **声明式 UI** 的核心。
它让开发者通过 HTML + 特殊标记控制数据与 DOM 的绑定。

---

## 二、模板绑定类型

| 类型 | 语法 | 功能 | 示例 |
|------|------|------|------|
| 插值绑定 | `{{ value }}` | 单向显示数据 | `<h1>{{ title }}</h1>` |
| 属性绑定 | `[property]="value"` | 设置 DOM 属性 | `<img [src]="imageUrl">` |
| 事件绑定 | `(event)="handler()"` | 绑定事件响应 | `<button (click)="onClick()">Click</button>` |
| 双向绑定 | `[(ngModel)]="value"` | 数据双向同步 | `<input [(ngModel)]="username">` |

---

## 三、Angular 的数据流机制

Angular 中组件的数据流是 **单向的（父 → 子）**，
但通过双向绑定（`[(ngModel)]`）可以在模板层实现"语法糖式的同步"。

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

模板变化 → 更新组件属性 → 触发变更检测 → 重新渲染视图。

---

## 四、变更检测机制（Change Detection）

### 1️⃣ 背景

Angular 的 Change Detection（变更检测）是负责 **数据到视图同步** 的核心机制。
当数据状态改变时，Angular 会自动检测并更新 DOM。

---

### 2️⃣ 基本原理

Angular 在应用启动时会创建一棵 **变更检测树（Change Detection Tree）**，
树中的每个节点对应一个组件实例。

每当数据变化时，Angular 会：

1. 从根组件开始递归检查；
2. 比较模板绑定的值是否发生变化；
3. 若有变化，则更新对应的 DOM 节点。

---

### 3️⃣ Zone.js 与变更触发

Angular 借助 **Zone.js** 拦截异步任务（如 `setTimeout`、`Promise`、`XHR`），
在任务完成时自动触发变更检测。

```ts
setTimeout(() => {
  this.count++; // Zone.js 捕获异步任务并通知 Angular
}, 1000);
```

流程如下：

```
setTimeout() 执行 → Zone.js 捕获 → 任务完成 → 调用 ApplicationRef.tick()
→ 调用 ChangeDetectorRef.detectChanges() → 更新 DOM
```

---

## 五、Ivy 引擎下的增量检测机制

在 Ivy 渲染引擎中，变更检测更加高效，采用 **增量更新（Incremental DOM）**。
它只会更新实际变动的节点，而不是整个组件树。

### 示例：

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

编译后会生成类似指令函数：

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

只有 `ctx.count` 变化时，Angular 才重新渲染 `<h3>`。

---

## 六、变更检测策略（ChangeDetectionStrategy）

Angular 提供两种变更检测策略：

| 策略 | 名称 | 特点 |
|------|------|------|
| Default | 默认模式 | 所有父组件变化都会触发子组件检测 |
| OnPush | 按需检测 | 仅当输入属性（@Input）变化或显式调用时触发 |

### ✅ 示例

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

如果父组件传入相同的 `user` 引用，对象内容改变但引用未变，OnPush 模式下不会重新渲染。

---

## 七、手动控制变更检测

Angular 允许开发者通过 `ChangeDetectorRef` 手动控制检测流程。

### 示例：`detectChanges()` 与 `markForCheck()`

```ts
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-manual-detect',
  template: `<p>{{ time }}</p><button (click)="refresh()">刷新</button>`
})
export class ManualDetectComponent {
  time = new Date().toLocaleTimeString();

  constructor(private cdr: ChangeDetectorRef) {}

  refresh() {
    this.time = new Date().toLocaleTimeString();
    this.cdr.detectChanges(); // 手动触发视图更新
  }
}
```

### 常用 API

| 方法 | 说明 |
|------|------|
| `detectChanges()` | 立即检测当前组件及子组件 |
| `markForCheck()` | 标记组件为"待检查"，下次自动检测时更新 |
| `detach()` | 暂停当前组件检测 |
| `reattach()` | 恢复检测 |

---

## 八、性能优化技巧

1️⃣ **使用 OnPush 策略**
减少不必要的检测。

2️⃣ **使用 trackBy 优化 *ngFor**
```html
<li *ngFor="let user of users; trackBy: trackById">{{ user.name }}</li>
```
```ts
trackById(index, user) { return user.id; }
```

3️⃣ **使用 async pipe 自动订阅与销毁**
```html
<div *ngIf="user$ | async as user">{{ user.name }}</div>
```

4️⃣ **避免不必要的对象引用变更**
传递 Immutable 对象或使用 RxJS 管道操作符。

5️⃣ **避免全局异步操作污染 Zone**
对高频事件可用 `NgZone.runOutsideAngular()`：
```ts
this.zone.runOutsideAngular(() => {
  window.addEventListener('scroll', this.handler);
});
```

---

## 九、Zone.js 的角色总结

| 功能 | 描述 |
|------|------|
| 拦截异步任务 | 捕获 Promise、XHR、setTimeout 等事件 |
| 管理任务上下文 | 维护当前执行的 zone 栈 |
| 通知 Angular 更新 | 在任务完成后调用 `tick()` 触发检测 |

Angular 通过 Zone.js 实现"几乎无感知的自动刷新机制"。
但在高性能场景（如游戏渲染、图表实时刷新）中，也可选择**关闭 Zone**手动控制更新。

---

## 十、总结

- Angular 模板语法本质是"数据绑定声明 + 编译为渲染函数"。
- Change Detection 是数据变化到 UI 更新的桥梁。
- Zone.js 负责拦截异步任务并触发检测。
- Ivy 引擎实现了更高效的增量检测机制。
- 性能优化核心：`OnPush`、`trackBy`、`async pipe`、`NgZone.runOutsideAngular()`。

> 理解变更检测机制是理解 Angular 性能的关键，
> 下一章我们将深入 Angular 的 **依赖注入机制（Dependency Injection）**，
> 这也是 Angular 区别于其他框架的根基。
