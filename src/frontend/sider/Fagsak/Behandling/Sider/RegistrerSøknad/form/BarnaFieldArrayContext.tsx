import { useFagsakId } from '@hooks/useFagsakId';
import { useHentGjeldendeUtbetalingsperioder } from '@hooks/useHentGjeldendeUtbetalingsperioder';
import { LocalAlert } from '@navikt/ds-react';
import {
    RegistrerSøknadFormField,
    type RegistrerSøknadFormValues,
    type TransformedRegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/useRegistrerSøknadForm';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { hentBarnMedLøpendeUtbetaling } from '@utils/fagsak';
import { createContext, useContext, useMemo } from 'react';
import { type Control, useFieldArray, useWatch } from 'react-hook-form';

export type BarnField = IBarnMedOpplysninger & { id: string };

export interface BarnaFieldArray {
    fields: BarnField[];
    barnMedLøpendeUtbetaling: Set<string>;
    leggTilBarn: (barn: IBarnMedOpplysninger) => void;
    slettBarn: (index: number) => void;
}

const BarnaFieldArrayContext = createContext<BarnaFieldArray | undefined>(undefined);

interface Props {
    control: Control<RegistrerSøknadFormValues, unknown, TransformedRegistrerSøknadFormValues>;
    children: React.ReactNode | ((barnaFieldArray: BarnaFieldArray) => React.ReactNode);
}

export function BarnaFieldArrayProvider({ control, children }: Props) {
    const fagsakId = useFagsakId();

    const { data: gjeldendeUtbetalingsperioder, error: gjeldendeUtbetalingsperioderError } =
        useHentGjeldendeUtbetalingsperioder(fagsakId);

    const barnMedLøpendeUtbetaling = useMemo(
        () => hentBarnMedLøpendeUtbetaling(gjeldendeUtbetalingsperioder ?? []),
        [gjeldendeUtbetalingsperioder]
    );

    const { fields, append, remove } = useFieldArray({
        control,
        name: RegistrerSøknadFormField.BARN,
        rules: {
            validate: barn => {
                const merketBarn = barn.filter(b => b.merket);
                if (merketBarn.length === 0 && barnMedLøpendeUtbetaling.size === 0) {
                    return 'Minst et barn er påkrevd.';
                }
                return true;
            },
        },
    });

    const watchedBarn = useWatch({ control, name: RegistrerSøknadFormField.BARN });

    const value = useMemo<BarnaFieldArray>(
        () => ({
            fields: fields.map((field, index) => ({ ...field, ...watchedBarn?.[index] })),
            barnMedLøpendeUtbetaling,
            leggTilBarn: barn => append(barn, { shouldFocus: false }),
            slettBarn: remove,
        }),
        [fields, watchedBarn, barnMedLøpendeUtbetaling, append, remove]
    );

    // Periodene hentes på nytt når fagsaken invalideres. Feiler en slik ny henting, beholder vi skjemaet med de
    // periodene vi allerede har, i stedet for å bytte hele skjemaet ut med en feilmelding.
    if (gjeldendeUtbetalingsperioderError && gjeldendeUtbetalingsperioder === undefined) {
        return (
            <LocalAlert status="error">
                <LocalAlert.Header>
                    <LocalAlert.Title>Kunne ikke hente utbetalinger</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>{gjeldendeUtbetalingsperioderError.message}</LocalAlert.Content>
            </LocalAlert>
        );
    }

    if (gjeldendeUtbetalingsperioder === undefined) {
        return null;
    }

    return (
        <BarnaFieldArrayContext.Provider value={value}>
            {typeof children === 'function' ? children(value) : children}
        </BarnaFieldArrayContext.Provider>
    );
}

export function useBarnaFieldArray() {
    const barnaFieldArray = useContext(BarnaFieldArrayContext);
    if (barnaFieldArray === undefined) {
        throw new Error('useBarnaFieldArray må brukes innenfor en BarnaFieldArrayProvider');
    }
    return barnaFieldArray;
}
