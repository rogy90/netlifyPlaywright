/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum integer value (default: 1)
 * @param max - Maximum integer value (default: 1000)
 * @returns A random integer between min and max.
 */
function getRandomNumber(min = 1, max = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a unique random email address for testing.
 * Format: testmail+<randomNumber>@gmail.com
 * @returns A random email string.
 */
export function generateRandomEmail(): string {
    return `testmail+${getRandomNumber()}@gmail.com`;
}

/**
 * List of invalid email formats to test negative scenarios.
 */
export const invalidEmails: string[] = [
    'plaintextmail',    // no domain
    'user@.com',        // missing domain name
    'missingatsign.com',// missing '@' symbol
    '@domain.com',      // missing local part
    ''                  // empty string
];
