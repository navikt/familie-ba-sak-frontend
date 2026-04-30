import { ActionMenu } from '@navikt/ds-react';

import { ModalType } from '../../../../context/ModalContext';
import { useModal } from '../../../../hooks/useModal';
import { useSaksbehandler } from '../../../../hooks/useSaksbehandler';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import { erPåHenleggbartSteg } from '../../../../typer/behandling';

export function HenleggBehandling() {
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING);

    const saksbehandler = useSaksbehandler();

    const erLesevisning = vurderErLesevisning();
    const harTilgangTilTekniskVedlikeholdHenleggelse = saksbehandler.harSuperbrukertilgang;

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse || (!erLesevisning && erPåHenleggbartSteg(behandling.steg));

    if (!kanHenlegge) {
        return null;
    }

    return <ActionMenu.Item onSelect={() => åpneModal()}>Henlegg behandling</ActionMenu.Item>;
}
