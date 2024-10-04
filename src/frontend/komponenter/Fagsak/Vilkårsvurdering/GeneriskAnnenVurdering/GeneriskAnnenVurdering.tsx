import React, { useState } from 'react';

import styled from 'styled-components';

import { Fieldset, Heading } from '@navikt/ds-react';
import { ASpacing16, ASpacing8 } from '@navikt/ds-tokens/dist/tokens';
import type { FeltState } from '@navikt/familie-skjema';

import AnnenVurderingTabell from './AnnenVurderingTabell';
import type { IGrunnlagPerson } from '../../../../typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '../../../../typer/vilkår';

interface IProps {
    person: IGrunnlagPerson;
    andreVurderinger: FeltState<IAnnenVurdering>[];
    annenVurderingConfig: IAnnenVurderingConfig;
    visFeilmeldinger: boolean;
}

const Container = styled.div`
    margin-top: ${ASpacing16};
    &:last-child {
        margin-bottom: ${ASpacing8};
    }
`;

const GeneriskAnnenVurdering: React.FC<IProps> = ({
    person,
    annenVurderingConfig,
    andreVurderinger,
    visFeilmeldinger,
}) => {
    const [visFeilmeldingerForAnnenVurdering] = useState(false);
    const [feilmelding] = useState('');

    return (
        <Container>
            <Fieldset
                error={visFeilmeldingerForAnnenVurdering ? feilmelding : undefined}
                legend={annenVurderingConfig.tittel}
                hideLegend
            >
                <Heading size="medium" level="3">
                    {annenVurderingConfig.tittel}
                </Heading>
                <AnnenVurderingTabell
                    person={person}
                    annenVurderingConfig={annenVurderingConfig}
                    andreVurderinger={andreVurderinger}
                    visFeilmeldinger={visFeilmeldinger}
                />
            </Fieldset>
        </Container>
    );
};

export default GeneriskAnnenVurdering;
