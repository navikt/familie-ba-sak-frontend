import type { FeltState } from '@navikt/familie-skjema';

export interface Fritekster {
    [key: string]: FeltState<string>;
}
