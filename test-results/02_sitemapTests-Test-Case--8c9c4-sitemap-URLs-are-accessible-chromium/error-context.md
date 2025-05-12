# Test info

- Name: Test Case 2: Sitemap and Crawlability Verification >> Check if all sitemap URLs are accessible
- Location: /Users/ihojdanic/Development/AssessmentTask/netlifyPlaywright/tests/02_sitemapTests.spec.ts:25:9

# Error details

```
Error: Expected https://www.netlify.com/trust-center/ to be accessible (status < 400)

expect(received).toBeLessThan(expected)

Expected: < 400
Received:   403
    at verifyUrlsAccessible (/Users/ihojdanic/Development/AssessmentTask/netlifyPlaywright/utils/helpers.ts:43:81)
    at /Users/ihojdanic/Development/AssessmentTask/netlifyPlaywright/tests/02_sitemapTests.spec.ts:28:9
```

# Test source

```ts
   1 | // utils/helpers.ts
   2 | import { APIRequestContext, expect, Page } from '@playwright/test';
   3 | import Sitemapper from 'sitemapper';
   4 |
   5 | /**
   6 |  * Fetches and returns all URLs listed in sitemap.xml for the given baseURL.
   7 |  * Uses Sitemapper to parse the sitemap.
   8 |  * @param baseURL - The root URL of the site under test 
   9 |  * @returns An array of absolute URLs from the sitemap.
  10 |  * @throws If no URLs are found or sitemap fetch fails.
  11 |  */
  12 | export async function fetchSitemapUrls(baseURL: string): Promise<string[]> {
  13 |     // Build full sitemap URL, handling trailing slashes correctly
  14 |     const sitemapUrl = new URL('/sitemap.xml', baseURL).toString();
  15 |     console.log(`Resolved sitemap URL: ${sitemapUrl}`);
  16 |
  17 |     // Initialize Sitemapper with the sitemap URL
  18 |     const sitemap = new Sitemapper({ url: sitemapUrl });
  19 |     sitemap.timeout = 30000; // Timeout for fetching in milliseconds
  20 |
  21 |     // Fetch and parse the sitemap
  22 |     const { sites } = await sitemap.fetch();
  23 |     console.log(`Found ${sites.length} URLs in sitemap`);
  24 |
  25 |     // Assert that at least one URL exists
  26 |     expect(sites.length, 'Expected at least one URL in sitemap').toBeGreaterThan(0);
  27 |
  28 |     return sites;
  29 | }
  30 |
  31 | /**
  32 |  * Verifies that each URL in the list returns an HTTP status less than 400.
  33 |  * Logs each check and asserts accessibility for each URL.
  34 |  * @param request - Playwright's APIRequestContext for HTTP requests.
  35 |  * @param urls - Array of URLs to check.
  36 |  */
  37 | export async function verifyUrlsAccessible(request: APIRequestContext, urls: string[]
  38 | ): Promise<void> {
  39 |     for (const url of urls) {
  40 |         console.log(`Checking accessibility of ${url}`);
  41 |         const res = await request.get(url);
  42 |         console.log(`  ${url} returned status ${res.status()}`);
> 43 |         expect(res.status(), `Expected ${url} to be accessible (status < 400)`).toBeLessThan(400);
     |                                                                                 ^ Error: Expected https://www.netlify.com/trust-center/ to be accessible (status < 400)
  44 |     }
  45 | }
  46 |
  47 | /**
  48 |  * Extracts all visible anchor links ('a[href]') from the page,
  49 |  * filters out mailto: and hash-only links, and returns a Set of unique absolute URLs.
  50 |  * Uses soft assertions to ensure every link has an href attribute.
  51 |  * @param page - Playwright Page object to locate links on.
  52 |  * @returns A Set of absolute URLs present on the page.
  53 |  */
  54 | export async function getAllLinksFromPage(page: Page): Promise<Set<string>> {
  55 |     console.log('Extracting all links from page');
  56 |
  57 |     // Locate all anchor elements with href attributes
  58 |     const links = page.locator('a[href]');
  59 |     const allLinkEls = await links.all();
  60 |
  61 |     // Extract href values from each element
  62 |     const allLinkHrefs = await Promise.all(
  63 |         allLinkEls.map(link => link.getAttribute('href'))
  64 |     );
  65 |
  66 |     // Filter and normalize URLs, skipping mailto: and hash fragments
  67 |     const validHrefs = allLinkHrefs.reduce((set, href) => {
  68 |         expect.soft(href, 'link has no a proper href').not.toBeFalsy();
  69 |         if (href && !href.startsWith('mailto:') && !href.startsWith('#')) {
  70 |             set.add(new URL(href, page.url()).href);
  71 |         }
  72 |         return set;
  73 |     }, new Set<string>());
  74 |
  75 |     console.log(`Extracted ${validHrefs.size} unique links`);
  76 |     return validHrefs;
  77 | }
```