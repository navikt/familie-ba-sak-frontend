import { ChangeEvent } from 'react';

// eslint-disable-next-line
export function isChangeEvent(value: any): value is ChangeEvent<HTMLInputElement> {
    return (
        typeof value === 'object' &&
        value !== null &&
        Reflect.has(value, 'target') &&
        Reflect.has(value.target, 'value')
    );
}
