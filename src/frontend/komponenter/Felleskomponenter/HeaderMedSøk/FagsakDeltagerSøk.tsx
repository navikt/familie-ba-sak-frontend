import { Søk } from '@navikt/familie-header';
import FagsakDeltagerskort from './FagsakDeltagerskort';
import React from 'react';
import { IFagsakDeltager, ISøkParam } from '../../../typer/fagsakdeltager';
import { useHistory } from 'react-router';
import AlertStripe from 'nav-frontend-alertstriper';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { useApp } from '../../../context/AppContext';

/* tslint:disable */
const validator = require('@navikt/fnrvalidator');

const FagsakDeltagerSøk: React.FC = () => {
    const { axiosRequest } = useApp();
    const history = useHistory();
    const [resultat, settResultat] = React.useState<IFagsakDeltager[] | undefined>(undefined);
    const [spinner, settSpinner] = React.useState<boolean>(false);
    const [søkfeil, settSøkfeil] = React.useState<string | undefined>(undefined);

    const slettResultat = () => {
        settSøkfeil(undefined);
        settResultat(undefined);
    };

    const søk = (v: string) => {
        slettResultat();
        settSpinner(true);
        axiosRequest<IFagsakDeltager[], ISøkParam>({
            method: 'POST',
            url: 'familie-ba-sak/api/fagsaker/sok',
            data: {
                personIdent: v,
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
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settSøkfeil(response.melding);
                }
            })
            .catch(error => {
                settSøkfeil('Ukjent API feil: ' + error);
            });
    };

    const fnrValidator = (verdi: string) => {
        return validator.idnr(verdi).status === 'valid';
    };

    return (
        <Søk
            søk={søk}
            validator={(process.env.NODE_ENV !== 'development' && fnrValidator) || undefined}
            spinner={spinner}
            autoSøk={true}
            onChange={slettResultat}
        >
            {!resultat && søkfeil && <AlertStripe type="feil">{søkfeil}</AlertStripe>}
            {!resultat && !søkfeil && spinner && <AlertStripe type={'info'}>Søker...</AlertStripe>}
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
                        <FagsakDeltagerskort
                            navn={deltager.navn}
                            kjønn={deltager.kjønn}
                            ident={deltager.ident}
                            rolle={deltager.rolle}
                            fagsakId={deltager.fagsakId?.toString()}
                            index={index}
                            key={index}
                            onClick={idx =>
                                resultat[idx].fagsakId &&
                                history.push(`/fagsak/${resultat[idx].fagsakId}/saksoversikt`)
                            }
                        />
                    );
                })}
        </Søk>
    );
};

export default FagsakDeltagerSøk;
