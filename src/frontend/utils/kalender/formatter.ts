import { DagMånedÅr } from './typer';
import { capString } from './utils';

// Plusser på 1 måned da dato objektet bruker 0-11 tallrekke for måneder
export const tilVisning = (dagMånedÅr?: DagMånedÅr) => {
    return dagMånedÅr
        ? `${capString(2, dagMånedÅr.dag)}.${capString(2, dagMånedÅr.måned + 1)}.${capString(
              4,
              dagMånedÅr.år
          )}`
        : '';
};
