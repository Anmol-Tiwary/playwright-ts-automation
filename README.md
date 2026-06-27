# 🎭 Playwright E2E Automation Framework

> A scalable, production-grade end-to-end test automation framework built with **Playwright** and **TypeScript**, featuring **Page Object Model**, **Custom Fixtures**, **API Testing**, **Allure Reporting**, **CI/CD via GitHub Actions**, and **AI capabilities via MCP (Model Context Protocol)**.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-FF6A00?style=for-the-badge&logo=data:image/png;base64,&logoColor=white)

---

## 📌 About

This framework is built to reflect real-world SDET practices with a clean, scalable architecture. It covers UI E2E testing, API testing, cross-browser execution, and AI-assisted test capabilities — all wired into a CI/CD pipeline that runs on every push.

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation & E2E test runner |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test scripting |
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Allure Reporter](https://allurereport.org/) | Rich HTML test reporting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) | AI-assisted test capabilities |

---

## 📁 Project Structure

```
playwright-ts-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
│
├── src/
│   ├── pages/
│   │   ├── common/
│   │   │   └── LoginPage.ts        # Shared login — used by all test flows
│   │   ├── inventory/
│   │   │   ├── InventoryPage.ts
│   │   │   ├── CartPage.ts
│   │   │   └── CheckoutPage.ts
│   │   └── appointment/
│   │       └── AppointmentPage.ts
│   │
│   ├── fixtures/
│   │   └── fixtures.ts             # Central fixture file — injects all pages
│   │
│   ├── helpers/
│   │   └── file-helpers.ts         # Reusable utility functions
│   │
│   └── data/
│       ├── inventory.data.ts       # Typed test data for SauceDemo
│       └── appointment.data.ts     # Typed test data for CURA Healthcare
│
├── tests/
│   ├── ui/
│   │   ├── inventory/
│   │   │   └── inventory.spec.ts   # SauceDemo E2E tests
│   │   └── appointment/
│   │       └── appointment.spec.ts # CURA Healthcare E2E tests
│   └── api/
│       └── users.api.spec.ts       # REST API tests (Reqres)
│
├── .env.example                    # Environment variable reference
├── .gitignore
├── package.json
├── playwright.config.ts            # Global Playwright configuration
├── tsconfig.json
└── README.md
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18 or above
- npm v9 or above

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Anmol-Tiwary/playwright-ts-automation.git
cd playwright-ts-automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Configure environment variables

```bash
cp .env.example .env
# Update .env with your values if needed
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test suite
npm run test:inventory
npm run test:appointment
npm run test:api

# Run in headed mode (watch browser)
npx playwright test --headed

# Run only smoke tests
npx playwright test --grep @smoke

# Run only regression tests
npx playwright test --grep @regression

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Debug mode
npx playwright test --debug

# UI mode (interactive)
npx playwright test --ui
```

---

## 📊 Test Reports

```bash
# View Playwright HTML report
npx playwright show-report

# Generate and view Allure report
npx allure generate allure-results --clean
npx allure open
```

---

## 🧪 Test Coverage

| Suite | Application | Type | Tags |
|---|---|---|---|
| Inventory | [SauceDemo](https://www.saucedemo.com) | UI E2E | `@smoke` `@regression` |
| Appointment | [CURA Healthcare](https://katalon-demo-cura.herokuapp.com) | UI E2E | `@smoke` |
| Users API | [Reqres](https://reqres.in) | API | `@api` |

---

## 🏗️ Framework Architecture

### Page Object Model (POM)
All UI interactions are encapsulated in page classes under `src/pages/`. Each feature has its own subfolder. The `LoginPage` under `common/` is shared across all test flows.

### Custom Fixtures
`src/fixtures/fixtures.ts` extends Playwright's base `test` with all page objects. Tests simply destructure the pages they need — no manual `new PageClass(page)` instantiation required.

```typescript
// Every test gets pages injected automatically
test('example', async ({ loginPage, inventoryPage }) => {
    await loginPage.loginToSauceDemo(username, password);
    await inventoryPage.assertProductCount(6);
});
```

### Typed Test Data
All test data lives in `src/data/` as typed TypeScript constants — no hardcoded values inside spec files.

### Scalability — Adding a New Feature
1. Create `src/pages/newfeature/NewPage.ts`
2. Register it in `src/fixtures/fixtures.ts`
3. Add data in `src/data/newfeature.data.ts`
4. Write tests in `tests/ui/newfeature/newfeature.spec.ts`

Nothing else changes. ✅

---

## 🔄 CI/CD

GitHub Actions pipeline triggers on every push and pull request to `main`:

- ✅ Installs Node.js and dependencies
- ✅ Installs Playwright browsers
- ✅ Runs full test suite
- ✅ Uploads HTML report as artifact
- ✅ Uploads test results as artifact

---

## 🤖 AI Capabilities (MCP Integration)

This framework integrates with **MCP (Model Context Protocol)** enabling AI-assisted testing workflows:

- AI-driven test scenario suggestions
- Intelligent locator generation
- Natural language to test script conversion
- Agentic browser interaction via Claude and other AI models

---

## 🌟 Key Features

- ✅ **Scalable POM Architecture** — feature-grouped page classes, zero duplication
- ✅ **Custom Fixtures** — automatic page injection via `base.extend<PageFixtures>()`
- ✅ **Typed Test Data** — all data in typed TypeScript constants
- ✅ **UI + API Testing** — full coverage in one framework
- ✅ **Cross-browser** — Chromium, Firefox, WebKit, Mobile Chrome
- ✅ **Allure + HTML Reporting** — rich visual test reports
- ✅ **GitHub Actions CI/CD** — automated on every commit
- ✅ **MCP / AI Integration** — next-gen agentic test capabilities
- ✅ **Screenshot on failure** — auto-captured for debugging
- ✅ **Video on failure** — retained for flaky test analysis
- ✅ **Trace on retry** — full trace for CI failures

---

## 👤 Author

**Anmol Tiwary**
- 🔗 [LinkedIn](https://www.linkedin.com/in/anmolkumar96/)
- 🐙 [GitHub](https://github.com/Anmol-Tiwary)
- 💼 SDET | 3.5+ Years | Playwright · Selenium · TypeScript · Java · AI-Assisted Testing | Immediate Joiner

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).