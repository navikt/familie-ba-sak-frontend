import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilBrevmottakerModalBehandling } from './LeggTilBrevmottakerModalBehandling';
import type { IBehandling } from '../../../../../typer/behandling';

interface Props {
    behandling: IBehandling;
    erLesevisning: boolean;
}

const utledMenyinnslag = (antallMottakere: number, erLesevisning: boolean) => {
    if (erLesevisning) {
        return antallMottakere === 1 ? 'Se brevmottaker' : 'Se brevmottakere';
    }
    if (antallMottakere === 0) {
        return 'Legg til brevmottaker';
    }
    if (antallMottakere === 1) {
        return 'Legg til eller fjern brevmottaker';
    }
    return 'Se eller fjern brevmottakere';
};

export function LeggTilEllerFjernBrevmottakerePåBehandling({ behandling, erLesevisning }: Props) {
    const [visModal, settVisModal] = useState(false);

    const menyinnslag = utledMenyinnslag(behandling.brevmottakere.length, erLesevisning);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {menyinnslag}
            </Dropdown.Menu.List.Item>
            {visModal && (
                <LeggTilBrevmottakerModalBehandling
                    lukkModal={() => settVisModal(false)}
                    behandling={behandling}
                    erLesevisning={erLesevisning}
                />
            )}
        </>
    );
}
