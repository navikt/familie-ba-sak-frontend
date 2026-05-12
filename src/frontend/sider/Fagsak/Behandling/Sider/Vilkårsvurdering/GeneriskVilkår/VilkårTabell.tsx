import type { IGrunnlagPerson } from '@typer/person';
import type { IVilkårConfig, IVilkårResultat } from '@typer/vilkår';

import { Box, Table } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import Styles from './VilkårTabell.module.css';
import { VilkårTabellRad } from './VilkårTabellRad';

export const vilkårFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårResultatFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-resultat_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårBegrunnelseFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-begrunnelse_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

export const vilkårPeriodeFeilmeldingId = (vilkårResultat: IVilkårResultat) =>
    `vilkår-periode_${vilkårResultat.vilkårType}_${vilkårResultat.id}`;

interface IProps {
    person: IGrunnlagPerson;
    vilkårResultater: FeltState<IVilkårResultat>[];
    vilkårFraConfig: IVilkårConfig;
    visFeilmeldinger: boolean;
    settFokusPåKnapp: () => void;
}

const VilkårTabell = ({ person, vilkårFraConfig, vilkårResultater, visFeilmeldinger, settFokusPåKnapp }: IProps) => {
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
                    {vilkårResultater.map((vilkårResultat: FeltState<IVilkårResultat>, index: number) => {
                        return (
                            <VilkårTabellRad
                                key={`${index}_${person.fødselsdato}_${vilkårResultat.verdi.vilkårType}_${vilkårResultat.verdi.id}`}
                                vilkårFraConfig={vilkårFraConfig}
                                person={person}
                                vilkårResultat={vilkårResultat}
                                visFeilmeldinger={visFeilmeldinger}
                                settFokusPåKnapp={settFokusPåKnapp}
                            />
                        );
                    })}
                </Table.Body>
            </Table>
        </Box>
    );
};

export default VilkårTabell;
