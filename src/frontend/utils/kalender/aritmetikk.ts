import {
    DagMånedÅr,
    KalenderEnhet,
    kalenderDatoTilDate,
    kalenderDatoFraDate,
    antallDagerIMåned,
    mod,
} from '.';

export const leggTil = (
    dagMånedÅr: DagMånedÅr,
    antall: number,
    enhet: KalenderEnhet
): DagMånedÅr => {
    const date = kalenderDatoTilDate(dagMånedÅr);

    switch (enhet) {
        case KalenderEnhet.DAG:
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

export const dagVedEndringPåÅr = (dagMånedÅr: DagMånedÅr, nyttÅr: number) => {
    const antallDagerIMånedINyttÅr = antallDagerIMåned({ år: nyttÅr, måned: dagMånedÅr.måned });
    if (antallDagerIMånedINyttÅr <= dagMånedÅr.dag) {
        return antallDagerIMånedINyttÅr;
    } else {
        return dagMånedÅr.dag;
    }
};
