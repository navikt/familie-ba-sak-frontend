import { addDays, endOfMonth, isAfter, isBefore, startOfMonth, subDays } from 'date-fns';

import type { Periode } from '@navikt/familie-tidslinje';

import { isoStringTilDate } from './dato';
import type { IYtelsePeriode } from '../typer/beregning';

export const splittYtelseVedEndringerPåAnnenYtelse = (
    opprinneligPeriode: Periode,
    periodeSomSkalSplittesOpp: IYtelsePeriode,
    perioderSomSplitterOpp: IYtelsePeriode[]
): Periode[] => {
    return perioderSomSplitterOpp.reduce(
        (acc, periodeSomSplitterOpp) => {
            const sisteElement: Periode = acc[acc.length - 1];

            const småFom = isoStringTilDate(periodeSomSplitterOpp.stønadFom);
            const småTom = isoStringTilDate(periodeSomSplitterOpp.stønadTom);

            const periodeSomSkalSplittesFom = isoStringTilDate(periodeSomSkalSplittesOpp.stønadFom);
            const periodeSomSkalSplittesTom = isoStringTilDate(periodeSomSkalSplittesOpp.stønadTom);

            const småFomErInnafor =
                isAfter(startOfMonth(småFom), startOfMonth(periodeSomSkalSplittesFom)) &&
                isBefore(startOfMonth(småFom), endOfMonth(periodeSomSkalSplittesTom));

            const småTomErInnafor =
                isAfter(endOfMonth(småTom), startOfMonth(periodeSomSkalSplittesFom)) &&
                isBefore(endOfMonth(småTom), endOfMonth(periodeSomSkalSplittesTom));

            if (småFomErInnafor && småTomErInnafor) {
                const førstePeriode: Periode = {
                    ...sisteElement,
                    tom: subDays(startOfMonth(småFom), 1),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: startOfMonth(småFom),
                    tom: endOfMonth(småTom),
                };

                const tredjePeriode: Periode = {
                    ...sisteElement,
                    fom: addDays(endOfMonth(småTom), 1),
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
                    tom: subDays(startOfMonth(småFom), 1),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: startOfMonth(småFom),
                };
                return [...acc.splice(0, acc.length - 1), førstePeriode, andrePeriode];
            } else if (småTomErInnafor) {
                const førstePeriode: Periode = {
                    ...sisteElement,
                    tom: endOfMonth(småTom),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: addDays(endOfMonth(småTom), 1),
                };
                return [...acc.splice(0, acc.length - 1), førstePeriode, andrePeriode];
            } else {
                return acc;
            }
        },
        [opprinneligPeriode]
    );
};
