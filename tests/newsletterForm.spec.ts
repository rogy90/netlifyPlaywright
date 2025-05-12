import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { generateRandomEmail, invalidEmails } from '../data/testData';

test.describe('Test Case 1: Lead Capture Form Validation', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        console.log('Navigating to Netlify home page');
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        console.log('Landed on home page');
    });

    test.afterAll(async ({ page }) => {
        await page.close();
        console.log('Closing the page');
    });

    test('Verify the newsletter form is present', async () => {
        console.log('Checking that the newsletter form and its elements are visible');
        await homePage.expectFormVisible();
        console.log('Newsletter form is present and visible');
    });

    test('should submit with valid email', async () => {
        const email = generateRandomEmail();
        console.log(`Submitting valid email: ${email}`);
        await homePage.submitEmail(email);
        await homePage.expectThankYouVisible();
        console.log('Thank-you message is visible for valid submission');
    });

    test('should show validation error for each invalid email', async () => {
        for (const invalidFormat of invalidEmails) {
            console.log(`Testing invalid email format: ${invalidFormat}`);
            await homePage.submitEmail(invalidFormat);
            await homePage.expectErrorVisible();
            console.log(`There is an error for: ${invalidFormat}`);
        }
    });
});