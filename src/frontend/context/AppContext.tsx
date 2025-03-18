import React, { type PropsWithChildren, useEffect, useState } from 'react';

import type { AxiosRequestConfig } from 'axios';
import createUseContext from 'constate';

import { Alert, BodyShort, Button, HStack } from '@navikt/ds-react';
import { HttpProvider, loggFeil, useHttp } from '@navikt/familie-http';
import type { ISaksbehandler, Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import StatusIkon, { Status } from '../ikoner/StatusIkon';
import type { IToast, ToastTyper } from '../komponenter/Felleskomponenter/Toast/typer';
import { BehandlerRolle } from '../typer/behandling';
import type { IPersonInfo, IRestTilgang } from '../typer/person';
import { adressebeskyttelsestyper } from '../typer/person';
import type { IToggles } from '../typer/toggles';
import { alleTogglerAv, ToggleNavn } from '../typer/toggles';
import { gruppeIdTilRolle, gruppeIdTilSuperbrukerRolle } from '../utils/behandling';
import { tilFeilside } from '../utils/commons';

const FEM_MINUTTER = 300000;

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

interface IProps extends PropsWithChildren {
    autentisertSaksbehandler: ISaksbehandler | undefined;
}

interface AuthProviderExports {
    autentisert: boolean;
    settAutentisert: (autentisert: boolean) => void;
    innloggetSaksbehandler: ISaksbehandler | undefined;
}

const tilgangModal = (data: IRestTilgang, lukkModal: () => void) => ({
    tittel: 'Diskresjonskode',
    visModal: !data.saksbehandlerHarTilgang,
    onClose: () => lukkModal(),
    innhold: () => {
        return (
            <HStack gap="4" align="center" marginBlock="2">
                <StatusIkon status={Status.FEIL} />
                <BodyShort>
                    {`Bruker har diskresjonskode ${
                        adressebeskyttelsestyper[data.adressebeskyttelsegradering]
                    }`}
                </BodyShort>
            </HStack>
        );
    },
    actions: [
        <Button key="lukk" variant="primary" size="small" onClick={lukkModal} children="Lukk" />,
    ],
});

const [AuthProvider, useAuth] = createUseContext(
    ({ autentisertSaksbehandler }: IProps): AuthProviderExports => {
        const [autentisert, settAutentisert] = React.useState(true);
        const [innloggetSaksbehandler, settInnloggetSaksbehandler] =
            React.useState(autentisertSaksbehandler);

        useEffect(() => {
            if (autentisertSaksbehandler) {
                settInnloggetSaksbehandler(autentisertSaksbehandler);
            }
        }, [autentisertSaksbehandler]);

        return { autentisert, settAutentisert, innloggetSaksbehandler };
    }
);

const [AppContentProvider, useApp] = createUseContext(() => {
    const { autentisert, innloggetSaksbehandler } = useAuth();
    const { request, systemetLaster } = useHttp();

    const [toggles, settToggles] = useState<IToggles>(alleTogglerAv());
    const [appVersjon, settAppVersjon] = useState('');

    const [appInfoModal, settAppInfoModal] = React.useState<IModal>(initalState);
    const [toasts, settToasts] = useState<{ [toastId: string]: IToast }>({});
    const [erTogglesHentet, settErTogglesHentet] = useState(false);

    const verifiserVersjon = () => {
        request<void, string>({
            url: '/version',
            method: 'GET',
        }).then((versjon: Ressurs<string>) => {
            if (versjon.status === RessursStatus.SUKSESS) {
                if (appVersjon !== '' && appVersjon !== versjon.data) {
                    settAppInfoModal({
                        tittel: 'Løsningen er utdatert',
                        innhold: () => {
                            return (
                                <Alert variant={'info'} inline>
                                    Det finnes en oppdatert versjon av løsningen. Det anbefales at
                                    du oppdaterer med en gang.
                                </Alert>
                            );
                        },
                        visModal: true,
                        onClose: () => lukkModal(),
                        actions: [
                            <Button
                                key={'oppdater'}
                                variant="primary"
                                size="small"
                                onClick={() => {
                                    window.location.reload();
                                }}
                                children={'Ok, oppdater'}
                            />,
                            <Button
                                key={'avbryt'}
                                variant="tertiary"
                                size="small"
                                onClick={() => lukkModal()}
                                children={'Avbryt'}
                            />,
                        ],
                    });
                }

                settAppVersjon(versjon.data);
            }
        });

        setTimeout(() => {
            verifiserVersjon();
        }, FEM_MINUTTER);
    };

    useEffect(() => verifiserVersjon(), []);

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

    const sjekkTilgang = async (
        brukerIdent: string,
        visSystemetLaster = true
    ): Promise<boolean> => {
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

    const skalObfuskereData =
        toggles[ToggleNavn.skalObfuskereData] && !harInnloggetSaksbehandlerSkrivetilgang();

    return {
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
    };
});

const AuthOgHttpProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { innloggetSaksbehandler, settAutentisert } = useAuth();

    return (
        <HttpProvider
            innloggetSaksbehandler={innloggetSaksbehandler}
            settAutentisert={settAutentisert}
        >
            <AppContentProvider>{children}</AppContentProvider>
        </HttpProvider>
    );
};

const AppProvider: React.FC<IProps> = ({ autentisertSaksbehandler, children }) => {
    return (
        <AuthProvider autentisertSaksbehandler={autentisertSaksbehandler}>
            <AuthOgHttpProvider children={children} />
        </AuthProvider>
    );
};

export { AppProvider, useApp };
