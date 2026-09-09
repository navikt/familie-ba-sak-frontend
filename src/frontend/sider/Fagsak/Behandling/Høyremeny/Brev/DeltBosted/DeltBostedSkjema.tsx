import { CheckboxGroup } from '@navikt/ds-react';
import { sorterBarnEtterFødselsdato } from '@utils/formatter';
import { useFormContext, useWatch } from 'react-hook-form';

import { type BrevModulFormValues, BrevmodulFeltnavn } from '../useBrevModul';
import { useSkjemaErLåst } from '../useSkjemaErLåst';
import BarnCheckbox from './BarnCheckbox';

interface IProps {
    error?: string;
}

const DeltBostedSkjema = ({ error }: IProps) => {
    const {
        control,
        setValue,
        formState: { isSubmitted },
    } = useFormContext<BrevModulFormValues>();
    const skjemaErLåst = useSkjemaErLåst();

    const barnMedDeltBosted = useWatch({ control, name: BrevmodulFeltnavn.BARN_MED_DELT_BOSTED });
    const avtalerOmDeltBostedPerBarn = useWatch({ control, name: BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN });

    const sorterteBarn = sorterBarnEtterFødselsdato(barnMedDeltBosted);

    const oppdaterBarnMedNyMerketStatus = (barnaSomErMerket: string[]) => {
        setValue(
            BrevmodulFeltnavn.BARN_MED_DELT_BOSTED,
            barnMedDeltBosted.map(barn => ({ ...barn, merket: barnaSomErMerket.includes(barn.ident) })),
            { shouldValidate: isSubmitted }
        );
    };

    const oppdaterAvtalerOmDeltBostedPerBarn = (barnaSomErMerket: string[]) => {
        const barnHvorMerkingErFjernet = barnMedDeltBosted
            .filter(barn => barn.merket && !barnaSomErMerket.includes(barn.ident))
            .map(barn => barn.ident);
        const barnHvorMerkingErLagtTil = barnMedDeltBosted
            .filter(barn => !barn.merket && barnaSomErMerket.includes(barn.ident))
            .map(barn => barn.ident);

        const nyeAvtaler = { ...avtalerOmDeltBostedPerBarn };
        barnHvorMerkingErFjernet.forEach(ident => {
            nyeAvtaler[ident] = [];
        });
        barnHvorMerkingErLagtTil.forEach(ident => {
            nyeAvtaler[ident] = [''];
        });
        setValue(BrevmodulFeltnavn.AVTALER_OM_DELT_BOSTED_PER_BARN, nyeAvtaler, { shouldValidate: isSubmitted });
    };

    return (
        <CheckboxGroup
            legend={'Hvilke barn har delt bosted?'}
            error={error}
            readOnly={skjemaErLåst}
            value={barnMedDeltBosted.filter(barn => barn.merket).map(barn => barn.ident)}
            onChange={(barnaSomErMerket: string[]) => {
                oppdaterAvtalerOmDeltBostedPerBarn(barnaSomErMerket);
                oppdaterBarnMedNyMerketStatus(barnaSomErMerket);
            }}
        >
            {sorterteBarn.map(barn => (
                <BarnCheckbox key={barn.ident} barn={barn} />
            ))}
        </CheckboxGroup>
    );
};

export default DeltBostedSkjema;
