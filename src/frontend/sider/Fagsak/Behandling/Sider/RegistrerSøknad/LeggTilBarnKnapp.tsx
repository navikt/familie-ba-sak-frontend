import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useLeggTilBarnModalContext } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { sjekkGjelderEnsligMindreårig, sjekkGjelderInstitusjon, sjekkGjelderSkjermetBarn } from '@typer/fagsak';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

export function LeggTilBarnKnapp() {
    const { åpneModal } = useLeggTilBarnModalContext();

    const fagsak = useFagsak();
    const erLesevisning = useErLesevisning();

    const gjelderInstitusjon = sjekkGjelderInstitusjon(fagsak);
    const gjelderEnsligMindreårig = sjekkGjelderEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = sjekkGjelderSkjermetBarn(fagsak);

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
