# 🎭 Playwright E2E Automation Framework

> A production-grade end-to-end test automation framework built with **Playwright** and **TypeScript**, featuring AI capabilities via **MCP (Model Context Protocol)** integration.

## 📌 About

This framework demonstrates a scalable, maintainable E2E automation setup using modern tooling. It is designed to reflect real-world SDET practices — with clean project structure, environment-based configuration, data-driven testing, CI/CD integration, and AI-assisted test generation via MCP.

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation & test runner |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test scripting |
| [Node.js](https://nodejs.org/) | Runtime environment |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) | AI-assisted test capabilities |
| `.env` config | Environment variable management |

---

## 📁 Project Structure

```
playwright-ts-automation/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD pipelines
├── config/                 # Environment and global config files
├── data/
│   └── functional/         # Test data for data-driven tests
├── tests/                  # Test spec files (.spec.ts)
├── .env.example            # Sample environment variables (copy to .env)
├── .gitignore
├── package.json
├── playwright.config.ts    # Playwright global configuration
├── tsconfig.json           # TypeScript compiler options
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
# Update .env with your test environment values
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (see the browser)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/login.spec.ts

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run tests in debug mode
npx playwright test --debug
```

---

## 📊 Test Reports

Playwright HTML reports are generated automatically after each test run.

```bash
# View the HTML report
npx playwright show-report
```

---

## 🔄 CI/CD

This project uses **GitHub Actions** for continuous integration. Tests are triggered automatically on every push and pull request to the `main` branch.

Workflow file: `.github/workflows/`

The pipeline:
- Installs Node.js and dependencies
- Installs Playwright browsers
- Executes the full test suite
- Publishes test results as artifacts

---

## 🤖 AI Capabilities (MCP Integration)

This framework integrates with **MCP (Model Context Protocol)** to enable AI-assisted testing capabilities, including:

- AI-driven test scenario suggestions
- Intelligent locator generation
- Natural language to test script conversion

MCP allows Claude and other AI agents to interact with the browser programmatically, making this framework ready for next-generation agentic test automation workflows.

---

## 🌟 Key Features

- ✅ **TypeScript** — Fully typed codebase for better IDE support and fewer runtime errors
- ✅ **Page Object Model (POM)** — Clean separation of test logic and UI interactions
- ✅ **Data-driven testing** — Functional test data managed in `data/functional/`
- ✅ **Environment config** — Centralised config via `playwright.config.ts` and `.env`
- ✅ **Cross-browser support** — Chromium, Firefox, and WebKit via Playwright
- ✅ **GitHub Actions CI/CD** — Automated test execution on every commit
- ✅ **MCP / AI Integration** — AI-assisted test generation and execution

---

## 👤 Author

**Anmol Tiwary**
- 🔗 [LinkedIn](https://www.linkedin.com/in/anmolkumar96/)
- 🐙 [GitHub](https://github.com/Anmol-Tiwary)
- 💼 SDET | 3.5+ Years in Test Automation | Playwright · Selenium · TypeScript · Java · AI-Assisted Testing

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).