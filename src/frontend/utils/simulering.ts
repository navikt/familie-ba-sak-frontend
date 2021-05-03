import dayjs from 'dayjs';

import { ISimuleringPeriode } from '../typer/simulering';
import familieDayjs from './familieDayjs';
import { datoformat } from './formatter';

export const hentPeriodelisteMedTommePerioder = (
    perioder: ISimuleringPeriode[]
): ISimuleringPeriode[] => {
    const fomDatoer = perioder
        .map(periode => periode.fom)
        .sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
    const førstePeriode = fomDatoer[0];
    const sistePeriode = fomDatoer[fomDatoer.length - 1];
    let aktuellPeriode = førstePeriode;
    for (let i = 0; i < dayjs(sistePeriode).diff(dayjs(førstePeriode), 'M'); i++) {
        aktuellPeriode = familieDayjs(aktuellPeriode, datoformat.ISO_DAG)
            .add(1, 'M')
            .format(datoformat.ISO_DAG);
        if (!fomDatoer.includes(aktuellPeriode)) {
            perioder.push({
                fom: aktuellPeriode,
                tom: '',
            });
        }
    }
    perioder.sort((a, b) => (dayjs(a.fom).isAfter(dayjs(b.fom)) ? 1 : -1));
    return perioder;
};

export const hentÅrISimuleringen = (perioder: ISimuleringPeriode[]): number[] =>
    [...new Set(perioder.map(periode => dayjs(periode.fom).year()))].sort();
