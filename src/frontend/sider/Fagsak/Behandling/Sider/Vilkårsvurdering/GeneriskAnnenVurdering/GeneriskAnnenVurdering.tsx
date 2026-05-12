import { useState } from 'react';

import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '@typer/vilkår';
import styled from 'styled-components';

import { Fieldset, Heading } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import { AnnenVurderingTabell } from './AnnenVurderingTabell';

interface IProps {
    person: IGrunnlagPerson;
    andreVurderinger: FeltState<IAnnenVurdering>[];
    annenVurderingConfig: IAnnenVurderingConfig;
    visFeilmeldinger: boolean;
}

const Container = styled.div`
    margin-top: var(--ax-space-64);

    &:last-child {
        margin-bottom: var(--ax-space-32);
    }
`;

const GeneriskAnnenVurdering = ({ person, annenVurderingConfig, andreVurderinger, visFeilmeldinger }: IProps) => {
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
