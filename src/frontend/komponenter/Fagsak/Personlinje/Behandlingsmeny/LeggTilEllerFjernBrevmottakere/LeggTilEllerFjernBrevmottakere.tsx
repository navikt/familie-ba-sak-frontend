import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react-internal';

import type { IBehandling } from '../../../../../typer/behandling';
import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';

interface IProps {
    åpenBehandling: IBehandling;
    erLesevisning: boolean;
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

const LeggTilEllerFjernBrevmottakere: React.FC<IProps> = ({ åpenBehandling, erLesevisning }) => {
    const [visModal, settVisModal] = useState(false);
    const [visSkjema, settVisSkjema] = useState(true);

    const lukkModal = () => {
        settVisModal(false);
        settVisSkjema(åpenBehandling.brevmottakere.length === 0);
    };

    const menyinnslag = utledMenyinnslag(åpenBehandling.brevmottakere.length, erLesevisning);

    const [forrigeÅpenbehandlingId, settForrigeÅpenbehandlingId] = useState<number | undefined>();
    if (forrigeÅpenbehandlingId !== åpenBehandling.behandlingId) {
        settVisSkjema(åpenBehandling.brevmottakere.length === 0);
        settForrigeÅpenbehandlingId(åpenBehandling.behandlingId);
    }

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {menyinnslag}
            </Dropdown.Menu.List.Item>

            <LeggTilBrevmottakerModal
                åpenBehandling={åpenBehandling}
                erLesevisning={erLesevisning}
                visModal={visModal}
                lukkModal={lukkModal}
                visSkjema={visSkjema}
                åpneSkjema={() => settVisSkjema(true)}
            />
        </>
    );
};

export default LeggTilEllerFjernBrevmottakere;
