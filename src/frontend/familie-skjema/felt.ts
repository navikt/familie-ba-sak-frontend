import { ChangeEvent, useEffect, useState } from 'react';
import {
    defaultValidator,
    Felt,
    FeltState,
    NavInputProps,
    ValiderFelt,
    Valideringsstatus,
} from './typer';
import { isChangeEvent } from './utils';

export interface FeltConfig<Value> {
    value: Value;
    valideringsfunksjon?: ValiderFelt<Value>;
}

export function useFelt<Value = string>(feltConfig: FeltConfig<Value>): Felt<Value> {
    const [feltState, settFeltState] = useState<FeltState<Value>>({
        feilmelding: '',
        valider: feltConfig.valideringsfunksjon ? feltConfig.valideringsfunksjon : defaultValidator,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        value: feltConfig.value,
    });

    const kjørValidering = (value: Value = feltState.value) => {
        settFeltState(
            feltState.valider({
                ...feltState,
                value,
            })
        );
    };

    useEffect(() => {
        kjørValidering();
    }, []);

    const onChange = (value: Value | ChangeEvent) => {
        const normalisertVerdi = isChangeEvent(value) ? value.target.value : value;

        kjørValidering(normalisertVerdi as Value);
    };

    const hentNavInputProps = (visFeilmelding: boolean): NavInputProps<Value> => ({
        id: '',
        name: '',
        feil: visFeilmelding ? feltState.feilmelding : undefined,
        value: feltState.value,
        onChange,
    });

    const nullstill = () => {
        settFeltState(
            feltState.valider({
                ...feltState,
                value: feltConfig.value,
            })
        );
    };

    return {
        ...feltState,
        hentNavInputProps,
        nullstill,
        onChange,
    };
}
