---
title: "Angular Router 原理与导航守卫机制（Routing & Guards）"
date: "2025-10-01"
tags: ["Angular", "Router", "导航守卫", "懒加载", "CanActivate", "CanDeactivate"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 Angular Router 导航系统的核心原理，包括路由配置、RouterOutlet、路径参数、查询参数、懒加载、五种导航守卫（CanActivate、CanDeactivate、CanLoad、Resolve、CanActivateChild）、导航生命周期和 RouterState 管理。"
---

# 🧩 第 5 章：Angular Router 原理与导航守卫机制（Routing & Guards）

## 一、为什么需要 Router

在传统的多页面应用（MPA）中，页面跳转意味着浏览器重新加载 HTML。
而在 SPA（单页应用）中，路由系统允许 **URL 改变但页面不刷新**，
只更新需要的部分组件，从而实现更快的导航体验。

Angular 的 Router 是一个 **基于组件树与依赖注入系统的导航引擎**，
通过 **路径匹配、守卫验证、懒加载与状态同步** 管理整个应用的导航行为。

---

## 二、Router 的基本组成

| 模块 | 功能说明 |
|------|-----------|
| `RouterModule` | 提供路由相关的核心服务和指令 |
| `Routes` | 定义路径与组件映射关系 |
| `RouterOutlet` | 路由组件的占位符 |
| `RouterLink` | 声明式导航指令 |
| `ActivatedRoute` | 访问当前路由的参数和数据 |

---

## 三、基础路由配置

```ts
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

### 说明：
- `forRoot()`：在根模块中使用（单例 Router）。
- `forChild()`：在特性模块中使用。
- `**`：通配符路径，用于匹配所有未知路由。

---

## 四、RouterOutlet 与 RouterLink

Angular 路由通过 **占位 + 声明式导航** 实现组件渲染。

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/">首页</a>
  <a routerLink="/about">关于</a>
</nav>
<router-outlet></router-outlet>
```

当用户点击链接或调用 `router.navigate()` 时，Router 会：
1️⃣ 解析路径；
2️⃣ 查找匹配的路由配置；
3️⃣ 创建目标组件并插入 `<router-outlet>`。

---

## 五、带参数的路由

### 路径参数（Path Parameter）

```ts
{ path: 'user/:id', component: UserDetailComponent }
```

```ts
// 获取参数
constructor(private route: ActivatedRoute) {}
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}
```

### 查询参数（Query Parameter）

```ts
this.router.navigate(['/user'], { queryParams: { page: 2 } });
```

```ts
this.route.queryParams.subscribe(params => console.log(params['page']));
```

---

## 六、路由懒加载（Lazy Loading）

懒加载模块在首次访问时才会被加载，能有效提升首屏性能。

```ts
const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];
```

Angular 在运行时动态调用 `import()` 加载模块文件，
并在 `RouterModule.forChild()` 注册模块内子路由。

---

## 七、导航守卫（Route Guards）机制

守卫（Guards）用于在导航发生前后进行拦截、校验、预处理等操作。

Angular 提供以下五种守卫：

| 类型 | 接口 | 执行时机 |
|------|------|-----------|
| 路由激活前 | `CanActivate` | 进入目标路由前 |
| 路由离开前 | `CanDeactivate` | 离开当前路由前 |
| 模块懒加载前 | `CanLoad` | 加载懒加载模块前 |
| 数据解析前 | `Resolve` | 在激活前预加载数据 |
| 子路由激活前 | `CanActivateChild` | 激活子路由前 |

---

### 示例：CanActivate

```ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
```

```ts
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
```

---

### 示例：CanDeactivate

```ts
export interface CanComponentLeave {
  canLeave: () => boolean;
}

@Injectable({ providedIn: 'root' })
export class LeaveGuard implements CanDeactivate<CanComponentLeave> {
  canDeactivate(component: CanComponentLeave): boolean {
    return component.canLeave ? component.canLeave() : true;
  }
}
```

```ts
@Component({
  selector: 'editor',
  template: `<button (click)="save()">保存</button>`
})
export class EditorComponent implements CanComponentLeave {
  unsaved = true;
  save() { this.unsaved = false; }
  canLeave() { return !this.unsaved || confirm('你有未保存的修改，确认离开？'); }
}
```

---

### 示例：Resolve（数据预取）

```ts
@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id')!;
    return this.service.getUser(id);
  }
}
```

```ts
{ path: 'user/:id', component: UserDetailComponent, resolve: { user: UserResolver } }
```

组件中可直接获取预取数据：

```ts
this.route.data.subscribe(data => this.user = data['user']);
```

---

## 八、导航生命周期（完整流程）

Angular Router 在导航过程中的执行顺序如下：

```
1️⃣ NavigationStart
2️⃣ RouteConfigLoadStart
3️⃣ RouteConfigLoadEnd
4️⃣ GuardsCheckStart
5️⃣ ResolveStart
6️⃣ GuardsCheckEnd
7️⃣ ResolveEnd
8️⃣ NavigationEnd
```

这些事件可以通过 `Router.events` 监听：

```ts
this.router.events.subscribe(event => {
  if (event instanceof NavigationStart) console.log('导航开始');
});
```

---

## 九、RouterState 与 ActivatedRoute 关系

- **RouterState**：全局路由树（包括所有激活路由）。
- **ActivatedRoute**：当前激活的路由实例。

```
RouterState
 └── ActivatedRoute (当前路由)
       └── children (子路由)
```

```ts
this.router.routerState.root.firstChild?.params.subscribe(...);
```

---

## 十、Angular Router 与 React Router 对比

| 特性 | Angular Router | React Router |
|------|----------------|---------------|
| 架构方式 | 模块化、依赖注入支持 | 声明式组件配置 |
| 路由表配置 | 对象式定义 | JSX 组件式定义 |
| 守卫机制 | 内置 Guards 系统 | 需手动控制逻辑 |
| 懒加载支持 | 原生支持 | 通过 lazy + Suspense |
| 数据解析 | Resolve 机制 | useLoaderData (v6+) |
| 响应式集成 | 与 RxJS 深度结合 | 通过 hooks 实现 |

---

## 十一、面试高频问题

| 问题 | 答题要点 |
|------|-----------|
| Angular 路由守卫有哪些？ | CanActivate, CanDeactivate, CanLoad, Resolve, CanActivateChild |
| 懒加载模块的原理？ | 动态 import 模块并注册子路由 |
| 如何在导航前预取数据？ | 使用 Resolve 守卫 |
| Router 与 ActivatedRoute 的区别？ | Router 管理全局状态，ActivatedRoute 表示当前激活路由 |
| 如何监听路由变化？ | Router.events 或 ActivatedRoute.paramMap |

---

## 十二、总结

- Angular Router 是一个强大的导航系统，支持懒加载与守卫拦截。
- 它的本质是通过路由表匹配 → 组件实例化 → DOM 插入。
- 守卫（Guards）为导航流程提供安全性与灵活性。
- Resolve 机制可预加载数据，提高用户体验。
- 懒加载是性能优化的重要手段。

> 理解 Router，是掌握 Angular 架构完整闭环的关键。
> 下一章我们将学习 **表单系统与响应式表单原理（Template vs Reactive Forms）**，
> 探讨 Angular 如何实现复杂表单验证与数据双向绑定。
