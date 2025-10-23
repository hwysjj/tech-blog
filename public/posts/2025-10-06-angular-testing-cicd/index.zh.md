---
title: "测试与工程化实践（Testing & CI/CD）"
date: "2025-10-06"
tags: ["Angular", "测试", "单元测试", "E2E", "CI/CD", "Jasmine", "Karma"]
category: "技术教程"
author: "博主"
excerpt: "深入理解 Angular 测试与工程化完整体系，包括单元测试（Jasmine + Karma）、TestBed 测试核心、Mock 依赖、异步测试（fakeAsync）、HTTP 测试、E2E 测试（Protractor/Cypress）、代码质量控制（Lint、Prettier、SonarQube）和 CI/CD 流程实践。"
---

# 🧩 第 9 章：测试与工程化实践（Testing & CI/CD）

## 一、为什么测试是工程化的关键

在企业级 Angular 项目中，测试不仅是"验证功能正确性"，
更是确保 **代码可维护、系统可持续交付** 的基石。

Angular 官方从设计层面就内置了完整的测试支持：
- TestBed（单元测试框架）
- Jasmine + Karma 测试环境
- Protractor / Cypress E2E 测试工具
- CLI 自动生成与覆盖率统计

---

## 二、Angular 测试体系结构

| 测试类型 | 范围 | 工具 | 目的 |
|-----------|------|------|------|
| 单元测试（Unit Test） | 函数、组件、服务 | Jasmine + Karma | 验证逻辑与行为 |
| 集成测试（Integration Test） | 模块与组件交互 | TestBed | 验证依赖整合效果 |
| 端到端测试（E2E） | 用户操作流程 | Protractor / Cypress | 模拟真实场景 |

---

## 三、单元测试基础：Jasmine + Karma

Angular 使用 Jasmine 编写测试用例，Karma 作为运行器。

### 示例：测试服务逻辑

```ts
@Injectable({ providedIn: 'root' })
export class MathService {
  add(a: number, b: number) { return a + b; }
}
```

```ts
describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    service = new MathService();
  });

  it('should add two numbers correctly', () => {
    expect(service.add(2, 3)).toBe(5);
  });
});
```

运行命令：
```bash
ng test
```

---

## 四、TestBed：Angular 的测试核心

TestBed 提供 Angular 运行环境的测试模拟器，
能在测试中创建模块、注入服务、编译组件。

### 示例：测试组件渲染

```ts
@Component({
  selector: 'hello',
  template: `<p>Hello {{ name }}</p>`
})
export class HelloComponent {
  @Input() name = 'Angular';
}
```

```ts
describe('HelloComponent', () => {
  let fixture: ComponentFixture<HelloComponent>;
  let component: HelloComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelloComponent]
    });

    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
  });

  it('should render name', () => {
    component.name = 'William';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('p');
    expect(el.textContent).toContain('William');
  });
});
```

---

## 五、Mock 依赖与服务

### 使用 `spyOn` 模拟方法调用

```ts
it('should call getUser once', () => {
  const service = jasmine.createSpyObj('UserService', ['getUser']);
  service.getUser.and.returnValue({ name: 'MockUser' });
  expect(service.getUser).toHaveBeenCalledTimes(0);
});
```

### 使用 TestBed 提供 Mock

```ts
class MockApiService {
  fetch() { return of({ data: 'mocked' }); }
}

TestBed.configureTestingModule({
  providers: [{ provide: ApiService, useClass: MockApiService }]
});
```

---

## 六、异步测试与 fakeAsync

Angular 中的许多逻辑依赖异步（例如 HttpClient、setTimeout、Observable）。
使用 `fakeAsync` 与 `tick()` 模拟时间流动。

```ts
it('should simulate delay', fakeAsync(() => {
  let done = false;
  setTimeout(() => done = true, 1000);
  tick(1000);
  expect(done).toBeTrue();
}));
```

---

## 七、HTTP 请求测试（HttpClientTestingModule）

Angular 提供 `HttpClientTestingModule` 模拟后端交互。

```ts
it('should call backend API', () => {
  const mockData = { name: 'Test' };

  const req = http.expectOne('/api/user');
  expect(req.request.method).toBe('GET');

  req.flush(mockData);
});
```

完整示例：

```ts
TestBed.configureTestingModule({
  imports: [HttpClientTestingModule],
  providers: [UserService]
});

const service = TestBed.inject(UserService);
const http = TestBed.inject(HttpTestingController);
```

---

## 八、端到端测试（E2E）

E2E 测试用于模拟用户在浏览器中的完整操作流程。

### 1️⃣ 使用 Protractor（Angular 旧版）

```ts
it('should display welcome message', async () => {
  await browser.get('/');
  const text = await element(by.css('app-root h1')).getText();
  expect(text).toEqual('Welcome');
});
```

### 2️⃣ 使用 Cypress（推荐）

Cypress 更现代、调试更直观。

```js
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('123456');
    cy.get('button').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

## 九、代码质量与规范控制

### 1️⃣ Lint 检查

```bash
ng lint
```

基于 ESLint/TSLint 规则进行语法和风格检查。

### 2️⃣ Prettier 自动格式化

```bash
npx prettier --write "src/**/*.ts"
```

### 3️⃣ SonarQube 静态分析

集成 SonarQube 进行质量审查：
- 代码复杂度
- 覆盖率
- 重复率
- 技术债指标

---

## 十、CI/CD 流程实践

### 1️⃣ GitHub Actions 示例

```yaml
name: Angular CI Pipeline
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --watch=false --browsers=ChromeHeadless
      - run: npm run build -- --configuration production
```

### 2️⃣ Jenkins 流水线

```groovy
pipeline {
  agent any
  stages {
    stage('Install') { steps { sh 'npm ci' } }
    stage('Test') { steps { sh 'npm run test -- --watch=false' } }
    stage('Build') { steps { sh 'npm run build -- --prod' } }
    stage('Deploy') { steps { sh './deploy.sh' } }
  }
}
```

---

## 十一、测试覆盖率与报告

执行：
```bash
ng test --code-coverage
```

输出：
`coverage/index.html`

目标建议：
- 单元测试覆盖率 ≥ 80%
- 服务与管道测试 ≥ 90%
- E2E 流程覆盖主路径

---

## 十二、面试高频问题

| 问题 | 答题要点 |
|------|-----------|
| Angular 如何做单元测试？ | 使用 Jasmine + Karma + TestBed |
| 什么是 TestBed？ | Angular 测试运行环境，提供模块与依赖注入 |
| 如何 Mock HTTP 请求？ | 使用 HttpClientTestingModule |
| fakeAsync 与 async 区别？ | fakeAsync 可同步控制时间流，async 异步等待 |
| E2E 测试工具推荐？ | Cypress（现代、快、直观） |
| CI/CD 中如何集成测试？ | 在构建流水线中执行 lint、test、build 阶段 |

---

## 十三、总结

- Angular 内置完善的测试生态（单元、集成、E2E）；
- TestBed 模拟完整依赖注入环境；
- Cypress 提供更现代化的端到端测试体验；
- 结合 Lint、Prettier、SonarQube 可确保代码规范；
- CI/CD 流程中自动化测试可防止回归与错误上线。

> 测试不是负担，而是团队交付信心的来源。
> 下一章，我们将进入收官篇 ——
> **全书总结与实践路径指南（Summary & Roadmap）**。
