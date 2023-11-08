import { addMonths, differenceInCalendarMonths, isAfter } from 'date-fns';

import { formatterDateTilIsoString, parseIsoString } from './dato';
import { kalenderDato } from './kalender';
import type { ISimuleringPeriode } from '../typer/simulering';

export const hentPeriodelisteMedTommePerioder = (
    perioder: ISimuleringPeriode[]
): ISimuleringPeriode[] => {
    const fomDatoerISimulering = hentSorterteFomdatoer(perioder);
    const førstePeriodeFom = fomDatoerISimulering[0];
    const antallMånederISimulering = hentAntallMånederISimuleringen(fomDatoerISimulering);

    const periodelisteMedTommePerioder = [...perioder];

    for (let i = 0; i < antallMånederISimulering; i++) {
        const aktuelPeriodeFom = addMonths(førstePeriodeFom, i);

        if (!fomDatoerISimulering.includes(aktuelPeriodeFom)) {
            periodelisteMedTommePerioder.push({
                fom: formatterDateTilIsoString(aktuelPeriodeFom),
                tom: '',
            });
        }
    }

    periodelisteMedTommePerioder.sort((a, b) =>
        isAfter(parseIsoString(a.fom), parseIsoString(b.fom)) ? 1 : -1
    );
    return periodelisteMedTommePerioder;
};

export const hentÅrISimuleringen = (perioder: ISimuleringPeriode[]): number[] =>
    [...new Set(perioder.map(periode => kalenderDato(periode.fom).år))].sort();

const hentSorterteFomdatoer = (perioder: ISimuleringPeriode[]): Date[] =>
    perioder.map(periode => parseIsoString(periode.fom)).sort((a, b) => (isAfter(a, b) ? 1 : -1));

const hentAntallMånederISimuleringen = (fomListe: Date[]): number => {
    const førstePeriodeFom = fomListe[0];
    const sistePeriodeFom = fomListe[fomListe.length - 1];

    return differenceInCalendarMonths(førstePeriodeFom, sistePeriodeFom) + 1;
};
