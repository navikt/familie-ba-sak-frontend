import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Heading, InfoCard, LocalAlert, Table } from '@navikt/ds-react';
import type { IBehandling } from '../../../../../../../typer/behandling';
import { BehandlingÅrsak } from '../../../../../../../typer/behandling';
import { EøsPeriodeStatus, type IRestKompetanse } from '../../../../../../../typer/eøsPerioder';
import Styles from './KompetanseSkjema.module.css';
import KompetanseTabellRad from './KompetanseTabellRad';

interface IProps {
    kompetanser: IRestKompetanse[];
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const KompetanseSkjema = ({ kompetanser, åpenBehandling, visFeilmeldinger }: IProps) => {
    const harUfullstendigeKompetanser =
        åpenBehandling.kompetanser?.filter(kompetanse => kompetanse.status !== EøsPeriodeStatus.OK).length > 0;

    return (
        <Box marginBlock={'space-80 space-0'}>
            <Heading spacing size="medium" level="3">
                Kompetanse
            </Heading>
            {harUfullstendigeKompetanser && åpenBehandling.årsak !== BehandlingÅrsak.MIGRERING && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            For EØS-perioder med tilkjent ytelse, må det fastsettes kompetanse
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            )}
            {harUfullstendigeKompetanser && åpenBehandling.årsak === BehandlingÅrsak.MIGRERING && (
                <InfoCard data-color="info">
                    <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                        Saken er migrert og kompetansen er hentet fra Infotrygd. Kompetanseskjemaet er derfor ikke
                        fullstendig utfylt.
                    </InfoCard.Message>
                </InfoCard>
            )}
            <Box asChild marginBlock={'space-32 space-0'}>
                <Table>
                    <Table.Header>
                        <Table.Row className={Styles.headerRow}>
                            <Table.HeaderCell scope="col">Barn</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Kompetanse</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {kompetanser.map(kompetanse => (
                            <KompetanseTabellRad
                                key={`${kompetanse.barnIdenter.map(barn => `${barn}-`)}-${
                                    kompetanse.fom
                                }-${kompetanse.tom}`}
                                kompetanse={kompetanse}
                                åpenBehandling={åpenBehandling}
                                visFeilmeldinger={visFeilmeldinger}
                            />
                        ))}
                    </Table.Body>
                </Table>
            </Box>
        </Box>
    );
};

export default KompetanseSkjema;
