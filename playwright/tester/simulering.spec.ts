import { byggSuksessRessurs } from '@navikt/familie-typer';
import { SimuleringTestdata } from '@testutils/testdata/simuleringTestdata';
import { BehandlingSteg, Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { Tilbakekrevingsvalg } from '@typer/simulering';
import { HttpResponse, http } from 'msw';

import { lagBehandlingPåSteg } from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';

/** URL-en appen sender `POST` til for å lagre tilbakekrevingsvalget og gå videre til vedtaket. */
function tilbakekrevingStegUrl(behandlingId: number) {
    return `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/tilbakekreving`;
}

// Satsen for januar 2026 var 1 968 kr.
function lagSimuleringMedFeilutbetaling() {
    return SimuleringTestdata.lagSimulering({
        fom: '2026-01-01',
        feilutbetaling: 1968,
        perioder: [
            SimuleringTestdata.lagSimuleringPeriode({
                fom: '2026-01-01',
                tom: '2026-01-31',
                forfallsdato: '2026-01-20',
                nyttBeløp: 0,
                tidligereUtbetalt: 1968,
                resultat: -1968,
                feilutbetaling: 1968,
            }),
        ],
    });
}

test.describe('Simulering', () => {
    test('skal gå videre til vedtaket uten tilbakekreving når simuleringen ikke gir avvik', async ({
        page,
        apiMock,
    }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING));
        apiMock.use(...behandlingsmock.handlers);

        await page.goto('/fagsak/1/1/simulering');

        await expect(page.getByRole('heading', { name: 'Simulering', level: 1 })).toBeVisible();
        await expect(page.getByText('Det er ingen etterbetaling, feilutbetaling eller neste utbetaling')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Tilbakekreving' })).toBeHidden();

        const stegRequest = page.waitForRequest(
            request => request.method() === 'POST' && request.url().endsWith(tilbakekrevingStegUrl(1))
        );
        await page.getByRole('button', { name: 'Neste steg' }).click();

        expect((await stegRequest).postData()).toBeFalsy();
        await expect(page).toHaveURL(/\/fagsak\/1\/1\/vedtak$/);
        await expect(page.getByRole('heading', { name: 'Vedtak', level: 1 })).toBeVisible();
    });

    test('skal kreve valg om tilbakekreving når simuleringen gir feilutbetaling', async ({ page, apiMock }) => {
        // Feilutbetaling oppstår når en revurdering endrer en utbetaling som allerede er gjort.
        const behandlingsmock = lagBehandlingsmock(
            lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING, {
                behandlingId: 2,
                type: Behandlingstype.REVURDERING,
                årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
            })
        );
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () =>
                HttpResponse.json(byggSuksessRessurs(lagSimuleringMedFeilutbetaling()))
            )
        );

        await page.goto('/fagsak/1/2/simulering');

        const oversikt = page.getByLabel('Simuleringsoversikt');
        await expect(oversikt.getByText('Feilutbetaling')).toBeVisible();
        await expect(oversikt.getByText(/^1\s968 kr$/)).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Tilbakekreving' })).toBeVisible();

        await page.getByRole('button', { name: 'Neste steg' }).click();

        await expect(page.getByRole('heading', { name: 'For å gå videre må du rette opp følgende:' })).toBeVisible();
        await expect(
            page.getByRole('link', {
                name: 'Resultatet medfører en feilutbetaling. Du må velge om det skal opprettes tilbakekrevingsbehandling.',
            })
        ).toBeVisible();
        await expect(
            page.getByRole('link', { name: 'Du må skrive en begrunnelse for valget om tilbakekreving.' })
        ).toBeVisible();

        const valg = page.getByRole('radiogroup', { name: /Fastsett videre behandling/ });
        await valg.getByRole('radio', { name: 'Opprett tilbakekreving, send varsel' }).check();
        await page.getByRole('button', { name: 'Neste steg' }).click();
        await expect(
            page.getByRole('link', { name: 'Du må skrive en fritekst for varselet til tilbakekrevingen.' })
        ).toBeVisible();

        await valg.getByRole('radio', { name: 'Opprett tilbakekreving, ikke send varsel' }).check();
        await page
            .getByRole('textbox', { name: /^Årsak til feilutbetaling og videre behandling/ })
            .fill('Usikkert om januar blir feilutbetalt.');

        const stegRequest = page.waitForRequest(
            request => request.method() === 'POST' && request.url().endsWith(tilbakekrevingStegUrl(2))
        );
        await page.getByRole('button', { name: 'Neste steg' }).click();

        expect((await stegRequest).postDataJSON()).toEqual({
            vedtakId: 1,
            valg: Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL,
            begrunnelse: 'Usikkert om januar blir feilutbetalt.',
        });
        await expect(page).toHaveURL(/\/fagsak\/1\/2\/vedtak$/);
    });
});
