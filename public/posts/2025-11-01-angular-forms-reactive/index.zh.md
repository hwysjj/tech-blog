---
title: "表单系统与响应式表单原理（Template-driven vs Reactive Forms）"
date: "2025-11-01"
tags: ["Angular", "表单系统", "响应式表单", "FormControl", "FormGroup", "验证器"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 Angular 表单系统的两种模式，包括模板驱动表单与响应式表单的原理、FormControl/FormGroup/FormArray 核心类、同步与异步验证机制、自定义验证器、FormBuilder、动态表单、表单状态管理和 valueChanges 响应式数据流。"
---

# 🧩 第 6 章：表单系统与响应式表单原理（Template-driven vs Reactive Forms）

## 一、Angular 表单系统概述

Angular 的表单系统是一个功能完整的 **表单状态管理与验证框架**。
它不仅处理 DOM 输入，还能：
- 管理表单状态（valid、dirty、touched 等）；
- 提供同步与异步验证；
- 通过响应式模型控制复杂表单结构。

Angular 提供两种构建表单的方式：

| 类型 | 模式名称 | 特点 |
|------|-----------|------|
| 模板驱动表单 | Template-driven Forms | 使用指令与模板语法 |
| 响应式表单 | Reactive Forms | 使用类与模型在 TS 中定义 |

---

## 二、模板驱动表单（Template-driven Forms）

模板驱动表单适合简单场景，主要通过模板语法和 `ngModel` 实现双向绑定。

### 示例

```html
<form #form="ngForm" (ngSubmit)="submit(form)">
  <input name="username" [(ngModel)]="user.name" required />
  <input name="email" [(ngModel)]="user.email" email />
  <button type="submit" [disabled]="!form.valid">提交</button>
</form>
```

```ts
export class TemplateFormComponent {
  user = { name: '', email: '' };
  submit(form: NgForm) {
    console.log('表单值：', form.value);
  }
}
```

### 特点：
- 依赖模板指令（`ngModel`、`ngForm`）
- 数据双向绑定自动完成
- 验证与状态通过模板变量访问
- 不适合大型复杂表单

---

## 三、响应式表单（Reactive Forms）

响应式表单在 TypeScript 中通过模型驱动，逻辑更清晰、可测试性更强。

### 示例

```ts
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="username" placeholder="用户名">
      <div *ngIf="form.controls['username'].invalid && form.controls['username'].touched">
        用户名必填
      </div>

      <input formControlName="email" placeholder="邮箱">
      <div *ngIf="form.controls['email'].errors?.['email']">邮箱格式不正确</div>

      <button type="submit" [disabled]="form.invalid">提交</button>
    </form>
  `
})
export class ReactiveFormComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  submit() {
    console.log(this.form.value);
  }
}
```

---

## 四、响应式表单的核心类结构

| 类 | 功能 | 示例 |
|------|------|------|
| `FormControl` | 表单单个控件 | `new FormControl('')` |
| `FormGroup` | 控件组（对象） | `new FormGroup({ username: new FormControl('') })` |
| `FormArray` | 控件数组 | `new FormArray([ new FormControl('') ])` |
| `FormBuilder` | 简化创建表单的工具 | `this.fb.group({ name: ['', Validators.required] })` |

### FormGroup 结构示意图：

```
FormGroup
 ├── username: FormControl
 ├── email: FormControl
 └── address: FormGroup
      ├── city: FormControl
      └── zip: FormControl
```

---

## 五、表单验证机制

Angular 的验证系统基于 Validator 函数。
每个控件都可以同时拥有同步和异步验证器。

### 同步验证

```ts
new FormControl('', [Validators.required, Validators.minLength(3)]);
```

### 异步验证

```ts
new FormControl('', [], [this.emailValidator.checkEmailExists]);
```

```ts
@Injectable({ providedIn: 'root' })
export class EmailValidator {
  checkEmailExists(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(1000),
      map(value => value === 'test@example.com' ? { emailTaken: true } : null)
    );
  }
}
```

### 模板中显示错误

```html
<div *ngIf="form.get('email')?.hasError('emailTaken')">该邮箱已注册</div>
```

---

## 六、自定义验证器（Custom Validator）

```ts
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const strong = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(value);
  return strong ? null : { weakPassword: true };
}
```

```ts
password: new FormControl('', [passwordValidator])
```

模板中：
```html
<div *ngIf="form.get('password')?.hasError('weakPassword')">
  密码需包含大写字母与数字
</div>
```

---

## 七、FormBuilder 快速创建表单

`FormBuilder` 提供 `group()`、`control()`、`array()` 三个便捷方法：

```ts
constructor(private fb: FormBuilder) {}

form = this.fb.group({
  username: ['', Validators.required],
  password: ['', [Validators.required, Validators.minLength(6)]]
});
```

```ts
this.form.valueChanges.subscribe(value => console.log(value));
```

---

## 八、动态表单与 FormArray

### 动态创建多个输入框

```ts
@Component({
  template: `
    <div formArrayName="tags">
      <div *ngFor="let ctrl of tags.controls; let i = index">
        <input [formControlName]="i">
      </div>
      <button (click)="addTag()">添加标签</button>
    </div>
  `
})
export class DynamicFormComponent {
  form = this.fb.group({ tags: this.fb.array([]) });

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }
}
```

---

## 九、表单状态属性详解

| 属性 | 说明 |
|------|------|
| `value` | 当前控件的值 |
| `valid` | 验证是否通过 |
| `invalid` | 验证是否失败 |
| `touched` | 用户是否触碰过控件 |
| `dirty` | 是否修改过值 |
| `pending` | 异步验证是否正在进行 |

---

## 十、表单与数据流（valueChanges 与 statusChanges）

Angular 表单是 **Observable 驱动的系统**，
可以订阅控件的值或状态变化。

```ts
this.form.valueChanges.subscribe(value => console.log('值变化：', value));
this.form.statusChanges.subscribe(status => console.log('状态变化：', status));
```

---

## 十一、实战案例：动态注册表单

```ts
@Component({
  selector: 'app-register',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="username" placeholder="用户名">
      <input type="password" formControlName="password" placeholder="密码">
      <input formControlName="email" placeholder="邮箱">
      <button [disabled]="form.invalid">注册</button>
    </form>
  `
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    console.log('注册成功：', this.form.value);
  }
}
```

---

## 十二、模板驱动 vs 响应式表单 对比

| 对比项 | 模板驱动表单 | 响应式表单 |
|---------|----------------|-------------|
| 数据方向 | 模板 → 组件（双向绑定） | 组件 → 模板（单向绑定） |
| 表单结构定义 | HTML 模板 | TypeScript 代码 |
| 验证方式 | 指令与属性 | Validator 函数 |
| 可测试性 | 较弱 | 强，可单元测试 |
| 动态表单支持 | 弱 | 强 |
| 适用场景 | 简单表单 | 复杂逻辑、动态表单 |

---

## 十三、Angular 表单与 React Controlled Component 对比

| 特性 | Angular Reactive Form | React Controlled Component |
|------|------------------------|-----------------------------|
| 模型管理 | 由 Angular FormControl 控制 | 由 React state 管理 |
| 双向绑定 | 模板指令自动化 | 手动 onChange / setState |
| 验证机制 | Validator + 异步验证 | 手动编写验证逻辑 |
| 数据流 | Observable (valueChanges) | 状态驱动 |
| 动态控件 | FormArray 动态生成 | 手动渲染组件 |

---

## 十四、面试高频问题

| 问题 | 答题要点 |
|------|-----------|
| Angular 有几种表单模式？ | Template-driven 与 Reactive Forms |
| Reactive Form 的核心类有哪些？ | FormControl、FormGroup、FormArray、FormBuilder |
| 如何实现异步验证？ | 通过异步 Validator 返回 Observable |
| 如何监听表单变化？ | 订阅 valueChanges |
| 模板驱动与响应式表单区别？ | 数据流向、定义方式、动态性不同 |

---

## 十五、总结

- 模板驱动表单适合简单场景，响应式表单适合复杂逻辑。
- 表单系统是基于 Observable 的响应式模型。
- Angular 通过 Validator 实现同步与异步验证机制。
- FormBuilder 提供便捷的表单创建方式。
- valueChanges 与 statusChanges 可实现实时数据追踪。

> 理解表单系统，是掌握 Angular 响应式架构的关键。
> 下一章我们将深入 Angular 的底层引擎 ——
> **Ivy 渲染引擎与 AOT 编译机制**。
