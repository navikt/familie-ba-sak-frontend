import React from 'react';

import { Dropdown } from '@navikt/ds-react';

import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import { useToggles } from '../../../../../hooks/useToggles';
import { erPåHenleggbartSteg } from '../../../../../typer/behandling';
import { Toggle } from '../../../../../typer/toggles';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

export function HenleggBehandling() {
    const toggles = useToggles();
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING);

    const harTilgangTilTekniskVedlikeholdHenleggelse = toggles[Toggle.tekniskVedlikeholdHenleggelse];

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse || (!vurderErLesevisning() && erPåHenleggbartSteg(behandling.steg));

    if (!kanHenlegge) {
        return null;
    }

    return <Dropdown.Menu.List.Item onClick={() => åpneModal()}>Henlegg behandling</Dropdown.Menu.List.Item>;
}
