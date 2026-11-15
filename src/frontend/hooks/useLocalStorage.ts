import type { OppgavefilterField } from '@sider/Oppgavebenk/form/useOppgavefilterForm';

export const LocalStorageKeyFactory = {
    oppgavefilter: (field: OppgavefilterField) => `nav.barnetrygd.oppgavefilter.${field}` as const,
};

export type LocalStorageKey = ReturnType<(typeof LocalStorageKeyFactory)[keyof typeof LocalStorageKeyFactory]>;

export interface LocalStorage {
    get: (key: LocalStorageKey) => string | null;
    set: (key: LocalStorageKey, value: string) => void;
    remove: (key: LocalStorageKey) => void;
}

const localStorageFunctions: LocalStorage = {
    get: key => localStorage.getItem(key),
    set: (key, value) => localStorage.setItem(key, value),
    remove: key => localStorage.removeItem(key),
};

export function useLocalStorage(): LocalStorage {
    return localStorageFunctions;
}
