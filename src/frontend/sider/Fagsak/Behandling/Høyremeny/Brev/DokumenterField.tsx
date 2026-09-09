import { useFagsak } from '@hooks/useFagsak';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';

import { leggTilValuePåOption, opplysningsdokumenter, opplysningsdokumenterTilInstitusjon } from './typer';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

export function DokumenterField() {
    const { control } = useFormContext<BrevModulFormValues>();
    const skjemaErLåst = useSkjemaErLåst();
    const institusjon = useFagsak().institusjon;

    const muligeDokumenterÅVelge = institusjon
        ? opplysningsdokumenterTilInstitusjon.map(leggTilValuePåOption)
        : opplysningsdokumenter.map(leggTilValuePåOption);

    const {
        field,
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.DOKUMENTER,
        control,
        rules: {
            validate: (verdi, values) =>
                verdi.length === 0 && values.fritekstKulepunkter.length === 0 && values.fritekstAvsnitt === undefined
                    ? 'Brevmalen krever at du enten velger dokumenter fra listen over, eller legger til et kulepunkt eller avsnitt med fritekst'
                    : true,
        },
    });

    return (
        <UNSAFE_Combobox
            label={'Velg dokumenter'}
            readOnly={skjemaErLåst}
            isMultiSelect
            options={muligeDokumenterÅVelge}
            selectedOptions={field.value}
            onToggleSelected={(optionValue: string, isSelected: boolean) => {
                if (isSelected) {
                    const nyttValg = muligeDokumenterÅVelge.find(valg => valg.value === optionValue);
                    if (nyttValg) {
                        field.onChange([...field.value, nyttValg]);
                    }
                } else {
                    field.onChange(field.value.filter(valg => valg.value !== optionValue));
                }
            }}
            error={error?.message}
        />
    );
}
