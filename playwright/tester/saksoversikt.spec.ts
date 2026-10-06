import { byggFeiletRessurs, byggSuksessRessurs } from '@navikt/familie-typer';
import { FagsakTestdata } from '@testutils/testdata/fagsakTestdata';
import { PersonTestdata } from '@testutils/testdata/personTestdata';
import { VedtaksperiodeTestdata } from '@testutils/testdata/vedtaksperiodeTestdata';
import { PersonType } from '@typer/person';
import { HttpResponse, http } from 'msw';

import { expect, test } from '../fixtures';

const FAGSAK_URL = '/familie-ba-sak/api/fagsaker/minimal/:fagsakId';

test.describe('Saksoversikt', () => {
    test('skal vise løpende utbetaling og behandlinger for fagsaken', async ({ page, apiMock }) => {
        apiMock.use(
            http.get(FAGSAK_URL, () =>
                HttpResponse.json(
                    byggSuksessRessurs(
                        FagsakTestdata.lagFagsak({
                            gjeldendeUtbetalingsperioder: [
                                VedtaksperiodeTestdata.lagUtbetalingsperiode({
                                    utbetalingsperiodeDetaljer: [
                                        VedtaksperiodeTestdata.lagUtbetalingsperiodeDetalj({
                                            person: PersonTestdata.lagGrunnlagPerson({
                                                navn: 'Barn Testersen',
                                                personIdent: '10022012345',
                                                type: PersonType.BARN,
                                            }),
                                            utbetaltPerMnd: 1968,
                                        }),
                                    ],
                                }),
                            ],
                        })
                    )
                )
            )
        );

        await page.goto('/fagsak/1/saksoversikt');

        await expect(page.getByRole('heading', { name: 'Saksoversikt' })).toBeVisible();

        await expect(page.getByRole('heading', { name: 'Løpende månedlig utbetaling' })).toBeVisible();
        await expect(page.getByText(/Barn Testersen/)).toBeVisible();
        await expect(page.getByText('Totalt utbetalt/mnd')).toBeVisible();
        // Beløpet vises både for barnet og som totalsum.
        await expect(page.getByText(/^1\s968 kr$/)).toHaveCount(2);

        const behandlinger = page.getByRole('table').filter({ has: page.getByRole('columnheader', { name: 'Årsak' }) });
        await expect(behandlinger.getByRole('row', { name: /Førstegangsbehandling/ })).toBeVisible();
    });

    test('skal navigere til behandlingen ved klikk på resultatet i behandlingstabellen', async ({ page }) => {
        await page.goto('/fagsak/1/saksoversikt');

        await page
            .getByRole('row', { name: /Førstegangsbehandling/ })
            .getByRole('link', { name: 'Innvilget' })
            .click();

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/registrer-soknad$/);
        await expect(page.getByRole('heading', { name: 'Førstegangsbehandling (1/1)' })).toBeVisible();
    });

    test('skal vise feilmelding når fagsaken ikke kan hentes', async ({ page, apiMock }) => {
        apiMock.use(http.get(FAGSAK_URL, () => HttpResponse.json(byggFeiletRessurs('Fant ikke fagsak med id 1.'))));

        await page.goto('/fagsak/1/saksoversikt');

        const feilmelding = page.getByRole('alert');
        await expect(feilmelding.getByRole('heading', { name: /Feil oppstod ved innlasting av fagsak/ })).toBeVisible();
        await expect(feilmelding).toContainText('Fant ikke fagsak med id 1.');
    });
});
