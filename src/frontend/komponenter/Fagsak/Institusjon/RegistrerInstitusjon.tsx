import * as React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { SamhandlerTabell } from './SamhandlerTabell';
import { useSamhandlerRequest } from './useSamhandler';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useInstitusjon } from '../../../context/InstitusjonContext';
import { BehandlingSteg } from '../../../typer/behandling';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

const StyledSkjemasteg = styled(Skjemasteg)`
    max-width: 40rem;
`;

const StyledAlert = styled(Alert)`
    margin: 2rem;
`;

const RegistrerInstitusjon: React.FC = () => {
    const { fagsakFeilmelding, onSubmitMottaker, submitFeilmelding, skjema } =
        useInstitusjon();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest();
    const { behandlingsstegSubmitressurs, vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();

    if (skjema.felter.institusjon.verdi && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(skjema.felter.institusjon.verdi.orgNummer);
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
