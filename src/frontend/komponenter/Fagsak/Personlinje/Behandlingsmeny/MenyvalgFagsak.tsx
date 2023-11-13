import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilEllerFjernBrevmottakereFagsak } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakere';
import type { SkjemaBrevmottaker } from './LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import OpprettFagsak from './OpprettFagsak/OpprettFagsak';
import { useApp } from '../../../../context/AppContext';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}

const MenyvalgFagsak = ({ bruker, minimalFagsak }: IProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toggles } = useApp();
    const [brevmottakere, settBrevmottakere] = useState<SkjemaBrevmottaker[]>([]);

    const erPåDokumentutsending = location.pathname.includes('dokumentutsending');
    //todo: fiks brevvmottaker for infobrev?
    return (
        <>
            <OpprettBehandling minimalFagsak={minimalFagsak} />
            {!!bruker && <OpprettFagsak personInfo={bruker} />}
            {toggles[ToggleNavn.manuellMottakerInfobrev] && erPåDokumentutsending ? (
                <LeggTilEllerFjernBrevmottakereFagsak
                    brevmottakere={brevmottakere}
                    settBrevmottakere={settBrevmottakere}
                />
            ) : (
                <Dropdown.Menu.List.Item
                    onClick={() => navigate(`/fagsak/${minimalFagsak.id}/dokumentutsending`)}
                >
                    Send informasjonsbrev
                </Dropdown.Menu.List.Item>
            )}
        </>
    );
};

export default MenyvalgFagsak;
