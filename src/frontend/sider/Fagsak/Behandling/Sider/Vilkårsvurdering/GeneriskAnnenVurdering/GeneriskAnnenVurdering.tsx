import { Heading } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurderingConfig, IRestAnnenVurdering } from '@typer/vilkår';

import { AnnenVurderingTabell } from './AnnenVurderingTabell';
import styles from './GeneriskAnnenVurdering.module.css';

interface Props {
    person: IGrunnlagPerson;
    andreVurderinger: IRestAnnenVurdering[];
    annenVurderingConfig: IAnnenVurderingConfig;
    visFeilmeldinger: boolean;
}

export function GeneriskAnnenVurdering({ person, annenVurderingConfig, andreVurderinger, visFeilmeldinger }: Props) {
    return (
        <div className={styles.container}>
            <Heading size="medium" level="3">
                {annenVurderingConfig.tittel}
            </Heading>
            <AnnenVurderingTabell
                person={person}
                annenVurderingConfig={annenVurderingConfig}
                andreVurderinger={andreVurderinger}
                visFeilmeldinger={visFeilmeldinger}
            />
        </div>
    );
}
