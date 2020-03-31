import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import { useHistory } from 'react-router';

import { Header, Søk } from '@navikt/familie-header';

import { søkFagsaker } from '../../../api/fagsak';
import { IFagsakDeltager } from '../../../typer/fagsakdeltager';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import FagsakDeltagerskort from './FagsakDeltagerskort';

const validator = require('@navikt/fnrvalidator');

export interface IHeaderMedSøkProps {
    brukerNavn?: string;
    brukerEnhet?: string;
}

export const HeaderMedSøk: React.FunctionComponent<IHeaderMedSøkProps> = ({ brukerNavn, brukerEnhet }) => {
    const [resultat, settResultat] = React.useState<IFagsakDeltager[] | undefined>(undefined);
    const [spinner, settSpinner] = React.useState<boolean>(false);
    const [søkfeil, settSøkfeil] = React.useState<string | undefined>(undefined);

    const history = useHistory();

    const søk = (v: string) => {
        slettResultat();
        settSpinner(true)
        søkFagsaker(v).then((response: Ressurs<IFagsakDeltager[]>) => {
            console.log(response);
            settSpinner(false);
            if (response.status === RessursStatus.SUKSESS) {
                settSøkfeil(undefined);
                settResultat(response.data);
            } else if (response.status === RessursStatus.IKKE_HENTET) {
                settSøkfeil("Person ikke funnet");
            } else if (response.status === RessursStatus.FEILET || response.status === RessursStatus.IKKE_TILGANG) {
                settSøkfeil(response.melding);
            }
        }).catch(error => {
            console.log(error);
            settSøkfeil("Ukjent API feil: " + error);
        });
    }

    const slettResultat = () => {
        settSøkfeil(undefined);
        settResultat(undefined);
    }

    const korter = resultat && (resultat.length > 0 ? resultat.map((deltager, index) => {
        return <FagsakDeltagerskort
            navn={deltager.navn}
            kjønn={deltager.kjønn}
            ident={deltager.ident}
            rolle={deltager.rolle}
            fagsakId={deltager.fagsakId}
            index={index}
            key={index}
            onClick={index =>
                resultat[index].fagsakId &&
                history.push(`/fagsak/${resultat[index].fagsakId}/saksoversikt`)
            }
        />
    }) : <AlertStripe type={'advarsel'}>Beklager, ingen treff</AlertStripe>)
        || søkfeil && <AlertStripe type='feil'>{søkfeil}</AlertStripe>
        || (spinner ? <AlertStripe type={'info'}>Søker...</AlertStripe>
            : <AlertStripe type='info'>Tast inn fødselsnummer eller d-nummer</AlertStripe>)

    return <Header tittel="NAV Barnetrygd" brukerinfo={{ navn: brukerNavn || 'Ukjent', enhet: brukerEnhet || 'Ukjent' }}
        brukerPopoverItems={[{ name: 'Logg ut', href: `${window.origin}/auth/logout` }]}
    >
        <Søk søk={søk} validator={verdi => validator.idnr(verdi).status === 'valid'} spinner={spinner} autoSøk={true}
            onChange={slettResultat}
        >
            {korter}
        </Søk>
    </Header>

}