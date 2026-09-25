import { CalendarIcon } from '@navikt/aksel-icons';
import { ActionMenu } from '@navikt/ds-react';
import { useEndringstidspunktDialogContext } from './EndringstidspunktDialogContext';

export function Endringstidspunkt() {
    const { åpneDialog } = useEndringstidspunktDialogContext();

    return (
        <ActionMenu.Item onSelect={åpneDialog}>
            <CalendarIcon fontSize={'1.4rem'} />
            Oppdater endringstidspunkt
        </ActionMenu.Item>
    );
}
