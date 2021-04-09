import { useState } from 'react';

import { AxiosError } from 'axios';

import { FamilieRequestConfig, useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { IInfotrygdsaker, IInfotrygdsakerRequest } from '../../typer/infotrygd';
import { Adressebeskyttelsegradering } from '../../typer/person';
import { identValidator } from '../../utils/validators';

export const useInfotrygdSkjema = () => {
    const ident = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    const { onSubmit, settSubmitRessurs, skjema } = useSkjema<
        IInfotrygdsakerRequest,
        IInfotrygdsaker
    >({
        felter: {
            ident,
        },
        skjemanavn: 'hentInfotrygdsaker',
    });

    const onSubmitWrapper = () => {
        onSubmit(
            hentInfotrygdsakerRequestConfig(skjema.felter.ident.verdi),
            (ressurs: Ressurs<IInfotrygdsaker>) =>
                settSubmitRessurs(konverterTilFeiletRessursDersomIkkeTilgang(ressurs))
        );
    };

    return {
        onSubmitWrapper,
        skjema,
    };
};

export const useInfotrygdRequest = () => {
    const { request } = useHttp();
    const [infotrygdsakerRessurs, settInfotrygdsakerRessurs] = useState<Ressurs<IInfotrygdsaker>>(
        byggTomRessurs()
    );

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

export const useInfotrygdMigrering = () => {
    const { request } = useHttp();
    const [infotrygdmigreringRessurs, settInfotrygdmigreringRessurs] = useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const flyttBrukerTilBaSak = (ident: string) => {
        settInfotrygdmigreringRessurs(byggHenterRessurs<string>());
        request<{ ident: string }, string>({
            method: 'POST',
            data: { ident },
            url: '/familie-ba-sak/api/migrering?behandlingAarsak=NYE_OPPLYSNINGER',
        })
            .then((ressurs: Ressurs<string>) => {
                settInfotrygdmigreringRessurs(ressurs);
            })
            .catch((_error: AxiosError) => {
                settInfotrygdmigreringRessurs(
                    byggFeiletRessurs('Ukjent feil ved flytting av bruker til BA-sak')
                );
            });
    };

    return {
        flyttBrukerTilBaSak,
        infotrygdmigreringRessurs,
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
