---
title: "Angular 架构总览"
date: "2025-10-28"
tags: ["Angular", "架构设计", "NgModule", "Ivy", "依赖注入"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 Angular 架构的核心理念，包括组件驱动、依赖注入、模块化设计、应用启动流程、NgModule 结构、Ivy 渲染引擎和 DI 系统，掌握 Angular 框架的整体架构思想。"
---

# 🧩 第 1 章：Angular 架构总览

## 一、框架架构的核心理念

Angular 是一个"**组件驱动 + 依赖注入 + 模块化 + 模板编译**"的前端框架。
它与 React 的最大区别在于：React 是 **UI Library**，Angular 是 **Application Framework**。

Angular 拥有自己的：
- 模块系统（NgModule）
- 依赖注入容器（DI System）
- 编译与渲染引擎（Ivy）
- 路由系统（Router）
- 响应式流工具（RxJS）

---

## 二、Angular 应用的组成结构

Angular 应用由多个核心构件组成：

| 构件类型 | 说明 | 示例 |
|-----------|-----------|-----------|
| Component | 控制视图、逻辑与样式的最小单元 | `@Component({ selector: 'app-root' })` |
| Directive | 改变 DOM 行为的指令 | `*ngIf`、`*ngFor` |
| Pipe | 负责数据转换 | `{{ date | date:'yyyy-MM-dd' }}` |
| Service | 可复用逻辑或数据操作 | `@Injectable()` |
| NgModule | 功能模块的封装与依赖管理 | `@NgModule({ declarations, imports, providers })` |

---

## 三、应用启动流程（Bootstrap 流程）

Angular 应用的入口文件通常是 `main.ts`。
我们从它开始理解整个启动过程。

### 🔹 代码示例

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### 🔍 流程解析

1️⃣ **platformBrowserDynamic()**
创建浏览器平台环境（PlatformRef）。

2️⃣ **bootstrapModule(AppModule)**
编译根模块，生成应用上下文（Injector + Zone + Component）。

3️⃣ **Ivy 编译器启动**
Ivy 会将模板编译为渲染函数，并生成 DOM 结构。

4️⃣ **应用运行**
Angular 进入运行阶段，监听 Zone.js 中的异步任务以触发变更检测。

---

## 四、NgModule 的作用与结构

每个 Angular 应用至少有一个根模块（AppModule）。
模块是 Angular 的"功能边界"，定义了组件、服务、指令、管道的组织方式。

### ✅ 基本结构

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

| 属性 | 功能 |
|------|------|
| declarations | 声明当前模块包含的组件/指令/管道 |
| imports | 导入其他模块 |
| providers | 注册依赖注入的服务 |
| bootstrap | 启动组件（仅根模块使用） |

---

## 五、Angular 架构分层图（描述版）

```
                    +-----------------------------+
                    |       Angular Application   |
                    +-----------------------------+
                                   |
          +--------------------------------------------------+
          |                    NgModule 层                   |
          +--------------------------------------------------+
                                   |
     +--------------+   +---------------+   +---------------+
     | Component 层 |   | Service 层    |   | Directive/Pipe 层 |
     +--------------+   +---------------+   +---------------+
                                   |
                         +--------------------+
                         |   Template 模板层   |
                         +--------------------+
                                   |
                         +--------------------+
                         |    DOM 渲染与变更检测   |
                         +--------------------+
```

---

## 六、Ivy 渲染引擎：运行时核心机制

Angular 8 之后默认启用 Ivy 渲染引擎，
它将模板编译为指令函数，提升运行性能与可调试性。

### 🔹 Ivy 编译后结构

```ts
@Component({
  selector: 'app-root',
  template: '<h1>Hello {{ name }}</h1>'
})
export class AppComponent {
  name = 'Angular';
}
```

在 Ivy 编译后会生成类似：
```ts
ɵɵdefineComponent({
  type: AppComponent,
  selectors: [['app-root']],
  decls: 2,
  vars: 1,
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, 'h1');
      ɵɵtext(1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵtextInterpolate1('Hello ', ctx.name, '');
    }
  }
});
```

这就是 Angular 模板"预编译为指令调用"的过程。

---

## 七、依赖注入系统（Dependency Injection）概览

Angular 的 DI 机制是整个框架的基石。

- 每个模块、组件都有自己的 Injector；
- 服务在 Injector 树中注册后可被全局或局部注入；
- Angular 通过 `ReflectiveInjector` 维护依赖关系表。

### 🔹 示例

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  getUser() {
    return { name: 'William' };
  }
}

@Component({ selector: 'user-card', template: '{{user.name}}' })
export class UserCardComponent {
  constructor(private userService: UserService) {}
  user = this.userService.getUser();
}
```

---

## 八、Angular 与 React 架构对比

| 特性 | Angular | React |
|------|----------|--------|
| 核心类型 | 完整框架 | UI 库 |
| 语言 | TypeScript 原生支持 | JavaScript + JSX |
| 模板系统 | HTML 模板 + 指令语法 | JSX 表达式 |
| 状态管理 | 依赖注入 + RxJS | Hooks + Context |
| 渲染引擎 | Ivy 编译器 | Fiber 架构 |
| 变更检测 | Zone.js + Change Detection | Hook + Diff |
| 生态集成 | Router、Forms、DI 内置 | 需第三方（Redux、Router） |

---

## 九、总结

Angular 是一个**强约束、高集成度的前端框架**：
- 模块化设计（NgModule）
- 依赖注入系统（DI）
- 模板编译与渲染引擎（Ivy）
- 响应式数据流（RxJS）
- 完整生态（Router、Forms、CLI）

理解 Angular 的架构总览，是深入学习其底层机制（如变更检测、DI 树结构、编译流程）的第一步。

> 从这里开始，我们将在后续章节深入探索 Angular 的运行机制 ——
> 变更检测、依赖注入、模板编译、性能优化与源码剖析。
