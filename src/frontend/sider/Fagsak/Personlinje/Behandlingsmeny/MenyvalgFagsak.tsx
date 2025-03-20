import React from 'react';

import { useLocation, useNavigate } from 'react-router';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilEllerFjernBrevmottakere } from './LeggTilEllerFjernBrevmottakere/LeggTilEllerFjernBrevmottakere';
import OpprettBehandling from './OpprettBehandling/OpprettBehandling';
import OpprettFagsak from './OpprettFagsak/OpprettFagsak';
import { useApp } from '../../../../context/AppContext';
import { useFagsakContext } from '../../../../context/Fagsak/FagsakContext';
import { BehandlerRolle } from '../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../typer/fagsak';
import { FagsakType } from '../../../../typer/fagsak';
import type { IPersonInfo } from '../../../../typer/person';

interface IProps {
    bruker?: IPersonInfo;
    minimalFagsak: IMinimalFagsak;
}

const MenyvalgFagsak = ({ bruker, minimalFagsak }: IProps) => {
    const navigate = useNavigate();
    const { hentSaksbehandlerRolle } = useApp();

    const erPåDokumentutsending = useLocation().pathname.includes('dokumentutsending');
    const { manuelleBrevmottakerePåFagsak } = useFagsakContext();
    const erSaksbehandlerEllerHøyere = hentSaksbehandlerRolle() >= BehandlerRolle.SAKSBEHANDLER;
    const erFagsakTypeInstitusjon = minimalFagsak.fagsakType === FagsakType.INSTITUSJON;

    return (
        <>
            <OpprettBehandling minimalFagsak={minimalFagsak} />
            {!!bruker && <OpprettFagsak personInfo={bruker} />}
            {erPåDokumentutsending && (
                <LeggTilEllerFjernBrevmottakere
                    erPåBehandling={false}
                    brevmottakere={manuelleBrevmottakerePåFagsak}
                />
            )}
            {!erPåDokumentutsending && !erFagsakTypeInstitusjon && erSaksbehandlerEllerHøyere && (
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
