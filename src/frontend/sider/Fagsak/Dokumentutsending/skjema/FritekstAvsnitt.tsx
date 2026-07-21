import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { Textarea } from '@navikt/ds-react';
import {
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

const maksLengdeFritekstAvsnitt = 1000;

export function FritekstAvsnitt() {
    const erLesevisning = useErLesevisningFagsak();
    const {
        control,
        formState: { isSubmitting },
    } = useFormContext<DokumentutsendingFormValues>();

    const { field, fieldState } = useController({
        name: DokumentutsendingFeltnavn.FRITEKST_AVSNITT,
        control,
        rules: { required: 'Du må fylle inn en fritekst' },
    });

    return (
        <Textarea
            label="Skriv inn fritekst"
            value={field.value}
            maxLength={maksLengdeFritekstAvsnitt}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => field.onChange(event.target.value)}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus
            resize={'vertical'}
            readOnly={erLesevisning || isSubmitting}
        />
    );
}
