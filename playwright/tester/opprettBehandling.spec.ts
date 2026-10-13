import { byggFunksjonellFeilRessurs } from '@navikt/familie-typer';
import { FagsakTestdata } from '@testutils/testdata/fagsakTestdata';
import { BehandlingSteg, Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import { FagsakStatus } from '@typer/fagsak';
import { format } from 'date-fns';
import { HttpResponse, http } from 'msw';

import { lagBehandlingPåSteg } from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';

const OPPRETT_BEHANDLING_URL = '/familie-ba-sak/api/behandlinger';
const AKTIV_BEHANDLING_FINNES =
    'Kan ikke lage ny behandling. Fagsaken har en aktiv behandling som ikke er ferdigstilt.';

test.describe('Opprett behandling', () => {
    test('skal opprette førstegangsbehandling og gå til registrering av søknaden', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(
            lagBehandlingPåSteg(BehandlingSteg.REGISTRERE_SØKNAD, { behandlingId: 2, personResultater: [] }),
            { fagsak: FagsakTestdata.lagFagsak({ status: FagsakStatus.OPPRETTET, behandlinger: [] }), opprettes: true }
        );
        apiMock.use(...behandlingsmock.handlers);
        const iDag = new Date();

        await page.goto('/fagsak/1/saksoversikt');
        await page.getByRole('button', { name: 'Meny' }).click();
        await page.getByRole('menuitem', { name: 'Opprett behandling' }).click();

        const modal = page.getByRole('dialog', { name: 'Opprett ny behandling' });
        await modal.getByRole('button', { name: 'Bekreft' }).click();
        await expect(modal.getByText('Velg type behandling som skal opprettes fra nedtrekkslisten.')).toBeVisible();

        await modal.getByLabel('Velg type behandling').selectOption({ label: 'Førstegangsbehandling' });
        await modal.getByLabel('Velg behandlingstema').selectOption({ label: 'Nasjonal ordinær' });
        await modal.getByLabel('Søknad mottatt dato').fill(format(iDag, 'dd.MM.yyyy'));

        const opprettRequest = page.waitForRequest(
            request => request.method() === 'POST' && request.url().endsWith(OPPRETT_BEHANDLING_URL)
        );
        await modal.getByRole('button', { name: 'Bekreft' }).click();

        expect((await opprettRequest).postDataJSON()).toEqual({
            behandlingType: Behandlingstype.FØRSTEGANGSBEHANDLING,
            behandlingÅrsak: BehandlingÅrsak.SØKNAD,
            kategori: BehandlingKategori.NASJONAL,
            underkategori: BehandlingUnderkategori.ORDINÆR,
            søknadMottattDato: format(iDag, 'yyyy-MM-dd'),
            navIdent: 'A1',
            fagsakId: 1,
        });
        await expect(page).toHaveURL(/\/fagsak\/1\/2\/registrer-soknad$/);
        await expect(page.getByRole('heading', { name: 'Registrer opplysninger fra søknaden' })).toBeVisible();
    });

    test('skal opprette revurdering med valgt årsak og gå til vilkårsvurderingen', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(
            lagBehandlingPåSteg(BehandlingSteg.VILKÅRSVURDERING, {
                behandlingId: 2,
                type: Behandlingstype.REVURDERING,
                årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
            }),
            { opprettes: true }
        );
        apiMock.use(...behandlingsmock.handlers);

        await page.goto('/fagsak/1/saksoversikt');
        await page.getByRole('button', { name: 'Meny' }).click();
        await page.getByRole('menuitem', { name: 'Opprett behandling' }).click();

        const modal = page.getByRole('dialog', { name: 'Opprett ny behandling' });
        await expect(modal.getByRole('option', { name: 'Førstegangsbehandling' })).toHaveCount(0);
        await modal.getByLabel('Velg type behandling').selectOption({ label: 'Revurdering' });
        await modal.getByLabel('Velg behandlingsårsak').selectOption({ label: 'Nye opplysninger' });

        const opprettRequest = page.waitForRequest(
            request => request.method() === 'POST' && request.url().endsWith(OPPRETT_BEHANDLING_URL)
        );
        await modal.getByRole('button', { name: 'Bekreft' }).click();

        expect((await opprettRequest).postDataJSON()).toMatchObject({
            behandlingType: Behandlingstype.REVURDERING,
            behandlingÅrsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
            fagsakId: 1,
        });
        await expect(page).toHaveURL(/\/fagsak\/1\/2\/vilkaarsvurdering$/);
        await expect(page.getByRole('heading', { name: 'Vilkårsvurdering', level: 1 })).toBeVisible();
    });

    test('skal vise feilmeldingen fra backend når behandlingen ikke kan opprettes', async ({ page, apiMock }) => {
        apiMock.use(
            http.post(OPPRETT_BEHANDLING_URL, () =>
                HttpResponse.json(byggFunksjonellFeilRessurs(AKTIV_BEHANDLING_FINNES))
            )
        );

        await page.goto('/fagsak/1/saksoversikt');
        await page.getByRole('button', { name: 'Meny' }).click();
        await page.getByRole('menuitem', { name: 'Opprett behandling' }).click();

        const modal = page.getByRole('dialog', { name: 'Opprett ny behandling' });
        await modal.getByLabel('Velg type behandling').selectOption({ label: 'Revurdering' });
        await modal.getByLabel('Velg behandlingsårsak').selectOption({ label: 'Nye opplysninger' });
        await modal.getByRole('button', { name: 'Bekreft' }).click();

        await expect(modal.getByText(AKTIV_BEHANDLING_FINNES)).toBeVisible();
        await expect(page).toHaveURL(/\/fagsak\/1\/saksoversikt$/);
    });
});
