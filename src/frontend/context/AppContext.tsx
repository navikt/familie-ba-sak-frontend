import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import createUseContext from 'constate';
import React, { useEffect, useState } from 'react';

import { håndterApiRessurs, loggFeil, preferredAxios } from '../api/axios';
import { Ressurs, ApiRessurs, RessursStatus } from '@navikt/familie-typer';
import { ISaksbehandler } from '@navikt/familie-typer';
import { BehandlerRolle } from '../typer/behandling';
import { gruppeIdTilRolle } from '../utils/behandling';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import InformasjonSirkel from '../ikoner/InformasjonSirkel';
import { adressebeskyttelsestyper, IRestTilgang } from '../typer/person';
import IkkeTilgang from '../ikoner/IkkeTilgang';

const FEM_MINUTTER = 300000;

export interface IModal {
    actions?: JSX.Element[] | JSX.Element;
    className?: string;
    innhold?: () => React.ReactNode;
    lukkKnapp: boolean;
    onClose?: () => void;
    tittel: string;
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
    const [appVersjon, settAppVersjon] = useState('');
    const [ressurserSomLaster, settRessurserSomLaster] = React.useState<string[]>([]);

    const [innloggetSaksbehandler, settInnloggetSaksbehandler] = React.useState(
        autentisertSaksbehandler
    );
    const [modal, settModal] = React.useState<IModal>(initalState);

    const verifiserVersjon = () => {
        axiosRequest<string, void>({
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
        if (autentisertSaksbehandler) {
            settInnloggetSaksbehandler(autentisertSaksbehandler);
        }
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

    const sjekkTilgang = async (brukerIdent: string): Promise<boolean> => {
        return axiosRequest<IRestTilgang, { brukerIdent: string }>({
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
                });
                return ressurs.data.saksbehandlerHarTilgang;
            } else {
                return false;
            }
        });
    };

    const axiosRequest = async <T, D>(
        config: AxiosRequestConfig & { data?: D; påvirkerSystemLaster?: boolean }
    ): Promise<Ressurs<T>> => {
        const ressursId = `${config.method}_${config.url}`;
        config.påvirkerSystemLaster && settRessurserSomLaster([...ressurserSomLaster, ressursId]);

        return preferredAxios
            .request(config)
            .then((response: AxiosResponse<ApiRessurs<T>>) => {
                const responsRessurs: ApiRessurs<T> = response.data;

                config.påvirkerSystemLaster && fjernRessursSomLaster(ressursId);
                return håndterApiRessurs(responsRessurs, innloggetSaksbehandler);
            })
            .catch((error: AxiosError) => {
                if (error.message.includes('401')) {
                    settAutentisert(false);
                }
                loggFeil(error, innloggetSaksbehandler);

                config.påvirkerSystemLaster && fjernRessursSomLaster(ressursId);

                const responsRessurs: ApiRessurs<T> = error.response?.data;
                return håndterApiRessurs(responsRessurs, innloggetSaksbehandler);
            });
    };

    const fjernRessursSomLaster = (ressursId: string) => {
        setTimeout(() => {
            settRessurserSomLaster((prevState: string[]) => {
                return prevState.filter((ressurs: string) => ressurs !== ressursId);
            });
        }, 300);
    };

    const hentSaksbehandlerRolle = (): BehandlerRolle | undefined => {
        let rolle = BehandlerRolle.UKJENT;
        if (innloggetSaksbehandler && innloggetSaksbehandler.groups) {
            innloggetSaksbehandler.groups.forEach((id: string) => {
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

    const systemetLaster = () => {
        return ressurserSomLaster.length > 0;
    };

    return {
        autentisert,
        axiosRequest,
        hentSaksbehandlerRolle,
        innloggetSaksbehandler,
        lukkModal,
        modal,
        settModal,
        systemetLaster,
        åpneModal,
        sjekkTilgang,
    };
});

export { AppProvider, useApp };
