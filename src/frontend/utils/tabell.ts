import type { SortState } from '@navikt/ds-react';

export enum Sorteringsrekkefølge {
    STIGENDE,
    SYNKENDE,
    INGEN_SORTERING,
}

export const hentSortState = (
    sortering: Sorteringsrekkefølge,
    sortKey: string
): SortState | undefined =>
    sortering === Sorteringsrekkefølge.INGEN_SORTERING
        ? undefined
        : {
              orderBy: sortKey,
              direction: sortering === Sorteringsrekkefølge.STIGENDE ? 'ascending' : 'descending',
          };
