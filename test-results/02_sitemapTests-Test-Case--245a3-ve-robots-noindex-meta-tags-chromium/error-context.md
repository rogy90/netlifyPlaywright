# Test info

- Name: Test Case 2: Sitemap and Crawlability Verification >> Check if all pages do not have robots noindex meta tags
- Location: /Users/ihojdanic/Development/AssessmentTask/netlifyPlaywright/tests/02_sitemapTests.spec.ts:35:9

# Error details

```
Error: Robots meta tag for https://www.netlify.com/instantly-build-exceptional-digital-experiences-with-contentful-and-netlify/ should not include 'noindex'

expect(received).not.toMatch(expected)

Expected pattern: not /noindex/i
Received string:      "noindex, follow"
    at /Users/ihojdanic/Development/AssessmentTask/netlifyPlaywright/tests/02_sitemapTests.spec.ts:47:96
```

# Page snapshot

```yaml
- banner:
  - paragraph:
    - text: Deploy from Windsurf to the web in just one click with Netlify.
    - link "Read about the new partnership":
      - /url: https://www.netlify.com/press/windsurf-netlify-ai-ide-native-deployment-integration/
  - button "Close announcement bar":
    - text: Close announcement bar
    - img
  - link "Go to homepage":
    - /url: /
- main:
  - img "Hero Image"
  - heading "Instantly build exceptional digital experiences with Netlify & Contentful" [level=1]
  - paragraph: Enable your teams to ship modern web projects with ease and speed. Get connected in minutes.
  - paragraph
  - paragraph:
    - link "60 day free enterprise trial":
      - /url: "#get-started"
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - img "Netlify company sites"
  - heading "Innovate, iterate, and ship faster" [level=2]
  - heading "Deploy instantly" [level=3]
  - paragraph: Accelerate your publishing process and deliver exceptional web and mobile experiences in seconds.
  - heading "Streamline workflows" [level=3]
  - paragraph: Seamless Git-based developer workflows with built-in CI/CD, domains & DNS management, automated previews, and simple installation flow translate to increased productivity for users.
  - paragraph
  - heading "Collaborate efficiently" [level=3]
  - paragraph: Review and implement content changes more effectively without being limited to cross-functional bottlenecks.
  - paragraph
  - heading "Deliver next-level digital experiences at scale" [level=2]
  - heading "Robust integrations" [level=3]
  - paragraph: The integration between Netlify and Contentful is easy to setup, intuitive to use, and provides an instant upgrade to the content editing flow.
  - heading "Enterprise-ready" [level=3]
  - paragraph: Fully managed, multi-cloud infrastructure; Unified team and project management; Advanced security, compliance and identity.
  - heading "Deploy extensively" [level=3]
  - paragraph: Netlify's High-Performance Edge delivers peak reliability and dynamic optimizations while effortlessly handling massive amounts of traffic.
  - paragraph
  - heading "The world's best web teams run on Netlify" [level=2]
  - img "Logo for Asana"
  - img "Logo for DocuSign"
  - img "Logo for Heap"
  - img "Logo for Marqeta"
  - img "Logo for TripActions"
  - heading "DocuSign chooses Netlify over Drupal for improved uptime and faster page loads" [level=3]
  - paragraph: In order to improve their time to market and offer the team a better developer experience, the DocuSign development team decided to re-architect their marketing site with Netlify and Contentful, migrating from Drupal to a modern stack...
  - paragraph:
    - link "Read more":
      - /url: https://www.netlify.com/blog/docusign-drupal-migration/
  - heading "TripActions Builds with Netlify, Contentful, and Next.js for Cross-team Collaboration" [level=3]
  - paragraph: To build an exceptional user experience at all stages of the buyer journey, TripActions’ web team switched to a Jamstack architecture built with Netlify, Contentful, and Next.js...
  - paragraph:
    - link "Read more":
      - /url: https://www.netlify.com/blog/trip-actions-next-case-study/
  - heading "Simply connect your GitHub" [level=2]
  - list:
    - listitem:
      - link "60 day free enterprise trial":
        - /url: "#hubspot-form-id-start-your-journey-today"
  - heading "Get started today!" [level=2]
  - paragraph: Talk to one of our Developer Success Specialists to learn how you can get access to a 60 day free enterprise trial and start realizing the benefits of Netlify.
  - text: First name*
  - textbox "First name*"
  - text: Last name*
  - textbox "Last name*"
  - text: Company*
  - textbox "Company*"
  - text: Business email*
  - textbox "Business email*"
  - text: Phone number*
  - textbox "Phone number*"
  - text: Job Function
  - combobox "Job Function":
    - option "Please Select" [disabled] [selected]
    - option "Product Engineer"
    - option "DevOps Engineer"
    - option "UX/UI Engineer"
    - option "Web Developer"
    - option "Product Manager"
    - option "Marketer"
    - option "Team Leader / Executive"
    - option "Teacher / Student"
    - option "Consultant / Freelance"
    - option "Other"
    - option "Web/Frontend Engineering Leader"
    - option "Engineering Leader"
    - option "Marketing/Business Leader"
    - option "C-Level"
    - option "UX/UI Designer"
    - option "Procurement"
  - button "Get Enterprise Trial"
- contentinfo:
  - list:
    - listitem:
      - link "Trust Center":
        - /url: /trust-center/
    - listitem:
      - link "Privacy":
        - /url: /privacy/
    - listitem:
      - link "Security":
        - /url: /security/
    - listitem:
      - link "GDPR/CCPA":
        - /url: /gdpr-ccpa/
    - listitem:
      - link "Abuse":
        - /url: mailto:fraud@netlify.com?subject=Abuse%20report&body=Please%20include%20the%20site%20URL%20and%20reason%20for%20your%20report%2C%20and%20we%20will%20reply%20promptly.
    - listitem:
      - button "Cookie Settings"
  - paragraph: © 2025 Netlify
- region "Cookie banner":
  - alertdialog "We use Cookies":
    - text: We use cookies to improve your browsing experience and for marketing purposes.
    - link "More information about your privacy":
      - /url: https://www.netlify.com/privacy/
      - text: Read our Privacy Policy
    - button "Reject All"
    - button "Accept All"
    - button "Cookies Settings"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { fetchSitemapUrls, verifyUrlsAccessible } from '../utils/helpers';
   3 |
   4 | /**
   5 |  * Test Suite: Sitemap and Crawlability Verification
   6 |  * - Verifies sitemap.xml exists
   7 |  * - Checks all URLs from sitemap.xml are accessible
   8 |  * - Validates absence of 'noindex' in robots meta tags
   9 |  * - Ensures key pages are crawlable
  10 |  */
  11 | test.describe('Test Case 2: Sitemap and Crawlability Verification', () => {
  12 |     /**
  13 |      * Test: sitemap.xml should return HTTP 200
  14 |      */
  15 |     test('Check if sitemap.xml exists', async ({ request }) => {
  16 |         console.log('Fetching sitemap.xml');
  17 |         const res = await request.get('/sitemap.xml');
  18 |         console.log(`sitemap.xml status: ${res.status()}`);
  19 |         expect(res.ok(), 'Expected sitemap.xml to return status 200').toBeTruthy();
  20 |     });
  21 |
  22 |     /**
  23 |      * Test: all URLs in sitemap should be accessible (status < 400)
  24 |      */
  25 |     test('Check if all sitemap URLs are accessible', async ({ request, baseURL }) => {
  26 |         console.log('Fetching sitemap URLs');
  27 |         const urls = await fetchSitemapUrls(baseURL!);
  28 |         await verifyUrlsAccessible(request, urls);
  29 |         console.log('Completed accessibility check for all sitemap URLs');
  30 |     });
  31 |
  32 |     /**
  33 |      * Test: pages should not include a robots meta tag with 'noindex'
  34 |      */
  35 |     test('Check if all pages do not have robots noindex meta tags', async ({ page, baseURL }) => {
  36 |         console.log('Fetching sitemap URLs for robots meta check');
  37 |         const urls = await fetchSitemapUrls(baseURL!);
  38 |
  39 |         for (const url of urls) {
  40 |             console.log(`Navigating to ${url}`);
  41 |             await page.goto(url);
  42 |             const robotsMeta = page.locator('meta[name="robots"]');
  43 |             const count = await robotsMeta.count();
  44 |             if (count > 0) {
  45 |                 const content = await robotsMeta.first().getAttribute('content');
  46 |                 console.log(`Robots meta content for ${url}: "${content}"`);
> 47 |                 expect(content, `Robots meta tag for ${url} should not include 'noindex'`).not.toMatch(/noindex/i);
     |                                                                                                ^ Error: Robots meta tag for https://www.netlify.com/instantly-build-exceptional-digital-experiences-with-contentful-and-netlify/ should not include 'noindex'
  48 |             } else {
  49 |                 console.log(`No robots meta tag found on ${url}`);
  50 |             }
  51 |         }
  52 |     });
  53 |
  54 |     /**
  55 |      * Test: verify core pages are reachable
  56 |      */
  57 |     test('Verify that important pages are crawlable', async ({ request }) => {
  58 |         console.log('Verifying important pages are crawlable');
  59 |         const importantPages = ['/', '/pricing/', '/docs/', '/blog/'];
  60 |
  61 |         for (const path of importantPages) {
  62 |             console.log(`Verifying ${path}`);
  63 |             const res = await request.get(path);
  64 |             console.log(`  ${path} returned status ${res.status()}`);
  65 |             expect(res.status(), `${path} should be accessible (status < 400)`).toBeLessThan(400);
  66 |         }
  67 |     });
  68 | });
```