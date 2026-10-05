import { byggSuksessRessurs } from '@navikt/familie-typer';
import { OppgaveTestdata } from '@testutils/testdata/oppgaveTestdata';
import { HttpResponse, http } from 'msw';

import { expect, test } from '../fixtures';

test.describe('Oppgavebenken', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/oppgaver');
        await expect(page.getByRole('heading', { name: 'Oppgavebenken' })).toBeVisible();
    });

    test('skal kreve at enhet er valgt før oppgaver hentes', async ({ page }) => {
        await page.getByRole('button', { name: 'Hent oppgaver' }).click();

        await expect(page.getByText('Du må velge enhet')).toBeVisible();
    });

    test('skal hente og vise oppgaver for valgt enhet', async ({ page }) => {
        await page.getByRole('combobox', { name: 'Enhet' }).selectOption({ label: '4833 Oslo' });

        const hentOppgaverRequest = page.waitForRequest('**/familie-ba-sak/api/oppgave/hent-oppgaver');
        await page.getByRole('button', { name: 'Hent oppgaver' }).click();

        expect((await hentOppgaverRequest).postDataJSON()).toMatchObject({ enhet: '4833' });
        await expect(page.getByRole('cell', { name: 'Behandle sak' }).first()).toBeVisible();
        await expect(page.getByRole('cell', { name: '12345678910' })).toBeVisible();
    });

    test('skal vise melding når det ikke finnes oppgaver', async ({ page, apiMock }) => {
        apiMock.use(
            http.post('/familie-ba-sak/api/oppgave/hent-oppgaver', () =>
                HttpResponse.json(byggSuksessRessurs(OppgaveTestdata.lagHentOppgaveDto([])))
            )
        );

        await page.getByRole('combobox', { name: 'Enhet' }).selectOption({ label: '4833 Oslo' });
        await page.getByRole('button', { name: 'Hent oppgaver' }).click();

        await expect(page.getByText('Ingen oppgaver')).toBeVisible();
    });
});
