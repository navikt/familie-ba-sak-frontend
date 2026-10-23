import { BehandlingStatus, BehandlingSteg } from '@typer/behandling';
import { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';

import { innloggetSomBeslutter, lagBehandlingPåSteg, lagVedtaksperiodemock } from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';
import { KONTROLLSIDER, kontrollerAlleSider } from '../kontrollsider';

const IVERKSETT_VEDTAK_URL = '/familie-ba-sak/api/behandlinger/1/steg/iverksett-vedtak';
const KONTROLLERTE_SIDER = KONTROLLSIDER.map(side => side.navn);

function lagBehandlingSendtTilBeslutter() {
    return lagBehandlingPåSteg(BehandlingSteg.BESLUTTE_VEDTAK, {
        status: BehandlingStatus.FATTER_VEDTAK,
        totrinnskontroll: {
            saksbehandler: 'Sak Behandler',
            saksbehandlerId: 'A1',
            godkjent: false,
            opprettetTidspunkt: '2026-10-01T10:00:00.000',
        },
    });
}

test.describe('Totrinnskontroll', () => {
    test('skal kreve at beslutter kontrollerer alle steg før vedtaket godkjennes', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingSendtTilBeslutter());
        apiMock.use(innloggetSomBeslutter, ...behandlingsmock.handlers, ...lagVedtaksperiodemock().handlers);

        await page.goto('/fagsak/1/1/vedtak');

        const totrinnskontroll = page
            .locator('form')
            .filter({ has: page.getByRole('heading', { name: 'Totrinnskontroll' }) });
        await expect(
            totrinnskontroll.getByText('Kontrollér opplysninger og faglige vurderinger som er gjort')
        ).toBeVisible();
        for (const [index, side] of KONTROLLERTE_SIDER.entries()) {
            await expect(totrinnskontroll.getByText(`${index + 1}. ${side}`, { exact: true })).toBeVisible();
        }

        await totrinnskontroll.getByRole('radio', { name: 'Godkjent' }).check();
        await totrinnskontroll.getByRole('button', { name: 'Godkjenn vedtaket' }).click();
        await expect(totrinnskontroll.getByText('Du må kontrollere alle steg i løsningen.')).toBeVisible();

        await kontrollerAlleSider(page);
        await expect(totrinnskontroll.getByText('Du må kontrollere alle steg i løsningen.')).toBeHidden();

        const iverksettRequest = page.waitForRequest(request =>
            request.url().endsWith(encodeURI(IVERKSETT_VEDTAK_URL))
        );
        await totrinnskontroll.getByRole('button', { name: 'Godkjenn vedtaket' }).click();

        expect((await iverksettRequest).postDataJSON()).toEqual({
            beslutning: TotrinnskontrollBeslutning.GODKJENT,
            begrunnelse: '',
            kontrollerteSider: KONTROLLERTE_SIDER,
        });
        const kvittering = page.getByRole('dialog', { name: 'Totrinnskontroll' });
        await expect(kvittering.getByText('Behandlingen er godkjent, og vedtaket er iverksatt.')).toBeVisible();
        expect(behandlingsmock.hent().status).toBe(BehandlingStatus.IVERKSETTER_VEDTAK);
    });

    test('skal kreve begrunnelse når beslutter sender vedtaket tilbake til saksbehandler', async ({
        page,
        apiMock,
    }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingSendtTilBeslutter());
        apiMock.use(innloggetSomBeslutter, ...behandlingsmock.handlers, ...lagVedtaksperiodemock().handlers);

        await page.goto('/fagsak/1/1/vedtak');
        await kontrollerAlleSider(page);

        const totrinnskontroll = page
            .locator('form')
            .filter({ has: page.getByRole('heading', { name: 'Totrinnskontroll' }) });
        await totrinnskontroll.getByRole('radio', { name: 'Vurdér på nytt' }).check();
        await totrinnskontroll.getByRole('button', { name: 'Send til saksbehandler' }).click();
        await expect(totrinnskontroll.getByText('Du må fylle ut en begrunnelse.')).toBeVisible();

        await totrinnskontroll.getByLabel('Begrunnelse').fill('Vilkåret om lovlig opphold må vurderes på nytt.');
        const iverksettRequest = page.waitForRequest(request =>
            request.url().endsWith(encodeURI(IVERKSETT_VEDTAK_URL))
        );
        await totrinnskontroll.getByRole('button', { name: 'Send til saksbehandler' }).click();

        expect((await iverksettRequest).postDataJSON()).toEqual({
            beslutning: TotrinnskontrollBeslutning.UNDERKJENT,
            begrunnelse: 'Vilkåret om lovlig opphold må vurderes på nytt.',
            kontrollerteSider: KONTROLLERTE_SIDER,
        });
        const kvittering = page.getByRole('dialog', { name: 'Totrinnskontroll' });
        await expect(
            kvittering.getByText('Behandlingen er ikke godkjent og er sendt tilbake til saksbehandler.')
        ).toBeVisible();
        expect(behandlingsmock.hent().status).toBe(BehandlingStatus.UTREDES);
    });

    test('skal bare kunne underkjenne eget vedtak', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingSendtTilBeslutter());
        apiMock.use(...behandlingsmock.handlers, ...lagVedtaksperiodemock().handlers);

        await page.goto('/fagsak/1/1/vedtak');

        const totrinnskontroll = page
            .locator('form')
            .filter({ has: page.getByRole('heading', { name: 'Totrinnskontroll' }) });
        await expect(totrinnskontroll.getByText('Vedtaket er sendt til godkjenning')).toBeVisible();
        await expect(totrinnskontroll.getByText('Kontrollerte trinn')).toBeHidden();
        await expect(totrinnskontroll.getByRole('button', { name: 'Godkjenn vedtaket' })).toBeHidden();

        await totrinnskontroll.getByRole('radio', { name: 'Godkjent' }).click({ force: true });
        await expect(totrinnskontroll.getByRole('radio', { name: 'Godkjent' })).not.toBeChecked();

        await totrinnskontroll.getByRole('radio', { name: 'Vurdér på nytt' }).check();
        await totrinnskontroll.getByLabel('Begrunnelse').fill('Jeg har sendt feil vedtak.');
        const iverksettRequest = page.waitForRequest(request =>
            request.url().endsWith(encodeURI(IVERKSETT_VEDTAK_URL))
        );
        await totrinnskontroll.getByRole('button', { name: 'Underkjenn eget vedtak' }).click();

        expect((await iverksettRequest).postDataJSON()).toMatchObject({
            beslutning: TotrinnskontrollBeslutning.UNDERKJENT,
            begrunnelse: 'Jeg har sendt feil vedtak.',
        });
        await expect(
            page
                .getByRole('dialog', { name: 'Totrinnskontroll' })
                .getByText('Behandlingen er ikke godkjent og er sendt tilbake til saksbehandler.')
        ).toBeVisible();
    });
});
