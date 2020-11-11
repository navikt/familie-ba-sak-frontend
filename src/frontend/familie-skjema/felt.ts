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
    verdi: Value;
    valideringsfunksjon?: ValiderFelt<Value>;
}

export function useFelt<Value = string>(feltConfig: FeltConfig<Value>): Felt<Value> {
    const [feltState, settFeltState] = useState<FeltState<Value>>({
        feilmelding: '',
        valider: feltConfig.valideringsfunksjon ? feltConfig.valideringsfunksjon : defaultValidator,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi: feltConfig.verdi,
    });

    const kjørValidering = (value: Value = feltState.verdi) => {
        settFeltState(
            feltState.valider({
                ...feltState,
                verdi: value,
            })
        );
    };

    useEffect(() => {
        kjørValidering();
    }, []);

    const onChange = (verdi: Value | ChangeEvent) => {
        const normalisertVerdi = isChangeEvent(verdi) ? verdi.target.value : verdi;

        kjørValidering(normalisertVerdi as Value);
    };

    const hentNavInputProps = (visFeilmelding: boolean): NavInputProps<Value> => ({
        id: '',
        name: '',
        feil: visFeilmelding ? feltState.feilmelding : undefined,
        value: feltState.verdi,
        onChange,
    });

    const nullstill = () => {
        settFeltState(
            feltState.valider({
                ...feltState,
                verdi: feltConfig.verdi,
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
