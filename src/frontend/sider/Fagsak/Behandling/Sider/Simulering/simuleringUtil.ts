import { formaterBeløp } from '../../../../../utils/formatter';

export const kapitaliserTekst = (tekst: string): string => {
    return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
};

export const formaterBeløpUtenValutakode = (beløp?: number) => (beløp ? formaterBeløp(beløp).slice(0, -3) : '-');
