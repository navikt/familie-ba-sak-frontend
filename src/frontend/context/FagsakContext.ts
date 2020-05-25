import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { BehandlerRolle, BehandlingSteg, IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { ILogg } from '../typer/logg';
import { IPerson } from '../typer/person';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import { tilFeilside } from '../utils/commons';
import { hentAktivBehandlingPåFagsak, hentBehandlingPåFagsak } from '../utils/fagsak';
import { useApp } from './AppContext';

interface IHovedRessurser {
    bruker: Ressurs<IPerson>;
    fagsak: Ressurs<IFagsak>;
    logg: Ressurs<ILogg[]>;
    åpenBehandling?: IBehandling;
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
    const { axiosRequest, hentSaksbehandlerRolle } = useApp();
    const history = useHistory();
    const behandlingId = history.location.pathname.split('/')[3];

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
        })
            .then((hentetFagsak: Ressurs<IFagsak>) => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    fagsak: hentetFagsak,
                    åpenBehandling: bestemÅpenBehandling(hentetFagsak),
                });
            })
            .catch((error: AxiosError) => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    fagsak: byggFeiletRessurs(
                        'Ukjent ved innhenting av fagsak',
                        'Ukjent ved innhenting av fagsak',
                        error
                    ),
                    åpenBehandling: undefined,
                });
            });
    };

    const bestemÅpenBehandling = (fagsak: Ressurs<IFagsak>): IBehandling | undefined => {
        const aktivBehandling =
            fagsak.status === RessursStatus.SUKSESS && hentAktivBehandlingPåFagsak(fagsak.data);
        const åpenBehandling =
            fagsak.status === RessursStatus.SUKSESS &&
            behandlingId &&
            hentBehandlingPåFagsak(fagsak.data, parseInt(behandlingId));
        console.log(åpenBehandling);
        console.log(behandlingId);
        if (åpenBehandling) {
            return åpenBehandling;
        } else if (behandlingId) {
            tilFeilside();
            return undefined;
        } else if (aktivBehandling) {
            return aktivBehandling;
        } else {
            return undefined;
        }
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
        })
            .then((hentetLogg: Ressurs<ILogg[]>) => {
                settFagsakRessurser({ ...fagsakRessurser, logg: hentetLogg });
            })
            .catch(() => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    logg: byggFeiletRessurs('Feil ved lasting av logg', 'Feil ved lasting av logg'),
                });
            });
    };

    const settFagsak = (modifisertFagsak: Ressurs<IFagsak>): void =>
        settFagsakRessurser({ ...fagsakRessurser, fagsak: modifisertFagsak });

    const hentStegPåÅpenBehandling = (): BehandlingSteg | undefined => {
        return fagsakRessurser.åpenBehandling?.steg;
    };

    const erLesevisning = (): boolean => {
        const rolle = hentSaksbehandlerRolle();
        const steg = hentStegPåÅpenBehandling();
        const stegNummer: BehandlingSteg = steg && BehandlingSteg[steg];
        if (
            rolle &&
            rolle >= BehandlerRolle.SAKSBEHANDLER &&
            !(stegNummer >= BehandlingSteg.BESLUTTE_VEDTAK)
        ) {
            return false;
        } else if (rolle && rolle >= BehandlerRolle.VEILEDER) {
            return true;
        } else {
            tilFeilside();
            return true;
        }
    };

    return {
        bruker: fagsakRessurser.bruker,
        fagsak: fagsakRessurser.fagsak,
        åpenBehandling: fagsakRessurser.åpenBehandling,
        erLesevisning,
        hentStegPåÅpenBehandling,
        hentFagsak,
        hentLogg,
        logg: fagsakRessurser.logg,
        ressurser: fagsakRessurser,
        settFagsak,
    };
});

export { FagsakProvider, useFagsakRessurser };
