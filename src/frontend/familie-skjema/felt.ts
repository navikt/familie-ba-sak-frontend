import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
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
    skalSkjules?: (valideringscontext: Valideringscontext) => boolean;
}

export function useFelt<Verdi = string>(
    feltConfig: FeltConfig<Verdi>,
    valideringscontext: Valideringscontext = {}
): Felt<Verdi> {
    const initialFeltState = {
        feilmelding: '',
        valider: feltConfig.valideringsfunksjon ? feltConfig.valideringsfunksjon : defaultValidator,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi: feltConfig.verdi,
    };

    const [feltState, settFeltState] = useState<FeltState<Verdi>>(initialFeltState);
    const [skalRendres, settSkalRendres] = useState(feltConfig.skalSkjules === undefined);

    const nullstill = () => {
        settFeltState(initialFeltState);
    };

    const validerOgSettFelt = (verdi: Verdi = feltState.verdi) => {
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

    useEffect(() => {
        if (feltConfig.skalSkjules) {
            if (feltConfig.skalSkjules(valideringscontext)) {
                if (feltState.valideringsstatus !== Valideringsstatus.IKKE_VALIDERT) {
                    nullstill();
                    settSkalRendres(false);
                }
            } else {
                settSkalRendres(true);
            }
        }
    }, [...Object.values(valideringscontext)]);

    const onChange = useCallback(
        (verdi: Verdi | ChangeEvent) => {
            const normalisertVerdi = isChangeEvent(verdi) ? verdi.target.value : verdi;

            validerOgSettFelt(normalisertVerdi as Verdi);
        },
        [validerOgSettFelt, settFeltState]
    );

    const hentNavInputProps = useCallback(
        (visFeilmelding: boolean): NavInputProps<Verdi> => ({
            feil: visFeilmelding ? feltState.feilmelding : undefined,
            value: feltState.verdi,
            onChange,
        }),
        [validerOgSettFelt, settFeltState]
    );

    const hentNavRadiogruppeProps = useCallback(
        (visFeilmelding: boolean): NavBaseSkjemaProps<Verdi> => ({
            feil: visFeilmelding ? feltState.feilmelding : undefined,
            value: feltState.verdi,
        }),
        [validerOgSettFelt, settFeltState]
    );

    return useMemo(
        () => ({
            ...feltState,
            hentNavInputProps,
            hentNavRadiogruppeProps,
            nullstill,
            skalRendres,
            onChange,
            validerOgSettFelt,
        }),
        [feltState, hentNavInputProps, validerOgSettFelt, nullstill, onChange]
    );
}
