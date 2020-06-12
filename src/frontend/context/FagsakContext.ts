import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';
import { IFagsak } from '../typer/fagsak';
import { ILogg } from '../typer/logg';
import { IPerson } from '../typer/person';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import { useApp } from './AppContext';

interface IHovedRessurser {
    bruker: Ressurs<IPerson>;
    fagsak: Ressurs<IFagsak>;
    logg: Ressurs<ILogg[]>;
}

const initialState: IHovedRessurser = {
    bruker: {
        status: RessursStatus.IKKE_HENTET,
    },
    fagsak: {
        status: RessursStatus.IKKE_HENTET,
    },
    logg: {
        status: RessursStatus.IKKE_HENTET,
    },
};

const [FagsakProvider, useFagsakRessurser] = createUseContext(() => {
    const [fagsakRessurser, settFagsakRessurser] = React.useState<IHovedRessurser>(initialState);
    const { axiosRequest } = useApp();

    React.useEffect(() => {
        if (fagsakRessurser.fagsak.status === RessursStatus.SUKSESS) {
            settFagsakRessurser({
                ...fagsakRessurser,
                bruker: {
                    status: RessursStatus.HENTER,
                },
            });
            axiosRequest<IPerson, void>({
                method: 'GET',
                url: '/familie-ba-sak/api/person',
                headers: {
                    personIdent: fagsakRessurser.fagsak.data.søkerFødselsnummer,
                },
                påvirkerSystemLaster: true,
            }).then((hentetPerson: Ressurs<IPerson>) => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    bruker: hentetPerson,
                });
            });
        }
    }, [fagsakRessurser.fagsak.status]);

    const hentFagsak = (fagsakId: string): void => {
        settFagsakRessurser({
            ...fagsakRessurser,
            fagsak: {
                status: RessursStatus.HENTER,
            },
        });
        axiosRequest<IFagsak, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}`,
            påvirkerSystemLaster: true,
        })
            .then((hentetFagsak: Ressurs<IFagsak>) => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    fagsak: hentetFagsak,
                });
            })
            .catch((_error: AxiosError) => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    fagsak: byggFeiletRessurs('Ukjent ved innhenting av fagsak'),
                });
            });
    };

    const hentLogg = (behandlingId: number): void => {
        settFagsakRessurser({
            ...fagsakRessurser,
            logg: {
                status: RessursStatus.HENTER,
            },
        });
        axiosRequest<ILogg[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/logg/${behandlingId}`,
            påvirkerSystemLaster: true,
        })
            .then((hentetLogg: Ressurs<ILogg[]>) => {
                settFagsakRessurser({ ...fagsakRessurser, logg: hentetLogg });
            })
            .catch(() => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    logg: byggFeiletRessurs('Feil ved lasting av logg'),
                });
            });
    };

    const settFagsak = (modifisertFagsak: Ressurs<IFagsak>): void =>
        settFagsakRessurser({ ...fagsakRessurser, fagsak: modifisertFagsak });

    return {
        bruker: fagsakRessurser.bruker,
        fagsak: fagsakRessurser.fagsak,
        hentFagsak,
        hentLogg,
        logg: fagsakRessurser.logg,
        ressurser: fagsakRessurser,
        settFagsak,
    };
});

export { FagsakProvider, useFagsakRessurser };
