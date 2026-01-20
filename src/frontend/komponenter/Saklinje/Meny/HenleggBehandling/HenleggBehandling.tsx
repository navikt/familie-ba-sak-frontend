import React from 'react';

import { ActionMenu } from '@navikt/ds-react';

import { ModalType } from '../../../../context/ModalContext';
import { useFeatureToggles } from '../../../../hooks/useFeatureToggles';
import { useModal } from '../../../../hooks/useModal';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { erPåHenleggbartSteg } from '../../../../typer/behandling';
import { FeatureToggle } from '../../../../typer/featureToggles';

export function HenleggBehandling() {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING);
    const toggles = useFeatureToggles();

    const erLesevisning = vurderErLesevisning();
    const harTilgangTilTekniskVedlikeholdHenleggelse = toggles[FeatureToggle.tekniskVedlikeholdHenleggelse];

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse || (!erLesevisning && erPåHenleggbartSteg(behandling.steg));

    if (!kanHenlegge) {
        return null;
    }

    return <ActionMenu.Item onSelect={() => åpneModal()}>Henlegg behandling</ActionMenu.Item>;
}
