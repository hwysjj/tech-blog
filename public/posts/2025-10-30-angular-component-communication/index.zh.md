---
title: "组件通信与数据流设计（Input/Output + RxJS）"
date: "2025-10-30"
tags: ["Angular", "组件通信", "RxJS", "Input", "Output", "BehaviorSubject"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 Angular 组件通信的多种方式，包括 @Input/@Output 装饰器、ViewChild/ContentChild、Service + RxJS 服务通信、BehaviorSubject 状态共享、async pipe 响应式绑定和数据流设计模式，掌握跨组件通信的最佳实践。"
---

# 🧩 第 4 章：组件通信与数据流设计（Input/Output + RxJS）

## 一、为什么要研究组件通信

Angular 是一个基于组件树结构的框架。
每个组件都是独立封装的单元，但在复杂应用中，组件之间必然需要通信：
> 父 → 子、子 → 父、兄弟组件、跨层组件、全局状态共享等。

因此，理解组件通信是构建高可维护性应用的基础。

---

## 二、组件通信的常见方式

| 方式 | 适用场景 | 技术实现 |
|------|------------|------------|
| 1️⃣ @Input() | 父组件 → 子组件 | 属性绑定 |
| 2️⃣ @Output() | 子组件 → 父组件 | 事件发射 |
| 3️⃣ ViewChild / ContentChild | 父组件直接访问子组件实例 | 模板引用或投影内容 |
| 4️⃣ Service + RxJS | 兄弟组件 / 任意层通信 | 共享服务 |
| 5️⃣ Router Params / Query | 路由传参 | 参数共享 |
| 6️⃣ NgRx / Signals | 全局状态管理 | Redux 风格数据流 |

---

## 三、@Input()：父 → 子 数据传递

`@Input()` 用于父组件向子组件传递数据。

```ts
// child.component.ts
@Component({
  selector: 'child',
  template: `<p>子组件收到：{{ message }}</p>`
})
export class ChildComponent {
  @Input() message!: string;
}

// parent.component.ts
@Component({
  selector: 'parent',
  template: `<child [message]="parentMsg"></child>`
})
export class ParentComponent {
  parentMsg = '来自父组件的问候';
}
```

### ⚙️ 工作原理
Angular 在变更检测阶段，会将父组件的 `message` 值绑定到子组件实例的 `@Input()` 属性中。

---

## 四、@Output()：子 → 父 事件通信

`@Output()` 通常与 `EventEmitter` 一起使用。

```ts
// child.component.ts
@Component({
  selector: 'child',
  template: `<button (click)="notifyParent()">点击我</button>`
})
export class ChildComponent {
  @Output() clicked = new EventEmitter<string>();

  notifyParent() {
    this.clicked.emit('子组件发出事件');
  }
}

// parent.component.ts
@Component({
  selector: 'parent',
  template: `<child (clicked)="handle($event)"></child>`
})
export class ParentComponent {
  handle(msg: string) {
    console.log('父组件接收：', msg);
  }
}
```

### ✅ 小结
- `@Input()`：数据流是单向的（父 → 子）
- `@Output()`：基于事件机制实现（子 → 父）

---

## 五、ViewChild / ContentChild：父组件直接访问子组件

### 示例：`@ViewChild()`

```ts
@Component({
  selector: 'child',
  template: `<p>计数：{{ count }}</p>`
})
export class ChildComponent {
  count = 0;
  increase() { this.count++; }
}

@Component({
  selector: 'parent',
  template: `
    <child></child>
    <button (click)="child.increase()">调用子组件方法</button>
  `
})
export class ParentComponent {
  @ViewChild(ChildComponent) child!: ChildComponent;
}
```

**说明：**
- `@ViewChild()` 在 `ngAfterViewInit()` 生命周期后才可访问；
- 可直接操作子组件的属性与方法。

---

## 六、Service + RxJS：跨组件通信的推荐方案

在复杂项目中，多个组件之间往往没有直接父子关系。
此时，可以通过 **共享服务 + RxJS Subject** 实现通信。

### 示例：使用 Subject 实现兄弟组件通信

```ts
// message.service.ts
@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new Subject<string>();
  message$ = this.subject.asObservable();

  send(message: string) {
    this.subject.next(message);
  }
}
```

```ts
// sender.component.ts
@Component({
  selector: 'sender',
  template: `<button (click)="send()">发送消息</button>`
})
export class SenderComponent {
  constructor(private msgService: MessageService) {}
  send() {
    this.msgService.send('来自 Sender 的消息');
  }
}
```

```ts
// receiver.component.ts
@Component({
  selector: 'receiver',
  template: `<p>接收：{{ message }}</p>`
})
export class ReceiverComponent implements OnInit {
  message = '';
  constructor(private msgService: MessageService) {}
  ngOnInit() {
    this.msgService.message$.subscribe(m => this.message = m);
  }
}
```

### ⚙️ 优势
- 完全解耦组件之间的关系
- 基于 RxJS 可实现流式控制与中间逻辑

---

## 七、RxJS 在组件通信中的三种常用 Subject

| 类型 | 特点 | 典型应用 |
|------|------|-----------|
| `Subject` | 广播机制（无初始值） | 普通消息传递 |
| `BehaviorSubject` | 持有最近值 | 状态管理、默认值 |
| `ReplaySubject` | 可重放指定历史条目 | 缓存最近数据流 |

### 示例：`BehaviorSubject` 状态共享

```ts
@Injectable({ providedIn: 'root' })
export class UserStore {
  private user$ = new BehaviorSubject<User | null>(null);

  get user() {
    return this.user$.asObservable();
  }

  setUser(u: User) {
    this.user$.next(u);
  }
}
```

```ts
@Component({ template: `<button (click)="login()">登录</button>` })
export class LoginComponent {
  constructor(private store: UserStore) {}
  login() { this.store.setUser({ name: 'William' }); }
}

@Component({ template: `<p>欢迎 {{ user?.name }}</p>` })
export class HeaderComponent implements OnInit {
  user?: User;
  constructor(private store: UserStore) {}
  ngOnInit() { this.store.user.subscribe(u => this.user = u); }
}
```

---

## 八、RxJS + Async Pipe：模板层的响应式绑定

Angular 模板可直接使用 `async pipe` 订阅 Observable。

```html
<p *ngIf="user$ | async as user">
  欢迎 {{ user.name }}
</p>
```

好处：
- 自动订阅与取消订阅；
- 避免内存泄漏；
- 模板保持响应式。

---

## 九、复杂场景的数据流设计

### 1️⃣ 父组件驱动（单向流）
父组件通过 Input 推数据，子组件通过 Output 发事件。
✅ 简洁明了，但不适合多层通信。

### 2️⃣ 服务驱动（共享状态）
服务中存储状态（BehaviorSubject）。
✅ 适合兄弟、跨层级通信。

### 3️⃣ 全局流管理（NgRx / Signals）
通过 Store 管理全局状态，数据流为：
`Action → Reducer → State → View`
✅ 高可扩展性，适合大型项目。

---

## 🔬 实战：用 RxJS 构建组件间状态共享服务

```ts
@Injectable({ providedIn: 'root' })
export class CounterService {
  private counter = new BehaviorSubject<number>(0);
  counter$ = this.counter.asObservable();

  increase() {
    this.counter.next(this.counter.value + 1);
  }
}
```

```ts
// component-a.ts
@Component({ selector: 'comp-a', template: `<button (click)="add()">+</button>` })
export class ComponentA {
  constructor(private counter: CounterService) {}
  add() { this.counter.increase(); }
}
```

```ts
// component-b.ts
@Component({ selector: 'comp-b', template: `<p>计数：{{ counter$ | async }}</p>` })
export class ComponentB {
  counter$ = this.counter.counter$;
  constructor(private counter: CounterService) {}
}
```

### ✅ 输出效果：
两个组件共享同一状态，无需父子关系。

---

## 十、面试高频问题

| 问题 | 答题要点 |
|------|-----------|
| Angular 组件通信有几种方式？ | Input/Output、Service、ViewChild、Router Params 等 |
| 为什么推荐使用 RxJS 服务通信？ | 解耦组件依赖，支持响应式流式数据 |
| BehaviorSubject 与 Subject 的区别？ | BehaviorSubject 有初始值并能重放最后状态 |
| async pipe 的作用？ | 自动订阅/取消订阅 Observable，防止内存泄漏 |
| Angular 中如何实现兄弟组件通信？ | 通过共享服务（Service + Subject） |

---

## 十一、总结

- `@Input()` 与 `@Output()` 适合父子通信；
- `Service + RxJS` 是最推荐的跨组件通信方式；
- `BehaviorSubject` 用于共享状态；
- 模板中可通过 `async pipe` 实现响应式绑定；
- 数据流设计要保持单向性（从状态到视图）。

> 理解数据流，就是理解 Angular 响应式思想的核心。
> 下一章我们将进入应用骨架之一 ——
> **Angular Router 原理与导航守卫机制（Routing & Guards）**。
