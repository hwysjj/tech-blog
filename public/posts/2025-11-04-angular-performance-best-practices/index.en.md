---
title: "Performance Optimization and Best Practices"
date: "2025-11-04"
tags: ["Angular", "Performance Optimization", "OnPush", "Virtual Scrolling", "Lazy Loading", "Tree-Shaking"]
category: "Technical Tutorial"
author: "Author"
excerpt: "Deep dive into Angular's complete performance optimization system, including template layer optimization (OnPush, trackBy, pure pipes), data layer optimization (RxJS + AsyncPipe), rendering layer optimization (virtual scrolling, local detection), network layer optimization (lazy loading, preloading, caching), build layer optimization (AOT, Tree-Shaking), and performance monitoring tools."
---

# 🧩 Chapter 8: Performance Optimization and Best Practices

## 1. Overall Performance Optimization Strategy

Angular is a structured framework, and performance bottlenecks often appear in the following four layers:

| Layer | Focus | Optimization Direction |
|-------|-------|------------------------|
| Template Layer | Over-rendering, event binding | Reduce detection, cache computed results |
| Data Layer | Frequent change detection triggers | Async streams + OnPush strategy |
| Rendering Layer | Intensive DOM operations | Virtual scrolling, lazy loading, incremental rendering |
| Network Layer | Excessive loading and requests | Caching, preloading, compression, CDN |

---

## 2. Template Layer Optimization: Reduce Unnecessary Rendering

### 1️⃣ Use `ChangeDetectionStrategy.OnPush`

Default mode (`Default`) automatically detects all child components when parent component state changes.
`OnPush` mode only triggers in the following situations:
- @Input() reference changes;
- Event triggers;
- Async streams (Observable) emit new values;
- Manually call `markForCheck()`.

```ts
@Component({
  selector: 'user-card',
  template: `<p>{{ user.name }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user!: User;
}
```

**Effect:**
Significantly reduces change detection frequency, especially in long lists.

---

### 2️⃣ Use `trackBy` to Optimize *ngFor

Angular defaults to judging list changes by object reference, re-rendering entire list if references differ.
`trackBy` helps the framework precisely identify changed items.

```html
<li *ngFor="let user of users; trackBy: trackById">{{ user.name }}</li>
```

```ts
trackById(index: number, user: User) {
  return user.id;
}
```

**Result:** Only updates changed items, not rebuilding the entire list.

---

### 3️⃣ Use Pure Pipes to Cache Results

Pure pipes only recalculate when input parameters change.
For example:

```ts
@Pipe({ name: 'capitalize', pure: true })
export class CapitalizePipe implements PipeTransform {
  transform(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
```

In contrast, `pure: false` pipes execute on every detection.

---

## 3. Data Layer Optimization: Utilize RxJS + AsyncPipe

### 1️⃣ Async Stream Auto-Optimization

```html
<div *ngIf="user$ | async as user">
  {{ user.name }}
</div>
```

### 2️⃣ AsyncPipe Advantages
| Advantage | Description |
|-----------|-------------|
| Auto subscribe/unsubscribe | Avoid memory leaks |
| Compatible with OnPush | Async streams trigger detection |
| Reduce logic code | No manual unsubscribe needed |

---

### 3️⃣ Merge High-Frequency Stream Events (debounce, throttle)

For example, search input:

```ts
this.searchInput.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged()
).subscribe(value => this.query(value));
```

Avoid frequent network requests and rendering triggers.

---

## 4. Rendering Layer Optimization: Local Updates and Virtual Scrolling

### 1️⃣ Local Detection (markDirty / detectChanges)

When only a specific component needs refresh:

```ts
this.cdr.detectChanges(); // Current component only
```

Or use Ivy internal API:
```ts
import { ɵmarkDirty as markDirty } from '@angular/core';
markDirty(MyComponent);
```

---

### 2️⃣ Virtual Scrolling

For large data lists, Angular CDK provides virtual scrolling module:

```html
<cdk-virtual-scroll-viewport itemSize="50" style="height: 300px">
  <div *cdkVirtualFor="let item of items">{{ item }}</div>
</cdk-virtual-scroll-viewport>
```

**Principle:**
Only renders visible area data, drastically reducing DOM element count.

---

## 5. Network Layer Optimization

### 1️⃣ Route Lazy Loading

Load modules only when accessed:

```ts
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
```

### 2️⃣ Route Preloading (PreloadAllModules)

Preload other modules during idle time:

```ts
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
```

### 3️⃣ Resource Caching and Compression
- Use Angular Service Worker for PWA caching;
- Enable gzip / brotli compression;
- Properly utilize browser Cache-Control strategy.

---

## 6. Build Layer Optimization

### 1️⃣ Enable AOT Compilation and Optimized Build

```bash
ng build --prod
```

Automatically enables:
- AOT compilation
- Tree-Shaking
- Minification (Terser)
- CSS optimization
- SourceMap removal

---

### 2️⃣ Analyze Build Size

```bash
ng build --configuration production --stats-json
npx source-map-explorer dist/app/*.js
```

Or use Angular official tools:
```bash
ng build --named-chunks --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

---

### 3️⃣ Remove Unnecessary Polyfills

In modern browsers, can disable legacy support:
Modify `polyfills.ts`, import compatibility packages as needed.

---

## 7. Ivy-Level Optimization Techniques

1️⃣ **Template Inlining**
Angular CLI automatically compiles small templates directly into components, reducing request count.

2️⃣ **Locality Compilation Principle**
Ivy only compiles changed components, incremental build speed increased 30–50%.

3️⃣ **Tree-Shaking and Directive Trimming**
Unreferenced pipes, directives, modules are automatically removed.

4️⃣ **Local Update Mechanism**
Only updates affected nodes, not the entire component tree.

---

## 8. Performance Monitoring and Diagnostic Tools

| Tool | Function |
|------|----------|
| **Angular DevTools** | Analyze change detection frequency and performance bottlenecks |
| **Chrome Profiler** | Performance snapshots and CPU analysis |
| **Lighthouse** | Page performance and accessibility analysis |
| **RxJS Marbles** | Visualize stream behavior analysis |

### Example: Angular DevTools Detection
View component refresh frequency in "Change Detection" panel.

---

## 9. Enterprise-Level Performance Optimization Checklist

✅ **Template Layer**
- [ ] Use `OnPush` strategy
- [ ] Use `trackBy`
- [ ] Avoid `pure: false` pipes
- [ ] Avoid calling functions in templates

✅ **Data Layer**
- [ ] Use AsyncPipe instead of manual subscription
- [ ] Use debounceTime to reduce event frequency
- [ ] Control ChangeDetectorRef scope

✅ **Rendering Layer**
- [ ] Use virtual scrolling
- [ ] Chunk rendering
- [ ] Avoid excessive component nesting

✅ **Network Layer**
- [ ] Enable lazy loading and preloading strategies
- [ ] Compress and cache resources
- [ ] Merge HTTP requests

✅ **Build Layer**
- [ ] Enable AOT and Tree-Shaking
- [ ] Remove excess Polyfills
- [ ] Use Bundle Analyzer to check size

---

## 10. High-Frequency Interview Questions

| Question | Key Points |
|----------|------------|
| What are Angular performance optimizations? | OnPush, trackBy, lazy loading, AsyncPipe, virtual scrolling, Tree-Shaking |
| Advantages of AsyncPipe? | Auto subscribe and destroy, reduce detection burden |
| trackBy principle? | Track objects by unique identifier, avoid DOM rebuilding |
| How does Ivy optimize performance? | Incremental compilation, local updates, Tree-Shaking |
| How to reduce initial load size? | Lazy loading, AOT, gzip, import modules on demand |

---

## 11. Summary

- Performance optimization should start from template, data, rendering, and network layers;
- `OnPush` + `AsyncPipe` is Angular's golden performance combination;
- Ivy engine provides powerful mechanisms for incremental compilation and local detection;
- Build optimization (AOT, Tree-Shaking, lazy loading) is crucial for production environment;
- DevTools and Profiler can quantify optimization results.

> Performance optimization is not just techniques, but systematic thinking.
> In the next chapter we enter the final chapter ——
> **Testing and Engineering Practices (Testing & CI/CD)**,
> exploring how to keep high-performance code "verifiable and sustainable".
