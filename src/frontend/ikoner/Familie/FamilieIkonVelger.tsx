import * as React from 'react';
import { kjønnType } from '../../typer/person';
import { hentAlderFraFnr } from '../../utils/hjelpere';
import GuttIkon from './GuttIkon';
import JenteIkon from './JenteIkon';
import KvinneIkon from './KvinneIkon';
import MannIkon from './MannIkon';
import NøytralPersonIkon from './NøytralPersonIkon';

interface IProps {
    className?: string;
    fødselsnummer: string;
    kjønn: kjønnType;
}

const FamilieIkonVelger: React.StatelessComponent<IProps> = ({
    className,
    fødselsnummer,
    kjønn,
}) => {
    switch (kjønn) {
        case kjønnType.K:
            if (hentAlderFraFnr(fødselsnummer) < 18) {
                return <JenteIkon className={className} heigth={32} width={32} />;
            } else {
                return <KvinneIkon className={className} heigth={32} width={32} />;
            }
        case kjønnType.M:
            if (hentAlderFraFnr(fødselsnummer) < 18) {
                return <GuttIkon className={className} heigth={32} width={32} />;
            } else {
                return <MannIkon className={className} heigth={32} width={32} />;
            }
        default:
            return <NøytralPersonIkon className={className} heigth={32} width={32} />;
    }
};

export default FamilieIkonVelger;
