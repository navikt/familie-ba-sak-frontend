import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { expect, test } from '../fixtures';

const SEND_BREV_URL = '/familie-ba-sak/api/dokument/fagsak/:fagsakId/send-brev';

test.describe('Dokumentutsending', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/fagsak/1/dokumentutsending');
        await expect(page.getByRole('heading', { name: 'Send informasjonsbrev' })).toBeVisible();
    });

    test('skal kreve dokument eller fritekst for brevet «Kan søke»', async ({ page }) => {
        await page.getByRole('combobox', { name: 'Velg årsak' }).selectOption({ label: 'Kan søke' });
        await page.getByRole('button', { name: 'Send brev' }).click();

        await expect(
            page.getByText('Du må velge minst ett dokument eller legge til en fritekst').first()
        ).toBeVisible();
    });

    test('skal sende brevet «Kan søke» med valgt dokument', async ({ page, apiMock }) => {
        apiMock.use(http.post(SEND_BREV_URL, () => HttpResponse.json(byggSuksessRessurs(null))));

        await page.getByRole('combobox', { name: 'Velg årsak' }).selectOption({ label: 'Kan søke' });
        await page.getByRole('combobox', { name: 'Velg dokumenter' }).click();
        // Aksel-comboboxen gir ikke alternativene et tilgjengelig navn, så vi filtrerer på tekst.
        await page.getByRole('option').filter({ hasText: 'Adopsjon - barna' }).click();
        await page.keyboard.press('Escape');

        const sendBrevRequest = page.waitForRequest('**/familie-ba-sak/api/dokument/fagsak/1/send-brev');
        await page.getByRole('button', { name: 'Send brev' }).click();

        expect((await sendBrevRequest).postDataJSON()).toMatchObject({
            brevmal: 'INFORMASJONSBREV_KAN_SØKE',
            mottakerMålform: 'NB',
            multiselectVerdier: ['Dokumentasjon på adopsjon som viser hvilken dato du overtok omsorgen for barna.'],
        });

        const dialog = page.getByRole('dialog', { name: 'Brev er sendt' });
        await expect(dialog).toBeVisible();

        await dialog.getByRole('button', { name: 'Se saksoversikt' }).click();
        await expect(page).toHaveURL(/\/fagsak\/1\/saksoversikt$/);
    });
});
