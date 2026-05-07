import {
    KorrigerVedtakFelt,
    type KorrigerVedtakFormValues,
} from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtakModal/useKorrigerVedtakSkjema';
import { useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

interface Props {
    erLesevisning: boolean;
}

export function BegrunnelseFelt({ erLesevisning }: Props) {
    const {
        register,
        formState: { isSubmitting, errors },
    } = useFormContext<KorrigerVedtakFormValues>();

    return (
        <Textarea
            {...register(KorrigerVedtakFelt.BEGRUNNELSE)}
            label={'Begrunnelse (valgfri)'}
            description={'Begrunn hva som er gjort feil i tidligere vedtak'}
            error={errors.form?.message} // TODO: riktig error som vises her?
            readOnly={isSubmitting || erLesevisning}
        />
    );
}
