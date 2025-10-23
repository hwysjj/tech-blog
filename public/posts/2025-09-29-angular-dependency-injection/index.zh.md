---
title: "依赖注入机制（Dependency Injection）"
date: "2025-09-29"
tags: ["Angular", "依赖注入", "DI", "Injector", "Provider"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 Angular 依赖注入机制的核心原理，包括 Provider、Injector、Token 体系、层级注入器树、作用域管理、多重注入、动态注入和高级控制装饰器，掌握 Angular DI 系统的完整知识体系。"
---

# 🧩 第 3 章：依赖注入机制（Dependency Injection）

## 一、概述：什么是依赖注入

**依赖注入（Dependency Injection, 简称 DI）** 是 Angular 框架最核心的机制之一。
它的本质是：
> "将对象的创建与使用分离，让依赖自动注入，而不是手动创建。"

Angular 的 DI 系统通过 **Injector（注入器）** 管理所有依赖（Service）。
每个组件或模块都有自己的注入上下文。

---

## 二、Angular 中的依赖注入体系

| 元素 | 功能说明 |
|------|-----------|
| **Provider** | 定义依赖的提供方式 |
| **Injector** | 存储依赖实例并负责注入 |
| **Token** | 标识依赖项（通常是类名或字符串） |
| **Service** | 实际被注入的依赖对象 |

---

## 三、依赖注入的工作原理

Angular 在应用启动时，会创建一个 **根注入器（Root Injector）**，
并为每个模块或组件创建 **局部注入器（Child Injector）**。

流程如下：

```
@NgModule() → 注册 Provider
       ↓
Root Injector 创建
       ↓
Component Injector（组件级别）
       ↓
当组件请求依赖 → Injector 查找层级树 → 返回实例
```

---

## 四、最简单的依赖注入示例

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  getUser() {
    return { name: 'William' };
  }
}

@Component({
  selector: 'user-card',
  template: `<p>Hello {{ user.name }}</p>`
})
export class UserCardComponent {
  user: any;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }
}
```

### ✅ 说明：
- `@Injectable({ providedIn: 'root' })`：自动将该服务注册到根注入器；
- `constructor(private userService: UserService)`：Angular 自动注入实例；
- 不需要手动创建对象（即：`new UserService()`）。

---

## 五、Injector 层级结构（层次注入器树）

Angular 的 Injector 具有层级树结构：

```
Root Injector (全局)
│
├── Module Injector
│     ├── FeatureModule A
│     └── FeatureModule B
│
└── Component Injector
      ├── ParentComponent
      └── ChildComponent
```

### 依赖查找规则：
> 从当前组件 Injector 开始 → 向上查找 → 一直查到 Root Injector。

```ts
@Component({
  selector: 'child',
  template: 'Child works!',
  providers: [UserService] // 局部提供
})
export class ChildComponent {
  constructor(private user: UserService) {}
}
```

如果 `ParentComponent` 也提供了 `UserService`，
那么 `ChildComponent` 会优先使用自己定义的 Provider。

---

## 六、Provider 的定义方式

| 定义方式 | 写法 | 说明 |
|-----------|--------|------|
| `useClass` | `{ provide: X, useClass: Y }` | 使用类实例 |
| `useValue` | `{ provide: TOKEN, useValue: obj }` | 使用固定值 |
| `useExisting` | `{ provide: X, useExisting: Y }` | 复用另一个 Provider |
| `useFactory` | `{ provide: X, useFactory: fn }` | 动态工厂函数 |

### 示例：`useFactory`

```ts
export function apiFactory(env: string) {
  return env === 'prod' ? 'https://api.prod.com' : 'https://api.dev.com';
}

@NgModule({
  providers: [
    { provide: 'API_URL', useFactory: apiFactory, deps: ['ENV'] },
    { provide: 'ENV', useValue: 'dev' }
  ]
})
export class CoreModule {}
```

---

## 七、作用域与生命周期

Angular 的 Service 生命周期与其注册位置（Provider）相关。

| 注册位置 | 生命周期 | 示例 |
|-----------|-----------|--------|
| 根注入器（`providedIn: 'root'`） | 应用全局单例 | 常用服务 |
| 模块（NgModule.providers） | 模块级别 | 业务模块独立实例 |
| 组件（Component.providers） | 组件级别 | 独立逻辑或状态 |

```ts
@Component({
  selector: 'counter',
  template: '{{count}}',
  providers: [CounterService]
})
export class CounterComponent {
  constructor(public counter: CounterService) {}
}
```

每个组件实例都会创建自己的 `CounterService`。

---

## 八、高级注入技巧

### 1️⃣ 多重注入（multi-provider）

```ts
const LOG_TOKEN = new InjectionToken<string[]>('LOG_TOKEN');

@NgModule({
  providers: [
    { provide: LOG_TOKEN, useValue: 'file', multi: true },
    { provide: LOG_TOKEN, useValue: 'console', multi: true }
  ]
})
export class LogModule {}
```

Angular 会将多个值合并为数组：`['file', 'console']`。

---

### 2️⃣ 层级控制装饰器

| 装饰器 | 说明 |
|---------|------|
| `@Optional()` | 依赖可选，若无则注入 null |
| `@Self()` | 仅从当前 Injector 查找 |
| `@SkipSelf()` | 跳过当前 Injector，从父级查找 |
| `@Host()` | 限制在宿主组件查找 |

示例：
```ts
constructor(@Optional() private service?: OptionalService) {}
```

---

## 九、Injector API 与动态注入

可以通过 `Injector` 手动解析依赖。

```ts
@Component({ template: '' })
export class DynamicComponent {
  constructor(private injector: Injector) {}

  ngOnInit() {
    const userService = this.injector.get(UserService);
    console.log(userService.getUser());
  }
}
```

也可以使用 `ReflectiveInjector.resolveAndCreate()` 动态创建：

```ts
const injector = ReflectiveInjector.resolveAndCreate([UserService]);
const user = injector.get(UserService);
```

---

## 十、Angular 为什么需要 DI？

### ✅ 主要优势

1. **解耦组件与依赖**
   - 组件不负责创建依赖，只声明需要什么。

2. **可替换性与测试性高**
   - 测试中可以轻松 mock 服务。

3. **模块化与层级复用**
   - 各模块独立注入系统，避免全局污染。

4. **控制对象生命周期**
   - 框架统一管理服务实例的创建与销毁。

---

## 十一、面试常见问题

| 问题 | 答题要点 |
|------|-----------|
| Angular 的依赖注入原理？ | 通过 Injector 管理 Provider，按层级查找依赖。 |
| providedIn 的作用？ | 决定服务注册在哪个注入器中。 |
| 如何创建局部作用域服务？ | 在组件或模块的 providers 中注册。 |
| @Optional() 的作用？ | 若依赖不存在则注入 null，而非报错。 |
| Angular DI 与 React Context 的区别？ | DI 是运行时解析依赖，Context 是显式传递数据。 |

---

## 十二、总结

- Angular 的依赖注入系统是其架构核心，所有功能模块均基于 DI 实现。
- Injector 形成层级结构，依赖按树状规则查找。
- Provider 定义依赖的提供方式，可自定义或动态创建。
- `@Injectable()` 装饰器声明类可被注入。
- 高级控制装饰器（`@Optional()`、`@Self()` 等）允许更精确控制作用域。

> 理解 DI，是理解 Angular "组件之间如何协作"的关键。
> 下一章我们将探讨另一个高频实战话题 ——
> **组件通信与数据流设计（Input/Output + RxJS）**。
