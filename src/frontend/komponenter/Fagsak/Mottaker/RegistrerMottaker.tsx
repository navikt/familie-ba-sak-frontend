import * as React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useMottakerType } from '../../../context/MottakerTypeContext';
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
    const { fagsakType, lesevisning, onSubmitMottaker } = useMottakerType();
    const { behandlingsstegSubmitressurs } = useBehandling();

    return (
        <>
            {!fagsakType.feilmelding && (
                <StyledSkjemasteg
                    className={'mottaker'}
                    tittel={'Registrer mottaker'}
                    nesteOnClick={onSubmitMottaker}
                    nesteKnappTittel={lesevisning() ? 'Neste' : 'Bekreft og fortsett'}
                    senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
                    steg={BehandlingSteg.REGISTRERE_INSTITUSJON_OG_VERGE}
                >
                    {fagsakType.data === FagsakType.INSTITUSJON ? <Institusjon /> : <Verge />}
                </StyledSkjemasteg>
            )}
            {fagsakType.feilmelding && (
                <StyledAlert variant="info">
                    Det har skjedd en feil: {fagsakType.feilmelding}
                </StyledAlert>
            )}
        </>
    );
};

export default RegistrerMottaker;
