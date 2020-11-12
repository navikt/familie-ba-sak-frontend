import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import {
    defaultValidator,
    Felt,
    FeltState,
    NavBaseSkjemaProps,
    NavInputProps,
    ValiderFelt,
    Valideringscontext,
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

    const validerOgSettFelt = (
        verdi: Verdi = feltState.verdi,
        valideringscontext?: Valideringscontext
    ) => {
        settFeltState(
            feltState.valider(
                {
                    ...feltState,
                    verdi: verdi,
                },
                valideringscontext
            )
        );
    };

    const onChange = useCallback(
        (verdi: Verdi | ChangeEvent) => {
            const normalisertVerdi = isChangeEvent(verdi) ? verdi.target.value : verdi;

            validerOgSettFelt(normalisertVerdi as Verdi);
        },
        [validerOgSettFelt, settFeltState]
    );

    const onBlur = useCallback(() => {
        if (feltState.valideringsstatus !== Valideringsstatus.IKKE_VALIDERT) {
            return;
        }

        validerOgSettFelt();
    }, [validerOgSettFelt, feltState.valideringsstatus]);

    const hentNavInputProps = useCallback(
        (visFeilmelding: boolean): NavInputProps<Verdi> => ({
            id: '',
            name: '',
            feil: visFeilmelding ? feltState.feilmelding : undefined,
            value: feltState.verdi,
            onChange,
            onBlur,
        }),
        [validerOgSettFelt, settFeltState]
    );

    const hentNavRadiogruppeProps = useCallback(
        (visFeilmelding: boolean): NavBaseSkjemaProps<Verdi> => ({
            id: '',
            name: '',
            feil: visFeilmelding ? feltState.feilmelding : undefined,
            value: feltState.verdi,
            onBlur,
        }),
        [validerOgSettFelt, settFeltState]
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
            onBlur,
            onChange,
            validerOgSettFelt,
        }),
        [feltState, hentNavInputProps, validerOgSettFelt, nullstill, onChange]
    );
}
