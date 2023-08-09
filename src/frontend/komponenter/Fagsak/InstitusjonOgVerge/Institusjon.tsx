import * as React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { SamhandlerTabell } from './SamhandlerTabell';
import { useSamhandlerRequest } from './useSamhandler';
import { useInstitusjonOgVerge } from '../../../context/InstitusjonOgVergeContext';

const StyledDiv = styled.div`
    margin: 2rem 0;
`;

const Institusjon: React.FunctionComponent = () => {
    const { skjema } = useInstitusjonOgVerge();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest();

    if (skjema.felter.institusjon.verdi && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentOgSettSamhandler(skjema.felter.institusjon.verdi.orgNummer);
    }

    const visInstitusjon = () => {
        if (samhandlerRessurs.status === RessursStatus.SUKSESS) {
            return <SamhandlerTabell samhandler={samhandlerRessurs.data} />;
        } else if (
            samhandlerRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
            samhandlerRessurs.status === RessursStatus.FEILET
        ) {
            return <Alert children={samhandlerRessurs.frontendFeilmelding} variant={'error'} />;
        }
    };

    return <StyledDiv> {visInstitusjon()} </StyledDiv>;
};

export default Institusjon;
