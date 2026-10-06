import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { ALLE_LAND_REGIONKODER, RegionCombobox, type Regionkode } from '@komponenter/FlaggCombobox';
import {
    BrevmottakerField,
    type BrevmottakerFormValues,
} from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/useBrevmottakerForm';
import { Brevmottakertype } from '@typer/brevmottaker';
import { useController, useFormContext } from 'react-hook-form';

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
            required: 'Land er påkrevd',
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

    const valgbareRegionkoder = ALLE_LAND_REGIONKODER.filter(regionkode => {
        const brevmottakertype = getValues(BrevmottakerField.BREVMOTTAKERTYPE);
        if (brevmottakertype === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE) {
            return regionkode !== 'NO' && regionkode !== 'XU';
        }
        return regionkode !== 'XU';
    });

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
