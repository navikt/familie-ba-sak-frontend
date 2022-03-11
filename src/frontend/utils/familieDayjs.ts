import type { ConfigType } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export type Dayjs = dayjs.Dayjs;

const norskTidssone = 'Europe/Oslo';

require('dayjs/locale/nb');
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

export const TIDENES_MORGEN_DAYJS: Dayjs = familieDayjs().subtract(1000, 'year');
export const TIDENES_ENDE_DAYJS: Dayjs = familieDayjs().add(1000, 'year');
export default familieDayjs;
