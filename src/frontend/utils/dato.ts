import { startOfDay, startOfToday } from 'date-fns';

export const tidenesMorgen = () => startOfDay(new Date(1000, 0));

export const tidenesEnde = () => startOfDay(new Date(3000, 0));

export const dagensDato = () => startOfToday();
