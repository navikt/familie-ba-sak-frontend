import { LocalAlert } from '@navikt/ds-react';
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

const RegistrerInstitusjon = ({ åpenBehandling }: IProps) => {
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
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>{samhandlerRessurs.frontendFeilmelding}</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
            {submitFeilmelding && (
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>{submitFeilmelding}</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
        </Skjemasteg>
    );
};

export default RegistrerInstitusjon;
