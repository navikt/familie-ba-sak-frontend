import React from 'react';

import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import type { BrevmottakerUseSkjema, SkjemaBrevmottaker } from './useBrevmottakerSkjema';
import { felterTilSkjemaBrevmottaker } from './useBrevmottakerSkjema';
import { useFagsakContext } from '../../../FagsakContext';

interface IFagsakModalProps {
    lukkModal: () => void;
}
export const LeggTilBrevmottakerModalFagsak: React.FC<IFagsakModalProps> = ({ lukkModal }) => {
    const { manuelleBrevmottakerePåFagsak, settManuelleBrevmottakerePåFagsak } = useFagsakContext();

    const lagreMottaker = (useSkjema: BrevmottakerUseSkjema) => {
        if (useSkjema.kanSendeSkjema()) {
            const nyMottaker = felterTilSkjemaBrevmottaker(useSkjema.skjema.felter);
            const mottakere: SkjemaBrevmottaker[] = [...manuelleBrevmottakerePåFagsak, nyMottaker];
            return settManuelleBrevmottakerePåFagsak(mottakere);
        }
    };

    const fjernMottaker = (mottaker: SkjemaBrevmottaker) => {
        const mottakereUtenFjernetPerson = manuelleBrevmottakerePåFagsak.filter(
            mottakerPåFagsak => mottakerPåFagsak !== mottaker
        );
        settManuelleBrevmottakerePåFagsak(mottakereUtenFjernetPerson);
    };

    return (
        <LeggTilBrevmottakerModal
            brevmottakere={manuelleBrevmottakerePåFagsak}
            lagreMottaker={lagreMottaker}
            fjernMottaker={fjernMottaker}
            erLesevisning={false}
            lukkModal={lukkModal}
        />
    );
};
