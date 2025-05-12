import { test, expect } from '@playwright/test';
import { fetchSitemapUrls, verifyUrlsAccessible } from '../utils/helpers';

test.describe('Test Case 2: Sitemap and Crawlability Verification', () => {
    test('Check if sitemap.xml exists ', async ({ request, baseURL }) => {
        console.log('Fetching sitemap.xml');
        const res = await request.get('/sitemap.xml');
        expect(res.ok(), 'Expected sitemap.xml to return status 200').toBeTruthy();
    });

    test('Check if all sitemap URLs are accessible', async ({ request, baseURL }) => {
        console.log('Fetching sitemap URLs');
        const urls = await fetchSitemapUrls(baseURL!);
        await verifyUrlsAccessible(request, urls);
        console.log('Completed accessibility check for all sitemap URLs');
    });

    test('Test if all pages do not have robots noindex meta tags', async ({ page, baseURL }) => {
        console.log('Fetching sitemap URLs for robots meta check');
        const urls = await fetchSitemapUrls(baseURL!);

        for (const url of urls) {
            console.log(`Navigating to ${url}`);
            await page.goto(url);
            const robotsMeta = page.locator('meta[name="robots"]');
            const count = await robotsMeta.count();
            if (count > 0) {
                const content = await robotsMeta.first().getAttribute('content');
                console.log(`Robots meta content for ${url}: "${content}"`);
                expect(content).not.toMatch(/noindex/i);
            } else {
                console.log(`No robots meta tag found on ${url}`);
            }
        }
    });

    test('4. Verify that important pages are crawlable', async ({ request, baseURL }) => {
        console.log('Verifying important pages are crawlable');
        const importantPages = ['/', '/pricing/', '/docs/', '/blog/'];

        for (const path of importantPages) {
            console.log(`Verifying ${path}`);
            const res = await request.get(path);
            console.log(`  ${path} returned status ${res.status()}`);
            expect(
                res.status(),
                `${path} should be accessible (status < 400)`
            ).toBeLessThan(400);
        }
    });
});