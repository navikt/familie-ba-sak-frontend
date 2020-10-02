import moment from 'moment';

export const periodeOverlapperMedValgtDato = (
    periodeFom: string,
    periodeTom: string,
    valgtDato: Date
) => {
    const valgtDatoToMoment = moment(valgtDato.toDateString());
    return (
        valgtDatoToMoment.isBetween(periodeFom, periodeTom) ||
        valgtDatoToMoment.isSame(periodeFom) ||
        valgtDatoToMoment.isSame(periodeTom)
    );
};
