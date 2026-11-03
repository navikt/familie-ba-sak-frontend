import { useSyncExternalStore } from 'react';

/**
 * UI-konseptene som kan sammenlignes i preprod. Velges med bryteren i headeren eller med `?konsept=<verdi>` i URL-en,
 * og huskes i nettleseren.
 */
export enum Konsept {
    DAGENS = 'dagens',
    KONSEPT_2 = 'konsept-2',
    KONSEPT_3 = 'konsept-3',
}

export const konseptVisningsnavn: Record<Konsept, string> = {
    [Konsept.DAGENS]: 'Dagens',
    [Konsept.KONSEPT_2]: 'Konsept 2',
    [Konsept.KONSEPT_3]: 'Konsept 3',
};

/**
 * Konsept 2 og 3 deler det nye oppsettet (steg øverst, personlinje med handlinger, personkort og vilkårskort).
 * De skiller seg bare i venstremenyen: personer (konsept 2) eller oppgaver (konsept 3).
 */
export function erNyttOppsett(konsept: Konsept) {
    return konsept !== Konsept.DAGENS;
}

export function useErNyttOppsett() {
    return erNyttOppsett(useKonsept());
}

const STANDARDKONSEPT = Konsept.KONSEPT_2;
const NØKKEL = 'ba-sak-frontend.konsept';

const lyttere = new Set<() => void>();

export function erKonsept(verdi: string | null): verdi is Konsept {
    return Object.values(Konsept).includes(verdi as Konsept);
}

function lesKonsept(): Konsept {
    const lagret = window.localStorage.getItem(NØKKEL);
    return erKonsept(lagret) ? lagret : STANDARDKONSEPT;
}

export function settKonsept(konsept: Konsept) {
    window.localStorage.setItem(NØKKEL, konsept);
    for (const lytter of lyttere) {
        lytter();
    }
}

function abonner(lytter: () => void) {
    lyttere.add(lytter);
    window.addEventListener('storage', lytter);
    return () => {
        lyttere.delete(lytter);
        window.removeEventListener('storage', lytter);
    };
}

// En lenke med ?konsept=... skal åpne det konseptet, også for den som ikke har valgt noe før
const konseptFraUrl = new URLSearchParams(window.location.search).get('konsept');
if (erKonsept(konseptFraUrl)) {
    window.localStorage.setItem(NØKKEL, konseptFraUrl);
}

export function useKonsept(): Konsept {
    return useSyncExternalStore(abonner, lesKonsept);
}
