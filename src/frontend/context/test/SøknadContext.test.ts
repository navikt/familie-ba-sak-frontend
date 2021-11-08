import { kjønnType } from '@navikt/familie-typer';

import { YtelseType } from '../../typer/beregning';
import { PersonType } from '../../typer/person';
import { Målform } from '../../typer/søknad';
import { Vedtaksperiodetype } from '../../typer/vedtaksperiode';
import {
    kalenderDatoFraDate,
    KalenderEnhet,
    leggTil,
    serializeIso8601String,
} from '../../utils/kalender';
import { mockMinimalFagsak } from '../../utils/test/minimalFagsak/minimalFagsak.mock';
import { hentBarnMedLøpendeUtbetaling } from '../SøknadContext';

describe('SøknadContext', () => {
    test('Hent barn med løpende utbetalinger på fagsak', () => {
        const barnFnr = '12345678910';
        const person = {
            fødselsdato: '2020-01-02',
            kjønn: kjønnType.KVINNE,
            målform: Målform.NB,
            navn: 'Mock Mockersen',
            personIdent: barnFnr,
            type: PersonType.BARN,
        };

        const fagsak = mockMinimalFagsak({
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
                    periodeTom: serializeIso8601String(
                        leggTil(kalenderDatoFraDate(new Date()), 1, KalenderEnhet.ÅR)
                    ),
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
