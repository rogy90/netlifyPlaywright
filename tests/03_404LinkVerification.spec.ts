import { test, expect } from '@playwright/test';
import { getAllLinksFromPage } from '../utils/helpers';

test.describe('Test Case 3: 404 Link Verification', () => {
    test('Check if all pages have links on the page not leading to 404', async ({ page, request }) => {
        await page.goto('/');
        const linkUrls = await getAllLinksFromPage(page);

        for (const url of linkUrls) {
            await test.step(`Checking link: ${url}`, async () => {
                const response = await request.get(url);
                console.log(`${url} returned status ${response.status()}`);
                expect(response.status(), `Expected ${url} not to return 404`).not.toBe(404);
            });
        }
    });
});