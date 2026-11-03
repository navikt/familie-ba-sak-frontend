import { useState } from 'react';

function areArraysEqual<T>(a: readonly T[], b: readonly T[]) {
    return a.length === b.length && a.every((element, index) => element === b[index]);
}

// Gir samme referanse så lenge innholdet er likt, slik at useMemo virker selv om listen lages på nytt ved hver rendring
export function useStableArray<T>(array: readonly T[]): readonly T[] {
    const [stableArray, setStableArray] = useState(array);

    if (stableArray !== array && !areArraysEqual(stableArray, array)) {
        setStableArray(array);
        return array;
    }

    return stableArray;
}
