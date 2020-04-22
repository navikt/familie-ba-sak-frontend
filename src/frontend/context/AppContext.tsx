import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import { håndterRessurs, loggFeil, preferredAxios } from '../api/axios';
import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { BehandlerRolle } from '../typer/behandling';

export interface IModal {
    content: string;
    lukkKnapp: boolean;
    onClose?: () => void;
    tittel: string;
    actions?: JSX.Element[] | JSX.Element;
    visModal: boolean;
}

const initalState: IModal = {
    content: '',
    lukkKnapp: true,
    tittel: '',
    visModal: false,
};

interface IProps {
    innloggetSaksbehandler: ISaksbehandler | undefined;
}

const [AppProvider, useApp] = createUseContext(({ innloggetSaksbehandler }: IProps) => {
    const [autentisert, settAutentisert] = React.useState(true);
    const [modal, settModal] = React.useState<IModal>(initalState);

    const åpneModal = () => {
        settModal({
            ...modal,
            visModal: true,
        });
    };

    const lukkModal = () => {
        settModal(initalState);
    };

    const axiosRequest = async <T, D>(
        config: AxiosRequestConfig & { data?: D }
    ): Promise<Ressurs<T>> => {
        return preferredAxios
            .request(config)
            .then((response: AxiosResponse<Ressurs<T>>) => {
                const responsRessurs: Ressurs<T> = response.data;

                return håndterRessurs(responsRessurs, innloggetSaksbehandler);
            })
            .catch((error: AxiosError) => {
                if (error.message.includes('401')) {
                    settAutentisert(false);
                }
                loggFeil(error, innloggetSaksbehandler);

                const responsRessurs: Ressurs<T> = error.response?.data;
                return håndterRessurs(responsRessurs, innloggetSaksbehandler);
            });
    };

    const gruppeIdTilRolle = (gruppeId: string) => {
        switch (gruppeId) {
            case '199c2b39-e535-4ae8-ac59-8ccbee7991ae':
                return BehandlerRolle.VEILEDER;
            case '847e3d72-9dc1-41c3-80ff-f5d4acdd5d46':
                return BehandlerRolle.SAKSBEHANDLER;
            case '7a271f87-39fb-468b-a9ee-6cf3c070f548':
                return BehandlerRolle.BESLUTTER;
            default:
                return BehandlerRolle.SYSTEM;
        }
    };

    const hentSaksbehandlerRolle = (): BehandlerRolle | undefined => {
        let rolle = BehandlerRolle.SYSTEM;
        if (innloggetSaksbehandler && innloggetSaksbehandler.groups) {
            innloggetSaksbehandler.groups.forEach(id => {
                rolle = rolle < gruppeIdTilRolle(id) ? gruppeIdTilRolle(id) : rolle;
            });
            return rolle;
        }
    };

    return {
        axiosRequest,
        hentSaksbehandlerRolle,
        autentisert,
        åpneModal,
        lukkModal,
        modal,
        settModal,
    };
});

export { AppProvider, useApp };
