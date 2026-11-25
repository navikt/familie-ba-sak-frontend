import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';

import { DocPencilIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';

import { useKorrigertEtterbetalingContext } from './KorrigertEtterbetalingContext';

export function KorrigerEtterbetaling() {
    const { korrigertEtterbetaling } = useKorrigertEtterbetalingContext();

    const { åpneModal } = useModal(ModalType.KORRIGER_ETTERBETALING);

    const label = korrigertEtterbetaling ? 'Vis korrigert etterbetaling' : 'Korriger etterbetaling';

    return (
        <ActionMenu.Item onSelect={() => åpneModal()}>
            <DocPencilIcon fontSize={'1.4rem'} />
            {label}
        </ActionMenu.Item>
    );
}
