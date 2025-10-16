import { useState } from 'react';

import type { AxiosError } from 'axios';

import type { FamilieRequestConfig } from '@navikt/familie-http';
import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import { useAppContext } from '../../context/AppContext';
import type { ISamhandlerInfo, ISamhandlerInfoRequest } from '../../typer/samhandler';
import { obfuskerSamhandler } from '../../utils/obfuskerData';
import { orgnummerValidator } from '../../utils/validators';

export const useSamhandlerSkjema = (onSuccess?: () => void, onError?: (error: string) => void) => {
    const { onSubmit, settSubmitRessurs, skjema } = useSkjema<ISamhandlerInfoRequest, ISamhandlerInfo>({
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
            hentSamhandlerdataForOrgNrConfig(skjema.felter.orgnr.verdi),
            (ressurs: Ressurs<ISamhandlerInfo>) => {
                settSubmitRessurs(ressurs);
                if (onSuccess) {
                    onSuccess();
                }
            },
            (error: Ressurs<ISamhandlerInfo>) => {
                if (onError && error.status === RessursStatus.FUNKSJONELL_FEIL) {
                    onError(error.frontendFeilmelding);
                }
            }
        );
    };

    return {
        onSubmitWrapper,
        samhandlerSkjema: skjema,
    };
};

export const useSamhandlerRequest = (erIEnBehandling: boolean) => {
    const { request } = useHttp();
    const [samhandlerRessurs, settSamhandlerRessurs] = useState<Ressurs<ISamhandlerInfo>>(byggTomRessurs());

    const { skalObfuskereData } = useAppContext();

    const hentOgSettSamhandler = (behandlingIdEllerOrgnr: string | number) => {
        settSamhandlerRessurs(byggHenterRessurs<ISamhandlerInfo>());
        hentSamhandler(String(behandlingIdEllerOrgnr)).then((ressurs: Ressurs<ISamhandlerInfo>) => {
            if (skalObfuskereData) {
                obfuskerSamhandler(ressurs);
            }
            settSamhandlerRessurs(ressurs);
        });
    };

    const hentSamhandler = async (behandlingIdEllerOrgnr: string): Promise<Ressurs<ISamhandlerInfo>> => {
        const config = erIEnBehandling
            ? hentSamhandlerdataForBehandlingConfig(behandlingIdEllerOrgnr)
            : hentSamhandlerdataForOrgNrConfig(behandlingIdEllerOrgnr);
        return request<ISamhandlerInfoRequest, ISamhandlerInfo>(config)
            .then((ressurs: Ressurs<ISamhandlerInfo>) => {
                return ressurs;
            })
            .catch((_error: AxiosError) => {
                return byggFeiletRessurs('Ukjent feil ved innhenting av samhandlerinfo');
            });
    };

    return {
        hentSamhandler,
        hentOgSettSamhandler,
        samhandlerRessurs,
    };
};

const hentSamhandlerdataForBehandlingConfig = (behandlingId: string): FamilieRequestConfig<ISamhandlerInfoRequest> => {
    return {
        method: 'GET',
        url: '/familie-ba-sak/api/samhandler/behandling/' + behandlingId,
    };
};

const hentSamhandlerdataForOrgNrConfig = (orgNr: string): FamilieRequestConfig<ISamhandlerInfoRequest> => {
    return {
        method: 'GET',
        url: '/familie-ba-sak/api/samhandler/orgnr/' + orgNr,
    };
};
