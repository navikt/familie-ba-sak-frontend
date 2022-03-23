import { v4 as uuidv4 } from 'uuid';

import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, RessursStatus } from '@navikt/familie-typer';

import type { IPersonInfo } from '../typer/person';

export const randomUUID = (): string => {
    return uuidv4();
};

export const fjernWhitespace = (streng: string) =>
    streng.replace(/\s/g, '').replace(/[ \u0085]/g, '');

export const tilFeilside = (): void => {
    window.location.assign(window.location.protocol + '//' + window.location.host + '/error');
};

export const sjekkTilgangTilPerson = (personRes: Ressurs<IPersonInfo>): Ressurs<IPersonInfo> => {
    if (personRes.status === RessursStatus.SUKSESS && personRes.data.harTilgang === false) {
        return byggFeiletRessurs('Du har ikke tilgang til denne brukeren.');
    } else {
        return personRes;
    }
};

// Skamløst knabba herfra https://gist.github.com/zachlysobey/71ac85046d0d533287ed85e1caa64660
export function partition<T>(predicate: (val: T) => boolean, arr: Array<T>): [Array<T>, Array<T>] {
    const partitioned: [Array<T>, Array<T>] = [[], []];
    arr.forEach((val: T) => {
        const partitionIndex: 0 | 1 = predicate(val) ? 0 : 1;
        partitioned[partitionIndex].push(val);
    });
    return partitioned;
}
