import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

import { useSaksbehandler } from '../../../../../hooks/useSaksbehandler';
import { useLeggTilBarnModalContext } from '../../../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { useSkjemaErLåst } from './useSkjemaErLåst';

export function LeggTilBarnKnapp() {
    const { åpneModal } = useLeggTilBarnModalContext();
    const saksbehandler = useSaksbehandler();
    const skjemaErLåst = useSkjemaErLåst();

    if (!saksbehandler.harSkrivetilgang) {
        return null;
    }

    return (
        <Button
            type={'button'}
            variant={'tertiary'}
            size={'medium'}
            disabled={skjemaErLåst}
            onClick={åpneModal}
            icon={<PlusCircleIcon />}
        >
            Legg til barn
        </Button>
    );
}
