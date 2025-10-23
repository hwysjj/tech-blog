---
title: "Testing and Engineering Practices (Testing & CI/CD)"
date: "2025-10-06"
tags: ["Angular", "Testing", "Unit Testing", "E2E", "CI/CD", "Jasmine", "Karma"]
category: "Technical Tutorial"
author: "Author"
excerpt: "Deep dive into Angular's complete testing and engineering system, including unit testing (Jasmine + Karma), TestBed testing core, Mock dependencies, async testing (fakeAsync), HTTP testing, E2E testing (Protractor/Cypress), code quality control (Lint, Prettier, SonarQube), and CI/CD workflow practices."
---

# 🧩 Chapter 9: Testing and Engineering Practices (Testing & CI/CD)

## 1. Why Testing is Key to Engineering

In enterprise-level Angular projects, testing is not just "verifying functional correctness",
but the foundation for ensuring **code maintainability and sustainable system delivery**.

Angular officially provides built-in comprehensive testing support from the design level:
- TestBed (unit testing framework)
- Jasmine + Karma testing environment
- Protractor / Cypress E2E testing tools
- CLI auto-generation and coverage statistics

---

## 2. Angular Testing System Architecture

| Test Type | Scope | Tools | Purpose |
|-----------|-------|-------|---------|
| Unit Test | Functions, components, services | Jasmine + Karma | Verify logic and behavior |
| Integration Test | Module and component interaction | TestBed | Verify dependency integration effects |
| E2E Test | User operation flow | Protractor / Cypress | Simulate real scenarios |

---

## 3. Unit Testing Basics: Jasmine + Karma

Angular uses Jasmine to write test cases, with Karma as the runner.

### Example: Testing Service Logic

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

Run command:
```bash
ng test
```

---

## 4. TestBed: Angular's Testing Core

TestBed provides a test simulator for Angular runtime environment,
capable of creating modules, injecting services, and compiling components in tests.

### Example: Testing Component Rendering

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

## 5. Mock Dependencies and Services

### Using `spyOn` to Mock Method Calls

```ts
it('should call getUser once', () => {
  const service = jasmine.createSpyObj('UserService', ['getUser']);
  service.getUser.and.returnValue({ name: 'MockUser' });
  expect(service.getUser).toHaveBeenCalledTimes(0);
});
```

### Using TestBed to Provide Mocks

```ts
class MockApiService {
  fetch() { return of({ data: 'mocked' }); }
}

TestBed.configureTestingModule({
  providers: [{ provide: ApiService, useClass: MockApiService }]
});
```

---

## 6. Async Testing and fakeAsync

Much Angular logic depends on async operations (like HttpClient, setTimeout, Observable).
Use `fakeAsync` with `tick()` to simulate time passage.

```ts
it('should simulate delay', fakeAsync(() => {
  let done = false;
  setTimeout(() => done = true, 1000);
  tick(1000);
  expect(done).toBeTrue();
}));
```

---

## 7. HTTP Request Testing (HttpClientTestingModule)

Angular provides `HttpClientTestingModule` to mock backend interactions.

```ts
it('should call backend API', () => {
  const mockData = { name: 'Test' };

  const req = http.expectOne('/api/user');
  expect(req.request.method).toBe('GET');

  req.flush(mockData);
});
```

Complete example:

```ts
TestBed.configureTestingModule({
  imports: [HttpClientTestingModule],
  providers: [UserService]
});

const service = TestBed.inject(UserService);
const http = TestBed.inject(HttpTestingController);
```

---

## 8. End-to-End Testing (E2E)

E2E testing simulates complete user operation flow in browsers.

### 1️⃣ Using Protractor (Angular legacy)

```ts
it('should display welcome message', async () => {
  await browser.get('/');
  const text = await element(by.css('app-root h1')).getText();
  expect(text).toEqual('Welcome');
});
```

### 2️⃣ Using Cypress (Recommended)

Cypress is more modern with intuitive debugging.

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

## 9. Code Quality and Standards Control

### 1️⃣ Lint Checking

```bash
ng lint
```

Syntax and style checking based on ESLint/TSLint rules.

### 2️⃣ Prettier Auto-Formatting

```bash
npx prettier --write "src/**/*.ts"
```

### 3️⃣ SonarQube Static Analysis

Integrate SonarQube for quality review:
- Code complexity
- Coverage
- Duplication rate
- Technical debt metrics

---

## 10. CI/CD Workflow Practices

### 1️⃣ GitHub Actions Example

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

### 2️⃣ Jenkins Pipeline

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

## 11. Test Coverage and Reports

Execute:
```bash
ng test --code-coverage
```

Output:
`coverage/index.html`

Recommended targets:
- Unit test coverage ≥ 80%
- Service and pipe testing ≥ 90%
- E2E flow covers main paths

---

## 12. High-Frequency Interview Questions

| Question | Key Points |
|----------|------------|
| How to do unit testing in Angular? | Use Jasmine + Karma + TestBed |
| What is TestBed? | Angular testing runtime environment, provides modules and DI |
| How to Mock HTTP requests? | Use HttpClientTestingModule |
| Difference between fakeAsync and async? | fakeAsync can synchronously control time flow, async waits asynchronously |
| E2E testing tool recommendation? | Cypress (modern, fast, intuitive) |
| How to integrate testing in CI/CD? | Execute lint, test, build stages in build pipeline |

---

## 13. Summary

- Angular has built-in comprehensive testing ecosystem (unit, integration, E2E);
- TestBed simulates complete dependency injection environment;
- Cypress provides more modern E2E testing experience;
- Combined with Lint, Prettier, SonarQube ensures code standards;
- Automated testing in CI/CD workflow prevents regressions and deployment errors.

> Testing is not a burden, but the source of team delivery confidence.
> In the next chapter, we enter the final chapter ——
> **Complete Summary and Practice Roadmap (Summary & Roadmap)**.
