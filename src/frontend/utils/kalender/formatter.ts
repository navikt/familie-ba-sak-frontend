import type { MånedÅr } from './typer';
import { capString } from './utils';

export const yearMonthTilVisning = (månedÅr?: MånedÅr) => {
    return månedÅr ? `${capString(2, månedÅr.måned + 1)}.${capString(4, månedÅr.år)}` : '';
};
