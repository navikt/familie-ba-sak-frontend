import {
    kalenderDato,
    leggTil,
    serializeIso8601String,
    erEtter,
    KalenderEnhet,
    kalenderDiffMåned,
} from './kalender';
import type { ISimuleringPeriode } from '../typer/simulering';

export const hentPeriodelisteMedTommePerioder = (
    perioder: ISimuleringPeriode[]
): ISimuleringPeriode[] => {
    const fomDatoerISimulering = hentSorterteFomdatoer(perioder);
    const førstePeriodeFom = kalenderDato(fomDatoerISimulering[0]);
    const antallMånederISimulering = hentAntallMånederISimuleringen(fomDatoerISimulering);

    const periodelisteMedTommePerioder = [...perioder];

    for (let i = 0; i < antallMånederISimulering; i++) {
        const aktuellPeriodeFomDato = leggTil(førstePeriodeFom, i, KalenderEnhet.MÅNED);
        const aktuelPeriodeFom = serializeIso8601String(aktuellPeriodeFomDato);

        if (!fomDatoerISimulering.includes(aktuelPeriodeFom)) {
            periodelisteMedTommePerioder.push({
                fom: aktuelPeriodeFom,
                tom: '',
            });
        }
    }

    periodelisteMedTommePerioder.sort((a, b) =>
        erEtter(kalenderDato(a.fom), kalenderDato(b.fom)) ? 1 : -1
    );
    return periodelisteMedTommePerioder;
};

export const hentÅrISimuleringen = (perioder: ISimuleringPeriode[]): number[] =>
    [...new Set(perioder.map(periode => kalenderDato(periode.fom).år))].sort();

const hentSorterteFomdatoer = (perioder: ISimuleringPeriode[]): string[] =>
    perioder
        .map(periode => periode.fom)
        .sort((a, b) => (erEtter(kalenderDato(a), kalenderDato(b)) ? 1 : -1));

const hentAntallMånederISimuleringen = (fomListe: string[]): number => {
    const førstePeriodeFom = kalenderDato(fomListe[0]);
    const sistePeriodeFom = kalenderDato(fomListe[fomListe.length - 1]);

    return kalenderDiffMåned(førstePeriodeFom, sistePeriodeFom) + 1;
};
