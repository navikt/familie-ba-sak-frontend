import React from 'react';

import styled from 'styled-components';

import { Alert, ErrorMessage, HStack, Textarea, VStack } from '@navikt/ds-react';
import { ASpacing6 } from '@navikt/ds-tokens/dist/tokens';
import { FamilieKnapp } from '@navikt/familie-form-elements';

import type { ISammensattKontrollsakContext } from './useSammensattKontrollsak';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';

interface ISammensattKontrollsakProps {
    sammensattKontrollsakContext: ISammensattKontrollsakContext;
}

const StyledVStack = styled(VStack)`
    margin-bottom: ${ASpacing6};
`;

const SammensattKontrollsak: React.FC<ISammensattKontrollsakProps> = ({
    sammensattKontrollsakContext,
}) => {
    const { vurderErLesevisning } = useBehandling();
    const {
        fritekst,
        settFritekst,
        fritekstErEndret,
        opprettEllerOppdaterSammensattKontrollsak,
        feilmelding,
    } = sammensattKontrollsakContext;
    return (
        <StyledVStack gap="5">
            <Textarea
                label="Fritekst til vedtaksbrev"
                description="Her skal du skrive hvilke vurderinger som er gjort, hvilken informasjon som er lagt til grunn og hvilke hjemler som er brukt."
                onChange={event => {
                    settFritekst(event.target.value);
                }}
                value={fritekst}
                minRows={20}
            />
            {fritekstErEndret && (
                <Alert variant="warning" size="small">
                    Du har ikke lagret dine siste endringer, og vil miste disse om du forlater siden
                    uten å lagre.
                </Alert>
            )}
            {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
            <HStack>
                <FamilieKnapp
                    erLesevisning={vurderErLesevisning()}
                    onClick={opprettEllerOppdaterSammensattKontrollsak}
                    variant="primary"
                    size="small"
                >
                    Lagre
                </FamilieKnapp>
            </HStack>
        </StyledVStack>
    );
};

export default SammensattKontrollsak;
