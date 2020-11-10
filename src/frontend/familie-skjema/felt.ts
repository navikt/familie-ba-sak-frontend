import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { defaultValidator, Felt, FeltState, ValiderFelt, Valideringsstatus } from './typer';
import { isChangeEvent } from './utils';

export interface FeltConfig<Verdi> {
    verdi: Verdi;
    valideringsfunksjon?: ValiderFelt<Verdi>;
}

export function useFelt<Verdi = string>(
    feltConfig: FeltConfig<Verdi>,
    avhengigheter: unknown[] = []
): Felt<Verdi> {
    const [feltState, settFeltState] = useState<FeltState<Verdi>>({
        feilmelding: '',
        valider: feltConfig.valideringsfunksjon ? feltConfig.valideringsfunksjon : defaultValidator,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi: feltConfig.verdi,
    });

    const kjørValidering = (verdi: Verdi = feltState.verdi) => {
        settFeltState(
            feltState.valider(
                {
                    ...feltState,
                    verdi,
                },
                avhengigheter
            )
        );
    };

    const onChange = useCallback(
        (value: Verdi | ChangeEvent) => {
            const normalisertVerdi = isChangeEvent(value) ? value.target.value : value;

            kjørValidering(normalisertVerdi as Verdi);
        },
        [kjørValidering, feltState.feilmelding, settFeltState]
    );

    const nullstill = () => {
        settFeltState(
            feltState.valider(
                {
                    ...feltState,
                    verdi: feltConfig.verdi,
                },
                avhengigheter
            )
        );
    };

    const hentFeilmelding = () => {
        return felt.feilmelding;
    };

    const felt = useMemo(() => {
        return {
            ...feltState,
            hentFeilmelding,
            kjørValidering,
            nullstill,
            onChange,
        };
    }, [feltState, hentFeilmelding, onChange, kjørValidering, nullstill]);

    return felt as Felt<Verdi>;
}

export const ok = <T>(felt: FeltState<T>): FeltState<T> => {
    return {
        ...felt,
        feilmelding: '',
        valideringsstatus: Valideringsstatus.OK,
    };
};

export const feil = <T>(felt: FeltState<T>, feilmelding: string): FeltState<T> => {
    return {
        ...felt,
        feilmelding,
        valideringsstatus: Valideringsstatus.FEIL,
    };
};
