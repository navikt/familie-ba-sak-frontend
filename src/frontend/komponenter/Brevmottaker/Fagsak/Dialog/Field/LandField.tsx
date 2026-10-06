import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { RegionCombobox, type Regionkode } from '@komponenter/FlaggCombobox';
import { Brevmottakertype } from '@typer/brevmottaker';
import { useController, useFormContext } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';
import { useValgbareRegionkoder } from './useValgbareRegionkoder';

export function LandField() {
    const erLesevisning = useErLesevisningFagsak();

    const { control, getValues, resetField } = useFormContext<BrevmottakerFormValues>();

    const {
        field: { ref, value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.LAND,
        control,
        rules: {
            required: 'Land er påkrevd.',
            validate: value => {
                const brevmottakertype = getValues(BrevmottakerField.BREVMOTTAKERTYPE);
                const erBrevmottakerMedUtenlandskAdresse =
                    brevmottakertype === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE;
                const erNorge = value === 'NO';
                if (erBrevmottakerMedUtenlandskAdresse && erNorge) {
                    return 'Norge kan ikke velges for bruker med utenlandsk adresse.';
                }
                return true;
            },
        },
    });

    const valgbareRegionkoder = useValgbareRegionkoder();

    function onRegionkodeValgt(regionkode: Regionkode | null) {
        if (regionkode !== 'NO') {
            resetField(BrevmottakerField.POSTNUMMER);
            resetField(BrevmottakerField.POSTSTED);
        }
        onChange(regionkode);
    }

    return (
        <RegionCombobox
            ref={ref}
            label={'Land'}
            value={value}
            options={valgbareRegionkoder}
            onChange={onRegionkodeValgt}
            readOnly={erLesevisning || isSubmitting}
            error={error?.message}
        />
    );
}
