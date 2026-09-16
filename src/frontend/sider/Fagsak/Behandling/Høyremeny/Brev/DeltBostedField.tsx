import { CheckboxGroup } from '@navikt/ds-react';
import { sorterBarnEtterFødselsdato } from '@utils/formatter';
import { useFormContext } from 'react-hook-form';

import BarnCheckbox from './DeltBosted/BarnCheckbox';
import { useBarnMedDeltBostedFieldArray } from './DeltBosted/BarnMedDeltBostedFieldArrayContext';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

export function DeltBostedField() {
    const {
        clearErrors,
        formState: { errors },
    } = useFormContext<BrevModulFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const { barnMedDeltBosted, oppdaterBarn, fjernBarn } = useBarnMedDeltBostedFieldArray();

    const sorterteBarn = sorterBarnEtterFødselsdato(barnMedDeltBosted);
    const merkedeIdenter = barnMedDeltBosted.filter(barn => barn.merket).map(barn => barn.ident);

    const oppdaterBarnMedNyMerketStatus = (identerSomErMerket: string[]) => {
        barnMedDeltBosted.forEach((barn, index) => {
            const merket = identerSomErMerket.includes(barn.ident);
            if (merket !== barn.merket) {
                oppdaterBarn(index, { ...barn, merket, avtalerOmDeltBosted: merket ? [{ dato: '' }] : [] });
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
                const index = barnMedDeltBosted.indexOf(barn);
                return <BarnCheckbox key={barn.id} barn={barn} index={index} onFjern={() => fjernBarn(index)} />;
            })}
        </CheckboxGroup>
    );
}
