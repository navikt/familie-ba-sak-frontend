import React, { useState } from 'react';

import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import IkkeTilgang from '../../../ikoner/IkkeTilgang';
import { IFagsakDeltager, ISøkParam } from '../../../typer/fagsakdeltager';
import { ikoner } from './icons/Ikoner';
import OpprettFagsakModal from './OpprettFagsakModal';
import { Søk } from './søk';
import { ISøkResultat } from './søk/typer';

// eslint-disable-next-line
const validator = require('@navikt/fnrvalidator');

const FagsakDeltagerSøk: React.FC = () => {
    const { request } = useHttp();
    const history = useHistory();
    const [fagsakDeltagere, settFagsakDeltagere] = React.useState<Ressurs<IFagsakDeltager[]>>(
        byggTomRessurs()
    );

    const [deltagerForOpprettFagsak, settDeltagerForOpprettFagsak] = useState<
        ISøkResultat | undefined
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
            settFagsakDeltagere(byggFunksjonellFeilRessurs('Personidenten har feil format'));
        }
    };

    const mapTilSøkResultater = (): Ressurs<ISøkResultat[]> => {
        return fagsakDeltagere.status === RessursStatus.SUKSESS
            ? {
                  ...fagsakDeltagere,
                  data: fagsakDeltagere.data.map((fagsakDeltager: IFagsakDeltager) => ({
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
                  })),
              }
            : fagsakDeltagere;
    };

    return (
        <>
            <Søk
                søk={søk}
                label={'Søk på fnr eller d-nummer'}
                placeholder={'Søk på fnr eller d-nummer'}
                nullstillSøkResultater={() => settFagsakDeltagere(byggTomRessurs())}
                søkResultater={mapTilSøkResultater()}
                søkResultatOnClick={(søkResultat: ISøkResultat) =>
                    søkResultat.fagsakId
                        ? history.push(`/fagsak/${søkResultat.fagsakId}/saksoversikt`)
                        : søkResultat.harTilgang && settDeltagerForOpprettFagsak(søkResultat)
                }
            />

            <OpprettFagsakModal
                søkResultat={deltagerForOpprettFagsak}
                lukkModal={() => settDeltagerForOpprettFagsak(undefined)}
            />
        </>
    );
};

export default FagsakDeltagerSøk;
