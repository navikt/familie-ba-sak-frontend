import React from 'react';

import { Dropdown } from '@navikt/ds-react';

import { ModalType } from '../../../../../context/ModalContext';
import { useFeatureToggles } from '../../../../../hooks/useFeatureToggles';
import { useModal } from '../../../../../hooks/useModal';
import { erPåHenleggbartSteg } from '../../../../../typer/behandling';
import { FeatureToggle } from '../../../../../typer/featureToggles';
import { useBehandlingContext } from '../../../Behandling/context/BehandlingContext';

export function HenleggBehandling() {
    const toggles = useFeatureToggles();
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING);

    const harTilgangTilTekniskVedlikeholdHenleggelse = toggles[FeatureToggle.tekniskVedlikeholdHenleggelse];

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse || (!vurderErLesevisning() && erPåHenleggbartSteg(behandling.steg));

    if (!kanHenlegge) {
        return null;
    }

    return <Dropdown.Menu.List.Item onClick={() => åpneModal()}>Henlegg behandling</Dropdown.Menu.List.Item>;
}
