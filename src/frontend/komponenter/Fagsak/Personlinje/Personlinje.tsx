import React from 'react';

import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import { useApp } from '../../../context/AppContext';
import { IMinimalFagsak } from '../../../typer/fagsak';
import { IPersonInfo } from '../../../typer/person';
import { hentFagsakStatusVisning } from '../../../utils/fagsak';
import { formaterIdent, hentAlder } from '../../../utils/formatter';
import DødsfallTag from '../../Felleskomponenter/DødsfallTag';
import Behandlingsmeny from './Behandlingsmeny/Behandlingsmeny';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak?: IMinimalFagsak;
}

const Personlinje: React.FC<IProps> = ({ bruker, minimalFagsak }) => {
    const { harInnloggetSaksbehandlerSkrivetilgang } = useApp();
    return (
        <Visittkort
            navn={bruker?.navn ?? 'Ukjent'}
            ident={formaterIdent(bruker?.personIdent ?? '')}
            alder={hentAlder(bruker?.fødselsdato ?? '')}
            kjønn={bruker?.kjønn ?? kjønnType.UKJENT}
        >
            <div className="visittkort__pipe">|</div>
            <Normaltekst>{`Kommunenr: ${bruker?.kommunenummer ?? 'ukjent'}`}</Normaltekst>
            {bruker?.dødsfallDato?.length && (
                <>
                    <div className="visittkort__pipe">|</div>
                    <DødsfallTag dødsfallDato={bruker.dødsfallDato} />
                </>
            )}
            <div style={{ flex: 1 }}></div>
            {minimalFagsak !== undefined && (
                <>
                    <Normaltekst children={'Status på sak '} />
                    <Element
                        className={'visittkort__status'}
                        children={hentFagsakStatusVisning(minimalFagsak)}
                    />
                    <Lenke
                        className={'visittkort__lenke'}
                        href={`/fagsak/${minimalFagsak.id}/saksoversikt`}
                    >
                        <Normaltekst>Saksoversikt</Normaltekst>
                    </Lenke>
                    <Lenke
                        className={'visittkort__lenke'}
                        href={`/fagsak/${minimalFagsak.id}/dokumenter`}
                    >
                        <Normaltekst>Dokumenter</Normaltekst>
                    </Lenke>
                    {harInnloggetSaksbehandlerSkrivetilgang() && (
                        <Behandlingsmeny minimalFagsak={minimalFagsak} />
                    )}
                </>
            )}
        </Visittkort>
    );
};

export default Personlinje;
