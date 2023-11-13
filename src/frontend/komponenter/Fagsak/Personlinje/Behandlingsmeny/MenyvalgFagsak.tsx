import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilEllerFjernBrevmottakere } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakere';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import OpprettFagsak from './OpprettFagsak/OpprettFagsak';
import { useApp } from '../../../../context/AppContext';
import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}

const MenyvalgFagsak = ({ bruker, minimalFagsak }: IProps) => {
    const navigate = useNavigate();
    const { toggles } = useApp();

    const erPåDokumentutsending = useLocation().pathname.includes('dokumentutsending');
    const { manuelleInfoBrevmottakere } = useDokumentutsending();

    return (
        <>
            <OpprettBehandling minimalFagsak={minimalFagsak} />
            {!!bruker && <OpprettFagsak personInfo={bruker} />}
            {toggles[ToggleNavn.manuellMottakerInfobrev] && erPåDokumentutsending ? (
                <LeggTilEllerFjernBrevmottakere
                    erPåBehandling={true}
                    brevmottakere={manuelleInfoBrevmottakere}
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
