import type { IGrunnlagPerson } from '@typer/person';
import type { IAnnenVurdering, IAnnenVurderingConfig } from '@typer/vilkår';

import { Table } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import Styles from './AnnenVurderingTabell.module.css';
import { AnnenVurderingTabellRad } from './AnnenVurderingTabellRad';

export const annenVurderingFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering_${annenVurdering.type}_${annenVurdering.id}`;

export const annenVurderingResultatFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering-resultat_${annenVurdering.type}_${annenVurdering.id}`;

export const annenVurderingBegrunnelseFeilmeldingId = (annenVurdering: IAnnenVurdering) =>
    `annen-vurdering-begrunnelse_${annenVurdering.type}_${annenVurdering.id}`;

interface Props {
    person: IGrunnlagPerson;
    andreVurderinger: FeltState<IAnnenVurdering>[];
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
                {andreVurderinger.map((annenVurdering: FeltState<IAnnenVurdering>, index: number) => {
                    return (
                        <AnnenVurderingTabellRad
                            key={`${index}_${person.fødselsdato}_${annenVurdering.verdi.type}`}
                            annenVurderingConfig={annenVurderingConfig}
                            person={person}
                            annenVurdering={annenVurdering}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    );
                })}
            </Table.Body>
        </Table>
    );
}
