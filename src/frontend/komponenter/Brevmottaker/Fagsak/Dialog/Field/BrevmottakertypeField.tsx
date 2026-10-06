import { useBruker } from '@hooks/useBruker';
import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { Select } from '@navikt/ds-react';
import { Brevmottakertype, brevmottakertypeVisningsnavn, erBrevmottakertype } from '@typer/brevmottaker';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { useValgbareBrevmottakertyper } from './useValgbareBrevmottakertyper';

export function BrevmottakertypeField() {
    const erLesevisning = useErLesevisningFagsak();
    const bruker = useBruker();

    const { control, setValue, resetField, getValues } = useFormContext<BrevmottakerFormValues>();

    const valgbareBrevmottakertyper = useValgbareBrevmottakertyper();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.BREVMOTTAKERTYPE,
        control,
        rules: {
            deps: [BrevmottakerField.LAND],
            validate: value => {
                if (!erBrevmottakertype(value)) {
                    return 'Mottaker må velges.';
                }
                if (!valgbareBrevmottakertyper.includes(value)) {
                    return 'Du har valgt en mottaker som ikke kan velges.';
                }
                return true;
            },
        },
    });

    function onVelgBrevmottaker(event: ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;

        if (!erBrevmottakertype(value)) {
            onChange('');
            return;
        }

        const forrige = getValues(BrevmottakerField.BREVMOTTAKERTYPE);

        const forrigeVarBrukerMedUtenlandskAdresse = forrige === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE;
        const erBrukerMedUtenlandskAdresse = value === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE;

        if (erBrukerMedUtenlandskAdresse) {
            setValue(BrevmottakerField.NAVN, bruker.navn, { shouldValidate: true });
        }

        if (erBrukerMedUtenlandskAdresse && getValues(BrevmottakerField.LAND) === 'NO') {
            resetField(BrevmottakerField.LAND);
            resetField(BrevmottakerField.POSTNUMMER);
            resetField(BrevmottakerField.POSTSTED);
        }

        if (!erBrukerMedUtenlandskAdresse && forrigeVarBrukerMedUtenlandskAdresse) {
            resetField(BrevmottakerField.NAVN);
        }

        onChange(value);
    }

    return (
        <Select
            name={name}
            ref={ref}
            label={'Mottaker'}
            value={value}
            onChange={onVelgBrevmottaker}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            error={error?.message}
        >
            <option value={''} disabled={true}>
                -- Velg mottaker --
            </option>
            {valgbareBrevmottakertyper.map(brevmottakertype => (
                <option value={brevmottakertype} key={brevmottakertype}>
                    {brevmottakertypeVisningsnavn[brevmottakertype]}
                </option>
            ))}
        </Select>
    );
}
