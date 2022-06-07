import React from 'react';

import KnappBase from 'nav-frontend-knapper';

import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { FagsakEier } from '../../../../../typer/fagsak';

interface IProps {
    onListElementClick: () => void;
    minimalFagsak: IMinimalFagsak;
}

const OpprettFagsak: React.FC<IProps> = ({ onListElementClick, minimalFagsak }) => {
    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    onListElementClick();
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
