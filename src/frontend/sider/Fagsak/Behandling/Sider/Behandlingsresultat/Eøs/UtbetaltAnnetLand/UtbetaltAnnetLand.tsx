import { Box, Heading, LocalAlert, Table } from '@navikt/ds-react';
import type { IBehandling } from '../../../../../../../typer/behandling';
import type { IRestUtenlandskPeriodeBeløp } from '../../../../../../../typer/eøsPerioder';
import Styles from './UtbetaltAnnetLand.module.css';
import UtenlandskPeriodeBeløpRad from './UtenlandskPeriodeBeløpTabellRad';

interface IProps {
    utbetaltAnnetLandBeløp: IRestUtenlandskPeriodeBeløp[];
    erUtbetaltAnnetLandBeløpGyldige: () => boolean;
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const UtbetaltAnnetLand = ({
    utbetaltAnnetLandBeløp,
    erUtbetaltAnnetLandBeløpGyldige,
    åpenBehandling,
    visFeilmeldinger,
}: IProps) => {
    return (
        <Box marginBlock={'space-80 space-0'}>
            <Heading spacing size="medium" level="3">
                Utbetalt i det andre landet
            </Heading>
            {!erUtbetaltAnnetLandBeløpGyldige() && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            I periodene Norge er sekundærland må beløpene fra det andre medlemslandet registreres
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
            <Table className={Styles.table}>
                <Table.Header>
                    <Table.Row className={Styles.headerRow}>
                        <Table.HeaderCell scope="col">Barn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Beløp per måned</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Valuta</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {utbetaltAnnetLandBeløp.map(utenlandskPeriodeBeløp => (
                        <UtenlandskPeriodeBeløpRad
                            key={`${utenlandskPeriodeBeløp.barnIdenter.map(barn => `${barn}-`)}-${
                                utenlandskPeriodeBeløp.fom
                            }-${utenlandskPeriodeBeløp.tom}`}
                            utenlandskPeriodeBeløp={utenlandskPeriodeBeløp}
                            åpenBehandling={åpenBehandling}
                            visFeilmeldinger={visFeilmeldinger}
                        />
                    ))}
                </Table.Body>
            </Table>
        </Box>
    );
};

export default UtbetaltAnnetLand;
