import React, { useState } from 'react';

import { useHistory } from 'react-router';

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
} from '@navikt/familie-typer';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import IkkeTilgang from '../../../ikoner/IkkeTilgang';
import type { IFagsakDeltager, ISøkParam } from '../../../typer/fagsakdeltager';
import { fagsakdeltagerRoller } from '../../../typer/fagsakdeltager';
import { ToggleNavn } from '../../../typer/toggles';
import OpprettFagsakModal from './OpprettFagsakModal';

// eslint-disable-next-line
const validator = require('@navikt/fnrvalidator');

const FagsakDeltagerSøk: React.FC = () => {
    const { request } = useHttp();
    const { toggles, innloggetSaksbehandler } = useApp();
    const history = useHistory();

    const [fagsakDeltagere, settFagsakDeltagere] = React.useState<Ressurs<IFagsakDeltager[]>>(
        byggTomRessurs()
    );

    const [deltagerForOpprettFagsak, settDeltagerForOpprettFagsak] = useState<
        ISøkeresultat | undefined
    >(undefined);

    const fnrValidator = (verdi: string): boolean => {
        return validator.idnr(verdi).status === 'valid';
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
                              ikoner[`${fagsakDeltager.rolle}_${fagsakDeltager.kjønn}`]
                          ) : (
                              <IkkeTilgang heigth={30} width={30} />
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
                        ? history.push(`/fagsak/${søkeresultat.fagsakId}/saksoversikt`)
                        : søkeresultat.harTilgang && settDeltagerForOpprettFagsak(søkeresultat)
                }
            />

            {toggles[ToggleNavn.brukEndringslogg] && innloggetSaksbehandler && (
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
            <OpprettFagsakModal
                søkeresultat={deltagerForOpprettFagsak}
                lukkModal={() => settDeltagerForOpprettFagsak(undefined)}
            />
        </>
    );
};

export default FagsakDeltagerSøk;
