import { byggFeiletRessurs, byggSuksessRessurs } from '@navikt/familie-typer';
import type { Request as PlaywrightRequest } from '@playwright/test';
import { SimuleringTestdata } from '@testutils/testdata/simuleringTestdata';
import { TilbakekrevingsvedtakMotregningTestdata } from '@testutils/testdata/tilbakekrevingsvedtakMotregningTestdata';
import { TilbakekrevingTestdata } from '@testutils/testdata/tilbakekrevingTestdata';
import { BehandlingStatus, BehandlingSteg, Behandlingstype, BehandlingÅrsak, SettPåVentÅrsak } from '@typer/behandling';
import { Tilbakekrevingsvalg } from '@typer/simulering';
import type { TilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';
import { HttpResponse, http } from 'msw';

import { lagBehandlingPåSteg } from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';

const TILBAKEKREVINGSVEDTAK_MOTREGNING_URL =
    '/familie-ba-sak/api/behandling/:behandlingId/tilbakekrevingsvedtak-motregning';

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

// Januar gir både en etterbetaling og en feilutbetaling, som kan motregnes mot hverandre.
function lagSimuleringMedAvregning() {
    return SimuleringTestdata.lagSimulering({
        perioder: [SimuleringTestdata.lagSimuleringPeriode({ fom: '2026-01-01', tom: '2026-01-31' })],
        avregningsperioder: [
            {
                fom: '2026-01-01',
                tom: '2026-01-31',
                totalEtterbetaling: 1968,
                totalFeilutbetaling: 1968,
            },
        ],
    });
}

function mockTilbakekrevingsvedtakMotregning(
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO | null
) {
    return http.get(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () =>
        HttpResponse.json(byggSuksessRessurs(tilbakekrevingsvedtakMotregning))
    );
}

function erTilbakekrevingsvedtakMotregningKall(metode: string) {
    return (request: PlaywrightRequest) =>
        request.method() === metode &&
        request.url().endsWith('/familie-ba-sak/api/behandling/1/tilbakekrevingsvedtak-motregning');
}

function erHistorikkall(request: PlaywrightRequest) {
    return request.method() === 'GET' && request.url().endsWith('/familie-ba-sak/api/logg/1');
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

    test('skal ikke sende lagret tilbakekrevingsvalg når simuleringen ikke har feilutbetaling', async ({
        page,
        apiMock,
    }) => {
        const behandlingsmock = lagBehandlingsmock(
            lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING, {
                type: Behandlingstype.REVURDERING,
                årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
            })
        );
        let harHentetTilbakekreving = false;
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/tilbakekreving/behandling/:behandlingId', () => {
                harHentetTilbakekreving = true;
                return HttpResponse.json(
                    byggSuksessRessurs(
                        TilbakekrevingTestdata.lagTilbakekreving({
                            valg: Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL,
                            varsel: 'Varsel fra før feilutbetalingen falt bort',
                            begrunnelse: 'Begrunnelse fra før feilutbetalingen falt bort',
                        })
                    )
                );
            })
        );

        await page.goto('/fagsak/1/1/simulering');

        await expect(page.getByRole('heading', { name: 'Simulering', level: 1 })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Tilbakekreving' })).toBeHidden();

        const stegRequest = page.waitForRequest(
            request => request.method() === 'POST' && request.url().endsWith(tilbakekrevingStegUrl(1))
        );
        await page.getByRole('button', { name: 'Neste steg' }).click();

        expect((await stegRequest).postData()).toBeFalsy();
        await expect(page).toHaveURL(/\/fagsak\/1\/1\/vedtak$/);
        expect(harHentetTilbakekreving).toBe(false);
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

    test('skal vise lagret tilbakekrevingsvalg fra endepunktet', async ({ page, apiMock }) => {
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
            ),
            http.get('/familie-ba-sak/api/tilbakekreving/behandling/:behandlingId', () =>
                HttpResponse.json(
                    byggSuksessRessurs(
                        TilbakekrevingTestdata.lagTilbakekreving({
                            valg: Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL,
                            begrunnelse: 'Lagret begrunnelse',
                        })
                    )
                )
            )
        );

        await page.goto('/fagsak/1/2/simulering');

        const valg = page.getByRole('radiogroup', { name: /Fastsett videre behandling/ });
        await expect(valg.getByRole('radio', { name: 'Opprett tilbakekreving, ikke send varsel' })).toBeChecked();
        await expect(page.getByRole('textbox', { name: /^Årsak til feilutbetaling og videre behandling/ })).toHaveValue(
            'Lagret begrunnelse'
        );
    });

    test('skal vise feilmelding når tilbakekrevingen ikke kan hentes', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING));
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () =>
                HttpResponse.json(byggSuksessRessurs(lagSimuleringMedFeilutbetaling()))
            ),
            http.get('/familie-ba-sak/api/tilbakekreving/behandling/:behandlingId', () =>
                HttpResponse.json(byggFeiletRessurs('Klarte ikke å hente tilbakekreving'))
            )
        );

        await page.goto('/fagsak/1/1/simulering');

        await expect(page.getByText('Klarte ikke å hente tilbakekreving')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Neste steg' })).toBeHidden();
    });

    test('skal vise motregningen fra svaret når bruker har samtykket', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING));
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () =>
                HttpResponse.json(byggSuksessRessurs(lagSimuleringMedAvregning()))
            ),
            mockTilbakekrevingsvedtakMotregning(
                TilbakekrevingsvedtakMotregningTestdata.lagTilbakekrevingsvedtakMotregning()
            ),
            http.patch(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () =>
                HttpResponse.json(
                    byggSuksessRessurs(
                        TilbakekrevingsvedtakMotregningTestdata.lagTilbakekrevingsvedtakMotregning({
                            samtykke: true,
                        })
                    )
                )
            )
        );

        await page.goto('/fagsak/1/1/simulering');
        await expect(page.getByText(/^Bruker har samtykket til at vi venter med etterbetalingen/)).toBeVisible();

        const patchRequest = page.waitForRequest(erTilbakekrevingsvedtakMotregningKall('PATCH'));
        const historikkRequest = page.waitForRequest(erHistorikkall);
        await page.getByRole('button', { name: 'Ja' }).click();

        expect((await patchRequest).postDataJSON()).toEqual({ samtykke: true });
        await expect(page.getByRole('checkbox', { name: 'Hele beløpet skal kreves tilbake' })).not.toBeChecked();
        await expect(page.getByRole('button', { name: 'Ja' })).toBeHidden();
        await historikkRequest;
    });

    test('skal vise varselet om avregning igjen når bruker ikke har samtykket', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING));
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () =>
                HttpResponse.json(byggSuksessRessurs(lagSimuleringMedAvregning()))
            ),
            mockTilbakekrevingsvedtakMotregning(
                TilbakekrevingsvedtakMotregningTestdata.lagTilbakekrevingsvedtakMotregning()
            ),
            http.delete(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () => HttpResponse.json(byggSuksessRessurs(null)))
        );

        await page.goto('/fagsak/1/1/simulering');
        const slettRequest = page.waitForRequest(erTilbakekrevingsvedtakMotregningKall('DELETE'));
        await page.getByRole('button', { name: 'Nei' }).click();

        await slettRequest;
        await expect(
            page.getByText('Denne saken inneholder både en etterbetaling og en feilutbetaling.')
        ).toBeVisible();
        await expect(page.getByRole('button', { name: 'Nei' })).toBeHidden();
    });

    test('skal oppdatere steget når valget om at hele beløpet skal kreves tilbake endres', async ({
        page,
        apiMock,
    }) => {
        // Saksbehandler har gått tilbake fra vedtaket. Backend setter behandlingen tilbake til simulering når
        // valget endres.
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.SEND_TIL_BESLUTTER));
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () =>
                HttpResponse.json(byggSuksessRessurs(lagSimuleringMedAvregning()))
            ),
            mockTilbakekrevingsvedtakMotregning(
                TilbakekrevingsvedtakMotregningTestdata.lagTilbakekrevingsvedtakMotregning({
                    samtykke: true,
                    heleBeløpetSkalKrevesTilbake: true,
                })
            ),
            http.patch(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () => {
                behandlingsmock.oppdater({ steg: BehandlingSteg.VURDER_TILBAKEKREVING });
                return HttpResponse.json(
                    byggSuksessRessurs(
                        TilbakekrevingsvedtakMotregningTestdata.lagTilbakekrevingsvedtakMotregning({ samtykke: true })
                    )
                );
            })
        );

        await page.goto('/fagsak/1/1/simulering');
        const nesteKnapp = page.getByRole('button', { name: 'Neste steg' });
        await expect(nesteKnapp).toBeEnabled();
        // Venstremenyen slår av lenker til steg behandlingen ikke har kommet til.
        const vedtakslenke = page.getByRole('link', { name: /^\d+\. Vedtak$/ });
        await expect(vedtakslenke).toHaveCSS('pointer-events', 'auto');

        const patchRequest = page.waitForRequest(erTilbakekrevingsvedtakMotregningKall('PATCH'));
        const heleBeløpet = page.getByRole('checkbox', { name: 'Hele beløpet skal kreves tilbake' });
        await heleBeløpet.click();

        expect((await patchRequest).postDataJSON()).toEqual({ heleBeløpetSkalKrevesTilbake: false });
        await expect(heleBeløpet).not.toBeChecked();
        await expect(nesteKnapp).toBeDisabled();
        await expect(vedtakslenke).toHaveCSS('pointer-events', 'none');
    });

    test('skal vise varselet om avregning igjen når bruk av motregning angres', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING));
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () =>
                HttpResponse.json(byggSuksessRessurs(lagSimuleringMedAvregning()))
            ),
            mockTilbakekrevingsvedtakMotregning(
                TilbakekrevingsvedtakMotregningTestdata.lagTilbakekrevingsvedtakMotregning({ samtykke: true })
            ),
            http.delete(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () => HttpResponse.json(byggSuksessRessurs(null)))
        );

        await page.goto('/fagsak/1/1/simulering');
        await expect(page.getByRole('heading', { name: 'Tilbakekreving - ulovfestet motregning' })).toBeVisible();

        const slettRequest = page.waitForRequest(erTilbakekrevingsvedtakMotregningKall('DELETE'));
        const historikkRequest = page.waitForRequest(erHistorikkall);
        await page.getByRole('button', { name: 'Angre bruk av ulovfestet motregning' }).click();

        await slettRequest;
        await expect(
            page.getByText('Denne saken inneholder både en etterbetaling og en feilutbetaling.')
        ).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Tilbakekreving - ulovfestet motregning' })).toBeHidden();
        await historikkRequest;
    });

    test('skal vise motregningen når behandlingen settes på vent for å vente på samtykke', async ({
        page,
        apiMock,
    }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING));
        // Backend oppretter motregningen når behandlingen settes på vent med denne årsaken.
        let motregning: TilbakekrevingsvedtakMotregningDTO | null = null;
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () =>
                HttpResponse.json(byggSuksessRessurs(lagSimuleringMedAvregning()))
            ),
            http.get(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () => HttpResponse.json(byggSuksessRessurs(motregning))),
            http.post(encodeURI('/familie-ba-sak/api/sett-på-vent/:behandlingId'), () => {
                motregning = TilbakekrevingsvedtakMotregningTestdata.lagTilbakekrevingsvedtakMotregning();
                return HttpResponse.json(
                    byggSuksessRessurs(
                        behandlingsmock.oppdater({
                            status: BehandlingStatus.SATT_PÅ_VENT,
                            aktivSettPåVent: {
                                frist: '2026-12-10',
                                årsak: SettPåVentÅrsak.AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING,
                            },
                        })
                    )
                );
            })
        );
        // Knappen åpner også Modia i en ny fane.
        await page.context().route(/modiapersonoversikt/, route => route.abort());

        await page.goto('/fagsak/1/1/simulering');
        await page.getByRole('button', { name: 'Be om samtykke fra bruker' }).click();
        await page.getByRole('dialog').getByRole('button', { name: 'Bekreft' }).click();

        await expect(page.getByRole('heading', { name: 'Tilbakekreving - ulovfestet motregning' })).toBeVisible();
        await expect(page.getByText(/^Saken venter på samtykke fra bruker/)).toBeVisible();
        await expect(page.getByText('Denne saken inneholder både en etterbetaling og en feilutbetaling.')).toBeHidden();
    });

    test('skal vise feilmelding når motregningen ikke kan hentes', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VURDER_TILBAKEKREVING));
        apiMock.use(
            ...behandlingsmock.handlers,
            http.get('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () =>
                HttpResponse.json(byggSuksessRessurs(lagSimuleringMedAvregning()))
            ),
            http.get(TILBAKEKREVINGSVEDTAK_MOTREGNING_URL, () =>
                HttpResponse.json(byggFeiletRessurs('Klarte ikke å hente motregningen'))
            )
        );

        await page.goto('/fagsak/1/1/simulering');

        await expect(page.getByText('Klarte ikke å hente motregningen')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Neste steg' })).toBeHidden();
    });
});
