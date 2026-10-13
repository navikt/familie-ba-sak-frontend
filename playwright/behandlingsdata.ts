import { byggSuksessRessurs } from '@navikt/familie-typer';
import { BehandlingTestdata } from '@testutils/testdata/behandlingTestdata';
import { PersonResultatTestdata } from '@testutils/testdata/personResultatTestdata';
import { PersonTestdata } from '@testutils/testdata/personTestdata';
import { SaksbehandlerTestdata } from '@testutils/testdata/saksbehandlerTestdata';
import { VedtaksperiodeTestdata } from '@testutils/testdata/vedtaksperiodeTestdata';
import { VilkårResultatTestdata } from '@testutils/testdata/vilkårResultatTestdata';
import { BehandlerRolle, type BehandlingSteg, type IBehandling } from '@typer/behandling';
import { YtelseType } from '@typer/beregning';
import { PersonType } from '@typer/person';
import { type IRestVedtakBegrunnelseTilknyttetVilkår, VedtakBegrunnelseType } from '@typer/vedtak';
import { type IVedtaksperiodeMedBegrunnelser, Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { type IRestPersonResultat, Regelverk, Resultat, VilkårType } from '@typer/vilkår';
import { HttpResponse, http } from 'msw';

export const SØKER_IDENT = '12345678910';
export const SØKER_NAVN = 'Søker Testersen';
export const BARN_IDENT = '10022012345';
export const BARN_NAVN = 'Barn Testersen';

const BARN_FØDSELSDATO = '2020-02-10';
const BARN_DAGEN_FØR_18_ÅR = '2038-02-09';

/** Sats for ordinær barnetrygd fra februar 2026. Brukes for hele perioden for enkelhets skyld. */
export const ORDINÆR_SATS = 2012;

export const SØKERS_VILKÅR = [VilkårType.BOSATT_I_RIKET, VilkårType.LOVLIG_OPPHOLD];

export const BARNETS_VILKÅR = [
    VilkårType.UNDER_18_ÅR,
    VilkårType.BOR_MED_SØKER,
    VilkårType.GIFT_PARTNERSKAP,
    VilkårType.BOSATT_I_RIKET,
    VilkårType.LOVLIG_OPPHOLD,
];

const VILKÅR_UTEN_REGELVERK = [VilkårType.UNDER_18_ÅR, VilkårType.GIFT_PARTNERSKAP];

export function lagPersoner() {
    return [
        PersonTestdata.lagGrunnlagPerson({ personIdent: SØKER_IDENT, navn: SØKER_NAVN }),
        PersonTestdata.lagGrunnlagPerson({
            personIdent: BARN_IDENT,
            navn: BARN_NAVN,
            type: PersonType.BARN,
            fødselsdato: BARN_FØDSELSDATO,
        }),
    ];
}

/** Vilkår-id-ene er løpenummer: søkers vilkår først, deretter barnets, i rekkefølgen over. */
export function vilkårResultatId(personIdent: string, vilkårType: VilkårType) {
    return personIdent === SØKER_IDENT
        ? SØKERS_VILKÅR.indexOf(vilkårType) + 1
        : SØKERS_VILKÅR.length + BARNETS_VILKÅR.indexOf(vilkårType) + 1;
}

/** Søkers vilkår som ikke er vurdert ennå. Alle andre vilkår er oppfylt fra barnets fødsel. */
interface VilkårsvurderingValg {
    ikkeVurderteVilkårForSøker?: VilkårType[];
}

export function lagPersonResultater({
    ikkeVurderteVilkårForSøker = [],
}: VilkårsvurderingValg = {}): IRestPersonResultat[] {
    function lagVilkår(personIdent: string, vilkårType: VilkårType) {
        const id = vilkårResultatId(personIdent, vilkårType);
        if (personIdent === SØKER_IDENT && ikkeVurderteVilkårForSøker.includes(vilkårType)) {
            return VilkårResultatTestdata.lagVilkårResultat({
                id,
                vilkårType,
                vurderesEtter: Regelverk.NASJONALE_REGLER,
                begrunnelse: '',
            });
        }
        return VilkårResultatTestdata.lagVilkårResultat({
            id,
            vilkårType,
            resultat: Resultat.OPPFYLT,
            erVurdert: true,
            periodeFom: BARN_FØDSELSDATO,
            periodeTom: vilkårType === VilkårType.UNDER_18_ÅR ? BARN_DAGEN_FØR_18_ÅR : undefined,
            vurderesEtter: VILKÅR_UTEN_REGELVERK.includes(vilkårType) ? null : Regelverk.NASJONALE_REGLER,
            begrunnelse: '',
        });
    }

    return [
        PersonResultatTestdata.lagPersonResultat({
            personIdent: SØKER_IDENT,
            vilkårResultater: SØKERS_VILKÅR.map(vilkårType => lagVilkår(SØKER_IDENT, vilkårType)),
        }),
        PersonResultatTestdata.lagPersonResultat({
            personIdent: BARN_IDENT,
            vilkårResultater: BARNETS_VILKÅR.map(vilkårType => lagVilkår(BARN_IDENT, vilkårType)),
        }),
    ];
}

/** Ordinær barnetrygd for barnet fra måneden etter fødsel til måneden før det fyller 18 år. */
export function lagTilkjentYtelse(): Pick<IBehandling, 'utbetalingsperioder' | 'personerMedAndelerTilkjentYtelse'> {
    const barn = lagPersoner()[1];
    return {
        utbetalingsperioder: [
            VedtaksperiodeTestdata.lagUtbetalingsperiode({
                periodeFom: '2020-03-01',
                periodeTom: '2038-01-31',
                utbetalingsperiodeDetaljer: [
                    VedtaksperiodeTestdata.lagUtbetalingsperiodeDetalj({ person: barn, utbetaltPerMnd: ORDINÆR_SATS }),
                ],
            }),
        ],
        personerMedAndelerTilkjentYtelse: [
            PersonTestdata.lagPersonMedAndelerTilkjentYtelse({
                personIdent: BARN_IDENT,
                beløp: ORDINÆR_SATS,
                stønadFom: '2020-03',
                stønadTom: '2038-01',
                ytelsePerioder: [
                    {
                        beløp: ORDINÆR_SATS,
                        stønadFom: '2020-03',
                        stønadTom: '2038-01',
                        ytelseType: YtelseType.ORDINÆR_BARNETRYGD,
                        skalUtbetales: true,
                    },
                ],
            }),
        ],
    };
}

/**
 * Førstegangsbehandling på søknad for én søker og ett barn, der alle vilkår er oppfylt og barnet har fått tilkjent
 * ordinær barnetrygd.
 */
export function lagBehandlingPåSteg(steg: BehandlingSteg, endringer: Partial<IBehandling> = {}): IBehandling {
    return BehandlingTestdata.lagBehandling({
        steg,
        personer: lagPersoner(),
        personResultater: lagPersonResultater(),
        ...lagTilkjentYtelse(),
        vedtak: { aktiv: true, vedtaksdato: '', id: 1 },
        ...endringer,
    });
}

// NB! Denne verdien samsvarer ikke med enum-verdien i backend - BEGRUNNELSE_BOSATT_I_RIKTET
export const BEGRUNNELSE_BOSATT_I_RIKET: IRestVedtakBegrunnelseTilknyttetVilkår = {
    id: 'Standardbegrunnelse$INNVILGET_BOSATT_I_RIKET',
    navn: 'Norsk, nordisk bosatt i Norge',
    vilkår: VilkårType.BOSATT_I_RIKET,
};

export const BEGRUNNELSE_LOVLIG_OPPHOLD: IRestVedtakBegrunnelseTilknyttetVilkår = {
    id: 'Standardbegrunnelse$INNVILGET_LOVLIG_OPPHOLD_OPPHOLDSTILLATELSE',
    navn: 'Tredjelandsborger med lovlig opphold samtidig som bosatt i Norge',
    vilkår: VilkårType.LOVLIG_OPPHOLD,
};

/**
 * Én innvilget vedtaksperiode for barnet uten valgte begrunnelser. Valg av standardbegrunnelser lagres, slik at
 * perioden har begrunnelser når appen henter vedtaksperiodene på nytt.
 */
export function lagVedtaksperiodemock() {
    let vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [
        VedtaksperiodeTestdata.lagVedtaksperiodeMedBegrunnelser({
            id: 1,
            fom: '2020-03-01',
            tom: '2038-01-31',
            type: Vedtaksperiodetype.UTBETALING,
            gyldigeBegrunnelser: [BEGRUNNELSE_BOSATT_I_RIKET.id, BEGRUNNELSE_LOVLIG_OPPHOLD.id],
            utbetalingsperiodeDetaljer: [
                VedtaksperiodeTestdata.lagUtbetalingsperiodeDetalj({
                    person: lagPersoner()[1],
                    utbetaltPerMnd: ORDINÆR_SATS,
                }),
            ],
        }),
    ];

    return {
        hent: () => vedtaksperioder,
        handlers: [
            http.get('/familie-ba-sak/api/vedtaksperioder/behandling/:behandlingId/hent-vedtaksperioder', () =>
                HttpResponse.json(byggSuksessRessurs(vedtaksperioder))
            ),
            http.get('/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser', () =>
                HttpResponse.json(
                    byggSuksessRessurs(
                        VedtaksperiodeTestdata.lagAlleBegrunnelser({
                            [VedtakBegrunnelseType.INNVILGET]: [BEGRUNNELSE_BOSATT_I_RIKET, BEGRUNNELSE_LOVLIG_OPPHOLD],
                        })
                    )
                )
            ),
            http.put<{ vedtaksperiodeId: string }, { standardbegrunnelser: string[] }>(
                '/familie-ba-sak/api/vedtaksperioder/standardbegrunnelser/:vedtaksperiodeId',
                async ({ params, request }) => {
                    const { standardbegrunnelser } = await request.json();
                    vedtaksperioder = vedtaksperioder.map(vedtaksperiode =>
                        vedtaksperiode.id !== Number(params.vedtaksperiodeId)
                            ? vedtaksperiode
                            : {
                                  ...vedtaksperiode,
                                  begrunnelser: standardbegrunnelser.map(standardbegrunnelse => ({
                                      standardbegrunnelse,
                                      vedtakBegrunnelseType: VedtakBegrunnelseType.INNVILGET,
                                      støtterFritekst: false,
                                  })),
                              }
                    );
                    return HttpResponse.json(byggSuksessRessurs(vedtaksperioder));
                }
            ),
        ],
    };
}

// Rollen utledes fra AD-gruppene i /user/profile. Gruppene her er saksbehandler- og beslutterrollen i preprod.
export const BESLUTTER = SaksbehandlerTestdata.lagSaksbehandler({
    groups: ['d21e00a4-969d-4b28-8782-dc818abfae65', '9449c153-5a1e-44a7-84c6-7cc7a8867233'],
    displayName: 'Beslutter Testersen',
    email: 'beslutter@nav.no',
    firstName: 'Beslutter',
    lastName: 'Testersen',
    navIdent: 'B1',
    rolle: BehandlerRolle.BESLUTTER,
});

export const innloggetSomBeslutter = http.get('/user/profile', () => HttpResponse.json(BESLUTTER));
