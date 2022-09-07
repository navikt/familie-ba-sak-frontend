import { useState } from 'react';

import type { AxiosError } from 'axios';

import type { FamilieRequestConfig } from '@navikt/familie-http';
import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs } from '@navikt/familie-typer';

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
        samhandlerSkjema: skjema,
    };
};

export const useSamhandlerRequest = () => {
    const { request } = useHttp();
    const [samhandlerRessurs, settSamhandlerRessurs] = useState<Ressurs<ISamhandlerInfo>>(
        byggTomRessurs()
    );

    const hentSamhandler = (orgnr: string) => {
        settSamhandlerRessurs(byggHenterRessurs<ISamhandlerInfo>());
        request<ISamhandlerInfoRequest, ISamhandlerInfo>(hentSamhandlerdataForOrgnrConfig(orgnr))
            .then((ressurs: Ressurs<ISamhandlerInfo>) => {
                settSamhandlerRessurs(ressurs);
            })
            .catch((_error: AxiosError) => {
                settSamhandlerRessurs(
                    byggFeiletRessurs('Ukjent feil ved innhenting av samhandlerinfo')
                );
            });
    };

    return {
        hentSamhandler,
        samhandlerRessurs,
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
