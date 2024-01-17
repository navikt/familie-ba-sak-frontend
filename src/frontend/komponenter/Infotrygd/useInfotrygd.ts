import { useState } from 'react';

import type { AxiosError } from 'axios';

import type { FamilieRequestConfig } from '@navikt/familie-http';
import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import type { IInfotrygdsaker, IInfotrygdsakerRequest } from '../../typer/infotrygd';
import { Adressebeskyttelsegradering } from '../../typer/person';
import { identValidator } from '../../utils/validators';

export const useInfotrygdSkjema = () => {
    const [ident, settIdent] = useState('');

    const { onSubmit, settSubmitRessurs, skjema } = useSkjema<
        IInfotrygdsakerRequest,
        IInfotrygdsaker
    >({
        felter: {
            ident: useFelt({
                verdi: '',
                valideringsfunksjon: identValidator,
            }),
        },
        skjemanavn: 'hentInfotrygdsaker',
    });

    const onSubmitWrapper = () => {
        onSubmit(
            hentInfotrygdsakerRequestConfig(skjema.felter.ident.verdi),
            (ressurs: Ressurs<IInfotrygdsaker>) => {
                settIdent(skjema.felter.ident.verdi);
                settSubmitRessurs(konverterTilFeiletRessursDersomIkkeTilgang(ressurs));
            }
        );
    };

    return {
        ident,
        onSubmitWrapper,
        skjema,
    };
};

export const useInfotrygdRequest = () => {
    const { request } = useHttp();
    const [infotrygdsakerRessurs, settInfotrygdsakerRessurs] =
        useState<Ressurs<IInfotrygdsaker>>(byggTomRessurs());

    const hentInfotrygdsaker = (ident: string) => {
        settInfotrygdsakerRessurs(byggHenterRessurs<IInfotrygdsaker>());
        request<IInfotrygdsakerRequest, IInfotrygdsaker>(hentInfotrygdsakerRequestConfig(ident))
            .then((ressurs: Ressurs<IInfotrygdsaker>) => {
                settInfotrygdsakerRessurs(konverterTilFeiletRessursDersomIkkeTilgang(ressurs));
            })
            .catch((_error: AxiosError) => {
                settInfotrygdsakerRessurs(
                    byggFeiletRessurs('Ukjent feil ved innhenting av infotrygdsaker')
                );
            });
    };

    return {
        hentInfotrygdsaker,
        infotrygdsakerRessurs,
    };
};

const hentInfotrygdsakerRequestConfig = (
    ident: string
): FamilieRequestConfig<IInfotrygdsakerRequest> => {
    return {
        method: 'POST',
        data: { ident },
        url: '/familie-ba-sak/api/infotrygd/hent-infotrygdsaker-for-soker',
    };
};

const tilgangFeilmelding = (
    adressebeskyttelsegradering: Adressebeskyttelsegradering | undefined
): string => {
    if (adressebeskyttelsegradering === Adressebeskyttelsegradering.FORTROLIG) {
        return 'Brukeren har diskresjonskode fortrolig adresse.';
    } else if (
        adressebeskyttelsegradering === Adressebeskyttelsegradering.STRENGT_FORTROLIG ||
        adressebeskyttelsegradering === Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND
    ) {
        return 'Brukeren har diskresjonskode strengt fortrolig adresse.';
    } else {
        return 'Du har ikke tilgang til denne brukeren.';
    }
};

const konverterTilFeiletRessursDersomIkkeTilgang = (ressurs: Ressurs<IInfotrygdsaker>) => {
    if (ressurs.status === RessursStatus.SUKSESS) {
        if (!ressurs.data.harTilgang) {
            return byggFunksjonellFeilRessurs<IInfotrygdsaker>(
                tilgangFeilmelding(ressurs.data.adressebeskyttelsegradering)
            );
        }
    }
    return ressurs;
};
