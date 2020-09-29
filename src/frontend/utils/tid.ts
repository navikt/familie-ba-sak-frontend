import moment from 'moment';

export const periodeOverlapperMedValgtDato = (
    periodeFom: string,
    periodeTom: string,
    valgtDato: Date
) => {
    return (
        moment(valgtDato).isBetween(periodeFom, periodeTom) ||
        moment(valgtDato).isSame(periodeFom) ||
        moment(valgtDato).isSame(periodeFom)
    );
};
