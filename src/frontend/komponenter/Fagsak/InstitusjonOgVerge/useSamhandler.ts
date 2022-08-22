import { useState } from 'react';

import type { FamilieRequestConfig } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';

import type { ISamhandlerInfo, ISamhandlerInfoRequest } from '../../../typer/samhandler';
import { orgnummerValidator } from '../../../utils/validators';

export const useSamhandlerSkjema = () => {
    const [orgnr, settOrgnr] = useState('');

    const { onSubmit, settSubmitRessurs, skjema } = useSkjema<
        ISamhandlerInfoRequest,
        ISamhandlerInfo
    >({
        felter: {
            orgnr: useFelt({
                verdi: '',
                valideringsfunksjon: orgnummerValidator,
            }),
        },
        skjemanavn: 'hentSamhandler',
    });

    const onSubmitWrapper = () => {
        onSubmit(
            hentSamhandlerdataForOrgnrConfig(skjema.felter.orgnr.verdi),
            (ressurs: Ressurs<ISamhandlerInfo>) => {
                settOrgnr(skjema.felter.orgnr.verdi);
                settSubmitRessurs(ressurs);
            }
        );
    };

    return {
        orgnr,
        onSubmitWrapper,
        skjema,
    };
};

const hentSamhandlerdataForOrgnrConfig = (
    orgnr: string
): FamilieRequestConfig<ISamhandlerInfoRequest> => {
    return {
        method: 'GET',
        url: '/familie-ba-sak/api/samhandler/orgnr/' + orgnr,
    };
};
