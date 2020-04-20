import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import { håndterRessurs, loggFeil, preferredAxios } from '../api/axios';
import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';

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

    return {
        axiosRequest,
        innloggetSaksbehandler,
        autentisert,
        åpneModal,
        lukkModal,
        modal,
        settModal,
    };
});

export { AppProvider, useApp };
