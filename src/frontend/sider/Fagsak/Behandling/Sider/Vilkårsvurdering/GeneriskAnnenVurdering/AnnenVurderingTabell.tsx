import { Table } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurderingConfig, IRestAnnenVurdering } from '@typer/vilkår';

import Styles from './AnnenVurderingTabell.module.css';
import { AnnenVurderingTabellRad } from './AnnenVurderingTabellRad';

export const annenVurderingFeilmeldingId = (annenVurdering: IRestAnnenVurdering) =>
    `annen-vurdering_${annenVurdering.type}_${annenVurdering.id}`;

interface Props {
    person: IGrunnlagPerson;
    andreVurderinger: IRestAnnenVurdering[];
    annenVurderingConfig: IAnnenVurderingConfig;
    visFeilmeldinger: boolean;
}

export function AnnenVurderingTabell({ person, annenVurderingConfig, andreVurderinger, visFeilmeldinger }: Props) {
    return (
        <Table className={Styles.table}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell className={Styles.col1}>Vurdering</Table.HeaderCell>
                    <Table.HeaderCell className={Styles.col2}>Begrunnelse</Table.HeaderCell>
                    <Table.HeaderCell className={Styles.col3}>Vurdert av</Table.HeaderCell>
                    <Table.HeaderCell className={Styles.col4} />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {andreVurderinger.map(annenVurdering => (
                    <AnnenVurderingTabellRad
                        key={annenVurdering.id}
                        annenVurderingConfig={annenVurderingConfig}
                        person={person}
                        annenVurdering={annenVurdering}
                        visFeilmeldinger={visFeilmeldinger}
                    />
                ))}
            </Table.Body>
        </Table>
    );
}
