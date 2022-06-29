import * as React from 'react';

import styled from 'styled-components';

import Alertstripe from 'nav-frontend-alertstriper';

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

const StyledAlertstripe = styled(Alertstripe)`
    margin: 2rem;
`;

const RegistrerMottaker: React.FC = () => {
    const { fagsakType, onSubmitMottaker } = useMottakerType();
    const { erLesevisning, behandlingsstegSubmitressurs } = useBehandling();

    return (
        <>
            {!fagsakType.feilmelding && (
                <StyledSkjemasteg
                    className={'mottaker'}
                    tittel={'Registrer mottaker'}
                    nesteOnClick={onSubmitMottaker}
                    nesteKnappTittel={erLesevisning() ? 'Neste' : 'Bekreft og fortsett'}
                    senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
                    steg={BehandlingSteg.REGISTRERE_MOTTAKER}
                >
                    {fagsakType.data === FagsakType.INSTITUSJON ? <Institusjon /> : <Verge />}
                </StyledSkjemasteg>
            )}
            {fagsakType.feilmelding && (
                <StyledAlertstripe type="info">
                    Det har skjedd en feil: {fagsakType.feilmelding}
                </StyledAlertstripe>
            )}
        </>
    );
};

export default RegistrerMottaker;
