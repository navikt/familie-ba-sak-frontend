import { LocalStorageKeyFactory } from '@utils/localStorage';

import { OppgavefilterField } from './useOppgavefilterForm';

const GAMMEL_LOCAL_STORAGE_NØKKEL = 'oppgaveFeltVerdier';

// Strengnøkler i stedet for OppgavefilterField, siden enumen ikke er initialisert ennå ved sirkulær import.
const gamleFeltnavn: Record<`${OppgavefilterField}`, string> = {
    registrertDato: 'opprettetTidspunkt',
    oppgavetype: 'oppgavetype',
    behandlingstema: 'behandlingstema',
    behandlingstype: 'behandlingstype',
    frist: 'fristFerdigstillelse',
    enhet: 'tildeltEnhetsnr',
    saksbehandler: 'tilordnetRessurs',
};

/**
 * Midlertidig: søkeparametere som bare ble brukt av det gamle filterskjemaet, og som skal fjernes fra URL-en.
 * Kan fjernes etter en måned eller to.
 */
export const GAMLE_SØKEPARAMETERE = [
    'opprettetTidspunkt',
    'fristFerdigstillelse',
    'tildeltEnhetsnr',
    'tilordnetRessurs',
] as const;

/**
 * Midlertidig: oversetter søkeparametere fra det gamle filterskjemaet til nye nøkler. Nye nøkler beholdes dersom
 * begge variantene finnes. Kan fjernes etter en måned eller to.
 */
export function migrerGamleSøkeparametere(searchParams: URLSearchParams): URLSearchParams {
    const migrerteSøkeparametere = new URLSearchParams(searchParams);
    for (const field of Object.values(OppgavefilterField)) {
        const gammelVerdi = searchParams.get(gamleFeltnavn[field]);
        if (gammelVerdi !== null && !searchParams.has(field)) {
            migrerteSøkeparametere.set(field, gammelVerdi);
        }
    }
    return migrerteSøkeparametere;
}

/**
 * Midlertidig: flytter filterverdier lagret av det gamle filterskjemaet over til nye nøkler.
 * Kan fjernes etter en måned eller to.
 */
export function migrerGamleFilterverdier() {
    const gammelVerdi = localStorage.getItem(GAMMEL_LOCAL_STORAGE_NØKKEL);
    if (gammelVerdi === null) {
        return;
    }
    try {
        const gamleFilterverdier: Record<string, unknown> = JSON.parse(gammelVerdi) ?? {};
        for (const field of Object.values(OppgavefilterField)) {
            const key = LocalStorageKeyFactory.oppgavefilter(field);
            const value = gamleFilterverdier[gamleFeltnavn[field]];
            if (typeof value === 'string' && localStorage.getItem(key) === null) {
                localStorage.setItem(key, value);
            }
        }
    } catch {
        // Ugyldig JSON i gammel lagring – ingenting å migrere.
    }
    localStorage.removeItem(GAMMEL_LOCAL_STORAGE_NØKKEL);
}
