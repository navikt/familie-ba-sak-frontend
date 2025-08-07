import React from 'react';

import { useNavigate } from 'react-router';

import { PersonCircleFillIcon } from '@navikt/aksel-icons';
import Endringslogg from '@navikt/familie-endringslogg';
import type { ISøkeresultat } from '@navikt/familie-header';
import { ikoner, Søk } from '@navikt/familie-header';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    kjønnType,
    RessursStatus,
} from '@navikt/familie-typer';
import { idnr } from '@navikt/fnrvalidator';

import { useAppContext } from '../../context/AppContext';
import { ModalType } from '../../context/ModalContext';
import { useModal } from '../../hooks/useModal';
import KontorIkonGrønn from '../../ikoner/KontorIkonGrønn';
import StatusIkon, { Status } from '../../ikoner/StatusIkon';
import { FagsakType } from '../../typer/fagsak';
import type { IFagsakDeltager, ISøkParam } from '../../typer/fagsakdeltager';
import { fagsakdeltagerRoller } from '../../typer/fagsakdeltager';
import { obfuskerFagsakDeltager } from '../../utils/obfuskerData';

function mapFagsakDeltagerTilIkon(fagsakDeltager: IFagsakDeltager): React.ReactNode {
    if (!fagsakDeltager.harTilgang) {
        return <StatusIkon status={Status.FEIL} />;
    }
    if (fagsakDeltager.fagsakType === FagsakType.INSTITUSJON) {
        return <KontorIkonGrønn height={'32'} width={'32'} />;
    }
    if (fagsakDeltager.fagsakType === FagsakType.SKJERMET_BARN) {
        return <PersonCircleFillIcon color={'var(--a-orange-600)'} height={'35'} width={'35'} />;
    }
    return ikoner[`${fagsakDeltager.rolle}_${fagsakDeltager.kjønn}`];
}

const FagsakDeltagerSøk: React.FC = () => {
    const { request } = useHttp();
    const { innloggetSaksbehandler } = useAppContext();
    const navigate = useNavigate();
    const { skalObfuskereData } = useAppContext();

    const [fagsakDeltagere, settFagsakDeltagere] =
        React.useState<Ressurs<IFagsakDeltager[]>>(byggTomRessurs());

    const { åpneModal } = useModal(ModalType.OPPRETT_FAGSAK);

    const fnrValidator = (verdi: string): boolean => {
        return idnr(verdi).status === 'valid';
    };

    const søk = (personIdent: string): void => {
        if (personIdent === '') {
            settFagsakDeltagere(byggTomRessurs);
            return;
        }

        if (fnrValidator(personIdent) || process.env.NODE_ENV === 'development') {
            settFagsakDeltagere(byggHenterRessurs());
            request<ISøkParam, IFagsakDeltager[]>({
                method: 'POST',
                url: 'familie-ba-sak/api/fagsaker/sok',
                data: {
                    personIdent,
                },
            })
                .then((response: Ressurs<IFagsakDeltager[]>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        if (skalObfuskereData) {
                            obfuskerFagsakDeltager(response);
                        }
                        settFagsakDeltagere(response);
                    } else if (
                        response.status === RessursStatus.FEILET ||
                        response.status === RessursStatus.FUNKSJONELL_FEIL ||
                        response.status === RessursStatus.IKKE_TILGANG
                    ) {
                        settFagsakDeltagere(response);
                    }
                })
                .catch(_ => {
                    settFagsakDeltagere(byggFeiletRessurs('Søk feilet'));
                });
        } else {
            settFagsakDeltagere(
                byggFunksjonellFeilRessurs('Ugyldig fødsels- eller d-nummer (11 siffer)')
            );
        }
    };

    const mapTilSøkeresultater = (): Ressurs<ISøkeresultat[]> => {
        return fagsakDeltagere.status === RessursStatus.SUKSESS
            ? {
                  ...fagsakDeltagere,
                  data: fagsakDeltagere.data.map((fagsakDeltager: IFagsakDeltager) => {
                      return {
                          adressebeskyttelseGradering: fagsakDeltager.adressebeskyttelseGradering,
                          fagsakId: fagsakDeltager.fagsakId,
                          harTilgang: fagsakDeltager.harTilgang,
                          navn: fagsakDeltager.navn,
                          ident: fagsakDeltager.ident,
                          ikon: mapFagsakDeltagerTilIkon(fagsakDeltager),
                          rolle: fagsakdeltagerRoller[fagsakDeltager.rolle][
                              fagsakDeltager.kjønn ?? kjønnType.UKJENT
                          ],
                      };
                  }),
              }
            : fagsakDeltagere;
    };

    return (
        <>
            <Søk
                søk={søk}
                label={'Søkefelt. Fødsels- eller D-nummer (11 siffer)'}
                placeholder={'Fødsels- eller D-nummer (11 siffer)'}
                nullstillSøkeresultater={() => settFagsakDeltagere(byggTomRessurs())}
                søkeresultater={mapTilSøkeresultater()}
                søkeresultatOnClick={søkeresultat => {
                    if (!søkeresultat) {
                        return;
                    }
                    if (søkeresultat.fagsakId) {
                        navigate(`/fagsak/${søkeresultat.fagsakId}/saksoversikt`);
                        return;
                    }
                    if (søkeresultat.harTilgang) {
                        åpneModal({ ident: søkeresultat.ident });
                        return;
                    }
                    return;
                }}
            />

            {innloggetSaksbehandler?.navIdent && (
                <Endringslogg
                    userId={innloggetSaksbehandler.navIdent}
                    dataFetchingIntervalSeconds={60 * 15}
                    appId={'BAKS'}
                    backendUrl={'/endringslogg'}
                    dataset={'production'}
                    maxEntries={50}
                    appName={'Barnetrygd'}
                    alignLeft={true}
                    stil={'lys'}
                />
            )}
        </>
    );
};

export default FagsakDeltagerSøk;
