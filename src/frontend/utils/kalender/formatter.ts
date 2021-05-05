import { DagMånedÅr } from './typer';
import { capString } from './utils';

export const tilVisning = (dagMånedÅr: DagMånedÅr) => {
    return `${capString(2, dagMånedÅr.dag)}.${capString(2, dagMånedÅr.måned)}.${capString(
        4,
        dagMånedÅr.år
    )}`;
};
