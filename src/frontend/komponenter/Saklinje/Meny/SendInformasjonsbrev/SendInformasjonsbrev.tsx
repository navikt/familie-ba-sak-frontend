import React from 'react';

import { useLocation, useNavigate } from 'react-router';

import { ActionMenu } from '@navikt/ds-react';

import { useSaksbehandler } from '../../../../hooks/useSaksbehandler';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { BehandlerRolle } from '../../../../typer/behandling';

export function SendInformasjonsbrev() {
    const { fagsak } = useFagsakContext();
    const saksbehandler = useSaksbehandler();

    const navigate = useNavigate();
    const location = useLocation();

    const erPåDokumentutsending = location.pathname.includes('dokumentutsending');
    const erSaksbehandlerEllerHøyere = saksbehandler.rolle >= BehandlerRolle.SAKSBEHANDLER;

    if (erPåDokumentutsending || !erSaksbehandlerEllerHøyere) {
        return null;
    }

    return (
        <ActionMenu.Item onSelect={() => navigate(`/fagsak/${fagsak.id}/dokumentutsending`)}>
            Send informasjonsbrev
        </ActionMenu.Item>
    );
}
