import React from 'react';

import { Alert, BodyShort, Box, Dropdown, Loader } from '@navikt/ds-react';

import { useHentAInntektUrl } from '../../../../../hooks/useHentAInntektUrl';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

export const AInntekt: React.FC<IProps> = ({ minimalFagsak }) => {
    const { data, isPending, error } = useHentAInntektUrl(minimalFagsak.søkerFødselsnummer);

    if (isPending) {
        return (
            <Dropdown.Menu.List.Item disabled>
                A-Inntekt <Loader size="small" />
            </Dropdown.Menu.List.Item>
        );
    }

    if (error) {
        return (
            <Box as="li" marginInline="4" marginBlock="1">
                <Alert variant="error" size="small" style={{ padding: '0.5rem' }}>
                    <BodyShort size="small" spacing>
                        Beklager, det har oppstått en teknisk feil. Vi får ikke hentet informasjon
                        fra A-inntekt akkurat nå.
                    </BodyShort>
                    <BodyShort size="small">
                        Du kan prøve å slå opp direkte i A-inntekt eller prøve igjen senere.
                    </BodyShort>
                </Alert>
            </Box>
        );
    }

    return (
        <Dropdown.Menu.List.Item onClick={() => window.open(data, '_blank')}>
            A-Inntekt
        </Dropdown.Menu.List.Item>
    );
};
