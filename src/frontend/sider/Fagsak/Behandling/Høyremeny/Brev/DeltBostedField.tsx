import { CheckboxGroup } from '@navikt/ds-react';
import { sorterBarnEtterFødselsdato } from '@utils/formatter';
import { useFieldArray, useFormContext } from 'react-hook-form';

import BarnCheckbox from './DeltBosted/BarnCheckbox';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

export function DeltBostedField() {
    const {
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext<BrevModulFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const { fields, update, remove } = useFieldArray({
        control,
        name: BrevmodulFeltnavn.BARN_MED_DELT_BOSTED,
        rules: {
            validate: barna => (barna.some(barn => barn.merket) ? undefined : 'Du må velge barn'),
        },
    });

    const sorterteBarn = sorterBarnEtterFødselsdato(fields);
    const merkedeIdenter = fields.filter(barn => barn.merket).map(barn => barn.ident);

    const oppdaterBarnMedNyMerketStatus = (identerSomErMerket: string[]) => {
        fields.forEach((barn, index) => {
            const merket = identerSomErMerket.includes(barn.ident);
            if (merket !== barn.merket) {
                update(index, { ...barn, merket, avtalerOmDeltBosted: merket ? [{ dato: '' }] : [] });
            }
        });
        clearErrors(BrevmodulFeltnavn.BARN_MED_DELT_BOSTED);
    };

    return (
        <CheckboxGroup
            legend={'Hvilke barn har delt bosted?'}
            error={errors[BrevmodulFeltnavn.BARN_MED_DELT_BOSTED]?.root?.message}
            readOnly={skjemaErLåst}
            value={merkedeIdenter}
            onChange={oppdaterBarnMedNyMerketStatus}
        >
            {sorterteBarn.map(barn => {
                const index = fields.indexOf(barn);
                return <BarnCheckbox key={barn.id} barn={barn} index={index} onFjern={() => remove(index)} />;
            })}
        </CheckboxGroup>
    );
}
