import * as React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useInstitusjonOgVerge } from '../../../context/InstitusjonOgVergeContext';
import { SamhandlerTabell } from './SamhandlerTabell';
import { useSamhandlerRequest } from './useSamhandler';

const StyledDiv = styled.div`
    margin: 2rem 0;
`;

const Institusjon: React.FunctionComponent = () => {
    const { skjema } = useInstitusjonOgVerge();
    const { hentSamhandler, samhandlerRessurs } = useSamhandlerRequest();

    if (skjema.felter.institusjon.verdi && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
        hentSamhandler(skjema.felter.institusjon.verdi.orgNummer);
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
