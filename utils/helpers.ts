// utils/helpers.ts
import { APIRequestContext, expect, Page } from '@playwright/test';
import Sitemapper from 'sitemapper';

/**
 * Fetches and returns all URLs listed in sitemap.xml for the given baseURL.
 * Uses Sitemapper to parse the sitemap.
 * @param baseURL - The root URL of the site under test 
 * @returns An array of absolute URLs from the sitemap.
 * @throws If no URLs are found or sitemap fetch fails.
 */
export async function fetchSitemapUrls(baseURL: string): Promise<string[]> {
    // Build full sitemap URL, handling trailing slashes correctly
    const sitemapUrl = new URL('/sitemap.xml', baseURL).toString();
    console.log(`Resolved sitemap URL: ${sitemapUrl}`);

    // Initialize Sitemapper with the sitemap URL
    const sitemap = new Sitemapper({ url: sitemapUrl });
    sitemap.timeout = 30000; // Timeout for fetching in milliseconds

    // Fetch and parse the sitemap
    const { sites } = await sitemap.fetch();
    console.log(`Found ${sites.length} URLs in sitemap`);

    // Assert that at least one URL exists
    expect(sites.length, 'Expected at least one URL in sitemap').toBeGreaterThan(0);

    return sites;
}

/**
 * Verifies that each URL in the list returns an HTTP status less than 400.
 * Logs each check and asserts accessibility for each URL.
 * @param request - Playwright's APIRequestContext for HTTP requests.
 * @param urls - Array of URLs to check.
 */
export async function verifyUrlsAccessible(request: APIRequestContext, urls: string[]
): Promise<void> {
    for (const url of urls) {
        console.log(`Checking accessibility of ${url}`);
        const res = await request.get(url);
        console.log(`  ${url} returned status ${res.status()}`);
        expect(res.status(), `Expected ${url} to be accessible (status < 400)`).toBeLessThan(400);
    }
}

/**
 * Extracts all visible anchor links ('a[href]') from the page,
 * filters out mailto: and hash-only links, and returns a Set of unique absolute URLs.
 * Uses soft assertions to ensure every link has an href attribute.
 * @param page - Playwright Page object to locate links on.
 * @returns A Set of absolute URLs present on the page.
 */
export async function getAllLinksFromPage(page: Page): Promise<Set<string>> {
    console.log('Extracting all links from page');

    // Locate all anchor elements with href attributes
    const links = page.locator('a[href]');
    const allLinkEls = await links.all();

    // Extract href values from each element
    const allLinkHrefs = await Promise.all(
        allLinkEls.map(link => link.getAttribute('href'))
    );

    // Filter and normalize URLs, skipping mailto: and hash fragments
    const validHrefs = allLinkHrefs.reduce((set, href) => {
        expect.soft(href, 'link has no a proper href').not.toBeFalsy();
        if (href && !href.startsWith('mailto:') && !href.startsWith('#')) {
            set.add(new URL(href, page.url()).href);
        }
        return set;
    }, new Set<string>());

    console.log(`Extracted ${validHrefs.size} unique links`);
    return validHrefs;
}