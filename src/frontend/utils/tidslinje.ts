import type { Periode } from '@navikt/familie-tidslinje';

import type { IYtelsePeriode } from '../typer/beregning';
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

export const splittUtvidetVedEndringerPåSmåbarnstillegg = (
    opprinneligPeriode: Periode,
    utvidetYtelsePeriode: IYtelsePeriode,
    småbarnstilleggAndeler: IYtelsePeriode[]
): Periode[] => {
    return småbarnstilleggAndeler.reduce(
        (acc, ytelsePeriodeSmåbarnstillegg) => {
            const sisteElement: Periode = acc[acc.length - 1];

            const småFom = ytelsePeriodeSmåbarnstillegg.stønadFom;
            const småTom = ytelsePeriodeSmåbarnstillegg.stønadTom;

            const småFomErInnafor =
                erEtter(
                    hentFørsteDagIYearMonth(småFom),
                    hentFørsteDagIYearMonth(utvidetYtelsePeriode.stønadFom)
                ) &&
                erFør(
                    hentFørsteDagIYearMonth(småFom),
                    hentSisteDagIYearMonth(utvidetYtelsePeriode.stønadTom)
                );

            const småTomErInnafor =
                erEtter(
                    hentSisteDagIYearMonth(småTom),
                    hentFørsteDagIYearMonth(utvidetYtelsePeriode.stønadFom)
                ) &&
                erFør(
                    hentSisteDagIYearMonth(småTom),
                    hentSisteDagIYearMonth(utvidetYtelsePeriode.stønadTom)
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
