import { useState } from 'react';

import type { FamilieRequestConfig } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFunksjonellFeilRessurs, RessursStatus } from '@navikt/familie-typer';

import type { IInfotrygdsaker, IInfotrygdsakerRequest } from '../../typer/infotrygd';
import { Adressebeskyttelsegradering } from '../../typer/person';
import { identValidator } from '../../utils/validators';

export const useInfotrygdSkjema = () => {
    const [ident, settIdent] = useState('');

    const { onSubmit, settSubmitRessurs, skjema } = useSkjema<IInfotrygdsakerRequest, IInfotrygdsaker>({
        felter: {
            ident: useFelt({
                verdi: '',
                valideringsfunksjon: identValidator,
            }),
        },
        skjemanavn: 'hentInfotrygdsaker',
    });

    const onSubmitWrapper = () => {
        onSubmit(hentInfotrygdsakerRequestConfig(skjema.felter.ident.verdi), (ressurs: Ressurs<IInfotrygdsaker>) => {
            settIdent(skjema.felter.ident.verdi);
            settSubmitRessurs(konverterTilFeiletRessursDersomIkkeTilgang(ressurs));
        });
    };

    return {
        ident,
        onSubmitWrapper,
        skjema,
    };
};

const hentInfotrygdsakerRequestConfig = (ident: string): FamilieRequestConfig<IInfotrygdsakerRequest> => {
    return {
        method: 'POST',
        data: { ident },
        url: '/familie-ba-sak/api/infotrygd/hent-infotrygdsaker-for-soker',
        påvirkerSystemLaster: true,
    };
};

const tilgangFeilmelding = (adressebeskyttelsegradering: Adressebeskyttelsegradering | undefined): string => {
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
