import { ChangeEvent, useCallback, useMemo, useState } from 'react';
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

export function useFelt<Value = string>(
    feltConfig: FeltConfig<Value>,
    avhengigheter: unknown[] = []
): Felt<Value> {
    const [feltState, settFeltState] = useState<FeltState<Value>>({
        feilmelding: '',
        valider: feltConfig.valideringsfunksjon ? feltConfig.valideringsfunksjon : defaultValidator,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        value: feltConfig.value,
    });

    const kjørValidering = (value: Value = feltState.value) => {
        settFeltState(
            feltState.valider(
                {
                    ...feltState,
                    value,
                },
                avhengigheter
            )
        );
    };

    const onChange = useCallback(
        (value: Value | ChangeEvent) => {
            const normalisertVerdi = isChangeEvent(value) ? value.target.value : value;

            kjørValidering(normalisertVerdi as Value);
        },
        [kjørValidering, feltState.feilmelding, settFeltState]
    );

    const hentNavInputProps = (visFeilmelding: boolean): NavInputProps<Value> => ({
        id: '',
        name: '',
        feil: visFeilmelding ? feltState.feilmelding : undefined,
        value: feltState.value,
    });

    const nullstill = () => {
        settFeltState(
            feltState.valider(
                {
                    ...feltState,
                    value: feltConfig.value,
                },
                avhengigheter
            )
        );
    };

    const felt = useMemo(() => {
        return {
            ...feltState,
            hentNavInputProps,
            kjørValidering,
            nullstill,
            onChange,
        };
    }, [feltState, hentNavInputProps, onChange, kjørValidering, nullstill]);

    return felt as Felt<Value>;
}
