---
title: "Angular Architecture Overview"
date: "2025-09-28"
tags: ["Angular", "Architecture Design", "NgModule", "Ivy", "Dependency Injection"]
category: "Technical Tutorial"
author: "Author"
excerpt: "Deep dive into Angular architecture core concepts, including component-driven design, dependency injection, modular architecture, application bootstrap process, NgModule structure, Ivy rendering engine, and DI system to master Angular's overall architectural philosophy."
---

# 🧩 Chapter 1: Angular Architecture Overview

## 1. Core Philosophy of Framework Architecture

Angular is a "**component-driven + dependency injection + modular + template compilation**" frontend framework.
Its biggest difference from React is: React is a **UI Library**, Angular is an **Application Framework**.

Angular has its own:
- Module system (NgModule)
- Dependency injection container (DI System)
- Compilation and rendering engine (Ivy)
- Router system (Router)
- Reactive stream tools (RxJS)

---

## 2. Angular Application Composition Structure

Angular applications consist of multiple core building blocks:

| Building Block Type | Description | Example |
|---------------------|-------------|---------|
| Component | Smallest unit controlling views, logic, and styles | `@Component({ selector: 'app-root' })` |
| Directive | Instructions that change DOM behavior | `*ngIf`, `*ngFor` |
| Pipe | Responsible for data transformation | `{{ date | date:'yyyy-MM-dd' }}` |
| Service | Reusable logic or data operations | `@Injectable()` |
| NgModule | Encapsulation and dependency management of functional modules | `@NgModule({ declarations, imports, providers })` |

---

## 3. Application Bootstrap Process

The entry file of an Angular application is typically `main.ts`.
Let's understand the entire startup process starting from it.

### 🔹 Code Example

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### 🔍 Process Breakdown

1️⃣ **platformBrowserDynamic()**
Creates the browser platform environment (PlatformRef).

2️⃣ **bootstrapModule(AppModule)**
Compiles the root module, generating application context (Injector + Zone + Component).

3️⃣ **Ivy Compiler Starts**
Ivy compiles templates into rendering functions and generates DOM structure.

4️⃣ **Application Running**
Angular enters the running phase, listening to async tasks in Zone.js to trigger change detection.

---

## 4. NgModule Purpose and Structure

Every Angular application has at least one root module (AppModule).
Modules are Angular's "functional boundaries", defining how components, services, directives, and pipes are organized.

### ✅ Basic Structure

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

| Property | Function |
|----------|----------|
| declarations | Declares components/directives/pipes contained in the current module |
| imports | Imports other modules |
| providers | Registers services for dependency injection |
| bootstrap | Bootstrap component (only used in root module) |

---

## 5. Angular Architecture Layered Diagram (Text Version)

```
                    +-----------------------------+
                    |       Angular Application   |
                    +-----------------------------+
                                   |
          +--------------------------------------------------+
          |                    NgModule Layer                |
          +--------------------------------------------------+
                                   |
     +--------------+   +---------------+   +---------------+
     | Component    |   | Service       |   | Directive/    |
     | Layer        |   | Layer         |   | Pipe Layer    |
     +--------------+   +---------------+   +---------------+
                                   |
                         +--------------------+
                         |   Template Layer   |
                         +--------------------+
                                   |
                         +--------------------+
                         | DOM Rendering &    |
                         | Change Detection   |
                         +--------------------+
```

---

## 6. Ivy Rendering Engine: Runtime Core Mechanism

After Angular 8, the Ivy rendering engine is enabled by default.
It compiles templates into directive functions, improving runtime performance and debuggability.

### 🔹 Ivy Compiled Structure

```ts
@Component({
  selector: 'app-root',
  template: '<h1>Hello {{ name }}</h1>'
})
export class AppComponent {
  name = 'Angular';
}
```

After Ivy compilation, it generates something like:
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

This is Angular's process of "pre-compiling templates into directive calls".

---

## 7. Dependency Injection System Overview

Angular's DI mechanism is the foundation of the entire framework.

- Each module and component has its own Injector;
- Services can be injected globally or locally after being registered in the Injector tree;
- Angular maintains dependency relationship tables through `ReflectiveInjector`.

### 🔹 Example

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

## 8. Angular vs React Architecture Comparison

| Feature | Angular | React |
|---------|---------|-------|
| Core Type | Complete Framework | UI Library |
| Language | Native TypeScript support | JavaScript + JSX |
| Template System | HTML templates + directive syntax | JSX expressions |
| State Management | Dependency Injection + RxJS | Hooks + Context |
| Rendering Engine | Ivy compiler | Fiber architecture |
| Change Detection | Zone.js + Change Detection | Hook + Diff |
| Ecosystem Integration | Router, Forms, DI built-in | Requires third-party (Redux, Router) |

---

## 9. Summary

Angular is a **strongly constrained, highly integrated frontend framework**:
- Modular design (NgModule)
- Dependency injection system (DI)
- Template compilation and rendering engine (Ivy)
- Reactive data flow (RxJS)
- Complete ecosystem (Router, Forms, CLI)

Understanding Angular's architectural overview is the first step to deeply learning its underlying mechanisms (such as change detection, DI tree structure, compilation process).

> From here, we will explore Angular's runtime mechanisms in subsequent chapters ——
> Change detection, dependency injection, template compilation, performance optimization, and source code analysis.
