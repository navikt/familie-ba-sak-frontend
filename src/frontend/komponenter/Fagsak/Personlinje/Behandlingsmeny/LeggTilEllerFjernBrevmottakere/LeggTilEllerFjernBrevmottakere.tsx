import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilBrevmottakerModalBehandling } from './LeggTilBrevmottakerModalBehandling';
import { LeggTilBrevmottakerModalFagsak } from './LeggTilBrevmottakerModalFagsak';
import type { SkjemaBrevmottaker } from './useBrevmottakerSkjema';
import type { IBehandling } from '../../../../../typer/behandling';

interface BehandlingProps {
    erPåBehandling: true;
    behandling: IBehandling;
    erLesevisning: boolean;
}

interface FagsakProps {
    erPåBehandling: false;
    erLesevisning?: never;
    brevmottakere: SkjemaBrevmottaker[];
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

export const LeggTilEllerFjernBrevmottakere = (props: BehandlingProps | FagsakProps) => {
    const [visModal, settVisModal] = useState(false);

    const brevmottakere = props.erPåBehandling
        ? props.behandling.brevmottakere
        : props.brevmottakere;

    const menyinnslag = utledMenyinnslag(brevmottakere.length, !!props.erLesevisning);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {menyinnslag}
            </Dropdown.Menu.List.Item>

            {visModal &&
                (props.erPåBehandling ? (
                    <LeggTilBrevmottakerModalBehandling
                        lukkModal={() => settVisModal(false)}
                        behandling={props.behandling}
                        erLesevisning={props.erLesevisning}
                    />
                ) : (
                    <LeggTilBrevmottakerModalFagsak lukkModal={() => settVisModal(false)} />
                ))}
        </>
    );
};
