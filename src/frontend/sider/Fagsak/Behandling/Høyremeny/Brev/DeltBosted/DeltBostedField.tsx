import { CheckboxGroup } from '@navikt/ds-react';
import { sorterBarnEtterFødselsdato } from '@utils/formatter';
import { useFormContext } from 'react-hook-form';
import { SendManueltBrevFeltnavn, type SendManueltBrevFormValues } from '../useSendManueltBrevForm';
import { useSkjemaErLåst } from '../useSkjemaErLåst';
import BarnCheckbox from './BarnCheckbox';
import { useBarnMedDeltBostedFieldArray } from './BarnMedDeltBostedFieldArrayContext';

export function DeltBostedField() {
    const {
        clearErrors,
        formState: { errors },
    } = useFormContext<SendManueltBrevFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const { barnMedDeltBosted, oppdaterBarn } = useBarnMedDeltBostedFieldArray();

    const sorterteBarn = sorterBarnEtterFødselsdato(barnMedDeltBosted);
    const merkedeIdenter = barnMedDeltBosted.filter(barn => barn.merket).map(barn => barn.ident);

    const oppdaterBarnMedNyMerketStatus = (identerSomErMerket: string[]) => {
        barnMedDeltBosted.forEach((barn, index) => {
            const merket = identerSomErMerket.includes(barn.ident);
            if (merket !== barn.merket) {
                oppdaterBarn(index, { ...barn, merket, avtalerOmDeltBosted: merket ? [{ dato: '' }] : [] });
            }
        });
        clearErrors(SendManueltBrevFeltnavn.BARN_MED_DELT_BOSTED);
    };

    return (
        <CheckboxGroup
            legend={'Hvilke barn har delt bosted?'}
            error={errors[SendManueltBrevFeltnavn.BARN_MED_DELT_BOSTED]?.root?.message}
            readOnly={skjemaErLåst}
            value={merkedeIdenter}
            onChange={oppdaterBarnMedNyMerketStatus}
        >
            {sorterteBarn.map(barn => {
                const index = barnMedDeltBosted.indexOf(barn);
                return <BarnCheckbox key={barn.id} barn={barn} index={index} />;
            })}
        </CheckboxGroup>
    );
}
