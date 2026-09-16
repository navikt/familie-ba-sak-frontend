import type { IBarnMedOpplysninger } from '@typer/søknad';
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import {
    type Control,
    type FieldArrayMethodProps,
    type FieldArrayWithId,
    useFieldArray,
    useWatch,
} from 'react-hook-form';

import { skalViseDeltBosted } from '../brevmalRegler';
import { type BarnMedDeltBosted, type BrevModulFormValues, BrevmodulFeltnavn } from '../useBrevModul';

export interface BarnMedDeltBostedFieldArray {
    barnMedDeltBosted: FieldArrayWithId<BrevModulFormValues, BrevmodulFeltnavn.BARN_MED_DELT_BOSTED>[];
    leggTilBarn: (barn: IBarnMedOpplysninger, options?: FieldArrayMethodProps) => void;
    oppdaterBarn: (index: number, barn: BarnMedDeltBosted) => void;
    fjernBarn: (index: number) => void;
}

const BarnMedDeltBostedFieldArrayContext = createContext<BarnMedDeltBostedFieldArray | undefined>(undefined);

interface Props {
    control: Control<BrevModulFormValues>;
    children: ReactNode | ((fieldArray: BarnMedDeltBostedFieldArray) => ReactNode);
}

export function BarnMedDeltBostedFieldArrayProvider({ control, children }: Props) {
    const brevmal = useWatch({ control, name: BrevmodulFeltnavn.BREVMAL });
    const { fields, append, update, remove } = useFieldArray({
        control,
        name: BrevmodulFeltnavn.BARN_MED_DELT_BOSTED,
        rules: {
            validate: barna =>
                !skalViseDeltBosted(brevmal) || barna.some(barn => barn.merket) ? undefined : 'Du må velge barn',
        },
    });

    const value = useMemo<BarnMedDeltBostedFieldArray>(() => {
        const leggTilBarn = (barn: IBarnMedOpplysninger, options?: FieldArrayMethodProps) => {
            append({ ...barn, avtalerOmDeltBosted: barn.erFolkeregistrert ? [{ dato: '' }] : [] }, options);
        };
        return {
            barnMedDeltBosted: fields,
            leggTilBarn,
            oppdaterBarn: update,
            fjernBarn: remove,
        };
    }, [fields, append, update, remove]);

    return (
        <BarnMedDeltBostedFieldArrayContext.Provider value={value}>
            {typeof children === 'function' ? children(value) : children}
        </BarnMedDeltBostedFieldArrayContext.Provider>
    );
}

export function useBarnMedDeltBostedFieldArray() {
    const context = useContext(BarnMedDeltBostedFieldArrayContext);
    if (context === undefined) {
        throw new Error('useBarnMedDeltBostedFieldArray må brukes innenfor en BarnMedDeltBostedFieldArrayProvider');
    }
    return context;
}
