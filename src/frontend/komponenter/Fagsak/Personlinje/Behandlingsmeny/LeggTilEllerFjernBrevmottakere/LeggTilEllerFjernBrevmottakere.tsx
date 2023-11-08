import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import type { IRestBrevmottaker } from './useLeggTilFjernBrevmottaker';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';

interface IProps {
    brevmottakere: IRestBrevmottaker[];
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

const LeggTilEllerFjernBrevmottakere: React.FC<IProps> = ({ brevmottakere }) => {
    const [visModal, settVisModal] = useState(false);
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

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
                />
            )}
        </>
    );
};

export default LeggTilEllerFjernBrevmottakere;
