import React from 'react';

import createUseContext from 'constate';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';

import { IInfotrygdSak, IInfotrygdsaker } from '../typer/infotrygd';
import { Adressebeskyttelsegradering } from '../typer/person';

const [MigreringProvider, useMigrering] = createUseContext(() => {
    const [infotrygdsaker, settInfotrygdsaker] = React.useState<IInfotrygdSak[]>([]);

    const { request } = useHttp();

    const hentSakerForBruker = async (ident: string) => {
        const hentetData = await request<{ ident: string }, IInfotrygdsaker>({
            method: 'POST',
            url: '/familie-ba-sak/api/infotrygd/hent-infotrygdsaker-for-soker',
            data: { ident },
        });

        if (hentetData.status !== RessursStatus.SUKSESS) {
            return 'Ukjent feil ved henting av person';
        } else if (!hentetData.data.harTilgang) {
            if (
                hentetData.data.adressebeskyttelsegradering ===
                Adressebeskyttelsegradering.FORTROLIG
            ) {
                return 'Brukeren har diskresjonskode fortrolig adresse.';
            } else if (
                hentetData.data.adressebeskyttelsegradering ===
                    Adressebeskyttelsegradering.STRENGT_FORTROLIG ||
                hentetData.data.adressebeskyttelsegradering ===
                    Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND
            ) {
                return 'Brukeren har diskresjonskode strengt fortrolig adresse.';
            } else {
                return 'Du har ikke tilgang til denne brukeren.';
            }
        }

        // TODO: Før vi setter saker, bør vi ha en fast sorteringsrekkefølge?
        settInfotrygdsaker(hentetData.data.saker);

        return '';
    };

    return {
        hentSakerForBruker,
        infotrygdsaker,
    };
});

export { MigreringProvider, useMigrering };
