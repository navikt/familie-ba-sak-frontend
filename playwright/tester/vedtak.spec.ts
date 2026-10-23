import { byggFunksjonellFeilRessurs } from '@navikt/familie-typer';
import { BehandlingStatus, BehandlingSteg } from '@typer/behandling';
import { HttpResponse, http } from 'msw';

import {
    BEGRUNNELSE_BOSATT_I_RIKET,
    BEGRUNNELSE_LOVLIG_OPPHOLD,
    lagBehandlingPåSteg,
    lagVedtaksperiodemock,
} from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';

const SEND_TIL_BESLUTTER_URL = '/familie-ba-sak/api/behandlinger/:behandlingId/steg/send-til-beslutter';
const VEDTAKSPERIODE = 'Begrunnelse - Periode 2020-03-01_2038-01-31';
const TOM_FRITEKST_SAMMENSATT_KONTROLLSAK =
    'Fritekstfeltet i sammensatt kontrollsak kan ikke være tomt ved sending til beslutter.';

test.describe('Vedtak', () => {
    test('skal kreve en begrunnelse før vedtaket kan sendes til godkjenning', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.SEND_TIL_BESLUTTER));
        const vedtaksperiodemock = lagVedtaksperiodemock();

        apiMock.use(...behandlingsmock.handlers, ...vedtaksperiodemock.handlers);

        const sendTilBeslutterKall: string[] = [];
        page.on('request', request => {
            if (request.url().includes('/steg/send-til-beslutter')) {
                sendTilBeslutterKall.push(request.url());
            }
        });

        await page.goto('/fagsak/1/1/vedtak');
        await expect(page.getByRole('heading', { name: 'Vedtak', level: 1 })).toBeVisible();

        await page.getByRole('button', { name: 'Til godkjenning' }).click();

        await expect(
            page.getByText('Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.')
        ).toBeVisible();
        expect(sendTilBeslutterKall).toEqual([]);
    });

    test('skal lagre valgt begrunnelse og sende vedtaket til godkjenning', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.SEND_TIL_BESLUTTER));
        const vedtaksperiodemock = lagVedtaksperiodemock();

        apiMock.use(...behandlingsmock.handlers, ...vedtaksperiodemock.handlers);

        await page.goto('/fagsak/1/1/vedtak');

        const vedtaksperiode = page.getByRole('region', { name: VEDTAKSPERIODE });

        await vedtaksperiode.getByRole('combobox').click();
        await expect(page.getByRole('option', { name: BEGRUNNELSE_LOVLIG_OPPHOLD.navn })).toBeVisible();

        const lagreRequest = page.waitForRequest(
            request =>
                request.method() === 'PUT' &&
                request.url().endsWith('/familie-ba-sak/api/vedtaksperioder/standardbegrunnelser/1')
        );
        await page.getByRole('option', { name: BEGRUNNELSE_BOSATT_I_RIKET.navn }).click();

        expect((await lagreRequest).postDataJSON()).toEqual({
            standardbegrunnelser: [BEGRUNNELSE_BOSATT_I_RIKET.id],
        });
        await expect(vedtaksperiode.getByText(BEGRUNNELSE_BOSATT_I_RIKET.navn)).toBeVisible();

        const sendTilBeslutterRequest = page.waitForRequest(request =>
            request.url().includes('/familie-ba-sak/api/behandlinger/1/steg/send-til-beslutter')
        );
        await page.getByRole('button', { name: 'Til godkjenning' }).click();

        expect(new URL((await sendTilBeslutterRequest).url()).searchParams.get('behandlendeEnhet')).toBe('0001');
        const kvittering = page.getByRole('dialog', { name: 'Totrinnskontroll' });
        await expect(kvittering.getByText('Behandlingen er nå sendt til totrinnskontroll.')).toBeVisible();
        expect(behandlingsmock.hent().status).toBe(BehandlingStatus.FATTER_VEDTAK);

        await kvittering.getByRole('button', { name: 'Gå til saksoversikten' }).click();
        await expect(page).toHaveURL(/\/fagsak\/1\/saksoversikt$/);
    });

    test('skal vise feilmeldingen fra backend når vedtaket ikke kan sendes til godkjenning', async ({
        page,
        apiMock,
    }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.SEND_TIL_BESLUTTER));
        const vedtaksperiodemock = lagVedtaksperiodemock();

        apiMock.use(
            http.post(encodeURI(SEND_TIL_BESLUTTER_URL), () =>
                HttpResponse.json(byggFunksjonellFeilRessurs(TOM_FRITEKST_SAMMENSATT_KONTROLLSAK))
            ),
            ...behandlingsmock.handlers,
            ...vedtaksperiodemock.handlers
        );

        await page.goto('/fagsak/1/1/vedtak');

        const vedtaksperiode = page.getByRole('region', { name: VEDTAKSPERIODE });
        await vedtaksperiode.getByRole('combobox').click();
        await page.getByRole('option', { name: BEGRUNNELSE_BOSATT_I_RIKET.navn }).click();
        await expect(vedtaksperiode.getByText(BEGRUNNELSE_BOSATT_I_RIKET.navn)).toBeVisible();

        await page.getByRole('button', { name: 'Til godkjenning' }).click();

        await expect(page.getByText(TOM_FRITEKST_SAMMENSATT_KONTROLLSAK)).toBeVisible();
        await expect(page.getByRole('dialog', { name: 'Totrinnskontroll' })).toBeHidden();
    });

    test('skal forhåndsvise vedtaksbrevet', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.SEND_TIL_BESLUTTER));

        apiMock.use(...behandlingsmock.handlers, ...lagVedtaksperiodemock().handlers);

        await page.goto('/fagsak/1/1/vedtak');

        const brevRequest = page.waitForRequest(request =>
            request.url().endsWith('/familie-ba-sak/api/dokument/vedtaksbrev/1')
        );
        await page.getByRole('button', { name: 'Vis vedtaksbrev' }).click();

        expect((await brevRequest).method()).toBe('POST');
        const forhåndsvisning = page.getByRole('dialog', { name: 'Forhåndsvis vedtaksbrev' });
        await expect(forhåndsvisning).toBeVisible();
        await expect(forhåndsvisning.locator('iframe[title="Vedtaksbrev"]')).toBeVisible();
    });
});
