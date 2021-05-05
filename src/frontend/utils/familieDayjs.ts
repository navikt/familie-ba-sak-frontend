import dayjs, { ConfigType, OpUnitType, QUnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { datoformat } from './formatter';
import { FamilieIsoDate, YearMonth } from './kalender';

export type Dayjs = dayjs.Dayjs;

const norskTidssone = 'Europe/Oslo';

require('dayjs/locale/nb');
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

dayjs.tz.setDefault(norskTidssone);
dayjs.locale('nb');

const familieDayjs = (config?: ConfigType, format?: string): Dayjs => {
    if (config && format) {
        return dayjs(config, format).tz();
    }
    return config ? dayjs(config).tz() : dayjs().tz();
};

// Obs! Enhet velger kun størrelse på intervaller man sammenligner, og ikke ulikhet på enhet.
// Det vil si at 17.05.1814 og 01.06.1814 vil få 0 i diff, selv om de ikke er i samme måned. Se tester for eksempler.
export const familieDayjsDiff = (
    første: Dayjs,
    andre: Dayjs,
    unit?: QUnitType | OpUnitType
): number => {
    return første.utc().diff(andre.utc(), unit);
};

export const hentFørsteDagIYearMonth = (yearMonth: YearMonth) => {
    return familieDayjs(yearMonth, datoformat.ISO_MÅNED).startOf('month');
};

export const hentSisteDagIYearMonth = (yearMonth: YearMonth) => {
    return familieDayjs(yearMonth, datoformat.ISO_MÅNED).endOf('month');
};

export const periodeOverlapperMedValgtDato = (
    periodeFom: FamilieIsoDate,
    periodeTom: FamilieIsoDate,
    valgtDato: Date
) => {
    const valgtDatoToDayjs = familieDayjs(valgtDato.toISOString()).startOf('day');
    const periodeFomToDayjs = familieDayjs(periodeFom).startOf('day');
    const periodeTomToDayjs = familieDayjs(periodeTom).startOf('day');

    return (
        valgtDatoToDayjs.isBetween(periodeFomToDayjs, periodeTomToDayjs, 'date') ||
        valgtDatoToDayjs.isSame(periodeFomToDayjs, 'date') ||
        valgtDatoToDayjs.isSame(periodeTomToDayjs, 'date')
    );
};

export const TIDENES_MORGEN_DAYJS: Dayjs = familieDayjs().subtract(1000, 'year');
export const TIDENES_ENDE_DAYJS: Dayjs = familieDayjs().add(1000, 'year');
export default familieDayjs;
