import { format, isValid, startOfDay, startOfToday } from 'date-fns';

import { Datoformat } from './formatter';

export const tidenesMorgen = () => startOfDay(new Date(1000, 0));

export const tidenesEnde = () => startOfDay(new Date(3000, 0));

export const dagensDato = () => startOfToday();

export const formatterDateTilIsoString = (dato?: Date): string =>
    dato && isValid(dato) ? format(dato, Datoformat.ISO_DAG) : '';
