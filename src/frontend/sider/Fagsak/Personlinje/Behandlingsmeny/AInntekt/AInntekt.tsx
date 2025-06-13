import React from 'react';

import { Alert, Dropdown, Loader } from '@navikt/ds-react';

import { useHentAInntektUrl } from '../../../../../hooks/useHentAInntektUrl';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

export const AInntekt: React.FC<IProps> = ({ minimalFagsak }) => {
    const { data, isPending, error } = useHentAInntektUrl(minimalFagsak.søkerFødselsnummer);

    return (
        <>
            {data && (
                <Dropdown.Menu.List.Item onClick={() => window.open(data, '_blank')}>
                    A-Inntekt
                </Dropdown.Menu.List.Item>
            )}

            {isPending && (
                <Dropdown.Menu.List.Item disabled>
                    Henter A-Inntekt <Loader size="xsmall" />
                </Dropdown.Menu.List.Item>
            )}

            {error !== null && (
                <Dropdown.Menu.List.Item disabled>
                    <Alert variant="error" inline>
                        A-Inntekt er ikke tilgjengelig
                    </Alert>
                </Dropdown.Menu.List.Item>
            )}
        </>
    );
};
