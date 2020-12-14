import { captureException, configureScope, withScope } from '@sentry/core';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Ressurs, RessursStatus, ApiRessurs } from '@navikt/familie-typer';
import { ISaksbehandler } from '@navikt/familie-typer';

axios.defaults.baseURL = window.location.origin;
export const preferredAxios = axios;

export const håndterApiRessurs = <T>(
    ressurs?: ApiRessurs<T>,
    innloggetSaksbehandler?: ISaksbehandler
): Ressurs<T> => {
    let typetRessurs: Ressurs<T>;

    if (!ressurs) {
        return {
            frontendFeilmelding: 'En feil har oppstått!',
            status: RessursStatus.FEILET,
        };
    }

    switch (ressurs.status) {
        case RessursStatus.SUKSESS:
            typetRessurs = {
                data: ressurs.data,
                status: RessursStatus.SUKSESS,
            };
            break;
        case RessursStatus.IKKE_TILGANG:
            typetRessurs = {
                frontendFeilmelding: ressurs.frontendFeilmelding ?? 'Ikke tilgang',
                status: RessursStatus.IKKE_TILGANG,
            };
            break;
        case RessursStatus.FEILET:
            loggFeil(undefined, innloggetSaksbehandler, ressurs.melding);
            typetRessurs = {
                frontendFeilmelding: ressurs.frontendFeilmelding ?? 'En feil har oppstått!',
                status: RessursStatus.FEILET,
            };
            break;
        case RessursStatus.FUNKSJONELL_FEIL:
            typetRessurs = {
                frontendFeilmelding:
                    ressurs.frontendFeilmelding ?? 'En funksjonell feil har oppstått!',
                status: RessursStatus.FUNKSJONELL_FEIL,
            };
            break;
        default:
            typetRessurs = {
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
): void => {
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
                scope.setExtra('feilmelding', feilmelding);

                captureException(error);
            });
        }
    }
};

export const apiLoggFeil = (melding: string) => {
    return preferredAxios.post('/logg-feil', {
        melding,
    });
};
