import { BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES, erBrevmottakertype } from '@typer/brevmottaker';
import { useFormContext, useWatch } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';

export function useErNavnPreutfylt() {
    const { control } = useFormContext<BrevmottakerFormValues>();

    const brevmottakertype = useWatch({ control, name: BrevmottakerField.BREVMOTTAKERTYPE });

    return erBrevmottakertype(brevmottakertype)
        ? BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES.includes(brevmottakertype)
        : false;
}
