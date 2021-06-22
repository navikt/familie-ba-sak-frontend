import React from 'react';

import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import Visittkort from '@navikt/familie-visittkort';

import { useApp } from '../../../context/AppContext';
import { IFagsak } from '../../../typer/fagsak';
import { IPersonInfo } from '../../../typer/person';
import { hentFagsakStatusVisning } from '../../../utils/fagsak';
import { formaterPersonIdent, hentAlder } from '../../../utils/formatter';
import Behandlingsmeny from './Behandlingsmeny/Behandlingsmeny';

interface IProps {
    bruker: IPersonInfo;
    fagsak: IFagsak;
}

const Personlinje: React.FC<IProps> = ({ bruker, fagsak }) => {
    const { harInnloggetSaksbehandlerSkrivetilgang } = useApp();
    return (
        <Visittkort
            navn={bruker.navn}
            ident={formaterPersonIdent(fagsak.søkerFødselsnummer)}
            alder={hentAlder(bruker.fødselsdato)}
            kjønn={bruker.kjønn}
        >
            <div style={{ flex: 1 }}></div>
            <Normaltekst children={'Status på sak '} />
            <Element className={'visittkort__status'} children={hentFagsakStatusVisning(fagsak)} />
            <Lenke className={'visittkort__lenke'} href={`/fagsak/${fagsak.id}/saksoversikt`}>
                <Normaltekst>Saksoversikt</Normaltekst>
            </Lenke>
            <Lenke className={'visittkort__lenke'} href={`/fagsak/${fagsak.id}/dokumentliste`}>
                <Normaltekst>Dokumentliste</Normaltekst>
            </Lenke>

            {harInnloggetSaksbehandlerSkrivetilgang() && <Behandlingsmeny fagsak={fagsak} />}
        </Visittkort>
    );
};

export default Personlinje;
