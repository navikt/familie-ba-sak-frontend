import Visittkort from '@navikt/familie-visittkort';
import { Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { fagsakStatus, IFagsak } from '../../../typer/fagsak';
import { IPerson } from '../../../typer/person';
import { formaterPersonIdent, hentAlder } from '../../../utils/formatter';
import Behandlingsmeny from './Behandlingsmeny/Behandlingsmeny';

interface IProps {
    bruker: IPerson;
    fagsak: IFagsak;
}

const Personlinje: React.FC<IProps> = ({ bruker, fagsak }) => {
    return (
        <Visittkort
            navn={bruker.navn}
            ident={formaterPersonIdent(fagsak.søkerFødselsnummer)}
            alder={hentAlder(bruker.fødselsdato)}
            kjønn={bruker.kjønn}
        >
            <div style={{ flex: 1 }}></div>
            <Normaltekst children={'Status på sak '} />
            <Element
                className={'visittkort__status'}
                children={
                    fagsak.underBehandling ? 'Under behandling' : fagsakStatus[fagsak.status].navn
                }
            />
            <Lenke className={'visittkort__lenke'} href={`/fagsak/${fagsak.id}/saksoversikt`}>
                <Normaltekst>Gå til saksoversikt</Normaltekst>
            </Lenke>

            <Behandlingsmeny fagsak={fagsak} bruker={bruker} />
        </Visittkort>
    );
};

export default Personlinje;
