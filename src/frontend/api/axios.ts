import { Ressurs, RessursStatus } from '../typer/ressurs';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { captureException, configureScope, withScope } from '@sentry/core';

import { ISaksbehandler } from '../typer/saksbehandler';
import { slackKanaler } from '../typer/slack';

axios.defaults.baseURL = window.location.origin;
export const preferredAxios = axios;

export const håndterRessurs = <T>(
    ressurs: Ressurs<T>,
    innloggetSaksbehandler?: ISaksbehandler
): Ressurs<T> => {
    let typetRessurs: Ressurs<T> = {
        status: RessursStatus.IKKE_HENTET,
    };

    switch (ressurs.status) {
        case RessursStatus.SUKSESS:
            typetRessurs = {
                data: ressurs.data,
                status: RessursStatus.SUKSESS,
            };
            break;
        case RessursStatus.IKKE_TILGANG:
            loggFeil(undefined, innloggetSaksbehandler, ressurs.melding);
            typetRessurs = {
                melding: ressurs.melding,
                status: RessursStatus.IKKE_TILGANG,
            };
            break;
        case RessursStatus.FEILET:
            loggFeil(undefined, innloggetSaksbehandler, ressurs.melding);
            typetRessurs = {
                errorMelding: ressurs.errorMelding,
                melding: ressurs.melding,
                frontendFeilmelding: ressurs.frontendFeilmelding,
                status: RessursStatus.FEILET,
            };
            break;
        default:
            typetRessurs = {
                melding: 'Mest sannsynlig ukjent api feil',
                frontendFeilmelding: 'En feil har oppstått!',
                status: RessursStatus.FEILET,
            };
            break;
    }

    return typetRessurs;
};

export const loggFeil = (
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

        apiLoggFeil(
            `${error ? `${error}${feilmelding ? ' - ' : ''}` : ''}${
                feilmelding ? `Feilmelding: ${feilmelding}` : ''
            }`
        );

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

export const apiLoggFeil = (melding: string) => {
    return preferredAxios.post('/logg-feil', {
        melding,
    });
};
