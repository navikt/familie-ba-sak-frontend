import type { Periode } from '@navikt/familie-tidslinje';

import {
    erEtter,
    hentFørsteDagIYearMonth,
    erFør,
    hentSisteDagIYearMonth,
    kalenderDatoTilDate,
    leggTil,
    KalenderEnhet,
    trekkFra,
} from './kalender';
import type { IYtelsePeriode } from '../typer/beregning';

export const splittYtelseVedEndringerPåAnnenYtelse = (
    opprinneligPeriode: Periode,
    periodeSomSkalSplittesOpp: IYtelsePeriode,
    perioderSomSplitterOpp: IYtelsePeriode[]
): Periode[] => {
    return perioderSomSplitterOpp.reduce(
        (acc, periodeSomSplitterOpp) => {
            const sisteElement: Periode = acc[acc.length - 1];

            const småFom = periodeSomSplitterOpp.stønadFom;
            const småTom = periodeSomSplitterOpp.stønadTom;

            const småFomErInnafor =
                erEtter(
                    hentFørsteDagIYearMonth(småFom),
                    hentFørsteDagIYearMonth(periodeSomSkalSplittesOpp.stønadFom)
                ) &&
                erFør(
                    hentFørsteDagIYearMonth(småFom),
                    hentSisteDagIYearMonth(periodeSomSkalSplittesOpp.stønadTom)
                );

            const småTomErInnafor =
                erEtter(
                    hentSisteDagIYearMonth(småTom),
                    hentFørsteDagIYearMonth(periodeSomSkalSplittesOpp.stønadFom)
                ) &&
                erFør(
                    hentSisteDagIYearMonth(småTom),
                    hentSisteDagIYearMonth(periodeSomSkalSplittesOpp.stønadTom)
                );

            if (småFomErInnafor && småTomErInnafor) {
                const førstePeriode: Periode = {
                    ...sisteElement,
                    tom: kalenderDatoTilDate(
                        trekkFra(hentFørsteDagIYearMonth(småFom), 1, KalenderEnhet.DAG)
                    ),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: kalenderDatoTilDate(hentFørsteDagIYearMonth(småFom)),
                    tom: kalenderDatoTilDate(hentSisteDagIYearMonth(småTom)),
                };

                const tredjePeriode: Periode = {
                    ...sisteElement,
                    fom: kalenderDatoTilDate(
                        leggTil(hentSisteDagIYearMonth(småTom), 1, KalenderEnhet.DAG)
                    ),
                };
                return [
                    ...acc.splice(0, acc.length - 1),
                    førstePeriode,
                    andrePeriode,
                    tredjePeriode,
                ];
            } else if (småFomErInnafor) {
                const førstePeriode: Periode = {
                    ...sisteElement,
                    tom: kalenderDatoTilDate(
                        trekkFra(hentFørsteDagIYearMonth(småFom), 1, KalenderEnhet.DAG)
                    ),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: kalenderDatoTilDate(hentFørsteDagIYearMonth(småFom)),
                };
                return [...acc.splice(0, acc.length - 1), førstePeriode, andrePeriode];
            } else if (småTomErInnafor) {
                const førstePeriode: Periode = {
                    ...sisteElement,
                    tom: kalenderDatoTilDate(hentSisteDagIYearMonth(småTom)),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: kalenderDatoTilDate(
                        leggTil(hentSisteDagIYearMonth(småTom), 1, KalenderEnhet.DAG)
                    ),
                };
                return [...acc.splice(0, acc.length - 1), førstePeriode, andrePeriode];
            } else {
                return acc;
            }
        },
        [opprinneligPeriode]
    );
};
