import { useState } from 'react';

import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '@typer/vilkår';

import { Box, Fieldset, Heading } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import { AnnenVurderingTabell } from './AnnenVurderingTabell';

interface IProps {
    person: IGrunnlagPerson;
    andreVurderinger: FeltState<IAnnenVurdering>[];
    annenVurderingConfig: IAnnenVurderingConfig;
    visFeilmeldinger: boolean;
}

const GeneriskAnnenVurdering = ({ person, annenVurderingConfig, andreVurderinger, visFeilmeldinger }: IProps) => {
    const [visFeilmeldingerForAnnenVurdering] = useState(false);
    const [feilmelding] = useState('');

    return (
        <Box marginBlock={'space-64 space-32'}>
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
        </Box>
    );
};

export default GeneriskAnnenVurdering;
