import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';
import { useParams } from 'react-router';
import { BehandlerRolle, BehandlingSteg, IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { ILogg } from '../typer/logg';
import { IPerson } from '../typer/person';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '../typer/ressurs';
import { tilFeilside } from '../utils/commons';
import { hentAktivBehandlingPåFagsak, hentBehandlingPåFagsak } from '../utils/fagsak';
import { useApp } from './AppContext';
import { useHistory } from 'react-router';

interface IHovedRessurser {
    bruker: Ressurs<IPerson>;
    fagsak: Ressurs<IFagsak>;
    logg: Ressurs<ILogg[]>;
    åpenBehandling: Ressurs<IBehandling>;
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
    åpenBehandling: {
        status: RessursStatus.IKKE_HENTET,
    },
};

const [FagsakProvider, useFagsakRessurser] = createUseContext(() => {
    const [fagsakRessurser, settFagsakRessurser] = React.useState<IHovedRessurser>(initialState);
    const { axiosRequest, hentSaksbehandlerRolle } = useApp();
    const { behandlingId } = useParams();
    const { history } = useHistory();

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
            åpenBehandling: {
                status: RessursStatus.HENTER,
            },
        });
        axiosRequest<IFagsak, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}`,
        })
            .then((hentetFagsak: Ressurs<IFagsak>) => {
                const aktivBehandling =
                    hentetFagsak.status === RessursStatus.SUKSESS &&
                    hentAktivBehandlingPåFagsak(hentetFagsak.data);
                if (aktivBehandling && !behandlingId) {
                    history.push();
                }
                const åpenBehandling =
                    hentetFagsak.status === RessursStatus.SUKSESS &&
                    hentBehandlingPåFagsak(hentetFagsak.data, parseInt(behandlingId));

                settFagsakRessurser({
                    ...fagsakRessurser,
                    fagsak: hentetFagsak,
                    åpenBehandling: åpenBehandling
                        ? byggDataRessurs(åpenBehandling)
                        : byggTomRessurs(),
                });
            })
            .catch((error: AxiosError) => {
                settFagsakRessurser({
                    ...fagsakRessurser,
                    fagsak: byggFeiletRessurs('Ukjent ved innhenting av fagsak', error),
                    åpenBehandling: byggFeiletRessurs('Ukjent ved innhenting av fagsak', error),
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

    const hentStegPåÅpenBehandling = (): BehandlingSteg | undefined => {
        return fagsakRessurser.åpenBehandling.status === RessursStatus.SUKSESS
            ? fagsakRessurser.åpenBehandling.data.steg
            : undefined;
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
