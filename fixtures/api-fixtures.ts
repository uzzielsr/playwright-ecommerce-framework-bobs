import { test as base } from '@playwright/test';
import { UserApi } from '../api/user.api';
import { generateTestUser } from '../utils/test-users';

/**
 * API test fixtures with pre-configured UserApi and test users.
 */
type APIFixtures = {
    userApi: UserApi;
    testUser: ReturnType<typeof generateTestUser>;
    createdUser: ReturnType<typeof generateTestUser>;
};

/**
 * Extended test with API fixtures for user management.
 */
/*
// export const test = base.extend<APIFixtures>({ // Temporarily disabled for UI-only mode
//     userApi: async ({ request }, use) => {
//         await use(new UserApi(request, process.env.BASE_URL!));
//     },
//
//     testUser: async ({ }, use) => {
//         await use(generateTestUser());
//     },
//
//     createdUser: async ({ userApi, testUser }, use) => {
//         await userApi.createUser(testUser);
//         await use(testUser);
//         await userApi.deleteUser(testUser.email, testUser.password);
//     },
// });
*/

export { expect } from '@playwright/test';