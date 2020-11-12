import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
    defaultValidator,
    Felt,
    FeltState,
    NavBaseSkjemaProps,
    NavInputProps,
    ValiderFelt,
    Valideringsstatus,
} from './typer';
import { isChangeEvent } from './utils';

export interface FeltConfig<Verdi> {
    verdi: Verdi;
    valideringsfunksjon?: ValiderFelt<Verdi>;
}

export function useFelt<Verdi = string>(feltConfig: FeltConfig<Verdi>): Felt<Verdi> {
    const [feltState, settFeltState] = useState<FeltState<Verdi>>({
        feilmelding: '',
        valider: feltConfig.valideringsfunksjon ? feltConfig.valideringsfunksjon : defaultValidator,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi: feltConfig.verdi,
    });

    const kjørValidering = (verdi: Verdi = feltState.verdi) => {
        settFeltState(
            feltState.valider({
                ...feltState,
                verdi: verdi,
            })
        );
    };

    useEffect(() => {
        kjørValidering();
    }, []);

    const onChange = useCallback(
        (verdi: Verdi | ChangeEvent) => {
            const normalisertVerdi = isChangeEvent(verdi) ? verdi.target.value : verdi;

            kjørValidering(normalisertVerdi as Verdi);
        },
        [kjørValidering, settFeltState]
    );

    const hentNavInputProps = useCallback(
        (visFeilmelding: boolean): NavInputProps<Verdi> => ({
            id: '',
            name: '',
            feil: visFeilmelding ? feltState.feilmelding : undefined,
            value: feltState.verdi,
            onChange,
        }),
        [kjørValidering, settFeltState]
    );

    const hentNavRadiogruppeProps = useCallback(
        (visFeilmelding: boolean): NavBaseSkjemaProps<Verdi> => ({
            id: '',
            name: '',
            feil: visFeilmelding ? feltState.feilmelding : undefined,
            value: feltState.verdi,
        }),
        [kjørValidering, settFeltState]
    );

    const nullstill = () => {
        settFeltState(
            feltState.valider({
                ...feltState,
                verdi: feltConfig.verdi,
            })
        );
    };

    return useMemo(
        () => ({
            ...feltState,
            hentNavInputProps,
            hentNavRadiogruppeProps,
            nullstill,
            onChange,
        }),
        [feltState, hentNavInputProps, nullstill, onChange]
    );
}
