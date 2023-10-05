import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';

interface IProps {
    åpenBehandling: IBehandling;
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

const LeggTilEllerFjernBrevmottakere: React.FC<IProps> = ({ åpenBehandling }) => {
    const [visModal, settVisModal] = useState(false);
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    const menyinnslag = utledMenyinnslag(åpenBehandling.brevmottakere.length, erLesevisning);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {menyinnslag}
            </Dropdown.Menu.List.Item>

            {visModal && (
                <LeggTilBrevmottakerModal
                    åpenBehandling={åpenBehandling}
                    lukkModal={() => settVisModal(false)}
                />
            )}
        </>
    );
};

export default LeggTilEllerFjernBrevmottakere;
