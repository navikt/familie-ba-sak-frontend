import { ModalType } from '@context/ModalContext';
import { useBehandling } from '@hooks/useBehandling';
import { useModal } from '@hooks/useModal';

import { DocPencilIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';

export function KorrigerEtterbetaling() {
    const behandling = useBehandling();

    const { åpneModal } = useModal(ModalType.KORRIGER_ETTERBETALING);

    const label = behandling.korrigertEtterbetaling ? 'Vis korrigert etterbetaling' : 'Korriger etterbetaling';

    return (
        <ActionMenu.Item onSelect={() => åpneModal()}>
            <DocPencilIcon fontSize={'1.4rem'} />
            {label}
        </ActionMenu.Item>
    );
}
