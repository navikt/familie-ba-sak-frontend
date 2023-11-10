import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import type { BrevmottakerUseSkjema, IRestBrevmottaker } from './useBrevmottakerSkjema';

interface IProps {
    brevmottakere: IRestBrevmottaker[];
    lagreMottaker: (useSkjema: BrevmottakerUseSkjema) => void;
    fjernMottaker: (mottakerId: IRestBrevmottaker) => void;
    erLesevisning: boolean;
}

interface IFagsakProps {
    brevmottakere: IRestBrevmottaker[];
    settBrevmottakere: (mottakere: IRestBrevmottaker[]) => void;
}

const utledMenyinnslag = (antallMottakere: number, erLesevisning: boolean) => {
    if (erLesevisning) {
        return antallMottakere === 1 ? 'Se brevmottaker' : 'Se brevmottakere';
    } else {
        return antallMottakere === 0
            ? 'Legg til brevmottaker'
            : antallMottakere === 1
            ? 'Legg til eller fjern brevmottaker'
            : 'Se eller fjern brevmottakere';
    }
};

const LeggTilEllerFjernBrevmottakere: React.FC<IProps> = ({
    brevmottakere,
    lagreMottaker,
    fjernMottaker,
    erLesevisning,
}) => {
    const [visModal, settVisModal] = useState(false);

    const menyinnslag = utledMenyinnslag(brevmottakere.length, erLesevisning);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {menyinnslag}
            </Dropdown.Menu.List.Item>

            {visModal && (
                <LeggTilBrevmottakerModal
                    brevmottakere={brevmottakere}
                    lukkModal={() => settVisModal(false)}
                    lagreMottaker={lagreMottaker}
                    fjernMottaker={fjernMottaker}
                />
            )}
        </>
    );
};

export const LeggTilEllerFjernBrevmottakereBehandling: React.FC<IProps> = props =>
    LeggTilEllerFjernBrevmottakere(props);

export const LeggTilEllerFjernBrevmottakereFagsak: React.FC<IFagsakProps> = ({
    brevmottakere,
    settBrevmottakere,
}) => {
    const lagreMottaker = (useSkjema: BrevmottakerUseSkjema) => {
        const mottakere: IRestBrevmottaker[] = [...brevmottakere, mottaker];
        return settBrevmottakere(mottakere);
    };

    const fjernMottaker = (mottakerId: number) => {
        const mottakereUtenFjernetPerson = brevmottakere.filter(it => it.id !== mottakerId);
        settBrevmottakere(mottakereUtenFjernetPerson);
    };

    return LeggTilEllerFjernBrevmottakere({
        brevmottakere: [],
        lagreMottaker: lagreMottaker,
        fjernMottaker: () => undefined,
        erLesevisning: false,
    });
};
