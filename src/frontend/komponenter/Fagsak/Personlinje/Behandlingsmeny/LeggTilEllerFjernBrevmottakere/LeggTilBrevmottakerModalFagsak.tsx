import React from 'react';

import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import type { BrevmottakerUseSkjema, SkjemaBrevmottaker } from './useBrevmottakerSkjema';
import { felterTilSkjematBrevmottaker } from './useBrevmottakerSkjema';
import { useDokumentutsending } from '../../../../../context/DokumentutsendingContext';

interface IFagsakModalProps {
    lukkModal: () => void;
}
export const LeggTilBrevmottakerModalFagsak: React.FC<IFagsakModalProps> = ({ lukkModal }) => {
    const { manuelleInfoBrevmottakere, settManuelleInfoBrevmottakere } = useDokumentutsending();

    const lagreMottaker = (useSkjema: BrevmottakerUseSkjema) => {
        const nyMottaker = felterTilSkjematBrevmottaker(useSkjema.skjema.felter);
        const mottakere: SkjemaBrevmottaker[] = [...manuelleInfoBrevmottakere, nyMottaker];
        return settManuelleInfoBrevmottakere(mottakere);
    };

    const fjernMottaker = (mottaker: SkjemaBrevmottaker) => {
        const mottakereUtenFjernetPerson = manuelleInfoBrevmottakere.filter(it => it !== mottaker);
        settManuelleInfoBrevmottakere(mottakereUtenFjernetPerson);
    };

    return (
        <LeggTilBrevmottakerModal
            brevmottakere={manuelleInfoBrevmottakere}
            lagreMottaker={lagreMottaker}
            fjernMottaker={fjernMottaker}
            erLesevisning={false}
            lukkModal={lukkModal}
        />
    );
};
