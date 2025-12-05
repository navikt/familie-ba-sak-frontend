import React, { createContext, type PropsWithChildren, useEffect, useState, type JSX } from 'react';

import type { AxiosRequestConfig } from 'axios';

import { BodyShort, Button, HStack } from '@navikt/ds-react';
import { loggFeil, useHttp } from '@navikt/familie-http';
import type { ISaksbehandler, Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useAuthContext } from './AuthContext';
import StatusIkon, { Status } from '../ikoner/StatusIkon';
import type { IToast, ToastTyper } from '../komponenter/Toast/typer';
import { BehandlerRolle } from '../typer/behandling';
import type { IPersonInfo, IRestTilgang } from '../typer/person';
import { adressebeskyttelsestyper } from '../typer/person';
import type { IToggles } from '../typer/toggles';
import { alleTogglerAv, ToggleNavn } from '../typer/toggles';
import { gruppeIdTilRolle, gruppeIdTilSuperbrukerRolle } from '../utils/behandling';
import { tilFeilside } from '../utils/commons';

export type FamilieAxiosRequestConfig<D> = AxiosRequestConfig & {
    data?: D;
    påvirkerSystemLaster?: boolean;
};

export interface IModal {
    actions?: JSX.Element[] | JSX.Element;
    innhold?: () => React.ReactNode;
    onClose?: () => void;
    tittel: string;
    visModal: boolean;
}

const initalState: IModal = {
    tittel: '',
    visModal: false,
};

const tilgangModal = (data: IRestTilgang, lukkModal: () => void) => ({
    tittel: 'Diskresjonskode',
    visModal: !data.saksbehandlerHarTilgang,
    onClose: () => lukkModal(),
    innhold: () => {
        return (
            <HStack gap="4" align="center" marginBlock="2">
                <StatusIkon status={Status.FEIL} />
                <BodyShort>
                    {`Bruker har diskresjonskode ${adressebeskyttelsestyper[data.adressebeskyttelsegradering]}`}
                </BodyShort>
            </HStack>
        );
    },
    actions: [<Button key="lukk" variant="primary" size="small" onClick={lukkModal} children="Lukk" />],
});

interface AppContextValue {
    autentisert: boolean;
    hentSaksbehandlerRolle: () => BehandlerRolle;
    innloggetSaksbehandler: ISaksbehandler | undefined;
    harInnloggetSaksbehandlerSkrivetilgang: () => boolean;
    harInnloggetSaksbehandlerSuperbrukerTilgang: () => boolean | undefined;
    appInfoModal: IModal;
    settToast: (toastId: ToastTyper, toast: IToast) => void;
    settToasts: React.Dispatch<React.SetStateAction<{ [toastId: string]: IToast }>>;
    sjekkTilgang: (brukerIdent: string, visSystemetLaster?: boolean) => Promise<boolean>;
    systemetLaster: () => boolean;
    toasts: { [toastId: string]: IToast };
    toggles: IToggles;
    hentPerson: (brukerIdent: string) => Promise<Ressurs<IPersonInfo>>;
    skalObfuskereData: boolean;
    erTogglesHentet: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppProvider = (props: PropsWithChildren) => {
    const { autentisert, innloggetSaksbehandler } = useAuthContext();
    const { request, systemetLaster } = useHttp();

    const [toggles, settToggles] = useState<IToggles>(alleTogglerAv());

    const [appInfoModal, settAppInfoModal] = React.useState<IModal>(initalState);
    const [toasts, settToasts] = useState<{ [toastId: string]: IToast }>({});
    const [erTogglesHentet, settErTogglesHentet] = useState(false);

    useEffect(() => {
        request<string[], IToggles>({
            method: 'POST',
            url: '/familie-ba-sak/api/feature/er-toggler-enabled',
            data: Object.values(ToggleNavn),
        }).then((response: Ressurs<IToggles>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settToggles(response.data);
            } else {
                settToggles(alleTogglerAv);
            }
            settErTogglesHentet(true);
        });
    }, []);

    const lukkModal = () => {
        settAppInfoModal(initalState);
    };

    const hentPerson = async (brukerIdent: string): Promise<Ressurs<IPersonInfo>> => {
        return request<{ ident: string }, IPersonInfo>({
            method: 'POST',
            url: '/familie-ba-sak/api/person/enkel',
            data: {
                ident: brukerIdent,
            },
        }).then((ressurs: Ressurs<IPersonInfo>) => {
            if ('data' in ressurs && ressurs.data.harTilgang === false) {
                settAppInfoModal(
                    tilgangModal(
                        {
                            saksbehandlerHarTilgang: false,
                            adressebeskyttelsegradering: ressurs.data.adressebeskyttelseGradering,
                        },
                        lukkModal
                    )
                );
            }
            return ressurs;
        });
    };

    const sjekkTilgang = async (brukerIdent: string, visSystemetLaster = true): Promise<boolean> => {
        return request<{ brukerIdent: string }, IRestTilgang>({
            method: 'POST',
            url: '/familie-ba-sak/api/tilgang',
            data: { brukerIdent },
            påvirkerSystemLaster: visSystemetLaster,
        }).then((ressurs: Ressurs<IRestTilgang>) => {
            if (ressurs.status === RessursStatus.SUKSESS) {
                settAppInfoModal(tilgangModal(ressurs.data, lukkModal));
                return ressurs.data.saksbehandlerHarTilgang;
            } else {
                return false;
            }
        });
    };

    const hentSaksbehandlerRolle = (): BehandlerRolle => {
        let rolle = BehandlerRolle.UKJENT;
        if (innloggetSaksbehandler && innloggetSaksbehandler.groups) {
            innloggetSaksbehandler.groups.forEach((id: string) => {
                rolle = rolle < gruppeIdTilRolle(id) ? gruppeIdTilRolle(id) : rolle;
            });
        }

        if (innloggetSaksbehandler && rolle === BehandlerRolle.UKJENT) {
            loggFeil(
                undefined,
                innloggetSaksbehandler,
                'Saksbehandler tilhører ingen av de definerte tilgangsgruppene.'
            );
            tilFeilside();
        }

        return rolle;
    };

    const harInnloggetSaksbehandlerSkrivetilgang = () => {
        const rolle = hentSaksbehandlerRolle();

        return rolle >= BehandlerRolle.SAKSBEHANDLER;
    };

    const harInnloggetSaksbehandlerSuperbrukerTilgang = () =>
        innloggetSaksbehandler?.groups?.includes(gruppeIdTilSuperbrukerRolle);

    const skalObfuskereData = toggles[ToggleNavn.skalObfuskereData] && !harInnloggetSaksbehandlerSkrivetilgang();

    return (
        <AppContext.Provider
            value={{
                autentisert,
                hentSaksbehandlerRolle,
                innloggetSaksbehandler,
                harInnloggetSaksbehandlerSkrivetilgang,
                harInnloggetSaksbehandlerSuperbrukerTilgang,
                appInfoModal,
                settToast: (toastId: ToastTyper, toast: IToast) =>
                    settToasts({
                        ...toasts,
                        [toastId]: toast,
                    }),
                settToasts,
                sjekkTilgang,
                systemetLaster,
                toasts,
                toggles,
                hentPerson,
                skalObfuskereData,
                erTogglesHentet,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext må brukes innenfor AppProvider');
    }
    return context;
};

export { AppProvider, useAppContext };
