/**
 * Page Object Model for the Netlify home page.
 * Encapsulates selectors and actions for the newsletter signup form.
 */
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    /** Playwright Page instance */
    readonly page: Page;
    /** Wrapper for the newsletter form section */
    readonly newsletterSection: Locator;
    /** Input locator for the email field */
    readonly emailInput: Locator;
    /** Locator for the submit button */
    readonly submitButton: Locator;
    /** Locator for the 'Thank you' confirmation heading */
    readonly thankYouHeading: Locator;
    /** Locator for the hidden error message on invalid submission */
    readonly errorMessage: Locator;

    /**
     * Initialize locators using the provided Page.
     * @param page - Playwright Page object
     */
    constructor(page: Page) {
        this.page = page;
        this.newsletterSection = page.locator('section.newsletter-form');
        this.emailInput = page.locator('input[name="email"]');
        this.submitButton = page.locator('input.button-secondary');
        this.thankYouHeading = page.getByRole('heading', { name: 'Thank you for signing up!' });
        this.errorMessage = this.newsletterSection.locator('.hs-error-msg');
    }

    /**
     * Navigate to the root URL (home page).
     */
    async navigateToHomePage(): Promise<void> {
        await this.page.goto('/');
    }

    /**
     * Assert that the newsletter form and its fields are visible.
     */
    async expectFormVisible(): Promise<void> {
        await expect(this.newsletterSection).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.submitButton).toBeVisible();
    }

    /**
     * Fill the email field and click the submit button.
     * @param email - The email address to submit
     */
    async submitEmail(email: string): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(email);
        await this.submitButton.click();
    }

    /**
     * Assert that the thank-you confirmation heading is visible.
     */
    async expectThankYouVisible(): Promise<void> {
        await expect(this.thankYouHeading).toBeVisible();
    }

    /**
     * Assert that the hidden error message is visible after invalid submission.
     */
    async expectErrorVisible(): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
    }
}