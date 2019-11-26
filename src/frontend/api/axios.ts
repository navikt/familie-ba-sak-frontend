import { captureException, configureScope, withScope } from '@sentry/core';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { byggFeiletRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { slackKanaler } from '../typer/slack';

axios.defaults.baseURL = window.location.origin;
export const preferredAxios = axios;

export const axiosRequest = async <T>(
    config: AxiosRequestConfig,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<T>> => {
    return preferredAxios
        .request(config)
        .then((response: AxiosResponse<Ressurs<T>>) => {
            const responsRessurs: Ressurs<T> = response.data;

            let typetRessurs: Ressurs<T> = {
                status: RessursStatus.IKKE_HENTET,
            };

            switch (responsRessurs.status) {
                case RessursStatus.SUKSESS:
                    typetRessurs = {
                        data: responsRessurs.data,
                        status: RessursStatus.SUKSESS,
                    };
                    break;
                case RessursStatus.IKKE_TILGANG:
                    loggFeil(undefined, innloggetSaksbehandler, responsRessurs.melding);
                    typetRessurs = {
                        melding: responsRessurs.melding,
                        status: RessursStatus.IKKE_TILGANG,
                    };
                    break;
                case RessursStatus.FEILET:
                    loggFeil(undefined, innloggetSaksbehandler, responsRessurs.melding);
                    typetRessurs = {
                        errorMelding: responsRessurs.errorMelding,
                        melding: responsRessurs.melding,
                        status: RessursStatus.FEILET,
                    };
                    break;
                default:
                    typetRessurs = {
                        melding: 'Ukjent api feil',
                        status: RessursStatus.FEILET,
                    };
                    break;
            }

            return typetRessurs;
        })
        .catch((error: AxiosError) => {
            loggFeil(error, innloggetSaksbehandler);

            return byggFeiletRessurs<T>('Ukjent api feil', error);
        });
};

const loggFeil = (
    error?: AxiosError,
    innloggetSaksbehandler?: ISaksbehandler,
    feilmelding?: string
) => {
    if (process.env.NODE_ENV !== 'development') {
        configureScope(scope => {
            scope.setUser({
                username: innloggetSaksbehandler
                    ? innloggetSaksbehandler.displayName
                    : 'Ukjent bruker',
            });
        });

        const response: AxiosResponse | undefined = error ? error.response : undefined;
        if (response) {
            withScope(scope => {
                scope.setExtra('nav-call-id', response.headers['nav-call-id']);
                scope.setExtra('status text', response.statusText);
                scope.setExtra('status', response.status);

                captureException(error);
            });
        }

        slackNotify(
            `En feil har oppstått i barnetrygd vedtaksløsning!${
                error ? `\n*Error*: ${error}` : ''
            }${feilmelding ? `\n*Feilmelding:* ${feilmelding}` : ''}`,
            slackKanaler.alert
        );
    }
};

export const slackNotify = (melding: string, kanal: string) => {
    return preferredAxios.post(`/slack/notify/${kanal}`, {
        melding,
    });
};
