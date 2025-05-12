// tests/01_newsletterFormTests.spec.ts

import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { generateRandomEmail, invalidEmails } from '../data/testData';

/**
 * Test Suite: Lead Capture Form Validation
 * Verifies that the newsletter signup form on the homepage:
 *  - Renders correctly
 *  - Accepts valid emails
 *  - Shows appropriate errors for invalid emails
 */
test.describe('Test Case 1: Lead Capture Form Validation', () => {
    let homePage: HomePage;

    /**
     * Before each test:
     *  - Instantiate the HomePage page object
     *  - Navigate to the homepage ('/')
     */
    test.beforeEach(async ({ page }) => {
        console.log('Navigating to Netlify home page');
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        console.log('Landed on home page');
    });

    /**
     * Test: Verify the newsletter form is present
     *  - Checks visibility of the form container, email input, and submit button
     */
    test('Verify the newsletter form is present', async () => {
        console.log('Checking that the newsletter form and its elements are visible');
        await homePage.expectFormVisible();
        console.log('Newsletter form is present and visible');
    });

    /**
     * Test: Check submit with valid email
     *  - Generates a random valid email
     *  - Submits it through the form
     *  - Verifies the thank-you confirmation appears
     */
    test('Check submit with valid email', async () => {
        const email = generateRandomEmail();
        console.log(`Submitting valid email: ${email}`);
        await homePage.submitEmail(email);
        await homePage.expectThankYouVisible();
        console.log('Thank-you message is visible for valid submission');
    });

    /**
     * Test: Check show validation error for each invalid email
     *  - Iterates through a list of invalid email formats
     *  - Submits each one and verifies the hidden error message is displayed
     */
    test('Check show validation error for each invalid email', async () => {
        for (const invalidFormat of invalidEmails) {
            console.log(`Testing invalid email format: ${invalidFormat}`);
            await homePage.submitEmail(invalidFormat);
            await homePage.expectErrorVisible();
            console.log(`There is an error for: ${invalidFormat}`);
        }
    });
});