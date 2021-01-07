import dayjs, { ConfigType, OpUnitType, QUnitType } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export type Dayjs = dayjs.Dayjs;

const norskTidssone = 'Europe/Oslo';

require('dayjs/locale/nb');
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

dayjs.tz.setDefault(norskTidssone);
dayjs.locale('nb');

const familieDayjs = (config?: ConfigType, format?: string): Dayjs => {
    if (config && format) {
        return dayjs.tz(config, format, norskTidssone);
    }
    return config ? dayjs.tz(config) : dayjs.tz(dayjs());
};

export const familieDayjsDiff = (
    første: Dayjs,
    andre: Dayjs,
    unit?: QUnitType | OpUnitType
): number => {
    return første.utc().diff(andre.utc(), unit);
};

export default familieDayjs;
