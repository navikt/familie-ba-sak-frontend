import { useState } from 'react';

import styled from 'styled-components';

import { Button, ErrorMessage, LocalAlert, Textarea, VStack } from '@navikt/ds-react';

import { useSammensattKontrollsakContext } from './SammensattKontrollsakContext';
import { useBehandlingContext } from '../../../context/BehandlingContext';

const StyledVStack = styled(VStack)`
    margin-bottom: var(--ax-space-24);
`;

const StyledButton = styled(Button)`
    align-self: start;
`;

const SammensattKontrollsak = () => {
    const { vurderErLesevisning } = useBehandlingContext();
    const { sammensattKontrollsak, opprettEllerOppdaterSammensattKontrollsak, feilmelding } =
        useSammensattKontrollsakContext();

    const [fritekst, settFritekst] = useState<string>(sammensattKontrollsak?.fritekst ?? '');

    const fritekstErEndret = fritekst !== (sammensattKontrollsak?.fritekst ?? '');

    const erLesevisning = vurderErLesevisning();

    return (
        <StyledVStack gap="space-20">
            <Textarea
                label="Fritekst til vedtaksbrev"
                description="Her skal du skrive hvilke vurderinger som er gjort, hvilken informasjon som er lagt til grunn og hvilke hjemler som er brukt."
                onChange={event => {
                    settFritekst(event.target.value);
                }}
                value={fritekst}
                minRows={20}
                readOnly={erLesevisning}
            />
            {fritekstErEndret && (
                <LocalAlert status="warning" size={'small'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            Du har ikke lagret dine siste endringer, og vil miste disse om du forlater siden uten å
                            lagre.
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
            {feilmelding && <ErrorMessage showIcon>{feilmelding}</ErrorMessage>}
            {!erLesevisning && (
                <StyledButton
                    onClick={() => opprettEllerOppdaterSammensattKontrollsak(fritekst)}
                    variant="primary"
                    size="small"
                    loading={false}
                >
                    Lagre
                </StyledButton>
            )}
        </StyledVStack>
    );
};

export default SammensattKontrollsak;
