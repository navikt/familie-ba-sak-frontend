import { useErLesevisning } from '@hooks/useErLesevisning';
import { Textarea } from '@navikt/ds-react';
import { useController, useFormContext } from 'react-hook-form';

import { AnnenVurderingFelt, type AnnenVurderingFormValues } from './useAnnenVurderingSkjema';

export function AnnenVurderingBegrunnelseFelt() {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<AnnenVurderingFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: AnnenVurderingFelt.BEGRUNNELSE,
        control,
    });

    return (
        <Textarea
            ref={ref}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting}
            value={value}
            onChange={onChange}
            label={'Begrunnelse (valgfri)'}
            placeholder={'Begrunn hvorfor det er gjort endringer på annen vurdering'}
            error={error?.message}
        />
    );
}
