import React, { useState } from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Undertekst, Undertittel } from 'nav-frontend-typografi';

import { FeltState } from '@navikt/familie-skjema';

import { IGrunnlagPerson } from '../../../../typer/person';
import { IAnnenVurdering, IAnnenVurderingConfig } from '../../../../typer/vilkår';
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

const VilkårTittel = styled(Undertittel)`
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
                <VilkårTittel tag={'h4'}>
                    <Element children={annenVurderingConfig.tittel} />
                    <Undertekst children={annenVurderingConfig.lovreferanse} />
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
