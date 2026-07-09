import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useLeggTilBarnModalContext } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon, erFagsakAvTypeSkjermetBarn } from '@typer/fagsak';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

export function LeggTilBarnKnapp() {
    const { åpneModal } = useLeggTilBarnModalContext();

    const fagsak = useFagsak();
    const erLesevisning = useErLesevisning();

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);
    const gjelderEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

    const visKnapp = !erLesevisning && !gjelderInstitusjon && !gjelderEnsligMindreårig && !gjelderSkjermetBarn;

    if (!visKnapp) {
        return null;
    }

    return (
        <Button variant={'tertiary'} size={'medium'} onClick={åpneModal} icon={<PlusCircleIcon />}>
            Legg til barn
        </Button>
    );
}
