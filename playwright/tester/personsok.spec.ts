import { byggSuksessRessurs } from '@navikt/familie-typer';
import { FagsakDeltagerTestdata } from '@testutils/testdata/fagsakDeltagerTestdata';
import { FagsakTestdata } from '@testutils/testdata/fagsakTestdata';
import generator from '@testutils/testverktøy/fnr/fnr-generator';
import { HttpResponse, http } from 'msw';

import { expect, test } from '../fixtures';

const gyldigFnr = generator(new Date('1990-05-17')).next().value as string;

test.describe('Personsøk', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/oppgaver');
        await expect(page.getByRole('heading', { name: 'Oppgavebenken' })).toBeVisible();
    });

    test('skal vise valideringsfeil og ikke søke ved ugyldig fødselsnummer', async ({ page }) => {
        const søkekall: string[] = [];
        page.on('request', request => {
            if (request.url().endsWith('/familie-ba-sak/api/fagsaker/sok')) {
                søkekall.push(request.url());
            }
        });

        await page.getByRole('searchbox', { name: 'Fødsels- eller D-nummer (11 siffer)' }).fill('12345678900');
        await page.getByRole('searchbox', { name: 'Fødsels- eller D-nummer (11 siffer)' }).press('Enter');

        await expect(page.getByText('Ugyldig fødsels- eller d-nummer (11 siffer)')).toBeVisible();
        expect(søkekall).toEqual([]);
    });

    test('skal navigere til saksoversikten når et treff med fagsak velges', async ({ page, apiMock }) => {
        apiMock.use(
            http.post('/familie-ba-sak/api/fagsaker/sok', () =>
                HttpResponse.json(
                    byggSuksessRessurs([
                        FagsakDeltagerTestdata.lagFagsakDeltager({
                            ident: gyldigFnr,
                            navn: 'Søker Søkersen',
                            fagsakId: 42,
                        }),
                    ])
                )
            )
        );

        const søkRequest = page.waitForRequest('**/familie-ba-sak/api/fagsaker/sok');
        await page.getByRole('searchbox', { name: 'Fødsels- eller D-nummer (11 siffer)' }).fill(gyldigFnr);
        expect((await søkRequest).postDataJSON()).toEqual({ personIdent: gyldigFnr });

        await page.getByText(/Søker Søkersen/).click();

        await expect(page).toHaveURL(/\/fagsak\/42\/saksoversikt$/);
        await expect(page.getByRole('heading', { name: 'Saksoversikt' })).toBeVisible();
    });

    test('skal kunne opprette fagsak når treffet ikke har fagsak', async ({ page, apiMock }) => {
        apiMock.use(
            http.post('/familie-ba-sak/api/fagsaker/sok', () =>
                HttpResponse.json(
                    byggSuksessRessurs([
                        FagsakDeltagerTestdata.lagFagsakDeltager({
                            ident: gyldigFnr,
                            navn: 'Søker Søkersen',
                            fagsakId: undefined,
                        }),
                    ])
                )
            ),
            http.post('/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person', () =>
                HttpResponse.json(byggSuksessRessurs([]))
            ),
            http.post('/familie-ba-sak/api/fagsaker', () =>
                HttpResponse.json(
                    byggSuksessRessurs(
                        FagsakTestdata.lagFagsak({ id: 2, søkerFødselsnummer: gyldigFnr, behandlinger: [] })
                    )
                )
            )
        );

        await page.getByRole('searchbox', { name: 'Fødsels- eller D-nummer (11 siffer)' }).fill(gyldigFnr);
        await page.getByText(/Søker Søkersen/).click();

        const modal = page.getByRole('dialog');
        await expect(modal.getByText('Ønsker du å opprette fagsak for denne personen?')).toBeVisible();

        const opprettRequest = page.waitForRequest(
            request => request.method() === 'POST' && request.url().endsWith('/familie-ba-sak/api/fagsaker')
        );
        await modal.getByRole('button', { name: 'Opprett fagsak' }).click();

        expect((await opprettRequest).postDataJSON()).toEqual({
            personIdent: gyldigFnr,
            fagsakType: 'NORMAL',
            institusjon: null,
            skjermetBarnSøker: null,
        });
        await expect(modal).toBeHidden();
        await expect(page).toHaveURL(/\/fagsak\/2\/saksoversikt$/);
    });
});
