import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

import { useSaksbehandler } from '../../../../../hooks/useSaksbehandler';
import { useLeggTilBarnModalContext } from '../../../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';

export function LeggTilBarnKnapp() {
    const { åpneModal } = useLeggTilBarnModalContext();
    const saksbehandler = useSaksbehandler();

    if (!saksbehandler.harSkrivetilgang) {
        return null;
    }

    return (
        <Button variant={'tertiary'} size={'medium'} onClick={åpneModal} icon={<PlusCircleIcon />}>
            Legg til barn
        </Button>
    );
}
