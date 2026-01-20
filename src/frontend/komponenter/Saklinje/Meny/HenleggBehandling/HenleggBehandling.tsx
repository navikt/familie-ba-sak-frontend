import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { useAppContext } from '../../../../context/AppContext';
import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { erPåHenleggbartSteg } from '../../../../typer/behandling';

export function HenleggBehandling() {
    const { harInnloggetSaksbehandlerSuperbrukerTilgang } = useAppContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING);

    const erLesevisning = vurderErLesevisning();
    const harTilgangTilTekniskVedlikeholdHenleggelse = harInnloggetSaksbehandlerSuperbrukerTilgang();

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse || (!erLesevisning && erPåHenleggbartSteg(behandling.steg));

    if (!kanHenlegge) {
        return null;
    }

    return <ActionMenu.Item onSelect={() => åpneModal()}>Henlegg behandling</ActionMenu.Item>;
}
