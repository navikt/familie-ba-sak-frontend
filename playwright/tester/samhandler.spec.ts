import { byggFeiletRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { expect, test } from '../fixtures';

test.describe('Samhandler', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/samhandler');
        await expect(page.getByRole('heading', { name: 'Søk samhandler' })).toBeVisible();
    });

    test('skal validere at organisasjonsnummeret har 9 siffer', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Skriv inn orgnr' }).fill('12345');
        await page.getByRole('button', { name: 'Hent samhandler' }).click();

        await expect(page.getByText('Orgnummer har ikke 9 tall.')).toBeVisible();
    });

    test('skal hente og vise samhandler for organisasjonsnummeret', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Skriv inn orgnr' }).fill('974652293');

        const hentSamhandlerRequest = page.waitForRequest('**/familie-ba-sak/api/samhandler/orgnr/974652293');
        await page.getByRole('button', { name: 'Hent samhandler' }).click();
        await hentSamhandlerRequest;

        await expect(page.getByRole('heading', { name: /80000123456 Testinstitusjonen AS/ })).toBeVisible();
    });

    test('skal vise feilmelding når samhandler ikke kan hentes', async ({ page, apiMock }) => {
        apiMock.use(
            http.get('/familie-ba-sak/api/samhandler/orgnr/:orgnr', () =>
                HttpResponse.json(byggFeiletRessurs('Fant ikke samhandler.'))
            )
        );

        await page.getByRole('textbox', { name: 'Skriv inn orgnr' }).fill('974652293');
        await page.getByRole('button', { name: 'Hent samhandler' }).click();

        await expect(page.getByText('Fant ikke samhandler.')).toBeVisible();
    });
});
