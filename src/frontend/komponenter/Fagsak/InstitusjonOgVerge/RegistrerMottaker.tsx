import * as React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useInstitusjonOgVerge } from '../../../context/InstitusjonOgVergeContext';
import { BehandlingSteg } from '../../../typer/behandling';
import { FagsakType } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import Institusjon from './Institusjon';
import Verge from './Verge';

const StyledSkjemasteg = styled(Skjemasteg)`
    max-width: 40rem;
`;

const StyledAlert = styled(Alert)`
    margin: 2rem;
`;

const RegistrerMottaker: React.FC = () => {
    const { fagsakType, onSubmitMottaker, submitFeilmelding } = useInstitusjonOgVerge();
    const { behandlingsstegSubmitressurs, erLesevisning } = useBehandling();

    return (
        <>
            {!fagsakType.feilmelding && (
                <StyledSkjemasteg
                    className={'mottaker'}
                    tittel={'Registrer mottaker'}
                    nesteOnClick={onSubmitMottaker}
                    nesteKnappTittel={erLesevisning() ? 'Neste' : 'Bekreft og fortsett'}
                    senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
                    steg={BehandlingSteg.REGISTRERE_INSTITUSJON_OG_VERGE}
                >
                    {fagsakType.data === FagsakType.INSTITUSJON ? (
                        <Institusjon />
                    ) : (
                        <Verge erLesevisning={erLesevisning()} />
                    )}
                    {submitFeilmelding && <Alert variant="error" children={submitFeilmelding} />}
                </StyledSkjemasteg>
            )}
            {fagsakType.feilmelding && (
                <StyledAlert variant="info" children={fagsakType.feilmelding} />
            )}
        </>
    );
};

export default RegistrerMottaker;
