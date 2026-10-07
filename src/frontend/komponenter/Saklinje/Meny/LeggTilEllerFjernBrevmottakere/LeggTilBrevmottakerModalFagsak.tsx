import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import type { BrevmottakerFagsak } from '@typer/brevmottaker';
import { randomUUID } from '@utils/commons';
import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import type { BrevmottakerUseSkjema } from './useBrevmottakerSkjema';
import { felterTilSkjemaBrevmottaker } from './useBrevmottakerSkjema';

interface IFagsakModalProps {
    lukkModal: () => void;
}

export const LeggTilBrevmottakerModalFagsak = ({ lukkModal }: IFagsakModalProps) => {
    const { brevmottakere, leggTilBrevmottaker, slettBrevmottaker } = useBrevmottakereFagsakContext();

    const lagreMottaker = (useSkjema: BrevmottakerUseSkjema) => {
        if (useSkjema.kanSendeSkjema()) {
            const nyMottaker = {
                uuid: randomUUID(),
                ...felterTilSkjemaBrevmottaker(useSkjema.skjema.felter),
            };
            useSkjema.nullstillSkjema();
            return leggTilBrevmottaker(nyMottaker);
        }
    };

    const fjernMottaker = (mottaker: BrevmottakerFagsak) => slettBrevmottaker(mottaker);

    return (
        <LeggTilBrevmottakerModal
            brevmottakere={brevmottakere}
            lagreMottaker={lagreMottaker}
            fjernMottaker={fjernMottaker}
            erLesevisning={false}
            lukkModal={lukkModal}
        />
    );
};
