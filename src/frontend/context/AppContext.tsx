import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import createUseContext from 'constate';

import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { HttpProvider, useHttp } from '@navikt/familie-http';
import { ISaksbehandler } from '@navikt/familie-typer';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { loggFeil } from '../api/axios';
import IkkeTilgang from '../ikoner/IkkeTilgang';
import InformasjonSirkel from '../ikoner/InformasjonSirkel';
import { BehandlerRolle } from '../typer/behandling';
import { adressebeskyttelsestyper, IRestTilgang } from '../typer/person';
import { IToggles, alleTogglerAv, ToggleNavn } from '../typer/toggles';
import { gruppeIdTilRolle } from '../utils/behandling';
import { tilFeilside } from '../utils/commons';

const FEM_MINUTTER = 300000;

export type FamilieAxiosRequestConfig<D> = AxiosRequestConfig & {
    data?: D;
    påvirkerSystemLaster?: boolean;
};

export interface IModal {
    actions?: JSX.Element[] | JSX.Element;
    className?: string;
    innhold?: () => React.ReactNode;
    lukkKnapp: boolean;
    onClose?: () => void;
    style?: CSSProperties;
    tittel: ReactNode;
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

interface AuthProviderExports {
    autentisert: boolean;
    settAutentisert: (autentisert: boolean) => void;
    innloggetSaksbehandler: ISaksbehandler | undefined;
}

const [AuthProvider, useAuth] = createUseContext(
    ({ autentisertSaksbehandler }: IProps): AuthProviderExports => {
        const [autentisert, settAutentisert] = React.useState(true);
        const [innloggetSaksbehandler, settInnloggetSaksbehandler] = React.useState(
            autentisertSaksbehandler
        );

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

    const [modal, settModal] = React.useState<IModal>(initalState);

    const verifiserVersjon = () => {
        request<void, string>({
            url: '/version',
            method: 'GET',
        }).then((versjon: Ressurs<string>) => {
            if (versjon.status === RessursStatus.SUKSESS) {
                if (appVersjon !== '' && appVersjon !== versjon.data) {
                    settModal({
                        tittel: 'Løsningen er utdatert',
                        innhold: () => {
                            return (
                                <div className={'utdatert-losning'}>
                                    <InformasjonSirkel />
                                    <Normaltekst>
                                        Det finnes en oppdatert versjon av løsningen. Det anbefales
                                        at du oppdaterer med en gang.
                                    </Normaltekst>
                                </div>
                            );
                        },
                        lukkKnapp: true,
                        visModal: true,
                        onClose: () => lukkModal(),
                        actions: [
                            <Knapp
                                key={'avbryt'}
                                mini={true}
                                onClick={() => lukkModal()}
                                children={'Avbryt'}
                            />,
                            <Knapp
                                key={'oppdater'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => {
                                    window.location.reload();
                                }}
                                children={'Ok, oppdater'}
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
            url: '/familie-ba-sak/api/feature',
            data: Object.values(ToggleNavn),
            påvirkerSystemLaster: true,
        }).then((response: Ressurs<IToggles>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settToggles(response.data);
            } else {
                settToggles(alleTogglerAv);
            }
        });
    }, []);

    const åpneModal = () => {
        settModal({
            ...modal,
            visModal: true,
        });
    };

    const lukkModal = () => {
        settModal(initalState);
    };

    const sjekkTilgang = async (brukerIdent: string): Promise<boolean> => {
        return request<{ brukerIdent: string }, IRestTilgang>({
            method: 'POST',
            url: '/familie-ba-sak/api/tilgang',
            data: { brukerIdent },
            påvirkerSystemLaster: true,
        }).then((ressurs: Ressurs<IRestTilgang>) => {
            if (ressurs.status === RessursStatus.SUKSESS) {
                settModal({
                    tittel: 'Diskresjonskode',
                    lukkKnapp: true,
                    visModal: !ressurs.data.saksbehandlerHarTilgang,
                    onClose: () => lukkModal(),
                    innhold: () => {
                        return (
                            <Normaltekst>
                                <IkkeTilgang
                                    heigth={20}
                                    className={'tilgangmodal-ikke-oppfylt-ikon'}
                                    width={20}
                                />
                                {`Bruker har diskresjonskode ${
                                    adressebeskyttelsestyper[
                                        ressurs.data.adressebeskyttelsegradering
                                    ]
                                }`}
                            </Normaltekst>
                        );
                    },
                    actions: [
                        <Knapp
                            key={'lukk'}
                            type={'hoved'}
                            mini={true}
                            onClick={lukkModal}
                            children={'Lukk'}
                        />,
                    ],
                });
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

    return {
        autentisert,
        hentSaksbehandlerRolle,
        innloggetSaksbehandler,
        harInnloggetSaksbehandlerSkrivetilgang,
        lukkModal,
        modal,
        settModal,
        sjekkTilgang,
        systemetLaster,
        toggles,
        åpneModal,
    };
});

const AuthOgHttpProvider: React.FC = ({ children }) => {
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

export { AppProvider, useApp, useAuth };
