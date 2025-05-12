
function getRandomNumber(min = 1, max = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomEmail(): string {
    return `testmail+${getRandomNumber()}@gmail.com`;
}

export const invalidEmails = [
    'plaintextmail',
    'user@.com',
    'missingatsign.com'
];