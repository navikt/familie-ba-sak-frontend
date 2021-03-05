import { useFelt, useSkjema } from '@navikt/familie-skjema';

import { IInfotrygdstønader } from '../../typer/infotrygd';
import { Adressebeskyttelsegradering } from '../../typer/person';
import { identValidator } from '../../utils/validators';

export const useVedtakshistorikk = () => {
    const ident = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    const { kanSendeSkjema, onSubmit, settSubmitRessurs, skjema } = useSkjema<
        {
            ident: string;
        },
        IInfotrygdstønader
    >({
        felter: {
            ident,
        },
        skjemanavn: 'hentVedtakshistorikk',
    });

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

    return {
        kanSendeSkjema,
        onSubmit,
        tilgangFeilmelding,
        settSubmitRessurs,
        skjema,
    };
};
