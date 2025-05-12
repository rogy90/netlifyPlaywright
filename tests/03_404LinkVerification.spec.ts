import { test, expect } from '@playwright/test';
import { getAllLinksFromPage } from '../utils/helpers';

/**
 * Test Suite: 404 Link Verification
 * - Verifies that no link on the homepage leads to a 404 error
 * - Uses a helper to gather all valid links on the page
 */
test.describe('Test Case 3: 404 Link Verification', () => {
    /**
     * Test: Ensure all extracted links do not return 404
     */
    test('Check if all pages have links on the page not leading to 404', async ({ page, request }) => {
        // Navigate to the home page
        await page.goto('/');

        // Extract all links from page using helper function
        const linkUrls = await getAllLinksFromPage(page);

        // Iterate through each URL and check status
        for (const url of linkUrls) {
            await test.step(`Checking link: ${url}`, async () => {
                const response = await request.get(url);
                console.log(`${url} returned status ${response.status()}`);

                // Assert the status is not 404
                expect(response.status(), `Expected ${url} not to return 404`).not.toBe(404);
            });
        }
    });
});