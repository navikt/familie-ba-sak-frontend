import { startOfDay } from 'date-fns';

export const tidligsteRelevanteDato = startOfDay(new Date(1900, 0));

export const senesteRelevanteDato = startOfDay(new Date(2500, 0));
