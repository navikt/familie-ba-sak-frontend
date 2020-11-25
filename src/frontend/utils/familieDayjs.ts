import dayjs, { ConfigType } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat';

export type Dayjs = dayjs.Dayjs;

const norskTidssone = 'Europe/Oslo';

require('dayjs/locale/nb');
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);

dayjs.tz.setDefault(norskTidssone);
dayjs.locale('nb');

const familieDayjs = (config?: ConfigType, format?: string): Dayjs => {
    if (config && format) {
        return dayjs.tz(config, format, norskTidssone);
    }
    return config ? dayjs.tz(config) : dayjs.tz(dayjs());
};

export default familieDayjs;
