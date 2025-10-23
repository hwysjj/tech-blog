---
title: "Angular Router Principles and Navigation Guard Mechanisms (Routing & Guards)"
date: "2025-10-01"
tags: ["Angular", "Router", "Navigation Guards", "Lazy Loading", "CanActivate", "CanDeactivate"]
category: "Technical Tutorial"
author: "Author"
excerpt: "Deep dive into Angular Router navigation system core principles, including route configuration, RouterOutlet, path parameters, query parameters, lazy loading, five navigation guards (CanActivate, CanDeactivate, CanLoad, Resolve, CanActivateChild), navigation lifecycle, and RouterState management."
---

# 🧩 Chapter 5: Angular Router Principles and Navigation Guard Mechanisms (Routing & Guards)

## 1. Why We Need Router

In traditional Multi-Page Applications (MPA), page navigation means the browser reloads HTML.
In SPAs (Single Page Applications), the routing system allows **URL changes without page refresh**,
only updating necessary component parts, thus achieving faster navigation experience.

Angular's Router is a **navigation engine based on component tree and dependency injection system**,
managing the entire application's navigation behavior through **path matching, guard validation, lazy loading, and state synchronization**.

---

## 2. Basic Components of Router

| Module | Function Description |
|--------|---------------------|
| `RouterModule` | Provides core routing services and directives |
| `Routes` | Defines path-to-component mapping relationships |
| `RouterOutlet` | Placeholder for route components |
| `RouterLink` | Declarative navigation directive |
| `ActivatedRoute` | Access current route parameters and data |

---

## 3. Basic Route Configuration

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

### Explanation:
- `forRoot()`: Used in root module (singleton Router).
- `forChild()`: Used in feature modules.
- `**`: Wildcard path, used to match all unknown routes.

---

## 4. RouterOutlet and RouterLink

Angular routing implements component rendering through **placeholder + declarative navigation**.

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>
<router-outlet></router-outlet>
```

When users click links or call `router.navigate()`, Router will:
1️⃣ Parse the path;
2️⃣ Find matching route configuration;
3️⃣ Create target component and insert into `<router-outlet>`.

---

## 5. Routes with Parameters

### Path Parameter

```ts
{ path: 'user/:id', component: UserDetailComponent }
```

```ts
// Get parameter
constructor(private route: ActivatedRoute) {}
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}
```

### Query Parameter

```ts
this.router.navigate(['/user'], { queryParams: { page: 2 } });
```

```ts
this.route.queryParams.subscribe(params => console.log(params['page']));
```

---

## 6. Route Lazy Loading

Lazy loading modules are loaded only on first access, effectively improving initial load performance.

```ts
const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];
```

Angular dynamically calls `import()` at runtime to load module files,
and registers module child routes in `RouterModule.forChild()`.

---

## 7. Navigation Guards Mechanism

Guards are used to intercept, validate, and pre-process before and after navigation occurs.

Angular provides the following five guards:

| Type | Interface | Execution Timing |
|------|-----------|------------------|
| Before route activation | `CanActivate` | Before entering target route |
| Before route deactivation | `CanDeactivate` | Before leaving current route |
| Before lazy loading module | `CanLoad` | Before loading lazy-loaded module |
| Before data resolution | `Resolve` | Pre-load data before activation |
| Before child route activation | `CanActivateChild` | Before activating child routes |

---

### Example: CanActivate

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

### Example: CanDeactivate

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
  template: `<button (click)="save()">Save</button>`
})
export class EditorComponent implements CanComponentLeave {
  unsaved = true;
  save() { this.unsaved = false; }
  canLeave() { return !this.unsaved || confirm('You have unsaved changes, confirm leave?'); }
}
```

---

### Example: Resolve (Data Prefetching)

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

Components can directly access prefetched data:

```ts
this.route.data.subscribe(data => this.user = data['user']);
```

---

## 8. Navigation Lifecycle (Complete Flow)

Angular Router's execution order during navigation:

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

These events can be listened to through `Router.events`:

```ts
this.router.events.subscribe(event => {
  if (event instanceof NavigationStart) console.log('Navigation started');
});
```

---

## 9. RouterState and ActivatedRoute Relationship

- **RouterState**: Global routing tree (including all activated routes).
- **ActivatedRoute**: Currently activated route instance.

```
RouterState
 └── ActivatedRoute (current route)
       └── children (child routes)
```

```ts
this.router.routerState.root.firstChild?.params.subscribe(...);
```

---

## 10. Angular Router vs React Router Comparison

| Feature | Angular Router | React Router |
|---------|----------------|--------------|
| Architecture | Modular, DI support | Declarative component configuration |
| Route table config | Object-based definition | JSX component-based definition |
| Guard mechanism | Built-in Guards system | Manual control logic needed |
| Lazy loading support | Native support | Via lazy + Suspense |
| Data resolution | Resolve mechanism | useLoaderData (v6+) |
| Reactive integration | Deep integration with RxJS | Via hooks implementation |

---

## 11. High-Frequency Interview Questions

| Question | Key Points |
|----------|------------|
| What are Angular route guards? | CanActivate, CanDeactivate, CanLoad, Resolve, CanActivateChild |
| What is the principle of lazy loading modules? | Dynamically import modules and register child routes |
| How to prefetch data before navigation? | Use Resolve guard |
| Difference between Router and ActivatedRoute? | Router manages global state, ActivatedRoute represents current activated route |
| How to listen to route changes? | Router.events or ActivatedRoute.paramMap |

---

## 12. Summary

- Angular Router is a powerful navigation system supporting lazy loading and guard interception.
- Its essence is: route table matching → component instantiation → DOM insertion.
- Guards provide security and flexibility to the navigation flow.
- Resolve mechanism can preload data, improving user experience.
- Lazy loading is an important means of performance optimization.

> Understanding Router is key to mastering Angular's complete architectural loop.
> In the next chapter we will learn **Form System and Reactive Forms Principles (Template vs Reactive Forms)**,
> exploring how Angular implements complex form validation and two-way data binding.
