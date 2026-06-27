import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Users API', () => {
  test('should fetch a list of users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);
    expect(response.ok()).toBeTruthy();
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });
});
