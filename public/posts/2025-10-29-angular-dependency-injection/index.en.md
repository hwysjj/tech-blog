---
title: "Dependency Injection Mechanism"
date: "2025-10-29"
tags: ["Angular", "Dependency Injection", "DI", "Injector", "Provider"]
category: "Technical Tutorial"
author: "Author"
excerpt: "Deep dive into Angular's dependency injection mechanism core principles, including Provider, Injector, Token system, hierarchical injector tree, scope management, multi-provider, dynamic injection, and advanced control decorators to master the complete Angular DI system knowledge."
---

# 🧩 Chapter 3: Dependency Injection Mechanism

## 1. Overview: What is Dependency Injection

**Dependency Injection (DI)** is one of Angular framework's most core mechanisms.
Its essence is:
> "Separate object creation from usage, allowing dependencies to be automatically injected rather than manually created."

Angular's DI system manages all dependencies (Services) through **Injector**.
Each component or module has its own injection context.

---

## 2. Dependency Injection System in Angular

| Element | Function Description |
|---------|---------------------|
| **Provider** | Defines how dependencies are provided |
| **Injector** | Stores dependency instances and handles injection |
| **Token** | Identifies dependencies (usually class names or strings) |
| **Service** | The actual dependency object being injected |

---

## 3. How Dependency Injection Works

When Angular application starts, it creates a **Root Injector**,
and creates **Child Injectors** for each module or component.

The process is as follows:

```
@NgModule() → Register Provider
       ↓
Root Injector Created
       ↓
Component Injector (component level)
       ↓
When component requests dependency → Injector searches hierarchical tree → Returns instance
```

---

## 4. Simplest Dependency Injection Example

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

### ✅ Explanation:
- `@Injectable({ providedIn: 'root' })`: Automatically registers the service to the root injector;
- `constructor(private userService: UserService)`: Angular automatically injects the instance;
- No need to manually create objects (i.e., `new UserService()`).

---

## 5. Injector Hierarchical Structure (Hierarchical Injector Tree)

Angular's Injector has a hierarchical tree structure:

```
Root Injector (Global)
│
├── Module Injector
│     ├── FeatureModule A
│     └── FeatureModule B
│
└── Component Injector
      ├── ParentComponent
      └── ChildComponent
```

### Dependency Lookup Rules:
> Start from current component Injector → Search upward → Until reaching Root Injector.

```ts
@Component({
  selector: 'child',
  template: 'Child works!',
  providers: [UserService] // Local provision
})
export class ChildComponent {
  constructor(private user: UserService) {}
}
```

If `ParentComponent` also provides `UserService`,
then `ChildComponent` will prioritize using its own defined Provider.

---

## 6. Provider Definition Methods

| Definition Method | Syntax | Description |
|-------------------|--------|-------------|
| `useClass` | `{ provide: X, useClass: Y }` | Use class instance |
| `useValue` | `{ provide: TOKEN, useValue: obj }` | Use fixed value |
| `useExisting` | `{ provide: X, useExisting: Y }` | Reuse another Provider |
| `useFactory` | `{ provide: X, useFactory: fn }` | Dynamic factory function |

### Example: `useFactory`

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

## 7. Scope and Lifecycle

Angular Service lifecycle is related to its registration location (Provider).

| Registration Location | Lifecycle | Example |
|-----------------------|-----------|---------|
| Root Injector (`providedIn: 'root'`) | Application-wide singleton | Common services |
| Module (NgModule.providers) | Module level | Independent instances for business modules |
| Component (Component.providers) | Component level | Independent logic or state |

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

Each component instance will create its own `CounterService`.

---

## 8. Advanced Injection Techniques

### 1️⃣ Multi-Provider

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

Angular will merge multiple values into an array: `['file', 'console']`.

---

### 2️⃣ Hierarchical Control Decorators

| Decorator | Description |
|-----------|-------------|
| `@Optional()` | Dependency is optional, inject null if not found |
| `@Self()` | Only search in current Injector |
| `@SkipSelf()` | Skip current Injector, search from parent |
| `@Host()` | Limit search to host component |

Example:
```ts
constructor(@Optional() private service?: OptionalService) {}
```

---

## 9. Injector API and Dynamic Injection

You can manually resolve dependencies through `Injector`.

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

You can also use `ReflectiveInjector.resolveAndCreate()` for dynamic creation:

```ts
const injector = ReflectiveInjector.resolveAndCreate([UserService]);
const user = injector.get(UserService);
```

---

## 10. Why Does Angular Need DI?

### ✅ Main Advantages

1. **Decouple Components and Dependencies**
   - Components don't create dependencies, they only declare what they need.

2. **High Replaceability and Testability**
   - Easy to mock services in tests.

3. **Modularity and Hierarchical Reuse**
   - Independent injection systems for each module, avoiding global pollution.

4. **Control Object Lifecycle**
   - Framework uniformly manages creation and destruction of service instances.

---

## 11. Common Interview Questions

| Question | Key Points |
|----------|------------|
| What is Angular's dependency injection principle? | Manages Providers through Injector, searches dependencies hierarchically. |
| What is the purpose of providedIn? | Determines which injector the service is registered in. |
| How to create local scope services? | Register in component or module providers. |
| What does @Optional() do? | Injects null if dependency doesn't exist, instead of throwing error. |
| Difference between Angular DI and React Context? | DI resolves dependencies at runtime, Context explicitly passes data. |

---

## 12. Summary

- Angular's dependency injection system is its architectural core, all functional modules are based on DI.
- Injector forms a hierarchical structure, dependencies are looked up following tree rules.
- Provider defines how dependencies are provided, can be customized or dynamically created.
- `@Injectable()` decorator declares that a class can be injected.
- Advanced control decorators (`@Optional()`, `@Self()`, etc.) allow more precise scope control.

> Understanding DI is the key to understanding how Angular components collaborate.
> In the next chapter, we will explore another high-frequency practical topic ——
> **Component Communication and Data Flow Design (Input/Output + RxJS)**.
