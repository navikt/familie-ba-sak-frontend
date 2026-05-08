import { ModalType } from '@context/ModalContext';
import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useModal } from '@hooks/useModal';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { erPåHenleggbartSteg } from '@typer/behandling';

import { ActionMenu } from '@navikt/ds-react';

export function HenleggBehandling() {
    const saksbehandler = useSaksbehandler();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING);

    const harTilgangTilTekniskVedlikeholdHenleggelse = saksbehandler.harSuperbrukertilgang;

    const kanHenlegge =
        harTilgangTilTekniskVedlikeholdHenleggelse || (!erLesevisning && erPåHenleggbartSteg(behandling.steg));

    if (!kanHenlegge) {
        return null;
    }

    return <ActionMenu.Item onSelect={() => åpneModal()}>Henlegg behandling</ActionMenu.Item>;
}
