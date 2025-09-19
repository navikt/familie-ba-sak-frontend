import type { SortState } from '@navikt/ds-react';

export enum Sorteringsrekkefølge {
    STIGENDE = 'ascending',
    SYNKENDE = 'descending',
    INGEN_SORTERING = '',
}

export const hentSortState = (sortering: Sorteringsrekkefølge, sortKey: string): SortState | undefined =>
    sortering === Sorteringsrekkefølge.INGEN_SORTERING
        ? undefined
        : {
              orderBy: sortKey,
              direction: sortering === Sorteringsrekkefølge.STIGENDE ? 'ascending' : 'descending',
          };

export const hentNesteSorteringsrekkefølge = (forrigeSorteringsrekkefølge: string): Sorteringsrekkefølge => {
    switch (forrigeSorteringsrekkefølge) {
        case undefined:
            return Sorteringsrekkefølge.STIGENDE;
        case 'ascending':
            return Sorteringsrekkefølge.SYNKENDE;
        case 'descending':
        default:
            return Sorteringsrekkefølge.INGEN_SORTERING;
    }
};
