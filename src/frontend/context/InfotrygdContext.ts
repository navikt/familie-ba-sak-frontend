import { useFelt, useSkjema } from '@navikt/familie-skjema';

import { IInfotrygdSak, IInfotrygdsaker } from '../typer/infotrygd';
import { Adressebeskyttelsegradering } from '../typer/person';
import { identValidator } from '../utils/validators';

export const useInfotrygd = () => {
    const ident = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    const { kanSendeSkjema, onSubmit, settSubmitRessurs, skjema } = useSkjema<
        {
            ident: string;
        },
        IInfotrygdsaker
    >({
        felter: {
            ident,
        },
        skjemanavn: 'hentSakerFraInfotrygd',
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

    const sorterSakerEtterSaksnr = (saker: IInfotrygdSak[]): IInfotrygdSak[] =>
        saker.sort((sakA, sakB) => {
            const saksnrA = sakA.saksnr ? parseInt(sakA.saksnr) : 1000;
            const saksnrB = sakB.saksnr ? parseInt(sakB.saksnr) : 1000;
            return saksnrA - saksnrB;
        });

    return {
        kanSendeSkjema,
        onSubmit,
        tilgangFeilmelding,
        settSubmitRessurs,
        skjema,
        sorterSakerEtterSaksnr,
    };
};
