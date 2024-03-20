import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Endringslogg from '@navikt/familie-endringslogg';
import type { ISøkeresultat } from '@navikt/familie-header';
import { ikoner, Søk } from '@navikt/familie-header';
import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    kjønnType,
    RessursStatus,
} from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';
import { idnr } from '@navikt/fnrvalidator';

import OpprettFagsakModal from './OpprettFagsakModal';
import { useApp } from '../../../context/AppContext';
import IkkeTilgang from '../../../ikoner/IkkeTilgang';
import KontorIkonGrønn from '../../../ikoner/KontorIkonGrønn';
import { FagsakType } from '../../../typer/fagsak';
import type { IFagsakDeltager, ISøkParam } from '../../../typer/fagsakdeltager';
import { fagsakdeltagerRoller } from '../../../typer/fagsakdeltager';

const FagsakDeltagerSøk: React.FC = () => {
    const { request } = useHttp();
    const { innloggetSaksbehandler } = useApp();
    const navigate = useNavigate();

    const [fagsakDeltagere, settFagsakDeltagere] =
        React.useState<Ressurs<IFagsakDeltager[]>>(byggTomRessurs());

    const [deltagerForOpprettFagsak, settDeltagerForOpprettFagsak] = useState<
        ISøkeresultat | undefined
    >(undefined);

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
                          ikon: fagsakDeltager.harTilgang ? (
                              fagsakDeltager.fagsakType !== FagsakType.INSTITUSJON ? (
                                  ikoner[`${fagsakDeltager.rolle}_${fagsakDeltager.kjønn}`]
                              ) : (
                                  <KontorIkonGrønn height={'32'} width={'32'} />
                              )
                          ) : (
                              <IkkeTilgang height={30} width={30} />
                          ),
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
                søkeresultatOnClick={(søkeresultat: ISøkeresultat) =>
                    søkeresultat.fagsakId
                        ? navigate(`/fagsak/${søkeresultat.fagsakId}/saksoversikt`)
                        : søkeresultat.harTilgang && settDeltagerForOpprettFagsak(søkeresultat)
                }
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
            {deltagerForOpprettFagsak && (
                <OpprettFagsakModal
                    søkeresultat={deltagerForOpprettFagsak}
                    lukkModal={() => settDeltagerForOpprettFagsak(undefined)}
                />
            )}
        </>
    );
};

export default FagsakDeltagerSøk;
