import { Box, Table } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import type { IRestVilkårResultat, IVilkårConfig } from '@typer/vilkår';

import Styles from './VilkårTabell.module.css';
import { VilkårTabellRad } from './VilkårTabellRad';

export const vilkårFeilmeldingId = (vilkårResultat: IRestVilkårResultat) =>
    `vilkår_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

interface Props {
    person: IGrunnlagPerson;
    vilkårResultater: IRestVilkårResultat[];
    vilkårFraConfig: IVilkårConfig;
    visFeilmeldinger: boolean;
    settFokusPåKnapp: () => void;
}

export function VilkårTabell({ person, vilkårFraConfig, vilkårResultater, visFeilmeldinger, settFokusPåKnapp }: Props) {
    return (
        <Box className={Styles.wrapper}>
            <Table className={Styles.table}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className={Styles.col1} scope={'col'}>
                            Vurdering
                        </Table.HeaderCell>
                        <Table.HeaderCell className={Styles.col2} scope={'col'}>
                            Periode
                        </Table.HeaderCell>
                        <Table.HeaderCell className={Styles.col3} scope={'col'}>
                            Begrunnelse
                        </Table.HeaderCell>
                        <Table.HeaderCell className={Styles.col4} scope={'col'}>
                            Vurderes etter
                        </Table.HeaderCell>
                        <Table.HeaderCell className={Styles.col5} scope={'col'}>
                            Vurdert av
                        </Table.HeaderCell>
                        <Table.HeaderCell className={Styles.col6} scope={'col'} />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {vilkårResultater.map(vilkårResultat => (
                        <VilkårTabellRad
                            key={vilkårResultat.id}
                            vilkårFraConfig={vilkårFraConfig}
                            person={person}
                            vilkårResultat={vilkårResultat}
                            visFeilmeldinger={visFeilmeldinger}
                            settFokusPåKnapp={settFokusPåKnapp}
                        />
                    ))}
                </Table.Body>
            </Table>
        </Box>
    );
}
