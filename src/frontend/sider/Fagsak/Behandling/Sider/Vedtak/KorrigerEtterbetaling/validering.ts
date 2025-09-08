import { KorrigertEtterbetalingÅrsak } from '../../../../../../typer/vedtak';
import { erLik0, erPositivtHeltall } from '../../../../../../utils/validators';

export const erÅrsakForKorrigeringGyldig = (årsak: string) => {
    return Object.keys(KorrigertEtterbetalingÅrsak).some(aarsak => aarsak === årsak)
        ? true
        : 'Ugyldig årsak';
};

export const erEtterbetalingsbeløpGyldig = (beløp: string) => {
    return erPositivtHeltall(beløp) || erLik0(beløp)
        ? true
        : 'Skriv inn etterbetalingsbeløp. Desimaltall støttes ikke.';
};
