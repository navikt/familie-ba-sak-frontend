import React from 'react';

import KnappBase from 'nav-frontend-knapper';

import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { FagsakEier } from '../../../../../typer/fagsak';
import useOpprettFagsak from '../../../../Felleskomponenter/HeaderMedSøk/useOpprettFagsak';

interface IProps {
    onListElementClick: () => void;
    minimalFagsak: IMinimalFagsak;
}

const OpprettFagsak: React.FC<IProps> = ({ onListElementClick, minimalFagsak }) => {
    const { opprettFagsak, senderInn, settSenderInn } = useOpprettFagsak();
    const { hentBruker } = useFagsakRessurser();
    return (
        <>
            <KnappBase
                mini={true}
                spinner={!!senderInn}
                onClick={() => {
                    const eier =
                        minimalFagsak.fagsakEier === FagsakEier.OMSORGSPERSON
                            ? FagsakEier.BARN
                            : FagsakEier.OMSORGSPERSON;
                    settSenderInn(eier);
                    onListElementClick();
                    opprettFagsak(
                        {
                            personIdent: minimalFagsak.søkerFødselsnummer,
                            aktørId: null,
                            fagsakEier: eier,
                        },
                        () => {
                            hentBruker(minimalFagsak.søkerFødselsnummer);
                        }
                    );
                }}
            >
                {minimalFagsak.fagsakEier === FagsakEier.BARN
                    ? 'Opprett normal fagsak'
                    : 'Opprett institusjon fagsak'}
            </KnappBase>
        </>
    );
};

export default OpprettFagsak;
