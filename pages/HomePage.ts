import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly newsletterSection: Locator;
    readonly emailInput: Locator;
    readonly submitButton: Locator;
    readonly thankYouHeading: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newsletterSection = page.locator('section.newsletter-form');
        this.emailInput = page.locator('input[name="email"]');
        this.submitButton = page.locator('input.button-secondary');
        this.thankYouHeading = page.getByRole('heading', { name: 'Thank you for signing up!' });
        this.errorMessage = this.newsletterSection.locator('.hs-error-msg');
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    async expectFormVisible() {
        await expect(this.newsletterSection).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.submitButton).toBeVisible();
    }

    async submitEmail(email: string) {
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(email);
        await this.submitButton.click();
    }

    async expectThankYouVisible() {
        await expect(this.thankYouHeading).toBeVisible();
    }

    async expectErrorVisible() {
        await expect(this.errorMessage).toBeVisible();
    }
}
