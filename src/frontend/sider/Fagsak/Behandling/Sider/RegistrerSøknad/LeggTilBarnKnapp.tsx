import * as React from 'react';

import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

import { useLeggTilBarnModalContext } from '../../../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import {
    sjekkGjelderEnsligMindreårig,
    sjekkGjelderInstitusjon,
    sjekkGjelderSkjermetBarn,
} from '../../../../../typer/fagsak';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

export function LeggTilBarnKnapp() {
    const { fagsak } = useFagsakContext();
    const { vurderErLesevisning } = useBehandlingContext();
    const { åpneModal } = useLeggTilBarnModalContext();

    const gjelderInstitusjon = sjekkGjelderInstitusjon(fagsak);
    const gjelderEnsligMindreårig = sjekkGjelderEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = sjekkGjelderSkjermetBarn(fagsak);

    const erLesevisning = vurderErLesevisning();

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
