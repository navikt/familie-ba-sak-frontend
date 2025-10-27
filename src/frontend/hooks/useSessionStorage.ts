import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export enum Key {
    ER_HØYREMENY_ÅPEN = 'erHøyremenyÅpen',
    ER_VENSTREMENY_ÅPEN = 'erVenstremenyÅpen',
}

type SessionStorageItem = string | null;

function deserialize<T>(value: SessionStorageItem, fallbackValue: T): T {
    if (value === null) {
        return fallbackValue;
    }
    try {
        return JSON.parse(value) as T;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return fallbackValue;
    }
}

export function useSessionStorage<T>(key: Key, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState(() => readValue());

    function readValue(): T {
        try {
            const item = window.sessionStorage.getItem(key) as SessionStorageItem;
            return deserialize(item, initialValue);
        } catch (error) {
            console.error(`Error reading sessionStorage key “${key}”:`, error);
            return initialValue;
        }
    }

    function setValue(value: T | ((previousValue: T) => T)) {
        try {
            const previousValue = readValue();
            const newValue = value instanceof Function ? value(previousValue) : value;
            window.sessionStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue);
            // We dispatch a custom event so every similar useSessionStorage hook is notified
            window.dispatchEvent(new StorageEvent('storage', { key }));
        } catch (error) {
            console.error(`Error setting sessionStorage key “${key}”:`, error);
        }
    }

    useEffect(() => {
        function handleStorageChange(event: StorageEvent) {
            if (event.key !== key) {
                return;
            }
            setStoredValue(readValue());
        }

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return [storedValue, setValue];
}
