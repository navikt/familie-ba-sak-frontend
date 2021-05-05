import { DagMånedÅr } from './typer';
import { capString } from './utils';

export const tilVisning = (dagMånedÅr: DagMånedÅr) => {
    return `${capString(dagMånedÅr.dag, 2)}.${capString(dagMånedÅr.måned, 2)}.${capString(
        dagMånedÅr.år,
        4
    )}`;
};
