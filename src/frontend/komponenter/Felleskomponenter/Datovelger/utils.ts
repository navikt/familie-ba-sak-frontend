import { startOfDay } from 'date-fns';

export const tidligsteRelevanteDato = () => startOfDay(new Date(1900, 0));

export const senesteRelevanteDato = () => startOfDay(new Date(2500, 0));

export enum Feilmelding {
    UGYDLIG_DATO = 'UGYDLIG_DATO',
    FØR_MIN_DATO = 'FØR_MIN_DATO',
    ETTER_MAKS_DATO = 'ETTER_MAKS_DATO',
}
