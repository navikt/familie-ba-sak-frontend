import React, { useState } from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Heading, Label } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import type { IGrunnlagPerson } from '../../../../typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '../../../../typer/vilkår';
import AnnenVurderingTabell from './AnnenVurderingTabell';

interface IProps {
    person: IGrunnlagPerson;
    andreVurderinger: FeltState<IAnnenVurdering>[];
    annenVurderingConfig: IAnnenVurderingConfig;
    visFeilmeldinger: boolean;
}

const Container = styled.div`
    margin-top: 1rem;
    :not(:first-child) {
        margin-top: 2.5rem;
    }
`;

const VilkårTittel = styled(Heading)`
    display: flex;
    align-items: center;

    > *:not(:first-child) {
        margin-left: 0.75rem;
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
            <SkjemaGruppe feil={visFeilmeldingerForAnnenVurdering ? feilmelding : undefined}>
                <VilkårTittel size={'small'} level={'4'}>
                    <Label children={annenVurderingConfig.tittel} />
                </VilkårTittel>
                <AnnenVurderingTabell
                    person={person}
                    annenVurderingConfig={annenVurderingConfig}
                    andreVurderinger={andreVurderinger}
                    visFeilmeldinger={visFeilmeldinger}
                />
            </SkjemaGruppe>
        </Container>
    );
};

export default GeneriskAnnenVurdering;
