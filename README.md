# netlifyPlaywright

QA Automation Assessment Task for Netlify using Playwright

## Prerequisites

Before you begin, ensure the following are installed on your machine:

* **Node.js** (version 14 or higher)  
  Download & install from [https://nodejs.org/](https://nodejs.org/)
* **npm** (comes bundled with Node.js)  
* **Git**  
  https://git-scm.com/downloads
* **(Optional) Visual Studio Code**  
  https://code.visualstudio.com/
* **(Optional) Playwright Test for VS Code** extension by Microsoft  
  Install via the VS Code Extensions marketplace to run and debug tests in-editor.

> **Note:** I include `node_modules/` in `.gitignore`, so you’ll need to install all dependencies locally.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/rogy90/netlifyPlaywright.git
   cd netlifyPlaywright
   ```

2. **Install dependencies**  
   Installs all packages listed in `package.json`:

   ```bash
   npm install
   ```

3. **Install Playwright browsers**  
   Playwright requires downloading browser binaries:

   ```bash
   npx playwright install
   ```

## Running the Tests

### Run tests headed vs headless

* **Headed** (browser UI visible)

  ```bash
  npm run test:headed
  ```

* **Headless** (no browser UI)

  ```bash
  npm test
  ```

### Show the HTML report

After a test run completes, open the Playwright HTML report in your browser:

```bash
npm run report
```

## Additional Options

Run a single spec file or filter by test name, e.g.:

```bash
# run only the sitemap tests
npx playwright test tests/02_sitemapTests.spec.ts
```

For more flags and options:

```bash
npx playwright test --help
```

## Running & Debugging in VS Code

1. Open the project folder in VS Code.  
2. Install the **Playwright Test for VS Code** extension.  
3. In the **Testing** sidebar, locate the Playwright tests.  
4. Click **▶️ Play** to run or **🐞 Debug** to debug individual tests or suites.

---

## Brief Explanation of Approach

**Task 1: Lead Capture Form Validation**  
I chose to test only in Chrome. I used the Page Object Model (POM) pattern to keep tests clean and easy to maintain. All page selectors and actions are in `pages/HomePage.ts`, test data is in `data/testData.ts`, and test steps are in `tests/01_newsletterFormTests.spec.ts` etc. This clear split—`pages/` for page classes, `data/` for values, and `tests/` for tests—makes adding or changing tests simple.

**Task 2: Sitemap & Crawlability Verification**  
I used the Sitemapper library to fetch `sitemap.xml`. In `utils/helpers.ts`, I created two functions: `fetchSitemapUrls(baseURL)` to get all URLs, and `verifyUrlsAccessible(request, urls)` to check each URL returns a good status. I also test for no `<meta name=\"robots\" content=\"noindex\">` tags and check important pages (`/`, `/pricing/`, `/docs/`, `/blog/`). The test file (`tests/02_sitemapTests.spec.ts`) stays short and clear. Here is a repository I use as solution for me after I read https://github.com/microsoft/playwright/issues/1408. 
_Repo: https://github.com/seantomburke/sitemapper_

**Task 3: 404 Link Verification**  
I followed Checkly’s guide for finding broken links with Playwright: https://www.checklyhq.com/learn/playwright/how-to-detect-broken-links/. In `utils/helpers.ts`, `getAllLinksFromPage(page)` finds visible links, skips `mailto:` and anchors, and returns all URLs. Then the test (`tests/03_404LinkVerification.spec.ts`) checks none return 404. This method covers the site with simple code and clear results.

## Assumptions and Limitations

* When submitting invalid data to the newsletter form, there is no visible error message for the user. Instead, the error text appears hidden in the HTML. Tests look for this hidden error element to detect invalid email formats.
* While verifying sitemap URLs, the `https://www.netlify.com/trust-center/` page redirects and returns a 403 status rather than loading directly. This behavior is noted as a limitation: tests will report any non-200 status (including redirects or 403) as a failure for direct URL access.

## Playwright Test Report

A sample Playwright test report is included in the `playwright-report/` directory of this repository. To view it locally:

1. Clone or download the repo (with the `playwright-report/` folder).
2. Open `playwright-report/index.html` in your browser.

Alternatively, generate and open a fresh report after running tests:

```bash
npm test
npm run report
```

This opens the HTML report in your default browser.