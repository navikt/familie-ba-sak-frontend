import React from 'react';

import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { kjønnType } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import { useApp } from '../../../context/AppContext';
import { IFagsak } from '../../../typer/fagsak';
import { IPersonInfo } from '../../../typer/person';
import { ToggleNavn } from '../../../typer/toggles';
import { hentFagsakStatusVisning } from '../../../utils/fagsak';
import { formaterIdent, hentAlder } from '../../../utils/formatter';
import Behandlingsmeny from './Behandlingsmeny/Behandlingsmeny';

interface IProps {
    bruker?: IPersonInfo;
    fagsak?: IFagsak;
}

const Personlinje: React.FC<IProps> = ({ bruker, fagsak }) => {
    const { harInnloggetSaksbehandlerSkrivetilgang, toggles } = useApp();
    return (
        <Visittkort
            navn={bruker?.navn ?? 'Ukjent'}
            ident={formaterIdent(bruker?.personIdent ?? '')}
            alder={hentAlder(bruker?.fødselsdato ?? '')}
            kjønn={bruker?.kjønn ?? kjønnType.UKJENT}
        >
            <div className="visittkort__pipe">|</div>
            <Normaltekst>{`Kommunenr: ${bruker?.kommunenummer ?? 'ukjent'}`}</Normaltekst>
            <div style={{ flex: 1 }}></div>
            {fagsak !== undefined && (
                <>
                    <Normaltekst children={'Status på sak '} />
                    <Element
                        className={'visittkort__status'}
                        children={hentFagsakStatusVisning(fagsak)}
                    />
                    <Lenke
                        className={'visittkort__lenke'}
                        href={`/fagsak/${fagsak.id}/saksoversikt`}
                    >
                        <Normaltekst>Gå til saksoversikt</Normaltekst>
                    </Lenke>
                    {toggles[ToggleNavn.journalpostliste] && (
                        <Lenke
                            className={'visittkort__lenke'}
                            href={`/fagsak/${fagsak.id}/dokumenter`}
                        >
                            <Normaltekst>Dokumenter</Normaltekst>
                        </Lenke>
                    )}

                    {harInnloggetSaksbehandlerSkrivetilgang() && (
                        <Behandlingsmeny fagsak={fagsak} />
                    )}
                </>
            )}
        </Visittkort>
    );
};

export default Personlinje;
