import { test as base, expect } from '@playwright/test';
import { handlers } from '@testutils/mocks/handlers/handlers';

import { type ApiMock, settOppApiMock } from './apiMock';

interface Fixtures {
    apiMock: ApiMock;
}

export const test = base.extend<Fixtures>({
    apiMock: [
        async ({ page, baseURL }, use) => {
            if (!baseURL) {
                throw new Error('baseURL må være satt i playwright.config.ts');
            }

            const apiMock = await settOppApiMock(page, new URL(baseURL).origin, handlers);

            await use(apiMock);

            await page.unrouteAll({ behavior: 'ignoreErrors' });
            expect(
                apiMock.ubehandledeKall,
                'Det ble gjort API-kall uten mock-handler. Legg til handler i src/frontend/testutils/mocks/handlers eller bruk apiMock.use() i testen.'
            ).toEqual([]);
        },
        { auto: true },
    ],
});

export { expect };
