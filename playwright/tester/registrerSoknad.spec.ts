import { byggFunksjonellFeilRessurs, byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingTestdata } from '@testutils/testdata/behandlingTestdata';
import { PersonResultatTestdata } from '@testutils/testdata/personResultatTestdata';
import { PersonTestdata } from '@testutils/testdata/personTestdata';
import { VilkårResultatTestdata } from '@testutils/testdata/vilkårResultatTestdata';
import { BehandlingSteg, type IBehandling } from '@typer/behandling';
import { PersonType } from '@typer/person';
import { VilkårType } from '@typer/vilkår';
import { HttpResponse, http } from 'msw';

import { expect, test } from '../fixtures';

const BARN_IDENT = '10022012345';
// msw matcher mot URL-kodet sti, så æøå må kodes.
const REGISTRER_SØKNAD_URL = encodeURI('/familie-ba-sak/api/behandlinger/:behandlingId/steg/registrer-søknad');

const SØKER_IDENT = '12345678910';

function lagBehandlingIVilkårsvurdering(): IBehandling {
    return BehandlingTestdata.lagBehandling({
        steg: BehandlingSteg.VILKÅRSVURDERING,
        personer: [
            PersonTestdata.lagGrunnlagPerson({ personIdent: SØKER_IDENT, navn: 'Test Testersen' }),
            PersonTestdata.lagGrunnlagPerson({
                personIdent: BARN_IDENT,
                navn: 'Barn Testersen',
                type: PersonType.BARN,
                fødselsdato: '2020-02-10',
            }),
        ],
        personResultater: [
            PersonResultatTestdata.lagPersonResultat({
                personIdent: SØKER_IDENT,
                vilkårResultater: [
                    VilkårResultatTestdata.lagVilkårResultat({ id: 1, vilkårType: VilkårType.BOSATT_I_RIKET }),
                ],
            }),
            PersonResultatTestdata.lagPersonResultat({
                personIdent: BARN_IDENT,
                vilkårResultater: [
                    VilkårResultatTestdata.lagVilkårResultat({ id: 2, vilkårType: VilkårType.BOR_MED_SØKER }),
                ],
            }),
        ],
    });
}

test.describe('Registrer søknad', () => {
    test.beforeEach(async ({ page, apiMock }) => {
        apiMock.use(
            http.post<never, { ident: string }>('/familie-ba-sak/api/person', async ({ request }) => {
                const { ident } = await request.json();
                return HttpResponse.json(
                    byggSuksessRessurs(
                        PersonTestdata.lagPerson({
                            personIdent: ident,
                            forelderBarnRelasjon: [
                                PersonTestdata.lagForelderBarnRelasjon({
                                    navn: 'Barn Testersen',
                                    personIdent: BARN_IDENT,
                                }),
                            ],
                        })
                    )
                );
            })
        );

        await page.goto('/fagsak/1/1/registrer-soknad');
        await expect(page.getByRole('heading', { name: 'Registrer opplysninger fra søknaden' })).toBeVisible();
    });

    test('skal kreve målform før søknaden kan registreres', async ({ page }) => {
        await page.getByRole('button', { name: 'Bekreft og fortsett' }).click();

        await expect(page.getByRole('radiogroup', { name: 'Målform' })).toContainText('Målform er påkrevd.');
        await expect(page).toHaveURL(/\/registrer-soknad$/);
    });

    test('skal registrere søknad med valgt barn og gå videre til vilkårsvurderingen', async ({ page, apiMock }) => {
        apiMock.use(
            http.post(REGISTRER_SØKNAD_URL, () =>
                HttpResponse.json(byggSuksessRessurs(lagBehandlingIVilkårsvurdering()))
            )
        );

        await page.getByRole('checkbox', { name: /Barn Testersen/ }).check();
        await page.getByRole('radio', { name: 'Bokmål' }).check();

        const registrerRequest = page.waitForRequest(request => request.url().includes('/steg/registrer-s'));
        await page.getByRole('button', { name: 'Bekreft og fortsett' }).click();

        expect((await registrerRequest).postDataJSON()).toMatchObject({
            søknad: {
                søkerMedOpplysninger: { ident: SØKER_IDENT, målform: 'NB' },
                barnaMedOpplysninger: [{ ident: BARN_IDENT, inkludertISøknaden: true }],
            },
            bekreftEndringerViaFrontend: false,
        });
        await expect(page).toHaveURL(/\/fagsak\/1\/1\/vilkaarsvurdering$/);
        await expect(page.getByRole('heading', { name: 'Vilkårsvurdering', level: 1 })).toBeVisible();
    });

    test('skal be om bekreftelse når backend krever det', async ({ page, apiMock }) => {
        const mottatteBekreftelser: boolean[] = [];
        apiMock.use(
            http.post<never, { bekreftEndringerViaFrontend: boolean }>(REGISTRER_SØKNAD_URL, async ({ request }) => {
                const { bekreftEndringerViaFrontend } = await request.json();
                mottatteBekreftelser.push(bekreftEndringerViaFrontend);
                if (!bekreftEndringerViaFrontend) {
                    return HttpResponse.json(
                        byggFunksjonellFeilRessurs('Barnet er allerede registrert i en annen sak.')
                    );
                }
                return HttpResponse.json(byggSuksessRessurs(lagBehandlingIVilkårsvurdering()));
            })
        );

        await page.getByRole('checkbox', { name: /Barn Testersen/ }).check();
        await page.getByRole('radio', { name: 'Bokmål' }).check();
        await page.getByRole('button', { name: 'Bekreft og fortsett' }).click();

        const modal = page.getByRole('dialog', { name: 'Er du sikker på at du vil gå videre?' });
        await expect(modal.getByText('Barnet er allerede registrert i en annen sak.')).toBeVisible();

        await modal.getByRole('button', { name: 'Ja' }).click();

        await expect(page).toHaveURL(/\/fagsak\/1\/1\/vilkaarsvurdering$/);
        expect(mottatteBekreftelser).toEqual([false, true]);
    });
});
