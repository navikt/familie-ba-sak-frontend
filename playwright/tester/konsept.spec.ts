import { BehandlingSteg } from '@typer/behandling';
import { VilkårType } from '@typer/vilkår';

import { BARN_NAVN, lagBehandlingPåSteg, lagPersonResultater, SØKER_NAVN } from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';

test.describe('UI-konsepter', () => {
    test('skal kunne bytte mellom konseptene med bryteren i headeren', async ({ page, apiMock }) => {
        apiMock.use(...lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VILKÅRSVURDERING)).handlers);

        await page.goto('/fagsak/1/1/vilkaarsvurdering');
        const konseptvelger = page.getByRole('radiogroup', { name: 'Velg UI-konsept' });

        await expect(page.getByRole('navigation', { name: 'Personer i behandlingen' })).toBeVisible();

        await konseptvelger.getByRole('radio', { name: 'Konsept 3' }).click();
        await expect(page.getByRole('navigation', { name: 'Oppgaver i behandlingen' })).toBeVisible();
        await expect(page.getByRole('navigation', { name: 'Personer i behandlingen' })).toBeHidden();

        await konseptvelger.getByRole('radio', { name: 'Dagens' }).click();
        await expect(page.getByRole('link', { name: '1. Registrer søknad' })).toBeVisible();
        await expect(page.getByRole('navigation', { name: 'Behandlingssteg' })).toBeHidden();

        // Valget huskes etter omlasting
        await page.reload();
        await expect(page.getByRole('link', { name: '1. Registrer søknad' })).toBeVisible();
    });

    test('dagens: skal vise vilkårene for søker og barn', async ({ page, apiMock }) => {
        apiMock.use(...lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.VILKÅRSVURDERING)).handlers);

        await page.goto('/fagsak/1/1/vilkaarsvurdering?konsept=dagens');

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
        await expect(page.getByRole('cell', { name: 'Oppfylt' })).toHaveCount(7);
    });

    test('konsept 3: skal vise vilkår som ikke er vurdert som oppgaver', async ({ page, apiMock }) => {
        apiMock.use(
            ...lagBehandlingsmock(
                lagBehandlingPåSteg(BehandlingSteg.VILKÅRSVURDERING, {
                    personResultater: lagPersonResultater({ ikkeVurderteVilkårForSøker: [VilkårType.BOSATT_I_RIKET] }),
                })
            ).handlers
        );

        await page.goto('/fagsak/1/1/vilkaarsvurdering?konsept=konsept-3');
        const oppgavemeny = page.getByRole('navigation', { name: 'Oppgaver i behandlingen' });

        await expect(oppgavemeny.getByText('1 oppgaver · 1 uavklarte vilkår')).toBeVisible();
        await expect(oppgavemeny.getByRole('link')).toHaveCount(1);
        await expect(oppgavemeny.getByRole('link', { name: /Bosatt i riket/ })).toBeVisible();

        await oppgavemeny.getByRole('button', { name: 'Se alle vilkår' }).click();
        await expect(oppgavemeny.getByRole('link')).toHaveCount(7);

        await oppgavemeny.getByRole('link', { name: 'Bor fast hos søker' }).click();
        await expect(page.getByRole('region', { name: BARN_NAVN })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Bor fast hos søker' })).toBeInViewport();
    });
});
