import { useErLesevisning } from '@hooks/useErLesevisning';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

export function BegrunnelseFelt() {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<OpprettBehandlingFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: OpprettBehandlingFelt.BEGRUNNELSE,
        control,
        rules: {
            validate: verdi => {
                const trimmed = verdi.trim();
                if (trimmed.length < 5) {
                    return 'Skriv en begrunnelse med minst 5 tegn.';
                }
                if (trimmed.length > 4000) {
                    return 'Begrunnelsen kan ikke være lengre enn 4000 tegn.';
                }
            },
        },
    });

    return (
        <Textarea
            label={'Begrunnelse for opprettelse av teknisk endring'}
            readOnly={erLesevisning || isSubmitting}
            maxLength={4000}
            value={value}
            onChange={onChange}
            error={error?.message}
        />
    );
}
