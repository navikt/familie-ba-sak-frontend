import { BehandlingSteg } from '@typer/behandling';
import { Regelverk, Resultat, VilkårType } from '@typer/vilkår';

import {
    BARN_NAVN,
    lagBehandlingPåSteg,
    lagPersonResultater,
    SØKER_IDENT,
    SØKER_NAVN,
    vilkårResultatId,
} from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';

const VILKÅRSVURDERING_STEG_URL = encodeURI('/familie-ba-sak/api/behandlinger/1/steg/vilkårsvurdering');

test.describe('Vilkårsvurdering', () => {
    test('skal vise vilkårene for søker og barn', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VILKÅRSVURDERING));
        apiMock.use(...behandlingsmock.handlers);

        await page.goto('/fagsak/1/1/vilkaarsvurdering');

        await expect(page.getByRole('heading', { name: 'Vilkårsvurdering', level: 1 })).toBeVisible();
        await expect(page.getByRole('heading', { name: new RegExp(`^${SØKER_NAVN}`) })).toBeVisible();
        await expect(page.getByRole('heading', { name: new RegExp(`^${BARN_NAVN}`) })).toBeVisible();

        // Personer der alle vilkår er vurdert vises lukket. Knappen bytter navn når den trykkes, så .first() treffer
        // neste person hver gang.
        const visVilkårsvurdering = page.getByRole('button', { name: 'Vis vilkårsvurdering' });
        await expect(visVilkårsvurdering).toHaveCount(2);
        await visVilkårsvurdering.first().click();
        await visVilkårsvurdering.first().click();

        await expect(page.getByRole('heading', { name: 'Bosatt i riket' })).toHaveCount(2);
        await expect(page.getByRole('heading', { name: 'Lovlig opphold' })).toHaveCount(2);
        await expect(page.getByRole('heading', { name: 'Under 18 år' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Bor fast hos søker' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Oppfylt' })).toHaveCount(7);
    });

    test('skal ikke gå videre før alle vilkår er vurdert', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(
            lagBehandlingPåSteg(BehandlingSteg.VILKÅRSVURDERING, {
                personResultater: lagPersonResultater({ ikkeVurderteVilkårForSøker: [VilkårType.BOSATT_I_RIKET] }),
            })
        );
        apiMock.use(...behandlingsmock.handlers);
        const stegkall: string[] = [];
        page.on('request', request => {
            if (request.method() === 'POST' && request.url().endsWith(VILKÅRSVURDERING_STEG_URL)) {
                stegkall.push(request.url());
            }
        });

        await page.goto('/fagsak/1/1/vilkaarsvurdering');
        await page.getByRole('button', { name: 'Neste steg' }).click();

        await expect(page.getByRole('heading', { name: 'For å gå videre må du rette opp følgende:' })).toBeVisible();
        await expect(
            page.getByRole('link', { name: "Et vilkår av typen 'Bosatt i riket' er ikke fullstendig" })
        ).toBeVisible();
        await expect(page).toHaveURL(/\/vilkaarsvurdering$/);
        expect(stegkall).toEqual([]);
    });

    test('skal lagre vurderingen av et vilkår og gå videre til behandlingsresultatet', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(
            lagBehandlingPåSteg(BehandlingSteg.VILKÅRSVURDERING, {
                personResultater: lagPersonResultater({ ikkeVurderteVilkårForSøker: [VilkårType.BOSATT_I_RIKET] }),
            })
        );
        apiMock.use(...behandlingsmock.handlers);
        const bosattIRiketId = vilkårResultatId(SØKER_IDENT, VilkårType.BOSATT_I_RIKET);

        await page.goto('/fagsak/1/1/vilkaarsvurdering');

        const skjema = page.locator('form').filter({ has: page.getByRole('radiogroup', { name: /bosatt i riket/ }) });
        await skjema.getByRole('button', { name: 'Ferdig' }).click();
        await expect(skjema.getByText('Resultat er ikke satt')).toBeVisible();

        await skjema.getByRole('radio', { name: 'Ja' }).check();
        await skjema.getByLabel('F.o.m').fill('10.02.2020');
        await skjema.getByLabel(/^Begrunnelse/).fill('Søker har bodd i Norge hele livet.');

        const lagreRequest = page.waitForRequest(
            request =>
                request.method() === 'PUT' &&
                request.url().endsWith(`/familie-ba-sak/api/vilkaarsvurdering/1/${bosattIRiketId}`)
        );
        await skjema.getByRole('button', { name: 'Ferdig' }).click();

        expect((await lagreRequest).postDataJSON()).toEqual({
            personIdent: SØKER_IDENT,
            vilkårResultater: [
                expect.objectContaining({
                    id: bosattIRiketId,
                    vilkårType: VilkårType.BOSATT_I_RIKET,
                    resultat: Resultat.OPPFYLT,
                    periodeFom: '2020-02-10',
                    begrunnelse: 'Søker har bodd i Norge hele livet.',
                    vurderesEtter: Regelverk.NASJONALE_REGLER,
                }),
            ],
            andreVurderinger: [],
        });
        await expect(skjema).toBeHidden();

        const stegRequest = page.waitForRequest(
            request => request.method() === 'POST' && request.url().endsWith(VILKÅRSVURDERING_STEG_URL)
        );
        await page.getByRole('button', { name: 'Neste steg' }).click();
        await stegRequest;

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/tilkjent-ytelse$/);
        await expect(page.getByRole('heading', { name: 'Behandlingsresultat' })).toBeVisible();
    });
});
