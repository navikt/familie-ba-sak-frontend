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

        settInfotrygdsaker(
            // sorter på saksnr, stigende rekkefølge. Saksnr er sjelden et stort tall. Manglende saksnr settes til 1000.
            hentetData.data.saker.sort((sakA, sakB) => {
                const saksnrA = sakA.saksnr ? parseInt(sakA.saksnr) : 1000;
                const saksnrB = sakB.saksnr ? parseInt(sakB.saksnr) : 1000;
                return saksnrA - saksnrB;
            })
        );

        return '';
    };

    return {
        hentSakerForBruker,
        infotrygdsaker,
    };
});

export { MigreringProvider, useMigrering };
