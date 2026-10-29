import { kjønnType } from '@navikt/familie-typer';
import { lagVisningBehandling } from '@testutils/testdata/behandlingTestdata';
import { FagsakTestdata } from '@testutils/testdata/fagsakTestdata';
import { BehandlingResultat } from '@typer/behandling';
import { YtelseType } from '@typer/beregning';
import { PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { addYears } from 'date-fns';
import { dagensDato, dateTilIsoDatoString } from './dato';
import { hentBarnMedLøpendeUtbetaling, hentSisteIkkeHenlagteBehandling } from './fagsak';

describe('hentSisteIkkeHenlagteBehandling', () => {
    test('hent siste ikke-henlagte behandling', () => {
        const fagsak = FagsakTestdata.lagFagsak({
            behandlinger: [
                lagVisningBehandling({
                    behandlingId: 1,
                    opprettetTidspunkt: '2023-01-06T16:11:59.065',
                }),
                lagVisningBehandling({
                    behandlingId: 2,
                    opprettetTidspunkt: '2023-01-06T16:21:59.065',
                }),
                lagVisningBehandling({
                    behandlingId: 3,
                    resultat: BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET,
                    opprettetTidspunkt: '2023-01-06T16:31:59.065',
                }),
            ],
        });
        expect(hentSisteIkkeHenlagteBehandling(fagsak)?.behandlingId).toBe(2);
    });
});

describe('hentBarnMedLøpendeUtbetaling', () => {
    test('Hent barn med løpende utbetalinger på fagsak', () => {
        const barnFnr = '12345678910';
        const person = {
            fødselsdato: '2020-01-02',
            kjønn: kjønnType.KVINNE,
            målform: Målform.NB,
            navn: 'Mock Mockersen',
            personIdent: barnFnr,
            type: PersonType.BARN,
            harFalskIdentitet: false,
        };

        const fagsak = FagsakTestdata.lagFagsak({
            gjeldendeUtbetalingsperioder: [
                {
                    periodeFom: '2020-01-01',
                    periodeTom: '2020-12-31',
                    vedtaksperiodetype: Vedtaksperiodetype.UTBETALING,
                    utbetalingsperiodeDetaljer: [
                        {
                            person: {
                                ...person,
                                personIdent: '12345678911',
                            },
                            ytelseType: YtelseType.ORDINÆR_BARNETRYGD,
                            utbetaltPerMnd: 1054,
                            erPåvirketAvEndring: false,
                        },
                    ],
                    ytelseTyper: [YtelseType.ORDINÆR_BARNETRYGD],
                    antallBarn: 1,
                    utbetaltPerMnd: 1054,
                },
                {
                    periodeFom: '2021-01-01',
                    periodeTom: dateTilIsoDatoString(addYears(dagensDato, 1)),
                    vedtaksperiodetype: Vedtaksperiodetype.UTBETALING,
                    utbetalingsperiodeDetaljer: [
                        {
                            person,
                            ytelseType: YtelseType.ORDINÆR_BARNETRYGD,
                            utbetaltPerMnd: 1054,
                            erPåvirketAvEndring: false,
                        },
                    ],
                    ytelseTyper: [YtelseType.ORDINÆR_BARNETRYGD],
                    antallBarn: 1,
                    utbetaltPerMnd: 1054,
                },
            ],
        });

        const barnMedLøpendeUtbetaling = hentBarnMedLøpendeUtbetaling(fagsak);

        expect(barnMedLøpendeUtbetaling.size).toBe(1);
        expect(barnMedLøpendeUtbetaling.has(barnFnr)).toBe(true);
    });
});
