import { useBruker } from '@hooks/useBruker';
import { Select } from '@navikt/ds-react';
import {
    BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES,
    Brevmottakertype,
    brevmottakertypeVisningsnavn,
    erBrevmottakertype,
    utledPreutfyltNavn,
} from '@typer/brevmottaker';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';

interface Props {
    erLesevisning: boolean;
    valgbareBrevmottakertyper: Brevmottakertype[];
}

export function BrevmottakertypeField({ erLesevisning, valgbareBrevmottakertyper }: Props) {
    const bruker = useBruker();

    const { control, setValue, resetField, getValues } = useFormContext<BrevmottakerFormValues>();

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

        const forrigeVarPreutfylt =
            erBrevmottakertype(forrige) && BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES.includes(forrige);
        const skalPreutfylles = BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES.includes(value);
        const erBrukerMedUtenlandskAdresse = value === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE;

        if (erBrukerMedUtenlandskAdresse && getValues(BrevmottakerField.LAND) === 'NO') {
            resetField(BrevmottakerField.LAND);
            resetField(BrevmottakerField.POSTNUMMER);
            resetField(BrevmottakerField.POSTSTED);
        }

        if (skalPreutfylles) {
            const navn = utledPreutfyltNavn(value, getValues(BrevmottakerField.LAND), bruker.navn);
            setValue(BrevmottakerField.NAVN, navn, { shouldValidate: true });
        }

        if (!skalPreutfylles && forrigeVarPreutfylt) {
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
