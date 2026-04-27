import * as React from 'react';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useInstitusjon } from './useInstitusjon';
import { SamhandlerTabell } from '../../../../../komponenter/Samhandler/SamhandlerTabell';
import { useSamhandlerRequest } from '../../../../../komponenter/Samhandler/useSamhandler';
import { BehandlingSteg, type IBehandling } from '../../../../../typer/behandling';
import { useBehandlingContext } from '../../context/BehandlingContext';
import Skjemasteg from '../Skjemasteg';

interface IProps {
    åpenBehandling: IBehandling;
}

const RegistrerInstitusjon: React.FC<IProps> = ({ åpenBehandling }) => {
    const { institusjon, onSubmitMottaker, submitFeilmelding } = useInstitusjon(åpenBehandling);
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest(true);
    const { vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    if (institusjon && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(åpenBehandling.behandlingId);
    }

    return (
        <Skjemasteg
            className={'mottaker'}
            tittel={'Info om institusjon'}
            nesteOnClick={onSubmitMottaker}
            nesteKnappTittel={erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
            senderInn={false}
            steg={BehandlingSteg.REGISTRERE_INSTITUSJON}
        >
            {samhandlerRessurs.status === RessursStatus.SUKSESS && (
                <SamhandlerTabell samhandler={samhandlerRessurs.data} />
            )}
            {(samhandlerRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                samhandlerRessurs.status === RessursStatus.FEILET) && (
                <Alert children={samhandlerRessurs.frontendFeilmelding} variant={'error'} />
            )}
            {submitFeilmelding && <Alert variant="error" children={submitFeilmelding} />}
        </Skjemasteg>
    );
};

export default RegistrerInstitusjon;
