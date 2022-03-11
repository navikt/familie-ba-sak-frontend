import type { DagMånedÅr } from '.';
import { KalenderEnhet, kalenderDatoTilDate, kalenderDatoFraDate, antallDagerIMåned, mod } from '.';

/**
 * Aritmetikk for kalender er tilnærmet lik logikken for Localdate i kotlin.
 * Det betyr at ved addisjon og subtraksjon på måneder bruker vi ikke fast størrelse på måned.
 *
 * Eksempel:
 * 31.03.20 minus 1 måned -> 29.02.20
 * 01.03.20 minus 1 måned -> 01.02.20
 */

export const leggTil = (
    dagMånedÅr: DagMånedÅr,
    antall: number,
    enhet: KalenderEnhet
): DagMånedÅr => {
    switch (enhet) {
        case KalenderEnhet.DAG:
            const date = kalenderDatoTilDate(dagMånedÅr);
            date.setTime(date.getTime() + antall * 24 * 60 * 60 * 1000);

            return kalenderDatoFraDate(date);
        case KalenderEnhet.MÅNED:
            const nyttÅrVedEndringPåMåned =
                dagMånedÅr.år + Math.floor((dagMånedÅr.måned + antall) / 12);
            const nyMåned = mod(dagMånedÅr.måned + antall, 12);
            return {
                år: nyttÅrVedEndringPåMåned,
                måned: nyMåned,
                dag: dagVedEndringPåÅr(
                    {
                        ...dagMånedÅr,
                        måned: nyMåned,
                    },
                    nyttÅrVedEndringPåMåned
                ),
            };
        case KalenderEnhet.ÅR:
            const nyttÅr = dagMånedÅr.år + antall;
            return {
                ...dagMånedÅr,
                år: nyttÅr,
                dag: dagVedEndringPåÅr(dagMånedÅr, nyttÅr),
            };
    }
};

export const trekkFra = (dagMånedÅr: DagMånedÅr, antall: number, enhet: KalenderEnhet) => {
    const date = kalenderDatoTilDate(dagMånedÅr);

    switch (enhet) {
        case KalenderEnhet.DAG:
            date.setTime(date.getTime() - antall * 24 * 60 * 60 * 1000);
            return kalenderDatoFraDate(date);
        case KalenderEnhet.MÅNED:
            const nyttÅrVedEndringPåMåned =
                dagMånedÅr.år - Math.abs(Math.floor((dagMånedÅr.måned - antall) / 12));
            const nyMåned = mod(dagMånedÅr.måned - antall, 12);
            return {
                år: nyttÅrVedEndringPåMåned,
                måned: nyMåned,
                dag: dagVedEndringPåÅr(
                    {
                        ...dagMånedÅr,
                        måned: nyMåned,
                    },
                    nyttÅrVedEndringPåMåned
                ),
            };
        case KalenderEnhet.ÅR:
            const nyttÅr = dagMånedÅr.år - antall;
            return {
                ...dagMånedÅr,
                år: nyttÅr,
                dag: dagVedEndringPåÅr(dagMånedÅr, nyttÅr),
            };
    }
};

export const kalenderDiff = (første: Date, andre: Date) => {
    return første.getTime() - andre.getTime();
};

export const kalenderDiffMåned = (første: DagMånedÅr, andre: DagMånedÅr) =>
    12 * (andre.år - første.år) + (andre.måned - første.måned);

export const dagVedEndringPåÅr = (dagMånedÅr: DagMånedÅr, nyttÅr: number) => {
    const antallDagerIMånedINyttÅr = antallDagerIMåned({ år: nyttÅr, måned: dagMånedÅr.måned });
    if (antallDagerIMånedINyttÅr < dagMånedÅr.dag) {
        return antallDagerIMånedINyttÅr;
    } else {
        return dagMånedÅr.dag;
    }
};
