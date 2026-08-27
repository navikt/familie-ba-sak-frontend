import { finnBarnIBrevÅrsak } from '@sider/Fagsak/Dokumentutsending/barnIBrevÅrsak';
import {
    type DokumentutsendingBarn,
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { createContext, useContext, useMemo } from 'react';
import {
    type Control,
    type FieldArrayMethodProps,
    type FieldArrayWithId,
    useFieldArray,
    useWatch,
} from 'react-hook-form';

export interface ValgteBarnFieldArray {
    valgteBarn: FieldArrayWithId<DokumentutsendingFormValues, DokumentutsendingFeltnavn.VALGTE_BARN>[];
    leggTilBarn: (barn: IBarnMedOpplysninger, options?: FieldArrayMethodProps) => void;
    oppdaterBarn: (index: number, barn: DokumentutsendingBarn) => void;
    fjernBarn: (index: number) => void;
}

const ValgteBarnFieldArrayContext = createContext<ValgteBarnFieldArray | undefined>(undefined);

interface Props {
    control: Control<DokumentutsendingFormValues>;
    children: React.ReactNode | ((valgteBarnFieldArray: ValgteBarnFieldArray) => React.ReactNode);
}

export function ValgteBarnFieldArrayProvider({ control, children }: Props) {
    const årsak = useWatch({ control, name: DokumentutsendingFeltnavn.ÅRSAK });
    const { fields, append, update, remove } = useFieldArray({
        control,
        name: DokumentutsendingFeltnavn.VALGTE_BARN,
        rules: {
            validate: barna =>
                finnBarnIBrevÅrsak(årsak) === undefined || barna.some(barn => barn.merket)
                    ? undefined
                    : 'Du må velge minst ett barn',
        },
    });

    const value = useMemo<ValgteBarnFieldArray>(() => {
        const leggTilBarn = (barn: IBarnMedOpplysninger, options?: FieldArrayMethodProps) => {
            append({ ...barn, avtalerOmDeltBosted: [{ dato: '' }] }, options);
        };
        return {
            valgteBarn: fields,
            leggTilBarn,
            oppdaterBarn: update,
            fjernBarn: remove,
        };
    }, [fields, append, update, remove]);

    return (
        <ValgteBarnFieldArrayContext.Provider value={value}>
            {typeof children === 'function' ? children(value) : children}
        </ValgteBarnFieldArrayContext.Provider>
    );
}

export function useValgteBarnFieldArray() {
    const context = useContext(ValgteBarnFieldArrayContext);
    if (context === undefined) {
        throw new Error('useValgteBarnFieldArray må brukes innenfor en ValgteBarnFieldArrayProvider');
    }
    return context;
}
