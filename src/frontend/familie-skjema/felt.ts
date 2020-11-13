import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
    defaultValidator,
    Felt,
    FeltState,
    NavBaseSkjemaProps,
    NavInputProps,
    ValiderFelt,
    FeltContext,
    Valideringsstatus,
} from './typer';
import { isChangeEvent } from './utils';

/**
 * Konfigurasjon for å opprette et felt.
 *
 * @verdi verdien til feltet med generisk Verdi type
 * @valideringsfunksjon optional valideringsfunksjon på feltet
 * @skalFeltetVises optional visningsfunksjon. Kan brukes dersom skjemaet
 * skjuler felter for bruker under gitte omstendigheter
 * @valideringscontext avhengighetene som brukes til validering og vis/skjul
 */
export interface FeltConfig<Verdi> {
    verdi: Verdi;
    valideringsfunksjon?: ValiderFelt<Verdi>;
    skalFeltetVises?: (valideringscontext: FeltContext) => boolean;
    avhengigheter?: FeltContext;
}

export function useFelt<Verdi = string>({
    verdi,
    valideringsfunksjon,
    skalFeltetVises,
    avhengigheter = {},
}: FeltConfig<Verdi>): Felt<Verdi> {
    const initialFeltState = {
        feilmelding: '',
        valider: valideringsfunksjon ? valideringsfunksjon : defaultValidator,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi: verdi,
    };

    const [feltState, settFeltState] = useState<FeltState<Verdi>>(initialFeltState);
    const [erSynlig, settErSynlig] = useState(!skalFeltetVises);

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
                avhengigheter
            )
        );
    };

    /**
     * Basert på avhengighetene til feltet håndterer vi vis/skjul
     * og nullstilling på feltet.
     */
    useEffect(() => {
        if (skalFeltetVises) {
            if (skalFeltetVises(avhengigheter)) {
                settErSynlig(true);
            } else {
                if (feltState.valideringsstatus !== Valideringsstatus.IKKE_VALIDERT) {
                    nullstill();
                    settErSynlig(false);
                }
            }
        }
    }, [...Object.values(avhengigheter)]);

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
            erSynlig,
            onChange,
            validerOgSettFelt,
        }),
        [feltState, hentNavInputProps, validerOgSettFelt, nullstill, onChange]
    );
}
