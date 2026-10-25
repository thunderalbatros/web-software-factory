---
name: playwright-best-practices
description: "Use when writing Playwright tests, fixing flaky tests, debugging failures, implementing Page Object Model, configuring CI/CD,."
---

# Playwright Best Practices

This skill provides comprehensive guidance for all aspects of Playwright test development, from writing new tests to debugging and maintaining existing test suites.

## Activity-Based Reference Guide

Consult these references based on what you're doing:

### Writing New Tests

**When to use**: Creating new test files, writing test cases, implementing test scenarios

| Activity                            | Reference Files                                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Writing E2E tests**               | [test-suite-structure.md](core/test-suite-structure.md), [locators.md](core/locators.md), [assertions-waiting.md](core/assertions-waiting.md) |
| **Writing component tests**         | [component-testing.md](testing-patterns/component-testing.md), [test-suite-structure.md](core/test-suite-structure.md)                        |
| **Writing API tests**               | [api-testing.md](testing-patterns/api-testing.md), [test-suite-structure.md](core/test-suite-structure.md)                                    |
| **Writing GraphQL tests**           | [graphql-testing.md](testing-patterns/graphql-testing.md), [api-testing.md](testing-patterns/api-testing.md)                                  |
| **Writing visual regression tests** | [visual-regression.md](testing-patterns/visual-regression.md), [canvas-webgl.md](testing-patterns/canvas-webgl.md)                            |
| **Structuring test code with POM**  | [page-object-model.md](core/page-object-model.md), [test-suite-structure.md](core/test-suite-structure.md)                                    |
| **Setting up test data/fixtures**   | [fixtures-hooks.md](core/fixtures-hooks.md), [test-data.md](core/test-data.md)                                                                |
| **Handling authentication**         | [authentication.md](advanced/authentication.md), [authentication-flows.md](advanced/authentication-flows.md)                                  |
| **Testing date/time features**      | [clock-mocking.md](advanced/clock-mocking.md)                                                                                                 |
| **Testing file upload/download**    | [file-operations.md](testing-patterns/file-operations.md), [file-upload-download.md](testing-patterns/file-upload-download.md)                |
| **Testing forms/validation**        | [forms-validation.md](testing-patterns/forms-validation.md)                                                                                   |
| **Testing drag and drop**           | [drag-drop.md](testing-patterns/drag-drop.md)                                                                                                 |
| **Testing accessibility**           | [accessibility.md](testing-patterns/accessibility.md)                                                                                         |
| **Testing security (XSS, CSRF)**    | [security-testing.md](testing-patterns/security-testing.md)                                                                                   |
| **Using test annotations**          | [annotations.md](core/annotations.md)                                                                                                         |
| **Using test tags**                 | [test-tags.md](core/test-tags.md)                                                                                                             |
| **Testing iframes**                 | [iframes.md](browser-apis/iframes.md)                                                                                                         |
| **Testing canvas/WebGL**            | [canvas-webgl.md](testing-patterns/canvas-webgl.md)                                                                                           |
| **Internationalization (i18n)**     | [i18n.md](testing-patterns/i18n.md)                                                                                                           |
| **Testing Electron apps**           | [electron.md](testing-patterns/electron.md)                                                                                                   |
| **Testing browser extensions**      | [browser-extensions.md](testing-patterns/browser-extensions.md)                                                                               |

### Mobile & Responsive Testing

**When to use**: Testing mobile devices, touch interactions, responsive layouts

| Activity                        | Reference Files                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------- |
| **Device emulation**            | [mobile-testing.md](advanced/mobile-testing.md)                                  |
| **Touch gestures (swipe, tap)** | [mobile-testing.md](advanced/mobile-testing.md)                                  |
| **Viewport/breakpoint testing** | [mobile-testing.md](advanced/mobile-testing.md)                                  |
| **Mobile-specific UI**          | [mobile-testing.md](advanced/mobile-testing.md), [locators.md](core/locators.md) |

### Real-Time & Browser APIs

**When to use**: Testing WebSockets, geolocation, permissions, multi-tab flows

| Activity                        | Reference Files                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| **WebSocket/real-time testing** | [websockets.md](browser-apis/websockets.md)                                              |
| **Geolocation mocking**         | [browser-apis.md](browser-apis/browser-apis.md)                                          |
| **Permission handling**         | [browser-apis.md](browser-apis/browser-apis.md)                                          |
| **Clipboard testing**           | [browser-apis.md](browser-apis/browser-apis.md)                                          |
| **Camera/microphone mocking**   | [browser-apis.md](browser-apis/browser-apis.md)                                          |
| **Multi-tab/popup flows**       | [multi-context.md](advanced/multi-context.md)                                            |
| **OAuth popup handling**        | [third-party.md](advanced/third-party.md), [multi-context.md](advanced/multi-context.md) |

---

## Progressive Disclosure Reference
For the complete reference catalog, extended examples, and deep edge cases, read [references/full-guide.md](file:///c:/Users/tomas/Desktop/web-software-factory/.agents/skills/playwright-best-practices/references/full-guide.md).
