import React from 'react';

import { Dropdown } from '@navikt/ds-react';

import { useAppContext } from '../../../../../context/AppContext';
import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import { erPåHenleggbartSteg } from '../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

export function HenleggBehandlingNy() {
    const { toggles } = useAppContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING);

    const harTilgangTilTekniskVedlikeholdHenleggelse =
        toggles[ToggleNavn.tekniskVedlikeholdHenleggelse];

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse ||
        (!vurderErLesevisning() && erPåHenleggbartSteg(behandling.steg));

    if (!kanHenlegge) {
        return null;
    }

    return (
        <Dropdown.Menu.List.Item onClick={() => åpneModal()}>
            Henlegg behandling
        </Dropdown.Menu.List.Item>
    );
}
