import { createContext, useContext, useMemo } from 'react';

import { useFagsak } from '@hooks/useFagsak';
import {
    RegistrerSøknadFormField,
    type RegistrerSøknadFormValues,
    type TransformedRegistrerSøknadFormValues,
} from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { hentBarnMedLøpendeUtbetaling } from '@utils/fagsak';
import { type Control, useFieldArray, useWatch } from 'react-hook-form';

export type BarnField = IBarnMedOpplysninger & { id: string };

export interface BarnaFieldArray {
    fields: BarnField[];
    leggTilBarn: (barn: IBarnMedOpplysninger) => void;
    slettBarn: (index: number) => void;
}

const BarnaFieldArrayContext = createContext<BarnaFieldArray | undefined>(undefined);

interface Props {
    control: Control<RegistrerSøknadFormValues, unknown, TransformedRegistrerSøknadFormValues>;
    children: React.ReactNode | ((barnaFieldArray: BarnaFieldArray) => React.ReactNode);
}

export function BarnaFieldArrayProvider({ control, children }: Props) {
    const fagsak = useFagsak();

    const barnMedLøpendeUtbetaling = hentBarnMedLøpendeUtbetaling(fagsak);

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
            leggTilBarn: barn => append(barn, { shouldFocus: false }),
            slettBarn: remove,
        }),
        [fields, watchedBarn, append, remove]
    );

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
