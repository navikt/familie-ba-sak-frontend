import {
    KorrigerVedtakFelt,
    type KorrigerVedtakFormValues,
} from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtakModal/useKorrigerVedtakSkjema';
import { useController, useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

interface Props {
    erLesevisning: boolean;
}

export function BegrunnelseFelt({ erLesevisning }: Props) {
    const { control } = useFormContext<KorrigerVedtakFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: KorrigerVedtakFelt.BEGRUNNELSE,
        control,
    });

    return (
        <Textarea
            label={'Begrunnelse (valgfri)'}
            description={'Begrunn hva som er gjort feil i tidligere vedtak'}
            value={value}
            onChange={onChange}
            error={error?.message}
            readOnly={isSubmitting || erLesevisning}
        />
    );
}
