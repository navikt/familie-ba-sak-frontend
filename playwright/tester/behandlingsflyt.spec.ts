import { byggSuksessRessurs } from '@navikt/familie-typer';
import { FagsakTestdata } from '@testutils/testdata/fagsakTestdata';
import { PersonTestdata } from '@testutils/testdata/personTestdata';
import { BehandlingStatus, BehandlingSteg } from '@typer/behandling';
import { FagsakStatus } from '@typer/fagsak';
import { VilkårType } from '@typer/vilkår';
import { format } from 'date-fns';
import { HttpResponse, http } from 'msw';

import {
    BARN_IDENT,
    BARN_NAVN,
    BEGRUNNELSE_BOSATT_I_RIKET,
    innloggetSomBeslutter,
    lagBehandlingPåSteg,
    lagPersonResultater,
    lagTilkjentYtelse,
    lagVedtaksperiodemock,
} from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';
import { kontrollerAlleSider } from '../kontrollsider';

const søkerMedBarn = http.post<never, { ident: string }>('/familie-ba-sak/api/person', async ({ request }) => {
    const { ident } = await request.json();
    return HttpResponse.json(
        byggSuksessRessurs(
            PersonTestdata.lagPerson({
                personIdent: ident,
                forelderBarnRelasjon: [
                    PersonTestdata.lagForelderBarnRelasjon({ navn: BARN_NAVN, personIdent: BARN_IDENT }),
                ],
            })
        )
    );
});

test('skal behandle en søknad fra opprettelse til godkjent vedtak', async ({ page, apiMock }) => {
    const behandlingsmock = lagBehandlingsmock(
        lagBehandlingPåSteg(BehandlingSteg.REGISTRERE_SØKNAD, {
            personResultater: [],
            utbetalingsperioder: [],
            personerMedAndelerTilkjentYtelse: [],
        }),
        {
            fagsak: FagsakTestdata.lagFagsak({ status: FagsakStatus.OPPRETTET, behandlinger: [] }),
            opprettes: true,
            etterSteg: {
                // Forenklet: i backend er bare «under 18 år» og «gift/partnerskap» vurdert etter registrering av
                // søknaden. Her står bare søkers «bosatt i riket» igjen, så flyten holder seg kort.
                'registrer-søknad': {
                    personResultater: lagPersonResultater({ ikkeVurderteVilkårForSøker: [VilkårType.BOSATT_I_RIKET] }),
                },
                vilkårsvurdering: lagTilkjentYtelse(),
            },
        }
    );
    const vedtaksperiodemock = lagVedtaksperiodemock();
    apiMock.use(søkerMedBarn, ...behandlingsmock.handlers, ...vedtaksperiodemock.handlers);

    await test.step('Opprett førstegangsbehandling', async () => {
        await page.goto('/fagsak/1/saksoversikt');
        await page.getByRole('button', { name: 'Meny' }).click();
        await page.getByRole('menuitem', { name: 'Opprett behandling' }).click();

        const modal = page.getByRole('dialog', { name: 'Opprett ny behandling' });
        await modal.getByLabel('Velg type behandling').selectOption({ label: 'Førstegangsbehandling' });
        await modal.getByLabel('Velg behandlingstema').selectOption({ label: 'Nasjonal ordinær' });
        await modal.getByLabel('Søknad mottatt dato').fill(format(new Date(), 'dd.MM.yyyy'));
        await modal.getByRole('button', { name: 'Bekreft' }).click();

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/registrer-soknad$/);
    });

    await test.step('Registrer søknad', async () => {
        await page.getByRole('checkbox', { name: new RegExp(BARN_NAVN) }).check();
        await page.getByRole('radio', { name: 'Bokmål' }).check();
        await page.getByRole('button', { name: 'Bekreft og fortsett' }).click();

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/vilkaarsvurdering$/);
    });

    await test.step('Vurder vilkår', async () => {
        const skjema = page.locator('form').filter({ has: page.getByRole('radiogroup', { name: /bosatt i riket/ }) });
        await skjema.getByRole('radio', { name: 'Ja' }).check();
        await skjema.getByLabel('F.o.m').fill('10.02.2020');
        await skjema.getByRole('button', { name: 'Ferdig' }).click();
        await expect(skjema).toBeHidden();

        await page.getByRole('button', { name: 'Neste steg' }).click();

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/tilkjent-ytelse$/);
    });

    await test.step('Kontroller behandlingsresultat', async () => {
        await expect(page.getByText(/^2\s012 kr$/)).toHaveCount(2);
        await page.getByRole('button', { name: 'Neste steg' }).click();

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/simulering$/);
    });

    await test.step('Kontroller simulering', async () => {
        await expect(page.getByText('Det er ingen etterbetaling, feilutbetaling eller neste utbetaling')).toBeVisible();
        await page.getByRole('button', { name: 'Neste steg' }).click();

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/vedtak$/);
    });

    await test.step('Begrunn vedtaket og send det til godkjenning', async () => {
        const vedtaksperiode = page.getByRole('region', { name: 'Begrunnelse - Periode 2020-03-01_2038-01-31' });
        await vedtaksperiode.getByRole('combobox').click();
        await page.getByRole('option', { name: BEGRUNNELSE_BOSATT_I_RIKET.navn }).click();
        await expect(vedtaksperiode.getByText(BEGRUNNELSE_BOSATT_I_RIKET.navn)).toBeVisible();

        await page.getByRole('button', { name: 'Til godkjenning' }).click();

        await expect(page.getByText('Behandlingen er nå sendt til totrinnskontroll.')).toBeVisible();
        expect(behandlingsmock.hent().status).toBe(BehandlingStatus.FATTER_VEDTAK);
    });

    await test.step('Beslutter kontrollerer og godkjenner vedtaket', async () => {
        apiMock.use(innloggetSomBeslutter);
        await page.goto('/fagsak/1/1/vedtak');

        const totrinnskontroll = page
            .locator('form')
            .filter({ has: page.getByRole('heading', { name: 'Totrinnskontroll' }) });
        await expect(
            totrinnskontroll.getByText('Kontrollér opplysninger og faglige vurderinger som er gjort')
        ).toBeVisible();

        await kontrollerAlleSider(page);

        await totrinnskontroll.getByRole('radio', { name: 'Godkjent' }).check();
        await totrinnskontroll.getByRole('button', { name: 'Godkjenn vedtaket' }).click();

        await expect(page.getByText('Behandlingen er godkjent, og vedtaket er iverksatt.')).toBeVisible();
        expect(behandlingsmock.hent().status).toBe(BehandlingStatus.IVERKSETTER_VEDTAK);
    });
});
