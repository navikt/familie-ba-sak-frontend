import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilBrevmottakerModalFagsak } from './LeggTilBrevmottakerModalFagsak';
import { useFagsakContext } from '../../../FagsakContext';

const utledMenyinnslag = (antallMottakere: number) => {
    if (antallMottakere === 0) {
        return 'Legg til brevmottaker';
    }
    if (antallMottakere === 1) {
        return 'Legg til eller fjern brevmottaker';
    }
    return 'Se eller fjern brevmottakere';
};

export function LeggTilEllerFjernBrevmottakerePåFagsak() {
    const [visModal, settVisModal] = useState(false);

    const { manuelleBrevmottakerePåFagsak } = useFagsakContext();

    const menyinnslag = utledMenyinnslag(manuelleBrevmottakerePåFagsak.length);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {menyinnslag}
            </Dropdown.Menu.List.Item>
            {visModal && <LeggTilBrevmottakerModalFagsak lukkModal={() => settVisModal(false)} />}
        </>
    );
}
