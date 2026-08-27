import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { useLeggTilBarnModalContext } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import type { DokumentutsendingFormValues } from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { useFormContext } from 'react-hook-form';

export function LeggTilBarnKnapp() {
    const { åpneModal } = useLeggTilBarnModalContext();
    const erLesevisning = useErLesevisningFagsak();
    const {
        formState: { isSubmitting },
    } = useFormContext<DokumentutsendingFormValues>();

    if (erLesevisning) {
        return null;
    }

    return (
        <Button
            variant={'tertiary'}
            size={'medium'}
            type={'button'}
            onClick={åpneModal}
            icon={<PlusCircleIcon />}
            disabled={isSubmitting}
        >
            Legg til barn
        </Button>
    );
}
