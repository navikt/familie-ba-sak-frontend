import { format, isValid, startOfToday } from 'date-fns';

import { Datoformat } from './formatter';

export const dagensDato = () => startOfToday();

export const formatterDateTilIsoString = (dato?: Date): string =>
    dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : '';

export const formatterDateTilIsoStringEllerUndefined = (dato?: Date): string | undefined =>
    dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : undefined;
