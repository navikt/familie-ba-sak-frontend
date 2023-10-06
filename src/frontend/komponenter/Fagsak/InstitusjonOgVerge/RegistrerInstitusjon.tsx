import * as React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import Institusjon from './Institusjon';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useInstitusjonOgVerge } from '../../../context/InstitusjonOgVergeContext';
import { BehandlingSteg } from '../../../typer/behandling';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

const StyledSkjemasteg = styled(Skjemasteg)`
    max-width: 40rem;
`;

const StyledAlert = styled(Alert)`
    margin: 2rem;
`;

const RegistrerInstitusjon: React.FC = () => {
    const { fagsakFeilmelding, onSubmitMottaker, submitFeilmelding } = useInstitusjonOgVerge();
    const { behandlingsstegSubmitressurs, vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    return (
        <>
            {!fagsakFeilmelding && (
                <StyledSkjemasteg
                    className={'mottaker'}
                    tittel={'Registrer institusjon'}
                    nesteOnClick={onSubmitMottaker}
                    nesteKnappTittel={erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
                    senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
                    steg={BehandlingSteg.REGISTRERE_INSTITUSJON_OG_VERGE}
                >
                    <Institusjon />
                    {submitFeilmelding && <Alert variant="error" children={submitFeilmelding} />}
                </StyledSkjemasteg>
            )}
            {fagsakFeilmelding && <StyledAlert variant="info" children={fagsakFeilmelding} />}
        </>
    );
};

export default RegistrerInstitusjon;
