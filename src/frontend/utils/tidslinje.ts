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

            const fomPeriodeSplitterOpp = isoStringTilDate(periodeSomSplitterOpp.stønadFom);
            const tomPeriodeSplitterOpp = isoStringTilDate(periodeSomSplitterOpp.stønadTom);

            const fomPeriodeSomSkalSplittes = isoStringTilDate(periodeSomSkalSplittesOpp.stønadFom);
            const tomPeriodeSomSkalSplittes = isoStringTilDate(periodeSomSkalSplittesOpp.stønadTom);

            const fomPeriodeSplitterOppErInnafor =
                isAfter(startOfMonth(fomPeriodeSplitterOpp), startOfMonth(fomPeriodeSomSkalSplittes)) &&
                isBefore(startOfMonth(fomPeriodeSplitterOpp), endOfMonth(tomPeriodeSomSkalSplittes));

            const tomPeriodeSplitterOppErInnafor =
                isAfter(endOfMonth(tomPeriodeSplitterOpp), startOfMonth(fomPeriodeSomSkalSplittes)) &&
                isBefore(endOfMonth(tomPeriodeSplitterOpp), endOfMonth(tomPeriodeSomSkalSplittes));

            if (fomPeriodeSplitterOppErInnafor && tomPeriodeSplitterOppErInnafor) {
                const førstePeriode: Periode = {
                    ...sisteElement,
                    tom: subDays(startOfMonth(fomPeriodeSplitterOpp), 1),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: startOfMonth(fomPeriodeSplitterOpp),
                    tom: endOfMonth(tomPeriodeSplitterOpp),
                };

                const tredjePeriode: Periode = {
                    ...sisteElement,
                    fom: addDays(endOfMonth(tomPeriodeSplitterOpp), 1),
                };
                return [...acc.splice(0, acc.length - 1), førstePeriode, andrePeriode, tredjePeriode];
            } else if (fomPeriodeSplitterOppErInnafor) {
                const førstePeriode: Periode = {
                    ...sisteElement,
                    tom: subDays(startOfMonth(fomPeriodeSplitterOpp), 1),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: startOfMonth(fomPeriodeSplitterOpp),
                };
                return [...acc.splice(0, acc.length - 1), førstePeriode, andrePeriode];
            } else if (tomPeriodeSplitterOppErInnafor) {
                const førstePeriode: Periode = {
                    ...sisteElement,
                    tom: endOfMonth(tomPeriodeSplitterOpp),
                };

                const andrePeriode: Periode = {
                    ...sisteElement,
                    fom: addDays(endOfMonth(tomPeriodeSplitterOpp), 1),
                };
                return [...acc.splice(0, acc.length - 1), førstePeriode, andrePeriode];
            } else {
                return acc;
            }
        },
        [opprinneligPeriode]
    );
};
