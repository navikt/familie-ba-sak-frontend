import React, { useState } from 'react';

import { useHistory } from 'react-router';

import AlertStripe from 'nav-frontend-alertstriper';

import { Søk } from '@navikt/familie-header';
import { useHttp } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { IFagsakDeltager, ISøkParam } from '../../../typer/fagsakdeltager';
import FagsakDeltagerkort from './FagsakDeltagerkort';
import OpprettFagsakModal from './OpprettFagsakModal';

// eslint-disable-next-line
const validator = require('@navikt/fnrvalidator');

const FagsakDeltagerSøk: React.FC = () => {
    const { request } = useHttp();
    const history = useHistory();
    const [resultat, settResultat] = React.useState<IFagsakDeltager[] | undefined>(undefined);
    const [spinner, settSpinner] = React.useState<boolean>(false);
    const [søkfeil, settSøkfeil] = React.useState<string | undefined>(undefined);
    const [deltagerForOpprettFagsak, settDeltagerForOpprettFagsak] = useState<
        IFagsakDeltager | undefined
    >(undefined);

    const slettResultat = (): void => {
        settSøkfeil(undefined);
        settResultat(undefined);
    };

    const søk = (personIdent: string): void => {
        slettResultat();
        settSpinner(true);
        request<ISøkParam, IFagsakDeltager[]>({
            method: 'POST',
            url: 'familie-ba-sak/api/fagsaker/sok',
            data: {
                personIdent,
            },
        })
            .then((response: Ressurs<IFagsakDeltager[]>) => {
                settSpinner(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settSøkfeil(undefined);
                    settResultat(response.data);
                } else if (response.status === RessursStatus.IKKE_HENTET) {
                    settSøkfeil('Person ikke funnet');
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settSøkfeil(response.frontendFeilmelding);
                }
            })
            .catch(error => {
                settSøkfeil('Ukjent API feil: ' + error);
            });
    };

    const fnrValidator = (verdi: string): boolean => {
        return validator.idnr(verdi).status === 'valid';
    };

    return (
        <>
            <Søk
                søk={søk}
                validator={(process.env.NODE_ENV !== 'development' && fnrValidator) || undefined}
                spinner={spinner}
                autoSøk={true}
                onChange={slettResultat}
            >
                {!resultat && søkfeil && <AlertStripe type="feil">{søkfeil}</AlertStripe>}
                {!resultat && !søkfeil && spinner && (
                    <AlertStripe type={'info'}>Søker...</AlertStripe>
                )}
                {!resultat && !søkfeil && !spinner && (
                    <AlertStripe type="info">Tast inn fødselsnummer eller d-nummer</AlertStripe>
                )}
                {resultat && resultat.length === 0 && (
                    <AlertStripe type={'advarsel'}>Beklager, ingen treff</AlertStripe>
                )}
                {resultat &&
                    resultat.length > 0 &&
                    resultat.map((deltager, index) => {
                        return (
                            <FagsakDeltagerkort
                                key={index}
                                deltager={deltager}
                                index={index}
                                onClick={() => {
                                    resultat[index].fagsakId
                                        ? history.push(
                                              `/fagsak/${resultat[index].fagsakId}/saksoversikt`
                                          )
                                        : deltager.harTilgang &&
                                          settDeltagerForOpprettFagsak(deltager);
                                }}
                            />
                        );
                    })}
            </Søk>

            <OpprettFagsakModal
                deltager={deltagerForOpprettFagsak}
                lukkModal={() => settDeltagerForOpprettFagsak(undefined)}
            />
        </>
    );
};

export default FagsakDeltagerSøk;
