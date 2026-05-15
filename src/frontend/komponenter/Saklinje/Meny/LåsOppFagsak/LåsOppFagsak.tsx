import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';

import { ActionMenu } from '@navikt/ds-react';

export function LåsOppFagsak() {
    const { åpneModal } = useModal(ModalType.LAAS_OPP_FAGSAK);

    return <ActionMenu.Item onSelect={() => åpneModal()}>Lås opp fagsak</ActionMenu.Item>;
}
