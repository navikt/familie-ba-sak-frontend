import React, { createContext, type JSX, type PropsWithChildren, useState } from 'react';

import type { AxiosRequestConfig } from 'axios';

import { BodyShort, Button, HStack } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useFeatureToggles } from '../hooks/useFeatureToggles';
import { useSaksbehandler } from '../hooks/useSaksbehandler';
import StatusIkon, { Status } from '../ikoner/StatusIkon';
import type { IToast, ToastTyper } from '../komponenter/Toast/typer';
import { FeatureToggle } from '../typer/featureToggles';
import type { IPersonInfo, IRestTilgang } from '../typer/person';
import { adressebeskyttelsestyper } from '../typer/person';

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
            <HStack gap="space-16" align="center" marginBlock="space-8">
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
    appInfoModal: IModal;
    settToast: (toastId: ToastTyper, toast: IToast) => void;
    settToasts: React.Dispatch<React.SetStateAction<{ [toastId: string]: IToast }>>;
    sjekkTilgang: (brukerIdent: string, visSystemetLaster?: boolean) => Promise<boolean>;
    toasts: { [toastId: string]: IToast };
    hentPerson: (brukerIdent: string) => Promise<Ressurs<IPersonInfo>>;
    skalObfuskereData: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppProvider = (props: PropsWithChildren) => {
    const { request } = useHttp();
    const toggles = useFeatureToggles();

    const [appInfoModal, settAppInfoModal] = React.useState<IModal>(initalState);
    const [toasts, settToasts] = useState<{ [toastId: string]: IToast }>({});

    const saksbehandler = useSaksbehandler();

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

    const skalObfuskereData = toggles[FeatureToggle.skalObfuskereData] && !saksbehandler.harSkrivetilgang;

    return (
        <AppContext.Provider
            value={{
                appInfoModal,
                settToast: (toastId: ToastTyper, toast: IToast) =>
                    settToasts({
                        ...toasts,
                        [toastId]: toast,
                    }),
                settToasts,
                sjekkTilgang,
                toasts,
                hentPerson,
                skalObfuskereData,
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
