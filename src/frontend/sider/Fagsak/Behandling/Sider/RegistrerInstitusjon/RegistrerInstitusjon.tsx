import * as React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useInstitusjon } from './useInstitusjon';
import { SamhandlerTabell } from '../../../../../komponenter/Samhandler/SamhandlerTabell';
import { useSamhandlerRequest } from '../../../../../komponenter/Samhandler/useSamhandler';
import { BehandlingSteg, type IBehandling } from '../../../../../typer/behandling';
import { useBehandlingContext } from '../../context/BehandlingContext';
import Skjemasteg from '../Skjemasteg';

const StyledSkjemasteg = styled(Skjemasteg)`
    max-width: 40rem;
`;

const StyledAlert = styled(Alert)`
    margin: 2rem;
`;

interface IProps {
    åpenBehandling: IBehandling;
}

const RegistrerInstitusjon: React.FC<IProps> = ({ åpenBehandling }) => {
    const { institusjon, fagsakFeilmelding, onSubmitMottaker, submitFeilmelding } =
        useInstitusjon(åpenBehandling);
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest();
    const { behandlingsstegSubmitressurs, vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    if (institusjon && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(institusjon.orgNummer);
    }

    return (
        <>
            {!fagsakFeilmelding && (
                <StyledSkjemasteg
                    className={'mottaker'}
                    tittel={'Registrer institusjon'}
                    nesteOnClick={onSubmitMottaker}
                    nesteKnappTittel={erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
                    senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
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
                </StyledSkjemasteg>
            )}
            {fagsakFeilmelding && <StyledAlert variant="info" children={fagsakFeilmelding} />}
        </>
    );
};

export default RegistrerInstitusjon;
