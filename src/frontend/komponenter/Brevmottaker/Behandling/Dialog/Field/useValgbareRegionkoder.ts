import { ALLE_LAND_REGIONKODER } from '@komponenter/FlaggCombobox';
import { Brevmottakertype } from '@typer/brevmottaker';
import { useFormContext, useWatch } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';

export function useValgbareRegionkoder() {
    const { control } = useFormContext<BrevmottakerFormValues>();

    const brevmottakertype = useWatch({ control, name: BrevmottakerField.BREVMOTTAKERTYPE });
    const erBrukerMedUtenlandskAdresse = brevmottakertype === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE;

    return ALLE_LAND_REGIONKODER.filter(regionkode => regionkode !== 'XU').filter(
        regionkode => !erBrukerMedUtenlandskAdresse || regionkode !== 'NO'
    );
}
