import React, { useState } from 'react';

import { useHistory } from 'react-router';

import { ikoner, Søk, ISøkeresultat } from '@navikt/familie-header';
import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    kjønnType,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import IkkeTilgang from '../../../ikoner/IkkeTilgang';
import { fagsakdeltagerRoller, IFagsakDeltager, ISøkParam } from '../../../typer/fagsakdeltager';
import { isRealOrSynthIdnr } from '../../../utils/artificialIdnr';
import OpprettFagsakModal from './OpprettFagsakModal';

// eslint-disable-next-line
const validator = require('@navikt/fnrvalidator');

const FagsakDeltagerSøk: React.FC = () => {
    const { request } = useHttp();
    const history = useHistory();
    const [fagsakDeltagere, settFagsakDeltagere] = React.useState<Ressurs<IFagsakDeltager[]>>(
        byggTomRessurs()
    );

    const [deltagerForOpprettFagsak, settDeltagerForOpprettFagsak] = useState<
        ISøkeresultat | undefined
    >(undefined);

    //Support artificial ident that has the third digit being x+4 or x+8
    const fnrValidator = (verdi: string): boolean => isRealOrSynthIdnr(verdi);

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

            <OpprettFagsakModal
                søkeresultat={deltagerForOpprettFagsak}
                lukkModal={() => settDeltagerForOpprettFagsak(undefined)}
            />
        </>
    );
};

export default FagsakDeltagerSøk;
