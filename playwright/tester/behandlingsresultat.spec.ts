import { byggFunksjonellFeilRessurs, byggSuksessRessurs } from '@navikt/familie-typer';
import type { Locator } from '@playwright/test';
import { PersonTestdata } from '@testutils/testdata/personTestdata';
import { BehandlingSteg } from '@typer/behandling';
import { YtelseType } from '@typer/beregning';
import { IEndretUtbetalingAndelÅrsak, type IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { HttpResponse, http } from 'msw';

import {
    BARN_IDENT,
    BARN_NAVN,
    lagBehandlingPåSteg,
    lagTilkjentYtelse,
    ORDINÆR_SATS,
    SØKER_IDENT,
    SØKER_NAVN,
} from '../behandlingsdata';
import { lagBehandlingsmock } from '../behandlingsmock';
import { expect, test } from '../fixtures';

const BEHANDLINGSRESULTAT_STEG_URL = encodeURI(
    '/familie-ba-sak/api/behandlinger/:behandlingId/steg/behandlingsresultat'
);
const UFULLSTENDIG_ENDRET_UTBETALING =
    'Du har opprettet en eller flere endrede utbetalingsperioder som er ufullstendig utfylt. Disse må enten fylles ut eller slettes før du kan gå videre.';

async function vertikaltAvvik(fødselsnummer: Locator, tidslinjerad: Locator): Promise<number> {
    const [fødselsnummerBoks, tidslinjeradBoks] = await Promise.all([
        fødselsnummer.boundingBox(),
        tidslinjerad.boundingBox(),
    ]);
    if (!fødselsnummerBoks || !tidslinjeradBoks) {
        return Number.POSITIVE_INFINITY;
    }
    return Math.abs(
        fødselsnummerBoks.y + fødselsnummerBoks.height / 2 - (tidslinjeradBoks.y + tidslinjeradBoks.height / 2)
    );
}

test.describe('Behandlingsresultat', () => {
    test('skal vise utbetalingen for inneværende måned og gå videre til simuleringen', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.BEHANDLINGSRESULTAT));
        apiMock.use(...behandlingsmock.handlers);

        await page.goto('/fagsak/1/1/tilkjent-ytelse');

        await expect(page.getByRole('heading', { name: 'Behandlingsresultat', level: 1 })).toBeVisible();
        await expect(
            page.getByRole('heading', { name: format(new Date(), 'MMMM yyyy', { locale: nb }) })
        ).toBeVisible();
        await expect(page.getByText(`${BARN_NAVN} (`)).toBeVisible();
        await expect(page.getByText('Ordinær', { exact: true })).toBeVisible();
        await expect(page.getByText('Totalt utbetalt per mnd')).toBeVisible();
        await expect(page.getByText(/^2\s012 kr$/)).toHaveCount(2);

        await page.getByRole('button', { name: 'Neste steg' }).click();

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/simulering$/);
        await expect(page.getByRole('heading', { name: 'Simulering', level: 1 })).toBeVisible();
    });

    test('skal vise feilmeldingen fra backend når behandlingsresultatet ikke kan beregnes', async ({
        page,
        apiMock,
    }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.BEHANDLINGSRESULTAT));
        apiMock.use(
            http.post(BEHANDLINGSRESULTAT_STEG_URL, () =>
                HttpResponse.json(byggFunksjonellFeilRessurs(UFULLSTENDIG_ENDRET_UTBETALING))
            ),
            ...behandlingsmock.handlers
        );

        await page.goto('/fagsak/1/1/tilkjent-ytelse');
        await page.getByRole('button', { name: 'Neste steg' }).click();

        await expect(page.getByText(UFULLSTENDIG_ENDRET_UTBETALING)).toBeVisible();
        await expect(page).toHaveURL(/\/tilkjent-ytelse$/);
    });

    test('skal opprette og fylle ut en endret utbetalingsperiode', async ({ page, apiMock }) => {
        const behandlingsmock = lagBehandlingsmock(lagBehandlingPåSteg(BehandlingSteg.BEHANDLINGSRESULTAT));
        apiMock.use(
            ...behandlingsmock.handlers,
            http.post('/familie-ba-sak/api/endretutbetalingandel/:behandlingId', () =>
                HttpResponse.json(
                    byggSuksessRessurs(
                        behandlingsmock.oppdater({
                            endretUtbetalingAndeler: [{ id: 1, personIdenter: [], erTilknyttetAndeler: false }],
                        })
                    )
                )
            ),
            http.put<never, IRestEndretUtbetalingAndel>(
                '/familie-ba-sak/api/endretutbetalingandel/:behandlingId/:id',
                async ({ request }) => {
                    const endretUtbetalingAndel = await request.json();
                    return HttpResponse.json(
                        byggSuksessRessurs(
                            behandlingsmock.oppdater({
                                endretUtbetalingAndeler: [{ ...endretUtbetalingAndel, erTilknyttetAndeler: true }],
                            })
                        )
                    );
                }
            )
        );

        await page.goto('/fagsak/1/1/tilkjent-ytelse');
        await page.getByRole('button', { name: 'Endre utbetalingsperiode' }).click();

        const skjema = page.locator('form').filter({ has: page.getByLabel('Velg hvem det gjelder') });
        await skjema.getByRole('button', { name: 'Bekreft' }).click();
        await expect(skjema.getByText('Du må velge minst én person')).toBeVisible();
        await expect(skjema.getByText('Du må velge en årsak')).toBeVisible();
        await expect(skjema.getByText('Du må velge om beløpet skal utbetales')).toBeVisible();
        await expect(skjema.getByText('Du må begrunne den endrede utbetalingsperioden')).toBeVisible();

        await skjema.getByLabel('Velg hvem det gjelder').click();
        await page.getByRole('option').filter({ hasText: BARN_NAVN }).click();
        await skjema.getByLabel('Årsak').selectOption({ label: 'Etterbetaling 3 måneder' });
        await skjema.getByLabel('F.o.m.').fill('03.2020');
        await skjema.getByLabel(/^T\.o\.m\./).fill('11.2025');
        await skjema.getByRole('radio', { name: 'Perioden skal utbetales delt' }).check();
        await skjema.getByLabel('Søknadstidspunkt').fill('01.03.2026');
        await skjema.getByLabel('Begrunnelse').fill('Søknaden kom mer enn tre måneder etter at retten oppstod.');

        const lagreRequest = page.waitForRequest(
            request =>
                request.method() === 'PUT' && request.url().endsWith('/familie-ba-sak/api/endretutbetalingandel/1/1')
        );
        await skjema.getByRole('button', { name: 'Bekreft' }).click();

        expect((await lagreRequest).postDataJSON()).toEqual({
            id: 1,
            personIdenter: [BARN_IDENT],
            prosent: 50,
            fom: '2020-03',
            tom: '2025-11',
            årsak: IEndretUtbetalingAndelÅrsak.ETTERBETALING_3MND,
            begrunnelse: 'Søknaden kom mer enn tre måneder etter at retten oppstod.',
            søknadstidspunkt: '2026-03-01',
            erTilknyttetAndeler: false,
        });
        await expect(skjema).toBeHidden();
    });

    test('skal vise fødselsnummeret på høyde med tidslinjeraden til personen', async ({ page, apiMock }) => {
        const søkersAndeler = PersonTestdata.lagPersonMedAndelerTilkjentYtelse({
            personIdent: SØKER_IDENT,
            beløp: ORDINÆR_SATS,
            stønadFom: '2020-03',
            stønadTom: '2038-01',
            ytelsePerioder: [
                {
                    beløp: ORDINÆR_SATS,
                    stønadFom: '2020-03',
                    stønadTom: '2038-01',
                    ytelseType: YtelseType.UTVIDET_BARNETRYGD,
                    skalUtbetales: true,
                },
            ],
        });
        const behandlingsmock = lagBehandlingsmock(
            lagBehandlingPåSteg(BehandlingSteg.BEHANDLINGSRESULTAT, {
                personerMedAndelerTilkjentYtelse: [
                    søkersAndeler,
                    ...lagTilkjentYtelse().personerMedAndelerTilkjentYtelse,
                ],
            })
        );
        apiMock.use(...behandlingsmock.handlers);

        await page.goto('/fagsak/1/1/tilkjent-ytelse');

        const tidslinjerader = page.locator('.tidslinjerad');
        await expect(tidslinjerader).toHaveCount(2);
        for (const [index, navn] of [SØKER_NAVN, BARN_NAVN].entries()) {
            await expect
                .poll(() => vertikaltAvvik(page.getByTitle(navn, { exact: true }), tidslinjerader.nth(index)))
                .toBeLessThanOrEqual(4);
        }
    });
});
