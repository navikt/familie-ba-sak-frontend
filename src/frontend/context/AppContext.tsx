import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import createUseContext from 'constate';
import React, { useEffect } from 'react';

import { håndterApiRessurs, loggFeil, preferredAxios } from '../api/axios';
import { Ressurs, ApiRessurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { BehandlerRolle } from '../typer/behandling';
import { gruppeIdTilRolle } from '../utils/behandling';

export interface IModal {
    className?: string;
    lukkKnapp: boolean;
    onClose?: () => void;
    tittel: string;
    actions?: JSX.Element[] | JSX.Element;
    visModal: boolean;
}

const initalState: IModal = {
    lukkKnapp: true,
    tittel: '',
    visModal: false,
};

interface IProps {
    autentisertSaksbehandler: ISaksbehandler | undefined;
}

const [AppProvider, useApp] = createUseContext(({ autentisertSaksbehandler }: IProps) => {
    const [autentisert, settAutentisert] = React.useState(true);
    const [innloggetSaksbehandler, settInnloggetSaksbehandler] = React.useState(
        autentisertSaksbehandler
    );
    const [modal, settModal] = React.useState<IModal>(initalState);

    useEffect(() => {
        settInnloggetSaksbehandler(autentisertSaksbehandler);
    }, [autentisertSaksbehandler]);

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
            .then((response: AxiosResponse<ApiRessurs<T>>) => {
                const responsRessurs: ApiRessurs<T> = response.data;

                return håndterApiRessurs(responsRessurs, innloggetSaksbehandler);
            })
            .catch((error: AxiosError) => {
                if (error.message.includes('401')) {
                    settAutentisert(false);
                }
                loggFeil(error, innloggetSaksbehandler);

                const responsRessurs: ApiRessurs<T> = error.response?.data;
                return håndterApiRessurs(responsRessurs, innloggetSaksbehandler);
            });
    };

    const hentSaksbehandlerRolle = (): BehandlerRolle | undefined => {
        let rolle = BehandlerRolle.SYSTEM;
        if (innloggetSaksbehandler && innloggetSaksbehandler.groups) {
            innloggetSaksbehandler.groups.forEach(id => {
                rolle = rolle < gruppeIdTilRolle(id) ? gruppeIdTilRolle(id) : rolle;
            });
            return rolle;
        }
        loggFeil(
            undefined,
            innloggetSaksbehandler,
            'Saksbehandler tilhører ingen av de definerte tilgangsgruppene.'
        );
    };

    return {
        axiosRequest,
        hentSaksbehandlerRolle,
        autentisert,
        innloggetSaksbehandler,
        åpneModal,
        lukkModal,
        modal,
        settModal,
    };
});

export { AppProvider, useApp };
